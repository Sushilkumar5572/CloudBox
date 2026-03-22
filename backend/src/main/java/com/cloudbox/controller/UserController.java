package com.cloudbox.controller;

import com.cloudbox.dto.UserProfileDTO;
import com.cloudbox.model.User;
import com.cloudbox.service.UserService;

import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // ================= GET PROFILE =================
    @GetMapping("/profile")
    public UserProfileDTO getProfile(Principal principal) {
        return userService.getProfileDTO(principal.getName());
    }

    // ================= UPDATE PROFILE =================
    @PutMapping("/profile")
    public UserProfileDTO updateProfile(@RequestBody UserProfileDTO dto,
                                        Principal principal) {
        return userService.updateProfileDTO(principal.getName(), dto);
    }
}