# 使用 ajax 和 promise 实现简易 axios

## 主要思路

```javascript
function axios({ method, url, query = null, body = null, timeout = 0 }) {
  // 1. 生成 promise 实例，包裹异步请求
  return new Promise((resolve, reject) => {
    try {
      // 2. 解析 query 参数
      let params = new URLSearchParams(query)
      url += '?' + params // 拼接url
      // 3. 生成 ajax 实例
      let xhr = new XMLHttpRequest()
      xhr.open(method, url, true)
      // 4. 如果为 POST 请求，需要修改请求头
      method === 'POST' &&
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
      // 5. 监听服务器传来的数据接收完毕
      xhr.onload = function () {
        // 请求成功，访问正常
        if (xhr.status == 200) {
          // 6. 更改 promise 状态，传入 response
          resolve(xhr.response)
        }
      }
      // 7. 判断是否需要 timeout，如果超时则调用 abort 终止请求
      if (timeout) {
        setTimeout(() => {
          xhr.abort()
        }, timeout * 1000)
      }
      // 监听 abort 调用，修改 promise 状态
      xhr.onabort = function () {
        reject('请求超时')
      }
      // 如果 body 为 表单实例，修改 Content-Type 请求头
      if (body instanceof FormData) {
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
      } else if (body instanceof Object) {
        body = JSON.stringify(body)
      }
      // 发送请求体
      xhr.send(body)
    } catch (error) {
      reject(error)
    }
  })
}
```

## 示例

```javascript
// 发送 get 请求
async function get() {
  try {
    const data = await axios({
      method: 'GET',
      url: 'http://localhost:8888/api',
      query: { name: 'yxx' },
      timeout: 1
    })
  } catch (error) {
    console.log(error)
  }
}
// 发送 post 请求
async function post() {
  try {
    const data = await axios({
      method: 'POST',
      url: 'http://localhost:8888/api',
      query: { name: 'yxx' },
      body: {
        name: 'hah'
      }
    })
  } catch (error) {
    console.log(error)
  }
}

// 发送表单请求
let body = new FormData()
body.set('name', 'xhh')

async function bdPost() {
  try {
    const data = await axios({
      method: 'POST',
      url: 'http://localhost:8888/api',
      query: { name: 'yxx' },
      body
    })
  } catch (error) {
    console.log(error)
  }
}
```
