package com.ollama.ollama.project.repository;

import com.ollama.ollama.project.entity.Project;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;


public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findByTenantId(String tenantId);
    List<Project> findByUserId(Long userId);
}
