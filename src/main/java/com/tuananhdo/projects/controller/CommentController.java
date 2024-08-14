package com.tuananhdo.projects.controller;

import com.tuananhdo.projects.entity.Comment;
import com.tuananhdo.projects.entity.User;
import com.tuananhdo.projects.exception.ResourceNotFoundException;
import com.tuananhdo.projects.payload.CommentDTO;
import com.tuananhdo.projects.service.CommentService;
import com.tuananhdo.projects.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/comments")
public class CommentController {
    private final CommentService commentService;
    private final UserService userService;
    @PostMapping
    public ResponseEntity<?> createComment(@RequestHeader("Authorization") String tokenJWT,
                                           @RequestBody CommentDTO commentDTO) throws ResourceNotFoundException {
        User user = userService.findUsernameByJWT(tokenJWT);
        Comment comment = commentService.createComment(commentDTO.getTaskId(), commentDTO.getContent(), user.getId());
        return new ResponseEntity<>(comment, HttpStatus.CREATED);
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<?> deleteComment(@PathVariable Long commentId,
                                           @RequestHeader("Authorization") String tokenJWT) throws ResourceNotFoundException {
        User user = userService.findUsernameByJWT(tokenJWT);
        commentService.deleteComment(commentId, user.getId());
        return new ResponseEntity<>("Comment deleted successfully", HttpStatus.OK);
    }

    @GetMapping("/{taskId}")
    public ResponseEntity<?> getCommentByTask(@PathVariable Long taskId) throws ResourceNotFoundException {
        List<Comment> comments = commentService.findCommentByTask(taskId);
        return new ResponseEntity<>(comments, HttpStatus.OK);
    }

}
