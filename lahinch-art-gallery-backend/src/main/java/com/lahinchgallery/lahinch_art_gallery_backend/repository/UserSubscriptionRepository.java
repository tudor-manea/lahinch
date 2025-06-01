package com.lahinchgallery.lahinch_art_gallery_backend.repository;

import com.lahinchgallery.lahinch_art_gallery_backend.model.UserSubscription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface UserSubscriptionRepository extends JpaRepository<UserSubscription, UUID> {
    // Primary key is userId (mapped from Profile)
    // findById(userId) will get the subscription for a user.
}