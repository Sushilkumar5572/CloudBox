package com.cloudbox.service;

import com.cloudbox.dto.UserProfileDTO;
import com.cloudbox.model.User;
import com.cloudbox.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // ================= GET PROFILE (SAFE) =================
    public UserProfileDTO getProfileDTO(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return mapToDTO(user);
    }

    // ================= UPDATE PROFILE =================
    public UserProfileDTO updateProfileDTO(String email, UserProfileDTO dto) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // ✅ Update only allowed fields
        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        user.setGender(dto.getGender());
        user.setAge(dto.getAge());
        user.setLocation(dto.getLocation());

        userRepository.save(user);

        return mapToDTO(user);
    }

    // ================= HELPER =================
    private UserProfileDTO mapToDTO(User user) {

        UserProfileDTO dto = new UserProfileDTO();

        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        dto.setEmail(user.getEmail());
        dto.setGender(user.getGender());
        dto.setAge(user.getAge());
        dto.setLocation(user.getLocation());

        return dto;
    }
}