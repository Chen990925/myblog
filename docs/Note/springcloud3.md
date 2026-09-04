---
group: springCloud
title: jwt
order: 3
---


# **Spring Secuirty Oauth2 实现单点登录**

## **什么是单点登录**

**单点登录（Single Sign On），简称为 SSO，是比较流行的企业业务整合的解决方案之一**

它的用途在于，不管多么复杂的应用群，只要在用户权限范围内，那么就可以做到，用户只需要登录一次就可以访问权限范围内的所有应用子系统。



## **单点登录常见实现方式**

### **同域单点登录**

适用场景：都是企业自己的系统，所有系统都使用同一个一级域名通过不同的二级域名来区分    

<img src="../../public/images/image-20240509172313981.png" alt="image-20240509172313981" style="zoom:33%;" />

**核心原理：**

1. 门户系统设置 Cookie 的 domain 为一级域名也就是 zlt.com，这样就可以共享门户的 Cookie 给所有的使用该域名 (xxx.zlt.com) 的系统
2. 使用 Spring Session 等技术让所有系统共享 Session
3. 这样只要门户系统登录之后无论跳转应用 1 或者应用 2，都能通过门户 Cookie 中的 sessionId 读取到 Session 中的登录信息实现单点登录

 

### **跨域单点登录** 

单点登录之间的系统域名不一样，例如第三方系统。由于域名不一样不能共享 Cookie 了，这样就需要通过一个**单独的授权服务** (User Account and Authentication Server UAA) 来做统一登录，并基于共享 UAA 的 Cookie 来实现单点登录。

<img src="../../public/images/image-20240509175829265.png" alt="image-20240509175829265" style="zoom:33%;" /> 

核心原理：

1. 访问系统 1 判断未登录，则跳转到 UAA 系统请求授权
2. 在 UAA 系统域名 sso.com 下的登录地址中输入用户名 / 密码完成登录
3. 登录成功后 UAA 系统把登录信息保存到 Session 中，并在浏览器写入域为 sso.com 的 Cookie
4. 访问系统 2 判断未登录，则跳转到 UAA 系统请求授权
5. 由于是跳转到 UAA 系统的域名 sso.com 下，所以能通过浏览器中 UAA 的 Cookie 读取到 Session 中之前的登录信息完成单点登录



### **基于 Oauth2 跨域单点登录**

<img src="../../public/images/image-20240509180243837.png" alt="image-20240509180243837" style="zoom:50%;" />



## **Spring Secuirty Oauth2 单点登录实战**

Oauth2 单点登录除了需要授权中心完成统一登录 / 授权逻辑之外，各个系统本身 (sso 客户端) 也需要实现以下逻辑：

1. **拦截请求判断登录状态**
2. **与 UAA 授权中心 通过 Oauth2 授权码模式 交互完成登录 / 单点登录**
3. **保存用户登录信息**

以上逻辑只需使用一个 @EnableOAuth2Sso 注解即可实现！

### **创建客户端**

引入依赖

```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-oauth2</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-test</artifactId>
        <scope>test</scope>
    </dependency>
</dependencies>
```

修改 application.properties

```yaml
server:
  port: 8081
    #防止Cookie冲突，冲突会导致登录验证不通过
  servlet:
    session:
      cookie:
      	#设置了会话 Cookie 的名称为 OAUTH2-CLIENT-SESSIONID8081。这样做是为了防止不同应用的会话 Cookie 冲突，避免登录验证不通过的问题
        name: OAUTH2-CLIENT-SESSIONID${server.port}
 
#与授权服务器对应的配置
security:
  oauth2:
    client:
    #  OAuth2 客户端的客户端标识符
      client-id: client
      #  OAuth2 客户端的客户端密钥
      client-secret: 123123
      # 配置了用户授权地址，即用户在授权服务器上进行登录和授权的地址。客户端应用在发起认证流程时会跳转到这个地址
      user-authorization-uri: http://localhost:8080/oauth/authorize
      # 访问令牌的获取地址，即客户端应用在获取访问令牌时向授权服务器发送请求的地址
      access-token-uri:  http://localhost:8080/oauth/token
    resource:
    # 资源服务器用于验证令牌的地址。当资源服务器接收到请求时，会通过这个地址来验证访问令牌的有效性
      token-info-uri: http://localhost:8080/oauth/check_token
```

