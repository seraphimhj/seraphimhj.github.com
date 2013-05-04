--- 
published: true
title: iOS开发学习笔记 Series.1: Objective-C基础
type: post 
layout: post 
description: Objective-C是iOS开发的首选编程语言，是程序开发的基石。但是它并不难学，任何有其他语言基础的同学都能很快上手。正因为它如此基础而又重要，所以开篇第一章就是介绍它的，下面我尝试把这个语言的细节理清楚...
keyword: Objective-C, ios, development, xcode, cocoa, programming
--- 

Objective-C是iOS开发的首选编程语言，是程序开发的基石。但是它并不难学，任何有其他语言基础的同学都能很快上手。正因为它如此基础而又重要，所以开篇第一章就是介绍它的，下面我尝试把这个语言的一些基础细节理清楚。

因为是想到一些说一些，行文组织上会稍显松散和凌乱。


### Cocoa库

Cocoa和Objective-C是Mac OS的核心。Cocoa也就是NeXT公司采用Objective-C开发的功能强大的用户界面工具包（NextSTEP，这也是为什么内置类库的前缀是NS的缘由）。



### 头文件

.m扩展名包含类的实现（implement）， Objective-C 头文件后缀名是.h，类的声明部分。在objective-C中，＃import会“聪明”地只导入一次头文件，而在C／C++，需要用＃ifndef来保证。示例：

```objective-c
#import <Foundation/Foundation.h>
```
	

### 程序入口

与其他高级语言一样， Objective-C 也是从main函数开始程序的执行。

By the way, iOS开发中，通常main.m文件，只是用来创建一个自动释放内存池（autorelease pool），并调用UIApplicationMain()，主要的处理逻辑在UIApplicationMain()完成。

如下：

``` objective-c
#import <UIKit/UIKit.h>
#import "AppDelegate.h"

int main(int argc, char *argv[])
{
    @autoreleasepool {
        return UIApplicationMain(argc, argv, nil, NSStringFromClass([AppDelegate class]));
    }
}
```


### 数据成员

一般我们在类里面声明成员变量，并实现其存取方法。

``` objective-c
＃import <Cocoa/Cocoa/h>

#interface Person : NSObject {
    NSString * name;
    NSNumber * age;
}

- (NSString *) name;
- (void) setName: (NSString *) newname;

- (NSNumber *) age;
- (void) setAge: (NSNumber *) newage;

@end
```

最新版的Objective－C，我们可以通过声明与数据成员同名的property来省去读写函数的声明和定义，也省去成员的声明，只需要两个@property，一切搞定。

person.h

``` objective-c
＃import <Cocoa/Cocoa/h>

#interface Person : NSObject

@property NSString* name;
@property NSNumber* age;

@end
```

person.m

``` objective-c
#import "person.h"

@implementation Person

@end
```

聪明的Xcode帮我们把剩余的工作补上：内部使用了_name和_age两个成员名称。

### 方法调用

``` objective-c
[object methodname]

[object methodwithinput: input]

[object methodwithtwoinput: input1 anotherinput: input2]
```
	

在 Objective-C 中方法的定义格式是：

-/+ (返回类型) 方法名: (参数1类型) 形参1  参数2描述: (参数2类型) 形参2 参数3描述: (参数3类型) 形参3 ...

其方法原型是：

方法名:参数2描述:参数3描述...

对于上面几个例子，原型分别为：

methodname

methodwithinput:，注意带参数的方法后面需加冒号":"

methondwithtwoinput:anotherinput:，它与methodwithtwoinput是两个方法。

相同的方法原型会进行重载，重载的几要素：**方法名、参数个数和参数描述**，与参数类型无关。

参数描述被称作**内部参数名**(internal argument name)，即给方法调用时用; 而行参被叫做**外部参数名**(external argument name)

不推荐不带参数描述的方法，虽然也是合法的。

Objective-C对象调用各种方法，实际上就是对象之间的消息传递。


### Objective-C的消息传递机制

Objective-C 为面向对象编程，是C语言的扩展，可以认为是另一种C++，它由成员变量组成，强调消息传递（类比C++中的方法调用），动态绑定（dynamic－binding）而非静态编译，可以向类传递任何消息，而不需要在编译期声明这些消息的处理方法。


消息传递是通过调用“id objc_msgSend(id theReceiver, SEL theSelector, …)”，表示theReceiver调用theSelector指定的消息名（方法名），支持不定参数，[具体点我](http://www.keakon.net/2011/08/10/Objective-C%E7%9A%84%E6%B6%88%E6%81%AF%E4%BC%A0%E9%80%92%E6%9C%BA%E5%88%B6)。


### 常用的数据结构 

所有 Objective-C 的对象变量都是指针类型，当你不知道类的类型时，可以用id表示通用的对象（any kind of obecject）。

#### NSString

@“”，表示双引号内的字符串作为Cocoa的NSString元素。

#### 布尔类型（BOOL）

1. in objc.h：typedef signed char BOOL; 
1. YES（Value “1”）／NO（Value “0”）；
1. C语言中非零值即为真值，但在 Objective-C 中并不是这样；
2. 不要和YES判断；
3. Char，8位截断；
4. [更多详情](http://blog.bignerdranch.com/564-bools-sharp-corners/)



### 内存管理机制

在Objective-C中，有两种内存管理方式：

第一种：垃圾回收（Garbage Collection）

在程序运行态的空闲时刻，扫瞄发现没有被引用的内存，然后释放。虽然偶尔运行，但是不可避免地，因为扫瞄的方式，令垃圾回收机制比其他方式耗费更多的内存。

启用垃圾回收后，通常的内存管理命令全部变成了空操作指令，不执行任何操作。

有了自动方式的内存管理机制，在达到一定规模（性能开销）之前，开发者可以全心着力于业务逻辑的设计上。

第二种：自动引用计数（Automate Reference Counting，ARC）

但并不是所有的环境都能支持垃圾回收，尤其是在手机这样的资源紧缺设备上开发，这时，你不得不使用引用计数的机制来管理内存。

在此之前，首先了解一下基础的内存管理知识：

引用计数，即对资源的引用进行计数，当为类分配了一块新的内存空间时，这个对象的引用计数为1；当复制该对象时，引用计数加1；当释放对象时，引用计数减1；最后当对象引用计数值为0时，会从内存池中释放掉。

这样做的好处是，把需要运行态扫瞄的操作，移到编译态进行指定的引用计数操作。

程序中引用计数的实现有两种方式：


1.手动的方式

对于内建类来说，本身就带有自动release特性。
	

```objective-c
		// must release this when done
		NSString* string2 = [[NSString alloc] init];
		[string2 release];
```
	

2.自动管理方式：		

Cocoa非常智能，引用的retain（保留计数）和release（释放计数）操作都由编译器自动加上。简化了开发，降低了崩溃和内存泄漏的风险，也使运行内存更精简，效率得到提升。

还记得上面程序入口的章节，有一段代码：

```objective-c
		@autoreleasepool ｛
			// Code benefitting from a local autorelease pool.
			// string1 will be released automatically
			NSString* string1 = [NSString string];
		｝		 
```


### Reference:

1. http://cocoadevcentral.com/d/learn_objectivec/
2. http://www.cnblogs.com/VinceYuan/archive/2010/03/08/1680488.html
3. http://deeploveapple.blogspot.jp/2012/09/objective-c-mactoday-20129.html
