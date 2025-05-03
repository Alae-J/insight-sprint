package com.ollama.ollama.auth.util;

import com.ollama.ollama.auth.security.JwtService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CurrentUser {

    private final JwtService jwtService;
    private final HttpServletRequest request;

    // Extracts userId from Bearer token in Authorization header
    public Long getUserId() {
        String authHeader = request.getHeader("Authorization");
        System.out.println("📥 Authorization header: " + authHeader);

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new IllegalStateException("Missing or invalid Authorization header");
        }

        String token = authHeader.substring(7); // Strip "Bearer "
        
        if (!jwtService.isTokenValid(token)) {
            throw new IllegalStateException("Token is expired or invalid");
        }

        return jwtService.extractUserId(token);
    }
}