**在启动类上添加 @EnableOAuth2Sso 注解来启用单点登录功能**  

`@EnableOAuth2Sso` 单点登录的原理简单来说就是：

OAuth2 Client 应用在使用 OAuth2 授权流程获取访问令牌后，**通过该令牌访问受保护的资源服务，获取用户信息，并将这些信息转换为 Spring Security 上下文中的认证凭据**，从而完成自身的登录认证过程

**整个过程是基于 OAuth2 的 SSO 单点登录**

```java
@SpringBootApplication
@EnableOAuth2Sso  
public class Oauth2SsoClientDemoApplication {
 
    public static void main(String[] args) {
        SpringApplication.run(Oauth2SsoClientDemoApplication.class, args);
    }
 
}
```

**添加接口用于获取当前登录用户信息**  

```java
@RestController
@RequestMapping("/user")
public class UserController {
 
    @RequestMapping("/getCurrentUser")
    public Object getCurrentUser(Authentication authentication) {
        return authentication;
    }
}
```



### **创建授权服务器**

**修改授权服务器中的 `AuthorizationServerConfig` 类**

```java
@Configuration
@EnableAuthorizationServer
public class AuthorizationServerConfig3 extends AuthorizationServerConfigurerAdapter {
 
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Override
    public void configure(AuthorizationServerSecurityConfigurer security) throws Exception {
        //允许表单认证
        security.allowFormAuthenticationForClients();
        //校验token
        security.checkTokenAccess("permitAll()");
 
    }
 
    @Override
    public void configure(ClientDetailsServiceConfigurer clients) throws Exception {
        /**
         *授权码模式
         */
        clients.inMemory()
                //配置client_id
                .withClient("client")
                //配置client-secret
                .secret(passwordEncoder.encode("123123"))
                //配置访问token的有效期
                .accessTokenValiditySeconds(3600)
                //配置刷新token的有效期
                .refreshTokenValiditySeconds(864000)
                //配置redirect_uri，用于授权成功后跳转
                .redirectUris("http://localhost:8081/login",
                        "http://localhost:8082/login")
                //自动授权配置
                .autoApprove(true)
                //配置申请的权限范围
                .scopes("all")
                /**
                 * 配置grant_type，表示授权类型
                 * authorization_code: 授权码模式
                 */
                .authorizedGrantTypes("authorization_code");
    }
}
```

**启动授权服务和客户端服务 测试：**

 访问客户端需要授权的接口 http://localhost:8081/user/getCurrentUser 会跳转到授权服务的登录界面

<img src="../../public/images/image-20240509184012950.png" alt="image-20240509184012950" style="zoom: 50%;" />

授权后会跳转到原来需要权限的接口地址，展示登录用户信息 

<img src="../../public/images/image-20240509184045033.png" alt="image-20240509184045033" style="zoom:50%;" />

**模拟两个客户端 8081，8082**

**修改 application.properties 配置**

```yaml
server.port=8082
#防止Cookie冲突，冲突会导致登录验证不通过
server.servlet.session.cookie.name=OAUTH2-CLIENT-SESSIONID${server.port}
```

修改授权服务器配置，配置多个跳转路径

```java
//配置redirect_uri，用于授权成功后跳转
.redirectUris("http://localhost:8081/login",
              "http://localhost:8082/login")
```

8081 登录成功之后，8082 无需再次登录就可以访问 http://localhost:8082/user/getCurrentUser



## **Oauth2 整合网关实现微服务单点登录**

网关整合 OAuth2.0 有两种思路

