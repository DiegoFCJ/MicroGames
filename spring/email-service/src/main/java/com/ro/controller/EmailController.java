package com.ro.controller;

import com.ro.model.User;
import com.ro.model.VerificationToken;
import com.ro.service.EmailActivationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;

@RestController
@RequestMapping("/api/email")
public class EmailController {

    @Autowired
    EmailActivationService service;

    @PostMapping("/sendEmail")
    public String sendEmail(@RequestBody User user) throws MessagingException {
        return service.sendMail(user);
    }

    @PostMapping("/activation")
    public String activation(@RequestParam String token){
            return service.confirmEmail(token);
    }

    @PostMapping("/passRecovery")
    public String passRecovery(@RequestParam String email){
        return service.sendRecoveryMail(email);
    }

    @PostMapping("/recoverPassword")
    public ResponseEntity<String> recoverPassword(@RequestBody User user, @RequestParam String token) {
        return service.updateUserPass(user, token);
    }
}
