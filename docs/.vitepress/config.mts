import { defineConfig } from "vitepress";
import { defineTeekConfig } from "vitepress-theme-teek/config";
// import "vitepress-theme-teek/index.css";
import {
  groupIconMdPlugin,
  groupIconVitePlugin,
} from "vitepress-plugin-group-icons"; // 导入代码组图标插件
import timeline from "vitepress-markdown-timeline"; // 导入时间线插件

import { Features } from "./config/Features"; // 导入Features模块
import { FriendLink } from "./config/FriendLink"; // 导入FriendLink模块
import { HitokotoDate } from "./config/HitokotoDate"; // 导入HitokotoData模块
import { Nav } from "./config/Nav"; // 导入Nav模块
// import { SocialDate } from "./config/SocialDate"; // 导入SocialDate社交信息模块
// import { Wallpaper } from "./config/Wallaper"; // 导入Wallaper模块

const description = ["Jenkins全知全解"].toString();

const tkConfig = defineTeekConfig({
  author: { name: "eryajf", link: "https://github.com/eryajf" },
  tkTheme: true, // 是否使用tk主题
  anchorScroll: true, // 是否启用锚点滚动
  viewTransition: true, // 是否启用页面切换动画
  codeBlock: true, // 是否启用代码块动画
  themeSetting: {
    useThemeStyle: true, // 是否启用主题风格，如果为 false，则不会显示切换按钮
    themeStyle: "vp-default", // 设置当前主题风格
    useThemeSize: true, // 是否使用主题尺寸切换功能
    themeSize: "default", // 设置当前主题尺寸
  }, // 右下角的主题设置配置
  bgColor: [
    "#e74c3c",
    "#409EFF",
    "#DAA96E",
    "#0C819F",
    "#27ae60",
    "#ff5c93",
    "#fd726d",
    "#f39c12",
    "#9b59b6",
  ], // 主题背景颜色

  // blogger: {
  //   // 博主信息，显示在首页侧边栏
  //   avatar:
  //     "https://testingcf.jsdelivr.net/gh/Kele-Bingtang/static/user/avatar1.png",
  //   avatarStyle: "full",
  //   name: "天客",
  //   slogan: "朝圣的使徒，正在走向编程的至高殿堂！",
  // },
  docAnalysis: {
    createTime: "2025-02-12",
    statistics: {
      provider: "busuanzi",
    },
    wordCount: true,
    readingTime: true,
    overrideInfo: [
      {
        key: "lastActiveTime",
        value: (_, currentValue) => `${currentValue}前`,
      },
      { key: "totalPosts", label: "文章总数目" },
    ],
    appendInfo: [{ key: "index", label: "序号", value: "天客 99" }],
  },
  // banner: {
  //   // features: Features, //用于在首页展示一些功能介绍,也就是首页三个功能块
  //   enabled: true,
  //   bgStyle: "fullImg", // Banner 背景风格：pure 为纯色背景，partImg 为局部图片背景，fullImg 为全屏图片背景
  //   imgInterval: 8000, // 轮播时间
  //   imgShuffle: true, // 当多张大图时（imgSrc 为数组），设置切换时间，单位：毫秒
  //   imgSrc: Wallpaper, // Banner 大图
  //   descStyle: "types", //打字机效果；types 为文字打印风格，switch 为文字切换风格
  //   maskBg: "rgba(0, 0, 0, 0.4)", // Banner 大图遮罩颜色，如果为数字，则是 rgba(0, 0, 0, ${maskBg})，如果为字符串，则作为背景色
  //   textColor: "#ffffff", // Banner 字体颜色，bgStyle 为 default 时为 '#000000'，其他为 '#ffffff'
  //   titleFontSize: "3.2rem", // 标题字体大小
  //   descFontSize: "1.4rem", // 描述字体大小
  //   // descStyle: "types", // 描述信息风格：default 为纯文字渲染风格（如果 description 为数组，则取第一个），types 为文字打印风格，switch 为文字切换风格
  //   description: HitokotoDate, // 打字机描述信息
  //   switchTime: 4000, // 描述信息切换间隔时间，单位：毫秒。descStyle 为 switch 时生效
  //   switchShuffle: false, // 描述信息是否随机切换，为 false 时按顺序切换。descStyle 为 switch 时生效
  //   typesInTime: 200, // 输出一个文字的时间，单位：毫秒。descStyle 为 types 时生效
  //   typesOutTime: 100, // 删除一个文字的时间，单位：毫秒。descStyle 为 types 时生效
  //   typesNextTime: 800, // 打字与删字的间隔时间，单位：毫秒。descStyle 为 types 时生效
  //   typesShuffle: false, // 描述信息是否随机打字，为 false 时按顺序打字，descStyle 为 types 时生效
  // },
  // bodyBgImg: {
  //   imgSrc: ["/img/bg1.jpg", "/img/bg2.png"],
  //   bannerStyle: "full",
  // },

  // 首页顶部按 F11 开启壁纸模式
  // wallpaper: {
  //   enabled: true, // 是否启用壁纸模式
  //   hideBanner: false, // 开启壁纸模式后，全屏是否显示打字机文案，
  //   hideMask: true, // 开启壁纸模式后，是否隐藏 Banner 或 bodyBgImage 的遮罩层，则确保 banner.mask 和 bodyBgImage.mask 为 true 才生效
  //   hideWaves: false, // 开启壁纸模式后，是否隐藏 Banner 波浪组件，仅 banner.bgStyle = 'fullImg' 生效
  // },
  // page: {
  //   pageSize: 10, // 每页显示的文章数量
  // },
  // post: {
  //   coverImgMode: "full", // 封面大图
  //   imageViewer: { hideOnClickModal: true }, // 图片预览是否点击遮罩层关闭}
  // },

  article: {
    imageViewer: { hideOnClickModal: true }, // 图片预览是否点击遮罩层关闭}
    topTip: (frontmatter) => {
      const tip: Record<string, string> = {
        type: "warning",
        title: "注意",
        text: "文章发布较早，内容可能过时，阅读注意甄别。",
      };

      // frontmatter.long 为 true，则添加提示
      if (frontmatter.long) return tip;

      // frontmatter.date 大于半年，则添加提示
      const longTime = 6 * 30 * 24 * 60 * 60 * 1000;
      if (
        frontmatter.date &&
        Date.now() - new Date(frontmatter.date).getTime() > longTime
      )
        return tip;
    },
    showUpdateDate: true, // 是否展示更新日期，仅在文章页显示
  },

  // friendLink: FriendLink, // 友链配置

  footerInfo: {
    // topMessage: ["这是一条测试信息"],
    // bottomMessage: ["上面的内容和图标都可以修改（本条内容也可以隐藏的）"],
    copyright: {
      createYear: 2025,
      suffix: "Eryajf",
    },
    icpRecord: {
      name: "浙ICP备18057030号",
      link: "http://beian.miit.gov.cn/",
    },
    customHtml: `<p>小破站已运行了 <span id="footer-runtime"></span></p>`, // 搭配 ./theme/helper/useFooterRuntime.ts 使用才有效果
  },
  // social: SocialDate, //社交信息配置
  comment: {
    provider: "giscus",
    // provider: "twikoo",
    options: {
      // twikoo 配置，官网：https://twikoo.js.org/
      // envId: "https://twikoo.seasir.top/",
      // link: "https://cdn.jsdelivr.net/npm/twikoo@1.6.41/dist/twikoo.all.min.js",

      // waline 配置，官网：https://waline.js.org/
      // serverURL: "https://tk.waline.youngkbt.cn/",
      // jsLink: "https://unpkg.com/@waline/client@v3/dist/waline.js",
      // cssLink: "https://unpkg.com/@waline/client@v3/dist/waline.css",

      // giscus 配置，官网：https://giscus.app/zh-CN
      repo: 'opsre/JenkinsGuide', //仓库
      repoId: 'R_kgDON4RvxA', //仓库ID
      category: 'General', // 讨论分类
      categoryId: 'DIC_kwDOGYFl1M4CayLN', //讨论分类ID
      mapping: 'pathname',
      inputPosition: 'bottom',
      lang: 'zh-CN',

      // artalk 配置，官网：https://artalk.js.org/
      // server: "",
      // site: "",
    },
  },
  // notice: {
  //   enabled: false,
  //   position: "center",
  // },
  vitePlugins: {
    sidebar: true, // 是否启用侧边栏插件
    sidebarOption: {
      initItems: true, //这条命令注释后，才会让文档和目录的样式保持一致
      collapsed: true, //打开侧边栏自动收缩功能
    },
    autoFrontmatter: true, // 自动生成 frontmatter
  },

  markdown: {
    config: (md) => {
      md.use(timeline); //时间线插件
      md.use(groupIconMdPlugin); // 代码组图标插件
    },
  },
});

