package com.ollama.ollama.meeting.entity;

import com.ollama.ollama.auth.entity.User;
import com.ollama.ollama.project.entity.Project;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Table(name = "meetings")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Meeting {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(name = "raw_notes_md", columnDefinition = "TEXT")
    private String rawNotesMd;

    private LocalDateTime createdAt;

    // Many meetings belong to one project
    @ManyToOne
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;

    // The user who created the meeting
    @ManyToOne
    @JoinColumn(name = "created_by", nullable = false)
    private User creator;

    // attendees of the meeting (many-to-many)
    @ManyToMany
    @JoinTable(
        name = "meeting_attendees",
        joinColumns = @JoinColumn(name = "meeting_id"),
        inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private Set<User> attendees;

    // One meeting has one summary
    @OneToOne(mappedBy = "meeting", cascade = CascadeType.ALL, orphanRemoval = true)
    private MeetingSummary summary;

    // Add a Set<String> for tags
    @ElementCollection
    @CollectionTable(name = "meeting_tags", joinColumns = @JoinColumn(name = "meeting_id"))
    @Column(name = "tag")
    private Set<String> tags;
}
