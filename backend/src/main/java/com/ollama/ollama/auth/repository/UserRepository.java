package com.ollama.ollama.auth.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ollama.ollama.auth.entity.User;

import java.util.Optional;
import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    
    Optional<User> findByEmail(String email);

    List<User> findByTenantId(String tenantId);

    boolean existsByEmail(String email);
}
