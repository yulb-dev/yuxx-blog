# 使用 css 实现两栏、三栏自适应布局

## 两栏布局

> 两栏布局实现效果就是将页面分割成左右宽度不等的两列，宽度较小的列设置为固定宽度，剩余宽度由另一列撑满

### 浮动

实现思路:

- 使用 float 左浮左边栏
- 右边模块使用 margin-left 撑出内容块做内容展示
- 为父级元素添加 BFC，防止下方元素飞到上方内容

```html
<style>
  .box{
      overflow: hidden; 添加BFC
  }
  .left {
      float: left;
      width: 200px;
      background-color: gray;
      height: 400px;
  }
  .right {
      margin-left: 210px;
      background-color: lightgray;
      height: 200px;
  }
</style>
<div class="box">
  <div class="left">左边</div>
  <div class="right">右边</div>
</div>
```

### flex 弹性布局

```html
<style>
  .box {
    display: flex;
  }
  .left {
    width: 100px;
  }
  .right {
    flex: 1;
  }
</style>
<div class="box">
  <div class="left">左边</div>
  <div class="right">右边</div>
</div>
```

## 三栏布局

> 三栏布局按照左中右的顺序进行排列，通常中间列最宽，左右两列次之

### 浮动

两边使用 float，中间使用 margin

```html
<style>
  .wrap {
      background: #eee;
      overflow: hidden; <!-- 生成BFC，计算高度时考虑浮动的元素 -->
      padding: 20px;
      height: 200px;
  }
  .left {
      width: 200px;
      height: 200px;
      float: left;
      background: coral;
  }
  .right {
      width: 120px;
      height: 200px;
      float: right;
      background: lightblue;
  }
  .middle {
      margin-left: 220px;
      height: 200px;
      background: lightpink;
      margin-right: 140px;
  }
</style>
<div class="wrap">
  <div class="left">左侧</div>
  <div class="right">右侧</div>
  <div class="middle">中间</div>
</div>
```

### flex 布局

```html
<style type="text/css">
  .wrap {
    display: flex;
    justify-content: space-between;
  }

  .left,
  .right,
  .middle {
    height: 100px;
  }

  .left {
    width: 200px;
    background: coral;
  }

  .right {
    width: 120px;
    background: lightblue;
  }

  .middle {
    background: #555;
    width: 100%;
    margin: 0 20px;
  }
</style>
<div class="wrap">
  <div class="left">左侧</div>
  <div class="middle">中间</div>
  <div class="right">右侧</div>
</div>
```

### grid 网格布局

```html
<style>
  .wrap {
    display: grid;
    width: 100%;
    grid-template-columns: 300px auto 300px;
  }

  .left,
  .right,
  .middle {
    height: 100px;
  }

  .left {
    background: coral;
  }

  .right {
    background: lightblue;
  }

  .middle {
    background: #555;
  }
</style>
<div class="wrap">
  <div class="left">左侧</div>
  <div class="middle">中间</div>
  <div class="right">右侧</div>
</div>
```
