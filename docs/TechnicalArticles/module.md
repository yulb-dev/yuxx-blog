# ES6模块 和 CommonJS 的区别

1. CommonJS 模块的顶层 this 指向当前模块，ES6 模块中，顶层的 this 指向 undefined
2. CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用：

CommonJs 模块：
```javascript
// a.js
let num = 0
function changeNum() {
  num++
}

module.exports = {
  num, // num是一个原始类型的值,0
  changeNum,
}
```
```javascript
// b.js
const app = require('./a.js')

console.log(app.num) // 0
app.changeNum()
console.log(app.num) // 0
```

ES6 模块：
```javascript
// a.js
let num = 0
function changeNum() {
  num++
}

export { num, changeNum }  // num 是一个引用，永远指向 num
```

```javascript
// b.js
import { num, changeNum } from './a.js'

console.log(num) // 0
changeNum()
console.log(num) // 1
```

3. CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。
> CommonJS 加载的是一个对象（即module.exports属性），该对象只有在脚本运行完才会生成。而 ES6
> 模块不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就会生成。

由于这个特性，使得 CommonJS 加载模块时可以写在代码语句中：

```javascript
let data = 1
if (data > 0) {
  const { num } = require('./a.js')
  console.log(num) // 0
}
```
同样的写法，在 ES6 模块 中则会报错，因为它不依赖于代码的执行，而是在静态解析阶段就会生成。

4. CommonJS 模块的require()是同步加载模块，ES6 模块的 import 命令是异步加载，有一个独立的模块依赖的解析阶段。