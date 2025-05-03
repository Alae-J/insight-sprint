package com.ollama.ollama.meeting.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class MeetingSummaryResponseDTO {
    private Long id;
    private String summaryMd;
    private String actionItemsJson;
    private String risksJson;
    private String modelName;
    private LocalDateTime createdAt;
}
