package com.lahinchgallery.lahinch_art_gallery_backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.annotations.GenericGenerator;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "artwork_sales")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ArtworkSale {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @OneToOne(fetch = FetchType.LAZY) // An artwork can only be sold once
    @JoinColumn(name = "artwork_id", nullable = false, unique = true)
    private Artwork artwork;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "buyer_user_id") // Nullable, as buyer might not be a registered user
    private Profile buyerUser; // Links to the profiles table

    @Column(name = "buyer_name")
    private String buyerName;

    @Column(name = "buyer_email")
    private String buyerEmail;

    @Column(name = "sale_price", precision = 10, scale = 2, nullable = false)
    private BigDecimal salePrice;

    @Column(name = "sale_date", nullable = false)
    private OffsetDateTime saleDate;

    @Column(name = "payment_reference")
    private String paymentReference; // e.g., Stripe Payment Intent ID

    @Column(name = "shipping_address", columnDefinition = "TEXT")
    private String shippingAddress;

    @Column(name = "notes", columnDefinition = "TEXT")
    private String notes;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private OffsetDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private OffsetDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        if (saleDate == null) {
            saleDate = OffsetDateTime.now();
        }
    }
}
