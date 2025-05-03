package com.ollama.ollama.idea.service;

import com.ollama.ollama.auth.entity.User;
import com.ollama.ollama.auth.service.AuthService;
import com.ollama.ollama.idea.dto.IdeaRequestDTO;
import com.ollama.ollama.idea.dto.IdeaResponseDTO;
import com.ollama.ollama.idea.entity.Idea;
import com.ollama.ollama.idea.mapper.IdeaMapper;
import com.ollama.ollama.idea.repository.IdeaRepository;
import com.ollama.ollama.project.entity.Project;
import com.ollama.ollama.project.repository.ProjectRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class IdeaServiceImpl implements IdeaService {

    private final IdeaRepository ideaRepository;
    private final ProjectRepository projectRepository;
    private final AuthService authService;

    @Override
    public IdeaResponseDTO createIdea(IdeaRequestDTO dto, Long userId) {
        User user = authService.findById(userId);
        Project project = projectRepository.findById(dto.getProjectId())
                .orElseThrow(() -> new EntityNotFoundException("Project not found"));

        // Check if user owns the project
        if (!project.getUser().getId().equals(userId)) {
            throw new SecurityException("Unauthorized to add idea to this project");
        }

        Idea idea = IdeaMapper.toEntity(dto);
        idea.setAuthor(user);
        idea.setProject(project);
        idea.setCreatedAt(LocalDateTime.now());

        return IdeaMapper.toDTO(ideaRepository.save(idea));
    }

    @Override
    public List<IdeaResponseDTO> getAllIdeasForUser(Long userId) {
        User user = authService.findById(userId);
        return ideaRepository.findWithTagsByAuthor(user)
                .stream()
                .map(IdeaMapper::toDTO)
                .toList();
    }

    @Override
    public IdeaResponseDTO getIdeaById(Long ideaId, Long userId) {
        Idea idea = ideaRepository.findByIdWithTags(ideaId)
                .orElseThrow(() -> new EntityNotFoundException("Idea not found"));

        if (!idea.getAuthor().getId().equals(userId)) {
            throw new SecurityException("Unauthorized to view this idea");
        }

        return IdeaMapper.toDTO(idea);
    }

    @Override
    public IdeaResponseDTO updateIdea(Long ideaId, IdeaRequestDTO dto, Long userId) {
        Idea idea = ideaRepository.findByIdWithTags(ideaId)
                .orElseThrow(() -> new EntityNotFoundException("Idea not found"));

        if (!idea.getAuthor().getId().equals(userId)) {
            throw new SecurityException("Unauthorized to update this idea");
        }

        idea.setTextMd(dto.getTextMd());
        idea.setTags(dto.getTags());

        return IdeaMapper.toDTO(ideaRepository.save(idea));
    }

    @Override
    public void deleteIdea(Long ideaId, Long userId) {
        Idea idea = ideaRepository.findByIdWithTags(ideaId)
                .orElseThrow(() -> new EntityNotFoundException("Idea not found"));

        if (!idea.getAuthor().getId().equals(userId)) {
            throw new SecurityException("Unauthorized to delete this idea");
        }

        ideaRepository.delete(idea);
    }
}
