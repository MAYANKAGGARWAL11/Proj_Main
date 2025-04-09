package com.reactjavafullstack003.E_Learning_Platform_003.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.reactjavafullstack003.E_Learning_Platform_003.Exceptions.UserNotFoundException;
import com.reactjavafullstack003.E_Learning_Platform_003.model.User;
import com.reactjavafullstack003.E_Learning_Platform_003.repository.UserRepository;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;

    /**
     * Fetch all users from the repository.
     * Throws UserNotFoundException if no users are found.
     */
    public List<User> getAllUsers() {
        List<User> users = userRepository.findAll();
        if (users.isEmpty()) {
            throw new UserNotFoundException("No users found");
        }
        return users;
    }

    /**
     * Fetch a user by ID from the repository.
     * Throws UserNotFoundException if the user is not found.
     */
    public User getUserById(int userID) {
        return userRepository.findById(userID)
                .orElseThrow(() -> new UserNotFoundException("User with ID " + userID + " not found"));
    }
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User with email " + email + " not found"));
    }
    /**
     * Save a new user to the repository.
     * Throws UserNotFoundException if a user with the same email already exists.
     */
    public User saveUser(User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new UserNotFoundException("User already exists with email: " + user.getEmail());
        }
        return userRepository.save(user);
    }

    /**
     * Update an existing user in the repository.
     * Throws UserNotFoundException if the user is not found.
     */
    public User updateUser(int userID, User user) {
        User existingUser = userRepository.findById(userID)
                .orElseThrow(() -> new UserNotFoundException("User with ID " + userID + " not found"));
        existingUser.setName(user.getName());
        existingUser.setEmail(user.getEmail());
        existingUser.setPassword(user.getPassword());
        return userRepository.save(existingUser);
    }

    /**
     * Delete a user by ID from the repository.
     * Throws UserNotFoundException if the user is not found.
     */
    public void deleteUser(int userID) {
        if (!userRepository.existsById(userID)) {
            throw new UserNotFoundException("User with ID " + userID + " not found");
        }
        userRepository.deleteById(userID);
    }
}