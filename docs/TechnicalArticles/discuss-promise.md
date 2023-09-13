# 浏览器中针对 Promise 所引发的执行顺序问题

> 在阅读本章前，请确认你已经掌握了基本的 Promise 用法

## promise 例子

**先来看一个简单的例子**

```javascript
new Promise((resolve, reject) => {
  resolve()
}).then((value) => {
  console.log('Promise 1')
})

console.log('log 1')
/*
    执行结果：
    log 1
    Promise 1
*/
```

为什么会先执行 `console.log('log 1')` ？如果你了解过浏览器的事件循环机制，你会知道，这是因为 Promise 实例的 `.then` 里的回调并不会立即执行，而会被添加到异步队列等待执行。

接下来我们再来添加一点代码：

```javascript
new Promise((resolve, reject) => {
  resolve()
}).then((value) => {
  console.log('Promise 1')
})

new Promise((resolve, reject) => {
  resolve()
}).then((value) => {
  console.log('Promise 2')
})

console.log('log 1')
/*
    执行结果：
    log 1
    Promise 1
    Promise 2
    */
```

同样的原因，两个 Promise 实例的`.then`里的回调函数被依次添加到了异步队列，根据先进先出的原则，所以会先打印`Promise 1`然后是`Promise 2`

接下来，我们利用 Promise 的链式调用，再来添加一些代码

```javascript
new Promise((resolve, reject) => {
  resolve()
})
  .then((value) => {
    console.log('Promise 1')
    return Promise.resolve()
  })
  .then(() => {
    console.log('Promise 3')
  })

new Promise((resolve, reject) => {
  resolve()
})
  .then((value) => {
    console.log('Promise 2')
    return Promise.resolve()
  })
  .then(() => {
    console.log('Promise 4')
  })

console.log('log 1')
/*
    执行结果：
    log 1
    Promise 1
    Promise 2
    Promise 3
    Promise 4
    */
```

这看起来好像并不难，他的执行顺序似乎在我们预料之中，但我发现，通过他的执行顺序，又引发了一个新的思考,我们可以改写一下这个代码，使他们等价：

```javascript
let p1 = new Promise((resolve, reject) => {
  resolve()
})
let p3 = p1.then((value) => {
  console.log('Promise 1')
  return Promise.resolve()
  // 等价于
  //return new Promise(resolve => resolve())
})
p3.then(() => {
  console.log('Promise 3')
})
console.log(p3)

let p2 = new Promise((resolve, reject) => {
  resolve()
})
let p4 = p2.then((value) => {
  console.log('Promise 2')
  return Promise.resolve()
})
p4.then(() => {
  console.log('Promise 4')
})

console.log('log 1')
```

执行结果：  
Promise {< pending>}  
log 1  
Promise 1  
Promise 2  
Promise 3  
Promise 4  

&emsp;&emsp;我们可以知道，`p1` 一上来就被改变了状态，再向下执行 `p1.then` 里的回调会被添加进异步队列，并且会返回 promise 实例。  
&emsp;&emsp; `p3`就是这个 promise 实例，因为`p1.then`的回调并没有开始执行，通过打印可以看到他的状态为 pending，所以执行到`p3.then`他的回调并不会被添加到异步队列，这时候异步队列仅有`p1.then`的回调。  
&emsp;&emsp;继续向下就像刚才一样，`p2`的回调被添加进异步队列，`p4`是一个状态为 pending 的 promise 实例，`p4.then`的回调并不会添加到异步队列。  
&emsp;&emsp;等到异步队列开始执行，这时候只有两个需要执行的回调就是`p1.then`的回调和`p2.then`的回调，`p1.then`执行的时候将`p3`状态改为 fulfilled 然后`p3.then`的回调被添加进异步队列,这时异步队列`p2.then`的回调和`p3.then`的回调。依次类推就出现了上面的打印结果
