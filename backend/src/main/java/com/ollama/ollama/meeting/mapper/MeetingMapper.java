package com.ollama.ollama.meeting.mapper;

import com.ollama.ollama.auth.entity.User;
import com.ollama.ollama.meeting.dto.MeetingRequestDTO;
import com.ollama.ollama.meeting.dto.MeetingResponseDTO;
import com.ollama.ollama.meeting.entity.Meeting;
import com.ollama.ollama.project.entity.Project;

import java.util.Set;
import java.util.stream.Collectors;

public class MeetingMapper {

    // Maps DTO → Entity
    public static Meeting toEntity(MeetingRequestDTO dto, Project project, User creator, Set<User> attendees) {
        return Meeting.builder()
                .title(dto.getTitle())
                .rawNotesMd(dto.getRawNotesMd())
                .project(project)
                .creator(creator)
                .attendees(attendees)
                .build();
    }

    // Maps Entity → DTO
    public static MeetingResponseDTO toDTO(Meeting meeting) {
        MeetingResponseDTO dto = new MeetingResponseDTO();
        dto.setId(meeting.getId());
        dto.setTitle(meeting.getTitle());
        dto.setRawNotesMd(meeting.getRawNotesMd());
        dto.setCreatedAt(meeting.getCreatedAt());
        dto.setProjectId(meeting.getProject().getId());
        dto.setCreatorId(meeting.getCreator().getId());

        // extract attendee IDs only
        dto.setAttendeeIds(
                meeting.getAttendees()
                    .stream()
                    .map(User::getId)
                    .collect(Collectors.toSet())
        );

        // include summary if present
        if (meeting.getSummary() != null) {
            dto.setSummary(MeetingSummaryMapper.toDTO(meeting.getSummary()));
        }

        return dto;
    }
}
