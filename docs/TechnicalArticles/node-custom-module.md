# Node.js 是如何加载自定义模块的

## 模块路径

在介绍自定义模块的查找方式之前，需要先介绍一下模块路径这个概念。

> 模块路径是 Node 在定位文件模块的具体文件时制定的查找策略，具体表现为一个路径组成的数组

1.  可以在电脑的任意目录下创建一个 ==app.js== 文件，内容为 console.log(module.paths)
2.  然后执行 node app.js

在 Windows 下，会得到一个类似于这样的目录：

```javascript
;[
  'D:\\WebStudy\\Node.js\\深入浅出Node.js\\node_modules',
  'D:\\WebStudy\\Node.js\\node_modules',
  'D:\\WebStudy\\node_modules',
  'D:\\node_modules'
]
```

可以看出，生成规则如下：

1. 当前目录下的 node_modules 目录
2. 父目录下的 node_modules 目录
3. 父目录的父目录下的 node_modules 目录
4. 沿路径向上逐级递归，直到根目录下的 node_modules 目录

## 扩展名分析

在通过 require 引入时，有时候会没有指定扩展名，例如 require('app')。这种情况下，Node 会按.js、.json、.node 的次序补足扩展名，然后按照模块路径，依次尝试。查找结果可能有两种，一种是查找到文件，一种是得到一个目录。

### 一、查找到文件

这里我们实现直接查找到文件的情况。

1.  新建 app.js ，内容为：require(‘test’)，并且在同层级新建 node_modules-> test.js ，在 test.js 中打印 ：console.log('test.js 被加载了')，目录结构如下：

    ![1.png](/node-custom-module/1.png)

    在这里，执行 node app.js ，执行 require(‘test’) 会补足扩展名 test 为 test.js 然后按照模块路径进行查找。在当前目录找到了 node_modules 并在 node_modules 中查找 test.js，找到之后开始编译加载，test.js 中的文字会被打印。

### 二、查找到目录

如果查找到目录，Node 会遵循 CommonJS 规范，去目录中查找 package.json 文件：

1. 找到 package.json ，取出其中的 main 属性指定的文件名进行定位。如果文件名缺少扩展名，将会进入扩展名分析的步骤。这是文件目录：

   ![2.png](/node-custom-module/2.png)

```javascript
// package.json
{
    "main": "test"
}
```

2. 没有 package.json ，Node 将会将 index 当作默认文件名，然后依次查找 index.js 、index.json、index.node。
   将 test.js 和 package.json 删除，然后新建 index.js

   ![3.png](/node-custom-module/3.png)
