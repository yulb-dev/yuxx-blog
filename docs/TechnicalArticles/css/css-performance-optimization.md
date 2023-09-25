# CSS 性能优化

> 原文：https://developer.mozilla.org/en-US/docs/Learn/Performance/CSS

在开发网站时，您需要考虑浏览器如何处理您网站上的 CSS。为了减轻 CSS 可能导致的任何性能问题，您应该对其进行优化。例如，您应该优化 CSS 以减轻渲染阻塞并最大限度地减少所需的回流次数。本文将向您介绍关键的 CSS 性能优化技术。

## 优化渲染

浏览器遵循特定的渲染路径——绘制只发生在布局之后，而布局是在创建 Render 树之后发生的，这反过来又需要 DOM 和 CSSOM 树。

向用户显示一个未格式化的页面，然后在解析 CSS 样式后重新绘制它，这将是一种糟糕的用户体验。因此，在浏览器确定需要 CSS 之前，CSS 一直处于渲染阻塞状态。浏览器可以在下载 CSS 并构建 CSS 对象模型（CSSOM）后绘制页面。

为了优化 CSSOM 结构并提高页面性能，你可以根据 CSS 的当前状态执行以下一项或多项操作：

- 删除不必要的样式：浏览器构建 CSSOM 树并不会去掉不必要的样式，只有在生成 Render 树的时候才会去除。
- 将 CSS 拆分为单独的模块：保持 CSS 模块化意味着页面加载时不需要的 CSS 可以稍后加载，从而减少初始 CSS 渲染阻塞和加载时间。最简单的方法是将 CSS 拆分为单独的文件，只加载所需的内容
- 最小化和压缩 CSS：最小化包括在代码投入生产后，删除文件中的所有空白，这些空白只是为了提高可读性。您可以通过缩小 CSS 来显著减少加载时间。小型化通常是作为构建过程的一部分来完成的（例如，当您构建一个准备部署的项目时，大多数 JavaScript 框架（webpack、vite）都会对代码进行小型化）。除了缩小之外，在为文件提供服务之前，请确保网站所在的服务器对文件使用压缩（如 gzip）。
- 简化选择器：人们通常编写的选择器比应用所需样式所需的选择器更复杂。这不仅增加了文件大小，还增加了这些选择器的解析时间。例如：

```css
/* 非常具体的选择器 */
body div#main-content article.post h2.headline {
  font-size: 24px;
}

/* 你可能只需要这个 */
.headline {
  font-size: 24px;
}
```

- 使用 CSS 精灵减少图像 HTTP 请求：CSS 精灵是一种将你想在网站上使用的几个小图像（如图标）放在一个图像文件中，然后使用不同的 `background-position` 值来显示你想在每个不同位置显示的图像块的技术。这可以显著减少获取图像所需的 HTTP 请求数量。

## 处理动画

### 选择要设置动画的特性

动画性能在很大程度上取决于要设置动画的属性。某些属性在设置动画时会触发回流（因此也会重绘），因此应避免。这些属性包括：

- 更改元素的尺寸，例如 `width` 、 `height` 、 `border` 和 `padding` 。
- 重新定位元素，例如 `margin` 、 `top` 、 `bottom` 、 `left` 和 `right` 。
- 更改元素的布局，例如 `align-content` 、 `align-items` 和 `flex` 。
- 添加更改元素几何图形的视觉效果，例如 `box-shadow` 。

如果可能的话，最好设置不会导致回流/重绘的特性的动画。这包括：

- Transforms
- opacity
- filter

### 在 GPU 上设置动画

为了进一步提高性能，您应该考虑将动画工作从主线程移到设备的 GPU 上（也称为合成）。这是通过选择浏览器将自动发送给 GPU 处理的特定类型的动画来实现的；其中包括：

- 3D 变换动画，例如 `transform: translateZ()` 和 `rotate3d()` 。
- 具有某些其他动画属性的元素，如 `position: fixed` 。
- 已应用 `will-change` 的元素
- 某些元素在其自己的层中渲染，包括 `<video>` 、 `<canvas>` 和 `<iframe>` 。

## 使用 will-change

浏览器可以在实际更改元素之前设置优化。这些类型的优化可以通过在需要页面之前进行潜在的昂贵工作来提高页面的响应能力。CSS `will-change` 属性向浏览器提示元素的更改方式。

> 注意： `will-change` 旨在作为解决现有性能问题的最后手段。不应将其用于预测性能问题。

```css
.element {
  will-change: opacity, transform;
}
```

## 提高字体性能

### 字体加载

请记住，字体只有在使用 `font-family` 属性实际应用于元素时才会加载，而不是在首次使用 `@font-face` 规则引用时加载：

```css
/* 此处未加载字体 */
@font-face {
  font-family: 'Open Sans';
  src: url('OpenSans-Regular-webfont.woff2') format('woff2');
}

h1,
h2,
h3 {
  /* 实际上是在这里加载的 */
  font-family: 'Open Sans';
}
```

所以，使用 `rel="preload"` 尽早加载重要字体是有益的，因此在实际需要时可以更快地使用这些字体：

```html
<link
  rel="preload"
  href="OpenSans-Regular-webfont.woff2"
  as="font"
  type="font/woff2"
  crossorigin
/>
```
