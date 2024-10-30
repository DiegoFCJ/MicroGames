package com.ro.service;

import com.ro.dao.RatingRepository;
import com.ro.dto.RatingDTO;
import com.ro.mapper.RatingMapper;
import com.ro.model.Rating;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class RatingService {

    RatingMapper ratingMapper = RatingMapper.INSTANCE;

    @Autowired
    RatingRepository ratingRepository;

    public RatingDTO getAllByUserIdAndMovieId(Long userId, Long movieId) {
        Optional<Rating> commentOptional = ratingRepository.findAllByUserIdAndMovieId(userId, movieId);
        return commentOptional.map(ratingMapper::mapToDTO).orElse(null);
    }

    public List<RatingDTO> getAll() {
        return ratingRepository.findAll().stream()
                .map(ratingMapper::mapToDTO)
                .collect(Collectors.toList());
    }

    public RatingDTO create(RatingDTO ratingDTO) {
        Optional<Rating> result = ratingRepository.findAllByUserIdAndMovieId(ratingDTO.getUserId(), ratingDTO.getMovieId());
        if(result.isEmpty()){
            return ratingMapper.mapToDTO(ratingRepository.save(ratingMapper.mapToEntity(ratingDTO)));
        }
        return null;
    }

    public RatingDTO read(long id) {
        return ratingMapper.mapToDTO(ratingRepository.findById(id).get());
    }

    public RatingDTO update(RatingDTO dto) {
        return ratingMapper.mapToDTO(ratingRepository.save(ratingMapper.mapToEntity(dto)));
    }

    public void delete(RatingDTO dto) {
        ratingRepository.deleteById(dto.getId());
    }
}
