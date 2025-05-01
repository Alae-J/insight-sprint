package com.ollama.ollama.auth.security;

import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.ollama.ollama.auth.entity.User;
import com.ollama.ollama.auth.repository.UserRepository;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.util.Base64;

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

    // Generates a JWT for a given username (email)
    public String generateToken(String username) {
        User actualUser = userRepository.findByEmail(username)
            .orElseThrow(() -> new UsernameNotFoundException(username));

        return Jwts.builder()
                .setSubject(username)
                .claim("id", actualUser.getId())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(SignatureAlgorithm.HS512, secret)
                .compact();
    }

    // Extracts claims (payload data) from a given token
    public Claims getClaimsFromToken(String token) {
        Key key = Keys.hmacShaKeyFor(Base64.getDecoder().decode(secret));
        return Jwts
                .parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    // Checks if the token is still valid (not expired)
    public boolean isTokenValid(String token) {
        try {
            Claims claims = getClaimsFromToken(token);
            return !claims.getExpiration().before(new Date());
        } catch (Exception e) {
            return false;
        }
    }

    // Gets the subject (username/email) from the token
    public String getUsernameFromToken(String token) {
        return getClaimsFromToken(token).getSubject();
    }
}
