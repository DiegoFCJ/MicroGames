package com.tnv.userManager.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sun.mail.smtp.SMTPAddressFailedException;
import com.tnv.userManager.model.User;
import com.tnv.userManager.service.JpaUserDetailsService;
import com.tnv.userManager.service.EmailActivationLinkService;
import jakarta.mail.MessagingException;
import jakarta.mail.Transport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.security.auth.login.AccountNotFoundException;
import java.security.spec.InvalidParameterSpecException;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

@RestController
@RequestMapping("/api/public")
public class PublicUsersController {
    PasswordEncoder encoder = new BCryptPasswordEncoder();
    EmailActivationLinkService activation;
    JpaUserDetailsService userService;

    @Autowired
    public PublicUsersController(JpaUserDetailsService userService, EmailActivationLinkService activation) {
        this.userService = userService;
        this.activation = activation;
    }
    @PostMapping("/signIn")
    public ResponseEntity<?> signIn(@RequestBody User user){
        return userService.signIn(user);
    }

    @PostMapping("/signUp")
    public ResponseEntity<?> signUp(@RequestBody User user) throws MessagingException {
        String stringCheck = "Account creato correttamente";
        String serviceResponse = userService.signUp(user);
        Map<String, Object> map = new LinkedHashMap<>();

        if(serviceResponse.equals(stringCheck)){

            map.put("message", serviceResponse + activation.sendMail(user));
            return new ResponseEntity<>(map, HttpStatus.ACCEPTED);
        }
        map.put("message", serviceResponse);
        return new ResponseEntity<>(map, HttpStatus.NOT_ACCEPTABLE);
    }

    @GetMapping("/activation")
    public String activation(@RequestParam String token){
            return activation.confirmEmail(token);
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable("id") Long id) {
        return userService.getUser(id);
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
