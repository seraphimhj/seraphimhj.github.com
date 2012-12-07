---
layout: post
type: post
title: Road Towards Jekyll
description: 我的jekyll之旅，from wp to jekyll。一些基础页面知识，可供新手参考。
keywords: jekyll,github,git-page,gh-page,blog
---

对于一个技术狂人来说，没什么比COOL更吸引他们了：

Jekyll就是这样一项技术。

网页设计在最初的HTML静态编辑，走到数据库、PHP等脚本的动态生成，仿佛一场轮回，反璞归真又回到了静态页面的构建，这就是Jekyll。

有了JS的帮助，Jekyll轻易就用静态页面玩转动态酷炫的效果；

本博客从wordpress起步，一直看重ta丰富的插件，和简易的搭建，但是，有什么比得上在本地用VIM写博客，一条命令部署来的让人舒服呢。

于是褪去繁华的外衣，Geek回归。

下面是一些参考学习的站点(大家可以补充)：

Jekyll的介绍参见[自带帮助](http://huangjian.info/jekyll-introduction/)

搭乘了Bootstrap架构（前端Javascript框架[E文](http://twitter.github.com/bootstrap/)，[中文](http://wrongwaycn.github.com/bootstrap/docs/index.html))的Jekyll，所谓的JB([Jekyll-Bootstrap](http://jekyllbootstrap.com/))，作者是一个年轻小伙，但是功能不凡。值得一提的是，在这里可以快速在GitHub上创建页面。

下面简单介绍一下利用Jekyll框架定制化多种评论/网站分析等第三方服务。

Jekyll之所以称作框架，就是因为其能满足个人定制化的需求，兼容并包，主要是引入了[YAML](https://github.com/mojombo/jekyll/wiki/YAML-Front-Matter)进行预处理来实现的。

利用YAML可以自定义变量，通过在`_config.yaml`中赋值，在网页中`{$ varname $}`(用$代替{和})进行调用；

类似于其他语言，可以方便地在网页嵌入一段代码，`{@ include xxx @}` (以下用@代替%)；

对配置进行判断，最后选择当前网站采用的服务，下面这个是我的comment文件的写法，从而实现个性化的需求，供参考：

    {@ if site.JB.comments.provider @}
     
    {@ case site.JB.comments.provider @}
    {@ when "weibo" @}
      {@ include JB/comments-providers/weibo @}
    {@ when "uyan" @}
      {@ include JB/comments-providers/uyan @}
    {@ when "disqus" @}
      {@ include JB/comments-providers/disqus @}
    {@ when "livefyre" @}
      {@ include JB/comments-providers/livefyre @} 
    {@ when "intensedebate" @}
      {@ include JB/comments-providers/intensedebate @}
    {@ when "facebook" @}
      {@ include JB/comments-providers/facebook @}
    {@ when "custom" @}
      {@ include custom/comments @}
    {@ endcase @}
     
    {@ endif @}

当然你也可以直接[fork](https://github.com/seraphimhj/seraphimhj.github.com/fork)我的博客，

GoodLuck!

[Heroku create失败解决方法]: http://blog.project-sierra.de/archives/1534

