package com.ro.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ScoreDTO {

    Long id;
    int score;
    LocalDateTime createdAt;
    UserDTO user;
}
