package com.cloudbox.service;

import com.cloudbox.model.User;
import com.cloudbox.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {

    private final UserRepository userRepository;

    public AdminService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User suspendUser(Long id) {

        User user = userRepository.findById(id).orElseThrow();

        user.setSuspended(true);

        return userRepository.save(user);
    }

    public void deleteUser(Long id) {

        userRepository.deleteById(id);

    }
}