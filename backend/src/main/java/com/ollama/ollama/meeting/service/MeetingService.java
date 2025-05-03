package com.ollama.ollama.meeting.service;

import com.ollama.ollama.meeting.dto.MeetingRequestDTO;
import com.ollama.ollama.meeting.dto.MeetingResponseDTO;

import java.util.List;

public interface MeetingService {
    MeetingResponseDTO createMeeting(MeetingRequestDTO dto, Long userId);
    List<MeetingResponseDTO> getMeetingsByCurrentUser(Long userId);
    public MeetingResponseDTO generateMeetingSummary(Long meetingId, Long userId);
    MeetingResponseDTO getMeetingById(Long id, Long userId);
    List<MeetingResponseDTO> getMeetingsByProjectId(Long projectId, Long userId);
    MeetingResponseDTO updateMeeting(Long id, MeetingRequestDTO dto, Long userId);
    void deleteMeeting(Long id, Long userId);
}
