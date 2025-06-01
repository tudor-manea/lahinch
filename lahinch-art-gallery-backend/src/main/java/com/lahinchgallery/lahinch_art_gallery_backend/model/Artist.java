package com.lahinchgallery.lahinch_art_gallery_backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.annotations.GenericGenerator;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "artists")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Artist {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "specialty")
    private String specialty;

    @Column(name = "location")
    private String location;

    @Column(name = "born")
    private String born; // e.g., "1975, Galway, Ireland"

    @Column(name = "education")
    private String education;

    @Column(name = "website")
    private String website;

    @Column(name = "bio", columnDefinition = "TEXT") // Use TEXT for potentially long strings
    private String bio;

    @Column(name = "additional_bio", columnDefinition = "TEXT")
    private String additionalBio;

    @Column(name = "profile_image_url")
    private String profileImageUrl; // Path in Supabase Storage

    @Column(name = "is_featured", nullable = false)
    private boolean isFeatured = false; // Default value

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private OffsetDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private OffsetDateTime updatedAt;

    // --- Relationships ---
    // One Artist can have many Artworks
    @OneToMany(mappedBy = "artist", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Artwork> artworks;

    // One Artist can have many PremiumMedia items related to them
    // We'll define a more specific relationship when creating the PremiumMedia entity,
    // potentially using a discriminator column or separate lists if needed.
    // For now, this is a placeholder if you want a direct list of all media types.
    // @OneToMany(mappedBy = "relatedArtist", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    // private List<PremiumMedia> premiumMedia;
}