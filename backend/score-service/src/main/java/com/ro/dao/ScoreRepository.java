package com.ro.dao;

import com.ro.model.Score;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import jakarta.transaction.Transactional;
import java.util.Collection;

@Repository
@Transactional
public interface ScoreRepository extends JpaRepository<Score, Long> {
    Collection<Score> findAllById(int id);
}
