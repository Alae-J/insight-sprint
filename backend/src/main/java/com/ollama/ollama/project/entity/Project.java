package com.ollama.ollama.project.entity;

import com.ollama.ollama.meeting.entity.Meeting;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ollama.ollama.auth.entity.User;
import com.ollama.ollama.idea.entity.Idea;
import com.ollama.ollama.task.entity.Task;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "projects")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String tenantId;

    @Column(nullable = false)
    private String name;

    private String description;

    // A project has many meetings
    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Meeting> meetings;

    // A project has many ideas
    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Idea> ideas;

    // Many projects can belong to one user
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // A project has many tasks
    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Task> tasks;
}
