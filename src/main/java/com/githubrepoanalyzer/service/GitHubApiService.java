package com.githubrepoanalyzer.service;

import com.githubrepoanalyzer.dto.GitHubApiResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
@Slf4j
public class GitHubApiService {

    @Autowired
    private WebClient webClient;

    /**
     * Calls the GitHub REST API to fetch repository metadata.
     * Endpoint: GET https://api.github.com/repos/{owner}/{repo}
     *
     * @param owner the repository owner
     * @param repo  the repository name
     * @return parsed GitHubApiResponse DTO
     */
    public GitHubApiResponse fetchRepositoryInfo(String owner, String repo) {
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
}
