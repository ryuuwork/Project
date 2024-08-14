package com.tuananhdo.projects.controller;

import com.tuananhdo.projects.entity.Message;
import com.tuananhdo.projects.exception.ResourceNotFoundException;
import com.tuananhdo.projects.payload.MessageDTO;
import com.tuananhdo.projects.payload.MessageRequest;
import com.tuananhdo.projects.service.MessageService;
import com.tuananhdo.projects.service.ProjectService;
import com.tuananhdo.projects.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/messages")
public class MessageController {
    private final MessageService messageService;
    private final UserService userService;
    private final ProjectService projectService;

    public MessageController(MessageService messageService, UserService userService, ProjectService projectService) {
        this.messageService = messageService;
        this.userService = userService;
        this.projectService = projectService;
    }

    @PostMapping("/send")
    public ResponseEntity<?> sendMessage(@RequestBody MessageRequest messageRequest) throws ResourceNotFoundException {
        userService.findById(messageRequest.getSenderId());
        projectService.getById(messageRequest.getProjectId()).getChat();
        MessageDTO sentMessage = messageService.sendMessage(messageRequest);
        return new ResponseEntity<>(sentMessage, HttpStatus.CREATED);
    }

    @GetMapping("/chat/{projectId}")
    public ResponseEntity<?> getMessageByProjectId(@PathVariable Long projectId) throws ResourceNotFoundException {
        List<Message> messages = messageService.getMessageByProject(projectId);
        return new ResponseEntity<>(messages, HttpStatus.OK);
    }
}
