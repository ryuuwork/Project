package com.tuananhdo.projects.controller;

import com.tuananhdo.projects.entity.User;
import com.tuananhdo.projects.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.management.relation.RoleNotFoundException;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    private final UserService userService;
    private Long userId;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getUserProfile(@RequestHeader("Authorization") String tokenJWT) {
        User user = userService.findUsernameByJWT(tokenJWT);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createUser(@RequestHeader("Authorization") String tokenJWT,
                                        @RequestBody User user) throws RoleNotFoundException {
        userService.findUsernameByJWT(tokenJWT);
        User createUser = userService.createUser(user);
        return new ResponseEntity<>(createUser, HttpStatus.OK);
    }

//    @DeleteMapping("/{userId}")
//    public ResponseEntity<?> deleteUser(@RequestHeader("Authorization") String tokenJWT,
//                                        @PathVariable("userId") Long userId) {
//        User user = userService.findUsernameByJWT(tokenJWT);
//        if (Objects.nonNull(user)){
//        userService.delete(userId);
//        }
//        return new ResponseEntity<>("Deleted user successfully", HttpStatus.OK);
//    }

}
