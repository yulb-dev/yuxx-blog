import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/yuxx-blog/',
  lang: 'en-zh',
  title: 'yxx-blog',
  description: 'yuxx个人博客',
  themeConfig: {
    logo: '/RoundCorner3.png',
    outline: {
      label: '本页目录'
    },
    darkModeSwitchLabel: '主题',
    sidebarMenuLabel: '菜单',
    nav: [
      { text: '首页', link: '/' },
      {
        text: '更多',
        items: [
          { text: '技术文章', link: '/TechnicalArticles/' },
          { text: '实用网站收集', link: '/Websites/' }
        ]
      }
    ],

    sidebar: {
      '/TechnicalArticles/': [
        {
          text: 'Examples',
          items: [
            {
              text: 'useState 在 React 中是如何工作的',
              link: '/TechnicalArticles/use-state'
            },
            { text: 'ES6模块 和 CommonJS 的区别', link: '/TechnicalArticles/module' },
            {
              text: 'Node 如何加载自定义模块',
              link: '/TechnicalArticles/node-custom-module'
            },
            { text: '自定义Promise', link: '/TechnicalArticles/custom-promise' }
          ]
        }
      ]
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/yulb-dev/yuxx-blog' }],
    lastUpdated: {
      text: 'Updated at',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium'
      }
    },
    docFooter: {
      prev: '上一页',
      next: '下一页'
    }
  }
})
