<meta http-equiv="content-type" content="text/html; charset=UTF-8">
--- 
status: publish 
layout: post 
title: Wordpress代码高亮插件及半角引号问题
tags: code highlight, plugin, Wordpress 
published: true 
type: post 
--- 

作为一个IT从业人员的个人网站，和各种代码打交道是家常便饭。

因此一款好的wordpress代码高亮插件，来整理代码，规范输入，显得尤为必要。

本文针对此问题，搜集了网路上流传的各种插件，并提出了我的个人解决方案。 

* * * * *


在介绍插件之前，建议读者首先**解决WordPress代码半角引号变全角问题**。

#### 问题的提出

这个问题是由于wordpress的智能化程度太高，自动将半角引号转换为全角，包括单引号、双引号等，导致代码在流传中，出现各种各样的问题。正是一个标点引发的血案...

#### 解决方案(来自互联网)

1）找到主题目录的functions.php ，在开头加入这段代码

    remove_filter('the_content', 'wptexturize');

2）找到WordPress安装目录/wp-includes/"目录里面的"formatting.php"文件；将这段代码全部注释掉

修改前：

    // static strings
    $curl = str_replace($static_characters,
          $static_replacements, $curl);

    // regular expressions
    $curl = preg_replace($dynamic_characters,
          $dynamic_replacements, $curl);

修改后：

    // static strings
    // $curl = str_replace($static_characters,
    //       $static_replacements, $curl);

    // regular expressions
    // $curl = preg_replace($dynamic_characters,
    //       $dynamic_replacements, $curl);

实践之后发现，第二种方法会导致"Warning: Cannot modify header information - headers already sent by (...)"的annoying warning，目前第一种方法还没发现缺陷，建议使用。 

Ok，下面言归正传，开始介绍怎样在wordpress Post中贴上美观的代码风格。

#### 一、江湖代有豪杰出，各领风骚数十年

关于Wordpress的代码插件网络上有很多，随意google或百度之，大致可以看到关于以下几种的介绍：

- **1. WP-Syntax** 
特点：支持多语言、行号、横向竖向滚动条， 
效果图：
![effect](http://s.wordpress.org/extend/plugins/wp-syntax/screenshot-2.png?r=422729)
点评：这款WordPress代码高亮插件灰常不错，安装后直接启用即可。
在可视化编辑和HTML下自由切换，并且在Windows live
writer中还供给了该插件的支持，方便用writer写博。
使用方法： 
    `<pre lang="php"> your code code</pre>`

- **2. WP-SynHighlight** 
特点：支持多语言、行号、横向竖向滚动条、**展开收起**
点评：这款安装后会在WordPress后台编辑器中生成一个代码插入按钮，使用非常方便。
输出的代码展目前一个代码输出框内，有横向和树向滚动条。
也能够在可视化和HTML模式下任意转换，无论在哪种模式下编辑代码都能够高亮，但部分代码与liverwriter不兼容，适合喜欢在WordPress后台写博的朋友。
使用方法：
    `[codesyntax lang="php"] your code here [/codesyntax]`

- **3. Codecolorer** 
特点：支持多语言、行号、横向竖向滚动条 支持RSS输出代码高亮。 
效果图：
![](http://s.wordpress.org/extend/plugins/codecolorer/screenshot-2.png?r=422729)
点评：使用这款插件的人非常的多！
颜色高亮方面很突出，遗憾的是貌似这款插件不能在可视化编辑和HTML下切换。 
使用方法：
    - `your code here ;`
    - `[cc lang="lang"] your code here [/cc]`

- **4. Google Syntax Highlighter for WordPress**
特点：100%基于js，支持多种语言、行号，支持多种浏览器，超轻量级，效果图如下：
![](http://s.wordpress.org/extend/plugins/google-syntax-highlighter/screenshot-1.png?r=422723) 
点评：支持以 Plain Text方式浏览代码，支持快速剪切和打印，简洁不失功能! 
使用方法： 
    `<pre class="c-sharp"> your code here</pre>`

- **5. Prettify GC Syntax Highlighter** 
特点：支持多语言、行号,与html兼容，并且能指定背景色，上效果图：
![](http://s.wordpress.org/extend/plugins/prettify-gc-syntax-highlighter/screenshot-1.png?r=422729)
点评：本博正在使用，非常符合我的需求：简单，唯一的功能是能使你的代码与google code中的样式一样，就是它了！
使用方法： 
    `<pre class="prettyprint"> your code here</pre>`

#### 二、大道至简，无招胜有招

可能有朋友会觉得安装插件，拖慢了网站的速度，不用着急，本文还给出了另一种解决方案：生成html语言，直接在贴入编辑器。 
1. 借助在线生成代码html的网站目前知道的有“发芽网”，然而，每次贴代码都需要打开网站，略显麻烦，适合有插件洁癖的童鞋。

2. 本地生成代码高亮html，一个小工具：CodeRender
    该程序是基于dp.SyntaxHighlighter，支持常见的语言，操作也比较简便。不过要想正确显示代码高亮还需在WordPress主题中加载代码样式文件“highlight.css”（下载的压缩包中包含）。
    建议大家直接复制highlight.css中的代码到主题style.css文件中，也可以个性化定制“highlight.css”，改变代码高亮、边框、背景等颜色。

以上是两种非插件的方法，既然我已经选择了Prettify GC Syntax Highlighter，先试用一段时间再说吧。 

最新报告：Prettify GC Syntax Highlighter竟然不支持**PHP代码**的高亮，桑心地转而投入**[AutoSyntaxHighlighter](http://wordpress.org/extend/plugins/auto-syntaxhighlighter/)**的怀抱，一款简单而好用的代码插件。


Wordpress建站的道路仍然任重而道远，她的快乐就在于折腾，正是痛并快乐着......

继续, Man

