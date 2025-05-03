package com.ollama.ollama.meeting.repository;

import com.ollama.ollama.meeting.entity.MeetingSummary;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MeetingSummaryRepository extends JpaRepository<MeetingSummary, Long> {
    
}
