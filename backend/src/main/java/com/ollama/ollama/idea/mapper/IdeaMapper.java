package com.ollama.ollama.idea.mapper;

import com.ollama.ollama.idea.dto.IdeaRequestDTO;
import com.ollama.ollama.idea.dto.IdeaResponseDTO;
import com.ollama.ollama.idea.entity.Idea;

public class IdeaMapper {

    public static Idea toEntity(IdeaRequestDTO dto) {
        return Idea.builder()
                .textMd(dto.getTextMd())
                .tags(dto.getTags())
                .build();
    }

    public static IdeaResponseDTO toDTO(Idea idea) {
        IdeaResponseDTO dto = new IdeaResponseDTO();
        dto.setId(idea.getId());
        dto.setTextMd(idea.getTextMd());
        dto.setTags(idea.getTags());
        dto.setCreatedAt(idea.getCreatedAt());
        dto.setProjectId(idea.getProject().getId());
        dto.setAuthorId(idea.getAuthor().getId());
        return dto;
    }
}
