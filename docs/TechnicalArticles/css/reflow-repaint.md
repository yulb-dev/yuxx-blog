# 详解浏览器的回流和重绘

## 渲染流程

在开始之前，让我们先了解浏览器是如何渲染网站的

![1.png](/reflow-repaint/1.png)

1. 当用户输入 URL 时，浏览器将从服务器获取 HTML 代码
2. 浏览器解析 HTML 代码并转换为令牌（token）
3. 令牌变成节点，节点又变成 DOM 树
4. 处理 CSS 构建 CSSOM 树
5. 将 DOM 和 CSSOM 组合成一个 Render 树（下面是 Render 树的构造过程）：
   1. 从 DOM 树的根节点开始，遍历每个可见节点
   2. Render 树将忽略不可见元素，像 \<head\> 和它的子节点以及任何具有 display: none 样式的结点
   3. 将所有相关样式匹配到 DOM 树中的每个可见节点，并根据 CSS 级联确定每个节点的计算样式
6. Layout：确定 Render 树中所有节点的宽度、高度和位置，以及确定页面上每个对象的大小和位置的过程
7. Paint：浏览器将在 Layout 阶段计算的每个框转换为屏幕上的实际像素。将元素的每个可视部分绘制到屏幕上，包括文本、颜色、边框、阴影和替换的元素（如按钮和图像）。

注意，第 6 步和 第 7 步在很多地方被叫做回流和重绘，但根据 MDN 中的解释，这是不准确的：

> “ 第一次确定节点的大小和位置称为布局。随后对节点大小和位置的重新计算称为回流 ”

同样的，重绘也是如此。也就是说浏览器对它们的操作是一样的，但是发生的时机不一样

## 回流和重绘（Reflow & Repaint）

- 回流：当浏览器重新计算网页某些部分的位置和几何结构时，就会发生回流。随后往往是重绘，即浏览器重新绘制网页以显示最终的视觉更新。
- 重绘：当浏览器重新绘制网页以显示 UI 更改引起的视觉更新时，会发生重新绘制。这通常发生在回流之后，即浏览器重新计算网页某些部分的位置和几何图形时。

> **回流和重绘都是一项昂贵的操作**

根据 Opera 的说法，大多数回流基本上会导致页面被重新渲染：

> 回流在性能方面非常昂贵，也是 DOM 脚本缓慢的主要原因之一，尤其是在处理能力较低的设备（如手机）上。在许多情况下，它们相当于重新布局整个页面。

## 什么情况下会导致回流和重绘

根据回流和重绘的定义，我们不难发现它们是如何导致的：

- 添加、删除、更新 DOM 节点时会发生回流

- 使用 `display:none` 隐藏 DOM 元素将导致回流和重绘

- 使用 `visibility: hidden` 隐藏 DOM 元素将只会导致重绘，因为没有布局或位置更改

- 移动 DOM 节点并设置其动画将触发回流和重绘

- 调整窗口大小将触发回流

- 更改字体样式会更改元素的几何图形。这意味着它可能会影响页面上其他元素的位置或大小，这两者都需要浏览器执行回流。一旦这些布局操作完成，任何损坏的像素都需要重绘

- 添加或删除样式表（Stylesheet）将导致回流和绘制
- 还有一些容易被忽略的操作：获取一些特定属性的值，这些属性有一个共性，就是需要通过即时计算得到。因此浏览器为了获取这些值，也会进行回流。还包括 getComputedStyle 方法，原理是一样的：
  > offsetTop、offsetLeft、 offsetWidth、offsetHeight、scrollTop、scrollLeft、scrollWidth、scrollHeight、clientTop、clientLeft、clientWidth、clientHeight

除此之外还有一些单独触发重绘的行为：

- 颜色的修改
- 阴影的修改
- 文本方向的修改

## 减少回流和重绘

- 不要一个接一个地改变样式。对健全性和可维护性最好的方法是更改类名，而不是样式。如果样式是动态的，请编辑 cssText：

```javascript
// 不好的
const left = 10,
  top = 10
el.style.left = left + 'px'
el.style.top = top + 'px'

// 较好的方式
el.className += ' classname'

// 最佳
el.style.cssText += '; left: ' + left + 'px; top: ' + top + 'px;'
```

- 避免使用 table 布局，table 中每个元素的大小以及内容的改动，都会导致整个 table 的重新计算
- 对于那些复杂的动画，对其设置 position: fixed/absolute，尽可能地使元素脱离文档流，从而减少对其他元素的影响
- 批处理 DOM 更改
  - 使用 documentFragment 保存临时更改
  - 克隆、更新、替换节点
  - 用 `display: none` 隐藏将要大量更改的元素，然后进行更改，最后恢复 display
- 不要重复计算样式，将它们缓存到变量中：

```javascript
// 不好的
const el = document.getElementById('el')
for (let i = 0; i < 10; i++) {
  el.style.top = el.offsetTop + 10 + 'px'
  el.style.left = el.offsetLeft + 10 + 'px'
}
// 较好的
const el = document.getElementById('el')
let offLeft = el.offsetLeft,
  offTop = el.offsetTop

// 在JS层面进行计算
for (let i = 0; i < 10; i++) {
  offLeft += 10
  offTop += 10
}

// 一次性将计算结果应用到DOM上
el.style.left = offLeft + 'px'
el.style.top = offTop + 'px'
```
