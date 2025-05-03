package com.ollama.ollama.meeting.mapper;

import com.ollama.ollama.auth.entity.User;
import com.ollama.ollama.meeting.dto.MeetingRequestDTO;
import com.ollama.ollama.meeting.dto.MeetingResponseDTO;
import com.ollama.ollama.meeting.dto.MeetingUserDTO;
import com.ollama.ollama.meeting.entity.Meeting;
import com.ollama.ollama.project.entity.Project;

import java.time.LocalDateTime;
import java.util.Set;
import java.util.stream.Collectors;

public class MeetingMapper {

    public static MeetingUserDTO toUserDTO(User user) {
        MeetingUserDTO dto = new MeetingUserDTO();
        dto.setId(user.getId());
        dto.setFullName(user.getName());
        return dto;
    }

    public static MeetingResponseDTO toDTO(Meeting meeting) {
        MeetingResponseDTO dto = new MeetingResponseDTO();
        dto.setId(meeting.getId());
        dto.setTitle(meeting.getTitle());
        dto.setRawNotesMd(meeting.getRawNotesMd());
        dto.setCreatedAt(meeting.getCreatedAt());
        dto.setProjectId(meeting.getProject().getId());
        dto.setCreator(toUserDTO(meeting.getCreator()));
        dto.setAttendees(
                meeting.getAttendees()
                    .stream()
                    .map(MeetingMapper::toUserDTO)
                    .collect(Collectors.toSet())
        );
        // Null-safe summary mapping
        if (meeting.getSummary() != null) {
            dto.setSummary(MeetingSummaryMapper.toDTO(meeting.getSummary()));
        } else {
            dto.setSummary(null);
        }
        return dto;
    }

    public static Meeting toEntity(MeetingRequestDTO dto, Project project, User creator, Set<User> attendees) {
        return Meeting.builder()
                .title(dto.getTitle())
                .rawNotesMd(dto.getRawNotesMd())
                .createdAt(LocalDateTime.now())
                .project(project)
                .creator(creator)
                .attendees(attendees)
                .tags(dto.getTags())
                .build();
    }
}
