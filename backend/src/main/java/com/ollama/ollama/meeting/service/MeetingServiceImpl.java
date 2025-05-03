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
        System.out.println("User ID: " + userId);
        User creator = authService.findById(userId);
        Project project = projectRepository.findById(dto.getProjectId())
                .orElseThrow(() -> new EntityNotFoundException("Project not found"));
        System.out.println("Project retrieved: " + project.getName());
        if (!project.getUser().getId().equals(userId)) {
            throw new SecurityException("Unauthorized to create meeting in this project");
        }

        System.out.println("Creating meeting for project: " + project.getName());
        Set<User> attendees = dto.getAttendeeIds().stream()
            .map(authService::findById)
            .peek(user -> System.out.println("Attendee ID: " + user.getId()))  // Log each attendee
            .collect(Collectors.toSet());
        System.out.println("Total attendees: " + attendees.size());

        Meeting meeting = MeetingMapper.toEntity(dto, project, creator, attendees);
        meeting.setCreatedAt(LocalDateTime.now());
        System.out.println("Created meeting entity with title: " + meeting.getTitle());

        // AI logic placeholder: generate summary via AI service
        String regeneratedSummary = aiService.generateSummary(meeting.getRawNotesMd());
        System.out.println("Generated AI summary: " + regeneratedSummary);

        // Create or update the meeting summary
        MeetingSummary summary = new MeetingSummary();
        summary.setSummaryMd(regeneratedSummary);
        summary.setActionItemsJson(aiService.extractActionItems(regeneratedSummary));  // Extract action items (as String)
        summary.setRisksJson(aiService.extractRisks(regeneratedSummary));  // Extract risks (as String)

        // Save the summary and associate it with the meeting
        summary.setMeeting(meeting);
        meeting.setSummary(summary);
        System.out.println("Saving the meeting along with its summary.");

        // Save the meeting and return the DTO
        Meeting savedMeeting = meetingRepository.save(meeting);
        System.out.println("Meeting saved with ID: " + savedMeeting.getId());
        
        return MeetingMapper.toDTO(savedMeeting);
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
    public MeetingResponseDTO updateMeeting(Long meetingId, MeetingRequestDTO dto, Long userId) {
        // Fetch the meeting
        Meeting meeting = meetingRepository.findById(meetingId)
                .orElseThrow(() -> new EntityNotFoundException("Meeting not found"));

        // Check if the user is allowed to update this meeting
        if (!meeting.getCreator().getId().equals(userId)) {
            throw new SecurityException("Unauthorized to update this meeting");
        }

        // Update the meeting details
        meeting.setTitle(dto.getTitle());
        meeting.setRawNotesMd(dto.getRawNotesMd());
        meeting.setTags(dto.getTags());

        // Regenerate the summary using AI if the meeting text was updated
        String regeneratedSummary = aiService.generateSummary(dto.getRawNotesMd());

        // Update or create the meeting summary
        MeetingSummary summary = meeting.getSummary();
        if (summary == null) {
            summary = new MeetingSummary();
            summary.setMeeting(meeting);
        }

        summary.setSummaryMd(regeneratedSummary);
        summary.setActionItemsJson(aiService.extractActionItems(regeneratedSummary));  // Extract action items (as String)
        summary.setRisksJson(aiService.extractRisks(regeneratedSummary));  // Extract risks (as String)


        meetingSummaryRepository.save(summary);  // Save updated summary

        // Return the updated meeting with the new summary
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
