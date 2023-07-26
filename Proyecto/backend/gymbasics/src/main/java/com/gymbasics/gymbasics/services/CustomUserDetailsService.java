package com.gymbasics.gymbasics.services;

import com.gymbasics.gymbasics.entities.User;
import com.gymbasics.gymbasics.entities.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Collections;
import java.util.Optional;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserService userService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Obtener el usuario de la base de datos basado en el nombre de usuario
        Optional<User> userOptional = userService.getUserByUsername(username);

        if (!userOptional.isPresent()) {
            throw new UsernameNotFoundException("Usuario no encontrado: " + username);
        }

        User user = userOptional.get();

        // Crear y devolver una implementación de UserDetails basada en la entidad User
        return user;
    }
}




