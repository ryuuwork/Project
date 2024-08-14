package com.tuananhdo.projects.repository;

import com.tuananhdo.projects.entity.Role;
import com.tuananhdo.projects.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByUsernameOrEmail(String username,String email);
    Optional<User> findByUsername(String username);

    List<User> findByRolesIn(List<Role> roles);
    Boolean existsByUsername(String username);
    Boolean existsByEmail(String email);
}
