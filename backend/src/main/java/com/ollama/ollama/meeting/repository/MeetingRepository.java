package com.ollama.ollama.meeting.repository;

import com.ollama.ollama.auth.entity.User;
import com.ollama.ollama.meeting.entity.Meeting;
import com.ollama.ollama.project.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MeetingRepository extends JpaRepository<Meeting, Long> {
    List<Meeting> findByCreator(User creator);
    List<Meeting> findByProject(Project project);
    List<Meeting> findByProjectId(Long projectId);
    List<Meeting> findByCreatorAndProject(User creator, Project project);
}
