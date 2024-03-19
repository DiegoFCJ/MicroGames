package com.ro.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "favorite_and_like")
public class FavoriteAndLike {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    LocalDateTime createdAt;
    boolean isFavorite;
    boolean isLike;
    private Long movieId;
    private Long userId;
}