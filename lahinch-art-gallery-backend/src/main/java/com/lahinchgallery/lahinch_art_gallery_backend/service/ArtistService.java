package com.lahinchgallery.lahinch_art_gallery_backend.service;

import com.lahinchgallery.lahinch_art_gallery_backend.model.Artist;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ArtistService {
    Page<Artist> getAllArtists(Pageable pageable); // Basic pagination, filters can be added later
    Optional<Artist> getArtistById(UUID artistId);
    Artist createArtist(Artist artist, MultipartFile profileImageFile) throws IOException;
    Artist updateArtist(UUID artistId, Artist artistDetails, MultipartFile profileImageFile) throws IOException;
    void deleteArtist(UUID artistId) throws IOException;
    List<Artist> getFeaturedArtists();
}