# js 中的事件传播

## 事件

当用户在页面中点击鼠标或者按下键盘等操作后，就会触发相应的事件。一个事件发生后，会在子元素和父元素之间传播（propagation）。这种传播分成三个阶段：

1.  第一阶段：从 window 对象传导到目标节点（上层传到底层），称为“捕获阶段”（capture phase）。
2.  第二阶段：在目标节点上触发，称为“目标阶段”（target phase）。
3.  第三阶段：从目标节点传导回 window 对象（从底层传回上层），称为“冒泡阶段”（bubbling phase）。

html 代码如下：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      div {
        padding: 30px;
      }
      #box1 {
        background-color: rgb(220, 220, 141);
      }
      #box2 {
        background-color: rgb(204, 149, 255);
      }
      #box3 {
        width: 200px;
        background-color: thistle;
      }
    </style>
  </head>
  <body>
    <div id="box3">
      我是box3
      <div id="box2">
        我是box2
        <div id="box1">我是box1</div>
      </div>
    </div>
  </body>
</html>
```

## 绑定事件

下面为 box1 标签绑定一个点击事件：

```html
<script>
  let box3 = document.getElementById('box3')
  let box2 = document.getElementById('box2')
  let box1 = document.getElementById('box1')
  box1.onclick = function () {
    console.log('box1')
  }
  /*等同于
    box1.addEventListener('click', function () {
      console.log('box1')
    })
    */
</script>
```

效果：
![1.gif](/event/1.gif)

## 监听父元素

为 box2 绑定监听:

```javascript
box2.addEventListener(
  'click',
  () => {
    console.log('box2')
  },
  false //默认为false，不在捕获阶段触发
)
```

效果：
![2.gif](/event/2.gif)

这是因为事件传播第三阶段为冒泡阶段，事件冒泡到 box2 然后触发它的事件监听函数

## 设置捕获阶段触发

下面再对 box3 绑定监听函数，并设置在捕获阶段触发

```html
<script>
  ...
  ...

    box3.addEventListener(
      'click',
      () => {
        console.log('box3')
      },
      true
    )
</script>
```

![3.gif](/event/3.gif)

这是因为事件传播第一个阶段为捕获阶段，从外向内，所以是 box3 的监听函数先被触发

## 阻止事件传播

在 box1 的回调中阻止事件继续传播

```javascript
box1.onclick = function (event) {
  event.stopPropagation() //阻止事件传播
  console.log('box1')
}
```

效果图：
![4.gif](/event/4.gif)

这是因为 box2 的监听函数是在冒泡阶段触发，事件传播到 box1 上被阻止，无法再向外继续传播，所以 box2 就无法在冒泡阶段触发监听函数

如果在 box3 的回调停止事件传播：
![5.gif](/event/5.gif)
这样 box3 在捕获阶段停止事件传播，事件不会传播到 box1，也不会传播到 box2
