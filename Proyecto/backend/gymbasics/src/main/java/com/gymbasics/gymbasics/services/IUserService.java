package com.gymbasics.gymbasics.services;

import com.gymbasics.gymbasics.entities.Customer;
import com.gymbasics.gymbasics.entities.Routine;
import com.gymbasics.gymbasics.entities.User;

import java.util.List;
import java.util.Optional;

public interface IUserService {

    public List<User> getAll();

    User getById(Long id);

    void remove(Long id);
    void save(User user);

    public boolean usernameExists(String username);

    public void registerUser(User user);

    public boolean authenticate(String username, String password);

    public Optional<User> getUserByUsername(String username);


    List<Routine> getUserRoutinesByUsername(String username);
}
