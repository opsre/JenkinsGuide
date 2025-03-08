# Plugin Management in Jenkins

## Introduction

Like many software systems, Jenkins boasts a powerful and rich ecosystem. The project inherited the plugin-based extensibility mechanism from its predecessor, Hudson, and has continuously refined it since forking from Hudson in 2011.

By examining the version history of the ancient [Maven plugin](https://plugins.jenkins.io/maven-plugin/), we can see its initial release date was December 18, 2010:

![](https://t.eryajf.net/ghimgs/jenkinsGuide/1d4d82035e608316952694d0de66fc27.webp)

For today's internet-savvy technologists, this feels like ancient history.

According to Jenkins' official statistics, there are currently over 2,000 plugins covering various technical scenarios—an impressively diverse ecosystem.

Managing and leveraging these historically rich and feature-packed plugins is crucial, reflecting the运维素养 ("maintenance proficiency") of a Jenkins maintainer (whether you’re formally a DevOps engineer or not). Here, "historically rich" and "ecosystem-diverse" are neutral terms rather than outright praise.

---

## A Golden Rule

This article won’t delve deeply into plugins but shares two key points:

**A golden rule**: If your Jenkins version and plugin versions are compatible and meet functional requirements, avoid upgrades unless faced with blocking issues. Upgrades may introduce unknown compatibility problems.

Such issues often lack standard solutions—a common challenge in ecosystems reliant on plugins.

---

## A Useful Tip

Installing or upgrading plugins in Jenkins can be time-consuming due to network constraints. Here’s a tip to accelerate downloads using mirrors.

Plugins can be installed in two ways:
1. Downloading `.hpi` plugin files and uploading them manually.
2. Directly installing from the plugin marketplace by searching for the plugin name.

![](https://t.eryajf.net/ghimgs/jenkinsGuide/03c943b1bfa5942d02a4d0ff875f64c6.webp)

The latter approach, however, relies on Jenkins’ default update center (`https://updates.jenkins.io/update-center.json`), which may have latency issues in some regions.

To check your Jenkins update center configuration:
```sh
$ cat hudson.model.UpdateCenter.xml

<?xml version='1.1' encoding='UTF-8'?>
<sites>
  <site>
    <id>default</id>
    <url>https://updates.jenkins.io/update-center.json</url>
  </site>
</sites>
```

After initialization, Jenkins persists data from this URL to `updates/default.json`.

For faster downloads in restricted networks, use mirrors. The project [jenkins-update-center](https://github.com/lework/jenkins-update-center) simplifies this by aggregating mirrored resources. After selecting a suitable mirror (via [speed test](https://mirrors.jenkins-zh.cn/)), update the configuration:

![](https://t.eryajf.net/ghimgs/jenkinsGuide/0e04bf4b64b00a93c9ca3c552eb90458.webp)

If accessing `jsdelivr` is problematic, host the JSON file on an internal CDN. After updating the URL, plugin installations will proceed significantly faster.

---

## Accelerating Initial Plugin Installation

Jenkins typically installs recommended plugins during setup. Here’s how to speed up this process:

1. **Install Jenkins** (refer to [Install Jenkins via RPM](https://jenkinsguide.opsre.top/basicContent/how-to-install#_4-rpm-based-installation)).
2. **Configure certificates**:
   ```sh
   mkdir -p /data/.jenkins/update-center-rootCAs
   wget https://cdn.jsdelivr.net/gh/lework/jenkins-update-center/rootCA/update-center.crt -O /data/.jenkins/update-center-rootCAs/update-center.crt
   ```
3. **Update the mirror URL**:
   ```sh
   sed -i 's#https://updates.jenkins.io/update-center.json#https://cdn.jsdelivr.net/gh/lework/jenkins-update-center/updates/huawei/update-center.json#' /data/.jenkins/hudson.model.UpdateCenter.xml
   [ -f /data/.jenkins/updates/default.json ] && rm -fv /data/.jenkins/updates/default.json
   systemctl restart jenkins
   ```

After these steps, Jenkins will install plugins rapidly via the accelerated mirror.