- 一种是授权服务器生成令牌，所有请求统一在网关层验证，判断权限等操作
- 另一种是由各资源服务处理，网关只做请求转发

 比较常用的是第一种，把 API 网关作为 OAuth2.0 的资源服务器角色，实现接入客户端权限拦截、令牌解析并转发当前登录用户信息给微服务，这样下游微服务就不需要关心令牌格式解析以及 OAuth2.0 相关机制了。  

网关在认证授权体系里主要负责两件事： 

- 作为 OAuth2.0 的资源服务器角色，实现接入方权限拦截
- 令牌解析并转发当前登录用户信息（明文 token）给微服务 ，微服务拿到明文 token (明文 token 中包含登录用户的身份和权限信息) 后也需要做两件事：
  - 用户授权拦截（看当前用户是否有权访问该资源） 
  - 将用户信息存储进当前线程上下文（有利于后续业务逻辑随时获取当前用户信息）  

<img src="../../public/images/image-20240509184615154.png" alt="image-20240509184615154" style="zoom:50%;" />

**核心代码，网关自定义全局过滤器进行身份认证**

```java
@Component
@Order(0)
public class AuthenticationFilter implements GlobalFilter, InitializingBean {
 
    @Autowired
    private RestTemplate restTemplate;
 
    private static Set<String> shouldSkipUrl = new LinkedHashSet<>();
    
    @Override
    public void afterPropertiesSet() throws Exception {
        // 不拦截认证的请求
        shouldSkipUrl.add("/oauth/token");
        shouldSkipUrl.add("/oauth/check_token");
        shouldSkipUrl.add("/user/getCurrentUser");
    }
 
    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        String requestPath = exchange.getRequest().getURI().getPath();
        //不需要认证的url
        if(shouldSkip(requestPath)) {
            return chain.filter(exchange);
        }
        //获取请求头
        String authHeader = exchange.getRequest().getHeaders().getFirst("Authorization");
        //请求头为空
        if(StringUtils.isEmpty(authHeader)) {
            throw new RuntimeException("请求头为空");
        }
        TokenInfo tokenInfo=null;
        try {
            //获取token信息
            tokenInfo = getTokenInfo(authHeader);
        }catch (Exception e) {
            throw new RuntimeException("校验令牌异常");
        }
        exchange.getAttributes().put("tokenInfo",tokenInfo);
        return chain.filter(exchange);
    }
 
    private boolean shouldSkip(String reqPath) {
        for(String skipPath:shouldSkipUrl) {
            if(reqPath.contains(skipPath)) {
                return true;
            }
        }
        return false;
    }
 
    private TokenInfo getTokenInfo(String authHeader) {
        // 获取token的值
        String token = StringUtils.substringAfter(authHeader, "bearer ");
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        headers.setBasicAuth(MDA.clientId, MDA.clientSecret);
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("token", token);
        HttpEntity<MultiValueMap<String, String>> entity = new HttpEntity<>(params, headers);
        ResponseEntity<TokenInfo> response = restTemplate.exchange(MDA.checkTokenUrl, HttpMethod.POST, entity, TokenInfo.class);
        return response.getBody();
    }
}
```



# **JWT**

OAuth 2.0 是当前业界标准的授权协议，它的核心是若干个针对不同场景的令牌颁发和管理流程；而 JWT 是一种轻量级、自包含的令牌，可用于在微服务间安全地传递用户信息。

## **什么是 JWT**  

JSON Web Token（JWT）是一个开放的行业标准（RFC 7519），它定义了一种简介的、自包含的协议格式，用于在通信双方传递 json 对象，传递的信息经过数字签名可以被验证和信任。JWT 可以使用 HMAC 算法或使用 RSA 的公钥 / 私钥对来签名，防止被篡改。

官网： https://jwt.io/ 

标准： https://tools.ietf.org/html/rfc7519﻿

**JWT 令牌的优点：**

1. jwt 基于 json，非常方便解析。
2. 可以在令牌中自定义丰富的内容，易扩展。
3. 通过非对称加密算法及数字签名技术，JWT 防止篡改，安全性高。
4. 资源服务使用 JWT 可不依赖授权服务即可完成授权。

