package com.tuananhdo.projects.controller;

import com.tuananhdo.projects.entity.Role;
import com.tuananhdo.projects.exception.ResourceNotFoundException;
import com.tuananhdo.projects.payload.RoleRequest;
import com.tuananhdo.projects.service.RoleService;
import com.tuananhdo.projects.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/roles")
public class RoleController {
    private final RoleService roleService;
    private final UserService userService;

    @PostMapping("/create")
    public ResponseEntity<?> createRole(@RequestHeader("Authorization") String tokenJWT,
                                        @RequestBody List<RoleRequest> roleRequests) {
        userService.findUsernameByJWT(tokenJWT);
        Set<Role> createdRoles = roleService.createRoles(roleRequests);
        return new ResponseEntity<>(createdRoles, HttpStatus.CREATED);
    }

    @DeleteMapping("/{roleId}")
    public ResponseEntity<?> deleteRole(@PathVariable Long roleId) throws ResourceNotFoundException {
        roleService.deleteRole(roleId);
        return new ResponseEntity<>("Role deleted successfully", HttpStatus.OK);
    }


}
