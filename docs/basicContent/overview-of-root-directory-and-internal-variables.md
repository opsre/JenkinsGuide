# Jenkins根目录与内置变量概述


认识了解 Jenkins，才能够做到维护与管理的从容，正所谓知己知彼，百战不殆。

本文将针对 Jenkins 家目录、内置变量以及管理端配置项进行一一概述解析，以便我们对 Jenkins 有一个大致的了解与认识。

## 1，家目录概述

所谓家目录，其实就是在安装篇里边强调过得规范约定：

- 我们的 `JENKINS_HOME` 统一在：`/data/.jenkins`。

当前版本 (2.346.1) 安装完成之后，默认的家目录信息如下：

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

有一些文件在使用过程中并不需要关注，因此这里就详人所略，略人所详地挑一些重点需要关注的文件进行一番讲解。

### 1，config.xml

初始时里边定义 Jenkins 的版本，用户等各种信息，此文件不要动，如果随意更改里边的东西，很有可能会使 Jenkins web 界面处受到创伤。等项目各种编辑之后，详细的用户信息，权限，以及标头，视图等等都写入到了这里。

这是 Jenkins 程序的主配置文件，里边存放着各种重要的信息。

大致内容有：

- `version` : 当前 Jenkins 版本。
- `numExecutors` : 当前 Jenkins 可以在此节点上执行并发构建的数目。
- `roleMap` ：角色与角色的权限详情。
- `securityRealm` ：用户认证方式，通常为 LDAP。
- `views ` : 各视图的配置信息以及视图内的项目列表。
- `ToolLocationNodeProperty` : 全局工具配置信息。
- `EnvironmentVariablesNodeProperty` ：全局自定义环境变量。

### 2，jobs

顾名思义，这个目录下，存放着所有的 job，这里用两个 job 来做一下讲解：

```sh
tree -N jobs/
jobs/
├── test-folder
│   ├── config.xml
│   └── jobs
│       └── test-job-1
│           ├── builds
│           │   ├── 1
│           │   │   ├── build.xml
│           │   │   ├── changelog.xml
│           │   │   └── log
│           │   ├── legacyIds
│           │   └── permalinks
│           ├── config.xml
│           └── nextBuildNumber
└── test-job-2
    ├── builds
    │   ├── 1
    │   │   ├── build.xml
    │   │   ├── changelog.xml
    │   │   └── log
    │   ├── legacyIds
    │   └── permalinks
    ├── config.xml
    └── nextBuildNumber

8 directories, 15 files
```

如上内容中，有两个 job，`test-job-1` 和 `test-job-2`，其中 `test-job-1` 又在 `test-folder` 文件夹下，这里也就解释了，为什么 Jenkins 中，不同的视图下，无法创建同名的 job，而不同的文件夹下，却能够创建同名的 job，因为他们在程序目录中就是不同的文件夹。

接下来对一些文件进行单独解释：

