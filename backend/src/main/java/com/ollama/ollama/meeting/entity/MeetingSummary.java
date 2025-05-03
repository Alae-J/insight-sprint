package com.ollama.ollama.meeting.entity;
import java.time.LocalDateTime;
import java.util.Objects;

import org.hibernate.annotations.Type;
import com.fasterxml.jackson.databind.JsonNode;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "meeting_summaries")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MeetingSummary {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String summaryMd;

    @Column(columnDefinition = "text") // Define as text for storage in the DB
    private String actionItemsJson;

    @Column(columnDefinition = "text") // Define as text for storage in the DB
    private String risksJson;

    private String modelName;
    private LocalDateTime createdAt;

    @OneToOne
    @JoinColumn(name = "meeting_id", unique = true, nullable = false)
    private Meeting meeting;

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
