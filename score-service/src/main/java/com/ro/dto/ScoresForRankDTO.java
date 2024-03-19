package com.ro.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ScoresForRankDTO {

    int rankingNumOrdered;
    int score;
    String username;
    LocalDateTime lastGamePlayedAt;
}
