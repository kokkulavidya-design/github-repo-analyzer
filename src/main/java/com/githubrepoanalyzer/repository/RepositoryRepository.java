package com.githubrepoanalyzer.repository;

import com.githubrepoanalyzer.entity.RepositoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RepositoryRepository extends JpaRepository<RepositoryEntity, Long> {

    /**
     * Find a repository by its GitHub URL
     * @param repoUrl the GitHub repository URL
     * @return Optional containing the repository if found
     */
    Optional<RepositoryEntity> findByRepoUrl(String repoUrl);

    /**
     * Find a repository by owner and repository name
     * @param owner the repository owner
     * @param repoName the repository name
     * @return Optional containing the repository if found
     */
    Optional<RepositoryEntity> findByOwnerAndRepoName(String owner, String repoName);
}
