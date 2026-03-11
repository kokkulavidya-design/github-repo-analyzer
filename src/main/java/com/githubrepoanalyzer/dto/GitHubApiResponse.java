package com.githubrepoanalyzer.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class GitHubApiResponse {

    @JsonProperty("name")
    private String name;

    @JsonProperty("full_name")
    private String fullName;

    @JsonProperty("description")
    private String description;

    @JsonProperty("html_url")
    private String htmlUrl;

    @JsonProperty("language")
    private String language;

    @JsonProperty("stargazers_count")
    private Integer stargazersCount;

    @JsonProperty("forks_count")
    private Integer forksCount;

    @JsonProperty("created_at")
    private String createdAt;

    @JsonProperty("updated_at")
    private String updatedAt;

    @JsonProperty("owner")
    private Owner owner;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Owner {

        @JsonProperty("login")
        private String login;
    }
}
