# Lahinch Art Gallery - Backend Design (Supabase & Spring Boot)

Thanks for the clarifications! This is very helpful.
Based on your requirements, here's a proposed backend design for the Lahinch Art Gallery application, using Supabase for the database and Spring Boot for the business logic and controllers.

---

## Phase 1: Database Design (Supabase)

We'll use Supabase's PostgreSQL database. Row Level Security (RLS) should be enabled on all tables to control data access based on user roles. Supabase Auth will handle user authentication.

---

### Tables:

* **`users` (Managed by Supabase Auth)**
    * `id` (UUID, **Primary Key**) - Provided by Supabase Auth
    * `email` (Text) - Provided by Supabase Auth
    * `encrypted_password` (Text) - Provided by Supabase Auth
    * `created_at` (TimestampTZ)
    * `updated_at` (TimestampTZ)
    * `role` (Text, **Default: 'public\_user'**) - Values: 'public\_user', 'subscriber', 'admin'.
        * *Note: We'll add a custom `role` column to the `auth.users` table or create a separate `user_roles` table linked to `auth.users.id` if Supabase Auth doesn't allow direct modification of its `users` table schema for custom roles easily. A common practice is a separate `profiles` table.*

* **`profiles`** (To store public user data and custom roles if needed)
    * `user_id` (UUID, **Primary Key**, Foreign Key to `auth.users.id`)
    * `first_name` (Text)
    * `last_name` (Text)
    * `role` (TEXT, **Default: 'public\_user'**) - Could store 'public\_user', 'subscriber', 'admin'. This is often preferred over modifying `auth.users`.
    * `created_at` (TimestampTZ, **Default: `now()`**)
    * `updated_at` (TimestampTZ, **Default: `now()`**)

* **`artists`**
    * `id` (UUID, **Primary Key**, **Default: `uuid_generate_v4()`**)
    * `name` (Text, Not Null)
    * `specialty` (Text)
    * `location` (Text)
    * `born` (Text) - *e.g., "1975, Galway, Ireland"*
    * `education` (Text)
    * `website` (Text)
    * `bio` (Text)
    * `additional_bio` (Text)
    * `profile_image_url` (Text) - Path in Supabase Storage
    * `is_featured` (Boolean, **Default: `false`**)
    * `created_at` (TimestampTZ, **Default: `now()`**)
    * `updated_at` (TimestampTZ, **Default: `now()`**)

* **`artworks`**
    * `id` (UUID, **Primary Key**, **Default: `uuid_generate_v4()`**)
    * `title` (Text, Not Null)
    * `artist_id` (UUID, Foreign Key to `artists.id`, Not Null)
    * `description` (Text)
    * `medium` (Text)
    * `dimensions` (Text) - *e.g., "60x80 cm"*
    * `year_created` (Integer)
    * `price` (Numeric, Precision: 10, Scale: 2)
    * `availability_status` (Text, **Default: 'Available'**) - Values: 'Available', 'Sold', 'On Hold', 'Not For Sale'
    * `artwork_image_url` (Text) - Path in Supabase Storage
    * `created_at` (TimestampTZ, **Default: `now()`**)
    * `updated_at` (TimestampTZ, **Default: `now()`**)

* **`premium_media`**
    * `id` (UUID, **Primary Key**, **Default: `uuid_generate_v4()`**)
    * `title` (Text, Not Null)
    * `description` (Text)
    * `media_type` (Text, Not Null) - Values: 'video', 'audio'
    * `file_url` (Text, Not Null) - Path in Supabase Storage
    * `thumbnail_url` (Text) - Path in Supabase Storage (for videos)
    * `duration_seconds` (Integer) - *Optional, e.g., for display*
    * `related_to_entity_type` (Text) - Values: 'artist', 'artwork'
    * `related_entity_id` (UUID) - ID of the artist or artwork it's related to.
        * *Note: Create separate foreign keys if RLS becomes complex, or handle integrity at application level/triggers.*
    * `created_at` (TimestampTZ, **Default: `now()`**)
    * `updated_at` (TimestampTZ, **Default: `now()`**)
    * *Indexes: `(related_to_entity_type, related_entity_id)`*

* **`user_subscriptions`**
    * `user_id` (UUID, **Primary Key**, Foreign Key to `auth.users.id`)
    * `payment_id` (Text, Not Null, Unique) - Stripe Payment Intent ID or similar
    * `payment_amount` (Numeric, Precision: 10, Scale: 2, Not Null)
    * `payment_currency` (Text, **Default: 'EUR'**, Not Null)
    * `purchase_date` (TimestampTZ, **Default: `now()`**)
    * `access_type` (Text, **Default: 'lifetime\_unlimited'**, Not Null) - For future flexibility, though current model is one-time.
    * *Note: Since it's a one-time fee for lifetime access, this table primarily logs the purchase. The `profiles.role` will be updated to 'subscriber'.*

