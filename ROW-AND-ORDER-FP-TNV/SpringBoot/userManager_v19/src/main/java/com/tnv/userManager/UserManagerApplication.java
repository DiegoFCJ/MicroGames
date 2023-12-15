package com.tnv.userManager;

import com.tnv.userManager.model.User;
import com.tnv.userManager.repository.UserRepository;
import jakarta.mail.MessagingException;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.Random;

@SpringBootApplication
public class UserManagerApplication {

	public static void main(String[] args){SpringApplication.run(UserManagerApplication.class, args);}

}
