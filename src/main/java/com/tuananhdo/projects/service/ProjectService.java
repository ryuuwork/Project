package com.tuananhdo.projects.service;

import com.tuananhdo.projects.entity.Chat;
import com.tuananhdo.projects.entity.Project;
import com.tuananhdo.projects.entity.User;
import com.tuananhdo.projects.exception.ResourceNotFoundException;
import com.tuananhdo.projects.repository.ProjectRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {
    private final ProjectRepository projectRepository;
    private final ChatService chatService;
    private final UserService userService;

    public ProjectService(ProjectRepository projectRepository, ChatService chatService, UserService userService) {
        this.projectRepository = projectRepository;
        this.chatService = chatService;
        this.userService = userService;
    }

    public Project create(Project projectInForm, User user) {
        Project project = new Project();
        project.setUser(user);
        project.setTags(projectInForm.getTags());
        project.setName(projectInForm.getName());
        project.setCategory(projectInForm.getCategory());
        project.setDescription(projectInForm.getDescription());
        project.getTeam().add(user);

        Project savedProject = projectRepository.save(project);

        Chat chat = new Chat();
        chat.setProject(savedProject);
        Chat projectChat = chatService.create(chat);

        savedProject.setChat(projectChat);

        return savedProject;
    }

    public List<Project> getByTeam(User user, String category, String tag) {
        List<Project> projects = projectRepository.findByTeamContainingOrUser(user, user);
        if (category != null && !category.isEmpty()) {
            projects = projects
                    .stream()
                    .filter(project -> project.getCategory().equals(category))
                    .toList();
        }
        if (tag != null && !tag.isEmpty()) {
            projects = projects
                    .stream()
                    .filter(project -> project.getTags().contains(tag))
                    .toList();
        }
        return projects;
    }

    public Project getById(Long id) throws ResourceNotFoundException {
        return projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project", "id", id));
    }

    public Project update(Project updateInForm, Long id) throws ResourceNotFoundException {
        Project project = getById(id);
        project.setName(updateInForm.getName() != null ? updateInForm.getName() : project.getName());
        project.setDescription(updateInForm.getDescription() != null ? updateInForm.getDescription() : project.getDescription());
        project.setCategory(updateInForm.getCategory() != null ? updateInForm.getCategory() : project.getCategory());
        project.setTags(updateInForm.getTags() != null && !updateInForm.getTags().isEmpty() ? updateInForm.getTags() : project.getTags());
        return projectRepository.save(project);
    }

    public void delete(Long projectId) throws ResourceNotFoundException {
        Project project = getById(projectId);
        projectRepository.delete(project);
    }

    public void addOfRemoveUserInProject(Long projectId, Long userId, boolean add) throws ResourceNotFoundException {
        Project project = getById(projectId);
        User user = userService.findById(userId);
        if (add) {
            if (!project.getTeam().contains(user)) {
                project.getChat().getUsers().add(user);
                project.getTeam().add(user);
            }
        } else {
            if (project.getTeam().contains(user)) {
                project.getChat().getUsers().remove(user);
                project.getTeam().remove(user);
            }
        }
        projectRepository.save(project);
    }

    public Chat getChatByProjectId(Long projectId) throws ResourceNotFoundException {
        Project project = getById(projectId);
        return project.getChat();
    }

    public List<Project> searchProject(String keyword, User user) {
        return projectRepository.findByNameContainingAndTeamContains(keyword, user);
    }


}