* **`artwork_sales`**
    * `id` (UUID, **Primary Key**, **Default: `uuid_generate_v4()`**)
    * `artwork_id` (UUID, Foreign Key to `artworks.id`, Not Null, Unique - an artwork can only be sold once)
    * `buyer_user_id` (UUID, Foreign Key to `auth.users.id`, Nullable - if sold to a registered user)
    * `buyer_name` (Text, Nullable - if buyer is not a registered user or for record keeping)
    * `buyer_email` (Text, Nullable)
    * `sale_price` (Numeric, Precision: 10, Scale: 2, Not Null)
    * `sale_date` (TimestampTZ, **Default: `now()`**)
    * `payment_reference` (Text) - *e.g., Stripe Payment Intent ID for the artwork sale*
    * `shipping_address` (Text, Nullable)
    * `notes` (Text, Nullable)
    * `created_at` (TimestampTZ, **Default: `now()`**)
    * `updated_at` (TimestampTZ, **Default: `now()`**)

* **`user_favorite_artworks`**
    * `user_id` (UUID, Foreign Key to `auth.users.id`, Not Null)
    * `artwork_id` (UUID, Foreign Key to `artworks.id`, Not Null)
    * `favorited_at` (TimestampTZ, **Default: `now()`**)
    * **Primary Key**: `(user_id, artwork_id)`

---

### Supabase Storage Buckets:

* **`artist-images`**: For artist profile pictures.
* **`artwork-images`**: For main images of artworks.
* **`premium-media-files`**: For video and audio files.
* **`premium-media-thumbnails`**: For video thumbnails.

---

### Row Level Security (RLS) Policies - General Idea:

* **`profiles`**:
    * Users can select/update their own profile.
    * Admins can select/update/delete any profile.
* **`artists`**:
    * Public can select.
    * Admins can insert/update/delete.
* **`artworks`**:
    * Public can select (perhaps with restrictions on certain details if not subscribed).
    * Admins can insert/update/delete.
* **`premium_media`**:
    * Only 'subscriber' or 'admin' roles can select.
    * Admins can insert/update/delete.
* **`user_subscriptions`**:
    * Users can select their own subscription record.
    * Admins can select all. (Insert will be via backend logic post-payment).
* **`artwork_sales`**:
    * Admins can select/insert/update/delete.
    * Potentially, registered buyers could see their own sales.
* **`user_favorite_artworks`**:
    * Users can select/insert/delete their own favorites.
    * Admins might have select access for analytics if needed.

---

## Phase 2: Business Logic (Conceptual - Spring Boot Services)

### **`UserService`**:
* Manages user profiles and roles.
* `registerUser(userData)`: Handles new user signup (interacts with Supabase Auth via Spring Boot client if needed, or assumes frontend handles Supabase Auth directly).
* `getUserProfile(userId)`
* `updateUserProfile(userId, profileData)`
* `grantSubscriberRole(userId)`: After successful one-time payment.
* `getUserRole(userId)`

### **`ArtistService`**:
* CRUD operations for artists.
* `getAllArtists(pagination, filters)`
* `getArtistById(artistId)`
* `createArtist(artistData, profileImageFile)`: Handles image upload to Supabase Storage.
* `updateArtist(artistId, artistData, profileImageFile)`
* `deleteArtist(artistId)`
* `getFeaturedArtists()`

### **`ArtworkService`**:
* CRUD operations for artworks.
* `getAllArtworks(pagination, filters, searchParams)`
* `getArtworkById(artworkId)`
* `getArtworksByArtist(artistId, pagination)`
* `createArtwork(artworkData, artworkImageFile)`: Handles image upload.
* `updateArtwork(artworkId, artworkData, artworkImageFile)`
* `deleteArtwork(artworkId)`
* `updateArtworkAvailability(artworkId, status)`

### **`PremiumMediaService`**:
* CRUD operations for premium media.
* `getMediaForArtist(artistId)`
* `getMediaForArtwork(artworkId)`
* `getMediaById(mediaId)`: Checks user subscription status before returning full access.
* `createMedia(mediaData, mediaFile, thumbnailFile)`: Handles file uploads.
* `updateMedia(mediaId, mediaData, mediaFile, thumbnailFile)`
* `deleteMedia(mediaId)`

### **`SubscriptionService`**:
* Manages the one-time payment and subscription status.
* `createPaymentIntentForSubscription()`: Interacts with Stripe.
* `confirmSubscriptionPayment(paymentId, userId)`: Updates user role to 'subscriber' and logs the purchase in `user_subscriptions`.
* `checkUserSubscription(userId)`: Returns true if user has made the one-time payment.

### **`ArtworkSalesService`**:
* Manages the sale of artworks.
* `createPaymentIntentForArtwork(artworkId, userId)`: Interacts with Stripe.
* `recordArtworkSale(saleData)`: After successful payment, updates artwork status to 'Sold'.
* `getSaleById(saleId)`
* `getSalesByArtwork(artworkId)`
* `getSalesByUser(userId)`
* `getRecentSales(limit)`: For admin dashboard.

