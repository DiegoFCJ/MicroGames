package com.ro.service;

import com.ro.dao.ScoreRepository;
import com.ro.dto.ScoreDTO;
import com.ro.mapper.ScoreMapper;
import com.ro.model.Score;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ScoreService {

    ScoreMapper scoreMapper = ScoreMapper.INSTANCE;

    @Autowired
    ScoreRepository scoreRepository;

    public int getTotalScoreOfUserByUserId(int id) {
        return 0;
    }

    public List<ScoreDTO> getAll() {
        return scoreRepository.findAll().stream()
                .map(scoreMapper::mapToDTO)
                .collect(Collectors.toList());
    }

    public ScoreDTO create(ScoreDTO scoreDTO) {
        System.out.println(scoreDTO);
        Score scoreToSave = scoreMapper.mapToEntity(scoreDTO);
        scoreToSave.setCreatedAt(LocalDateTime.now());
        scoreToSave.setUpdatedAt(LocalDateTime.now());
        return scoreMapper.mapToDTO(scoreRepository.save(scoreToSave));
    }

    public ScoreDTO read(long id) {
        return scoreMapper.mapToDTO(scoreRepository.findById(id).get());
    }

    public ScoreDTO update(ScoreDTO dto) {
        Score scoreToSave = scoreMapper.mapToEntity(dto);
        scoreToSave.setUpdatedAt(LocalDateTime.now());
        return scoreMapper.mapToDTO(scoreRepository.save(scoreToSave));
    }

    public void delete(ScoreDTO dto) {
        scoreRepository.deleteById(dto.getId());
    }
}
