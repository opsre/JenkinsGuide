---
layout: home

hero:
  name: VitePress
  text: "getting-started Chinese Tutorial"
  tagline: If you want to build it, then do it with me
  image:
    src: /jenkins.svg
    alt: VitePress
  actions:
    - theme: brand
      text: Get started
      link: /getting-started
    - theme: alt
      text: GitHub
      link: https://github.com/vuejs/vitepress

features:
  - icon: 📝
    title: Focus on Your Content
    details: Effortlessly create beautiful documentation sites with just markdown.
  - icon:
      dark: /vitepress.png
      light: /vitepress-light.png
    title: Enjoy the Vite DX
    details: Instant server start, lightning fast hot updates, and leverage Vite ecosystem plugins.
  - icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"><path fill="#41b883" d="M24.4 3.925H30l-14 24.15L2 3.925h10.71l3.29 5.6 3.22-5.6Z"/><path fill="#41b883" d="m2 3.925 14 24.15 14-24.15h-5.6L16 18.415 7.53 3.925Z"/><path fill="#35495e" d="M7.53 3.925 16 18.485l8.4-14.56h-5.18L16 9.525l-3.29-5.6Z"/></svg>
    title: Customize with Vue
    details: Use Vue syntax and components directly in markdown, or build custom themes with Vue.
  - icon: 🚀
    title: Ship Fast Sites
    details: Fast initial load with static HTML, fast post-load navigation with client-side routing.
---

<HomeUnderline />

<confetti />

---

<div align="center">

```mermaid
graph LR
    A((JenkinsGuide)) --> B[基础内容]
    A --> C[自由风格，自由构建]
    A --> D[Pipeline]
    A --> E[共享库]
    A --> F[特别章节:企业私服Nexus]
    A --> G[特别章节:最佳实践深度解析]
    A --> H[特别章节:权限管理]

    B --> B1[Jenkins 的历史及发展]
    B --> B2[持续集成的概念简述]
    B --> B3[Jenkins 的几种安装方式]
    B --> B4[Jenkins根目录与内置变量概述]

    C --> C1[认识自由风格]
    C --> C2[使用自由风格构建Java和Go编译类项目]
    C --> C3[使用自由风格构建Vue和PHP静态文件发布项目]
    C --> C4[使用自由风格构建安卓APP]

    D --> D1[认识Pipeline]
    D --> D2[Pipeline语法观止]
    D --> D3[基于pipeline简单构建一个项目]
    D --> D4[pipeline结合ansible进行批量发布]

    E --> E1[认识共享库]
    E --> E2[学习一些简单的groovy语法]
    E --> E3[基于共享库的最佳实践]

    F --> F1[介绍及安装]
    F --> F2[配置各语言私服]
    F --> F3[各语言实践]

    G --> G1[回滚的最佳实践]
    G --> G2[优秀插件，如虎添翼]
    G --> G3[分布式，slave的实践]

    H --> H1[Jenkins配置openldap认证]
    H --> H2[基于Role插件控制权限的实践]
    H --> H3[结合openldap分组的权限分配]
    H --> H4[基于MySQL的权限控制思路]
click B3 "https://jenkinsguide.opsre.top/basicContent/how-to-install" _blank
```

</div>