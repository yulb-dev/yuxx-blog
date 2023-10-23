# 寻找中位数和众数—基于 rust

## 需求

我们在终端中接收用户的输入，以空格分割，然后寻找这一组数据中的中位数和众数

> 中位数（Median）：又称中值，统计学中的专有名词，是按顺序排列的一组数据中居于中间位置的数。
>
> 众数（Mode）：是一组数据中出现次数最多的数值

示例：

```
输入：
9 3 2 3 5 6 1

输出：
list: [1, 2, 3, 3, 5, 6, 9], mode: 3, median: 3
```

## 初始化变量

在 `main` 函数中初始化变量，这里只需要两个变量

- str：`String` 类型，用来存储用户的输入
- num_vec：`Vec<i32>` 类型，用来存储数字集合

在这里，不要用数组来存储数字集合，因为我们不确定用户输入的数字数量，所以需要用 `Vector`

```rust
fn main() {
    // 提醒用户输入
    println!("输入你要执行的数字，以空格分隔");

    // 可变变量，我们会用它接收用户输入
    let mut str = String::new();
    // 可变 Vector，我们会向其中加入数字
    let mut num_vec: Vec<i32> = Vec::new();
}
```

## 读取用户输入

```rust
use std::{io};
fn main() {
    // 省略...

    //传递可变引用，因为 read_line 需要修改 str
    read_line(&mut str);
}

fn read_line(s: &mut String) {
    io::stdin().read_line(s).expect("error");
}
```

## 将用户输入转为数字 Vector

1. 通过 str 的 `split_whitespace` 方法，用空白分割字符串切片，返回迭代器
2. 遍历迭代器，通过 `parse` 方法将每一项转为 i32 类型
3. 遍历过程中
   1. 通过 `HashMap<i32, i32>` 存储 值 和它出现过的次数
   2. 通过 `[i32; 2]` 数组存储当前出现过最多的值和它的次数
4. 返回出现最多的数

```rust
use std::{collections::HashMap, io};
fn main() {
    // 省略...

    // 因为要更改 num_vec，需要传入可变引用，
    // 而且在之后不需要 str 了，我们可以转移所有权
    let mode = init_vec(str, &mut num_vec);
}

fn init_vec(str: String, num_vec: &mut Vec<i32>) -> i32 {
    // 存储 值 和它出现过的次数
    let mut num_count_map: HashMap<i32, i32> = HashMap::new();
    // 存储当前出现过最多的值和它的次数, 只需要两项，所以我们可以用数组来完成
    let mut selected_value: [i32; 2] = [0, 0];
    // 遍历迭代器
    for item in str.split_whitespace() {
        // 转换为 i32 的数字
        let num: i32 = item.parse().expect("error");
        // 下面一行的作用是，当 map 里有 存储过 num 时则返回值的引用，否则设置为 0
        let result_count = num_count_map.entry(num).or_insert(0);
        *result_count += 1;
        // 比较 num 出现的次数和当前出现过的值的最大次数
        if *result_count > selected_value[1] {
            // 交换
            selected_value = [num, *result_count];
        }
        // 将转换过的值添加到 num_vec
        num_vec.push(num);
    }
    // 返回用户输入的字符串当中出现过最多次数的值（众数）
    selected_value[0]
}

```

## 完整代码

拿到了众数之后，我们在做如下操作：

1. 通过 `sort` 方法，对 num_vec 进行排序
1. 获取 num_vec 的长度，并且除以 2，通过索引拿到中位数
1. 打印相关值，注意通过 `{:?}` 打印 num_vec

```rust
use std::{collections::HashMap, io};
fn main() {
    println!("输入你要执行的数字，以空格分隔");



    let mut str = String::new();
    let mut num_vec: Vec<i32> = Vec::new();

    read_line(&mut str);
    let mode = init_vec(str, &mut num_vec);
    num_vec.sort();
    let median_index: usize = num_vec.len() / 2;
    let median = num_vec[median_index];
    println!("list: {:?}, mode: {mode}, median: {median}", num_vec);
}

fn read_line(s: &mut String) {
    io::stdin().read_line(s).expect("error");
}

fn init_vec(str: String, num_vec: &mut Vec<i32>) -> i32 {
    let mut num_count_map: HashMap<i32, i32> = HashMap::new();
    let mut selected_value: [i32; 2] = [0, 0];
    for item in str.split_whitespace() {
        let num: i32 = item.parse().expect("error");
        let result_count = num_count_map.entry(num).or_insert(0);
        *result_count += 1;
        if *result_count > selected_value[1] {
            selected_value = [num, *result_count];
        }
        num_vec.push(num);
    }
    selected_value[0]
}

```
