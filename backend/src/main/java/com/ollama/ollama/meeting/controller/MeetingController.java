package com.ollama.ollama.meeting.controller;

import com.ollama.ollama.auth.util.CurrentUser;
import com.ollama.ollama.meeting.dto.MeetingRequestDTO;
import com.ollama.ollama.meeting.dto.MeetingResponseDTO;
import com.ollama.ollama.meeting.service.MeetingService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/meetings")
@RequiredArgsConstructor
public class MeetingController {

    private final MeetingService meetingService;
    private final CurrentUser currentUser;

    @PostMapping
    public ResponseEntity<MeetingResponseDTO> createMeeting(@RequestBody MeetingRequestDTO dto) {
        Long userId = currentUser.getUserId();
        MeetingResponseDTO created = meetingService.createMeeting(dto, userId);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<MeetingResponseDTO>> getMeetings() {
        Long userId = currentUser.getUserId();
        List<MeetingResponseDTO> meetings = meetingService.getMeetingsByCurrentUser(userId);
        return new ResponseEntity<>(meetings, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MeetingResponseDTO> getMeetingById(@PathVariable Long id) {
        Long userId = currentUser.getUserId();
        MeetingResponseDTO meeting = meetingService.getMeetingById(id, userId);
        return new ResponseEntity<>(meeting, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<MeetingResponseDTO> updateMeeting(@PathVariable Long id, @RequestBody MeetingRequestDTO dto) {
        Long userId = currentUser.getUserId();
        
        // This single endpoint now handles both:
        // - updating the meeting text (rawNotesMd)
        // - regenerating the summary if the text is changed
        MeetingResponseDTO updated = meetingService.updateMeeting(id, dto, userId);
        
        return new ResponseEntity<>(updated, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMeeting(@PathVariable Long id) {
        Long userId = currentUser.getUserId();
        meetingService.deleteMeeting(id, userId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
