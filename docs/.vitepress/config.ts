import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/yuxx-blog/',
  lang: 'en-zh',
  title: 'yxx-blog',
  description: 'yuxx 个人博客',
  themeConfig: {
    logo: '/RoundCorner3.png',
    outline: {
      label: '本页目录'
    },
    darkModeSwitchLabel: '主题',
    sidebarMenuLabel: '菜单',
    search: {
      provider: 'local',
      options: {
        locales: {
          zh: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换'
                }
              }
            }
          }
        }
      }
    },
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
          text: 'JavaScript',
          collapsed: false,
          items: [
            {
              text: 'useState 在 React 中是如何工作的',
              link: '/TechnicalArticles/use-state'
            },
            {
              text: 'ES6 模块 和 CommonJS 的区别',
              link: '/TechnicalArticles/module'
            },
            {
              text: 'Node.js 是如何加载自定义模块的',
              link: '/TechnicalArticles/node-custom-module'
            },
            {
              text: '自定义Promise',
              link: '/TechnicalArticles/custom-promise'
            },
            {
              text: '通过原型理解 javascript 中 new 命令的原理',
              link: '/TechnicalArticles/new'
            },
            {
              text: '通过原生表单或 ajax，实现 node.js 中的文件上传',
              link: '/TechnicalArticles/node-file-upload'
            },
            {
              text: '使用 js 实现预览上传的图片',
              link: '/TechnicalArticles/preview-img'
            },
            {
              text: '浏览器中针对 Promise 所引发的执行顺序问题',
              link: '/TechnicalArticles/discuss-promise'
            },
            {
              text: 'js 判断数据类型的几种方法',
              link: '/TechnicalArticles/data-type'
            },
            {
              text: 'js 中的事件传播',
              link: '/TechnicalArticles/event'
            },
            {
              text: 'test',
              link: '/TechnicalArticles/api-examples'
            }
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
