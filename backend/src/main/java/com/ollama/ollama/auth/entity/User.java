package com.ollama.ollama.auth.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ollama.ollama.idea.entity.Idea;
import com.ollama.ollama.meeting.entity.Meeting;
import com.ollama.ollama.monitoring.entity.MessageLog;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(name = "password_hash", nullable = false)
    private String password;

    @Column(nullable = false)
    private String name;

    @Column(name = "tenant_id")
    private String tenantId;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    // One user can create many ideas
    @OneToMany(mappedBy = "author")
    @JsonIgnore
    private List<Idea> ideas;

    // One user can own many logs
    @OneToMany(mappedBy = "owner")
    @JsonIgnore
    private List<MessageLog> messages;

    // One user can create many meetings
    @OneToMany(mappedBy = "creator")
    @JsonIgnore
    private List<Meeting> createdMeetings;

    // Many-to-Many: attendees in meetings
    @ManyToMany(mappedBy = "attendees")
    @JsonIgnore
    private Set<Meeting> attendingMeetings;
}
