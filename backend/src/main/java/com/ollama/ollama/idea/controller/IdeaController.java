    package com.ollama.ollama.idea.controller;

    import com.ollama.ollama.auth.util.CurrentUser;
    import com.ollama.ollama.idea.dto.IdeaRequestDTO;
    import com.ollama.ollama.idea.dto.IdeaResponseDTO;
    import com.ollama.ollama.idea.service.IdeaService;
    import lombok.RequiredArgsConstructor;

    import org.springframework.http.HttpStatus;
    import org.springframework.http.ResponseEntity;
    import org.springframework.web.bind.annotation.*;

    import java.util.List;

    @RestController
    @RequestMapping("/api/ideas")
    @RequiredArgsConstructor
    public class IdeaController {

        private final IdeaService ideaService;
        private final CurrentUser currentUser;

        @PostMapping
        public ResponseEntity<IdeaResponseDTO> createIdea(@RequestBody IdeaRequestDTO dto) {
            Long userId = currentUser.getUserId();
            IdeaResponseDTO created = ideaService.createIdea(dto, userId);
            return new ResponseEntity<>(created, HttpStatus.CREATED);
        }

        @GetMapping
        public ResponseEntity<List<IdeaResponseDTO>> getIdeas() {
            Long userId = currentUser.getUserId();
            List<IdeaResponseDTO> ideas = ideaService.getAllIdeasForUser(userId);
            return new ResponseEntity<>(ideas, HttpStatus.OK);
        }

        @GetMapping("/{id}")
        public ResponseEntity<IdeaResponseDTO> getIdeaById(@PathVariable Long id) {
            Long userId = currentUser.getUserId();
            IdeaResponseDTO idea = ideaService.getIdeaById(id, userId);
            return new ResponseEntity<>(idea, HttpStatus.OK);
        }

        @PutMapping("/{id}")
        public ResponseEntity<IdeaResponseDTO> updateIdea(@PathVariable Long id, @RequestBody IdeaRequestDTO dto) {
            Long userId = currentUser.getUserId();
            IdeaResponseDTO updated = ideaService.updateIdea(id, dto, userId);
            return new ResponseEntity<>(updated, HttpStatus.OK);
        }

        @DeleteMapping("/{id}")
        public ResponseEntity<Void> deleteIdea(@PathVariable Long id) {
            Long userId = currentUser.getUserId();
            ideaService.deleteIdea(id, userId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }
