package com.gymbasics.gymbasics.entities;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import java.util.Collection;
import java.util.Collections;

public class UserPrincipal implements UserDetails {

    private final User user;

    public UserPrincipal(User user) {
        this.user = user;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // En este caso, no hay roles definidos en la clase User,
        // así que simplemente devolvemos una lista vacía.
        return Collections.emptyList();
    }

    @Override
    public String getPassword() {
        // Devolver la contraseña del usuario
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        // Devolver el nombre de usuario del usuario
        return user.getUsername();
    }

    // Resto de los métodos de UserDetails

    @Override
    public boolean isAccountNonExpired() {
        // Implementa este método para verificar si la cuenta del usuario no ha expirado
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        // Implementa este método para verificar si la cuenta del usuario no está bloqueada
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        // Implementa este método para verificar si las credenciales del usuario no han expirado
        return true;
    }

    @Override
    public boolean isEnabled() {
        // Implementa este método para verificar si el usuario está habilitado
        return true;
    }
}


