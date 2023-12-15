package com.tnv.userManager.service;

import com.tnv.userManager.exceptions.UsernameOrEmailAlreadyExistException;
import com.tnv.userManager.model.User;
import com.tnv.userManager.Object.UsersDescendByScore;
import com.tnv.userManager.Object.UsersIncreaseByScore;
import com.tnv.userManager.repository.UserRepository;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.security.auth.login.AccountNotFoundException;
import java.security.spec.InvalidParameterSpecException;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class JpaUserDetailsService implements UserDetailsService {

    private final UserRepository userRepo;
    PasswordEncoder encoder = new BCryptPasswordEncoder();

    @Autowired
    public JpaUserDetailsService(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepo.findByUsername(username).orElseThrow(() ->
                new UsernameNotFoundException(String.format("user with username %s not found", username))
        );
    }

    public void botGenerator(int numberOfBots){
        if(!userRepo.adminAutoCreate("ADMIN")){
            userRepo.save(new User("ADMIN"));
            userRepo.save(new User("USER"));
            for(int i=0; i<numberOfBots;) {
                userRepo.save(new User(randomNamesCreator(), "USER"));
                i++;
            }
        }
        throw new UsernameOrEmailAlreadyExistException("Admin is already in db");
    }

    public String randomNamesCreator(){
        String[] namesList = {"bambi", "mari", "test", "ludo", "bibi", "doug", "papi", "mesa", "mery", "leon", "rope", "sell", "jason", "jackson", "boxi", "baby", "roxana", "lana", "mariangela", "giorgicca", "banana", "joe"};

        return (char)(Math.random()*26+65) + namesList[new Random().nextInt(namesList.length)] + (char)(Math.random()*26+65) + (char)(Math.random()*26+65) + (int)(Math.random()*100);
    }

    public int getIdByUsername(String username){
        User userFound = (User) findByUsernameContains(username);
        return Math.toIntExact(userFound.getId());
    }

    public User signIn(User userToCheck) throws AccountNotFoundException, InvalidParameterSpecException {
        if (doesUsernameExists(userToCheck.getUsername())){
            User userResult = userRepo.findByUsername(userToCheck.getUsername()).get();
            if (encoder.matches(userToCheck.getPassword(), userResult.getPassword())){
                return userResult;
            }
            throw new InvalidParameterSpecException("Oops! wrong password!");

        } else if (doesEmailExists(userToCheck.getUsername())) {
            User userResult = userRepo.findByEmail(userToCheck.getUsername()).get();
            if (encoder.matches(userToCheck.getPassword(), userResult.getPassword())){
                return userResult;
            }
            throw new InvalidParameterSpecException("Oops! wrong password!");
        }
        throw new AccountNotFoundException("the account you are trying to access does not exist");
    }

    public String signUp(User user) throws MessagingException {
        if(!doesUsernameExists(user.getUsername())){
            user.setRegistered_on(LocalDateTime.now());
            user.setUpdate_on(LocalDateTime.now());
            user.setLast_log(LocalDateTime.now());
            user.setPassword(encoder.encode(user.getPassword()));
            user.setRoles("USER");
            User userToActivate = userRepo.save(user);
            return "User signed correctly check your email for activate your account";
        }
        throw new UsernameOrEmailAlreadyExistException("Username or Email already exists, try again!");
    }

    public void save(User user){
        userRepo.save(user);
    }

    public boolean doesUsernameExists(String username){
        return userRepo.findByUsername(username).isPresent();
    }

    public boolean doesEmailExists(String email){
        return userRepo.findByEmail(email).isPresent();
    }

    public int userScore(Long id) {
        return userRepo.findById(id)
                .orElseThrow(() -> new IndexOutOfBoundsException("User not found with the id: "+ id)).getScore();
    }

    public ArrayList<String> allScoresAndUsernames() {
        ArrayList<String> usernamesAndScoresList = new ArrayList<>();
        for (User user: allUsers()) {
            usernamesAndScoresList.add(user.getUsername() + " has in total: " + user.getScore() + " points");
        }
        return usernamesAndScoresList;
    }

    public ArrayList<Integer> allScores() {
        ArrayList<Integer> scoreList = new ArrayList<>();
        for (User user: allUsers()) {
            scoreList.add(user.getScore());
        }
        return scoreList;
    }

    public Collection<User> allUsersDescendByScore() {

        List<User> allUsersDescend = new ArrayList<User>();
        for (User user: allUsers()) {
            allUsersDescend.add(user);
        }
        allUsersDescend.sort(new UsersDescendByScore());

        return allUsersDescend;

    }

    public Collection<User> allUsersIncreaseByScore() {

        List<User> allUsersIncrease = new ArrayList<User>();
        for (User user: allUsers()) {
            allUsersIncrease.add(user);
        }
        allUsersIncrease.sort(new UsersIncreaseByScore());

        return allUsersIncrease;

    }

    public String incrementUserScore(Long id) {

        User resultUser = userRepo
                .findById(id)
                .orElseThrow(() -> new IndexOutOfBoundsException("User not found with the id: "+ id));

        if (resultUser != null) {
            resultUser.setScore(resultUser.getScore() + 10);
            updateUserChoice(id, resultUser, "score");
            return "User's scores Saved Correctly";
        } else {
            return "An Error Occurred Saving The User's scores";
        }

    }

    public String updateUserChoice(Long userId, User userDetails, String choice) {
        String oldValue = "";
        String newValue = "";
        int oldScore = 0;

        User resultUser = userRepo
                .findById(userId)
                .orElseThrow(() -> new IndexOutOfBoundsException("User not found with the id: "+ userId));

        if (resultUser != null) {

            resultUser.setId(userId);
            resultUser.setUpdate_on(LocalDateTime.now());
            resultUser.setRoles(resultUser.getRoles());
            resultUser.setRegistered_on(resultUser.getRegistered_on());
            resultUser.setLast_log(resultUser.getLast_log());
            resultUser.setName(resultUser.getName());
            resultUser.setSurname(resultUser.getSurname());
            resultUser.setUsername(resultUser.getUsername());
            resultUser.setEmail(resultUser.getEmail());
            resultUser.setPassword(encoder.encode(resultUser.getPassword()));
            resultUser.setScore(resultUser.getScore());

            switch (choice) {
                case "mame" -> {
                    oldValue = resultUser.getName();
                    newValue = userDetails.getName();
                    resultUser.setName(userDetails.getName());
                }
                case "surname" -> {
                    oldValue = resultUser.getSurname();
                    newValue = userDetails.getSurname();
                    resultUser.setSurname(userDetails.getSurname());
                }
                case "username" -> {
                    oldValue = resultUser.getUsername();
                    newValue = userDetails.getUsername();
                    resultUser.setUsername(userDetails.getUsername());
                }
                case "password" -> resultUser.setPassword(encoder.encode(userDetails.getPassword()));

                case "email" -> {
                    oldValue = resultUser.getEmail();
                    newValue = userDetails.getEmail();
                    resultUser.setEmail(userDetails.getEmail());
                }
                case "score" -> {
                    oldScore = resultUser.getScore();
                    resultUser.setScore(userDetails.getScore());
                }
                default -> {
                    return "some user's input data is wrong" + choice;
                }
            }

            userRepo.save(resultUser);

            if (choice.equals("score")) {
                return resultUser.getUsername() + "'s " + choice + " Changed From: " + oldScore + " To: " + userDetails.getScore() + " with Success";
            } else if(choice.equals("password")){
                return resultUser.getUsername() + "'s " + choice + " has been Changed";
            }
            return resultUser.getUsername() + "'s " + choice + " Changed From: " + oldValue + " To: " + newValue + " with Success";
        }
        return "some user's input data is wrong" + choice;
    }

    public User getUser(Long id) {
        return userRepo
                .findById(id)
                .orElseThrow(() -> new IndexOutOfBoundsException("User not found with the id: "+ id));
    }

    public Iterable<User> allUsers() {
        return userRepo.findAll();
    }

    public String updateUser(Long id, User user) {
        User resultUser = userRepo
                .findById(id)
                .orElseThrow(() -> new IndexOutOfBoundsException("User not found with the id: " + id));

        user.setId(id);
        user.setPassword(encoder.encode(user.getPassword()));
        user.setRoles(user.getRoles());
        user.setRegistered_on(user.getRegistered_on());
        user.setLast_log(user.getLast_log());
        user.setUpdate_on(LocalDateTime.now());

        if (resultUser != null) {
            userRepo.save(user);
            return "User Updated Correctly";
        } else {
            return "An Error Occurred Updating The User";
        }
    }

    public String deleteUser(Long id) {
        User resultUser = userRepo
                .findById(id)
                .orElseThrow(() -> new IndexOutOfBoundsException("User not found with the id: " + id));

        if (resultUser == null) {
            return "An Error Occurred Deleting The User, User Not Found";
        } else {
            userRepo.delete(resultUser);
            return "User Deleted Correctly";
        }
    }

    public List<User> findByEmailContains(String email) {
        return userRepo.findByEmailContains(email);
    }

    public List<User> findByUsernameContains(String username) {
        return userRepo.findByUsernameContains(username);
    }

}
