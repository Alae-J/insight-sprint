package com.ollama.ollama.project.service;

import com.ollama.ollama.project.dto.ProjectRequestDTO;
import com.ollama.ollama.project.dto.ProjectResponseDTO;

import java.util.List;

public interface ProjectService {
    ProjectResponseDTO createProject(ProjectRequestDTO request, Long userId);
    List<ProjectResponseDTO> getProjectsByTenant(String tenantId, Long userId);
    ProjectResponseDTO getProjectById(Long id, Long userId);
    List<ProjectResponseDTO> getAllUserProjects(Long userId);
    ProjectResponseDTO updateProject(Long id, ProjectRequestDTO request, Long userId);
    public void deleteProject(Long id, Long userId);
}
