// nav导航栏配置
export const Nav = [
  { text: '首页', link: '/' },
  {
    text: '🍉 指南',
    items: [
      {
        text: '基础内容',
        items: [
          { text: 'Jenkins的几种安装方式', link: '/pages/b1850f' },
          { text: 'Jenkins根目录与内置变量概述', link: '/pages/20be5f' },
          { text: 'Jenkins插件管理', link: '/pages/accb67' },
        ],
      },
      {
        //分组标题1
        text: '自由风格',
        items: [
          { text: '认识自由风格', link: '/pages/6f769c' },
        ],
      },
      {
        //分组标题1
        text: 'pipeline',
        items: [
          { text: '认识pipeline', link: '/pages/39767f' },
          { text: 'pipeline语法观止', link: '/pages/ce3667' },
        ],
      },
    ],
  },
  { text: '📝 我的博客', link: 'https://wiki.eryajf.net' },
];
