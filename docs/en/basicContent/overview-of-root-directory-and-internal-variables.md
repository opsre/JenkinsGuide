# Overview of Jenkins Root Directory and Built-in Variables

To manage and maintain Jenkins effectively, it's essential to understand its core components. This article provides an overview of Jenkins’ home directory, built-in variables, and management configurations to help you gain a solid foundation.

---

## 1. Home Directory Overview

The Jenkins home directory (`JENKINS_HOME`) is standardized here as `/data/.jenkins`. After installing Jenkins (version 2.346.1), its structure is as follows:

```sh
$ tree -L 1 /data/.jenkins/
.
├── com.cloudbees.hudson.plugins.folder.config.AbstractFolderConfiguration.xml
├── config.xml
├── github-plugin-configuration.xml
├── hudson.model.UpdateCenter.xml
├── hudson.plugins.build_timeout.global.GlobalTimeOutConfiguration.xml
├── hudson.plugins.build_timeout.operations.BuildStepOperation.xml
├── hudson.plugins.emailext.ExtendedEmailPublisher.xml
├── hudson.plugins.git.GitSCM.xml
├── hudson.plugins.git.GitTool.xml
├── hudson.plugins.gradle.injection.InjectionConfig.xml
├── hudson.plugins.timestamper.TimestamperConfig.xml
├── hudson.tasks.Mailer.xml
├── hudson.tasks.Shell.xml
├── hudson.triggers.SCMTrigger.xml
├── identity.key.enc
├── io.jenkins.plugins.junit.storage.JunitTestResultStorageConfiguration.xml
├── jenkins.fingerprints.GlobalFingerprintConfiguration.xml
├── jenkins.install.InstallUtil.installingPlugins
├── jenkins.install.InstallUtil.lastExecVersion
├── jenkins.install.UpgradeWizard.state
├── jenkins.model.ArtifactManagerConfiguration.xml
├── jenkins.model.GlobalBuildDiscarderConfiguration.xml
├── jenkins.model.JenkinsLocationConfiguration.xml
├── jenkins.plugins.git.GitHooksConfiguration.xml
├── jenkins.security.apitoken.ApiTokenPropertyConfiguration.xml
├── jenkins.security.QueueItemAuthenticatorConfiguration.xml
├── jenkins.security.ResourceDomainConfiguration.xml
├── jenkins.security.UpdateSiteWarningsConfiguration.xml
├── jenkins.tasks.filters.EnvVarsFilterGlobalConfiguration.xml
├── jenkins.telemetry.Correlator.xml
├── jobs
├── logs
├── nodeMonitors.xml
├── nodes
├── org.jenkinsci.plugins.gitclient.GitHostKeyVerificationConfiguration.xml
├── org.jenkinsci.plugins.github_branch_source.GitHubConfiguration.xml
├── org.jenkinsci.plugins.workflow.flow.GlobalDefaultFlowDurabilityLevel.xml
├── org.jenkinsci.plugins.workflow.libs.GlobalLibraries.xml
├── plugins
├── queue.xml.bak
├── scriptApproval.xml
├── secret.key
├── secret.key.not-so-secret
├── secrets
├── updates
├── userContent
├── users
└── workspace

8 directories, 40 files
```

Key files and directories to focus on:

### 1. `config.xml`
- **Primary configuration file** for Jenkins.
- Contains critical information:
  - `version`: Current Jenkins version.
  - `numExecutors`: Number of concurrent builds allowed.
  - `roleMap`: Role-based permissions.
  - `securityRealm`: Authentication method (e.g., LDAP).
  - `views`: View configurations and job listings.
  - `ToolLocationNodeProperty`: Global tool configurations.
  - `EnvironmentVariablesNodeProperty`: Custom environment variables.

### 2. `jobs`
- Stores all job configurations. Example structure:
  ```sh
  jobs/
  ├── test-folder
  │   ├── config.xml          # Folder configuration
  │   └── jobs
  │       └── test-job-1      # Job directory
  │           ├── builds      # Build history
  │           │   └── 1       # Build #1 artifacts
  │           ├── config.xml  # Job configuration
  │           └── nextBuildNumber
  └── test-job-2              # Another job
  ```
  - `config.xml` in each job directory defines the job’s settings.
  - `builds` subdirectory holds historical build data (logs, changelogs, etc.).

### 3. `nodes`
- Stores agent (slave) node configurations. Example:
  ```sh
  nodes/
  └── test
      └── config.xml   # Configuration for agent "test"
  ```

### 4. `plugins`
- Contains installed plugins.

### 5. `updates`
- Manages plugin update configurations.

### 6. `users`
- Stores user account data.

### 7. `workspace`
- Temporary workspace for active builds and job artifacts.

---

## 2. Jenkins Built-in Variables

Understanding built-in variables is crucial for pipeline scripting and troubleshooting. Below are common variables:

### 1. Accessing Variables
- **Method 1**: Visit `/env-vars.html` or `/pipeline-syntax/globals` via Jenkins URL.
- **Method 2**: Use `printenv` in a pipeline:
  ```groovy
  pipeline {
    agent any
    stages {
      stage('debug') {
        steps {
          sh "printenv"
        }
      }
    }
  }
  ```

### 2. Key Variables
- `JOB_NAME`: Full job name (e.g., `test-folder/test-job`).
- `JOB_BASE_NAME`: Job name without folder paths (e.g., `test-job`).
- `BUILD_URL`: URL of the current build (e.g., `http://jenkins.test.com/job/test/1/`).
- `WORKSPACE`: Absolute path to the job’s workspace.
- `BUILD_NUMBER`: Incremental build ID (e.g., `1`).
- `JENKINS_URL`: Base URL of Jenkins (configured in **Manage Jenkins > System Settings**).

### 3. `currentBuild` Properties
- Modify build metadata dynamically:
  ```groovy
  currentBuild.description = "Submitter: ${COMMIT_USER}"
  currentBuild.displayName = "#${BUILD_NUMBER}-${BRANCH}"
  ```
- Useful properties:
  - `description`: Custom build description.
  - `displayName`: Build name shown in the UI.
  - `durationString`: Human-readable build duration (e.g., `0.62 sec`).
  - `fullProjectName`: Job name with folder paths (same as `JOB_NAME`).

---

By mastering Jenkins' directory structure and built-in variables, you can streamline administration, debug effectively, and customize automation workflows with confidence.