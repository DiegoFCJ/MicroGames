package com.tnv.userManager.controller.UsersControllersByRole;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tnv.userManager.model.User;
import com.tnv.userManager.service.JpaUserDetailsService;
import com.tnv.userManager.service.EmailActivationLinkService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.security.auth.login.AccountNotFoundException;
import java.security.spec.InvalidParameterSpecException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;

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

    @GetMapping("/hi")
    public String home() {
        return "Hello, World!";
    }

    /***************************** USED *****************************/

    @PostMapping("/signIn")
    public ResponseEntity<User> signIn(@RequestBody User user) throws AccountNotFoundException, InvalidParameterSpecException {

        User userFound = userService.signIn(user);
        boolean isUsernamePresent = userService.doesUsernameExists(user.getUsername());
        boolean isPasswordPresent = encoder.matches(user.getPassword(), userFound.getPassword());
        boolean isEmailPresent = userService.doesEmailExists(user.getUsername());

        if((isUsernamePresent || isEmailPresent) && isPasswordPresent){
            return new ResponseEntity<>(userFound, HttpStatus.ACCEPTED);
        }
        return new ResponseEntity(userFound, HttpStatus.UNAUTHORIZED);

    }

    @PostMapping("/signUp")
    public ResponseEntity<User> signUp(@RequestBody User user) throws JsonProcessingException, MessagingException {
        boolean isUsernamePresent = userService.doesUsernameExists(user.getUsername());
        boolean isEmailPresent = userService.doesEmailExists(user.getEmail());

        if(!isUsernamePresent && !isEmailPresent){
            ObjectMapper mapper = new ObjectMapper();
            String signedUser = userService.signUp(user);
            activation.sendMail(user);
            Map<String,Object> map = mapper.readValue(signedUser, Map.class);

            return new ResponseEntity<User>((User) map, HttpStatus.ACCEPTED);
        }
        return new ResponseEntity<>(user, HttpStatus.CONFLICT);
    }

    @GetMapping("/activation")
    public String activation(@RequestParam String token){
        return activation.confirmEmail(token);
    }

    @GetMapping("/allUsersDescending")
    public Collection<User> allUsersDescendByScore() {
        return userService.allUsersDescendByScore();
    }




    /**************************** UNUSED ****************************/

    @PostMapping("/botGenerator/{numberOfBots}")
    public void botGenerator(@PathVariable("numberOfBots") int numberOfBots){
        userService.botGenerator(numberOfBots);
    }

    @GetMapping("/idByUsername/{username}")
    public int getIdByUsername(@PathVariable("username") String username){
        return userService.getIdByUsername(username);
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable("id") Long id) {
        return userService.getUser(id);
    }

    @GetMapping("/all")
    public Iterable<User> allUsers() {
        return userService.allUsers();
    }

    @GetMapping("/email/{email}")
    public List<User> findByEmailContains(@PathVariable("email") String email) {
        return userService.findByEmailContains(email);
    }

    @GetMapping("/username/{username}")
    public List<User> findByUsernameContains(@PathVariable("username") String username) {
        return userService.findByUsernameContains(username);
    }

    @GetMapping("/score/{id}")
    public int userScore(@PathVariable("id") Long id) {
        return userService.userScore(id);
    }

    @GetMapping("/allScore")
    public ArrayList<Integer> allScores() {
        return userService.allScores();
    }

    @GetMapping("/allUsersIncrease")
    public Collection<User> allUsersIncreaseByScore() {
        return userService.allUsersIncreaseByScore();
    }

    @GetMapping("/usernamesAndScoresList")
    public ArrayList<String> allScoresAndUsernames() {
        return userService.allScoresAndUsernames();
    }

    @PutMapping("/update/{id}")
    public String updateUser(@PathVariable("id") Long id, @RequestBody User user) {
        return userService.updateUser(id, user);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteUser(@PathVariable("id") Long id) {
        return userService.deleteUser(id);
    }

    @PatchMapping("/IncrementScore/{id}")
    public String incrementUserScore(@PathVariable("id") Long userId) {
        return userService.incrementUserScore(userId);
    }

    @PatchMapping("/name/{id}")
    public String updateUserName(@PathVariable("id") Long userId, @RequestBody User userDetails) {

        return userService.updateUserChoice(userId, userDetails, "name");
    }

    @PatchMapping("/surname/{id}")
    public String updateUserSurname(@PathVariable("id") Long userId, @RequestBody User userDetails) {

        return userService.updateUserChoice(userId, userDetails, "surname");
    }

    @PatchMapping("/username/{id}")
    public String updateUserUsername(@PathVariable("id") Long userId, @RequestBody User userDetails) {
        return userService.updateUserChoice(userId, userDetails, "username");
    }

    @PatchMapping("/password/{id}")
    public String updateUserPassword(@PathVariable("id") Long userId, @RequestBody User userDetails) {

        return userService.updateUserChoice(userId, userDetails, "password");
    }

    @PatchMapping("/email/{id}")
    public String updateUserEmail(@PathVariable("id") Long userId, @RequestBody User userDetails) {

        return userService.updateUserChoice(userId, userDetails, "email");
    }

    @PatchMapping("/score/{id}")
    public String updateUserScore(@PathVariable("id") Long userId, @RequestBody User userDetails) {

        return userService.updateUserChoice(userId, userDetails, "score");
    }
    }
