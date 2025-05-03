package com.ollama.ollama.task.repository;

import com.ollama.ollama.task.entity.Task;
import com.ollama.ollama.auth.entity.User;
import com.ollama.ollama.project.entity.Project;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    
    // Get all tasks of a given user
    List<Task> findByUser(User user);

    // get tasks by project
    List<Task> findByProject(Project project);

    // filters later: by status, due date, etc.
}
