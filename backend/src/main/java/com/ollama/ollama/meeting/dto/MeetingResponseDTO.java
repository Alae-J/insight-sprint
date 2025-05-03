package com.ollama.ollama.meeting.dto;

import lombok.Data;
import java.time.LocalDateTime;
import java.util.Set;

@Data
public class MeetingResponseDTO {
    private Long id;
    private String title;
    private String rawNotesMd;
    private LocalDateTime createdAt;
    private Long projectId;
    private MeetingUserDTO creator;
    private Set<MeetingUserDTO> attendees;
    private MeetingSummaryResponseDTO summary;
}

