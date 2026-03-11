package com.githubrepoanalyzer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.githubrepoanalyzer.repository")
public class GitHubRepoAnalyzerApplication {

    public static void main(String[] args) {
        SpringApplication.run(GitHubRepoAnalyzerApplication.class, args);
    }
}
