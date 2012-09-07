--- 
status: publish 
layout: post 
title: C/S架构
tags: Technics 
published: true 
type: post 
--- 

### 服务器的处理步骤

解析浏览器的请求，在服务目录中查找相应的文件，
如果找不到该文件就返回404错误页面; 
如果找到了浏览器请求的文件，用stat(2)检查它是否可执行。

如果该文件可执行：
* 发送HTTP/1.1 200 OK给客户端
* fork(2)，然后用dup2(2)重定向子进程的标准输出到客户端socket
* 在子进程中exec(3)该CGI程序
* 关闭连接

如果该文件不可执行：
* 发送HTTP/1.1 200 OK给客户端
* 如果是一个图片文件，根据图片的扩展名发送相应的Content-Type给客户端
* 如果不是图片文件，这里我们简化处理，都当作Content-Type: text/html
* 简单的HTTP协议头有这两行就足够了，再发一个空行表示结束
* 读取文件的内容发送到客户端
* 关闭连接

