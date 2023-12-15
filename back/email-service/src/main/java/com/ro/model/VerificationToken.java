package com.ro.model;

import lombok.*;
import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "verification_token")
public class VerificationToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String token;
    private String email;
    @Column(name="created_at", nullable = false)
    private LocalDateTime createdAt;
    @Column(name="expired_at", nullable = false)
    private LocalDateTime expiredAt;
    @Column(name="confirmed_at")
    private LocalDateTime confirmedAt;
    private boolean isEnabled;
    private Long userId;


    public VerificationToken(String token, String email, LocalDateTime createdAt, LocalDateTime expiredAt, boolean isEnabled, Long userId) {
        this.token = token;
        this.email = email;
        this.createdAt = createdAt;
        this.expiredAt = expiredAt;
        this.isEnabled = isEnabled;
        this.userId = userId;
    }
}
