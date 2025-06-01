package com.lahinchgallery.lahinch_art_gallery_backend.service;

import com.lahinchgallery.lahinch_art_gallery_backend.model.Profile;
import com.lahinchgallery.lahinch_art_gallery_backend.model.UserRole;

import java.util.Optional;
import java.util.UUID;

public interface UserService {
    Profile createUserProfile(UUID userId, String firstName, String lastName, String email); // Adjusted from registerUser
    Optional<Profile> getUserProfile(UUID userId);
    Profile updateUserProfile(UUID userId, String firstName, String lastName);
    Profile grantSubscriberRole(UUID userId);
    UserRole getUserRole(UUID userId);
    // Optional: A method to create or update profile, useful for handling users from Supabase Auth
    Profile createOrUpdateProfile(UUID userId, String email, String firstName, String lastName);
}