package com.cloudbox.controller;

import com.cloudbox.model.User;
import com.cloudbox.service.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/profile")
    public User getProfile(@RequestParam String email) {

        return userService.getProfile(email);
    }

    @PutMapping("/profile")
    public User updateProfile(@RequestParam String email,
                              @RequestBody User user) {

        return userService.updateProfile(email, user);
    }
}