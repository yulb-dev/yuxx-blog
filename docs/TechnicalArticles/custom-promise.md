# 如何用js实现Promise构造函数
## 前置概念

一个 Promise 必然处于以下几种状态之一

1.  待定（pending）：初始状态，既没有被兑现，也没有被拒绝。
2.  已兑现（fulfilled）：意味着操作成功完成。
3.  已拒绝（rejected）：意味着操作失败。

一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise 对象的状态改变，只有两种可能：从 pending 变为 fulfilled 和从 pending 变为 rejected。
那么定义三种常量，分别表示这三种状态：

```javascript
const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'
```
## MyPromise() constructor

接着，编写 Promise 类和构造函数。我们需要在 Promise 实例中保存四个属性：

1.  status：存储 promise 实例的状态，默认为 PENDING
2.  value：存储 promise 的数据
3.  fulfilledCallbacks、rejectedCallbacks：存储 promise 实例将要调用的方法（如： promise 实例的 then 中传入的方法），因为一个 promise 实例可以调用多次 then 方法，所以我们还需要在实例里保存两个数组（fulfilledCallbacks，rejectedCallbacks，默认为空数组）用来保存成功的回调和失败的回调。

```javascript
const p = new Promise((resolve) => setTimeout(resolve, 1000))
p.then(console.log)
p.then(console.log)
```

由于这四种属性都是外界不可更改的，所以需要定义为私有属性。
Promise 构造函数接受一个函数作为参数（我们将它命名为 executor ），同步调用这个函数，并且依次传入两个方法：resolve、reject。

> 注意，需要捕获 executor 函数调用的错误，如果发生错误则改变 promise 的状态为 rejected

resolve、reject 为两个函数，用来改变 promise 的状态，并且要接受一个参数保存为实例的 value。在这两个函数里，我们主要做四件事情：

1.  判断实例状态是否已改变，已改变则直接 return，不做任何操作
2.  将实例 value 设置为传入的 value，保存 value
3.  改变状态为 FULFILLED 或者 REJECTED
4.  异步遍历执行对应数组里的函数，如 resolve 中要遍历调用 fulfilledCallbacks

至此，Promise 构造函数的具体实现如下：

```javascript
class MyPromise {
  #value
  #status = PENDING
  #fulfilledCallbacks = []
  #rejectedCallbacks = []
  constructor(executor) {
    // resolve 函数
    const resolve = (value) => {
      if (this.#status !== PENDING) return
      const callbacks = this.#fulfilledCallbacks
      this.#value = value
      this.#status = FULFILLED
      if (callbacks.length > 0) {
        callbacks.forEach((callback) => callback())
      }
    }

    // reject 函数
    const reject = (reason) => {
      if (this.#status !== PENDING) return
      const callbacks = this.#rejectedCallbacks
      this.#value = reason
      this.#status = REJECTED
      if (callbacks.length > 0) {
        callbacks.forEach((callback) => callback())
      }
    }

    try {
      executor(resolve, reject) //excutor函数报错状态改变为rejected
    } catch (error) {
      reject(error)
    }
  }
}
```
## MyPromise.prototype.then()

接下来我们实现 promise 实例的 then 方法

> then 方法是 promise 最为重要的内容，也是核心功能的实现

这里举一个 promise.then 的例子:

```javascript
new Promise((resolve) => resolve(1))
  .then()
  .then((value) => {
    console.log(value)
    throw 2
  })
  .then(
    () => {},
    (reason) => {
      console.log(reason)
      return Promise.resolve(3)
    }
  )
  .then(console.log)

//	控制台打印
//	1
//	2
//	3
```

在调用实例的 then 方法时，有以下几点需要注意：

1.  then 方法 存储 promise 实例状态改变时将要调用的回调函数
    > 注意：实例在调用 then 方法时，状态可能已经发生了改变，比如直接在构造函数中同步执行了 resolve，那么这个时候通过 then 方法绑定的回调可以直接去执行，就不要在执行 1 的步骤了
