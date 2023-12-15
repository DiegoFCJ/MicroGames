package com.tnv.userManager.repository;

import com.tnv.userManager.model.User;
import io.micrometer.common.lang.NonNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {

    @Query("select (count(u) > 0) from User u where u.roles = :roles")
    boolean adminAutoCreate(@Param("roles") @NonNull String roles);

    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);

    List<User> findByEmailContains(String email);

    List<User> findByUsernameContains(String username);

}

