# 通过原生表单或 ajax，实现 node.js 中的文件上传

## 后端功能
> 文件上传是开发中必不可少的功能，最常见的就是上传头像。本篇文章讲述如何使用不同的方式进行文件上传。在开始之前，我们先编写后端功能（node）：

```javascript
// router.js
import express from 'express'
import formidable from 'formidable'
import path from 'path'
const app = express()

app.post('/', (req, res, next) => {
  const form = formidable({
    uploadDir: path.resolve('uploads'), //临时文件位置
    multiples: true,
    maxFileSize: 20 * 1024 * 1024, //限制上传的大小
  })
  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err)
      return
    }
    res.json({ fields, files })
  })
})
app.listen(5000, () => {
  console.log('运行在5000端口')
})
```

## form 表单的相关属性
1. action：服务器接收数据的 URL。
2. method：提交数据的 HTTP 方法.
3. enctype：当 method 属性等于 post 时，该属性指定提交给服务器的 MIME 类型。可能的值为 application/x-www-form-urlencoded（默认值），multipart/form-data（文件上传的情况），text/plain。

## 表单形式上传
接下来创建一个表单：

```html
<form
  action="http://localhost:5000"
  id="myForm"
  method="post"
  enctype="multipart/form-data"
>
  <div>
    <label for="username">用户名：</label>
    <input type="text" id="username" name="username" required />
  </div>
  <div>
    <label for="userfile">上传文件：</label>
    <input type="file" id="userfile" name="avatar" required />
  </div>
  <input type="submit" value="Submit!" />
</form>
```

点击 submit 提交表单，此时浏览器会跳转页面，并且在浏览器显示后端解析后的对象，我们在控制台的 nextwork 中点击相应请求的 Preview 可以看到以对象形式展示的数据：

![响应数据](/node-file-upload/1.jpg)

说明我们已经成功的上传了文件，我们可以查看与 router.js 同目录的 uploads 中多了一个没有后缀名的文件，它和前端上传文件的大小是相同的。接下来我们修改 router.js 文件，将上传的文件保存到“服务端”。

```javascript
//引入 path fs
+ import Path from 'path'
+ import fs from 'fs'
//修改form.parse
form.parse(req, (err, fields, files) => {
    if (err) {
        next(err);
        return;
    }
    const { path, name } = files.avatar
    const new_path = Path.resolve('upload', fields.username + Path.extname(name))
    const fsread = fs.createReadStream(path)
    const fswrite = fs.createWriteStream(new_path)
    fsread.pipe(fswrite)
    fsread.on('end', () => {
            res.send('ok')
    })
});
```

这个时候再次进行文件上传，会发现在 rouer.js 同目录下的 upload 中多了一个图片，文件名就是表单中输入的值。

## ajax 上传

有时候我们不希望直接通过 form 表单提交数据，那么我们可以使用 ajax 进行文件上传。
在前端 html 中加入以下代码

```javascript
const form = document.getElementById('myForm')
// 为 form 表单添加 submit 事件
form.addEventListener('submit', (e) => {
  // 取消默认行为（提交）
  e.preventDefault()
  //创建 ajax 实例
  const xhr = new XMLHttpRequest()
  xhr.open('POST', 'http://localhost:5000', true)
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      console.log(xhr.response)
    }
  }
  //我们需要通过 form 表单创建FormData实例，然后直接发送到服务端
  xhr.send(new FormData(form))
})
```

之后我们进行文件上传，页面不会进行跳转，并且文件同样上传成功。
