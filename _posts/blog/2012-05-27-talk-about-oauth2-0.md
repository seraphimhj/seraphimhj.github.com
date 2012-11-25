<meta http-equiv="content-type" content="text/html; charset=UTF-8">
--- 
title: Talk about OAuth2.0 
type: post 
status: publish 
tags: oauth2 
layout: post 
description: 应用与开放平台认证机制 Oauth2.0 的介绍，应用场景，具体认证和授权过程，以及其中涉及的证书介绍等等。
keywords: oauth,oauth2.0,credentials,token,app,platform,authenticate
--- 

作为一个应用开发者，需要与用户的数据交互信息，需要有一种简单方便的认证方式，授权访问用户数据；作为一个服务提供者，鉴于用户数据的保密需求和数据分享的需求，需要有一套严格完善的流程来控制其他第三方应用的认证; 

于是，OAuth应运而生。

* * * * * *

**OAuth（开放授权）是一个开放标准，允许用户让第三方应用访问该用户在某一网站上存储的私密的资源（如照片，视频，联系人列表），而无需将用户名和密码提供给第三方应用.** 　　

允许用户提供一个令牌，而不是用户名和密码来访问他们存放在特定服务提供者的数据。每一个令牌授权一个特定的网站（例如，视频编辑网站)在特定的时段（例如，接下来的2小时内）内访问特定的资源（例如仅仅是某一相册中的视频）。这样，OAuth允许用户授权第三方网站访问他们存储在另外的服务提供者上的信息，而不需要分享他们的访问许可或他们数据的所有内容。 

OAuth目前的版本是2.0，下面是它的介绍：

> OAuth 2.0 focuses on client developer simplicity while providing specific authorization flows for web applications, desktop applications, mobile phones, and living room devices.

###  证书和令牌 (Credentials and Tokens)

OAuth使用三种证书：

- **客户证书（client credentials, aka. consumer key and secret）** 
  用于服务端对客户端的认证，客户端可以获得用户的更多信息，某些情景下，客户证书不能信任，它只能用于获取信息目的上。 
    > The client credentials are used to authenticate the client. This allows the server to collect information about the clients using its services, offer some clients special treatment such as throttling-free access, or provide the resource owner with more information about the clients seeking to access its protected resources. In some cases, the client credentials cannot be trusted and can only be used for informational purposes only, such as in desktop application clients.
- **临时证书（temporary credentials, aka. request token and secret）**
  OAuth认证过程采用临时证书来识别认证请求。 
    > The OAuth authorization process also uses a set of temporary credentials which are used to identify the authorization request. In order to accommodate different kind of clients (web-based, desktop, mobile, etc.), the temporary credentials offer additional flexibility and security.
- **令牌证书（token credentials, aka. access token and secret）**
  用户可以不用在客户端输入帐号密码，即可让第三方客户端获取存放在服务器端的用户私人数据。 
    > Token credentials are used in place of the resource owner’s username and password. Instead of having the resource owner share its credentials with the client, it authorizes the server to issue a special class of credentials to the client which represent the access grant given to the client by the resource owner. The client uses the token credentials to access the protected resource without having to know the resource owner’s password. Token credentials include a token identifier, usually (but not always) a random string of letters and numbers that is unique, hard to guess, and paired with a secret to protect the token from being used by unauthorized parties. Token credentials are usually limited in scope and duration, and can be revoked at any time by the resource owner without affecting other token credentials issued to other clients.

###  认证和授权过程

#### 在认证和授权的过程中涉及的三方包括： 　　

- 服务提供方，用户使用服务提供方来存储受保护的资源，如照片，视频，联系人列表。
- 用户，存放在服务提供方的受保护的资源的拥有者。
- 客户端，要访问服务提供方资源的第三方应用，通常是网站，如提供照片打印服务的网站。在认证过程之前，客户端要向服务提供者申请客户端标识。
使用OAuth进行认证和授权的过程如下所示: 　　
  1. 用户访问客户端的网站，想操作用户存放在服务提供方的资源。
  1. 客户端向服务提供方请求一个临时令牌。
  1. 服务提供方验证客户端的身份后，授予一个临时令牌。
  1. 客户端获得临时令牌后，将用户引导至服务提供方的授权页面请求用户授权。
  1. 在这个过程中将临时令牌和客户端的回调连接发送给服务提供方。
  1. 用户在服务提供方的网页上输入用户名和密码，然后授权该客户端访问所请求的资源。
  1. 授权成功后，服务提供方引导用户返回客户端的网页。
  1. 客户端根据临时令牌从服务提供方那里获取访问令牌。 　　
  1. 服务提供方根据临时令牌和用户的授权情况授予客户端访问令牌。
  1. 客户端使用获取的访问令牌访问存放在服务提供方上的受保护的资源。

###  Supports

Facebook的新的Graph API只支持OAuth 2.0，Google在2011年3月亦宣布Google API对OAuth 2.0的支援。

###  Reference

  * [ OAuth ](http://oauth.net/)
  * [ OAuth2.0 ](http://oauth.net/2/)
  * [ 详细协议入口 ](http://tools.ietf.org/html/draft-ietf-oauth-v2-26)
  * [ Introducing OAuth2.0 ](http://hueniverse.com/2010/05/introducing-oauth-2-0/)
  * [ Teminology of OAuth ](http://hueniverse.com/oauth/guide/terminology/)
  * [ Python OAuth Code ](https://github.com/simplegeo/python-oauth2)

