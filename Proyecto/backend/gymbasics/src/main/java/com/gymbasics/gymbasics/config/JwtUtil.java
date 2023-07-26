package com.gymbasics.gymbasics.config;

import com.gymbasics.gymbasics.entities.User;
import com.gymbasics.gymbasics.services.UserService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;

import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.function.Function;

@Component
public class JwtUtil {

    private static UserService userService;

    @Value("${jwt.expiration}")
    private Long expiration;

    @Value("${jwt.secret-key}")
    private static String secret;

    @Autowired
    public JwtUtil(UserService userService, @Value("${jwt.expiration}") Long expiration,
                   @Value("${jwt.secret-key}") String secret ) {
        this.userService = userService;
        this.expiration = expiration;
        this.secret = secret;
    }
    public static SecretKey getKey() {
        // Define una clave fija para la firma (de al menos 256 bits)
        String secretKeyString = secret;
        byte[] secretKeyBytes = secretKeyString.getBytes(StandardCharsets.UTF_8);
        return Keys.hmacShaKeyFor(secretKeyBytes);
    }


    public static String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public static Date extractExpirationDate(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public static <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private static Claims extractAllClaims(String token) {
        return Jwts.parserBuilder().setSigningKey(getKey()).build().parseClaimsJws(token).getBody();
    }

    private static Boolean isTokenExpired(String token) {
        final Date expirationDate = extractExpirationDate(token);
        return expirationDate.before(new Date());
    }

    public String generateToken(User userDetails) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, userDetails.getUsername());
    }

    private String createToken(Map<String, Object> claims, String subject) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(getKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public static Boolean validateToken(String token) {
        final String username = extractUsername(token);
        Optional<User> userOptional = userService.getUserByUsername(username);

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            return (username.equals(user.getUsername()) && !isTokenExpired(token));
        }

        return false;
    }

    public String extractTokenFromRequest(HttpServletRequest request) {
        // Extraer el token del encabezado "Authorization"
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            return authHeader.substring(7); // Eliminar el prefijo "Bearer " para obtener solo el token
        }
        return null;
    }


    public static UsernamePasswordAuthenticationToken getAuthentication(String token) {
        try {
            SecretKey secretKey = JwtUtil.getKey();
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(secretKey)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();

            String username = claims.getSubject();

            return new UsernamePasswordAuthenticationToken(username, null);
        } catch (JwtException e) {
            return null;
        }
    }
}



