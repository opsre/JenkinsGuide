# how-to-install

# Several Installation Methods for Jenkins

Jenkins installation is very straightforward, and there are multiple installation methods available. We can deploy via WAR package, RPM package, Docker container, or Kubernetes. In enterprise practices, various methods might be used. However, from my perspective, **I do not recommend containerized deployment for Jenkins master processes**, and I suggest using the traditional WAR package deployment approach for management.

## 1. Understanding Jenkins Download and Installation

- Jenkins Official Website: [https://www.jenkins.io/](https://www.jenkins.io/)
- Jenkins Download: [https://www.jenkins.io/download/](https://www.jenkins.io/download/)

The Jenkins download page looks like this:

![](https://t.eryajf.net/ghimgs/jenkinsGuide/759dbeece418bc21a2e3989925199c5c.webp)

`Note: When browsing the official website, try to use the English version. Chinese translations may have delayed updates, causing outdated content.`

In the image above:
- **Left side**: Stable releases
- **Right side**: Weekly releases

Key characteristics:
- **Stable releases**: Updated every 4 weeks for minor versions (e.g., 2.56.1 → 2.56.2) and every 12 weeks for baseline versions (e.g., 2.56 → 2.57).
- **Weekly releases**: Updated weekly. Not recommended for production environments.

**Important Update**: In a June 28, 2022 blog post titled [Jenkins requires Java 11 or newer](https://www.jenkins.io/blog/2022/06/28/require-java-11/), the Jenkins team announced that starting from Jenkins `2.357` (released June 28, 2022) and the upcoming `2.361.1` LTS version, **Java 11 or newer is required**. For version compatibility details, see: [Java Support Policy](https://www.jenkins.io/doc/book/platform-information/support-policy-java/).

**Note for Chinese Users**: Since many Chinese enterprises still use Java 1.8, this tutorial series will use **`2.346.1` LTS** (released June 22, 2022) as the base environment. Please be aware of this.

> 📢 **Important**: When following this tutorial, **always use the latest available version** for deployment. Many plugins are adapted for newer Jenkins versions. If you use older versions, plugin installation may fail (example error below):

![](https://t.eryajf.net/ghimgs/jenkinsGuide/ee047adfcaa02887b90032f66b6c2906.webp)

---

## 2. Resource Preparation

- **OS**: CentOS 7 (or your preferred OS)
- **Hardware**: Minimum `8C16G` (higher recommended). Compile-heavy workloads or frequent builds require robust resources.
- **Storage**:
  - System Disk: `100GB`
  - Data Disk: `800GB` (SSD recommended)
- **Notes**:
  - Mount the data disk to `/data`
  - Set `JENKINS_HOME` to `/data/.jenkins`
  - For master nodes without build tasks (agent-based setups), reduce data disk to 500GB.

---

## 3. WAR Package Deployment

### Steps:
1. Configure JDK
2. Configure Tomcat
3. Deploy Jenkins and complete basic setup

> You can run Jenkins directly using `java -jar jenkins.war`, but we recommend Tomcat for management. Direct execution parameters include:
> - `--httpPort=`: Service port (default: 8080)
> - `-DJENKINS_HOME=`: Jenkins home directory
> For more parameters: [Initial Settings](https://www.jenkins.io/doc/book/installing/initial-settings/)

### 1. Download Materials
- **JDK**
  - Official: [https://www.oracle.com/java/technologies/downloads/#java8](https://www.oracle.com/java/technologies/downloads/#java8)
  - Mirror: [https://github.com/opsre/Thanks-Mirror#jdk](https://github.com/opsre/Thanks-Mirror#jdk)
- **Tomcat**
  - Official: [https://tomcat.apache.org/download-80.cgi](https://tomcat.apache.org/download-80.cgi)
- **Jenkins WAR**
  - Mirror: [https://github.com/eryajf/Thanks-Mirror#jenkins](https://github.com/eryajf/Thanks-Mirror#jenkins)

### 2. Installation & Configuration

#### Install JDK
```sh
$ tar -xf jdk-8u261-linux-x64.tar.gz
$ mv jdk1.8.0_261 /usr/local/java1.8
$ echo -e 'export JAVA_HOME=/usr/local/java1.8\nexport PATH=$PATH:$JAVA_HOME/bin' >> /etc/profile
$ source /etc/profile
$ java -version
```
Successful version output confirms installation.

#### Install Tomcat
```sh
$ tar xf apache-tomcat-8.5.83.tar.gz
$ mv apache-tomcat-8.5.83 /usr/local/tomcat
$ cd /usr/local/tomcat/webapps/
$ rm -rf *
```

#### Deploy Jenkins
```sh
$ mv jenkins.war /usr/local/tomcat/webapps/ROOT.war
```

#### Start Tomcat
```sh
# Add JENKINS_HOME to startup.sh (line 22 in this example)
$ grep -n JENKINS_HOME /usr/local/tomcat/bin/startup.sh
22:export JENKINS_HOME=/data/.jenkins

# Start
$ /usr/local/tomcat/bin/startup.sh
```

After startup, access Jenkins at `http://<IP>:8080`:

![](https://t.eryajf.net/ghimgs/jenkinsGuide/b74b95294469ac20bfe6f0f08115fe66.webp)

Follow the setup wizard:
1. Enter initial admin password
2. Install suggested plugins:

![](https://t.eryajf.net/ghimgs/jenkinsGuide/017d41d94fc1c8a65f76407688734787.webp)

3. Continue with admin account (user management covered later):

![](https://t.eryajf.net/ghimgs/jenkinsGuide/9963f85f068342711145cea144457710.webp)

4. Configure Jenkins URL (use domain name in production):

![](https://t.eryajf.net/ghimgs/jenkinsGuide/2f7b38c045c02d1ae9334c37cdbcab87.webp)

**Post-Installation**:
- Immediately update the admin password via `Manage Jenkins` → `Users`.

### 3. Domain Configuration (Critical!)

**Why**: For JNLP agent connections (explained later), the domain must resolve to Jenkins master’s IP.

Example Nginx Configuration:
```nginx
server {
    listen       80;
    server_name  jenkins.test.com;

    client_body_timeout 60s;
    client_header_timeout 60s;

    location / {
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-For $remote_addr;
        proxy_pass http://127.0.0.1:8080;
    }
}
```

Update Jenkins URL in `Manage Jenkins` → `Configure System`:

![](https://t.eryajf.net/ghimgs/jenkinsGuide/f443b54fff9146d6c3da816cabd5b2fa.webp)

---

## 4. RPM Package Deployment

### 1. Download
- RPM from Tsinghua Mirror: [https://mirrors.tuna.tsinghua.edu.cn/jenkins/redhat-stable/](https://mirrors.tuna.tsinghua.edu.cn/jenkins/redhat-stable/)

### 2. Installation

#### Install JDK
```sh
$ yum -y install epel-release fontconfig
$ yum -y install java-1.8.0-openjdk.x86_64
$ java -version
```

#### Install Jenkins
```sh
$ yum -y localinstall jenkins-2.346.1-1.1.noarch.rpm
```

#### Configure Service
Edit `/usr/lib/systemd/system/jenkins.service`:
```sh
[Unit]
Description=Jenkins Continuous Integration Server
Requires=network.target
After=network.target

[Service]
Type=notify
NotifyAccess=main
ExecStart=/usr/bin/jenkins
Restart=on-failure
SuccessExitStatus=143
User=root
Group=root
Environment="JENKINS_HOME=/data/.jenkins"
WorkingDirectory=/data/.jenkins
Environment="JENKINS_WEBROOT=%C/jenkins/war"
Environment="JAVA_OPTS=-Djava.awt.headless=true"
Environment="JENKINS_PORT=8080"

[Install]
WantedBy=multi-user.target
```

#### Start Jenkins
```sh
$ mkdir -p /data/.jenkins
$ systemctl start jenkins
$ systemctl status jenkins

# View logs
$ tail -f /var/log/messages
# OR
$ journalctl -xe -f -u jenkins
```

---

## 5. Docker Deployment

### 1. Pull Image
```sh
docker pull jenkins/jenkins:2.346.1
```

### 2. Run Container
```sh
docker run -itd -u root --privileged -p 8080:8080 -p 50000:50000 --name jenkins \
  --restart always \
  -e TZ=Asia/Shanghai \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v /usr/bin/docker:/usr/bin/docker \
  -v /data/.jenkins:/var/jenkins_home \
  jenkins/jenkins:2.346.1
```

**Note**: Suitable for testing only. Not recommended for production.

---

## 6. Why Not Containerize Jenkins?

While Kubernetes-based Jenkins exists, here’s why I advise against it:

1. **Storage Reliability**: Jenkins relies heavily on local storage. External volumes in Kubernetes introduce unnecessary complexity and uncertainty for critical debugging/maintenance tasks.
2. **Configuration Management**: Bulk operations on `config.xml` files are simpler with direct filesystem access.
3. **Stability**: Host-based deployments offer predictable environments crucial for CI/CD pipelines.

**Conclusion**: For production environments, always prefer host-based deployments (WAR/RPM) over containerized solutions.