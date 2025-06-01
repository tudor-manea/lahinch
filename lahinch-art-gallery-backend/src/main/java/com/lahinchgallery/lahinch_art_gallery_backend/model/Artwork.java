package com.lahinchgallery.lahinch_art_gallery_backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Where;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "artworks")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Artwork {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @Column(name = "title", nullable = false)
    private String title;

    @ManyToOne(fetch = FetchType.LAZY) // Many Artworks can belong to one Artist
    @JoinColumn(name = "artist_id", nullable = false) // Foreign key column in the artworks table
    private Artist artist;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "medium")
    private String medium;

    @Column(name = "dimensions")
    private String dimensions; // e.g., "60x80 cm"

    @Column(name = "year_created")
    private Integer yearCreated;

    @Column(name = "price", precision = 10, scale = 2) // Matches NUMERIC(10, 2)
    private BigDecimal price;

    @Enumerated(EnumType.STRING)
    @Column(name = "availability_status", nullable = false)
    private ArtworkAvailabilityStatus availabilityStatus = ArtworkAvailabilityStatus.AVAILABLE;

    @Column(name = "artwork_image_url")
    private String artworkImageUrl; // Path in Supabase Storage

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private OffsetDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private OffsetDateTime updatedAt;

    // --- Relationships ---

    // One Artwork can have many PremiumMedia items related to it
    // This assumes PremiumMedia has an 'artwork' field mapped by @ManyToOne
    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "related_entity_id", referencedColumnName = "id", insertable = false, updatable = false)
    @Where(clause = "related_to_entity_type = 'ARTWORK'") // Ensures only media related to artworks are fetched
    private List<PremiumMedia> premiumMedia;

    // One Artwork can be favorited by many Users (Profiles)
    // This is the inverse side of the many-to-many relationship, managed by UserFavoriteArtwork
    @OneToMany(mappedBy = "artwork", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<UserFavoriteArtwork> userFavorites;

    // If an artwork is sold, it will have one sale record
    @OneToOne(mappedBy = "artwork", cascade = CascadeType.ALL, fetch = FetchType.LAZY, optional = true)
    private ArtworkSale sale;
}