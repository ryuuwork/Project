package com.tuananhdo.projects.service;

import com.tuananhdo.projects.entity.Project;
import com.tuananhdo.projects.entity.Task;
import com.tuananhdo.projects.entity.User;
import com.tuananhdo.projects.exception.ResourceNotFoundException;
import com.tuananhdo.projects.payload.TaskDTO;
import com.tuananhdo.projects.repository.ProjectRepository;
import com.tuananhdo.projects.repository.TaskRepository;
import com.tuananhdo.projects.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    public static final Logger LOGGER = LoggerFactory.getLogger(TaskService.class);

    private final TaskRepository taskRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    public TaskService(TaskRepository taskRepository, ProjectRepository projectRepository, UserRepository userRepository) {
        this.taskRepository = taskRepository;
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
    }

    public List<Task> getAllTasks(){
        return taskRepository.findAll();
    }

    public Task createTask(TaskDTO taskDTO) {
        Project project = projectRepository.findById(taskDTO.getProjectId())
                .orElseThrow(() -> new ResourceNotFoundException("Project", "id", taskDTO.getProjectId()));
        Task task = new Task();
        task.setTitle(taskDTO.getTitle());
        task.setDescription(taskDTO.getDescription());
        task.setStatus(taskDTO.getStatus());
        task.setProjectId(taskDTO.getProjectId());
        task.setPriority(taskDTO.getPriority());
        task.setDueDate(taskDTO.getDueDate());
        task.setProject(project);
        return taskRepository.save(task);
    }

    public List<Task> getTaskByProject(Long projectId) {
        List<Task> taskList =  taskRepository.findByProjectId(projectId);
        if (taskList == null || taskList.isEmpty()) {
            throw new ResourceNotFoundException("Project","id",projectId);
        }
        return taskList;
    }

    public Task findById(Long taskId) throws ResourceNotFoundException {
        return taskRepository.findById(taskId)
                .orElseThrow(() -> new ResourceNotFoundException("Task", "id", taskId));
    }

    public void deleteTask(Long taskId) {
        Task task = findById(taskId);
        taskRepository.delete(task);
    }

    public Task addUserToTask(Long taskId, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
        Task task = findById(taskId);
        task.setAssignee(user);
        return taskRepository.save(task);
    }

    public Task updateStatus(Long taskId, String status) {
        Task task = findById(taskId);
        task.setStatus(status);
        return taskRepository.save(task);
    }
}
