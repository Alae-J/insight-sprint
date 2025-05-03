package com.ollama.ollama.idea.repository;

import com.ollama.ollama.idea.entity.Idea;
import com.ollama.ollama.auth.entity.User;
import com.ollama.ollama.project.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface IdeaRepository extends JpaRepository<Idea, Long> {
    List<Idea> findByAuthor(User author);
    List<Idea> findByProject(Project project);

    @Query("SELECT i FROM Idea i LEFT JOIN FETCH i.tags WHERE i.id = :ideaId")
    Optional<Idea> findByIdWithTags(@Param("ideaId") Long ideaId);
    
    @Query("SELECT i FROM Idea i LEFT JOIN FETCH i.tags WHERE i.author = :author")
    List<Idea> findWithTagsByAuthor(@Param("author") User author);
}
