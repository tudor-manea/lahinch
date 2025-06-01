package com.lahinchgallery.lahinch_art_gallery_backend.service;

import com.lahinchgallery.lahinch_art_gallery_backend.model.PremiumMedia;
import com.lahinchgallery.lahinch_art_gallery_backend.model.RelatedEntityType;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface PremiumMediaService {
    List<PremiumMedia> getMediaForArtist(UUID artistId);
    List<PremiumMedia> getMediaForArtwork(UUID artworkId);
    Optional<PremiumMedia> getMediaById(UUID mediaId);
    PremiumMedia createMedia(PremiumMedia media, MultipartFile mediaFile, MultipartFile thumbnailFile) throws IOException;
    PremiumMedia updateMedia(UUID mediaId, PremiumMedia mediaDetails, MultipartFile mediaFile, MultipartFile thumbnailFile) throws IOException;
    void deleteMedia(UUID mediaId) throws IOException;
}