package com.gymbasics.gymbasics.config;

import com.gymbasics.gymbasics.services.UserService;
import jakarta.servlet.*;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Optional;

@WebFilter(urlPatterns = "/api/*")
public class JwtTokenValidationFilter implements Filter {

    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserDetailsService userDetailsService;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        String requestURI = httpRequest.getRequestURI();

        // Verificar si la ruta es /api/register y si lo es, continuar con el siguiente filtro en la cadena
        if (requestURI.equals("/api/register")) {
            chain.doFilter(request, response);
            return;
        }
        String token = jwtUtil.extractTokenFromRequest((HttpServletRequest) request);
        if (token != null) {
            if (jwtUtil.validateToken(token)) {
                // Obtener el objeto User a partir del nombre de usuario en el token
                String username = jwtUtil.extractUsername(token);
                UserDetails userDetails;
                try {
                    userDetails = userDetailsService.loadUserByUsername(username);
                } catch (UsernameNotFoundException e) {
                    // Si el usuario no es encontrado, enviar respuesta de error
                    ((HttpServletResponse) response).sendError(HttpServletResponse.SC_UNAUTHORIZED, "Usuario no encontrado");
                    return;
                }
                Authentication authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(authentication);
            } else {
                // Si el token no es válido, se envía una respuesta de error
                ((HttpServletResponse) response).sendError(HttpServletResponse.SC_UNAUTHORIZED, "Token inválido");
                return;
            }
        } else {
            // Si el token no está presente, se envía una respuesta de error
            ((HttpServletResponse) response).sendError(HttpServletResponse.SC_UNAUTHORIZED, "Token no presente");
            return;
        }

        chain.doFilter(request, response);
    }

}







