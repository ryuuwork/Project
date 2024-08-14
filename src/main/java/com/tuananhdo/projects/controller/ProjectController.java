package com.tuananhdo.projects.controller;

import com.tuananhdo.projects.entity.Chat;
import com.tuananhdo.projects.entity.Invite;
import com.tuananhdo.projects.entity.Project;
import com.tuananhdo.projects.entity.User;
import com.tuananhdo.projects.exception.ResourceNotFoundException;
import com.tuananhdo.projects.payload.InviteRequest;
import com.tuananhdo.projects.service.InviteService;
import com.tuananhdo.projects.service.ProjectService;
import com.tuananhdo.projects.service.UserService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/projects")
public class ProjectController {

    private final ProjectService projectService;
    private final UserService userService;
    private final InviteService inviteService;
    @GetMapping
    public ResponseEntity<?> getAllProjectsByTeam(@RequestParam(required = false) String category,
                                         @RequestParam(required = false) String tag,
                                         @RequestHeader("Authorization") String tokenJWT) throws ResourceNotFoundException {
        User user = userService.findUsernameByJWT(tokenJWT);
        List<Project> projects = projectService.getByTeam(user, category, tag);
        return new ResponseEntity<>(projects, HttpStatus.OK);
    }

    @GetMapping(value = {"/{projectId}"})
    public ResponseEntity<?> getProjectById(@PathVariable() Long projectId,
                                            @RequestHeader("Authorization") String tokenJWT) throws ResourceNotFoundException {
        userService.findUsernameByJWT(tokenJWT);
        Project project = projectService.getById(projectId);
        return new ResponseEntity<>(project, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> createProject(@RequestHeader("Authorization") String tokenJWT,
                                           @RequestBody Project project) throws ResourceNotFoundException {
        User user = userService.findUsernameByJWT(tokenJWT);
        Project createProject = projectService.create(project, user);
        return new ResponseEntity<>(createProject, HttpStatus.OK);
    }

    @PatchMapping(value = {"/{projectId}"})
    public ResponseEntity<?> updateProject(@PathVariable() Long projectId,
                                           @RequestHeader("Authorization") String tokenJWT,
                                           @RequestBody Project project) throws ResourceNotFoundException {
        userService.findUsernameByJWT(tokenJWT);
        Project updatedProject = projectService.update(project, projectId);
        return new ResponseEntity<>(updatedProject, HttpStatus.OK);
    }

    @DeleteMapping(value = {"/{projectId}"})
    public ResponseEntity<?> deleteProject(@PathVariable() Long projectId,
                                           @RequestHeader("Authorization") String tokenJWT) throws ResourceNotFoundException {
        User user = userService.findUsernameByJWT(tokenJWT);
        if (Objects.nonNull(user)) {
            projectService.delete(projectId);
        }
        return new ResponseEntity<>("Project deleted successfully", HttpStatus.OK);
    }

    @GetMapping(value = {"/search"})
    public ResponseEntity<?> searchProject(@RequestParam() String keyword,
                                           @RequestHeader("Authorization") String tokenJWT) throws ResourceNotFoundException {
        User user = userService.findUsernameByJWT(tokenJWT);
        List<Project> project = projectService.searchProject(keyword, user);
        return new ResponseEntity<>(project, HttpStatus.OK);
    }

    @GetMapping(value = {"/{projectId}/chat"})
    public ResponseEntity<?> getChatByProject(@PathVariable Long projectId,
                                              @RequestHeader("Authorization") String tokenJWT) throws ResourceNotFoundException {
        userService.findUsernameByJWT(tokenJWT);
        Chat chat = projectService.getChatByProjectId(projectId);
        return new ResponseEntity<>(chat, HttpStatus.OK);
    }

    @PostMapping(value = {"/invite"})
    public ResponseEntity<?> inviteProject(@RequestHeader("Authorization") String tokenJWT,
                                           @RequestBody InviteRequest inviteRequest) throws ResourceNotFoundException, MessagingException {
        userService.findUsernameByJWT(tokenJWT);
        inviteService.sendInvite(inviteRequest.getEmail(), inviteRequest.getProjectId());
        return new ResponseEntity<>("User invite sent", HttpStatus.OK);
    }

    @GetMapping(value = {"/invite/accept"})
    public ResponseEntity<?> acceptInviteProject(@RequestParam("token") String token,
                                                 @RequestHeader("Authorization") String tokenJWT) throws ResourceNotFoundException, MessagingException {
        User user = userService.findUsernameByJWT(tokenJWT);
        Invite invite = inviteService.acceptInvite(token);
        projectService.addOfRemoveUserInProject(invite.getProjectId(), user.getId(),true);
        return new ResponseEntity<>(invite, HttpStatus.ACCEPTED);
    }
}
