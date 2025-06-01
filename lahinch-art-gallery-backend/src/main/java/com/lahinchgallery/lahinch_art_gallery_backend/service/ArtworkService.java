package com.lahinchgallery.lahinch_art_gallery_backend.service;

import com.lahinchgallery.lahinch_art_gallery_backend.model.Artwork;
import com.lahinchgallery.lahinch_art_gallery_backend.model.ArtworkAvailabilityStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

public interface ArtworkService {
    // For "getAllArtworks(pagination, filters, searchParams)"
    // We'll start with basic pagination and add an example for filtering by artistId
    // True dynamic filtering using JpaSpecificationExecutor can be implemented later.
    Page<Artwork> getAllArtworks(Pageable pageable, Map<String, String> filters, String searchTerm);

    Optional<Artwork> getArtworkById(UUID artworkId);
    Page<Artwork> getArtworksByArtist(UUID artistId, Pageable pageable);
    Artwork createArtwork(Artwork artwork, MultipartFile artworkImageFile) throws IOException;
    Artwork updateArtwork(UUID artworkId, Artwork artworkDetails, MultipartFile artworkImageFile) throws IOException;
    void deleteArtwork(UUID artworkId) throws IOException;
    Artwork updateArtworkAvailability(UUID artworkId, ArtworkAvailabilityStatus status);
}