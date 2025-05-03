package com.ollama.ollama.meeting.dto;

import lombok.Data;
import java.util.Set;

@Data
public class MeetingRequestDTO {
    private String title;
    private String rawNotesMd;
    private Long projectId;
    private Set<Long> attendeeIds;
    private Set<String> tags;
}
