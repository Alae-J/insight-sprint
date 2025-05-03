package com.ollama.ollama.project.dto;

import lombok.Data;

@Data
public class ProjectResponseDTO {
    private Long id;
    private String tenantId;
    private String name;
    private String description;
}
