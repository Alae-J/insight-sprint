package com.ollama.ollama.task.service;

import com.ollama.ollama.task.dto.TaskRequestDTO;
import com.ollama.ollama.task.dto.TaskResponseDTO;

import java.util.List;

public interface TaskService {

    TaskResponseDTO createTask(TaskRequestDTO requestDto, Long userId);
    List<TaskResponseDTO> getAllTasksForUser(Long userId);
    TaskResponseDTO getTaskById(Long id, Long userId);
    TaskResponseDTO updateTask(Long taskId, TaskRequestDTO requestDto, Long userId);
    void deleteTask(Long taskId, Long userId);
}
