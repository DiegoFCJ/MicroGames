package com.ro.mapper;

import com.ro.dto.FavoriteAndLikeDTO;
import com.ro.model.FavoriteAndLike;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper
public interface FavoriteAndLikeMapper {

    FavoriteAndLikeMapper INSTANCE = Mappers.getMapper(FavoriteAndLikeMapper.class);

    FavoriteAndLikeDTO mapToDTO(FavoriteAndLike favoriteAndLike);

    List<FavoriteAndLikeDTO> mapToDTOList(Iterable<FavoriteAndLike> scores);

    FavoriteAndLike mapToEntity(FavoriteAndLikeDTO favoriteAndLikeDTO);
}

