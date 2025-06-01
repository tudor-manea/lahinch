package com.lahinchgallery.lahinch_art_gallery_backend.repository;

import com.lahinchgallery.lahinch_art_gallery_backend.model.Artwork;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ArtworkRepository extends JpaRepository<Artwork, UUID>, JpaSpecificationExecutor<Artwork> {

    // Custom query to find artworks by artist ID with pagination
    // as mentioned in description.md ("getArtworksByArtist(artistId, pagination)")
    Page<Artwork> findByArtistId(UUID artistId, Pageable pageable); //

    // JpaSpecificationExecutor allows for dynamic queries using the Criteria API,
    // which will be useful for "getAllArtworks(pagination, filters, searchParams)"
}