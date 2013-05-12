--- 
published: false
title: iOS开发学习笔记series (1)
type: post 
layout: post 
description: 第一篇先学习下iOS开发基础中的基础－－Objective-C的语法
keyword: Objective-C, ios, development, xcode, cocoa, programming
--- 

应用程序启动时，载入 MainStoryboard.storyboard，接着根据它对初始视图控制器进行实例化。视图控制器是管理区域内容的对象；而初始视图控制器是应用程序启动时载入的第一个视图控制器。

“HelloWorld”应用程序仅包含一个视图控制器（具体来说就是 HelloWorldViewController）。现在，HelloWorldViewController 管理由单视图提供的一个区域的内容。视图是一个对象，它在屏幕的矩形区域中绘制内容，并处理由用户触摸屏幕所引起的事件。一个视图也可以包含其他视图，这些视图称为分视图。当一个视图添加了一个分视图后，它被称为父视图，这个分视图被称为子视图。父视图、其子视图以及子视图的子视图（如有的话）形成一个视图层次。一个视图控制器只管理一个视图层次。

一个视图控制器负责管理一个场景，而一个场景代表一个内容区域。

当用户激活一个 UI 元素时，该元素可以向知道如何执行相应操作方法的对象发送一则操作消息，例如“将此联系人添加到用户的联系人列表”。这种互动是目标-操作机制的一部分，该机制是另一种 Cocoa Touch 设计模式。

注：IBAction 是一个特殊关键词，用于告诉 Xcode 将一个方法作为目标-操作连接的操作部分来处理。IBAction 被定义为 void。
操作方法中的 sender 参数指向发送操作消息的对象（在本教程中，发送对象为按钮）。

注：IBOutlet 是一个特殊关键词，仅用于告诉 Xcode 将对象作为 outlet 处理。它实际上的定义为什么都不是，因此在编译时不起作用。

编译器自动为您声明的任何属性合成存取方法。存取方法是一种获取或设定一个对象的属性的值的方法（因此，存取方法有时也称为“getter”和“setter”）。例如，编译器为刚刚声明的 userName 属性生成以下的 getter 和 setter 声明及其实现：

- (NSString *)userName;
- (void)setUserName:(NSString *)newUserName;
编译器也自动声明专有实例变量以支持每一个经声明的属性。例如，编译器声明名为 _userName 的实例变量以支持 userName 属性。

注：编译器将生成的存取方法添加到编译代码，而不是添加到您的源代码中。


如果生成并运行应用程序，在点按按钮时应该会看到标签显示“Hello, World!”。如果您选择文本栏并开始在键盘上键入，您会发现完成文本输入后，仍然无法让键盘消失。

在 iOS 应用程序中，允许文本输入的元素成为第一响应器时，键盘会自动出现；元素失去第一响应器状态时，键盘会自动消失。（前面提到过第一响应器是第一个接收各种事件通知的对象，例如轻按文本栏来调出键盘。）虽然无法从应用程序直接将消息发送给键盘，但是可以通过切换文本输入 UI 元素的第一响应器状态这种间接方式，使键盘出现或消失。

UITextFieldDelegate 协议是由 UIKit 框架定义的，它包括 textFieldShouldReturn: 方法，当用户轻按“Return”按钮（不管该按钮的实际名称是什么）时，文本栏调用该方法。因为您已经将视图控制器设定为文本栏的委托（在“设定文本栏的委托”中），可以实施该方法，通过发送 resignFirstResponder 消息强制文本栏失去第一响应器状态，以该方法的副作用使键盘消失。

### Reference:

1. 马上着手开发 iOS 应用程序 (Start Developing iOS Apps Today): https://developer.apple.com/library/ios/#referencelibrary/GettingStarted/RoadMapiOSCh/chapters/RM_YourFirstApp_iOS/Articles/00_Introduction.html


部分Xcode快捷键：

- Tab ： 接受代码提示
- Esc ： 显示代码提升
- Control＋. ： 循环向下浏览代码提示
- Control＋shift＋. ： 循环向上浏览提示
- Control＋⌘＋S ： 创建快照
- Control＋F/B ：前／后移动光标
- Control＋P/N ：上／下行移动光标
- Control＋I ：重排代码，相当于VIM的“＝”
- ⌘＋[ ：左移代码块
- ⌘＋] ：右移代码块
- ⌘＋Y ： 调试方式运行
- ⌘＋option＋P ： 继续（调试器）
- ⌘＋option＋O ： 跳过（调试器）
- ⌘＋option＋I ： 调入（调试器）
- ⌘＋option＋T ： 跳出（调试器）



常用Mac键盘符号：

- ⌘(Command 鍵)：有時稱為「Apple 鍵 」
- ^(Control 鍵)
- ⌥(Option 鍵)：這個按鍵也可能有「Alt」字样
- ⇧(Shift 鍵)
- ⇪(Caps Lock)：切換大小写的开关
- Fn (功能鍵)：位於Mac笔记本內建鍵盤的左下角

**所有键盘符号：**
![AppleKeyboardSymbols](http://img.hb.aicdn.com/64043b6308364db9eeebfd40d7c5d92f0e1777491920f-45OOIQ)

Mac快捷键

- 特殊字符：command + option + T，[link](http://www.goston.net/2008/10/14/1791/)
- 显示桌面：command + F3 
- 切换中英文：拼音输入法下，开启大写capslock，即可键入英文。