**缺点：**

​	JWT 令牌较长，占存储空间比较大。  



## **JWT 组成**

一个 JWT 实际上就是一个字符串，它由三部分组成，头部（header）、载荷（payload）与签名（signature）。

<img src="../../public/images/image-20240509185441906.png" alt="image-20240509185441906" style="zoom: 33%;" />

### **头部（header）**

头部用于描述关于该 JWT 的最基本的信息：类型（即 JWT）以及签名所用的算法（如 HMACSHA256 或 RSA）等。

这也可以被表示成一个 JSON 对象：

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

然后将头部进行 base64 加密（该加密是可以对称解密的), 构成了第一部分:

```
eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9
```



### **载荷（payload）**

第二部分是载荷，就是存放有效信息的地方。这个名字像是特指飞机上承载的货品，这些有效信息包含三个部分：

- 标准中注册的声明（建议但不强制使用）  
  - **iss**: jwt 签发者
  - **sub**: jwt 所面向的用户
  - **aud**: 接收 jwt 的一方
  - **exp**: jwt 的过期时间，这个过期时间必须要大于签发时间
  - **nbf**: 定义在什么时间之前，该 jwt 都是不可用的.
  - **iat**: jwt 的签发时间
  - **jti**: jwt 的唯一身份标识，主要用来作为一次性 token, 从而回避重放攻击。

- 公共的声明 公共的声明可以添加任何的信息，一般添加用户的相关信息或其他业务需要的必要信息。但不建议添加敏感信息，因为该部分在客户端可解密.  

- 私有的声明 私有声明是提供者和消费者所共同定义的声明，一般不建议存放敏感信息，因为 base64 是对称解密的，意味着该部分信息可以归类为明文信息。  

定义一个 payload：

```json
{
  "sub": "1234567890",
  "name": "John Doe",
  "iat": 1516239022
}
```

然后将其进行 base64 加密，得到 Jwt 的第二部分:

```
eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ
```



### **签名（signature）**

jwt 的第三部分是一个签证信息，这个签证信息由三部分组成：

- header (base64 后的)

- payload (base64 后的)

