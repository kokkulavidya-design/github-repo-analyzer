package com.githubrepoanalyzer.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "repositories")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RepositoryEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "repo_url", nullable = false, unique = true)
    private String repoUrl;

    @Column(name = "repo_name", nullable = false)
    private String repoName;

    @Column(name = "owner", nullable = false)
    private String owner;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "stars")
    private Integer stars;

    @Column(name = "forks")
    private Integer forks;

    @Column(name = "language")
    private String language;

    @Column(name = "repo_created_at")
    private LocalDateTime repoCreatedAt;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
