package com.lahinchgallery.lahinch_art_gallery_backend.service;

import com.lahinchgallery.lahinch_art_gallery_backend.model.UserSubscription;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;

import java.util.UUID;

public interface SubscriptionService {
    String createPaymentIntentForSubscription(UUID userId) throws StripeException;
    UserSubscription confirmSubscriptionPayment(String paymentIntentId, UUID userId, String paymentAmount, String currency);
    boolean checkUserSubscription(UUID userId);
}