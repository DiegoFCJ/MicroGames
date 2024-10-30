package com.ro.mapper;

import com.ro.dto.ScoreDTO;
import com.ro.model.Score;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper
public interface ScoreMapper {

    ScoreMapper INSTANCE = Mappers.getMapper(ScoreMapper.class);

    ScoreDTO mapToDTO(Score score);

    List<ScoreDTO> mapToDTOList(Iterable<Score> scores);

    default Score mapToEntity(ScoreDTO scoreDTO) {
        Score score = new Score();
        score.setId(scoreDTO.getId());
        score.setScore(scoreDTO.getScore());
        score.setCreatedAt(scoreDTO.getCreatedAt());
        score.setUsername(scoreDTO.getUser().getUsername());
        score.setUserId(scoreDTO.getUser().getId());
        return score;
    }
}

