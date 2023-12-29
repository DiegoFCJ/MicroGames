package com.ro.dao;

import com.ro.model.FavoriteAndLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Repository
@Transactional
public interface FavoriteAndLikeRepository extends JpaRepository<FavoriteAndLike, Long> {
    Collection<FavoriteAndLike> findAllById(int id);
    List<FavoriteAndLike> findByUserId(Long userId);
    Optional<FavoriteAndLike> findByUserIdAndMovieId(Long userId, Long movieId);

}
