# GitHub Repository Analyzer - Backend

A Spring Boot backend service for analyzing GitHub repositories. Users provide a GitHub repository URL, and the backend fetches repository data from the GitHub API, returning structured insights such as repository details, stars, forks, technologies used, and a summary conclusion.

## Project Structure

```
com.githubrepoanalyzer
│
├── controller/          # REST API controllers
│   └── RepositoryController.java
│
├── service/            # Business logic layer
│   └── RepositoryService.java
│
├── repository/         # Data access layer (Spring Data JPA)
│   └── RepositoryRepository.java
│
├── entity/             # JPA entities
│   └── RepositoryEntity.java
│
├── dto/                # Data Transfer Objects
│   ├── RepositoryAnalysisRequest.java
│   └── RepositoryAnalysisResponse.java
│
├── config/             # Configuration classes
│
└── GitHubRepoAnalyzerApplication.java  # Main Spring Boot application
```

## Tech Stack

- **Java 25**
- **Spring Boot 3.1.5**
- **Spring Data JPA**
- **MySQL Database** (Aiven Cloud)
- **Maven**
- **Lombok** (for reducing boilerplate)
- **WebFlux** (for async HTTP calls to GitHub API)

## Prerequisites

- Java 25 or higher
- Maven 3.8.1 or higher
- MySQL database running (local or Aiven cloud)

## Setup Instructions

### 1. Clone and Build

```bash
cd githubrepositary_analyzer
mvn clean install
```

### 2. Configure Database

Update `src/main/resources/application.properties` with your MySQL credentials:

```properties
spring.datasource.url=jdbc:mysql://your-host:3306/github_repo_analyzer
spring.datasource.username=your_username
spring.datasource.password=your_password
```

### 3. Create Database

```bash
CREATE DATABASE github_repo_analyzer;
```

The tables will be created automatically by Hibernate (ddl-auto=update).

### 4. Run the Application

```bash
mvn spring-boot:run
```

Or build and run:

```bash
mvn clean package
java -jar target/github-repo-analyzer-1.0.0.jar
```

The application will start on `http://localhost:8080`

## API Endpoints

### 1. Analyze Repository

**POST** `/api/repository/analyze`

Request:
```json
{
  "repoUrl": "https://github.com/user/project"
}
```

Response:
```json
{
  "id": 1,
  "repoUrl": "https://github.com/user/project",
  "repoName": "project",
  "owner": "user",
  "description": "Project description",
  "stars": 150,
  "forks": 45,
  "language": "Java",
  "createdAt": "2024-01-15T10:30:00",
  "conclusion": "Repository: project by user | Stars: 150 | Forks: 45 | Language: Java",
  "message": "Repository analysis completed successfully"
}
```

### 2. Get Repository by ID

**GET** `/api/repository/{id}`

Response: Same as above

### 3. Health Check

**GET** `/api/repository/health`

Response:
```
Repository Analysis Service is running
```

## Entity Fields

### RepositoryEntity

- **id** (Long) - Primary key
- **repoUrl** (String) - GitHub repository URL (unique)
- **repoName** (String) - Repository name
- **owner** (String) - Repository owner
- **description** (String) - Repository description
- **stars** (Integer) - Number of stars
- **forks** (Integer) - Number of forks
- **language** (String) - Primary programming language
- **createdAt** (LocalDateTime) - Entity creation timestamp (auto-generated)
- **updatedAt** (LocalDateTime) - Entity update timestamp (auto-generated)

## Key Features

✅ Clean Spring Boot architecture with layered structure  
✅ JPA entity with automatic timestamp management  
✅ Spring Data JPA repository with custom query methods  
✅ Service layer with business logic and error handling  
✅ RESTful controller with proper HTTP responses  
✅ Lombok annotations to reduce boilerplate  
✅ Comprehensive logging using SLF4J  
✅ CORS enabled for frontend integration  
✅ Database configuration for MySQL (Aiven compatible)

## Future Enhancements

- [ ] Implement actual GitHub API integration
- [ ] Add authentication and authorization
- [ ] Implement caching for frequently analyzed repositories
- [ ] Add pagination for repository list endpoints
- [ ] Add user tracking and history
- [ ] Implement more advanced conclusion generation
- [ ] Add webhook support for real-time repository updates
- [ ] Unit and integration tests
- [ ] Docker containerization

## Code Quality

- Uses Lombok for cleaner code
- Follows Spring Boot best practices
- Comprehensive logging for debugging
- Proper exception handling
- DTOs for request/response separation
- Clear package structure following clean architecture principles
