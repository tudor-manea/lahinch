package com.lahinchgallery.lahinch_art_gallery_backend.service;

import com.lahinchgallery.lahinch_art_gallery_backend.dto.ArtworkSaleDto; // We'll define this DTO
import com.lahinchgallery.lahinch_art_gallery_backend.model.ArtworkSale;
import com.stripe.exception.StripeException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ArtworkSalesService {
    String createPaymentIntentForArtwork(UUID artworkId, Optional<UUID> userId) throws StripeException;
    ArtworkSale recordArtworkSale(ArtworkSaleDto saleDto); // DTO to carry sale information
    Optional<ArtworkSale> getSaleById(UUID saleId);
    List<ArtworkSale> getSalesByArtwork(UUID artworkId);
    List<ArtworkSale> getSalesByBuyer(UUID userId); // Assuming userId refers to Profile.userId
    Page<ArtworkSale> getRecentSales(Pageable pageable); // Use Pageable for limit and sorting
}