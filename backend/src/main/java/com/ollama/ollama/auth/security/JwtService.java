package com.ollama.ollama.auth.security;

import java.util.Date;
import java.util.Base64;
import java.security.Key;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.ollama.ollama.auth.entity.User;
import com.ollama.ollama.auth.repository.UserRepository;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private Long expiration;

    private final UserRepository userRepository;

    public JwtService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Helper method to decode the base64 secret key properly
    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(Base64.getDecoder().decode(secret));
    }

    // Generates a JWT for a given username (email)
    public String generateToken(String username) {
        User actualUser = userRepository.findByEmail(username)
            .orElseThrow(() -> new UsernameNotFoundException(username));

        return Jwts.builder()
                .setSubject(username) // subject = email
                .claim("userId", actualUser.getId()) // embed user ID into the payload
                .setIssuedAt(new Date()) // when the token was issued
                .setExpiration(new Date(System.currentTimeMillis() + expiration)) // token expiry
                .signWith(getSigningKey(), SignatureAlgorithm.HS512) // sign using the secret key
                .compact(); // build the token
    }

    // Extracts claims (payload data) from a given token
    public Claims getClaimsFromToken(String token) {
        return Jwts
                .parserBuilder()
                .setSigningKey(getSigningKey()) // use the proper decoded key
                .build()
                .parseClaimsJws(token)
                .getBody(); // returns the payload
    }

    // Checks if the token is still valid (not expired)
    public boolean isTokenValid(String token) {
        try {
            Claims claims = getClaimsFromToken(token);
            return !claims.getExpiration().before(new Date()); // return false if expired
        } catch (Exception e) {
            return false;
        }
    }

    // Gets the subject (username/email) from the token
    public String getUsernameFromToken(String token) {
        return getClaimsFromToken(token).getSubject();
    }

    // Gets the userId from the token
    public Long extractUserId(String token) {
        return getClaimsFromToken(token).get("userId", Long.class);
    }
}
