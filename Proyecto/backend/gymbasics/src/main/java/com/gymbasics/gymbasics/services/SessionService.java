package com.gymbasics.gymbasics.services;
import java.util.UUID;
import org.springframework.stereotype.Service;

@Service
public class SessionService {

    public String generateSessionToken() {
        String sessionToken = UUID.randomUUID().toString();
        return sessionToken;
    }
}

