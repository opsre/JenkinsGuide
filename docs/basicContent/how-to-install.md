# Jenkins的几种安装方式

Jenkins 的安装是非常简单的，安装的方式也有多种，我们可以通过 war 包部署，rpm 包部署，docker 拉起，k8s 部署等方式进行，在企业实践当中，可能前边这几种方式都有应用的，但从我的角度来说，我不推荐将 Jenkins 的主进程以容器化的方式部署，我推荐用传统的 war 包部署方式来管理。

## 1，了解 Jenkins 下载安装

- Jenkins 官网： [https://www.jenkins.io/](https://www.jenkins.io/)
- Jenkins 下载： [https://www.jenkins.io/download/](https://www.jenkins.io/download/)

Jenkins 下载页面如下：

![](https://t.eryajf.net/ghimgs/jenkinsGuide/759dbeece418bc21a2e3989925199c5c.webp)

`注意：浏览官网时，尽量还是用英文，中文翻译存在更新延迟的问题，导致内容落后。`

上图中，左侧为稳定版，右侧为开发版本，两者特性如下：
- 稳定版：见名知意，更新频率一般为每 4 周更新一次小版本 (例如从 2.56.1 更新到 2.56.2 )，每 12 周更新一次基线版本 (例如从 2.56 更新到 2.57 )。
- 开发版：见名知意，更新频率为每周发布一次，通常生产环境中不建议使用开发版本。

另外：Jenkins 官方在 2022 年 6 月 28 日的一篇名为 [Jenkins requires Java 11 or newer](https://www.jenkins.io/blog/2022/06/28/require-java-11/) 的博文中称：从 Jenkins `2.357`（2022 年 6 月 28 日发布）和即将发布的 `2.361.1` LTS 版本开始，Jenkins 需要 Java 11 或更高版本。具体版本对应关系，请见：[Java Support Policy](https://www.jenkins.io/doc/book/platform-information/support-policy-java/)。

大家在使用过程中，请留意这一变化，同时因为国内企业内大多还在使用 Java-1.8，因此本系列教程中的 Jenkins 版本，将使用 `2.346.1` (2022 年 6 月 22 日发布)  LTS 版作为基础环境，请务必知悉。

> 📢注意：你在阅读此教程时，`应尽量使用最新的版本进行部署`，因为有大量的插件会跟随最新主版本适配，假如跟随我的版本部署老版本，可能会出现插件安装失败的情况，一般安装失败遇到的错误如下：

![](https://t.eryajf.net/ghimgs/jenkinsGuide/ee047adfcaa02887b90032f66b6c2906.webp)

## 2，资源准备

- 系统：CentOS7，当然根据自己的实际情况进行选择。
- 配置：在越大越好的前提下，建议不低于 `8C16G`，通常，如果业务语言栈为编译型语言，且构建任务较多的情况下，是需要相对大的配置来保障系统稳定的。
- 存储：建议 `100G系统盘` + `800G数据盘`。盘的规格越高越好。最低 `SSD`，其中数据盘可根据实际情况酌情加大。
- `注意：`
	- 数据盘挂载到 `/data` 目录。
	- 我们的 `JENKINS_HOME` 统一在：`/data/.jenkins`。
	- 如果配置成了主从构建，主节点没有构建的场景，则主节点磁盘可适当减配到 500G。

## 3，使用 war 包部署

war 包部署的流程大致如下：

1. 配置基础 JDK 环境。
2. 配置 Tomcat。
3. 部署 Jenkins，完成基础配置。

> 当然 war 包也可以不使用 Tomcat 托管，直接使用 `java -jar jenkins.war` 命令来启动，不过我更习惯使用 Tomcat 来管理 Jenkins 的 war 包。如果你使用这种方式托管，那么通常会带上这些参数：
>  - `--httpPort=` : 指定服务启动端口，默认为 8080。
>  - `-DJENKINS_HOME=` ：指定 Jenkins 的家目录。
> 更多参数请参考： [https://www.jenkins.io/doc/book/installing/initial-settings/](https://www.jenkins.io/doc/book/installing/initial-settings/)

### 1，下载物料

- JDK
	- 官方地址：[https://www. oracle. com/java/technologies/downloads/#java8](https://www.oracle.com/java/technologies/downloads/#java8)
	- 国内镜像：[https://github.com/opsre/Thanks-Mirror#jdk](https://github.com/opsre/Thanks-Mirror#jdk)
- Tomcat
	- 官方地址： [https://tomcat.apache.org/download-80.cgi](https://tomcat.apache.org/download-80.cgi)
- Jenkins
	- 国内镜像：[https://github.com/eryajf/Thanks-Mirror#jenkins](https://github.com/eryajf/Thanks-Mirror#jenkins)

### 2，安装配置

- 安装 jdk

```sh
$ tar -xf jdk-8u261-linux-x64.tar.gz
$ mv jdk1.8.0_261 /usr/local/java1.8
$ echo -e 'export JAVA_HOME=/usr/local/java1.8\nexport PATH=$PATH:$JAVA_HOME/bin' >> /etc/profile
$ source /etc/profile
$ java -version
```

当看到正常输出了 jdk 的版本，就说明安装成功了。

- 安装 Tomcat

```sh
$ tar xf apache-tomcat-8.5.83.tar.gz
$ mv apache-tomcat-8.5.83 /usr/local/tomcat
$ cd /usr/local/tomcat/webapps/
$ rm -rf *
```

- 安装 Jenkins

```sh
$ mv jenkins.war /usr/local/tomcat/webapps/ROOT.war
```

- 启动 Tomcat

```sh
# 在 /usr/local/tomcat/bin/startup.sh 文件中声明 JENKINS_HOME,比如我在第22行添加了如下内容
$ grep -n JENKINS_HOME /usr/local/tomcat/bin/startup.sh
22:export JENKINS_HOME=/data/.jenkins

# 启动 tomcat
$ /usr/local/tomcat/bin/startup.sh
```

服务启动之后，可以看到端口监听在 8080，浏览器访问如下：

![](https://t.eryajf.net/ghimgs/jenkinsGuide/b74b95294469ac20bfe6f0f08115fe66.webp)

将密码填写进去，选择安装推荐的插件：

![](https://t.eryajf.net/ghimgs/jenkinsGuide/017d41d94fc1c8a65f76407688734787.webp)

官方推荐的插件如下：

![](https://t.eryajf.net/ghimgs/jenkinsGuide/b89b19b68144ad6b9e898fe1bb496ec7.webp)

安装完毕之后，我们直接使用 admin 账号，暂时不创建普通账号，关于账号方面的问题，我们会在权限管理的篇章展开探讨。

![](https://t.eryajf.net/ghimgs/jenkinsGuide/9963f85f068342711145cea144457710.webp)

来到实例配置页面，在企业应用中，通常我们还应该给 Jenkins 配置一个域名，这里的 Jenkins URL 应该配置为 Jenkins 的域名，此配置可修改，因此这里先保持默认推荐的配置。

![](https://t.eryajf.net/ghimgs/jenkinsGuide/2f7b38c045c02d1ae9334c37cdbcab87.webp)

这样 Jenkins 就安装完毕了，可以愉快地使用 Jenkins 了。

安装好了之后第一件事儿，点击右上角 admin 账号，进入设置里边，修改 admin 账号的密码，此密码将作为管理账号的密码，需妥善保存。

### 3，添加域名解析

按理说添加域名解析并不需要单独再进行讲解，但这里还是要说一下，因为一旦不小心，就可能会在这个上边踩坑。

`注意：` 我强烈建议，你直接在 Jenkins 运行的机器上安装一个 Nginx，然后添加域名配置反向代理 Jenkins。这么做的原因，是因为 Jenkins 在使用 `JNLP节点代理` 配置 slave 的时候，从节点会通过域名连接 Jenkins 所在主机启动的端口，如果域名在其他地方，则这个端口无法连通，slave 的配置也将失败。关于 slave 的配置，后边会有单独的章节进行详解。

我的演示 Jenkins 将配置域名如下：

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

配置之后，访问 Jenkins 界面，在 `系统管理` ==> `系统配置` ==> `Jenkins URL` 处进行设置：

![](https://t.eryajf.net/ghimgs/jenkinsGuide/f443b54fff9146d6c3da816cabd5b2fa.webp)

如上图所示，这个配置务必与 Jenkins 主域名保持一致，因为后续很多地方都会用到这个配置信息。

## 4，基于 rpm 包安装

接下来只介绍安装的步骤，安装之后的配置步骤都是一样的，就不重复介绍了。

### 1，下载物料

- Jenkins 的 rpm 包可通过清华镜像源下载： [https://mirrors.tuna.tsinghua.edu.cn/jenkins/redhat-stable/](https://mirrors.tuna.tsinghua.edu.cn/jenkins/redhat-stable/)

### 2，安装

- 安装 jdk

```sh
$ yum -y install epel-release
$ yum -y install java-1.8.0-openjdk.x86_64
$ java -version
```

当看到正常输出了 jdk 的版本，就说明安装成功了。

- 安装 Jenkins

```sh
$ yum -y localinstall jenkins-2.346.1-1.1.noarch.rpm
```

- 配置 Jenkins 启动文件 `/usr/lib/systemd/system/jenkins.service`

```sh
$ egrep -v '^$|^#' /usr/lib/systemd/system/jenkins.service
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

- 启动 Jenkins

```sh
# 先创建一下家目录
$ mkdir -p /data/.jenkins

$ systemctl start jenkins
$ systemctl status jenkins

# 通过如下两种方式可以查看程序启动日志
$ tail -f /var/log/messages
# 或
$ systemctl -xe -f -u jenkins
```

## 5，基于 docker 安装

### 1，物料

```sh
docker pull jenkins/jenkins:2.346.1
```

### 2，部署

docker 部署需要注意一个问题是，把容器内部的数据目录挂载出来，以及把宿主机的 docker 挂载到容器中，从而在构建过程中使用 (关于 dind 的问题不是本文讨论的重点，这里只展示一种)。

```sh
docker run -itd -u root --privileged -p 8080:8080 -p 50000:50000 --name jenkins \
  --restart always \
  -e TZ=Asia/Shanghai \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v /usr/bin/docker:/usr/bin/docker \
  -v /data/.jenkins:/var/jenkins_home \
jenkins/jenkins: 2.346.1
```

启动之后，就可以在本地使用了。容器化部署建议只在测试场景中使用，不建议在生产当中使用。

## 6，为什么不建议容器部署

其实也有不少同学基于 k8s 构筑的 Jenkins 构建系统，关于这方面的规划，也是见仁见智吧，接下来我聊一下，为什么我不建议将 Jenkins 以容器化的方式部署。

Jenkins 作为以本地存储为核心的系统，如果使用 k8s 来部署，对于持久化的工作数据来说，用外挂的方式来做，总有一种悬在空中的感觉，日常工作维护中，我们会经常进入到项目的工作目录进行一些问题定位，调试等工作，使用宿主机部署，固定的 JENKINS_HOME 目录，会提供非常稳定的确定感，这对于以稳定为第一要务的运维工作来说，是很重要的。

还有一个重要的情况在于：对于 Jenkins 的维护，有一些批量工作，我们将依赖对项目的 `config.xml` 批量操作来实现，同理，宿主机的部署，对于我们操作配置文件也是更加友好稳定的。因此，我再一次建议，大家在公司生产当中部署 Jenkins，尽可能使用宿主机的部署方式。