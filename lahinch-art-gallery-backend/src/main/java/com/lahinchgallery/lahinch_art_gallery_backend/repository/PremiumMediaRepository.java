package com.lahinchgallery.lahinch_art_gallery_backend.repository;

import com.lahinchgallery.lahinch_art_gallery_backend.model.PremiumMedia;
import com.lahinchgallery.lahinch_art_gallery_backend.model.RelatedEntityType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface PremiumMediaRepository extends JpaRepository<PremiumMedia, UUID> {

    // To get media for a specific artist or artwork, as per description.md
    // "getMediaForArtist(artistId)" and "getMediaForArtwork(artworkId)"
    List<PremiumMedia> findByRelatedToEntityTypeAndRelatedEntityId(RelatedEntityType entityType, UUID entityId); //

    // Alternatively, if you prefer separate methods:
    // List<PremiumMedia> findByRelatedToEntityTypeAndArtistId(RelatedEntityType entityType, UUID artistId);
    // List<PremiumMedia> findByRelatedToEntityTypeAndArtworkId(RelatedEntityType entityType, UUID artworkId);
    // However, given the single relatedEntityId, the first method is more direct.
}