### **`FavoriteArtworkService`**:
* `addArtworkToFavorites(userId, artworkId)`
* `removeArtworkFromFavorites(userId, artworkId)`
* `getUserFavoriteArtworks(userId, pagination)`
* `isArtworkFavoritedByUser(userId, artworkId)`

### **`StorageService`** (Wrapper for Supabase Storage interaction):
* `uploadFile(bucketName, filePath, file)`
* `deleteFile(bucketName, filePath)`
* `getFileUrl(bucketName, filePath)`

---

## Phase 3: Controllers (Conceptual - Spring Boot REST APIs)

Standard RESTful APIs. Authentication and Authorization will be handled using Spring Security, integrated with JWTs obtained from Supabase Auth.

---

### Example Endpoints:

* **Auth Controller (`/api/auth`)**
    * `POST /signup` (*though frontend might handle this directly with Supabase*)
    * `POST /login` (*similarly*)
    * `GET /me` (get current user profile and role)

* **Artist Controller (`/api/artists`)**
    * `GET /`: Get all artists (public, paginated, filterable).
    * `GET /{artistId}`: Get artist by ID (public).
    * `POST /` (Admin): Create new artist.
    * `PUT /{artistId}` (Admin): Update artist.
    * `DELETE /{artistId}` (Admin): Delete artist.
    * `GET /{artistId}/artworks`: Get artworks by this artist.
    * `GET /{artistId}/media`: Get premium media for this artist (subscriber/admin access for full media).

* **Artwork Controller (`/api/artworks`)**
    * `GET /`: Get all artworks (public, paginated, filterable).
    * `GET /{artworkId}`: Get artwork by ID (public, some details might be restricted for non-subscribers).
    * `POST /` (Admin): Create new artwork.
    * `PUT /{artworkId}` (Admin): Update artwork.
    * `DELETE /{artworkId}` (Admin): Delete artwork.
    * `GET /{artworkId}/media`: Get premium media for this artwork (subscriber/admin access).
    * `POST /{artworkId}/purchase/create-payment-intent` (Authenticated Users): Initiate purchase of an artwork.
    * `POST /{artworkId}/favorite` (Subscribers): Add to favorites.
    * `DELETE /{artworkId}/favorite` (Subscribers): Remove from favorites.

* **Premium Media Controller (`/api/media`)**
    * `GET /{mediaId}`: Get media by ID (subscriber/admin access for file URL).
    * `POST /` (Admin): Upload new media.
    * `PUT /{mediaId}` (Admin): Update media.
    * `DELETE /{mediaId}` (Admin): Delete media.

* **Subscription Controller (`/api/subscriptions`)**
    * `POST /create-payment-intent`: For the one-time subscription fee (authenticated users).
    * `POST /confirm-payment`: Webhook or callback from Stripe to confirm payment and grant subscription.
    * `GET /status`: Get current user's subscription status.

* **User Profile Controller (`/api/users`)**
    * `GET /me/favorites`: Get current user's favorite artworks.

* **Admin Controller (`/api/admin`)** - *Grouping admin-specific functionalities.*
    * `GET /dashboard-stats`
    * `GET /recent-sales`
    * *(Other endpoints for managing users, settings, etc.)*

---

### Workflow for One-Time Subscription Fee:

1.  User clicks "Subscribe" for €1.99.
2.  Frontend calls backend `/api/subscriptions/create-payment-intent`.
3.  Backend (Spring Boot `SubscriptionService`) uses Stripe SDK to create a Payment Intent for €1.99.
4.  Backend returns `client_secret` of the Payment Intent to frontend.
5.  Frontend uses Stripe.js to confirm the payment with the `client_secret`.
6.  Upon successful payment confirmation by Stripe on the frontend, the frontend can notify the backend, OR Stripe webhook can notify the backend (`/api/stripe/webhook` - your existing route `api/stripe/route.ts` can be adapted for this).
7.  Backend webhook handler (`SubscriptionService`):
    * Verifies the Stripe event.
    * If payment is successful, updates the `user_profile.role` to 'subscriber'.
    * Logs the transaction in `user_subscriptions`.

---

### Workflow for Artwork Sale:

1.  User decides to buy an artwork.
2.  Frontend calls backend `/api/artworks/{artworkId}/purchase/create-payment-intent`.
3.  Backend (`ArtworkSalesService`) creates a Stripe Payment Intent for the artwork's price.
4.  Returns `client_secret` to frontend.
5.  Frontend confirms payment with Stripe.js.
6.  Stripe webhook notifies backend.
7.  Backend webhook handler (`ArtworkSalesService`):
    * Verifies event.
    * Records the sale in `artwork_sales`.
    * Updates `artworks.availability_status` to 'Sold'.
    * Optionally, sends confirmation emails.

---

This is a comprehensive starting point. We can refine this further based on any other specific details or priorities you have.

Let me know if this aligns with your vision or if you have specific areas you'd like to adjust or delve deeper into!