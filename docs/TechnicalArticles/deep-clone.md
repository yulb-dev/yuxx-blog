# javascript 实现深拷贝

## 主要思路

1. 递归便利
2. 判断数据类型
3. 如果为对象
   1. 递归遍历
   1. 通过 Object.create 创建新对象，确保原型链继承
   1. 正确拷贝属性描述对象 PropertyDescriptor
4. 如果为数组，递归遍历

## 代码实现

```javascript
function getType(data) {
  return Object.prototype.toString.call(data).slice(8, -1)
}

function deepClone(obj) {
  let type = getType(obj)

  switch (type) {
    case 'Object':
      // 以 obj 原型对象为原型，生成新的空对象
      let newObj = Object.create(Object.getPrototypeOf(obj))
      let keys = Reflect.ownKeys(obj)
      keys.forEach((key) => {
        // 通过 defineProperty 定义 newObj 的相关属性描述对象
        Object.defineProperty(newObj, key, {
          ...Object.getOwnPropertyDescriptor(obj, key),
          value: deepClone(obj[key])
        })
      })
      return newObj

    case 'Array':
      let newArr = []
      obj.forEach((data, i) => {
        newArr[i] = deepClone(data)
      })
      return newArr
    // 生成新的 Date 实例
    case 'Date':
      return new Date(obj)
    // 生成新的 正则实例
    case 'RegExp':
      return new RegExp(obj)
    default:
      return obj
  }
}
```

## 使用

```javascript
let obj1 = { n: '1', as: { name: 'wxx', h: [123, { age: 21 }] } }
Object.defineProperty(obj1, 'name', {
  value: 'yxx',
  writable: false
})
let newobj = deepClone(obj1)
```

## 解决循环引用

### 示例

如果对象或数组中出现循环引用的情况，那么上述代码就会出现死循环的问题：

```javascript
const obj1 = ['yxx', 21]
obj1.push(obj1)
// 死循环
const newobj = deepClone(obj1)
```

### 解决

首先，可以新建一个 WeakMap 实例，用来存储旧对象和对应的新对象

```javascript
const map = new WeakMap()
```

在需要递归遍历对象和数组的地方，进行判断。

1. 如果 map 存储过此对象则将它对应的新对象 return
2. 没有存储过则将旧对象和新对象分别作 __键-值__ 存储

```javascript
...
...
case 'Object':
  if (map.has(obj)) {
    return map.get(obj)
  } else {
    map.set(obj, newObj)
  }
...
case 'Array':
  if (map.has(obj)) {
    return map.get(obj)
  } else {
    map.set(obj, newArr)
  }
...
```
