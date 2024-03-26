---
group:
  title: 计算机网络
  order: 8
title: Cookie、Session、Token
---

# Cookie、Session、Token

三者通常是用来保存用户登录信息的技术。但是三者有很大的区别。Cookie 适用于简单的状态信息管理，Session 适用于需要保护用户敏感信息，Token 适用于状态无关的身份验证和授权。

## Cookie

在身份验证这块，Cookie 的用户信息是储存在客户端的，故安全性不高。每次请求时，将 HTTP 请求头会携带上 Cookie。

## Session

Session 是基于 Cookie 实现的，区别在于本地储存的是一个由服务端生成的 SessionID。服务端会有一个`ID->用户信息`的映射表。

## Token

状态无关的身份验证是指服务端不会保存任何与用户相关的信息。服务端会返回一个由密钥签名的 JWT（JSON WEB TOKEN）,客户端储存并请求的时候携带。服务端接收到，会通过密钥进行签名验证。

## 禁用 Cookie，Session 还能使用吗？

SessionID 除了可以通过 HTTP 请求头传递给服务端，还可以通过请求 URL 链接拼接 sessionid。
