package com.tuananhdo.projects.service;

import com.tuananhdo.projects.entity.Role;
import com.tuananhdo.projects.entity.User;
import com.tuananhdo.projects.exception.ProjectException;
import com.tuananhdo.projects.payload.LoginDTO;
import com.tuananhdo.projects.payload.RegisterDTO;
import com.tuananhdo.projects.repository.RoleRepository;
import com.tuananhdo.projects.repository.UserRepository;
import com.tuananhdo.projects.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.management.relation.RoleNotFoundException;
import java.util.HashSet;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final SubscriptionService  subscriptionService;


    public String login(LoginDTO loginDTO) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginDTO.getUsernameOfEmail(), loginDTO.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        return jwtTokenProvider.generateToken(authentication);
    }

    public String register(RegisterDTO registerDTO) throws RoleNotFoundException {
        if (userRepository.existsByUsername(registerDTO.getUsername())) {
            throw new ProjectException(HttpStatus.BAD_REQUEST, "Username is already exists!");
        }
        if (userRepository.existsByEmail(registerDTO.getEmail())) {
            throw new ProjectException(HttpStatus.BAD_REQUEST, "Email is already exists!");
        }
        User user = new User();
        user.setFirstName(registerDTO.getFirstName());
        user.setLastName(registerDTO.getLastName());
        user.setUsername(registerDTO.getUsername());
        user.setEmail(registerDTO.getEmail());
        user.setPassword(passwordEncoder.encode(registerDTO.getPassword()));
        Set<Role> roles = new HashSet<>();
        Role role = roleRepository.findByName("ROLE_USER")
                .orElseThrow(() -> new RoleNotFoundException("Cannot find any role:" + roles));
        roles.add(role);
        user.setRoles(roles);
        userRepository.save(user);
        subscriptionService.createSubscription(user);
        return "User registered successfully!";
    }
}
