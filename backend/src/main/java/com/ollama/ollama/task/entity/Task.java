package com.ollama.ollama.task.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ollama.ollama.project.entity.Project;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "tasks")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String status;

    private LocalDate dueDate;

    private Boolean createdFromAi;

    private LocalDateTime createdAt;

    // Each task must belong to one project
    @ManyToOne
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;
}
