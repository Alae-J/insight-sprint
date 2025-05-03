// IdeaService.java
package com.ollama.ollama.idea.service;

import com.ollama.ollama.idea.dto.IdeaRequestDTO;
import com.ollama.ollama.idea.dto.IdeaResponseDTO;

import java.util.List;

public interface IdeaService {
    IdeaResponseDTO createIdea(IdeaRequestDTO dto, Long userId);
    List<IdeaResponseDTO> getAllIdeasForUser(Long userId);
    IdeaResponseDTO getIdeaById(Long ideaId, Long userId);
    IdeaResponseDTO updateIdea(Long id, IdeaRequestDTO dto, Long userId);
    void deleteIdea(Long id, Long userId);
}
