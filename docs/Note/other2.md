---
group:
  title: 计算机网络
  order: 8
title: http常见的状态码
---

# HTTP 常见的状态码

- `1XX` (Informational 请求正在处理)
- `2XX` (Success 请求成功)
  - 200：请求成功
  - 204：请求成功但是没有资源返回。
  - 206：对部分资源的请求。
- `3XX` (Redirection 重定向)
  - 301：永久重定向
  - 302：临时重定向
- `4XX` (Client Error 客户端错误)
  - 400：请求报文里有错误
  - 403：无访问权限
  - 404：服务器无该资源或者路径错误
- `5XX` (Server Error 服务器错误)
