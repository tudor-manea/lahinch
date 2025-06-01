package com.lahinchgallery.lahinch_art_gallery_backend.service;

import com.lahinchgallery.lahinch_art_gallery_backend.model.AccessType;
import com.lahinchgallery.lahinch_art_gallery_backend.model.Profile;
import com.lahinchgallery.lahinch_art_gallery_backend.model.UserSubscription;
import com.lahinchgallery.lahinch_art_gallery_backend.repository.ProfileRepository;
import com.lahinchgallery.lahinch_art_gallery_backend.repository.UserSubscriptionRepository;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.UUID;

@Service
public class SubscriptionServiceImpl implements SubscriptionService {

    private final UserSubscriptionRepository userSubscriptionRepository;
    private final ProfileRepository profileRepository;
    private final UserService userService; // For granting subscriber role

    // The subscription amount in cents (e.g., €1.99 = 199 cents)
    private static final long SUBSCRIPTION_AMOUNT_CENTS = 199;
    private static final String SUBSCRIPTION_CURRENCY = "EUR";

    @Autowired
    public SubscriptionServiceImpl(UserSubscriptionRepository userSubscriptionRepository,
                                   ProfileRepository profileRepository,
                                   UserService userService) {
        this.userSubscriptionRepository = userSubscriptionRepository;
        this.profileRepository = profileRepository;
        this.userService = userService;
    }

    @Override
    public String createPaymentIntentForSubscription(UUID userId) throws StripeException {
        // You can add customer creation/retrieval here if you want to link PaymentIntents to Stripe Customers
        // For simplicity, we'll create a PaymentIntent directly.
        // Stripe requires the amount in the smallest currency unit (e.g., cents for EUR).
        PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                .setAmount(SUBSCRIPTION_AMOUNT_CENTS)
                .setCurrency(SUBSCRIPTION_CURRENCY)
                .setDescription("Lahinch Art Gallery - Lifetime Subscription")
                .putMetadata("user_id", userId.toString()) // Store user_id for reconciliation
                // In the latest versions, payment_method_types is often automatically determined by Stripe.
                // .addPaymentMethodType("card") // Or let Stripe decide based on your dashboard settings
                .build();

        PaymentIntent paymentIntent = PaymentIntent.create(params);
        return paymentIntent.getClientSecret();
    }

    @Override
    @Transactional
    public UserSubscription confirmSubscriptionPayment(String paymentIntentId, UUID userId, String paymentAmount, String currency) {
        Profile profile = profileRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("Profile not found for user ID: " + userId));

        // Grant subscriber role
        userService.grantSubscriberRole(userId);

        // Log the subscription
        UserSubscription subscription = new UserSubscription();
        subscription.setUserId(userId); // This also sets the profile via @MapsId
        subscription.setProfile(profile);
        subscription.setPaymentId(paymentIntentId);

        try {
            subscription.setPaymentAmount(new BigDecimal(paymentAmount));
        } catch (NumberFormatException e) {
            // Handle error: invalid paymentAmount format
            // For now, using the configured amount as a fallback or throwing an error
            System.err.println("Invalid paymentAmount format: " + paymentAmount + ". Using default.");
            subscription.setPaymentAmount(BigDecimal.valueOf(SUBSCRIPTION_AMOUNT_CENTS / 100.0));
        }
        subscription.setPaymentCurrency(currency != null ? currency : SUBSCRIPTION_CURRENCY);
        subscription.setPurchaseDate(OffsetDateTime.now());
        subscription.setAccessType(AccessType.LIFETIME_UNLIMITED);

        return userSubscriptionRepository.save(subscription);
    }

    @Override
    public boolean checkUserSubscription(UUID userId) {
        // A user is considered subscribed if they have a record in UserSubscription table
        return userSubscriptionRepository.existsById(userId);
        // Alternatively, or in conjunction, you could check profile.getRole() == UserRole.SUBSCRIBER
        // Depending on which is the source of truth for subscription status.
        // The description.md implies the UserSubscription table logs the purchase and role is updated.
    }
}