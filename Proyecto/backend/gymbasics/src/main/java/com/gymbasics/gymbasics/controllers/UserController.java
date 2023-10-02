package com.gymbasics.gymbasics.controllers;

import com.gymbasics.gymbasics.DTOs.EditFocusRequest;
import com.gymbasics.gymbasics.DTOs.EditLevelRequest;
import com.gymbasics.gymbasics.DTOs.UserPasswordDTO;
import com.gymbasics.gymbasics.DTOs.UserUpdatedDTO;
import com.gymbasics.gymbasics.entities.*;
import com.gymbasics.gymbasics.services.CustomUserDetailsService;
import com.gymbasics.gymbasics.services.IUserService;
import com.gymbasics.gymbasics.services.SessionService;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.dao.DataIntegrityViolationException;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RestController
public class UserController {

    @Autowired
    private IUserService service;
    @Autowired
    private SessionService sessionService;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @GetMapping("/api/users")
    public List<User> getAll(){
        return service.getAll();
    }

    //@GetMapping("/api/users/{id}")
    //public User getById(@PathVariable String id){
    //    return service.getById(Long.parseLong(id));
    //}

    @GetMapping("/api/users/{username}")
    public Optional<User> getByUsername(@PathVariable String username){
        return service.getUserByUsername(username);
    }

    @DeleteMapping("/api/users/{id}")
    public void remove(@PathVariable String id){
        service.remove(Long.parseLong(id));
    }

    @PostMapping("api/users")
    public void save(@RequestBody User user){
        service.save(user);
    }

    @PostMapping("api/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        try {
            if (user == null) {
                return ResponseEntity.badRequest().body("No se puede guardar el usuario");
            }

            if (service.usernameExists(user.getUsername())) {
                return ResponseEntity.badRequest().body("El nombre de usuario ya existe, escoge otro");
            }

            service.save(user);
            return ResponseEntity.ok("Usuario creado de forma exitosa");
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.badRequest().body("El nombre de usuario ya está en uso");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al guardar el usuario");
        }
    }

    @PostMapping("/api/login")
    @CrossOrigin
    public ResponseEntity<UserDetails> loginUser(@RequestBody UserCredentials userCredentials) {
        String username = userCredentials.getUsername();
        String password = userCredentials.getPassword();

        // Verificar las credenciales del usuario utilizando el CustomUserDetailsService
        UserDetails userDetails;
        try {
            userDetails = customUserDetailsService.loadUserByUsername(username);
        } catch (UsernameNotFoundException e) {
            // Usuario no encontrado
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        if (passwordEncoder.matches(password, userDetails.getPassword())) {
                // Convertir el objeto User a UserDTO

                // Devolver el UserDTO en la respuesta
                return ResponseEntity.ok(userDetails);
            } else {
                // Usuario no encontrado
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
        }



    @GetMapping("api/{username}/routines")
    public ResponseEntity<List<Routine>> getUserRoutinesByUsername(@PathVariable String username) {
        List<Routine> routines = service.getUserRoutinesByUsername(username);
        return ResponseEntity.ok(routines);
    }

    @PatchMapping("api/editlevel")
    public User updateUserLevel(@RequestBody EditLevelRequest request) {
        return service.updateUserLevel(request.getUsername(), request.getLevel());
    }

    @PatchMapping("api/editfocus")
    public User updateUserFocus(@RequestBody EditFocusRequest request) {
        return service.updateUserFocus(request.getUsername(), request.getFocus());
    }

    @Autowired
    private PasswordEncoder passwordEncoder; // Inyecta el PasswordEncoder en el controlador

    @PatchMapping("api/{username}/updatePassword")
    public ResponseEntity<String> updatePassword(
            @PathVariable String username,
            @RequestBody UserPasswordDTO userDto
    ) {
        try {
            service.updatePassword(username, userDto, passwordEncoder); // Pasa el PasswordEncoder al servicio
            return ResponseEntity.ok("contraseña actualizada");
        } catch (Exception e) {
            // Manejar excepciones genéricas aquí
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Contraseña incorrecta");
        }
    }


        @PatchMapping("api/edit/{username}")
        public ResponseEntity<UserUpdatedDTO> updateUser(@PathVariable String username, @RequestBody UserUpdatedDTO userUpdateDTO) {
            try {
                service.updateUser(username, userUpdateDTO);
                return ResponseEntity.ok(userUpdateDTO);
            } catch (Exception e) {
                // Manejar excepciones aquí
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
            }
        }





}
