package com.gymbasics.gymbasics.services;

import com.gymbasics.gymbasics.DTOs.UserPasswordDTO;
import com.gymbasics.gymbasics.DTOs.UserUpdatedDTO;
import com.gymbasics.gymbasics.entities.Routine;
import com.gymbasics.gymbasics.entities.User;
import com.gymbasics.gymbasics.repository.UserRepository;
import org.springframework.aop.ClassFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class UserService implements IUserService {
    @Autowired
    private UserRepository repository;
    @Override
    public List<User> getAll() {
        return (List<User>) repository.findAll();
    }

    @Override
    public User getById(Long id) {
        return (User) repository.findById(id).get();
    }

    @Override
    public void remove(Long id){
        repository.deleteById(id);
    }

    @Override
    public void save(User user){
        repository.save(user);
    }

    public boolean usernameExists(String username){
        Optional<User> user = repository.findByUsername(username);
        return user.isPresent();
    }

    public void registerUser(User user){
        Optional<User> existingUser = repository.findByUsername(user.getUsername());
        if(existingUser.isPresent()){}
        repository.save(user);
    }

    public boolean authenticate(String username, String password) {
        Optional<User> userOptional = repository.findByUsername(username);

        if (userOptional.isPresent()) {
            User user = userOptional.get();

            if (user.getPassword().equals(password)) {
                return true;
            }
        }

        return false;
    }

    public Optional<User> getUserByUsername(String username){
        Optional<User> user = repository.findByUsername(username);
        return user;
    }

    public List<Routine> getUserRoutinesByUsername(String username) {
        Optional<User> userOptional = repository.findByUsername(username);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            return user.getRoutines();
        }
        return Collections.emptyList();
    }

    public User updateUserLevel(String username, String newLevel) {
        User user = repository.findUserByUsername(username);
        if (user != null) {
            user.setLevel(newLevel);
            return repository.save(user);
        }
        return null;
    }

    public User updateUserFocus(String username, String newFocus) {
        User user = repository.findUserByUsername(username);
        if (user != null) {
            user.setFocus(newFocus);
            return repository.save(user);
        }
        return null;
    }

    public void updatePassword(String username, UserPasswordDTO userDto, PasswordEncoder passwordEncoder) {
        User user = repository.findUserByUsername(username);

        if (user == null) {
            throw new RuntimeException("Usuario no encontrado");
        }

        // Verificar si la contraseña actual coincide utilizando el PasswordEncoder
        if (!passwordEncoder.matches(userDto.getCurrentPassword(), user.getPassword())) {
            throw new RuntimeException("Contraseña actual incorrecta");
        }

        user.setPassword(userDto.getNewPassword());
        repository.save(user);
    }

    public void updateUser(String username, UserUpdatedDTO userUpdateDTO) {
        User user = repository.findUserByUsername(username);

        if (user == null) {
            throw new RuntimeException("Usuario no encontrado");
        }

        user.setName(userUpdateDTO.getName());
        user.setEmail(userUpdateDTO.getEmail());
        user.setLevel(userUpdateDTO.getLevel());
        user.setFocus(userUpdateDTO.getFocus());
        user.setWeight(userUpdateDTO.getWeight());

        repository.save(user);
    }
}