--- 
published: true
title: iOS开发学习笔记(Series.1)：Objective-C基础
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

.m扩展名包含类的实现（implement），Objective-C 头文件后缀名.h，是类的声明部分。在objective-C中，＃import会“聪明”地只导入一次头文件，而在C／C++，需要用＃ifndef来保证。示例：

```objc
    #import <Foundation/Foundation.h>
```

### 程序入口

与其他高级语言一样， Objective-C 也是从main函数开始程序的执行。

By the way, iOS开发中，通常main.m文件，只是用来创建一个自动释放内存池（autorelease pool），并调用UIApplicationMain()，主要的处理逻辑在UIApplicationMain()完成。

如下：

``` objc
    #import <UIKit/UIKit.h>
    #import "AppDelegate.h"

    int main(int argc, char *argv[])
    {
        @autoreleasepool {
            return UIApplicationMain(argc, argv, nil, 
                NSStringFromClass([AppDelegate class]));
        }
    }
```


### 数据成员

一般我们在类里面声明成员变量，并实现其存取方法。

``` objc
    #import <Cocoa/Cocoa/h>

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

最新版的Objective-C，我们可以通过声明与数据成员同名的property来省去读写函数的声明和定义，也省去成员的声明，只需要两个@property，一切搞定。

文件头person.h声明:

``` objective-c
    #import <Cocoa/Cocoa/h>

    #interface Person : NSObject

    @property NSString* name;
    @property NSNumber* age;

    @end
```

主体文件person.m定义:

``` objective-c
    #import "person.h"

    @implementation Person

    @end
```

聪明的Xcode帮我们把剩余的工作补上：内部使用了\_name和\_age两个成员名称，并为这两个属性分别实现了setter和getter两个方法。

``` objective-c
	Person passenger;
	NSString originName = [passenger name];
	[passenger setName: @"Tommy"];
```

引入点号运算符，上面代码等价于：
 
``` objective-c
	Person passenger;
	NSString originName = passenger.name;
	passenger.name = @"Tommy";
```

以等号的左值和右值分别区分是setter还是getter方法。

另外，Property也可以带上参数:

1. readwriter (default), readonly;
1. 定义方法名，例如
    @property (getter=isFinished) BOOL finished;
1. 原子性：
    1. atomic (default)，即原子操作，setter和getter等操作为不会被线程调度所打断;
    1. nonatomic, 当不同线程访问同一变量时，操作不确定，好处是：比atomic快速.
    1. atomic并不保证线程安全，因为getter或setter可能包含其他（多个）变量访问。
1. strong (default), weak（一些类不支持weak，则使用unsafe_unretained）：是否会保持引用；
1. assign/copy/retain：决定以何种方式对数据成员赋予新值，简单的赋值、复制或增加1引用计数。
2. 多参数在参数间用","分隔，示例：

```objc
	@property (readonly, getter=isFinished) BOOL finished;
```

### 方法调用

在Objective-C中方法的定义格式是：

-/+ (返回类型) 方法名: (参数1类型) 形参1  参数2描述: (参数2类型) 形参2 参数3描述: (参数3类型) 形参3 ...

其方法原型是：

方法名:参数2描述:参数3描述...
 
``` objective-c
    [object methodname]

    [object methodwithinput: input]

    [object methodwithtwoinput: input1 anotherinput: input2]
```
	      
对于上面几个例子，原型分别为：

methodname

methodwithinput:，注意带参数的方法后面需加冒号":"

methondwithtwoinput:anotherinput:，它与methodwithtwoinput是两个方法。

相同的方法原型会进行重载，重载的几要素：**方法名、参数个数和参数描述**，与参数类型无关。

参数描述被称作**内部参数名**(internal argument name)，即给方法调用时用; 而行参被叫做**外部参数名**(external argument name)

不推荐不带参数描述的方法，虽然也是合法的。

Objective-C对象调用各种方法，实际上就是对象之间的消息传递。


### Objective-C的消息传递机制

> Objective-C 为面向对象编程，是C语言的扩展，可以认为是另一种C++，
> 它由成员变量组成，强调消息传递（类比C++中的方法调用）。

怎么理解消息传递和方法调用地区别呢？

方法的调用前提是该对象存在该方法，然后才能调用，否则失败，编译器返回错误（熟悉C++的同学肯定很清楚这种编译错误），

再回到消息传递，比如[car fly]，虽然对象car并没有fly方法，但这在Objective-C中是没问题的，它会抛出异常，但并不会出错或当掉，所有消息直到运行时才会动态决定。

看到这里，相信部分读者会觉得有点眼熟，没错，就是动态绑定（dynamic-binding），相对的是静态编译，

消息传递是通过调用“id objc_msgSend(id theReceiver, SEL theSelector, …)”，表示theReceiver调用theSelector指定的消息名（方法名），支持不定参数，[具体点我](http://www.keakon.net/2011/08/10/Objective-C%E7%9A%84%E6%B6%88%E6%81%AF%E4%BC%A0%E9%80%92%E6%9C%BA%E5%88%B6)。

总结起来，Objective-C可以向类传递任何消息，而不用在编译期声明这些消息的处理方法。


### 常用的数据结构 

所有 Objective-C 的对象变量都是指针类型，当你不知道类的类型时，可以用id表示通用的对象（any kind of obecject）。

#### 布尔类型（BOOL）

1. in objc.h：typedef signed char BOOL; 
1. YES（Value “1”）／NO（Value “0”）；
1. C语言中非零值即为真值，但在 Objective-C 中并不是这样；
2. 不要和YES判断；
3. Char，8位截断；
4. [更多详情](http://blog.bignerdranch.com/564-bools-sharp-corners/)

#### NSString

1. @""，表示双引号内的字符串作为Cocoa的NSString元素；
2. 格式化输出用"%@"，实际上"%@"同样也适用于大部分NS数据结构，  
只要实现了`(NSString *)description()`函数；
3. 可变版本 NSMutableString


#### NSNumber

- 支持任何基础计数类型：char，double，float，int，long，short 以及 unsigned；
- 常量，且没有可变版本；
- 类方法初始化：
	+	initWithInt，
	+	initWithUnsignedInt，
	+	initWithLong，
	+	initWithBOOL，
	+	numberWithFloat，
	+	numberWithDouble，
	+	numberWithChar
- 特殊定义符：@，  
```objc
NSNumber *simpleFloat = @3.14f;
```

#### NSArray

1.有序不可变数组，以nil结束；

2.可变版本NSMutableArray；

3.初始化

可以通过以下成员方法：

```objc
+ (id)arrayWithObject:(id)anObject;
+ (id)arrayWithObjects:(id)firstObject, …;
- (id)initWithObjects:(id)firstObject, …;
```

也可以直接定义： 
   
```objc
NSArray *someArray = 
	[NSArray arrayWithObjects:someObject, someString, someNumber, nil];
