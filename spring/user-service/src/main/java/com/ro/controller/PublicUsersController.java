package com.ro.controller;

import com.ro.model.User;
import com.ro.service.JpaUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class PublicUsersController {

    @Autowired
    JpaUserDetailsService userService;

    @PostMapping("/signUp")
    public ResponseEntity<String> signUp(@RequestBody User user) {
        String response = userService.signUp(user);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/signIn")
    public ResponseEntity<?> signIn(@RequestBody User user){
        return userService.signIn(user);
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable("id") Long id) {
        return userService.getUser(id);
    }

    @PostMapping("/isEnabledByEmail")
    public String isEnabledByEmail(@RequestBody String email){
        return userService.isEnabledByEmail(email);
    }

    @GetMapping("/all")
    public Iterable<User> allUsers() {
        return userService.allUsers();
    }

    @PutMapping("/update/{id}")
    public String updateUser(@PathVariable("id") Long id, @RequestBody User user) {
        return userService.updateUser(id, user);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteUser(@PathVariable("id") Long id) {
        return userService.deleteUser(id);
    }

    }
