package com.ollama.ollama.idea.entity;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import com.ollama.ollama.auth.entity.User;
import com.ollama.ollama.project.entity.Project;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "ideas")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Idea {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "text_md", columnDefinition = "TEXT")
    private String textMd;

    @Builder.Default
    @ElementCollection
    @CollectionTable(name = "idea_tags", joinColumns = @JoinColumn(name = "idea_id"))
    @Column(name = "tag")
    private Set<String> tags = new HashSet<>();

    private LocalDateTime createdAt;

    // Idea belongs to a project
    @ManyToOne
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;

    // Idea has an author
    @ManyToOne
    @JoinColumn(name = "author_id", nullable = false)
    private User author;
}
