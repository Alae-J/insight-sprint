package com.ollama.ollama.task.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class TaskResponseDTO {
    private Long id;
    private String title;
    private String description;
    private LocalDate dueDate;
    private String status;
    private boolean aiGenerated;
    private Long projectId;
    private Long userId;
}
