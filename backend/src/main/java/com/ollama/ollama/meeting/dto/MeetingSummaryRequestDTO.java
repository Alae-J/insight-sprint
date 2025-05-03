package com.ollama.ollama.meeting.dto;

import lombok.Data;

@Data
public class MeetingSummaryRequestDTO {
    private String summaryMd; // This is the updated meeting text for which we need a new summary
}
