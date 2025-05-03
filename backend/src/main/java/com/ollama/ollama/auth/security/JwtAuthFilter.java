// This is our custom filter that runs ONCE per request to handle JWT authentication
package com.ollama.ollama.auth.security;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.ollama.ollama.auth.service.AuthService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

// Tell Spring this class is a component (so it gets auto-detected)
@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    // Used to extract info and validate tokens
    @Autowired
    private JwtService jwtService;

    // Used to load user info from DB
    @Autowired
    private AuthService userAuthService;

    // This is the main method that gets triggered for every HTTP request
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        // Allow unauthenticated access to /auth routes
        String path = request.getServletPath();
        if (path.startsWith("/auth")) {
            filterChain.doFilter(request, response); // let it through
            return;
        }

        // Step 1: Get the Authorization header from the request
        String authorizationHeader = request.getHeader("Authorization");
        String username = null;
        String jwt = null;

        // Step 2: Check if header exists and starts with "Bearer "
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            jwt = authorizationHeader.substring(7); // Remove "Bearer " prefix

            // Step 3: Only extract username if the token is valid
            if (jwtService.isTokenValid(jwt)) {
                username = jwtService.getUsernameFromToken(jwt); // extract email
            }
        }

        // Step 4: If username is valid and no one is authenticated yet for this request
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            // Step 5: Load user details from DB using the username (email)
            UserDetails userDetails = userAuthService.loadUserByUsername(username);

            // Step 6: Create an Authentication object Spring Security can understand
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                userDetails, // principal (user info)
                null,        // credentials (we don’t need password here)
                userDetails.getAuthorities() // roles/permissions
            );

            // Step 7: Add request-specific info (IP address, etc.)
            authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

            // Step 8: Mark the user as authenticated for this request
            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            System.out.println("🔐 Authenticated user: " + userDetails.getUsername());
            System.out.println("🔐 Roles: " + userDetails.getAuthorities());


            System.out.println("✅ Extracted username from JWT: " + username);
            System.out.println("✅ Token is valid: " + jwtService.isTokenValid(jwt));
        }

        System.out.println("🔒 JWT filter triggered for path: " + request.getRequestURI());

        // Step 9: Continue with the next filter/controller
        filterChain.doFilter(request, response);
    }
}
