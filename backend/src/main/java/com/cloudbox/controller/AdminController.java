package com.cloudbox.controller;

import com.cloudbox.model.User;
import com.cloudbox.model.FileEntity;
import com.cloudbox.service.AdminService;
import com.cloudbox.service.FileService;
import com.cloudbox.repository.UserRepository;
import com.cloudbox.repository.FileRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {

    private final AdminService adminService;
    private final UserRepository userRepository;
    private final FileService fileService;
    private final FileRepository fileRepository;

    public AdminController(
            AdminService adminService,
            UserRepository userRepository,
            FileService fileService,
            FileRepository fileRepository
    ) {
        this.adminService = adminService;
        this.userRepository = userRepository;
        this.fileService = fileService;
        this.fileRepository = fileRepository;
    }

    // ================= USERS =================

    @GetMapping("/users")
    public List<User> getUsers() {
        return adminService.getAllUsers();
    }

    @PutMapping("/suspend/{id}")
    public User suspendUser(@PathVariable Long id) {
        return adminService.suspendUser(id);
    }

    @PutMapping("/unsuspend/{id}")
    public User unsuspendUser(@PathVariable Long id) {
        return adminService.unsuspendUser(id);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        adminService.deleteUser(id);
        return ResponseEntity.ok("User deleted successfully");
    }

    // ================= SEARCH =================

    @GetMapping("/search")
    public List<User> searchUsers(@RequestParam String email) {
        return adminService.searchUsers(email);
    }

    @GetMapping("/active")
    public List<User> activeUsers() {
        return adminService.getActiveUsers();
    }

    @GetMapping("/suspended")
    public List<User> suspendedUsers() {
        return adminService.getSuspendedUsers();
    }

    // ================= DASHBOARD =================

    @GetMapping("/dashboard")
    public Map<String, Object> getAdminDashboard() {

        Map<String, Object> data = new HashMap<>();

        // 📊 stats
        data.put("totalUsers", userRepository.count());
        data.put("totalFiles", fileService.getTotalFiles());
        data.put("totalStorage", fileService.getTotalStorage());

        // 📁 recent files
        List<FileEntity> recentFiles = fileRepository.findAll()
                .stream()
                .sorted((a, b) -> b.getUploadedAt().compareTo(a.getUploadedAt()))
                .limit(5)
                .toList();

        data.put("recentFiles", recentFiles);

        return data;
    }
}