import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  ignoreDeadLinks: "localhostLinks",
  base: "/yuxx-blog/",
  lang: "en-zh",
  title: "yxx-blog",
  description: "yuxx 个人博客",
  themeConfig: {
    logo: "/logo.png",
    outline: {
      label: "本页目录",
    },
    darkModeSwitchLabel: "主题",
    sidebarMenuLabel: "菜单",
    search: {
      provider: "local",
      options: {
        translations: {
          button: {
            buttonText: "搜索",
            buttonAriaLabel: "搜索文档",
          },
          modal: {
            noResultsText: "无法找到相关结果",
            resetButtonTitle: "清除查询条件",
            footer: {
              selectText: "选择",
              navigateText: "切换",
              closeText: "关闭",
            },
          },
        },
      },
    },
    nav: [
      { text: "首页", link: "/" },
      {
        text: "更多",
        items: [
          { text: "技术文章", link: "/TechnicalArticles/React/use-state" },
          { text: "实用网站收集", link: "/Websites/" },
          { text: "关于我", link: "/AboutMe/" },
        ],
      },
    ],

    sidebar: {
      TechnicalArticles: [
        {
          text: "CSS",
          collapsed: true,
          items: [
            {
              text: "元素水平垂直居中的方法",
              link: "/TechnicalArticles/css/center-aligned",
            },
            {
              text: "两栏、三栏自适应布局",
              link: "/TechnicalArticles/css/adaptive-layout",
            },
            {
              text: "详解浏览器的回流和重绘",
              link: "/TechnicalArticles/css/reflow-repaint",
            },
            {
              text: "CSS 性能优化",
              link: "/TechnicalArticles/css/css-performance-optimization",
            },
          ],
        },
        {
          text: "JavaScript",
          collapsed: true,
          items: [
            {
              text: "ES6 模块 和 CommonJS 的区别",
              link: "/TechnicalArticles/module",
            },
            {
              text: "Node.js 是如何加载自定义模块的",
              link: "/TechnicalArticles/node-custom-module",
            },
            {
              text: "自定义Promise",
              link: "/TechnicalArticles/custom-promise",
            },
            {
              text: "通过原型理解 javascript 中 new 命令的原理",
              link: "/TechnicalArticles/new",
            },
            {
              text: "通过原生表单或 ajax，实现 node.js 中的文件上传",
              link: "/TechnicalArticles/node-file-upload",
            },
            {
              text: "使用 js 实现预览上传的图片",
              link: "/TechnicalArticles/preview-img",
            },
            {
              text: "浏览器中针对 Promise 所引发的执行顺序问题",
              link: "/TechnicalArticles/discuss-promise",
            },
            {
              text: "js 判断数据类型的几种方法",
              link: "/TechnicalArticles/data-type",
            },
            {
              text: "js 中的事件传播",
              link: "/TechnicalArticles/event",
            },
            {
              text: "使用 ajax 和 promise 实现简易 axios",
              link: "/TechnicalArticles/ajax-promise",
            },
            {
              text: "javascript 实现深拷贝",
              link: "/TechnicalArticles/deep-clone",
            },
            {
              text: "使用 node.js 复制文件夹",
              link: "/TechnicalArticles/copy-folder",
            },
            {
              text: "JavaScript 性能优化",
              link: "/TechnicalArticles/javascript-performance-optimization",
            },
            // {
            //   text: '浏览器的工作原理',
            //   link: '/TechnicalArticles/browsers-work',
            // },
          ],
        },
        {
          text: "vue",
          collapsed: true,
          items: [
            {
              text: "为什么不建议 v-if 和 v-for 同时使用",
              link: "/TechnicalArticles/vue/v-if&v-for",
            },
            {
              text: "vue3 中的 ref 做了什么",
              link: "/TechnicalArticles/vue/vue3-ref",
            },
          ],
        },
        {
          text: "React",
          collapsed: true,
          items: [
            {
              text: "useState 在 React 中是如何工作的",
              link: "/TechnicalArticles/React/use-state",
            },
            {
              text: "react + pdfjs 实现预览 pdf 文件",
              link: "/TechnicalArticles/React/pdf-preview",
            },
            {
              text: "nextjs 实现文件上传 rest-api",
              link: "/TechnicalArticles/React/nextjs-upload",
            },
            {
              text: "封装 AspectFitImg",
              link: "/TechnicalArticles/React/aspect-fit",
            },
            {
              text: "使用 x6 实现展开收起的节点",
              link: "/TechnicalArticles/React/expand-flow",
            },
            {
              text: "React Router7 面包屑hook",
              link: "/TechnicalArticles/React/useBreadcrumbItems",
            },
            {
              text: "react + nest.js 身份验证/授权",
              link: "/TechnicalArticles/React/nest-auth",
            },
          ],
        },
        {
          text: "rust",
          collapsed: true,
          items: [
            {
              text: "寻找中位数和众数—基于rust",
              link: "/TechnicalArticles/rust/median_mode",
            },
            // {
            //   text: '通讯录管理系统—基于rust',
            //   link: '/TechnicalArticles/rust/median_mode',
            // },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/yulb-dev/yuxx-blog" },
    ],
    // lastUpdated: {
    //   text: 'Updated at',
    //   formatOptions: {
    //     dateStyle: 'full',
    //     timeStyle: 'medium'
    //   }
    // },
    docFooter: {
      prev: "上一页",
      next: "下一页",
    },
  },
});