- secret (盐，一定要保密）  

这个部分需要 base64 加密后的 header 和 base64 加密后的 payload 使用. 连接组成的字符串，然后通过 header 中声明的加密方式进行加盐 secret 组合加密，然后就构成了 jwt 的第三部分:

```js
var encodedString = base64UrlEncode(header) + '.' + base64UrlEncode(payload);
 
var signature = HMACSHA256(encodedString, 'fox'); // khA7TNYc7_0iELcDyTc7gHBZ_xfIcgbfpzUNWwQtzME
```

将这三部分用. 连接成一个完整的字符串，构成了最终的 jwt:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.khA7TNYc7_0iELcDyTc7gHBZ_xfIcgbfpzUNWwQtzME
```

> 注意：secret 是保存在服务器端的，jwt 的签发生成也是在服务器端的，secret 就是用来进行 jwt 的签发和 jwt 的验证，所以，它就是你服务端的私钥，在任何场景都不应该流露出去。一旦客户端得知这个 secret, 那就意味着客户端是可以自我签发 jwt 了。



### **如何应用**

一般是在请求头里加入 Authorization，并加上 Bearer 标注：

```json
fetch('api/user/1', {
  headers: {
    'Authorization': 'Bearer ' + token
  }
})
```

服务端会验证 token，如果验证通过就会返回相应的资源。整个流程就是这样的:

<img src="../../public/images/image-20240509185740355.png" alt="image-20240509185740355" style="zoom: 33%;" />

## **JJWT**

JJWT 是一个提供端到端的 JWT 创建和验证的 Java 库，永远免费和开源 (Apache License，版本 2.0)。

JJW 很容易使用和理解。它被设计成一个以建筑为中心的流畅界面，隐藏了它的大部分复杂性。  

### **快速开始**

引入依赖

```xml
 <!--JWT依赖-->
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt</artifactId>
    <version>0.9.1</version>
</dependency>
```

**创建 token**

创建测试类，生成 token

```java
@Test
public void test() {
    //创建一个JwtBuilder对象
    JwtBuilder jwtBuilder = Jwts.builder()
        //声明的标识{"jti":"666"}
        .setId("666")
        //主体，用户{"sub":"Fox"}
        .setSubject("Fox")
        //创建日期{"ita":"xxxxxx"}
        .setIssuedAt(new Date())
        //签名手段，参数1：算法，参数2：盐
        .signWith(SignatureAlgorithm.HS256, "123123");
    //获取token
    String token = jwtBuilder.compact();
    System.out.println(token);
 
    //三部分的base64解密
    System.out.println("=========");
    String[] split = token.split("//.");
    System.out.println(Base64Codec.BASE64.decodeToString(split[0]));
    System.out.println(Base64Codec.BASE64.decodeToString(split[1]));
    //无法解密
    System.out.println(Base64Codec.BASE64.decodeToString(split[2]));
}
```

运行结果

<img src="../../public/images/image-20240509190348390.png" alt="image-20240509190348390" style="zoom:50%;" />



### **token 的验证解析**

在 web 应用中由服务端创建了 token 然后发给客户端，客户端在下次向服务端发送请求时需要携带这个 token（这就好像是拿着一张门票一样），那服务端接到这个 token 应该解析出 token 中的信息（例如用户 id）, 根据这些信息查询数据库返回相应的结果。  

```java
@Test
public void testParseToken(){
    //token
    String token ="eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI2NjYiLCJzdWIiOiJGb3giLCJpYXQiOjE2MDgyNzI1NDh9" +
        ".Hz7tk6pJaest_jxFrJ4BWiMg3HQxjwY9cGmJ4GQwfuU";
    //解析token获取载荷中的声明对象
    Claims claims = Jwts.parser()
        .setSigningKey("123123")
        .parseClaimsJws(token)
        .getBody();
 
    System.out.println("id:"+claims.getId());
    System.out.println("subject:"+claims.getSubject());
    System.out.println("issuedAt:"+claims.getIssuedAt());
}
```

<img src="../../public/images/image-20240509190651704.png" alt="image-20240509190651704" style="zoom:50%;" />

试着将 token 或签名秘钥篡改一下，会发现运行时就会报错，所以解析 token 也就是验证 token  



### **token 过期校验**

有很多时候，我们并不希望签发的 token 是永久生效的，所以我们可以为 token 添加一个过期时间。

**原因：从服务器发出的 token，服务器自己并不做记录，就存在一个弊端：服务端无法主动控制某个 token 的立刻失效。**

<img src="../../public/images/image-20240509190742962.png" alt="image-20240509190742962" style="zoom: 33%;" />

当未过期时可以正常读取，当过期时会引发 io.jsonwebtoken.ExpiredJwtException 异常。



## **Spring Security Oauth2 整合 JWT**  `略`

**整合 JWT**

在之前的 spring security Oauth2 的代码基础上修改

引入依赖

```xml
<dependency>
    <groupId>org.springframework.security</groupId>
    <artifactId>spring-security-jwt</artifactId>
    <version>1.0.9.RELEASE</version>
</dependency>
```

添加配置文件 `JwtTokenStoreConfig.java  `

```java
@Configuration
public class JwtTokenStoreConfig {
 
    @Bean
    public TokenStore jwtTokenStore(){
        return new JwtTokenStore(jwtAccessTokenConverter());
    }
 
    @Bean
    public JwtAccessTokenConverter jwtAccessTokenConverter(){
        JwtAccessTokenConverter accessTokenConverter = new
                JwtAccessTokenConverter();
        //配置JWT使用的秘钥
        accessTokenConverter.setSigningKey("123123");
        return accessTokenConverter;
    }
}
```

在授权服务器配置中指定令牌的存储策略为 JWT  