package com.ollama.ollama.project.controller;

import com.ollama.ollama.auth.util.CurrentUser;
import com.ollama.ollama.meeting.dto.MeetingResponseDTO;
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
        ProjectResponseDTO project = projectService.createProject(request, userId);
        return new ResponseEntity<>(project, HttpStatus.CREATED);
    }

    @GetMapping("/me")
    public ResponseEntity<List<ProjectResponseDTO>> getUserProjects() {
        Long userId = currentUser.getUserId();
        List<ProjectResponseDTO> projects = projectService.getAllUserProjects(userId);
        return ResponseEntity.ok(projects);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProjectResponseDTO> getProjectById(@PathVariable Long id) {
        Long userId = currentUser.getUserId();
        ProjectResponseDTO project = projectService.getProjectById(id, userId);
        return new ResponseEntity<>(project, HttpStatus.OK);
    }

    @GetMapping("/{id}/meetings")
    public ResponseEntity<List<MeetingResponseDTO>> getMeetingsForProject(@PathVariable Long id) {
        Long userId = currentUser.getUserId();
        List<MeetingResponseDTO> meetings = projectService.getMeetingsByProjectId(id, userId);
        return new ResponseEntity<>(meetings, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProjectResponseDTO> updateProject(@PathVariable Long id, @RequestBody ProjectRequestDTO request) {
        Long userId = currentUser.getUserId();
        ProjectResponseDTO updatedProject = projectService.updateProject(id, request, userId);
        return new ResponseEntity<>(updatedProject, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProject(@PathVariable Long id) {
        Long userId = currentUser.getUserId();
        projectService.deleteProject(id, userId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
