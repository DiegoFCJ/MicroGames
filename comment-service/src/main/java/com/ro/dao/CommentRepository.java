package com.ro.dao;

import com.ro.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import jakarta.transaction.Transactional;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Repository
@Transactional
public interface CommentRepository extends JpaRepository<Comment, Long> {
    Collection<Comment> findAllById(int id);
    Optional<Comment> findAllByUserIdAndMovieId(Long userId, Long movieId);
    List<Comment> findAllByMovieIdOrderByCreatedAtAsc(Long movieId);
}
