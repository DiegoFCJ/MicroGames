package com.ro.controller;

import com.ro.dto.UserForEmailService;
import com.ro.dto.UserIdPlusResponseDTO;
import com.ro.service.EmailActivationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;

@CrossOrigin(origins = "http://localhost:4200") // Consentire le richieste da localhost:4200
@RestController
@RequestMapping("/api/email")
public class EmailController {

    @Autowired
    EmailActivationService service;

    @PostMapping("/sendEmail")
    public String sendEmail(@RequestBody UserForEmailService user) {
        return service.sendMail(user);
    }

    @PostMapping("/activation")
    public ResponseEntity<UserIdPlusResponseDTO> activation(@RequestParam String token){
        UserIdPlusResponseDTO response = service.confirmEmail(token);
        if (response.getUserId() != null) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping("/sendRecoveryMail")
    public String sendRecoveryMail(@RequestBody UserForEmailService userForEmailService){
        return service.sendRecoveryMail(userForEmailService);
    }

    @PostMapping("/confirmRecoverPassword")
    public String confirmRecoverPassword(@RequestBody String token) {
        return service.confirmRecoverPassword(token);
    }
}
