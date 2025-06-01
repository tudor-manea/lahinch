package com.lahinchgallery.lahinch_art_gallery_backend.service;

import com.lahinchgallery.lahinch_art_gallery_backend.model.PremiumMedia;
import com.lahinchgallery.lahinch_art_gallery_backend.model.RelatedEntityType;
import com.lahinchgallery.lahinch_art_gallery_backend.repository.ArtistRepository;
import com.lahinchgallery.lahinch_art_gallery_backend.repository.ArtworkRepository;
import com.lahinchgallery.lahinch_art_gallery_backend.repository.PremiumMediaRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class PremiumMediaServiceImpl implements PremiumMediaService {

    private final PremiumMediaRepository premiumMediaRepository;
    private final ArtistRepository artistRepository;
    private final ArtworkRepository artworkRepository;
    private final StorageService storageService;
    private final String supabaseUrl;

    private static final String PREMIUM_MEDIA_FILES_BUCKET = "premium-media-files";
    private static final String PREMIUM_MEDIA_THUMBNAILS_BUCKET = "premium-media-thumbnails";

    @Autowired
    public PremiumMediaServiceImpl(PremiumMediaRepository premiumMediaRepository,
                                   ArtistRepository artistRepository,
                                   ArtworkRepository artworkRepository,
                                   StorageService storageService,
                                   @Qualifier("supabaseUrl") String supabaseUrl) {
        this.premiumMediaRepository = premiumMediaRepository;
        this.artistRepository = artistRepository;
        this.artworkRepository = artworkRepository;
        this.storageService = storageService;
        this.supabaseUrl = supabaseUrl;
    }

    @Override
    public List<PremiumMedia> getMediaForArtist(UUID artistId) {
        return premiumMediaRepository.findByRelatedToEntityTypeAndRelatedEntityId(RelatedEntityType.ARTIST, artistId);
    }

    @Override
    public List<PremiumMedia> getMediaForArtwork(UUID artworkId) {
        return premiumMediaRepository.findByRelatedToEntityTypeAndRelatedEntityId(RelatedEntityType.ARTWORK, artworkId);
    }

    @Override
    public Optional<PremiumMedia> getMediaById(UUID mediaId) {
        return premiumMediaRepository.findById(mediaId);
    }

    @Override
    @Transactional
    public PremiumMedia createMedia(PremiumMedia media, MultipartFile mediaFile, MultipartFile thumbnailFile) throws IOException {
        validateRelatedEntity(media.getRelatedToEntityType(), media.getRelatedEntityId());

        if (media.getId() == null) {
            media.setId(UUID.randomUUID());
        }
        media.setCreatedAt(OffsetDateTime.now());
        media.setUpdatedAt(OffsetDateTime.now());

        PremiumMedia savedMedia = premiumMediaRepository.save(media); // Save first to use ID in paths

        // Handle media file upload
        if (mediaFile != null && !mediaFile.isEmpty()) {
            String mediaFileName = "media_" + savedMedia.getId() + "_" + mediaFile.getOriginalFilename();
            String mediaFilePath = savedMedia.getRelatedToEntityType().name().toLowerCase() + "/" +
                    savedMedia.getRelatedEntityId() + "/" +
                    savedMedia.getId() + "/file/" + mediaFileName;
            storageService.uploadFile(PREMIUM_MEDIA_FILES_BUCKET, mediaFilePath, mediaFile);
            savedMedia.setFileUrl(storageService.getPublicFileUrl(PREMIUM_MEDIA_FILES_BUCKET, mediaFilePath));
        } else {
            throw new IllegalArgumentException("Media file must be provided for PremiumMedia creation.");
        }

        // Handle thumbnail upload (optional, typically for videos)
        if (thumbnailFile != null && !thumbnailFile.isEmpty()) {
            String thumbFileName = "thumb_" + savedMedia.getId() + "_" + thumbnailFile.getOriginalFilename();
            String thumbFilePath = savedMedia.getRelatedToEntityType().name().toLowerCase() + "/" +
                    savedMedia.getRelatedEntityId() + "/" +
                    savedMedia.getId() + "/thumb/" + thumbFileName;
            storageService.uploadFile(PREMIUM_MEDIA_THUMBNAILS_BUCKET, thumbFilePath, thumbnailFile);
            savedMedia.setThumbnailUrl(storageService.getPublicFileUrl(PREMIUM_MEDIA_THUMBNAILS_BUCKET, thumbFilePath));
        }

        savedMedia.setUpdatedAt(OffsetDateTime.now());
        return premiumMediaRepository.save(savedMedia);
    }

    @Override
    @Transactional
    public PremiumMedia updateMedia(UUID mediaId, PremiumMedia mediaDetails, MultipartFile mediaFile, MultipartFile thumbnailFile) throws IOException {
        PremiumMedia existingMedia = premiumMediaRepository.findById(mediaId)
                .orElseThrow(() -> new EntityNotFoundException("PremiumMedia not found with ID: " + mediaId));

        validateRelatedEntity(mediaDetails.getRelatedToEntityType(), mediaDetails.getRelatedEntityId());

        existingMedia.setTitle(mediaDetails.getTitle());
        existingMedia.setDescription(mediaDetails.getDescription());
        existingMedia.setMediaType(mediaDetails.getMediaType());
        existingMedia.setDurationSeconds(mediaDetails.getDurationSeconds());
        existingMedia.setRelatedToEntityType(mediaDetails.getRelatedToEntityType());
        existingMedia.setRelatedEntityId(mediaDetails.getRelatedEntityId());
        existingMedia.setUpdatedAt(OffsetDateTime.now());

        // Handle media file update
        if (mediaFile != null && !mediaFile.isEmpty()) {
            deleteOldFileFromStorage(existingMedia.getFileUrl(), PREMIUM_MEDIA_FILES_BUCKET);
            String mediaFileName = "media_" + existingMedia.getId() + "_" + mediaFile.getOriginalFilename();
            String mediaFilePath = existingMedia.getRelatedToEntityType().name().toLowerCase() + "/" +
                    existingMedia.getRelatedEntityId() + "/" +
                    existingMedia.getId() + "/file/" + mediaFileName;
            storageService.uploadFile(PREMIUM_MEDIA_FILES_BUCKET, mediaFilePath, mediaFile);
            existingMedia.setFileUrl(storageService.getPublicFileUrl(PREMIUM_MEDIA_FILES_BUCKET, mediaFilePath));
        }

        // Handle thumbnail file update
        if (thumbnailFile != null && !thumbnailFile.isEmpty()) {
            deleteOldFileFromStorage(existingMedia.getThumbnailUrl(), PREMIUM_MEDIA_THUMBNAILS_BUCKET);
            String thumbFileName = "thumb_" + existingMedia.getId() + "_" + thumbnailFile.getOriginalFilename();
            String thumbFilePath = existingMedia.getRelatedToEntityType().name().toLowerCase() + "/" +
                    existingMedia.getRelatedEntityId() + "/" +
                    existingMedia.getId() + "/thumb/" + thumbFileName;
            storageService.uploadFile(PREMIUM_MEDIA_THUMBNAILS_BUCKET, thumbFilePath, thumbnailFile);
            existingMedia.setThumbnailUrl(storageService.getPublicFileUrl(PREMIUM_MEDIA_THUMBNAILS_BUCKET, thumbFilePath));
        } else if (mediaDetails.getThumbnailUrl() == null && existingMedia.getThumbnailUrl() != null) {
            // If thumbnail URL is explicitly set to null in details, delete existing thumbnail
            deleteOldFileFromStorage(existingMedia.getThumbnailUrl(), PREMIUM_MEDIA_THUMBNAILS_BUCKET);
            existingMedia.setThumbnailUrl(null);
        }


        return premiumMediaRepository.save(existingMedia);
    }

    @Override
    @Transactional
    public void deleteMedia(UUID mediaId) throws IOException {
        PremiumMedia media = premiumMediaRepository.findById(mediaId)
                .orElseThrow(() -> new EntityNotFoundException("PremiumMedia not found with ID: " + mediaId));

        deleteOldFileFromStorage(media.getFileUrl(), PREMIUM_MEDIA_FILES_BUCKET);
        if (media.getThumbnailUrl() != null) {
            deleteOldFileFromStorage(media.getThumbnailUrl(), PREMIUM_MEDIA_THUMBNAILS_BUCKET);
        }

        premiumMediaRepository.delete(media);
    }

    private void validateRelatedEntity(RelatedEntityType entityType, UUID entityId) {
        if (entityType == null || entityId == null) {
            throw new IllegalArgumentException("Related entity type and ID must be provided.");
        }
        if (entityType == RelatedEntityType.ARTIST) {
            if (!artistRepository.existsById(entityId)) {
                throw new EntityNotFoundException("Related Artist not found with ID: " + entityId);
            }
        } else if (entityType == RelatedEntityType.ARTWORK) {
            if (!artworkRepository.existsById(entityId)) {
                throw new EntityNotFoundException("Related Artwork not found with ID: " + entityId);
            }
        } else {
            throw new IllegalArgumentException("Invalid RelatedEntityType: " + entityType);
        }
    }

    private void deleteOldFileFromStorage(String fileUrl, String bucketName) throws IOException {
        if (fileUrl != null && !fileUrl.isEmpty()) {
            try {
                String filePath = extractFilePathFromUrl(fileUrl, bucketName);
                if (filePath != null) {
                    storageService.deleteFile(bucketName, filePath);
                }
            } catch (Exception e) {
                System.err.println("Could not delete old file from " + bucketName + ": " + fileUrl + ". Error: " + e.getMessage());
                // Decide if this should be a fatal error or just logged
            }
        }
    }

    private String extractFilePathFromUrl(String fileUrl, String bucketName) {
        String prefix = supabaseUrl + "/storage/v1/object/public/" + bucketName + "/";
        if (fileUrl != null && fileUrl.startsWith(prefix)) {
            return fileUrl.substring(prefix.length());
        }
        System.err.println("Could not extract file path from URL: " + fileUrl + " with prefix " + prefix);
        return null;
    }
}