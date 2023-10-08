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
        Optional<User> userOptional = userService.getUserByUsername(username);

        if (!userOptional.isPresent()) {
            throw new UsernameNotFoundException("Usuario no encontrado: " + username);
        }

        User user = userOptional.get();

        return user;
    }
}




