package com.ollama.ollama.task.controller;

import com.ollama.ollama.auth.util.CurrentUser;
import com.ollama.ollama.task.dto.TaskRequestDTO;
import com.ollama.ollama.task.dto.TaskResponseDTO;
import com.ollama.ollama.task.service.TaskService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;
    private final CurrentUser currentUser;

    @PostMapping
    public ResponseEntity<TaskResponseDTO> createTask(@RequestBody TaskRequestDTO dto) {
        Long userId = currentUser.getUserId();
        TaskResponseDTO created = taskService.createTask(dto, userId);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<TaskResponseDTO>> getTasks() {
        Long userId = currentUser.getUserId();
        List<TaskResponseDTO> tasks = taskService.getAllTasksForUser(userId);
        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TaskResponseDTO> getTask(@PathVariable Long id) {
        Long userId = currentUser.getUserId();
        TaskResponseDTO task = taskService.getTaskById(id, userId); // Secure version
        return new ResponseEntity<>(task, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TaskResponseDTO> updateTask(@PathVariable Long id, @RequestBody TaskRequestDTO dto) {
        Long userId = currentUser.getUserId();
        TaskResponseDTO updated = taskService.updateTask(id, dto, userId);
        return new ResponseEntity<>(updated, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        Long userId = currentUser.getUserId();
        taskService.deleteTask(id, userId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
