package com.tuananhdo.projects.controller;

import com.tuananhdo.projects.payload.JWTAuthResponse;
import com.tuananhdo.projects.payload.LoginDTO;
import com.tuananhdo.projects.payload.RegisterDTO;
import com.tuananhdo.projects.service.AuthService;
import com.tuananhdo.projects.service.SubscriptionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.management.relation.RoleNotFoundException;

@RestController
    @RequestMapping("/api/v1/auth")
//@Tag(name = "REST APIs for Authentication Resource")
public class AuthController {

    private final AuthService authService;
    private final SubscriptionService subscriptionService;


    public AuthController(AuthService authService, SubscriptionService subscriptionService) {
        this.authService = authService;
        this.subscriptionService = subscriptionService;
    }

    @PostMapping(value = {"/login", "/signing"})
    public ResponseEntity<JWTAuthResponse> login(@RequestBody LoginDTO loginDTO) {
        String token = authService.login(loginDTO);
        JWTAuthResponse authResponse = new JWTAuthResponse();
        authResponse.setAccessToken(token);
        return ResponseEntity.ok(authResponse);
    }

    @PostMapping(value = {"/register", "/signup"})
    public ResponseEntity<String> register(@RequestBody RegisterDTO registerDTO) throws RoleNotFoundException {
        String response = authService.register(registerDTO);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
}
