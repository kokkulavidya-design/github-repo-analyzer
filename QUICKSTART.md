# Quick Start Guide

## Prerequisites

- Java 25 or higher installed
- Apache Maven 3.8.1 or higher
- MySQL Server running (local or Aiven cloud)
- Git (optional, for version control)

## Step-by-Step Setup

### Step 1: Navigate to Project Directory
```bash
cd githubrepositary_analyzer
```

### Step 2: Create MySQL Database
Connect to your MySQL server and run:
```sql
CREATE DATABASE github_repo_analyzer;
```

### Step 3: Configure Database Connection
Edit `src/main/resources/application.properties` and update the database credentials:

**For Local MySQL:**
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/github_repo_analyzer
spring.datasource.username=root
spring.datasource.password=your_password
```

**For Aiven Cloud MySQL:**
```properties
spring.datasource.url=jdbc:mysql://your-aiven-host:your-port/github_repo_analyzer
spring.datasource.username=avnadmin
spring.datasource.password=your_aiven_password
```

### Step 4: Build the Project
```bash
mvn clean install
```

This will:
- Download all dependencies
- Compile the source code
- Package the application

### Step 5: Run the Application

**Option A: Using Maven**
```bash
mvn spring-boot:run
```

**Option B: Run the Compiled JAR**
```bash
java -jar target/github-repo-analyzer-1.0.0.jar
```

**Expected Output:**
```
2024-01-15 10:30:00.123  INFO 12345 --- [main] 
  c.g.GitHubRepoAnalyzerApplication       : 
  Starting GitHubRepoAnalyzerApplication v1.0.0
...
2024-01-15 10:30:05.456  INFO 12345 --- [main] 
  o.s.b.w.e.t.TomcatWebServer             : 
  Tomcat started on port(s): 8080 (http)
```

The application is now running on `http://localhost:8080`

## Testing the API

### Using cURL

#### 1. Health Check
```bash
curl -X GET http://localhost:8080/api/repository/health
```

**Response:**
```
Repository Analysis Service is running
```

#### 2. Analyze a Repository
```bash
curl -X POST http://localhost:8080/api/repository/analyze \
  -H "Content-Type: application/json" \
  -d '{"repoUrl": "https://github.com/torvalds/linux"}'
```

**Response:**
```json
{
  "id": 1,
  "repoUrl": "https://github.com/torvalds/linux",
  "repoName": "linux",
  "owner": "torvalds",
  "description": "Sample repository description",
  "stars": 0,
  "forks": 0,
  "language": "Java",
  "createdAt": "2024-01-15T10:35:22.123456",
  "conclusion": "Repository: linux by torvalds | Stars: 0 | Forks: 0 | Language: Java",
  "message": "Repository analysis completed successfully"
}
```

#### 3. Retrieve Repository by ID
```bash
curl -X GET http://localhost:8080/api/repository/1
```

**Response:** Same as above

### Using Postman

1. **Open Postman**
2. **Create a new POST request:**
   - URL: `http://localhost:8080/api/repository/analyze`
   - Headers: `Content-Type: application/json`
   - Body (raw JSON):
   ```json
   {
     "repoUrl": "https://github.com/spring-projects/spring-boot"
   }
   ```

3. **Click Send**

## Troubleshooting

### Database Connection Issues

**Error:** `Communications link failure`

**Solution:**
- Check if MySQL is running
- Verify database credentials in `application.properties`
- Ensure the database exists: `CREATE DATABASE github_repo_analyzer;`

### Port Already in Use

**Error:** `Address already in use`

**Solution:** Change the server port in `application.properties`:
```properties
server.port=8081
```

### Lombok Annotation Processing

**Issue:** IntelliJ IDEA not recognizing Lombok annotations

**Solution:**
1. Install Lombok plugin in IntelliJ
2. Enable annotation processing:
   - File → Settings → Build, Execution, Deployment → Compiler → Annotation Processors
   - Check "Enable annotation processing"

### Build Failures

**Error:** `Maven not found`

**Solution:**
- Install Maven from https://maven.apache.org/download
- Add Maven to PATH environment variable
- Verify: `mvn --version`

**Error:** `Java version`

**Solution:**
- Ensure Java 25+ is installed
- Set JAVA_HOME environment variable
- Verify: `java --version`

## Viewing Application Logs

The application logs are displayed in the console during startup. To view them in a file, update `application.properties`:

```properties
logging.file.name=logs/application.log
logging.file.max-size=10MB
logging.file.max-history=10
```

Then check the `logs/` directory for detailed logs.

## Project Compilation Check

To verify all classes compile without errors, run:
```bash
mvn compile
```

This will check for:
- Syntax errors in Java files
- Missing dependencies
- Annotation processing errors

## Next Steps

1. **Implement GitHub API Integration**
   - Use the WebClient configured in `WebClientConfig`
   - Fetch real repository data from GitHub API
   - Update `RepositoryService.fetchRepositoryDataFromGitHub()`

2. **Add Unit Tests**
   - Create test classes in `src/test/java`
   - Mock the GitHub API
   - Test service and controller methods

3. **Add Frontend Integration**
   - Update CORS configuration if needed
   - Ensure frontend can reach the backend API

4. **Deploy to Production**
   - Package as Docker container
   - Deploy to cloud platform
   - Set up CI/CD pipeline

## Documentation Files

- **README.md** - Project overview and features
- **PROJECT_STRUCTURE.md** - Detailed file structure and architecture
- **QUICKSTART.md** - This file

## Support

For issues or questions about Spring Boot:
- Official Documentation: https://spring.io/projects/spring-boot
- GitHub API Documentation: https://docs.github.com/en/rest

Enjoy building! 🚀
