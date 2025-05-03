package com.ollama.ollama.project.controller;

import com.ollama.ollama.auth.util.CurrentUser;
import com.ollama.ollama.project.dto.ProjectRequestDTO;
import com.ollama.ollama.project.dto.ProjectResponseDTO;
import com.ollama.ollama.project.service.ProjectService;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
public class ProjectController {

    @Autowired
    private CurrentUser currentUser;
    private final ProjectService projectService;

    @PostMapping
    public ResponseEntity<ProjectResponseDTO> createProject(@RequestBody ProjectRequestDTO request) {
        Long userId = currentUser.getUserId();
        return new ResponseEntity<>(projectService.createProject(request, userId), HttpStatus.CREATED);
    }

    @GetMapping("/tenant/{tenantId}")
    public ResponseEntity<List<ProjectResponseDTO>> getProjectsByTenant(@PathVariable String tenantId) {
        Long userId = currentUser.getUserId();
        System.out.println("🎯 Entered controller method");
        System.out.println("👤 User ID: " + currentUser.getUserId());
        return new ResponseEntity<>(projectService.getProjectsByTenant(tenantId, userId), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProjectResponseDTO> getProjectById(@PathVariable Long id) {
        Long userId = currentUser.getUserId();
        return new ResponseEntity<>(projectService.getProjectById(id, userId), HttpStatus.OK);
    }

    @GetMapping("/me")
    public ResponseEntity<List<ProjectResponseDTO>> getUserProjects() {
        Long userId = currentUser.getUserId();
        return ResponseEntity.ok(projectService.getAllUserProjects(userId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProjectResponseDTO> updateProject(@PathVariable Long id, @RequestBody ProjectRequestDTO request) {
        Long userId = currentUser.getUserId();
        return new ResponseEntity<>(projectService.updateProject(id, request, userId), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProject(@PathVariable Long id) {
        Long userId = currentUser.getUserId();
        projectService.deleteProject(id, userId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
