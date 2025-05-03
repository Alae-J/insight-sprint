package com.ollama.ollama.auth.controller;

import com.ollama.ollama.auth.dto.AuthRequest;
import com.ollama.ollama.auth.dto.AuthResponse;
import com.ollama.ollama.auth.dto.RegisterRequest;
import com.ollama.ollama.auth.entity.User;
import com.ollama.ollama.auth.security.JwtService;
import com.ollama.ollama.auth.service.AuthService;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthService authService;

    // Handles user registration and returns a JWT token
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        String hashed = passwordEncoder.encode(request.getPassword());
        User user = User.builder()
                .email(request.getEmail())
                .password(hashed)
                .name(request.getName())
                .build();
        authService.register(user);

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String jwt = jwtService.generateToken(userDetails.getUsername());

        // Fetch saved user with ID (if authService.register doesn't return it)
        User savedUser = authService.findByEmail(request.getEmail());

        return ResponseEntity.ok(new AuthResponse(jwt, savedUser.getId()));
    }



    // Handles login and returns a JWT token
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody AuthRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String jwt = jwtService.generateToken(userDetails.getUsername());

        // fetch the actual User entity to get the ID
        User user = authService.findByEmail(request.getEmail());

        return ResponseEntity.ok(new AuthResponse(jwt, user.getId()));
    }
}
