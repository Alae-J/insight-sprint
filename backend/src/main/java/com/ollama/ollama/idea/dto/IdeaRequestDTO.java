package com.ollama.ollama.idea.dto;

import lombok.Data;

import java.util.Set;

@Data
public class IdeaRequestDTO {
    private String textMd;
    private Set<String> tags;
    private Long projectId;
}
