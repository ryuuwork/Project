package com.tuananhdo.projects.repository;

import com.tuananhdo.projects.entity.Chat;
import com.tuananhdo.projects.entity.Project;
import com.tuananhdo.projects.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatRepository extends JpaRepository<Chat, Long> {
    List<Project> findByUsers(User user);
}
