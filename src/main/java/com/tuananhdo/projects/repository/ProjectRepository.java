package com.tuananhdo.projects.repository;

import com.tuananhdo.projects.entity.Project;
import com.tuananhdo.projects.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findByUser(User user);
    List<Project> findByNameContainingAndTeamContains(String name, User user);
    @Query("select distinct p from Project p join fetch p.team t where t=:user")
    List<Project> findProjectByTeam(@Param("user") User user);
    List<Project> findByTeamContainingOrUser(User user,User owner);
}
