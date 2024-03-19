package com.ro.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RatingDTO {

    Long id;
    LocalDateTime createdAt;
    int rate;
    private Long movieId;
    private Long userId;
}
