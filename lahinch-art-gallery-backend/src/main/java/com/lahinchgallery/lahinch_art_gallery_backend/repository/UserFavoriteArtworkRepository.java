package com.lahinchgallery.lahinch_art_gallery_backend.repository;

import com.lahinchgallery.lahinch_art_gallery_backend.model.UserFavoriteArtwork;
import com.lahinchgallery.lahinch_art_gallery_backend.model.UserFavoriteArtworkId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface UserFavoriteArtworkRepository extends JpaRepository<UserFavoriteArtwork, UserFavoriteArtworkId> {

    // "getUserFavoriteArtworks(userId, pagination)"
    // Spring Data JPA can create queries based on fields in the composite ID.
    // 'Id' refers to the @EmbeddedId field, 'UserId' is the property within UserFavoriteArtworkId.
    Page<UserFavoriteArtwork> findByIdUserId(UUID userId, Pageable pageable); //

    // For "isArtworkFavoritedByUser(userId, artworkId)"
    // You can use existsById(UserFavoriteArtworkId id) directly from JpaRepository.
    // boolean existsById_UserIdAndId_ArtworkId(UUID userId, UUID artworkId); // Alternative naming
}