// https://vitepress.dev/reference/site-config
export default defineConfig({
  extends: tkConfig,
  base: "/",
  title: "JenkinsGuide",
  description: description,
  cleanUrls: true,
  lastUpdated: true,
  lang: "zh-CN",
  head: [
    ["meta", { name: "author", content: "eryajf" }],
    [
      "meta",
      {
        name: "viewport",
        content:
          "width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no",
      },
    ],
    [
      "meta",
      {
        name: "description",
        description,
      },
    ],
    ["meta", { name: "keywords", description }],
    ["link", { rel: "icon", href: "/favicon.ico", type: "image/png" }],
    [
      "link",
      {
        rel: "stylesheet",
        href: "//at.alicdn.com/t/font_2989306_w303erbip9.css",
      },
    ], // 阿里在线矢量库
  ],
  markdown: {
    // 开启行号
    lineNumbers: true,
    image: {
      // 默认禁用；设置为 true 可为所有图片启用懒加载。
      lazyLoading: true,
    },
    // 更改容器默认值标题
    container: {
      tipLabel: "提示",
      warningLabel: "警告",
      dangerLabel: "危险",
      infoLabel: "信息",
      detailsLabel: "详细信息",
    },
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "/favicon.ico",
    darkModeSwitchLabel: "主题",
    sidebarMenuLabel: "菜单",
    returnToTopLabel: "返回顶部",
    lastUpdatedText: "上次更新时间",
    outline: {
      level: [2, 6],
      label: "本页导航",
    },
    docFooter: {
      prev: "上一页",
      next: "下一页",
    },
    nav: Nav, // 导航栏配置
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/opsre/JenkinsGuide",
      },
    ],

    search: {
      provider: "local",
    },
    editLink: {
      text: "在 GitHub 上编辑此页",
      pattern:
        "https://github.com/opsre/JenkinsGuide/edit/main/docs/:path",
    },
  },

  vite: {
    plugins: [
      groupIconVitePlugin(), //代码组图标
    ],
    server: {
      open: true, // 运行后自动打开网页
    },
    build: {
      chunkSizeWarningLimit: 1500, // 限制警告的块大小
    },
  },
});
