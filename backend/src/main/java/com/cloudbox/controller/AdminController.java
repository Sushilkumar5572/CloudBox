package com.cloudbox.controller;

import com.cloudbox.model.User;
import com.cloudbox.service.AdminService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping("/users")
    public List<User> getUsers() {

        return adminService.getAllUsers();
    }

    @PutMapping("/suspend/{id}")
    public User suspendUser(@PathVariable Long id) {

        return adminService.suspendUser(id);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteUser(@PathVariable Long id) {

        adminService.deleteUser(id);

        return "User deleted successfully";
    }
}