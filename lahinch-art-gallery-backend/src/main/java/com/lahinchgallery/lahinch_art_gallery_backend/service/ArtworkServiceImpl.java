package com.lahinchgallery.lahinch_art_gallery_backend.service;

import com.lahinchgallery.lahinch_art_gallery_backend.model.Artist;
import com.lahinchgallery.lahinch_art_gallery_backend.model.Artwork;
import com.lahinchgallery.lahinch_art_gallery_backend.model.ArtworkAvailabilityStatus;
import com.lahinchgallery.lahinch_art_gallery_backend.repository.ArtistRepository;
import com.lahinchgallery.lahinch_art_gallery_backend.repository.ArtworkRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.OffsetDateTime;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Service
public class ArtworkServiceImpl implements ArtworkService {

    private final ArtworkRepository artworkRepository;
    private final ArtistRepository artistRepository; // To validate artist existence
    private final StorageService storageService;
    private final String supabaseUrl;


    private static final String ARTWORK_IMAGES_BUCKET = "artwork-images";

    @Autowired
    public ArtworkServiceImpl(ArtworkRepository artworkRepository,
                              ArtistRepository artistRepository,
                              StorageService storageService,
                              @Qualifier("supabaseUrl") String supabaseUrl) {
        this.artworkRepository = artworkRepository;
        this.artistRepository = artistRepository;
        this.storageService = storageService;
        this.supabaseUrl = supabaseUrl;
    }

    @Override
    public Page<Artwork> getAllArtworks(Pageable pageable, Map<String, String> filters, String searchTerm) {
        // Basic implementation: JpaSpecificationExecutor would be used here for dynamic filters
        // For now, we just return all artworks paginated or filter by artistId if provided in filters
        // A more complex implementation would build a Specification based on filters and searchTerm.

        Specification<Artwork> spec = Specification.where(null); // Start with a non-restrictive specification

        if (filters != null && filters.containsKey("artistId")) {
            try {
                UUID artistId = UUID.fromString(filters.get("artistId"));
                spec = spec.and((root, query, criteriaBuilder) ->
                        criteriaBuilder.equal(root.get("artist").get("id"), artistId)
                );
            } catch (IllegalArgumentException e) {
                // Handle invalid UUID format if necessary, or log
            }
        }

        if (StringUtils.hasText(searchTerm)) {
            String likePattern = "%" + searchTerm.toLowerCase() + "%";
            spec = spec.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.or(
                            criteriaBuilder.like(criteriaBuilder.lower(root.get("title")), likePattern),
                            criteriaBuilder.like(criteriaBuilder.lower(root.get("description")), likePattern),
                            criteriaBuilder.like(criteriaBuilder.lower(root.get("medium")), likePattern),
                            criteriaBuilder.like(criteriaBuilder.lower(root.get("artist").get("name")), likePattern)
                    )
            );
        }

