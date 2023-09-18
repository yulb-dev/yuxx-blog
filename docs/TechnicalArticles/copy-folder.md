# 使用 node.js 复制文件夹

## fsPromises.cp

使用 fsPromises.cp 将整个目录结构从 src 异步地复制到 dest，包括子目录和文件。

> v16.7.0：fsPromises.cp(src, dest[, options])

1. src：要复制的源路径
2. dest：要复制到的目标路径
3. options：[详见](https://nodejs.cn/api/fs.html#fspromisescpsrc-dest-options)

```javascript
import path from 'path'
import fs from 'fs/promises'

const source = path.resolve('paste')
const destination = path.resolve('destination')
// recursive：递归复制目录
await fs.cp(source, destination, { recursive: true })
console.log('ok')
```

## 其他方法

> 在 v16.7.0 版本之前，node 是没有复制整个文件夹的方法的

需要用到的 fs 模块方法：

1. fsPromises.readdir(path[, options])：读取目录的内容
2. fsPromises.copyFile(src, dest[, mode])：异步地将 src 复制到 dest
3. fsPromises.mkdir(path[, options])：异步地创建目录

```javascript
import path from 'path'
import fs from 'fs/promises'

const { resolve } = path
const source = resolve('paste')
const destination = resolve('destination')

async function copyFolder(source, destination) {
  const files = await fs.readdir(source, { withFileTypes: true })
  files.forEach(async (file) => {
    const fileName = file.name
    const sourcePath = resolve(source, fileName)
    const targetPath = resolve(destination, fileName)
    // 如果是文件，直接复制
    if (file.isFile()) {
      fs.copyFile(sourcePath, targetPath)
    }
    //  如果是文件夹，先创建文件夹在复制
    if (file.isDirectory()) {
      await fs.mkdir(targetPath)
      copyFolder(sourcePath, targetPath)
    }
  })
}
copyFolder(source, destination)
```
