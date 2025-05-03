package com.ollama.ollama.meeting.mapper;

import com.ollama.ollama.meeting.dto.MeetingSummaryResponseDTO;
import com.ollama.ollama.meeting.entity.MeetingSummary;

public class MeetingSummaryMapper {

    public static MeetingSummaryResponseDTO toDTO(MeetingSummary meetingSummary) {
        MeetingSummaryResponseDTO dto = new MeetingSummaryResponseDTO();
        dto.setId(meetingSummary.getId());
        dto.setSummaryMd(meetingSummary.getSummaryMd());
    
        // Set these as strings, no need to convert to JsonNode
        dto.setActionItemsJson(meetingSummary.getActionItemsJson());
        dto.setRisksJson(meetingSummary.getRisksJson());
    
        dto.setModelName(meetingSummary.getModelName());
        dto.setCreatedAt(meetingSummary.getCreatedAt());
        return dto;
    }
    
}

