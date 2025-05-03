package com.ollama.ollama.meeting.mapper;

import com.ollama.ollama.meeting.dto.MeetingSummaryResponseDTO;
import com.ollama.ollama.meeting.entity.MeetingSummary;

public class MeetingSummaryMapper {

    public static MeetingSummaryResponseDTO toDTO(MeetingSummary summary) {
        if (summary == null) {
            return null;
        }

        MeetingSummaryResponseDTO dto = new MeetingSummaryResponseDTO();
        dto.setId(summary.getId());
        dto.setSummaryMd(summary.getSummaryMd());
        dto.setActionItemsJson(summary.getActionItemsJson());
        dto.setRisksJson(summary.getRisksJson());

        return dto;
    }
}