- `test-folder目录`
	- `config.xml` ：存放着 test-folder 这个文件夹的配置信息。
	- `jobs目录` ：文件夹下又通过一个单独的 jobs 目录对其下的 job 进行区隔，在 Jenkins 的 Job-URL 中 (eg: http://192.168.10.11:8090/job/test-folder/job/test-job-1/ ) 可以看到，文件夹下的项目并不是简单嵌套，而是每多一层文件夹就会多嵌套一个 job，了解这个知识点，对于后期针对 Jenkins 进行二开的时候，会有很大的帮助。
		- `test-job-1目录` ：这是 test-job-1 这个项目的主配置目录，test-job-2 同理。
			- `config.xml` ：存放着 test-job-1 这个项目的配置信息，非常重要，有时候我们要批量处理一批项目的时候，通常会与这个文件进行交互。
			- `nextBuildNumber` ：改文件存放着下一次构建 ID 号。
			- `builds目录` ：该目录下存放该项目的构建历史信息。
				- `1目录` ：表示构建版本号为 1 的当次构建信息都在这个目录下。
					- `build.xml` ：此文件为当次构建时的整个流程配置信息。
					- `changelog.xml` ：当构建过程中用到过 Git 仓库，那么这个文件将存储 git 仓库的变更信息。
					- `log` ：这个文件存放当次构建的 console 输出日志。

以上，就是对 jobs 目录的简单解析，这是基于 FreeStyle 风格的项目做的一个解析，其他风格的项目，工作目录下的内容可能略有增多，不过基本上核心的内容就是这些了，了解这些目录以及文件的含义，将使我们对 Jenkins 更加运用自如。

### 3，nodes

顾名思义，存储所有 slave 节点的信息，通常只存储一个 slave 节点命名的目录，目录下存储这 slave 节点的配置信息。

比如我创建一个名为 test 的 slave 节点，那么当前目录结构如下：

```sh
$ tree -N nodes
nodes
└── test
    └── config.xml
```

### 4，plugins

顾名思义，Jenkins 插件的存放目录。

### 5，updates

存放 Jenkins 插件更新相关的配置信息。

### 6，users

顾名思义，Jenkins 的用户信息存放目录。

### 7，workspace

Jenkins 中 job 正在运行过程中的工作空间目录，如果我们要看一些构建过程中的产物，或是进行一些调试，通常都需要与这个目录进行交互。

## 2，Jenkins 内置变量概述

了解 Jenkins 的内置变量，能够让我们在把控整个流水线配置的时候，做到灵活运用，有些时候，一些需求场景听起来比较复杂，极有可能是因为我们对 Jenkins 自身熟悉程度不够，以至于遇到实际问题时没有头绪。因此，认识了解内置变量很有必要，不必死记硬背，有个模糊印象即可。

### 1，如何查看

`方法一`

Jenkins 控制界面中，也提供了多个入口供我们查询 Jenkins 提供给我们的系统变量：
- 其一：在访问 Jenkins 的 URL 后边加上 `/env-vars.html` （eg: `http://jenkins.test.com/env-vars.html` ）。
- 其二：在访问 Jenkins 的 URL 后边加上 `/pipeline-syntax/globals` （eg: `http://jenkins.test.com/pipeline-syntax/globals` ）。


![](https://t.eryajf.net/ghimgs/jenkinsGuide/8219e19ed3fbab9afc7956b477bbc5d9.webp)

`方法二`

也可以通过流水线的 `printenv` 方法对内置变量进行输出。

```groovy
pipeline{
    agent any
    stages {
        stage('debug'){
            steps{
                script {
                    sh "printenv"
                }
            }
        }
    }
}
```

运行之后，在构建日志中查看内置变量：

![](https://t.eryajf.net/ghimgs/jenkinsGuide/46d6192a28635da82381a928116319a8.webp)

### 2，变量概述

因为我们以后的使用维护过程中，大多会是第二种方式来与这些内置变量打交道，因此这里就以日志输出的变量为准，来进行概述。

- `JOB_NAME=test-pipeline`

  > 当前运行的 job 名称，此名称将是 job 的全名称，一个在 test-folder 目录下的 job 的变量值为：`test-folder/test-pipeline`，务必注意此细节，不然在日后使用过程中可能会踩在这个坑里。

- `JOB_BASE_NAME=test-pipeline`

  > 当前运行的 job 名称，与 JOB_NAME 不同的是，无论此 job 在哪个目录下，最终打印的都还是这个 job 的名字，当我们把 Jenkins 的项目名作为唯一标识的时候，就应该使用这个变量。

- `WORKSPACE_TMP=/data/.jenkins/workspace/test-pipeline@tmp`

  > 临时的工作空间，

- `BUILD_URL=http://jenkins.test.com/job/test-pipeline/1/`

  > 当次构建的 URL 信息，有时候我们把构建情况通知出去，一般会把地址定义为日志地址，而默认没有提供直接查看 console 日志的变量，此时就需要拼接一下： `${BUILD_URL}console`。

- `JOB_URL=http://jenkins.test.com/job/test-pipeline/`

  > 项目的 URL 地址。

- `JENKINS_HOME=/data/.jenkins`

  > Jenkins 家目录。

- `HOSTNAME=test-eryajf`

  > Jenkins 所在服务器主机名。

- `SHELL=/bin/bash`

  > 当前主机的shell环境。

- `BUILD_TAG=jenkins-test-pipeline-1`

  > 此变量为组合变量，组合为：`jenkins-${JOB_NAME}-${BUILD_NUMBER}`，如果 `JOB_NAME` 中有 `/` 将会被替换为 `-`，以免变量中出现特殊符号。

- `WORKSPACE=/data/.jenkins/workspace/test-pipeline`

  > 项目在服务器上的工作空间，最为基础也最为重要的变量。在配置流水线过程中，我们常常会用到这个变量。

- `BUILD_ID=1`
- `BUILD_NUMBER=1`

  > 两个变量都是当次构建的版本号。

- `JENKINS_URL= http://jenkins.test.com/`

  > Jenkins 服务的主 URL 地址，这个值由系统设置中 `Jenkins URL` 配置决定。

- `RUN_CHANGES_DISPLAY_URL= http://jenkins.test.com/job/test-pipeline/1/display/redirect?page=changes`

  > 当次构建的变更详情页 URL。

- `JAVA_OPTS=-Xms4096M -Xmx4096M -Djdk.tls.ephemeralDHKeySize=2048 -Djava.protocol.handler.pkgs=org.apache.catalina.webresources -Dorg.apache.catalina.security.SecurityListener.UMASK=0027`

  > Jenkins 启动的 JAVA_OPTS 参数。

- `USER=root`

  > Jenkins 执行用户。

- `RUN_ARTIFACTS_DISPLAY_URL= http://jenkins.test.com/job/test-pipeline/1/display/redirect?page=artifacts`

  > 在 Blue Ocean 中查看制品的页面 URL。

- `RUN_DISPLAY_URL= http://jenkins.test.com/job/test-pipeline/1/display/redirect`

  > Blue Ocean 项目详情页的 URL。

- `PWD=/data/.jenkins/workspace/test-pipeline`

  > 当前所处目录。一般情况下，此路径等于 `${WORKSPACE}`

- `JAVA_HOME=/opt/jdk1.8.0_271`

  > Java 家目录。

- `HUDSON_URL= http://jenkins.test.com/`

  > HUDSON 时代的变量。

- `LANG=zh_CN.UTF-8`

  > 语言。

- `NODE_LABELS=built-in`

  > 构建节点的 labels 。

- `HUDSON_HOME=/data/.jenkins`

  > HUDSON 时代的变量。


事实上还有一些其他变量，因为基本上不需要关注，因此这里就不展示与陈述了。

### 3，关于 currentBuild

currentBuild 是另一个内置的系统全局变量，其中提供了一些更为丰富的参数扩展与集成。

访问： `http://jenkins.test.com/pipeline-syntax/globals#currentBuild` 可以看到这个参数的属性列表。

接下来挑选一部分做下功能说明，了解这些参数，在后续工作场景中，能够让我们对 Jenkins 的把控更加游刃有余。

举个例子：

- `description` ：代表当次构建的说明信息。在流水线当中，我们可以通过给这个变量赋值，来实现调整修改构建说明的效果。

```groovy
wrap([$class: 'BuildUser']){
        buildName "#${BUILD_NUMBER}-${BRANCH}-${BUILD_USER_FIRST_NAME}-${PLATFORM}" // 更改构建名称
        currentBuild.description = "提交者: ${COMMIT_USER}<br>" // 添加说明信息
        currentBuild.description += "提交ID: ${COMMIT_ID}<br>"
        currentBuild.description += "提交时间: ${COMMIT_TIME}<br>"
        currentBuild.description += "提交内容: ${COMMIT_INFO}<br>"
        currentBuild.description += "本次镜像: ${JOB_IMAGE}"
    }
```

实现效果如下：

![](https://t.eryajf.net/ghimgs/jenkinsGuide/d8a97bf207c10ecd77459a1677c91ef7.webp)

这样就可以把项目在构建过程中的一些重要参数外置显示。当然并不是每一个属性都是可以通过这种方式覆写的，官方只允许：`result`，  `displayName`，  `description` ，`keepLog` 这几个变量的值是可被覆写的。

整理几个常用的介绍如下：

- `displayName` ：代表当次构建的的展示名称。在流水线当中，我们可以通过给这个变量赋值，来实现调整修改构建名称的效果。
- `getBuildCauses` ：返回当次构建的构建原因的 JSON 数组。
- `fullDisplayName` ：返回完整的构建名称。eg：`a-test » new-test #11`
- `projectName` ：项目名称。等同于 `JOB_BASE_NAME`。
- `fullProjectName` ：带文件夹路径的项目名，等同于 `JOB_NAME`。
- `timeInMillis` ：构建开始执行的时间。
- `duration` ：构建的持续时间（以毫秒为单位）。eg：`161`
- `durationString` ：人类可读的构建持续时间。eg：`0.62 sec`
- `keepLog` ：是否保留此次构建的日志。