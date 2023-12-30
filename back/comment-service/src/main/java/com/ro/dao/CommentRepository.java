package com.ro.dao;

import com.ro.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import javax.transaction.Transactional;
import java.util.Collection;
import java.util.Optional;

@Repository
@Transactional
public interface CommentRepository extends JpaRepository<Comment, Long> {
    Collection<Comment> findAllById(int id);
    Optional<Comment> findAllByUserIdAndMovieId(Long userId, Long movieId);
}
