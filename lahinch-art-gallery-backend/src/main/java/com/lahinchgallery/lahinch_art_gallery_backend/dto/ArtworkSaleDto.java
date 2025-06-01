package com.lahinchgallery.lahinch_art_gallery_backend.dto;

import com.lahinchgallery.lahinch_art_gallery_backend.model.Artwork;
import com.lahinchgallery.lahinch_art_gallery_backend.model.Profile;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ArtworkSaleDto {
    private UUID artworkId;
    private UUID buyerUserId; // Optional: if buyer is a registered user
    private String buyerName; // If buyer is not registered or for record
    private String buyerEmail; // If buyer is not registered or for record
    private BigDecimal salePrice; // Should match artwork's price at time of sale
    private OffsetDateTime saleDate;
    private String paymentReference; // Stripe Payment Intent ID
    private String shippingAddress;
    private String notes;
}