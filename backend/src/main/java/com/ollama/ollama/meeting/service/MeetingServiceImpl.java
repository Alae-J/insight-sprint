package com.ollama.ollama.meeting.service;

import com.ollama.ollama.ai.service.AIService;
import com.ollama.ollama.auth.entity.User;
import com.ollama.ollama.auth.service.AuthService;
import com.ollama.ollama.meeting.dto.MeetingRequestDTO;
import com.ollama.ollama.meeting.dto.MeetingResponseDTO;
import com.ollama.ollama.meeting.entity.Meeting;
import com.ollama.ollama.meeting.entity.MeetingSummary;
import com.ollama.ollama.meeting.mapper.MeetingMapper;
import com.ollama.ollama.meeting.repository.MeetingRepository;
import com.ollama.ollama.meeting.repository.MeetingSummaryRepository;
import com.ollama.ollama.project.entity.Project;
import com.ollama.ollama.project.repository.ProjectRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class MeetingServiceImpl implements MeetingService {

    private final MeetingRepository meetingRepository;
    private final ProjectRepository projectRepository;
    private final AIService aiService;
    private final AuthService authService;
    private final MeetingSummaryRepository meetingSummaryRepository;

    @Override
    public MeetingResponseDTO createMeeting(MeetingRequestDTO dto, Long userId) {
        User creator = authService.findById(userId);
        Project project = projectRepository.findById(dto.getProjectId())
                .orElseThrow(() -> new EntityNotFoundException("Project not found"));

        if (!project.getUser().getId().equals(userId)) {
            throw new SecurityException("Unauthorized to create meeting in this project");
        }

        Set<User> attendees = dto.getAttendeeIds().stream()
                .map(authService::findById)
                .collect(Collectors.toSet());

        Meeting meeting = MeetingMapper.toEntity(dto, project, creator, attendees);
        meeting.setCreatedAt(LocalDateTime.now());

        Meeting savedMeeting = meetingRepository.save(meeting);
        return MeetingMapper.toDTO(savedMeeting);
    }

    @Override
    public MeetingResponseDTO generateMeetingSummary(Long meetingId, Long userId) {
        Meeting meeting = meetingRepository.findById(meetingId)
                .orElseThrow(() -> new EntityNotFoundException("Meeting not found"));

        if (!meeting.getCreator().getId().equals(userId)) {
            throw new SecurityException("Unauthorized to generate summary for this meeting");
        }

        String regeneratedSummary = aiService.generateSummary(meeting.getRawNotesMd());

        MeetingSummary summary = meeting.getSummary();
        if (summary == null) {
            summary = new MeetingSummary();
            summary.setMeeting(meeting);
        }

        summary.setSummaryMd(regeneratedSummary);
        summary.setActionItemsJson(aiService.extractActionItems(regeneratedSummary));
        summary.setRisksJson(aiService.extractRisks(regeneratedSummary));

        meetingSummaryRepository.save(summary);

        return MeetingMapper.toDTO(meeting);
    }

    @Override
    public List<MeetingResponseDTO> getMeetingsByCurrentUser(Long userId) {
        User user = authService.findById(userId);
        return meetingRepository.findByCreator(user)
                .stream()
                .map(MeetingMapper::toDTO)
                .toList();
    }

    @Override
    public MeetingResponseDTO getMeetingById(Long id, Long userId) {
        Meeting meeting = meetingRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Meeting not found"));

        if (!meeting.getCreator().getId().equals(userId)) {
            throw new SecurityException("Unauthorized access to this meeting");
        }

        return MeetingMapper.toDTO(meeting);
    }

    @Override
    public List<MeetingResponseDTO> getMeetingsByProjectId(Long projectId, Long userId) {
        return meetingRepository.findByProjectId(projectId).stream()
                .filter(meeting -> meeting.getCreator().getId().equals(userId))
                .map(MeetingMapper::toDTO)
                .toList();
    }

    @Override
    public MeetingResponseDTO updateMeeting(Long meetingId, MeetingRequestDTO dto, Long userId) {
        Meeting meeting = meetingRepository.findById(meetingId)
                .orElseThrow(() -> new EntityNotFoundException("Meeting not found"));

        if (!meeting.getCreator().getId().equals(userId)) {
            throw new SecurityException("Unauthorized to update this meeting");
        }

        meeting.setTitle(dto.getTitle());
        meeting.setRawNotesMd(dto.getRawNotesMd());
        meeting.setTags(dto.getTags());

        return MeetingMapper.toDTO(meeting);
    }

    @Override
    public void deleteMeeting(Long id, Long userId) {
        Meeting meeting = meetingRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Meeting not found"));

        if (!meeting.getCreator().getId().equals(userId)) {
            throw new SecurityException("Unauthorized to delete this meeting");
        }

        meetingRepository.delete(meeting);
    }
}
