package com.lahinchgallery.lahinch_art_gallery_backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.annotations.GenericGenerator;

import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "premium_media")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PremiumMedia {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "media_type", nullable = false)
    private MediaType mediaType; // Updated to include TEXT

    @Column(name = "file_url", nullable = false)
    private String fileUrl;

    @Column(name = "thumbnail_url")
    private String thumbnailUrl;

    @Column(name = "duration_seconds")
    private Integer durationSeconds;

    @Enumerated(EnumType.STRING)
    @Column(name = "related_to_entity_type", nullable = false)
    private RelatedEntityType relatedToEntityType; // ARTIST or ARTWORK

    @Column(name = "related_entity_id", nullable = false)
    private UUID relatedEntityId; // Stores the ID of the Artist or Artwork

    // For JPA's convenience in querying, not for direct insertion/updation of foreign key via these fields
    // The actual link is via relatedEntityId and relatedToEntityType
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "related_entity_id", referencedColumnName = "id", insertable = false, updatable = false)
    private Artist artist; // Populated if relatedToEntityType is ARTIST

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "related_entity_id", referencedColumnName = "id", insertable = false, updatable = false)
    private Artwork artwork; // Populated if relatedToEntityType is ARTWORK

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private OffsetDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private OffsetDateTime updatedAt;

    // This callback helps ensure that only one of 'artist' or 'artwork' is non-null in the entity object
    // based on 'relatedToEntityType', if they were somehow populated.
    // However, primary management of the relationship is via relatedEntityId and relatedToEntityType.
    @PostLoad // Called after an entity is loaded
    @PrePersist // Called before an entity is persisted
    @PreUpdate // Called before an entity is updated
    public void reconcileRelationships() {
        if (this.relatedToEntityType != null) {
            if (this.relatedToEntityType == RelatedEntityType.ARTIST) {
                this.artwork = null; // Ensure artwork is null if related to artist
            } else if (this.relatedToEntityType == RelatedEntityType.ARTWORK) {
                this.artist = null; // Ensure artist is null if related to artwork
            }
        }
    }
}
