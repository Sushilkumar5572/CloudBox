package com.cloudbox.service;

import com.cloudbox.model.User;
import com.cloudbox.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User getProfile(String email) {
        return userRepository.findByEmail(email).orElseThrow();
    }

    public User updateProfile(String email, User updatedUser) {

        User user = userRepository.findByEmail(email).orElseThrow();

        user.setFirstName(updatedUser.getFirstName());
        user.setLastName(updatedUser.getLastName());
        user.setGender(updatedUser.getGender());
        user.setAge(updatedUser.getAge());
        user.setLocation(updatedUser.getLocation());

        return userRepository.save(user);
    }
}