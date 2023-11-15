package com.ro.dao;

import com.ro.model.Score;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
@Transactional
public interface ScoreRepository extends JpaRepository<Score, Long> {
}
