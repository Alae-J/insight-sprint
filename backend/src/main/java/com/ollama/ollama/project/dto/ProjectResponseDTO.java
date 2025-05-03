package com.ollama.ollama.project.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ProjectResponseDTO {
    private Long id;
    private String tenantId;
    private String name;
    private String description;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
