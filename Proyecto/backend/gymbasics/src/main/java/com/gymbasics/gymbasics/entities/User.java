package com.gymbasics.gymbasics.entities;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

@Entity
@Table(name = "users")
@Getter @Setter
@ToString
@EqualsAndHashCode
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;
    private String name;
    @Column(unique = true)
    private String username;
    private String password;
    private String email;
    private String level;
    private String focus;
    @Column(nullable = true)
    private String plan;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Devolver una lista de roles, por ejemplo "ROLE_USER" y "ROLE_ADMIN"
        // Si tu clase tiene un atributo "role" que representa el rol del usuario, puedes hacer algo como esto:
        // return Collections.singletonList(new SimpleGrantedAuthority(this.role));
        return Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER"));
    }

    @Override
    public String getPassword() {
        // Devolver la contraseña del usuario
        return this.password;
    }

    @Override
    public String getUsername() {
        // Devolver el nombre de usuario del usuario
        return this.username;
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

