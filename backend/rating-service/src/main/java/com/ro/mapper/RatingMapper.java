package com.ro.mapper;

import com.ro.dto.RatingDTO;
import com.ro.model.Rating;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper
public interface RatingMapper {

    RatingMapper INSTANCE = Mappers.getMapper(RatingMapper.class);

    RatingDTO mapToDTO(Rating rating);

    List<RatingDTO> mapToDTOList(Iterable<Rating> rating);

    Rating mapToEntity(RatingDTO ratingDTO);
}

