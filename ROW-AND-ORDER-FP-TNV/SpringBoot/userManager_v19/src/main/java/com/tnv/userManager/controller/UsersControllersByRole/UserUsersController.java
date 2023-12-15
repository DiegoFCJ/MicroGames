package com.tnv.userManager.controller.UsersControllersByRole;

import com.tnv.userManager.service.JpaUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserUsersController {
    JpaUserDetailsService userService;

    @Autowired
    public UserUsersController(JpaUserDetailsService userService) {
        this.userService = userService;
    }

    @GetMapping("/hi")
    public String user() {
        return "Hello, User!";
    }
}
