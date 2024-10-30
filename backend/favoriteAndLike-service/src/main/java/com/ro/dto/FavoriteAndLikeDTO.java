package com.ro.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FavoriteAndLikeDTO {

    Long id;
    LocalDateTime createdAt;
    boolean isFavorite;
    boolean isLike;
    private Long movieId;
    private Long userId;


}
