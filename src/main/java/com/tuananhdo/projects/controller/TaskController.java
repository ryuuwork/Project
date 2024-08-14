package com.tuananhdo.projects.controller;

import com.tuananhdo.projects.entity.Task;
import com.tuananhdo.projects.entity.User;
import com.tuananhdo.projects.exception.ResourceNotFoundException;
import com.tuananhdo.projects.payload.TaskDTO;
import com.tuananhdo.projects.service.TaskService;
import com.tuananhdo.projects.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api/v1/tasks")
public class TaskController {
    public static final Logger LOGGER = LoggerFactory.getLogger(TaskController.class);

    private final TaskService taskService;
    private final UserService userService;

    public TaskController(TaskService taskService, UserService userService) {
        this.taskService = taskService;
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<?> getAllTasks() {
        List<Task> task = taskService.getAllTasks();
        return new ResponseEntity<>(task, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> createTask(@RequestHeader("Authorization") String tokenJWT,
                                        @RequestBody TaskDTO taskDTO) throws ResourceNotFoundException {
        userService.findUsernameByJWT(tokenJWT);
        Task task = taskService.createTask(taskDTO);
        return new ResponseEntity<>(task, HttpStatus.CREATED);
    }

    @GetMapping("/project/{projectId}")
    public ResponseEntity<?> getTaskByProject(@PathVariable Long projectId) throws ResourceNotFoundException {
        List<Task> taskList = taskService.getTaskByProject(projectId);
        return new ResponseEntity<>(taskList, HttpStatus.OK);
    }

    @PostMapping("/{taskId}/assignee/{userId}")
    public ResponseEntity<?> addUserToTask(@PathVariable Long taskId,
                                           @PathVariable Long userId) throws ResourceNotFoundException {
        Task task = taskService.addUserToTask(taskId, userId);
        return ResponseEntity.ok(task);
    }

    @PutMapping("/{taskId}/status/{status}")
    public ResponseEntity<?> updateTaskStatus(@PathVariable Long taskId,
                                              @PathVariable String status) throws ResourceNotFoundException {
        Task task = taskService.updateStatus(taskId, status);
        return ResponseEntity.ok(task);
    }

    @GetMapping("/{taskId}")
    public ResponseEntity<?> getTaskById(@PathVariable Long taskId) throws ResourceNotFoundException {
        Task task = taskService.findById(taskId);
        return ResponseEntity.ok(task);
    }

    @DeleteMapping("/{taskId}")
    public ResponseEntity<?> deleteTask(@PathVariable Long taskId,
                                        @RequestHeader("Authorization") String tokenJWT) throws ResourceNotFoundException {
        User user = userService.findUsernameByJWT(tokenJWT);
        if (Objects.nonNull(user)) {
            taskService.deleteTask(taskId);
        }
        return new ResponseEntity<>("Task deleted successfully", HttpStatus.OK);
    }

}
