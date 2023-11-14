package com.ro.service;

import com.ro.model.User;
import com.ro.dao.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class JpaUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepo;

    @Autowired
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

    public int getIdByUsername(String username){
        User userFound = (User) findByUsernameContains(username);
        return Math.toIntExact(userFound.getId());
    }

    public String isEnabledByEmail(String email){
        User userFound = (User) findByEmailContains(email);
        if (!userFound.isEnabled()){
            return "Registrazione avvenuta con successo! \nAdesso vai alla tua mail e attiva il tuo account";
        }
        return "qualcosa e' andato storto come te";
    }

    public ResponseEntity<?> signIn(User userToCheck) {
        Map<String, Object> map = new LinkedHashMap<>();

        if (doesUsernameExists(userToCheck.getUsername())){
            User userResult = userRepo.findByUsername(userToCheck.getUsername()).get();
            String oraSeiLoggato = "Ora sei loggato!";
            if (encoder.matches(userToCheck.getPassword(), userResult.getPassword())){
                if(userResult.isEnabled()){
                    map.put("data", userResult);
                    map.put("message", oraSeiLoggato);
                    return new ResponseEntity<>(map, HttpStatus.ACCEPTED);
                }
                map.put("message", "vai alla tua mail per attivare il tuo account prima di accedere");
                return new ResponseEntity<>(map, HttpStatus.NOT_ACCEPTABLE);
            }
            map.put("message", "Oops! Password errata, ritenta!");
            return new ResponseEntity<>(map, HttpStatus.NOT_ACCEPTABLE);

        } else if (doesEmailExists(userToCheck.getUsername())) {

            User userResult = userRepo.findByEmail(userToCheck.getUsername()).get();
            if (encoder.matches(userToCheck.getPassword(), userResult.getPassword())){
                if(userResult.isEnabled()){
                    map.put("data", userResult);
                    return new ResponseEntity<>(map, HttpStatus.ACCEPTED);
                }
                map.put("message", "vai alla tua mail per attivare il tuo account prima di accedere");
                return new ResponseEntity<>(map, HttpStatus.NOT_ACCEPTABLE);
            }
            map.put("message", "Oops! Password errata, ritenta!");
            return new ResponseEntity<>(map, HttpStatus.NOT_ACCEPTABLE);

        }else{
            map.put("message", "Oops! Email o username errati, ritenta!");
            return new ResponseEntity<>(map, HttpStatus.NOT_ACCEPTABLE);
        }
    }

    public String signUp(User user) {
        if (!doesUsernameExists(user.getUsername()) && !doesEmailExists(user.getEmail())) {
            if (isValidEmail(user.getEmail())) {
                user.setPassword(encoder.encode(user.getPassword()));
                user.setRoles("USER");
                userRepo.save(user);
                return "Account creato correttamente";
            } else {
                return "Inserire una mail valida!";
            }
        } else if (doesEmailExists(user.getEmail()) && doesUsernameExists(user.getUsername())) {
            return "Email e Username gia utilizzati da un altro utente, ritenta!";
        } else if (doesUsernameExists(user.getUsername())) {
            return "Oops! Username gia utilizzato da un altro utente, ritenta!";
        } else if (doesEmailExists(user.getEmail())) {
            return "Oops! Email gia utilizzata, ritenta!";
        }
        return "Qualcosa é andato storto!";
    }

    private boolean isValidEmail(String email) {
        // Utilizza un'espressione regolare per controllare se l'email è valida
        // Ecco un esempio di espressione regolare per controllare un formato comune di email
        String emailRegex = "^[A-Za-z0-9+_.-]+@(.+)$";
        return email.matches(emailRegex);
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

    public String updateUserChoice(User userDetails, String choice) {
        String oldValue = "";
        String newValue = "";

        User resultUser = userRepo
                .findByEmail(userDetails.getEmail())
                .orElseThrow(() -> new IndexOutOfBoundsException("User not found with email: " + userDetails.getEmail()));

        if (resultUser != null) {

            resultUser.setId(resultUser.getId());
            resultUser.setRoles(resultUser.getRoles());
            resultUser.setName(resultUser.getName());
            resultUser.setSurname(resultUser.getSurname());
            resultUser.setUsername(resultUser.getUsername());
            resultUser.setEmail(resultUser.getEmail());
            resultUser.setPassword(encoder.encode(resultUser.getPassword()));

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
                default -> {
                    return "some user's input data is wrong" + choice;
                }
            }

            userRepo.save(resultUser);

            if(choice.equals("password")){
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

    public User getUserByUsername(String username) {
        return userRepo
                .findByUsername(username)
                .orElseThrow(() -> new IndexOutOfBoundsException("User not found with username: "+ username));
    }

    public User getUserByEmail(String email) {
        return userRepo
                .findByEmail(email)
                .orElseThrow(() -> new IndexOutOfBoundsException("User not found with email: "+ email));
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
/*
    public String recoverPassword(User user) {
        User resultUser = userRepo
                .findByEmail(user.getEmail())
                .orElseThrow(() -> new IndexOutOfBoundsException("User not found with the email: " + user.getEmail()));

        resultUser.setId(resultUser.getId());
        resultUser.setPassword(encoder.encode(user.getPassword()));
        resultUser.setRoles(resultUser.getRoles());
        resultUser.setEmail(resultUser.getEmail());

        if (resultUser != null) {
            userRepo.save(user);
            return "User Updated Correctly";
        } else {
            return "An Error Occurred Updating The User";
        }
    }*/
}
