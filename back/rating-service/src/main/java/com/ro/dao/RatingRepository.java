package com.ro.dao;

import com.ro.model.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Collection;

@Repository
@Transactional
public interface RatingRepository extends JpaRepository<Rating, Long> {
    Collection<Rating> findAllById(int id);
}
