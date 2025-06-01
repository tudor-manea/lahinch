package com.lahinchgallery.lahinch_art_gallery_backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.OffsetDateTime;

@Entity
@Table(name = "user_favorite_artworks")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserFavoriteArtwork {

    @EmbeddedId // Marks the composite key
    private UserFavoriteArtworkId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("userId") // Maps the userId field of the EmbeddedId to this relationship
    @JoinColumn(name = "user_id", insertable = false, updatable = false)
    private Profile profile;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("artworkId") // Maps the artworkId field of the EmbeddedId to this relationship
    @JoinColumn(name = "artwork_id", insertable = false, updatable = false)
    private Artwork artwork;

    @CreationTimestamp
    @Column(name = "favorited_at", nullable = false, updatable = false)
    private OffsetDateTime favoritedAt;
}