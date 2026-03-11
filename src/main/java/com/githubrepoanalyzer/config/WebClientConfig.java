package com.githubrepoanalyzer.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {

    @Value("${github.api.base-url:https://api.github.com}")
    private String githubApiBaseUrl;

    /**
     * Configures and provides a WebClient bean for making HTTP requests
     * to the GitHub API
     *
     * @return WebClient instance configured for GitHub API
     */
    @Bean
    public WebClient webClient() {
        return WebClient.builder()
                .baseUrl(githubApiBaseUrl)
                .defaultHeader("Accept", "application/vnd.github.v3+json")
                .defaultHeader("User-Agent", "GitHubRepoAnalyzer/1.0")
                .build();
    }
}
