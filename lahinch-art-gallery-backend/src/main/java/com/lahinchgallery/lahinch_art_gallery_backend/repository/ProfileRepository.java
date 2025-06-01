package com.lahinchgallery.lahinch_art_gallery_backend.repository;

import com.lahinchgallery.lahinch_art_gallery_backend.model.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository // Marks this interface as a Spring Data repository
public interface ProfileRepository extends JpaRepository<Profile, UUID> {
}