```

同样也有特殊定义符：
  
```objc
NSArray *someArray = 
	@[firstObject, secondObject, thirdObject];
```

4.是否存在元素：`containsObject`；

5.第N个元素：`objectAtIndex`，下标方式：`someArray[0]`;

6.排序：`sortedArrayUsingSelector:@selector(compare:)`

#### 其他

还有许多内置的类：NSSet，NSDictionary，NSNull，都很基础，任何一本书都不会漏掉他们，感兴趣的也可以去参考链接中查看，这里不一一赘述。



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


还记得上面程序入口的章节，有一段代码：

```objective-c
		@autoreleasepool ｛
			// Code benefitting from a local autorelease pool.
			// string1 will be released automatically
			NSString* string1 = [NSString string];
		｝	
			 
```

代码块包含的部分，引用的retain（保留计数）和release（释放计数）操作都由编译器自动加上。

这样的设计解放了开发人员的精力，使之尽量focus在业务上的开发；同时也降低了崩溃和内存泄漏的风险，也使运行内存更精简，效率得到提升。

### 类别 (Category)

类别为现有的类添加新方法。为了避免和原类以及原类的子类方法冲突，因此类别中的新方法前最好加上个人前缀加以区分。

```objc
	@interface NSString (NSStringDisplayAdditions)
	- (NSString *) urlEncodedString ();
	@end
	
	
	@implementation NSString
	- (void) urlEncodedString () {
		// 实现方法
	}
	
	@end
	
```

注意：一般的类别中不能添加新的成员变量，如果你非要添加，建议可以使用继承子类的方式；如果你既不想使用继承的方式，又想添加新成员变量，那么可采用类扩展（Class Extension）的方法，又叫匿名类别（Anonymous Category）：

```objc
	@interface ClassName ()
	
	@end
```

注意2：匿名类别使用必须要有原类的代码联编，所以不能为框架类（比如NSString）声明这种匿名类别。


### 协议 (Protocol)

大家都知道通讯中的协议，是消息传输两端预定的接口、格式和流程等等。

类比到程序中类和类之间传递消息的协议，可以认为就是*接口*。

有正式协议和非正式协议之分，非正式协议随着XCode的升级换代已渐渐被淘汰，相同功能可以由正式协议的optional代替。

一个协议的例子：

```objc
	@protocol Locking
	- (void) lock;
	- (void) unlock;
	@end
	
```

协议只提供声明，实现需要由采纳该协议的类来实现，非optional声明的方法必须实现。

下面的类遵循该协议：

```objc
	@interface Benz : Car <Locking>
	@end
	
	@implementation Benz
	- (void) lock {
		// 实现方法
	}
	
	- (void) unlock {
		// 实现方法
	}
	@end
	
```

### Reference:

1. http://cocoadevcentral.com/d/learn_objectivec/
2. http://www.cnblogs.com/VinceYuan/archive/2010/03/08/1680488.html
3. http://deeploveapple.blogspot.jp/2012/09/objective-c-mactoday-20129.html
4. [Apple官方Objective-C教程](http://developer.apple.com/library/mac/#documentation/Cocoa/Conceptual/ProgrammingWithObjectiveC/Introduction/Introduction.html)
5. [Memory Management Programming Guide for Core Foundation](http://developer.apple.com/library/ios/#documentation/CoreFoundation/Conceptual/CFMemoryMgmt/CFMemoryMgmt.html)
6. [NSAutoreleasePool Class Reference](http://developer.apple.com/library/ios/#documentation/Cocoa/Reference/Foundation/Classes/NSAutoreleasePool_Class/Reference/Reference.html)
7. [Objective-C Wiki](http://zh.wikipedia.org/wiki/Objective-C)
