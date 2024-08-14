package com.tuananhdo.projects.service;

import com.tuananhdo.projects.entity.Comment;
import com.tuananhdo.projects.entity.Task;
import com.tuananhdo.projects.entity.User;
import com.tuananhdo.projects.exception.ResourceNotFoundException;
import com.tuananhdo.projects.repository.CommentRepository;
import com.tuananhdo.projects.repository.TaskRepository;
import com.tuananhdo.projects.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class CommentService {
    private final CommentRepository commentRepository;
    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public CommentService(CommentRepository commentRepository, TaskRepository taskRepository, UserRepository userRepository) {
        this.commentRepository = commentRepository;
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }


    public Comment createComment(Long taskId, String content, Long userId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new ResourceNotFoundException("Task", "id", taskId));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        Comment comment = new Comment();
        comment.setTask(task);
        comment.setUser(user);
        comment.setCreatedDateTime(LocalDateTime.now());
        comment.setName(user.getUsername());
        comment.setEmail(user.getEmail());
        comment.setContent(content);
        Comment savedComment = commentRepository.save(comment);
        task.getComments().add(savedComment);
        return savedComment;
    }

    public void deleteComment(Long commentId, Long userId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new ResourceNotFoundException("Comment", "id", commentId));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
        if (comment.getUser().equals(user)) {
            commentRepository.delete(comment);
        }
    }

    public List<Comment> findCommentByTask(Long taskId) {
        return commentRepository.findByTaskId(taskId);
    }
}
