# Jenkins 的插件管理


## 前言介绍

同许多软件系统一样，Jenkins 也拥有强大且丰富的生态系统，项目早在 Hudson 阶段，就已支持了通过插件扩展功能的能力。2011年 Jenkins 从 Hudson 分叉后，继承了这一机制并持续完善。

现在通过查看相对古早的插件 [Maven](https://plugins.jenkins.io/maven-plugin/) 的版本更新历史，可以看到该插件最早的一个版本，发布自 2010 年 12 月 18 日：

![](https://t.eryajf.net/ghimgs/jenkinsGuide/1d4d82035e608316952694d0de66fc27.png)

对于当下混迹于互联网中的技术人来讲，可谓是上古时期了。

另外，在 Jenkins 官方统计中，目前已累计有 2000+ 个插件，涵盖各种技术场景，生态不可谓不丰富。

那么对这些历史悠长，生态强大的插件的管理及运用，也就显得格外重要了，这也会彰显一个运维人(Jenkins 当然并不独属于运维，但假如你的职业角色并不是运维，但也在使用或者维护 Jenkins，那么，此刻的你，就是一名运维人)运维素养。在这里，我认为历史悠久，生态强大更像是一个中性词，而非褒义词。

## 一句箴言

本文关于插件，并不会过多介绍，只分享两个内容：

一句箴言：当你的 Jenkins 版本与插件版本契合并且功能都满足使用的情况下，除非有阻断性问题，否则不要升级，避免因为插件兼容性带来的不可预知问题。

出现这种问题，通常也没有标准解决方案，这也是大多数拥有插件生态的软件所存在的共性问题。

## 一个技巧

Jenkins 的插件安装以及升级，某些时候针对一些网络环境来讲，还是比较耗费时间的，这里就来介绍一下，如何通过一些镜像来做加速。

插件的安装，有两种形式，一种是下载 `hpi` 格式的插件文件，通过上传插件文件进行安装。当然也可以直接填入插件的地址，然后进行部署安装。

![](https://t.eryajf.net/ghimgs/jenkinsGuide/03c943b1bfa5942d02a4d0ff875f64c6.png)

一种是在插件市场搜索想要安装的插件，进行安装。但这种方式存在的问题是，插件源默认是 Jenkins 的官方地址，国内访问时受网络因素影响比较考研人品。

要查看你的 Jenkins 当前所用地址，可在 Jenkins 的家目录查看：

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

Jenkins 启动之后，执行完初始化，会把如上 URL 中的数据持久化到本地的 `updates/default.json`  文件中。

在安装篇中，我介绍过你可以走国内镜像，一般来讲，国内的 Jenkins 镜像除了安装包之外，同时也会把 Jenkins 的插件安装包镜像下来。

如何让下载更新走镜像的地址呢，这里有一个不错的开源项目，对所需的资源进行了很好的封装：[jenkins-update-center](https://github.com/lework/jenkins-update-center)，经过测速之后，选择一个合适自己的源，配置到代理中：

![](https://t.eryajf.net/ghimgs/jenkinsGuide/0e04bf4b64b00a93c9ca3c552eb90458.png)

假如你的 Jenkins 服务器，访问 jsdelivr 也有些困难，那可以把该 json 下载下来，放到公司的 cdn 上，然后更改为对应地址。更改之后，你可以尝试去安装一个插件，会发现速度飞快了。

## 安装时加速

Jenkins 首次安装时，会有一个安装官方推荐插件的步骤，在这一步如何设置呢？

首先安装好 Jenkins，参考：[使用 rpm 方式安装 Jenkins](https://jenkinsguide.opsre.top/basicContent/how-to-install#_4-%E5%9F%BA%E4%BA%8E-rpm-%E5%8C%85%E5%AE%89%E8%A3%85) 这里不多赘述。

配置认证证书：

```sh
mkdir -p /data/.jenkins/update-center-rootCAs
wget https://cdn.jsdelivr.net/gh/lework/jenkins-update-center/rootCA/update-center.crt -O /data/.jenkins/update-center-rootCAs/update-center.crt
```

修改加速地址：

```sh
sed -i 's#https://updates.jenkins.io/update-center.json#https://cdn.jsdelivr.net/gh/lework/jenkins-update-center/updates/huawei/update-center.json#' /data/.jenkins/hudson.model.UpdateCenter.xml

[ -f /data/.jenkins/updates/default.json ] && rm -fv /data/.jenkins/updates/default.json

systemctl restart jenkins
```

然后再安装 Jenkins 插件即可实现加速效果。