package com.lahinchgallery.lahinch_art_gallery_backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "user_subscriptions")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserSubscription {

    @Id // The user_id is the primary key for this table
    @Column(name = "user_id")
    private UUID userId;

    @OneToOne(fetch = FetchType.LAZY) // Establishes a one-to-one relationship with Profile
    @MapsId // Maps the userId field (which is the ID of this entity) to the ID of the Profile entity
    @JoinColumn(name = "user_id") // This column is both PK and FK
    private Profile profile;

    @Column(name = "payment_id", nullable = false, unique = true)
    private String paymentId; // Stripe Payment Intent ID or similar

    @Column(name = "payment_amount", precision = 10, scale = 2, nullable = false)
    private BigDecimal paymentAmount;

    @Column(name = "payment_currency", nullable = false)
    private String paymentCurrency = "EUR"; // Default as per description

    @Column(name = "purchase_date", nullable = false, updatable = false)
    private OffsetDateTime purchaseDate; // Should be set on creation

    @Enumerated(EnumType.STRING)
    @Column(name = "access_type", nullable = false)
    private AccessType accessType = AccessType.LIFETIME_UNLIMITED;

    @PrePersist
    protected void onCreate() {
        if (purchaseDate == null) {
            purchaseDate = OffsetDateTime.now();
        }
    }
}
