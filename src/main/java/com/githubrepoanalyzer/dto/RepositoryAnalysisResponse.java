package com.githubrepoanalyzer.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RepositoryAnalysisResponse {

    @JsonProperty("id")
    private Long id;

    @JsonProperty("repoUrl")
    private String repoUrl;

    @JsonProperty("repoName")
    private String repoName;

    @JsonProperty("owner")
    private String owner;

    @JsonProperty("description")
    private String description;

    @JsonProperty("stars")
    private Integer stars;

    @JsonProperty("forks")
    private Integer forks;

    @JsonProperty("language")
    private String language;

    @JsonProperty("repoCreatedAt")
    private LocalDateTime repoCreatedAt;

    @JsonProperty("analyzedAt")
    private LocalDateTime analyzedAt;

    @JsonProperty("conclusion")
    private String conclusion;

    @JsonProperty("message")
    private String message;
}