        return artworkRepository.findAll(spec, pageable);
    }

    @Override
    public Optional<Artwork> getArtworkById(UUID artworkId) {
        return artworkRepository.findById(artworkId);
    }

    @Override
    public Page<Artwork> getArtworksByArtist(UUID artistId, Pageable pageable) {
        if (!artistRepository.existsById(artistId)) {
            throw new EntityNotFoundException("Artist not found with ID: " + artistId);
        }
        return artworkRepository.findByArtistId(artistId, pageable);
    }

    @Override
    @Transactional
    public Artwork createArtwork(Artwork artwork, MultipartFile artworkImageFile) throws IOException {
        // Validate Artist
        if (artwork.getArtist() == null || artwork.getArtist().getId() == null) {
            throw new IllegalArgumentException("Artist ID must be provided for an artwork.");
        }
        Artist artist = artistRepository.findById(artwork.getArtist().getId())
                .orElseThrow(() -> new EntityNotFoundException("Artist not found with ID: " + artwork.getArtist().getId()));
        artwork.setArtist(artist); // Ensure the managed artist entity is set

        if (artwork.getId() == null) {
            artwork.setId(UUID.randomUUID());
        }
        artwork.setCreatedAt(OffsetDateTime.now());
        artwork.setUpdatedAt(OffsetDateTime.now());

        // If availability is not set, default it (optional, depending on your model's default)
        if (artwork.getAvailabilityStatus() == null) {
            artwork.setAvailabilityStatus(ArtworkAvailabilityStatus.AVAILABLE);
        }

        Artwork savedArtwork = artworkRepository.save(artwork); // Save first

        if (artworkImageFile != null && !artworkImageFile.isEmpty()) {
            String fileName = "artwork_" + savedArtwork.getId() + "_" + artworkImageFile.getOriginalFilename();
            String filePath = savedArtwork.getId() + "/" + fileName; // Store in a folder per artwork

            storageService.uploadFile(ARTWORK_IMAGES_BUCKET, filePath, artworkImageFile);
            String fileUrl = storageService.getPublicFileUrl(ARTWORK_IMAGES_BUCKET, filePath);
            savedArtwork.setArtworkImageUrl(fileUrl);
            savedArtwork.setUpdatedAt(OffsetDateTime.now());
            return artworkRepository.save(savedArtwork);
        }
        return savedArtwork;
    }

    @Override
    @Transactional
    public Artwork updateArtwork(UUID artworkId, Artwork artworkDetails, MultipartFile artworkImageFile) throws IOException {
        Artwork existingArtwork = artworkRepository.findById(artworkId)
                .orElseThrow(() -> new EntityNotFoundException("Artwork not found with ID: " + artworkId));

        // Validate and set artist if changed
        if (artworkDetails.getArtist() != null && artworkDetails.getArtist().getId() != null) {
            if (!artworkDetails.getArtist().getId().equals(existingArtwork.getArtist().getId())) {
                Artist artist = artistRepository.findById(artworkDetails.getArtist().getId())
                        .orElseThrow(() -> new EntityNotFoundException("Artist not found with ID: " + artworkDetails.getArtist().getId()));
                existingArtwork.setArtist(artist);
            }
        } else if (artworkDetails.getArtist() != null && artworkDetails.getArtist().getId() == null) {
            throw new IllegalArgumentException("Artist ID must be provided if artist object is present in update details.");
        }


        existingArtwork.setTitle(artworkDetails.getTitle());
        existingArtwork.setDescription(artworkDetails.getDescription());
        existingArtwork.setMedium(artworkDetails.getMedium());
        existingArtwork.setDimensions(artworkDetails.getDimensions());
        existingArtwork.setYearCreated(artworkDetails.getYearCreated());
        existingArtwork.setPrice(artworkDetails.getPrice());
        if (artworkDetails.getAvailabilityStatus() != null) {
            existingArtwork.setAvailabilityStatus(artworkDetails.getAvailabilityStatus());
        }
        existingArtwork.setUpdatedAt(OffsetDateTime.now());

        if (artworkImageFile != null && !artworkImageFile.isEmpty()) {
            if (existingArtwork.getArtworkImageUrl() != null && !existingArtwork.getArtworkImageUrl().isEmpty()) {
                try {
                    String existingFilePath = extractFilePathFromUrl(existingArtwork.getArtworkImageUrl(), ARTWORK_IMAGES_BUCKET);
                    if (existingFilePath != null) {
                        storageService.deleteFile(ARTWORK_IMAGES_BUCKET, existingFilePath);
                    }
                } catch (Exception e) {
                    System.err.println("Could not delete old artwork image: " + e.getMessage());
                }
            }
            String fileName = "artwork_" + existingArtwork.getId() + "_" + artworkImageFile.getOriginalFilename();
            String filePath = existingArtwork.getId() + "/" + fileName;

            storageService.uploadFile(ARTWORK_IMAGES_BUCKET, filePath, artworkImageFile);
            String fileUrl = storageService.getPublicFileUrl(ARTWORK_IMAGES_BUCKET, filePath);
            existingArtwork.setArtworkImageUrl(fileUrl);
        }

        return artworkRepository.save(existingArtwork);
    }

    @Override
    @Transactional
    public void deleteArtwork(UUID artworkId) throws IOException {
        Artwork artwork = artworkRepository.findById(artworkId)
                .orElseThrow(() -> new EntityNotFoundException("Artwork not found with ID: " + artworkId));

        if (artwork.getArtworkImageUrl() != null && !artwork.getArtworkImageUrl().isEmpty()) {
            try {
                String filePath = extractFilePathFromUrl(artwork.getArtworkImageUrl(), ARTWORK_IMAGES_BUCKET);
                if (filePath != null) {
                    storageService.deleteFile(ARTWORK_IMAGES_BUCKET, filePath);
                }
            } catch (Exception e) {
                System.err.println("Could not delete artwork image during artwork deletion: " + e.getMessage());
            }
        }
        // Consider handling related entities like PremiumMedia or Favorites if cascading isn't set up in JPA
        artworkRepository.delete(artwork);
    }

    @Override
    @Transactional
    public Artwork updateArtworkAvailability(UUID artworkId, ArtworkAvailabilityStatus status) {
        Artwork artwork = artworkRepository.findById(artworkId)
                .orElseThrow(() -> new EntityNotFoundException("Artwork not found with ID: " + artworkId));
        artwork.setAvailabilityStatus(status);
        artwork.setUpdatedAt(OffsetDateTime.now());
        return artworkRepository.save(artwork);
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