package com.ollama.ollama.project.service;

import com.ollama.ollama.auth.entity.User;
import com.ollama.ollama.auth.service.AuthService;
import com.ollama.ollama.project.dto.ProjectRequestDTO;
import com.ollama.ollama.project.dto.ProjectResponseDTO;
import com.ollama.ollama.project.entity.Project;
import com.ollama.ollama.project.mapper.ProjectMapper;
import com.ollama.ollama.project.repository.ProjectRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;
    private final AuthService authService;

    @Override
    public ProjectResponseDTO createProject(ProjectRequestDTO request, Long userId) {
        User user = authService.findById(userId);

        Project project = ProjectMapper.toEntity(request);
        project.setUser(user);

        return ProjectMapper.toDTO(projectRepository.save(project));
    }

    @Override
    public List<ProjectResponseDTO> getProjectsByTenant(String tenantId, Long userId) {
        User user = authService.findById(userId);

        return projectRepository.findByTenantId(tenantId).stream()
                .filter(project -> project.getUser().getId().equals(user.getId()))
                .map(ProjectMapper::toDTO)
                .toList();
    }

    @Override
    public ProjectResponseDTO getProjectById(Long id, Long userId) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Project not found"));

        if (!project.getUser().getId().equals(userId)) {
            throw new SecurityException("Unauthorized access to this project");
        }

        return ProjectMapper.toDTO(project);
    }

    @Override
    public List<ProjectResponseDTO> getAllUserProjects(Long userId) {
        return projectRepository.findByUserId(userId).stream().map(ProjectMapper::toDTO).toList();
    }

    @Override
    public ProjectResponseDTO updateProject(Long id, ProjectRequestDTO request, Long userId) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Project not found"));

        if (!project.getUser().getId().equals(userId)) {
            throw new SecurityException("Unauthorized to update this project");
        }

        project.setName(request.getName());
        project.setDescription(request.getDescription());
        project.setTenantId(request.getTenantId());

        return ProjectMapper.toDTO(projectRepository.save(project));
    }

    @Override
    public void deleteProject(Long id, Long userId) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Project not found"));

        if (!project.getUser().getId().equals(userId)) {
            throw new SecurityException("Unauthorized to delete this project");
        }

        projectRepository.delete(project);
    }
}
