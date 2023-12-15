package com.ro.controller;

import com.ro.dto.RegistrationResponseDTO;
import com.ro.model.User;
import com.ro.service.JpaUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:4200") // Consentire le richieste da localhost:4200
public class PublicUsersController{

    @Autowired
    JpaUserDetailsService userService;

    @PostMapping("/signUp")
    public ResponseEntity<RegistrationResponseDTO> signUp(@RequestBody User user) {
        RegistrationResponseDTO response = userService.signUp(user);
        if (response.getUser() != null) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.badRequest().body(response);
        }
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

    @PutMapping("/updateChoice")
    public String updateUserChoice(@RequestBody User user, String choice) {
        return userService.updateUserChoice(user, choice);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteUser(@PathVariable("id") Long id) {
        return userService.deleteUser(id);
    }

    @PostMapping("/setUserEnabledByUserId")
    public ResponseEntity<String> setUserEnabledByUserId(@RequestParam Long userId){
        String response = userService.setUserEnabledByUserId(userId);

        if (!Objects.equals(response, "Qualcosa e' andato storto")) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.badRequest().body(response);
        }
    }
    }
