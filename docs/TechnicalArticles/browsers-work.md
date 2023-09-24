# 浏览器的工作原理

## 导航

导航是加载 web 页面的第一步。它发生在以下情形：用户通过在地址栏输入一个 URL、点击一个链接、提交表单或者是其他的行为。

## DNS 查询

对于一个 web 页面来说导航的第一步是要去寻找页面资源的位置。如果导航到 https://example.com，HTML 页面被定位到 IP 地址为 93.184.216.34 的服务器。如果以前没有访问过这个网站，就需要进行 DNS 查询。

浏览器向名称服务器发起 DNS 查询请求，最终得到一个 IP 地址。第一次请求之后，这个 IP 地址可能会被缓存一段时间，这样可以通过从缓存里面检索 IP 地址而不是再通过名称服务器进行查询来加速后续的请求。

通过主机名加载一个页面通常仅需要一次 DNS 查询。但是，对于页面指向的不同的主机名，则需要多次 DNS 查询。如果字体（fonts）、图像（images）、脚本（scripts）、广告（ads）和网站统计（metrics）都有不同的主机名，则需要对每一个主机名进行 DNS 查询。

![1.jpg](/browsers-work/1.jpg)

## TCP 握手

一旦获取到服务器 IP 地址，浏览器就会通过 TCP“三次握手” 与服务器建立连接。这个机制的是用来让两端尝试进行通信——在浏览器和服务器通过上层协议 HTTPS 发送数据之前，可以协商网络 TCP 套接字连接的一些参数。

TCP 的“三次握手”技术经常被称为“SYN-SYN-ACK”——更确切的说是 SYN、SYN-ACK、ACK——因为通过 TCP 首先发送了三个消息进行协商，然后在两台电脑之间开始一个 TCP 会话。是的，这意味着终端与每台服务器之间还要来回发送三条消息，而请求尚未发出。

## TLS 协商

为了在 HTTPS 上建立安全连接，另一种握手是必须的。更确切的说是 TLS 协商，它决定了什么密码将会被用来加密通信，验证服务器，在进行真实的数据传输之前建立安全连接。在发送真正的请求内容之前还需要三次往返服务器

![2.jpg](/browsers-work/2.jpg)

虽然建立安全连接对增加了加载页面的等待时间，对于建立一个安全的连接来说，以增加等待时间为代价是值得的，因为在浏览器和 web 服务器之间传输的数据不可以被第三方解密。

经过 8 次往返，浏览器终于可以发出请求。

## 响应

一旦我们建立了到 web 服务器的连接，浏览器就代表用户发送一个初始的 HTTP GET 请求，对于网站来说，这个请求通常是一个 HTML 文件。一旦服务器收到请求，它将使用相关的响应头和 HTML 的内容进行回复。

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>My simple page</title>
    <link rel="stylesheet" src="styles.css" />
    <script src="myscript.js"></script>
  </head>
  <body>
    <h1 class="heading">My Page</h1>
    <p>A paragraph with a <a href="https://example.com/about">link</a></p>
    <div>
      <img src="myimage.jpg" alt="image description" />
    </div>
    <script src="anotherscript.js"></script>
  </body>
</html>
```