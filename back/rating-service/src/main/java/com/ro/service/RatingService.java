package com.ro.service;

import com.ro.dao.RatingRepository;
import com.ro.dto.RatingDTO;
import com.ro.mapper.RatingMapper;
import com.ro.model.Rating;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RatingService {

    RatingMapper ratingMapper = RatingMapper.INSTANCE;

    @Autowired
    RatingRepository ratingRepository;

    public List<RatingDTO> getAll() {
        return ratingRepository.findAll().stream()
                .map(ratingMapper::mapToDTO)
                .collect(Collectors.toList());
    }

    public RatingDTO create(RatingDTO ratingDTO) {
        System.out.println(ratingDTO);
        return ratingMapper.mapToDTO(ratingRepository.save(ratingMapper.mapToEntity(ratingDTO)));
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
