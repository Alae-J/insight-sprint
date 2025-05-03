package com.ollama.ollama.project.mapper;

import com.ollama.ollama.project.dto.ProjectRequestDTO;
import com.ollama.ollama.project.dto.ProjectResponseDTO;
import com.ollama.ollama.project.entity.Project;

public class ProjectMapper {

    public static Project toEntity(ProjectRequestDTO dto) {
        return Project.builder()
                .tenantId(dto.getTenantId())
                .name(dto.getName())
                .description(dto.getDescription())
                .build();
    }

    public static ProjectResponseDTO toDTO(Project project) {
        ProjectResponseDTO dto = new ProjectResponseDTO();
        dto.setId(project.getId());
        dto.setTenantId(project.getTenantId());
        dto.setName(project.getName());
        dto.setDescription(project.getDescription());
        dto.setCreatedAt(project.getCreatedAt());
        dto.setUpdatedAt(project.getUpdatedAt());
        return dto;
    }
    
}
