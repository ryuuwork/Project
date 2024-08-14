package com.tuananhdo.projects.service;

import com.tuananhdo.projects.entity.User;
import com.tuananhdo.projects.exception.ResourceNotFoundException;
import com.tuananhdo.projects.repository.RoleRepository;
import com.tuananhdo.projects.repository.UserRepository;
import com.tuananhdo.projects.security.JwtAuthenticationFilter;
import com.tuananhdo.projects.security.JwtTokenProvider;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private static final Logger LOGGER = LoggerFactory.getLogger(UserService.class);
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final PasswordEncoder passwordEncoder;


    public User findByEmail(String email) throws ResourceNotFoundException {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", email.length()));
    }

    public User findByUsername(String username) throws ResourceNotFoundException {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("Username", "id", username.length()));
    }

    public User createUser(User userInForm){
        User createUser = new User();
        createUser.setFirstName(userInForm.getFirstName());
        createUser.setLastName(userInForm.getLastName());
        createUser.setUsername(userInForm.getUsername());
        createUser.setEmail(userInForm.getEmail());
        createUser.setPassword(passwordEncoder.encode(userInForm.getPassword()));

        return userRepository.save(createUser);
    }

    public User findById(Long userId) throws ResourceNotFoundException {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
    }

    public User updateUserProjectSize(User user, int number) {
        return userRepository.save(user);
    }

    @Transactional
    public void delete(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        userRepository.delete(user);
    }

    public User findUsernameByJWT(String token) throws ResourceNotFoundException {
        String getTokenFromRequest = JwtAuthenticationFilter.getTokenFromRequest(token);
        String username = jwtTokenProvider.getUsername(getTokenFromRequest);
        LOGGER.info(username);
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException(username));
    }

}
