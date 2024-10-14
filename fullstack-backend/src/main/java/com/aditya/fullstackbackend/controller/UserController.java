package com.aditya.fullstackbackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.aditya.fullstackbackend.controller.UserNotFoundException;
import com.aditya.fullstackbackend.model.User;
import com.aditya.fullstackbackend.repository.UserRepository;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin("http://localhost:3000")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/user")
    User newUser(@RequestBody User newUser) {
        return userRepository.save(newUser);
    }

    @GetMapping("/users")
    List<User> getAllUsers() {
        return userRepository.findAllUsersWithCourses();
    }

    @GetMapping("/user/{id}")
    User getUserById(@PathVariable Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));
    }

    @PutMapping("/user/{id}")
    User updateUser(@RequestBody User newUser, @PathVariable Long id) {
        return userRepository.findById(id)
                .map(user -> {
                    user.setUsername(newUser.getUsername());
                    user.setName(newUser.getName());
                    user.setEmail(newUser.getEmail());
                    return userRepository.save(user);
                }).orElseThrow(() ->new UserNotFoundException(id));
    }

    @DeleteMapping("/user/{id}")
    String deleteUser(@PathVariable Long id) {
        if (!userRepository.existsById(id)) {
            throw new UserNotFoundException(id);
        }
        userRepository.deleteById(id);
        return "User with the id " + id + " has been successfully deleted.";
    }
    
    @PostMapping("/emp-login")
    public User login(@RequestBody Map<String, String> user) {
        String username = user.get("username");
        String password = user.get("password");
        
        try {
            List<User> allUsers = userRepository.findByUsername(username);
            if (allUsers.isEmpty()) {
                throw new RuntimeException("Invalid username or password");
            } else {
                User foundUser = allUsers.get(0);
                if (foundUser.getPassword().equals(password)) {
                    return foundUser; // Return the User object
                } else {
                    throw new RuntimeException("Invalid username or password");
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Invalid username or password");
        }
    }


}
