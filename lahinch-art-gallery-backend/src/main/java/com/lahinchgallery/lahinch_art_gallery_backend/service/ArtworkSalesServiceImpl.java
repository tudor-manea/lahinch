package com.lahinchgallery.lahinch_art_gallery_backend.service;

import com.lahinchgallery.lahinch_art_gallery_backend.dto.ArtworkSaleDto;
import com.lahinchgallery.lahinch_art_gallery_backend.model.Artwork;
import com.lahinchgallery.lahinch_art_gallery_backend.model.ArtworkAvailabilityStatus;
import com.lahinchgallery.lahinch_art_gallery_backend.model.ArtworkSale;
import com.lahinchgallery.lahinch_art_gallery_backend.model.Profile;
import com.lahinchgallery.lahinch_art_gallery_backend.repository.ArtworkRepository;
import com.lahinchgallery.lahinch_art_gallery_backend.repository.ArtworkSaleRepository;
import com.lahinchgallery.lahinch_art_gallery_backend.repository.ProfileRepository;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ArtworkSalesServiceImpl implements ArtworkSalesService {

    private final ArtworkSaleRepository artworkSaleRepository;
    private final ArtworkRepository artworkRepository;
    private final ProfileRepository profileRepository;
    private final ArtworkService artworkService; // To update artwork availability


    @Autowired
    public ArtworkSalesServiceImpl(ArtworkSaleRepository artworkSaleRepository,
                                   ArtworkRepository artworkRepository,
                                   ProfileRepository profileRepository,
                                   ArtworkService artworkService) {
        this.artworkSaleRepository = artworkSaleRepository;
        this.artworkRepository = artworkRepository;
        this.profileRepository = profileRepository;
        this.artworkService = artworkService;
    }

    @Override
    @Transactional(readOnly = true) // Read-only as it doesn't change our DB state before Stripe call
    public String createPaymentIntentForArtwork(UUID artworkId, Optional<UUID> userIdOpt) throws StripeException {
        Artwork artwork = artworkRepository.findById(artworkId)
                .orElseThrow(() -> new EntityNotFoundException("Artwork not found with ID: " + artworkId));

        if (artwork.getAvailabilityStatus() != ArtworkAvailabilityStatus.AVAILABLE) {
            throw new IllegalStateException("Artwork is not available for sale. Current status: " + artwork.getAvailabilityStatus());
        }

        if (artwork.getPrice() == null || artwork.getPrice().compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalStateException("Artwork price is not set or is invalid.");
        }

        // Stripe expects amount in the smallest currency unit (e.g., cents)
        long amountInCents = artwork.getPrice().multiply(new BigDecimal("100")).longValue();

        PaymentIntentCreateParams.Builder paramsBuilder = PaymentIntentCreateParams.builder()
                .setAmount(amountInCents)
                .setCurrency("EUR") // Assuming EUR, make this configurable if needed
                .setDescription("Sale of artwork: " + artwork.getTitle())
                .putMetadata("artwork_id", artworkId.toString());

        userIdOpt.ifPresent(userId -> paramsBuilder.putMetadata("user_id", userId.toString()));

        PaymentIntent paymentIntent = PaymentIntent.create(paramsBuilder.build());
        return paymentIntent.getClientSecret();
    }

    @Override
    @Transactional
    public ArtworkSale recordArtworkSale(ArtworkSaleDto saleDto) {
        Artwork artwork = artworkRepository.findById(saleDto.getArtworkId())
                .orElseThrow(() -> new EntityNotFoundException("Artwork not found with ID: " + saleDto.getArtworkId()));

        if (artwork.getAvailabilityStatus() == ArtworkAvailabilityStatus.SOLD) {
            // Idempotency check or handle as an error
            // For now, let's throw an error if already sold by another record.
            // A more robust check might query ArtworkSaleRepository by artworkId.
            throw new IllegalStateException("Artwork " + artwork.getTitle() + " is already marked as sold.");
        }

        ArtworkSale sale = new ArtworkSale();
        sale.setArtwork(artwork);

        if (saleDto.getBuyerUserId() != null) {
            Profile buyerProfile = profileRepository.findById(saleDto.getBuyerUserId())
                    .orElseThrow(() -> new EntityNotFoundException("Buyer profile not found with ID: " + saleDto.getBuyerUserId()));
            sale.setBuyerUser(buyerProfile);
        }
        sale.setBuyerName(saleDto.getBuyerName());
        sale.setBuyerEmail(saleDto.getBuyerEmail());
        sale.setSalePrice(saleDto.getSalePrice() != null ? saleDto.getSalePrice() : artwork.getPrice()); // Use DTO price, fallback to artwork price
        sale.setSaleDate(saleDto.getSaleDate() != null ? saleDto.getSaleDate() : OffsetDateTime.now());
        sale.setPaymentReference(saleDto.getPaymentReference());
        sale.setShippingAddress(saleDto.getShippingAddress());
        sale.setNotes(saleDto.getNotes());
        sale.setCreatedAt(OffsetDateTime.now());
        sale.setUpdatedAt(OffsetDateTime.now());

        ArtworkSale savedSale = artworkSaleRepository.save(sale);

        // Update artwork status to SOLD
        artworkService.updateArtworkAvailability(artwork.getId(), ArtworkAvailabilityStatus.SOLD);

        return savedSale;
    }

    @Override
    public Optional<ArtworkSale> getSaleById(UUID saleId) {
        return artworkSaleRepository.findById(saleId);
    }

    @Override
    public List<ArtworkSale> getSalesByArtwork(UUID artworkId) {
        return artworkSaleRepository.findByArtworkId(artworkId);
    }

    @Override
    public List<ArtworkSale> getSalesByBuyer(UUID userId) {
        return artworkSaleRepository.findByBuyerUserProfileUserId(userId);
    }

    @Override
    public Page<ArtworkSale> getRecentSales(Pageable pageable) {
        // Ensure sorting by saleDate descending if not specified
        if (pageable.getSort().isUnsorted()) {
            pageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by("saleDate").descending());
        }
        return artworkSaleRepository.findAll(pageable);
    }
}