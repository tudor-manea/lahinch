package com.lahinchgallery.lahinch_art_gallery_backend.repository;

import com.lahinchgallery.lahinch_art_gallery_backend.model.Artist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ArtistRepository extends JpaRepository<Artist, UUID> {

    // Custom query method to find featured artists, as mentioned in description.md
    // Spring Data JPA will automatically generate the query based on the method name.
    List<Artist> findByIsFeaturedTrue(); //
}