2.  then 方法调用后一定会返回一个新的 promise，这个 promise 的 status 和 value 将根据上个 then 方法的回调调用决定。
3.  如果 then 方法中将要调用的回调返回一个 promise 实例（A），那么返回的新的 promise 实例（B）的状态和数据就会由 A 决定。如果 A 变为 fulfilled，那么 B 的状态也会变为 fulfilled；如果返回一个普通值（非 promise ），那么 B 的状态会变为 fulfilled，并且 value 会变为这个返回值。

这里我们假设当前 Promise 的状态还是 PENDING：

```javascript
  then(onFulfilled, onRejected) {
    // 返回一个新的 MyPromise 实例
    return new MyPromise((resolve, reject) => {
      /*因为这里的 onFulfilled、onRejected 在调用时需要传入
        当前调用 then 方法的实例的 value
        所以我们需要通过箭头函数绑定 this 对象*/
      this.#fulfilledCallbacks.push(() => {
        setTimeout(() => {
          try {
            // 执行 onFulfilled 获取函数返回值
            const result = onFulfilled(this.#value)
            // 判断是否为 MyPromise 实例
            if (result instanceof MyPromise) {
              /*保持新的实例的状态由 result 决定。
            result 状态如果为 fulfilled 则调用 resolve，这样就改变了新的实例的状态，并且设置了value
            下面的写法是这种写法的简写：
              result.then(
              (value) => {
                  resolve(value)
              },
              (reason) => {
                  reject(reason)
              }
              )
          */
              result.then(resolve, reject)
            } else {
              resolve(result)
            }
          } catch (err) {
            reject(err)
          }
        })
      })
      this.#rejectedCallbacks.push(() => {
        //...
        const result = onRejected(this.#value)
        //...
      })
    })

```

4. 这里的代码有很多重复的地方，我们可以进行一下简化：

```javascript
  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      const handle = (action) =>
        setTimeout(() => {
          try {
            const result = action(this.#value)
            if (result instanceof MyPromise) {
              result.then(resolve, reject)
            } else {
              resolve(result)
            }
          } catch (err) {
            reject(err)
          }
        })
      this.#fulfilledCallbacks.push(() => handle(onFulfilled))
      this.#rejectedCallbacks.push(() => handle(onRejected))
    })
  }
```

5. 回顾 1 里的内容，这里我们加上状态判断：

```javascript
switch (this.#status) {
  case PENDING:
    this.#fulfilledCallbacks.push(() => handle(onFulfilled))
    this.#rejectedCallbacks.push(() => handle(onRejected))
    break
  case FULFILLED:
    handle(onFulfilled)
    break
  case REJECTED:
    handle(onRejected)
    break
}
```

4.  如果 then 方法没有收到指定的回调（如示例代码中的第二行），这样 promise 的状态和数据都会向下延续。所以们需要为 then 方法初始化 onFulfilled 和 onRejected：

```javascript
onFulfilled = typeof onFulfilled == 'function' ? onFulfilled : (value) => value
onRejected =
  typeof onRejected == 'function'
    ? onRejected
    : (reason) => {
        throw reason
      }
```

至此，promise 的核心部分已经完成，我们可以试着去写出构造函数的 catch 方法

## MyPromise.prototype.catch()

catch 方法其实就是 不需要 onFulfilled 的 then 方法：

```javascript
  catch(onRejected) {
    return this.then(null, onRejected)
  }
```

## MyPromise.resolve()

构造函数的 resolve 方法：

```javascript
MyPromise.resolve = function (value) {
  return new MyPromise((resolve, reject) => {
    if (value instanceof MyPromise) {
      value.then(resolve, reject)
    } else {
      resolve(value)
    }
  })
}
```

## MyPromise.all()

```javascript
MyPromise.all = function (promises) {
  let arr = []
  let num = 0
  return new MyPromise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      MyPromise.resolve(promises[i]).then((value) => {
        arr[i] = value
        if (++num === promises.length) {
          resolve(arr)
        }
      }, reject)
    }
  })
}
```
