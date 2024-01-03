# 为什么不建议 v-if 和 v-for 同时使用

## 一、作用

`v-if` 指令用于条件性地渲染一块内容。这块内容只会在指令的表达式返回 `true` 值的时候被渲染

`v-for` 指令基于一个数组来渲染一个列表。`v-for` 指令需要使用 `item in items` 形式的特殊语法，其中 `items` 是源数据数组或者对象，而 `item` 则是被迭代的数组元素的别名

在 `v-for` 的时候，建议设置 `key` 值，并且保证每个 `key` 值是独一无二的，这便于 `diff` 算法进行优化

用法：

```vue
<Modal v-if="isShow" />

<li v-for="item in items" :key="item.id">{{ item.label }}</li>
```

## 二、优先级

`v-if` 与 `v-for` 都是 `vue` 模板系统中的指令，这些模版语法不是 Javascript 原生的，因此，在 vue 模板编译的时候，会将指令系统转化成可执行的 `render` 函数

示例：

```vue
<template>
  <ul>
    <li v-for="item in list" :key="item.id" v-if="item.isShow">{{ item.name }}</li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      list: [{ name: 'mmm', id: '1', isShow: true }]
    }
  }
}
</script>
```

模板指令的代码都会生成在 render 函数中，通过 Vue 官方设计的工具可以让我们实时看到编译成的 render 函数：

- [vue2.template-explorer](https://v2.template-explorer.vuejs.org/)
- [vue3.template-explorer](https://template-explorer.vuejs.org/)

在 vue2 当中，会看到如下的 render 函数:

```javascript
function render() {
  with (this) {
    return _c(
      'ul',
      _l(list, function (item) {
        return item.isShow
          ? _c(
              'li',
              {
                key: item.id
              },
              [_v(_s(item.name))]
            )
          : _e()
      }),
      0
    )
  }
}
```

`_l` 是 vue 的列表渲染函数，函数内部都会进行一次 `if`（三木运算符）判断

得到结论： `v-for` 优先级是比 `v-if` 高

在 vue3 当中，会看到如下的 render 函数:

```javascript
export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock(),
    _createElementBlock('ul', null, [
      _ctx.item.isShow
        ? (_openBlock(true),
          _createElementBlock(
            _Fragment,
            { key: 0 },
            _renderList(_ctx.list, (item) => {
              return (
                _openBlock(),
                _createElementBlock(
                  'li',
                  {
                    key: item.id
                  },
                  _toDisplayString(item.name),
                  1 /* TEXT */
                )
              )
            }),
            128 /* KEYED_FRAGMENT */
          ))
        : _createCommentVNode('v-if', true)
    ])
  )
}
```

当它们同时存在于一个节点上时，`v-if` 比 `v-for` 的优先级更高。这意味着 `v-if` 的条件将无法访问到 `v-for` 作用域内定义的变量别名（item），很显然，在 `vue3` 中同时使用是会报错的。

## 总结

- 永远不要把 `v-if` 和 `v-for` 同时用在同一个元素上，`vue2` 中会带来性能方面的浪费（每次渲染都会先循环再进行条件判断），`vue3` 中则是直接报错
- 如果条件出现在循环内部，可通过计算属性 computed 提前过滤掉那些不需要显示的项：

```javascript
computed: {
    showList: function() {
      return this.list.filter((item) => item.isShow)
    }
}
```
