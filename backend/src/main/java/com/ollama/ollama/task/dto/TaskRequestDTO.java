package com.ollama.ollama.task.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class TaskRequestDTO {
    private String title;
    private String description;
    private LocalDate dueDate;
    private String status;
    private Long projectId;
    private boolean aiGenerated;
    private Long userId;
}
