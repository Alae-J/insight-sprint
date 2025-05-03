package com.ollama.ollama.task.service;

import com.ollama.ollama.auth.entity.User;
import com.ollama.ollama.auth.service.AuthService;
import com.ollama.ollama.project.entity.Project;
import com.ollama.ollama.project.repository.ProjectRepository;
import com.ollama.ollama.task.dto.TaskRequestDTO;
import com.ollama.ollama.task.dto.TaskResponseDTO;
import com.ollama.ollama.task.entity.Task;
import com.ollama.ollama.task.mapper.TaskMapper;
import com.ollama.ollama.task.repository.TaskRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;
    private final ProjectRepository projectRepository;
    private final AuthService authService;

    @Override
    public TaskResponseDTO createTask(TaskRequestDTO requestDto, Long userId) {
        User user = authService.findById(userId);
        Project project = projectRepository.findById(requestDto.getProjectId())
                .orElseThrow(() -> new EntityNotFoundException("Project not found"));

        Task task = TaskMapper.toEntity(requestDto);
        task.setUser(user);
        task.setProject(project);

        return TaskMapper.toDTO(taskRepository.save(task));
    }

    @Override
    public List<TaskResponseDTO> getAllTasksForUser(Long userId) {
        User user = authService.findById(userId);
        return taskRepository.findByUser(user)
                .stream()
                .map(TaskMapper::toDTO)
                .toList();
    }

    @Override
    public TaskResponseDTO getTaskById(Long id, Long userId) {
        Task task = taskRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Task not found"));
    
        if (!task.getUser().getId().equals(userId)) {
            throw new SecurityException("Access denied.");
        }
    
        return TaskMapper.toDTO(task);
    }
    

    @Override
    public TaskResponseDTO updateTask(Long taskId, TaskRequestDTO requestDto, Long userId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new EntityNotFoundException("Task not found"));

        if (!task.getUser().getId().equals(userId)) {
            throw new SecurityException("Unauthorized to update this task");
        }

        task.setTitle(requestDto.getTitle());
        task.setDescription(requestDto.getDescription());
        task.setDueDate(requestDto.getDueDate());
        task.setStatus(requestDto.getStatus());
        task.setAiGenerated(requestDto.isAiGenerated());

        return TaskMapper.toDTO(taskRepository.save(task));
    }

    @Override
    public void deleteTask(Long taskId, Long userId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new EntityNotFoundException("Task not found"));

        if (!task.getUser().getId().equals(userId)) {
            throw new SecurityException("Unauthorized to delete this task");
        }

        taskRepository.delete(task);
    }
}

