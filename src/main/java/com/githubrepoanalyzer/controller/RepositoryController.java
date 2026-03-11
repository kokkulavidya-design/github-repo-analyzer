package com.githubrepoanalyzer.controller;

import com.githubrepoanalyzer.dto.RepositoryAnalysisResponse;
import com.githubrepoanalyzer.entity.RepositoryEntity;
import com.githubrepoanalyzer.service.RepositoryService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
@Slf4j
@CrossOrigin(origins = "*", maxAge = 3600)
public class RepositoryController {

    @Autowired
    private RepositoryService repositoryService;

    /**
     * Analyzes a GitHub repository based on the provided URL.
     */
    @PostMapping("/analyze")
    public ResponseEntity<RepositoryEntity> analyzeRepository(@RequestBody Map<String, String> request) {
        String repoUrl = request.get("repoUrl");
        log.info("Analyzing repository {}", repoUrl);
        RepositoryEntity entity = repositoryService.analyzeRepository(repoUrl);
        return ResponseEntity.ok(entity);
    }

    /**
     * Returns all stored repositories.
     */
    @GetMapping("/repositories")
    public ResponseEntity<?> getAllRepositories() {
        log.info("Fetching all repositories");
        return ResponseEntity.ok(repositoryService.getAllRepositories());
    }

    /**
     * Retrieves a previously analyzed repository by its ID.
     */
    @GetMapping("/repositories/{id}")
    public ResponseEntity<RepositoryAnalysisResponse> getRepository(@PathVariable Long id) {
        log.info("Fetching repository id={}", id);

        try {
            return ResponseEntity.ok(repositoryService.getRepositoryById(id));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(RepositoryAnalysisResponse.builder()
                            .message(e.getMessage())
                            .build());
        }
    }

    /**
     * Health check endpoint.
     */
    @GetMapping("/health")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("Repository Analysis Service is running");
    }
}
