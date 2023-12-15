package com.tnv.userManager.model;


import jakarta.persistence.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Collection;

@Entity
@Table(name = "users")
public class User implements UserDetails {

    @Transient
    PasswordEncoder enc = new BCryptPasswordEncoder();

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="user_id", nullable = false)
    private Long id;
    private String name;
    private String surname;
    @Column(nullable = false, unique = true)
    private String email;
    @Column(nullable = false, unique = true)
    private String username;
    private String password;
    private String roles;
    private int score;
    private LocalDateTime registered_on;
    private LocalDateTime update_on;
    private LocalDateTime last_log;
    private boolean isEnabled;

    public User() {}

    public User(String role) {
        String roleLowerCase = role.toLowerCase();
        this.roles = role;
        this.isEnabled = true;
        this.name = roleLowerCase;
        this.surname = roleLowerCase;
        this.username = roleLowerCase;
        this.email = roleLowerCase + "@TheBoss.com";
        this.password = enc.encode(roleLowerCase);
        this.registered_on = LocalDateTime.now();
        this.update_on = LocalDateTime.now();
        this.last_log = LocalDateTime.now();
        this.score = (int)(Math.random()*10)*10;
        this.isEnabled = true;
    }

    public User(String data, String role) {
        String dataLowerCase = data.toLowerCase();
        this.roles = role;
        this.isEnabled = true;
        this.name = dataLowerCase;
        this.surname = dataLowerCase;
        this.username = dataLowerCase;
        this.email = dataLowerCase + "@TheBoss.com";
        this.password = enc.encode(dataLowerCase);
        this.registered_on = LocalDateTime.now();
        this.update_on = LocalDateTime.now();
        this.last_log = LocalDateTime.now();
        this.score = (int)(Math.random()*10)*10;
        this.isEnabled = true;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Arrays.stream(
                this.roles.split(","))
                .map(SimpleGrantedAuthority::new)
                .toList();
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return this.isEnabled;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRoles() {
        return roles;
    }

    public void setRoles(String roles) {
        this.roles = roles;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public LocalDateTime getRegistered_on() {
        return registered_on;
    }

    public void setRegistered_on(LocalDateTime registered_on) {
        this.registered_on = registered_on;
    }

    public LocalDateTime getUpdate_on() {
        return update_on;
    }

    public void setUpdate_on(LocalDateTime update_on) {
        this.update_on = update_on;
    }

    public LocalDateTime getLast_log() {
        return last_log;
    }

    public void setLast_log(LocalDateTime last_log) {
        this.last_log = last_log;
    }

    public void setEnabled(boolean enabled) {
        isEnabled = enabled;
    }

    @Override
    public String toString() {
        return  "User " + this.id + ": " +
                "\nFirst name = " + this.name +
                "\nLast name = " + this.surname +
                "\nUsername = " + this.username +
                "\nEmail = " + this.email +
                "\nPassword = " + this.password +
                "\nRoles = " + this.roles +
                "\nRegistered on = " + this.registered_on +
                "\nLast Update = " + this.update_on +
                "\nLast Log = " + this.last_log +
                "\nScore = " + this.score;
    }
}
