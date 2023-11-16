package com.ro.service;

import com.ro.dao.ScoreRepository;
import com.ro.dto.ScoreDTO;
import com.ro.dto.ScoresForRankDTO;
import com.ro.mapper.ScoreMapper;
import com.ro.model.Score;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ScoreService {

    ScoreMapper scoreMapper = ScoreMapper.INSTANCE;

    @Autowired
    ScoreRepository scoreRepository;

    public List<ScoresForRankDTO> getScForRunkings() {
        // Recupera tutti i dati della tua sorgente dati, ad esempio il repository
        List<Score> scores = scoreRepository.findAll(); // o metodo simile per ottenere i dati

// Ordina la lista di Score
        List<ScoresForRankDTO> rankedScores = scores.stream()
                .sorted(Comparator.comparingInt(Score::getScore).reversed()
                        .thenComparing(Score::getCreatedAt, Comparator.reverseOrder()))
                .map(score -> {
                    ScoresForRankDTO dto = new ScoresForRankDTO();
                    dto.setScore(score.getScore());
                    dto.setUsername(score.getUser().getUsername());
                    dto.setLastGamePlayedAt(score.getCreatedAt()); // Utilizzo dell'updatedAt per lastGamePlayed, modifica se necessario
                    return dto;
                })
                .map(dto -> {
                    dto.setRankingNumOrdered(1); // Imposta il rankingNumOrder iniziale a 1
                    return dto;
                })
                .collect(Collectors.toList());

// Imposta il rankingNumOrder incrementale
        for (int i = 0; i < rankedScores.size(); i++) {
            rankedScores.get(i).setRankingNumOrdered(i + 1);
        }
        return rankedScores;
    }

    public int getTotalUserSByUserId(int userId) {
        return scoreRepository.findAllById(userId)
                .stream()
                .mapToInt(Score::getScore)
                .sum();
    }

    public List<ScoreDTO> getAll() {
        return scoreRepository.findAll().stream()
                .map(scoreMapper::mapToDTO)
                .collect(Collectors.toList());
    }

    public ScoreDTO create(ScoreDTO scoreDTO) {
        return scoreMapper.mapToDTO(scoreRepository.save(scoreMapper.mapToEntity(scoreDTO)));
    }

    public ScoreDTO read(long id) {
        return scoreMapper.mapToDTO(scoreRepository.findById(id).get());
    }

    public ScoreDTO update(ScoreDTO dto) {
        return scoreMapper.mapToDTO(scoreRepository.save(scoreMapper.mapToEntity(dto)));
    }

    public void delete(ScoreDTO dto) {
        scoreRepository.deleteById(dto.getId());
    }
}
