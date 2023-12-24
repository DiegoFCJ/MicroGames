package com.ro;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class RatingServiceApp {
    public static void main(String[] args) {
        SpringApplication.run(RatingServiceApp.class, args);
    }
}