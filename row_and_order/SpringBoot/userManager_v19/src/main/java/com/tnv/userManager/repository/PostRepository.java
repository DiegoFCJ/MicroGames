package com.tnv.userManager.repository;

import com.tnv.userManager.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

public interface PostRepository extends JpaRepository<Post,Long> {

}
