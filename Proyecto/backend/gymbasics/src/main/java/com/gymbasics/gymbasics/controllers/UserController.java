package com.gymbasics.gymbasics.controllers;

import com.gymbasics.gymbasics.entities.Customer;
import com.gymbasics.gymbasics.entities.User;
import com.gymbasics.gymbasics.entities.UserCredentials;
import com.gymbasics.gymbasics.entities.UserDTO;
import com.gymbasics.gymbasics.services.IUserService;
import com.gymbasics.gymbasics.services.SessionService;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.dao.DataIntegrityViolationException;

import java.util.List;
import java.util.Optional;

@RestController
public class UserController {

    @Autowired
    private IUserService service;
    @Autowired
    private SessionService sessionService;

    @GetMapping("/api/users")
    public List<User> getAll(){
        return service.getAll();
    }
    @GetMapping("/api/users/{id}")
    public User getById(@PathVariable String id){
        return service.getById(Long.parseLong(id));
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
    public ResponseEntity<UserDTO> loginUser(@RequestBody UserCredentials userCredentials) {
        String username = userCredentials.getUsername();
        String password = userCredentials.getPassword();

        // Verificar las credenciales del usuario
        if (service.authenticate(username, password)) {
            Optional<User> userOptional = service.getUserByUsername(username);

            // Verificar si el usuario existe en la base de datos
            User user = userOptional.orElse(null);

            if (user != null) {
                // Convertir el objeto User a UserDTO
                UserDTO userDTO = new UserDTO();
                userDTO.setId(user.getId());
                userDTO.setUsername(user.getUsername());
                userDTO.setEmail(user.getEmail());
                userDTO.setPlan(user.getPlan());
                userDTO.setFocus(user.getFocus());
                userDTO.setLevel(user.getLevel());
                userDTO.setName(user.getName());

                // Devolver el UserDTO en la respuesta
                return ResponseEntity.ok(userDTO);
            } else {
                // Usuario no encontrado
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
        } else {
            // Las credenciales son inválidas
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }




}
