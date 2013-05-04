--- 
published: true
title: 初识Javascript
type: post 
layout: post 
description: 简单介绍Javascript的语法和应用，Javascript高级程序设计的读书笔记。
keyword: javascript,javascript professional,语法,javascript高级程序设计,读书笔记,javascript程序,js,javascript教程
--- 
 
## 基本语法

Javascript的语法规则和C语言比较类似，拥有if，for，while等语句，也有位操作，四则运算，条件运算，逗号运算。

简单说下它区别类C语言的独到设计：

- Javascript被设计成一种动态的脚本语言，它的变量是弱类型的，所有变量都使用`var`来定义（也可以不用var，则定义变量作用域为全局），而不必指定其类型;

- Javascript不存在块级作用域，一旦定义在后面的代码中（包括语句块外）就可以任意使用；

- 全等判断：等式两边不需要转换就已相等；

- 函数设计：实参和定义不必完全匹配（参数个数或类型），参数用arguments数组表示。不存在重载函数，同名函数采用最后定义的函数版本；

- With语句：将代码作用域设置到一个特定的对象中。如下例search, hostname, href都是location的成员，可以精炼：

```js
with (location) {
    var qs = search.substring(1);
    var hostName = hostname;
    var url = href;
}
```

</br>

## 变量、作用域和内存问题

### 变量
> Javascript变量松散的本质,决定了它只是在特定时间用于保存特定值的一个名字而已。
> 变量的值及其数据类型可以在脚本的生命周期内改变。

Javascript变量可能包含两种数据类型的值：基本类型值和引用类型值。

基本数据类型：Undefined, Null, Boolean, Number和String，按值访问；

引用类型：多个值构成的对象（object），按引用访问，实际上复制和函数传值的是对象地址的副本（即指针）。

我们可以使用typeof来判断是否引用类型（返回基本类型 + “object”），使用instanceof操作符获知具体类型的对象（xxx instanceof Object, return: ture or false）

### 执行环境及作用域

执行环境 => 变量对象（inc var, func） => 作用域链（scope chain）

> 作用域链：保证对执行环境有权访问的所有变量和对象的有序访问

作用域链 =  当前所在环境的变量对象 + 包含（外部）环境 + 下一个包含环境 + ... + 全局执行环境

最外围的执行环境 => 全局执行环境（Web浏览器中，为window对象）

with语句在作用域链最前端增加一个变量，执行完后即移除;

try-catch创建一个新的变量对象，包含被抛出的错误对象的声明。

### 垃圾收集

**标记清除**：Javascript中最常用的垃圾收集方式，当变量进入环境（如函数中声明一个变量），则标记“进入环境”，而当变量离开环境，则将其标记为“离开环境”；垃圾收集器在运行时清除“离开环境”标记的变量，销毁它们所占用的空间。

**引用计数**：跟踪记录每个值被引用的次数，垃圾收集器运行过程中对引用次数为0的变量，销毁空间，从而回收内存。

其中，引用计数的方式会有一个严重的问题：循环引用，当对象离开执行环境后，计数永远不为0，因此仍将继续存在。

> 循环引用：对象A包含一个指向对象B的指针，对象B也包含一个指向对象A的引用。

优化内存使用的方式：一旦数据不再有用，就设置其值为Null来释放其引用，这个做法叫**解除引用（dereferencing）**


## 引用类型

### Object类型

### Array类型

### Date类型

### RegExp类型

### Function类型

### 基本包装类型

### 单体内置对象
