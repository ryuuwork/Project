package com.tuananhdo.projects.repository;

import com.tuananhdo.projects.entity.Invite;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface InviteRepository extends JpaRepository<Invite,Long> {
    Optional<Invite> findByToken(String token);
    Optional<Invite> findByEmail(String email);
}
