# useState 在 React 中是如何工作的

## 源码地址
在开始之前，这里有一个[地址](https://codesandbox.io/s/2y49gh?file=/index.js&utm_medium=sandpack)，来自 react 教程中。是通过一个 demo 帮助开发者理解 useState 在 React 中是如何工作的，请先进性阅读，它很简易，并且没有用到 react ，应该不会使你感到困扰。

## Gallery 函数
这里，可以将 Gallery 看作一个 react 组件，他用到了 state 并且更新了 state :
```javascript
function Gallery() {
  // 每次调用 useState() 都会得到新的 pair
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);
	...
	...
  return {
	...
  };
}
```

## 完善 useState
这个 demo 很棒，但是还可以将它更完善。我们知道，在react 中，set 函数不仅仅可以传递一个值，也可以传递一个根据先前状态来计算新状态的函数：

```javascript
setIndex(10)          // index: 10
setIndex((n)=> n+1)   // index: 11
```
而且同时触发两次 setIndex 也只会渲染一次，如何来实现？

## 新增任务队列
首先，调用两次 set 函数只触发一次渲染，那么说明 set 函数不能在调用后就立即生效。如同 react 中，在调用 set 函数后立即通过 dom 去获取值一样，它并不是最新的值。这里应该将传入的值保存在一个队列当中，在外部函数执行完之后再去统一修改值并且进行渲染。并且像 componentHooks 一样和每一个 state 一一对应：

```javascript
// 新增任务队列 ，值为二维数组，如：[[],[]]，每一项保存的是对应 state 的 更新任务
let taskQueue = []
...
...
function setState(nextState) {
  /*
    这里调用了 set 函数 ，我们将参数保存在队列中，通过 promise 模拟异步执行,
    同时调用多次 set 函数 ，由于 set 函数（向任务队列添加任务）是同步执行的，
    而重新渲染操作（updateDOM）是异步执行，所以可以确保多次调用 set 函数只会触发一次渲染
  */ 
  if (!taskQueue.length) {
    Promise.resolve().then(updateDOM)
  }
  // 当前 state 的任务，如果没有则初始化为空数组
  const task = taskQueue[num] || []
  task.push(nextState)
  taskQueue[num] = task
}
```

## 修改 useState
接下来修改 useState 函数，需要在获取对应 state 时计算任务队列，返回正确的值

```javascript
function useState(initialState) {
  let pair = componentHooks[currentHookIndex]
  let num = currentHookIndex
  if (pair) {
    // 获取对应 state 将要执行的任务队列，循环遍历
    // 进行判断然后求值
    const tasks = taskQueue[num]
    tasks?.forEach((nextState) => {
      if (typeof nextState === 'function') {
        pair[0] = nextState(pair[0])
      } else {
        pair[0] = nextState
      }
    })
    currentHookIndex++
    // 在值计算完毕后要对任务队列制空
    taskQueue[num] = null
    // 任务队列没有任务则重置任务队列
    !taskQueue.some(Boolean) && (taskQueue = [])
    return pair
  }
  ...
  ...
}
```
至此，我们就可以在这个 demo 中进行多个 set 函数调用，并且向其中传入值或函数：

```javascript
// 同时调用
setIndex(index)
setIndex((n)=> n + 1)
setShowMore(!showMore)
```
