package com.thenetvalue.sbTutorial1.controller;

import com.thenetvalue.sbTutorial1.model.User;
import com.thenetvalue.sbTutorial1.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin (origins = "http://localhost:4200")
@RequestMapping("/users")
public class UserController {
    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    //CRUD operations (Create Read Update Delete)
   
    /**
     * Utilizzata per la registrazione dei nuovi utenti
     * @param user
     * @return
     */
    @PostMapping("/")
    public ResponseEntity<User> addUser(@RequestBody User user) {
        User newUser = userService.addUser(user.getName(), user.getSurname(), user.getUsername(), user.getPassword());
        return new ResponseEntity<>(newUser, HttpStatus.OK);
    }

    /** Utilizzata per recuperare lo user da mostrare nel ranking
     * 
     * @param identificativo
     * @return
     */
    @GetMapping("/{id}")
    public User getUserById(@PathVariable("id") int identificativo) {
        return userService.getUser(identificativo);
    }

    /** Utilizzata per il controllo sulla login
     * 
     * @param username
     * @param password
     * @return
     */
    @GetMapping("/username/{username}/password/{password}")
    public User getUserByUsernameAndPassword(@PathVariable("username") String username, @PathVariable ("password") String password){
        return userService.getUserByUsernameAndPassword(username, password);
    }

    @GetMapping("/")
    public Iterable<User> allUsers() {
        return userService.allUsers();
    }

    //updateUser - PUT
    @PutMapping("/{id}")
    public String updateUser(@PathVariable("id") int id, @RequestBody User user) {
        return userService.updateUser(id, user);
    }

    //deleteUser - DELETE
    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable("id") int id) {
        return userService.deleteUser(id);
    }
}
