package com.githubrepoanalyzer.service;

import com.githubrepoanalyzer.dto.GitHubApiResponse;
import com.githubrepoanalyzer.dto.RepositoryAnalysisResponse;
import com.githubrepoanalyzer.entity.RepositoryEntity;
import com.githubrepoanalyzer.repository.RepositoryRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Service
@Slf4j
public class RepositoryService {

    private static final Pattern GITHUB_URL_PATTERN =
            Pattern.compile("^https?://github\\.com/([A-Za-z0-9._-]+)/([A-Za-z0-9._-]+)/?$");

    @Autowired
    private RepositoryRepository repositoryRepository;

    @Autowired
    private WebClient webClient;

    /**
     * Analyzes a GitHub repository by fetching data from GitHub API
     * and storing it in the database.
     */
    public RepositoryEntity analyzeRepository(String repoUrl) {
        log.info("Analyzing repository {}", repoUrl);

        // Validate URL
        if (repoUrl == null || repoUrl.trim().isEmpty()) {
            throw new IllegalArgumentException("Repository URL cannot be empty");
        }

        // Parse owner/repo from URL
        String[] ownerRepo = parseGitHubUrl(repoUrl);
        String owner = ownerRepo[0];
        String repo  = ownerRepo[1];

        // Return cached result if already analyzed
        Optional<RepositoryEntity> existing = repositoryRepository.findByRepoUrl(repoUrl);
        if (existing.isPresent()) {
            log.info("Repository already analysed – returning cached data for {}/{}", owner, repo);
            return existing.get();
        }

        // Call GitHub API
        GitHubApiResponse ghResponse = fetchFromGitHub(owner, repo);

        // Map to entity
        RepositoryEntity entity = mapToEntity(repoUrl, ghResponse);

        // Persist
        RepositoryEntity saved = repositoryRepository.save(entity);
        log.info("Repository saved with id={}", saved.getId());

        return saved;
    }

    /**
     * Parses a GitHub URL and returns {owner, repo}.
     */
    String[] parseGitHubUrl(String url) {
        Matcher m = GITHUB_URL_PATTERN.matcher(url.trim());
        if (!m.matches()) {
            throw new IllegalArgumentException(
                    "Invalid GitHub URL. Expected format: https://github.com/{owner}/{repo}");
        }
        return new String[]{ m.group(1), m.group(2) };
    }

    /**
     * Calls the GitHub REST API: GET /repos/{owner}/{repo}
     */
    private GitHubApiResponse fetchFromGitHub(String owner, String repo) {
        log.info("Calling GitHub API for {}/{}", owner, repo);

        return webClient.get()
                .uri("/repos/{owner}/{repo}", owner, repo)
                .retrieve()
                .onStatus(HttpStatusCode::is4xxClientError, resp -> {
                    if (resp.statusCode().value() == 404) {
                        return resp.createException().map(ex ->
                                new RuntimeException("Repository not found on GitHub: " + owner + "/" + repo));
                    }
                    return resp.createException().map(ex ->
                            new RuntimeException("GitHub API client error: " + resp.statusCode()));
                })
                .onStatus(HttpStatusCode::is5xxServerError, resp ->
                        resp.createException().map(ex ->
                                new RuntimeException("GitHub API server error: " + resp.statusCode())))
                .bodyToMono(GitHubApiResponse.class)
                .block();
    }

    /**
     * Maps the GitHub API response to a JPA entity.
     */
    private RepositoryEntity mapToEntity(String repoUrl, GitHubApiResponse gh) {
        LocalDateTime repoCreatedAt = null;
        if (gh.getCreatedAt() != null) {
            repoCreatedAt = LocalDateTime.parse(gh.getCreatedAt(), DateTimeFormatter.ISO_DATE_TIME);
        }

        return RepositoryEntity.builder()
                .repoUrl(repoUrl)
                .repoName(gh.getName())
                .owner(gh.getOwner() != null ? gh.getOwner().getLogin() : "unknown")
                .description(gh.getDescription())
                .stars(gh.getStargazersCount())
                .forks(gh.getForksCount())
                .language(gh.getLanguage())
                .repoCreatedAt(repoCreatedAt)
                .build();
    }

    /**
     * Converts an entity to a response DTO.
     */
    private RepositoryAnalysisResponse convertEntityToResponse(RepositoryEntity entity) {
        return RepositoryAnalysisResponse.builder()
                .id(entity.getId())
                .repoUrl(entity.getRepoUrl())
                .repoName(entity.getRepoName())
                .owner(entity.getOwner())
                .description(entity.getDescription())
                .stars(entity.getStars())
                .forks(entity.getForks())
                .language(entity.getLanguage())
                .repoCreatedAt(entity.getRepoCreatedAt())
                .analyzedAt(entity.getCreatedAt())
                .conclusion(generateConclusion(entity))
                .message("Repository analysis completed successfully")
                .build();
    }

    /**
     * Builds a human-readable conclusion string.
     */
    private String generateConclusion(RepositoryEntity e) {
        StringBuilder sb = new StringBuilder();
        sb.append(e.getRepoName()).append(" by ").append(e.getOwner());

        if (e.getLanguage() != null) {
            sb.append(" is a ").append(e.getLanguage()).append(" project");
        }

        sb.append(" with ").append(e.getStars()).append(" stars")
          .append(" and ").append(e.getForks()).append(" forks.");

        if (e.getStars() != null && e.getStars() > 10000) {
            sb.append(" This is a highly popular repository!");
        } else if (e.getStars() != null && e.getStars() > 1000) {
            sb.append(" This is a well-known repository.");
        }

        return sb.toString();
    }

    /**
     * Retrieves all stored repositories.
     */
    public List<RepositoryAnalysisResponse> getAllRepositories() {
        return repositoryRepository.findAll().stream()
                .map(this::convertEntityToResponse)
                .collect(Collectors.toList());
    }

    /**
     * Retrieves a previously analyzed repository by database ID.
     */
    public RepositoryAnalysisResponse getRepositoryById(Long id) {
        log.info("Fetching repository with id={}", id);

        return repositoryRepository.findById(id)
                .map(this::convertEntityToResponse)
                .orElseThrow(() -> {
                    log.warn("Repository not found with id={}", id);
                    return new RuntimeException("Repository not found with ID: " + id);
                });
    }
}
