package com.ro.mapper;

import com.ro.dto.ScoreDTO;
import com.ro.model.Score;
import com.ro.model.User;
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
        // Mappatura dell'utente da UserSimpleDTO a User
        // Aggiungi qui la logica per mappare l'utente
        User user = new User();
        user.setId(scoreDTO.getUser().getId());
        // ... altre proprietà se necessario
        score.setUser(user);
        return score;
    }
}

