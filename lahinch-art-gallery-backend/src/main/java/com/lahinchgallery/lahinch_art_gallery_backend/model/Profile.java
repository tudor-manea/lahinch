package com.lahinchgallery.lahinch_art_gallery_backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "profiles") // Specifies the table name in the database
@Data // Lombok annotation to generate getters, setters, toString, equals, hashCode
@NoArgsConstructor // Lombok annotation for no-args constructor
@AllArgsConstructor // Lombok annotation for all-args constructor
public class Profile {

    @Id // Marks this field as the primary key
    @Column(name = "user_id", updatable = false, nullable = false)
    private UUID userId; // This will correspond to auth.users.id

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Enumerated(EnumType.STRING) // Stores the enum as a string in the database
    @Column(name = "role", nullable = false)
    private UserRole role = UserRole.PUBLIC_USER; // Default role

    @CreationTimestamp // Automatically sets the value on creation
    @Column(name = "created_at", nullable = false, updatable = false)
    private OffsetDateTime createdAt;

    @UpdateTimestamp // Automatically updates the value on modification
    @Column(name = "updated_at", nullable = false)
    private OffsetDateTime updatedAt;
}
