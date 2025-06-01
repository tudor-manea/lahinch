package com.lahinchgallery.lahinch_art_gallery_backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;

import java.io.Serializable;
import java.util.UUID;

@Embeddable // Marks this class as embeddable, for use as a composite key
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode // Important for composite keys
public class UserFavoriteArtworkId implements Serializable {

    @Column(name = "user_id", nullable = false)
    private UUID userId;

    @Column(name = "artwork_id", nullable = false)
    private UUID artworkId;
}
