package com.lahinchgallery.lahinch_art_gallery_backend.service;

import com.lahinchgallery.lahinch_art_gallery_backend.model.UserFavoriteArtwork;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

public interface FavoriteArtworkService {
    UserFavoriteArtwork addArtworkToFavorites(UUID userId, UUID artworkId);
    void removeArtworkFromFavorites(UUID userId, UUID artworkId);
    Page<UserFavoriteArtwork> getUserFavoriteArtworks(UUID userId, Pageable pageable);
    boolean isArtworkFavoritedByUser(UUID userId, UUID artworkId);
}