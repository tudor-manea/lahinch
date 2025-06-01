package com.lahinchgallery.lahinch_art_gallery_backend.repository;

import com.lahinchgallery.lahinch_art_gallery_backend.model.ArtworkSale;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ArtworkSaleRepository extends JpaRepository<ArtworkSale, UUID> {

    // "getSalesByArtwork(artworkId)"
    List<ArtworkSale> findByArtworkId(UUID artworkId); //

    // "getSalesByUser(userId)" - assumes buyerUser is the Profile entity, and we query by its userId.
    List<ArtworkSale> findByBuyerUserProfileUserId(UUID userId); //

    // For "getRecentSales(limit)", you'd typically use Pageable in the service layer:
    // e.g., findAll(PageRequest.of(0, limit, Sort.by("saleDate").descending()))
}