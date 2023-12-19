const webList = [
  {
    name: 'HTML + CSS',
    item: [
      {
        name: 'HTML教程',
        href: 'https://wangdoc.com/html/',
        details: '网道 HTML 教程',
      },
      {
        name: 'HTML + CSS 教程',
        href: 'https://developer.mozilla.org',
        details: 'MDN',
      },
      {
        name: 'CSS教程',
        href: 'https://www.w3school.com.cn/css/index.asp',
        details: 'w3school CSS 教程',
      },
      {
        name: 'viewport',
        href: 'https://www.cnblogs.com/2050/p/3877280.html',
        details: '移动前端开发之viewport的深入理解',
      },
    ],
  },
  {
    name: 'JavaScript',
    item: [
      {
        name: '网道 JavaScript 教程',
        href: 'https://wangdoc.com/javascript/',
        details: '网道 JavaScript 教程',
      },
      {
        name: '现代 JavaScript 教程',
        href: 'https://zh.javascript.info/',
        details: '讲解从基础到高阶的 JavaScript 相关知识',
      },
      {
        name: 'MDN JavaScript教程',
        href: 'https://developer.mozilla.org/zh-CN/docs/Web/JavaScript',
        details: 'MDN JavaScript教程',
      },
      {
        name: 'Axios',
        href: 'https://axios-http.com/zh/',
        details: '基于 promise 的网络请求库',
      },
      {
        name: 'ES6 标准入门',
        href: 'https://wangdoc.com/es6/',
        details: 'ES6 标准入门',
      },
      {
        name: 'TypeScript',
        href: 'https://ts.nodejs.cn/',
        details: 'ts 官方文档社区翻译版',
      },
    ],
  },
  {
    name: 'Node.js',
    item: [
      {
        name: 'Node.js 官方文档',
        href: 'https://nodejs.org/zh-cn',
        details: 'Node.js官方文档',
      },
      {
        name: 'Node.js 中文网',
        href: 'https://nodejs.org/zh-cn',
        details: 'Node.js 中文网',
      },
      {
        name: 'Express 中文网',
        href: 'https://express.nodejs.cn/',
        details: '快速、独立、极简的 Node.js Web 框架。',
      },
      {
        name: 'Socket.IO',
        href: 'https://socket.io/zh-CN/',
        details: '适用于每个平台的双向且低延迟的通信',
      },
      {
        name: 'Nest.js 中文网',
        href: 'https://nest.nodejs.cn/',
        details: '一个用于构建高效、可扩展的 Node.js 服务器端应用的框架',
      },
      {
        name: 'Mongoose 中文网',
        href: 'https://mongoose.nodejs.cn/',
        details: '优雅的 MongoDB 对象建模，适用于 Node.js',
      },
      {
        name: 'Prisma',
        href: 'https://mongoose.nodejs.cn/',
        details: '下一代 Node.js 和 TypeScript ORM',
      },
      {
        name: 'Node.js 最佳实践',
        href: 'https://github.com/goldbergyoni/nodebestpractices/blob/master/README.chinese.md',
        details: 'Node.js 最佳实践',
      },
    ],
  },
  {
    name: 'Vue',
    item: [
      {
        name: 'Vue.js',
        href: 'https://cn.vuejs.org/',
        details: '渐进式 JavaScript 框架',
      },
      {
        name: 'Vue Router',
        href: 'https://router.vuejs.org/zh/',
        details: '为 Vue.js 提供富有表现力、可配置的、方便的路由',
      },
      {
        name: 'Pinia',
        href: 'https://pinia.vuejs.org/zh/',
        details: '符合直觉的 Vue.js 状态管理库',
      },
      {
        name: 'Nuxt',
        href: 'https://nuxt.com/',
        details: '使用 Vue 3 创建全栈 web 应用程序和网站',
      },
      {
        name: 'element-plus',
        href: 'https://element-plus.org',
        details: 'Element 团队制作的 Vue.js 3 UI库',
      },
      {
        name: 'ant-design-vue',
        href: 'https://antdv.com/components/overview-cn',
        details: '一个基于 Ant Design 和 Vue 的企业级UI组件',
      },
      {
        name: 'Vant',
        href: 'https://vant-contrib.gitee.io/vant/#/zh-CN/',
        details: '轻量、可定制的移动端 Vue 组件库',
      },
    ],
  },
  {
    name: 'React',
    item: [
      {
        name: 'React',
        href: 'https://zh-hans.react.dev/',
        details: 'React.js 官方中文文档',
      },
      {
        name: 'React Router',
        href: 'https://reactrouter.com/',
        details: 'React 的一个轻量级、功能齐全的路由库',
      },
      {
        name: 'Redux',
        href: 'https://redux.nodejs.cn/',
        details: 'React 状态管理库',
      },
      {
        name: 'Next.js',
        href: 'https://nextjs.org/',
        details: '使用 React 构建全栈 web 应用程序',
      },
      {
        name: 'Ant Design',
        href: 'https://ant.design/index-cn',
        details: 'React UI 库',
      },
      {
        name: 'Material UI',
        href: 'https://mui.com/material-ui/',
        details: '谷歌出品 React UI 库',
      },
      {
        name: 'React TypeScript 备忘单',
        href: 'https://react-typescript-cheatsheet.netlify.app/',
        details: '经验丰富的 React 开发人员入门 TypeScript 的备忘单',
      },
    ],
  },
  {
    name: '构建、打包',
    item: [
      {
        name: 'webpack',
        href: 'https://webpack.docschina.org',
        details: '用于现代 JavaScript 应用程序的 静态模块打包工具',
      },
      {
        name: 'vite',
        href: 'https://cn.vitejs.dev/',
        details: '下一代的前端工具链',
      },
      {
        name: 'Parcel',
        href: 'https://parceljs.org/',
        details: '用于 web 的零配置构建工具',
      },
    ],
  },
  {
    name: '跨端开发',
    item: [
      {
        name: 'Taro',
        href: 'https://taro.zone/',
        details: '开放式跨端跨框架解决方案',
      },
      {
        name: 'Ionic',
        href: 'https://ionicframework.com/',
        details: '强大的跨平台UI工具包',
      },
      {
        name: 'Flutter',
        href: 'https://flutter.cn/',
        details: 'Google 开源的构建用户界面（UI）工具包',
      },
      {
        name: 'React Native',
        href: 'https://www.reactnative.cn/',
        details: '使用 React 构建原生应用程序的框架',
      },
      {
        name: 'Electron',
        href: 'https://electronjs.org/',
        details: '使用 JavaScript、HTML 和 CSS 构建跨平台桌面应用程序',
      },
      {
        name: 'Tauri',
        href: 'https://tauri.app/',
        details: '使用web前端构建更小、更快、更安全的桌面应用程序。',
      },
    ],
  },
  {
    name: '其他技术文档',
    item: [
      {
        name: '前后端所有鉴权方案',
        href: 'https://mp.weixin.qq.com/s/UA0AOJjw39f9993R_X5cgw',
        details: '',
      },
      {
        name: '浏览器的工作原理',
        href: 'https://developer.mozilla.org/zh-CN/docs/Web/Performance/How_browsers_work',
        details: '',
      },
    ],
  },
  {
    name: '其他',
    item: [
      {
        name: 'VSCode 插件推荐',
        href: 'https://mp.weixin.qq.com/s/DCuZLSCijXAzIQpOrdbZpA',
        details: '2023年最新最全 VSCode 插件推荐',
      },
      {
        name: 'iconfont',
        href: 'https://www.iconfont.cn/',
        details: '阿里妈妈MUX倾力打造的矢量图标管理、交流平台',
      },
      {
        name: 'wallhaven',
        href: 'https://wallhaven.cc/',
        details: '网络上最好的壁纸',
      },
    ],
  },
]

export default webList
