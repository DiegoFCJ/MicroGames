package com.ro.service;

import com.ro.dao.FavoriteAndLikeRepository;
import com.ro.dto.FavoriteAndLikeDTO;
import com.ro.mapper.FavoriteAndLikeMapper;
import com.ro.model.FavoriteAndLike;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FavoriteAndLikeService {

    FavoriteAndLikeMapper favoriteAndLikeMapper = FavoriteAndLikeMapper.INSTANCE;

    @Autowired
    FavoriteAndLikeRepository favoriteAndLikeRepository;

    public List<FavoriteAndLikeDTO> findByUserId(Long userId) {
        return favoriteAndLikeRepository.findByUserId(userId).stream()
                .map(favoriteAndLikeMapper::mapToDTO)
                .collect(Collectors.toList());
    }

    public FavoriteAndLikeDTO findByUserIdAndMovieId(Long userId, Long movieId) {
        Optional<FavoriteAndLike> result = favoriteAndLikeRepository.findByUserIdAndMovieId(userId, movieId);
        return result.map(favoriteAndLikeMapper::mapToDTO).orElse(null);
    }

    public List<FavoriteAndLikeDTO> getAll() {
        return favoriteAndLikeRepository.findAll().stream()
                .map(favoriteAndLikeMapper::mapToDTO)
                .collect(Collectors.toList());
    }

    public FavoriteAndLikeDTO create(FavoriteAndLikeDTO favoriteAndLikeDTO) {
        Optional<FavoriteAndLike> result = favoriteAndLikeRepository.findByUserIdAndMovieId(favoriteAndLikeDTO.getUserId(), favoriteAndLikeDTO.getMovieId());
        if(result.isEmpty()){
            return favoriteAndLikeMapper.mapToDTO(favoriteAndLikeRepository.save(favoriteAndLikeMapper.mapToEntity(favoriteAndLikeDTO)));
        }
        return null;
    }

    public FavoriteAndLikeDTO read(long id) {
        return favoriteAndLikeMapper.mapToDTO(favoriteAndLikeRepository.findById(id).get());
    }

    public FavoriteAndLikeDTO update(FavoriteAndLikeDTO dto) {
        return favoriteAndLikeMapper.mapToDTO(favoriteAndLikeRepository.save(favoriteAndLikeMapper.mapToEntity(dto)));
    }

    public void delete(FavoriteAndLikeDTO dto) {
        favoriteAndLikeRepository.deleteById(dto.getId());
    }
}
