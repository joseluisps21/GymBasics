package com.gymbasics.gymbasics.services;

import com.gymbasics.gymbasics.entities.Customer;
import com.gymbasics.gymbasics.entities.User;
import com.gymbasics.gymbasics.repository.UserRepository;
import org.springframework.aop.ClassFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


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
        // Obtener el usuario de la base de datos basado en el nombre de usuario
        Optional<User> userOptional = repository.findByUsername(username);

        // Verificar si el usuario existe y las credenciales coinciden
        if (userOptional.isPresent()) {
            User user = userOptional.get();

            // Verificar la contraseña
            if (user.getPassword().equals(password)) {
                return true;  // Credenciales válidas
            }
        }

        return false;  // Credenciales inválidas
    }

    public Optional<User> getUserByUsername(String username){
        Optional<User> user = repository.findByUsername(username);
        return user;
    }
}