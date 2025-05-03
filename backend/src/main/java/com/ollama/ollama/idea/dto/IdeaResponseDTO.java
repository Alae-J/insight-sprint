package com.ollama.ollama.idea.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.Set;

@Data
public class IdeaResponseDTO {
    private Long id;
    private String textMd;
    private Set<String> tags;
    private LocalDateTime createdAt;
    private Long projectId;
    private Long authorId;
}
