package com.tuananhdo.projects.security;

import com.tuananhdo.projects.entity.User;
import com.tuananhdo.projects.repository.UserRepository;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;
    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String usernameOfEmail) throws UsernameNotFoundException {
        User user = userRepository.findByUsernameOrEmail(usernameOfEmail, usernameOfEmail)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + usernameOfEmail));
        Set<GrantedAuthority> authorities = user.getRoles()
                .stream().map(role -> new SimpleGrantedAuthority(role.getName()))
                .collect(Collectors.toSet());
        return new org.springframework.security.core.userdetails.User(usernameOfEmail, user.getPassword(), authorities);
    }
}
