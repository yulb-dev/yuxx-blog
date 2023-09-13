# js 判断数据类型的几种方法

## typeof

```javascript
typeof 1 // number
typeof '2' // string
typeof true // boolean
typeof undefined // undefined
typeof null // object
typeof [1, 2] // object
typeof {} // object
typeof function fun() {} // function
```

可以发现，此方法可以判断大部分数据类型，但是当遇见`null` 和`数组`的时候不准确

## instanceof

instanceof 运算符用来验证，一个对象是否为指定的构造函数的实例

```javascript
[] instanceof Object // true
[] instanceof Array  // true
{} instanceof Object // true
Promise.resolve() instanceof Promise // true
```

不能分别出 `Object `和 `Array`

## Object.prototype.toString

利用`Object.prototype`上的 `toString` 方法，返回字符串

```javascript
;[1, '2', true, undefined, null, [1, 2], {}, function () {}].forEach((item) => {
  console.log(Object.prototype.toString.call(item))
})
/*
   [object Number]
   [object String]
   [object Boolean]
   [object Undefined]
   [object Null]
   [object Array]
   [object Object]
   [object Function]
*/
```

然后截取字符串得到最后的值

```javascript
;[1, '2', true, undefined, null, [1, 2], {}, function () {}].forEach((item) => {
  let str = Object.prototype.toString.call(item)
  console.log(str.slice(8, -1))
})
/*
        Number
        String
        Boolean
        Undefined
        Null
        Array
        Object
        Function
    */
```

可以看到这个方法得出的值最为准确
