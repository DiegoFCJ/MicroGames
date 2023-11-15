package com.ro.mapper;

import com.ro.dto.ScoreDTO;
import com.ro.model.Score;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper
public interface ScoreMapper {

    ScoreMapper INSTANCE = Mappers.getMapper(ScoreMapper.class);

    Score mapToEntity(ScoreDTO scoreDTO);

    ScoreDTO mapToDTO(Score score);

    List<ScoreDTO> mapToDTOList(Iterable<Score> scores);
}

