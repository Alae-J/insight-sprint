package com.ollama.ollama.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

// DTO returned after authentication, containing the JWT token
@Data
@AllArgsConstructor
public class AuthResponse {
    private String token;
}
