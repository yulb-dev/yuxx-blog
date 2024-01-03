# vue3 中的 ref 在做什么

## 概念

> 简介：`ref` 接受一个内部值，返回一个响应式的、可更改的 ref 对象，此对象只有一个指向其内部值的属性 .value。如果将一个对象赋值给 ref，那么这个对象将通过 reactive() 转为具有深层次响应式的对象。这也意味着如果对象中包含了嵌套的 ref，它们将被深层地解包

这是 vue3 官方文档对其的解释。其实 `ref` 主要是为了解决原始值的响应式：

```javascript
const count = ref(0)
console.log(count.value) // 0

count.value = 1
console.log(count.value) // 1
```

## 实现 ref

其内部实现大致如下：

```javascript
function ref(val) {
  const wrapper = {
    value: val,
  }
  // 增加唯一标识，代表是个对象是 ref
  Object.defineProperty(wrapper, '__v_isRef', {
    value: true,
  })
  return reactive(wrapper)
}
```

## 实现 toRef

实现简易 `toRef`:

> 可以基于响应式对象上的一个属性，创建一个对应的 ref。这样创建的 ref 与其源属性保持同步：改变源属性的值将更新 ref 的值，反之亦然

这里 `toRef` 接受一个响应式对象和一个键名，所以我们不需要在新建响应式对象，可以通过 `get`，`set` 函数来实现，当读取值的时候实际上是在读取响应式对象的值，操作也一样：

```javascript
function toRef(obj, key) {
  const wrapper = {
    get value() {
      return obj[key]
    },
    set value(val) {
      obj[key] = val
    },
  }
  // 增加唯一标识，代表这个对象是 ref
  Object.defineProperty(wrapper, '__v_isRef', {
    value: true,
  })
  return wrapper
}

// 演示
const state = reactive({ count: 0 })
const count = toRef(state, 'count')
count.value++
```

这样一个简易的 `toRef` 就实现了

## 实现 toRefs

`toRefs` 概念：

> 将一个响应式对象转换为一个普通对象，这个普通对象的每个属性都是指向源对象相应属性的 ref。每个单独的 ref 都是使用 toRef() 创建的

根据同样的原理，我们可以通过 `toRef` 实现 `toRefs`：

```javascript
function toRefs(obj) {
  const ref = {}
  for (const key in obj) {
    ref[key] = toRef(obj, key)
  }
  return ref
}

// 演示
const state = reactive({ count: 0 })
const { count } = toRefs(state)
count.value++
```
