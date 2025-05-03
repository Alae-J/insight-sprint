package com.ollama.ollama.project.dto;

import lombok.Data;

@Data
public class ProjectRequestDTO {
    private String tenantId;
    private String name;
    private String description;
}
