package com.tuananhdo.projects.service;

import com.tuananhdo.projects.entity.Role;
import com.tuananhdo.projects.entity.User;
import com.tuananhdo.projects.exception.ResourceNotFoundException;
import com.tuananhdo.projects.payload.RoleRequest;
import com.tuananhdo.projects.repository.RoleRepository;
import com.tuananhdo.projects.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RoleService {

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;

    public Set<Role> createRoles(List<RoleRequest> roleRequests) {
        List<String> errorMessages = roleRequests.stream()
                .filter(roleRequest -> roleRepository.findByName(roleRequest.getName()).isPresent())
                .map(RoleRequest::getName)
                .toList();

        if (!errorMessages.isEmpty()) {
            throw new IllegalArgumentException("Role with name " + String.join(", ", errorMessages) + " already exists!");
        }

        return roleRequests.stream()
                .map(roleRequest -> {
                    Role role = new Role();
                    role.setName(roleRequest.getName());
                    return roleRepository.save(role);
                }).collect(Collectors.toSet());
    }

    public void deleteRole(Long roleId) {
        Role role = roleRepository.findById(roleId)
                .orElseThrow(() -> new ResourceNotFoundException("Role", "id", roleId));
        List<User> users = userRepository.findByRolesIn(List.of(role));
        if (!users.isEmpty()) {
            throw new IllegalStateException("Cannot delete role '" + role.getName() + "' because it's still assigned to user");
        }
        roleRepository.delete(role);
    }
}
