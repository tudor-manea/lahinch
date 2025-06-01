package com.lahinchgallery.lahinch_art_gallery_backend.service;

import com.lahinchgallery.lahinch_art_gallery_backend.model.Artwork;
import com.lahinchgallery.lahinch_art_gallery_backend.model.Profile;
import com.lahinchgallery.lahinch_art_gallery_backend.model.UserFavoriteArtwork;
import com.lahinchgallery.lahinch_art_gallery_backend.model.UserFavoriteArtworkId;
import com.lahinchgallery.lahinch_art_gallery_backend.repository.ArtworkRepository;
import com.lahinchgallery.lahinch_art_gallery_backend.repository.ProfileRepository;
import com.lahinchgallery.lahinch_art_gallery_backend.repository.UserFavoriteArtworkRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.OffsetDateTime;
import java.util.UUID;

@Service
public class FavoriteArtworkServiceImpl implements FavoriteArtworkService {

    private final UserFavoriteArtworkRepository userFavoriteArtworkRepository;
    private final ProfileRepository profileRepository;
    private final ArtworkRepository artworkRepository;

    @Autowired
    public FavoriteArtworkServiceImpl(UserFavoriteArtworkRepository userFavoriteArtworkRepository,
                                      ProfileRepository profileRepository,
                                      ArtworkRepository artworkRepository) {
        this.userFavoriteArtworkRepository = userFavoriteArtworkRepository;
        this.profileRepository = profileRepository;
        this.artworkRepository = artworkRepository;
    }

    @Override
    @Transactional
    public UserFavoriteArtwork addArtworkToFavorites(UUID userId, UUID artworkId) {
        Profile profile = profileRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("Profile not found with ID: " + userId));
        Artwork artwork = artworkRepository.findById(artworkId)
                .orElseThrow(() -> new EntityNotFoundException("Artwork not found with ID: " + artworkId));

        UserFavoriteArtworkId favoriteId = new UserFavoriteArtworkId(userId, artworkId);
        if (userFavoriteArtworkRepository.existsById(favoriteId)) {
            // Optionally, you can just return the existing favorite or throw an exception
            // For now, let's throw an exception to indicate it's already a favorite.
            throw new DataIntegrityViolationException("Artwork " + artworkId + " is already favorited by user " + userId);
        }

        UserFavoriteArtwork favorite = new UserFavoriteArtwork();
        favorite.setId(favoriteId);
        favorite.setProfile(profile);
        favorite.setArtwork(artwork);
        favorite.setFavoritedAt(OffsetDateTime.now()); // Handled by @CreationTimestamp but can be set explicitly

        return userFavoriteArtworkRepository.save(favorite);
    }

    @Override
    @Transactional
    public void removeArtworkFromFavorites(UUID userId, UUID artworkId) {
        UserFavoriteArtworkId favoriteId = new UserFavoriteArtworkId(userId, artworkId);
        if (!userFavoriteArtworkRepository.existsById(favoriteId)) {
            throw new EntityNotFoundException("Favorite entry not found for user " + userId + " and artwork " + artworkId);
        }
        userFavoriteArtworkRepository.deleteById(favoriteId);
    }

    @Override
    public Page<UserFavoriteArtwork> getUserFavoriteArtworks(UUID userId, Pageable pageable) {
        if (!profileRepository.existsById(userId)) {
            throw new EntityNotFoundException("Profile not found with ID: " + userId);
        }
        return userFavoriteArtworkRepository.findByIdUserId(userId, pageable);
    }

    @Override
    public boolean isArtworkFavoritedByUser(UUID userId, UUID artworkId) {
        UserFavoriteArtworkId favoriteId = new UserFavoriteArtworkId(userId, artworkId);
        return userFavoriteArtworkRepository.existsById(favoriteId);
    }
}