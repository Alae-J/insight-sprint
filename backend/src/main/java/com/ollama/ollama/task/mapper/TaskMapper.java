package com.ollama.ollama.task.mapper;

import com.ollama.ollama.task.dto.TaskRequestDTO;
import com.ollama.ollama.task.dto.TaskResponseDTO;
import com.ollama.ollama.task.entity.Task;

public class TaskMapper {

    public static Task toEntity(TaskRequestDTO dto) {
        Task task = new Task();
        task.setTitle(dto.getTitle());
        task.setDescription(dto.getDescription());
        task.setDueDate(dto.getDueDate());
        task.setStatus(dto.getStatus());
        task.setAiGenerated(dto.isAiGenerated());
        // set user and project manually in the service
        return task;
    }

    public static TaskResponseDTO toDTO(Task task) {
        TaskResponseDTO dto = new TaskResponseDTO();
        dto.setId(task.getId());
        dto.setTitle(task.getTitle());
        dto.setDescription(task.getDescription());
        dto.setDueDate(task.getDueDate());
        dto.setStatus(task.getStatus());
        dto.setAiGenerated(task.isAiGenerated());
        dto.setProjectId(task.getProject().getId());
        dto.setUserId(task.getUser().getId());
        return dto;
    }
}
