# 通过原型理解 javascript 中 new 命令的原理

## 引出原型

&ensp;&ensp;&ensp;&ensp;开始之前，我们先看一段代码

```javascript
const obj = {}
obj.toString() //[object Object]
```

&ensp;&ensp;&ensp;&ensp;这段代码做了两件事情：

1.  创建一个名为 __obj__ 的对象
2.  调用 __obj__ 的 toString 方法，返回这个对象的字符串形式

&ensp;&ensp;&ensp;&ensp;我们创建了一个空对象，并没有在它身上声明 toString 方法，但是却成功调用了 toString 并返回了一个字符串。这里我们就要明白，我们调用 toString 方法都经历了哪些过程：

1.  浏览器首先检查，__obj__ 对象是否具有可用的 toString() 方法。
2.  如果没有，则浏览器检查 __obj__ 对象的原型对象是否具有可用的 toString() 方法，这里有这个方法（为什么会有，请看下文），于是该方法被调用。

&ensp;&ensp;&ensp;&ensp;所以，在这里 __obj__ 调用的并不是自身的 toString 方法，而是找到了它的原型对象中的 toString ，然后再调用。那么，原型对象又是怎么来的？

## 什么是原型对象

> JavaScript 规定，每个函数都有一个 prototype 属性，指向一个对象

&ensp;&ensp;&ensp;&ensp;每个函数都有一个 prototype 属性，指向一个对象，但是这些和 __obj__ 有什么关系？我们知道，__obj__ 对象是 Object 构造函数生成的实例，构造函数也是函数。那么 Object 就有一个 prototype 属性，指向一个对象，而这个对象，就是 __obj__ 要找的原型对象。我们不妨在控制台打印一下 __Object.prototype__ ：

![控制台打印 Object.prototype ](/new/1.jpg)

&ensp;&ensp;&ensp;&ensp;所以，__obj__ 调用的其实就是它的原型对象（Object.prototype）上的 toString 方法。
&ensp;&ensp;&ensp;&ensp;注意上图中 prototype 对象还有一个 constructor 属性，默认指向实例对象所在的构造函数。也就是说，__obj__ 的原型对象上的 constructor 指向 Object ，打印 __Object.prototype.constructor __= Object__ 会返回 true 。 到现在，实例对象、原型对象、构造函数三者之间的关系应该是很明确的，如下图所示：

![实例对象、原型对象、构造函数的关系](/new/2.jpg)

> _Object.getPrototypeOf() 方法返回指定对象的原型_

# new 命令的原理

&ensp;&ensp;&ensp;&ensp;知道什么是原型和实例对象、原型对象、构造函数三者之间的关系后，可以自己实现一个 \_new 函数来模仿 new 命令的操作。
&ensp;&ensp;&ensp;&ensp;前置知识：__Object.create__

> Object.create() 方法用于创建一个新对象，使用现有的对象来作为新创建对象的原型（prototype）

```javascript
const person = { name: 'xxx' }
const person2 = Object.create(person)
person2.name //xxx
```

## 自定义构造函数

&ensp;&ensp;&ensp;&ensp;首先，我们自定义一个 Dog 构造函数，并生成一个实例：

```javascript
function Dog(breed) {
  this.breed = breed
}
const myDog = new Dog('中华田园犬')
```

&ensp;&ensp;&ensp;&ensp;有一点需要注意的是，如果构造函数内部有 return 语句，而且 return 后面跟着一个对象，new 命令会返回 return 语句指定的对象，否则，直接返回实例对象：

```javascript
function Dog(breed) {
  this.breed = breed
  return { name: 'xxx' }
}
const myDog = new Dog('中华田园犬')
myDog.name //xxx
```

## 自定义 \_new 函数

&ensp;&ensp;&ensp;&ensp;那么不通过 new 命令来创造实例，如何自己去实现 new 命令的操作。其实，主要有三个地方需要考虑：

> 1.以构造函数的 prototype 属性为原型创建一个空对象，这样空对象才能正确的继承属性和方法 2.将这个空对象绑定为构造函数内部的 this 并且执行，这样才能实现构造函数内部的操作（比如附值操作：this.name = 'xxx'） 3.判断构造函数的返回值并返回

&ensp;&ensp;&ensp;&ensp;具体实现如下：

```javascript
function _new(Constructor, ...arg) {
  // 以构造函数的 prototype 属性为原型创建一个空对象
  const newObject = Object.create(Constructor.prototype)
  // 将这个空对象绑定为构造函数内部的 this 并且执行
  // arg 是构造函数需要的参数，也应该传入
  const result = Constructor.apply(newObject, arg)
  // 判断返回值
  return typeof result __= 'object' && result != null ? result : newObject
}
const myDog = _new(Dog, '中华田园犬')
```
