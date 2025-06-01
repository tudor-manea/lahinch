package com.lahinchgallery.lahinch_art_gallery_backend.service;

import com.lahinchgallery.lahinch_art_gallery_backend.model.Profile;
import com.lahinchgallery.lahinch_art_gallery_backend.model.UserRole;
import com.lahinchgallery.lahinch_art_gallery_backend.repository.ProfileRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.OffsetDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {

    private final ProfileRepository profileRepository;

    @Autowired
    public UserServiceImpl(ProfileRepository profileRepository) {
        this.profileRepository = profileRepository;
    }

    @Override
    @Transactional
    public Profile createUserProfile(UUID userId, String firstName, String lastName, String email) {
        if (profileRepository.existsById(userId)) {
            // Or handle as an update, or throw a specific "profile already exists" exception
            throw new IllegalArgumentException("Profile already exists for user ID: " + userId);
        }
        Profile profile = new Profile();
        profile.setUserId(userId); // This ID comes from Supabase Auth
        profile.setFirstName(firstName);
        profile.setLastName(lastName);
        // Email is not directly in Profile model as per your definition, but often useful.
        // If you add an email field to Profile model, set it here.
        profile.setRole(UserRole.PUBLIC_USER); // Default role
        profile.setCreatedAt(OffsetDateTime.now());
        profile.setUpdatedAt(OffsetDateTime.now());
        return profileRepository.save(profile);
    }

    @Override
    public Optional<Profile> getUserProfile(UUID userId) {
        return profileRepository.findById(userId);
    }

    @Override
    @Transactional
    public Profile updateUserProfile(UUID userId, String firstName, String lastName) {
        Profile profile = profileRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("Profile not found with ID: " + userId));

        if (firstName != null && !firstName.isEmpty()) {
            profile.setFirstName(firstName);
        }
        if (lastName != null && !lastName.isEmpty()) {
            profile.setLastName(lastName);
        }
        profile.setUpdatedAt(OffsetDateTime.now());
        return profileRepository.save(profile);
    }

    @Override
    @Transactional
    public Profile grantSubscriberRole(UUID userId) {
        Profile profile = profileRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("Profile not found with ID: " + userId));
        profile.setRole(UserRole.SUBSCRIBER);
        profile.setUpdatedAt(OffsetDateTime.now());
        return profileRepository.save(profile);
    }

    @Override
    public UserRole getUserRole(UUID userId) {
        Profile profile = profileRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("Profile not found with ID: " + userId));
        return profile.getRole();
    }

    @Override
    @Transactional
    public Profile createOrUpdateProfile(UUID userId, String email, String firstName, String lastName) {
        Optional<Profile> existingProfileOpt = profileRepository.findById(userId);
        Profile profile;
        if (existingProfileOpt.isPresent()) {
            profile = existingProfileOpt.get();
            if (firstName != null) profile.setFirstName(firstName);
            if (lastName != null) profile.setLastName(lastName);
            // Optionally update email if it changes, though email is usually immutable or part of auth.users
        } else {
            profile = new Profile();
            profile.setUserId(userId);
            profile.setFirstName(firstName);
            profile.setLastName(lastName);
            profile.setRole(UserRole.PUBLIC_USER); // Default for new profiles
        }
        profile.setUpdatedAt(OffsetDateTime.now());
        if (profile.getCreatedAt() == null) {
            profile.setCreatedAt(OffsetDateTime.now());
        }
        return profileRepository.save(profile);
    }
}