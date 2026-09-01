---
group: spring
title: Spring MVC 请求处理全链路
order: 9
summary: 深入解析 Spring MVC 核心架构与请求处理流程，涵盖 DispatcherServlet、HandlerMapping、HandlerAdapter、参数绑定、拦截器、异常处理及 RESTful 接口设计。
keywords: [Spring MVC, DispatcherServlet, HandlerMapping, HandlerAdapter, 拦截器, RESTful]
---

# Spring MVC 请求处理全链路

## 核心架构

Spring MVC 是基于 Servlet API 构建的 Web 框架，采用经典的 **MVC（Model-View-Controller）** 架构模式。其核心入口是 `DispatcherServlet`，作为前端控制器统一处理所有 HTTP 请求。

### 核心组件

| 组件 | 职责 |
|------|------|
| **DispatcherServlet** | 前端控制器，接收请求并协调其他组件 |
| **HandlerMapping** | 根据请求 URL 找到对应的 Handler（Controller 方法） |
| **HandlerAdapter** | 负责调用具体的 Handler 方法，处理参数绑定 |
| **ViewResolver** | 解析逻辑视图名为具体的 View 对象（前后端分离时不使用） |
| **HandlerInterceptor** | 拦截器，在请求前后执行自定义逻辑 |
| **HandlerExceptionResolver** | 异常解析器，统一处理 Controller 抛出的异常 |

## 请求处理流程

一个 HTTP 请求从进入到返回响应的完整流程：

```
客户端请求
    │
    ▼
DispatcherServlet.doDispatch()
    │
    ├─① HandlerMapping 查找 Handler
    │   └─ 根据 URL 匹配到 Controller 方法 + 拦截器链
    │
    ├─② HandlerInterceptor.preHandle()
    │   └─ 拦截器前置处理，返回 false 则终止请求
    │
    ├─③ HandlerAdapter 调用 Handler
    │   ├─ 参数解析（@RequestParam, @RequestBody, @PathVariable）
    │   ├─ 数据绑定与类型转换
    │   ├─ 参数校验（@Valid / @Validated）
    │   └─ 执行 Controller 方法
    │
    ├─④ 处理返回值
    │   ├─ @ResponseBody → HttpMessageConverter 序列化为 JSON
    │   └─ 返回视图名 → ViewResolver 解析渲染
    │
    ├─⑤ HandlerInterceptor.postHandle()
    │   └─ 拦截器后置处理
    │
    └─⑥ 返回响应
```

### 源码入口

```java
// DispatcherServlet.doDispatch() 核心逻辑
protected void doDispatch(HttpServletRequest request, HttpServletResponse response) {
    HttpServletRequest processedRequest = request;
    HandlerExecutionChain mappedHandler = null;
    ModelAndView mv = null;
    Exception dispatchException = null;

    try {
        // 1. 确定当前请求的 Handler
        mappedHandler = getHandler(processedRequest);

        // 2. 确定 Handler 的适配器
        HandlerAdapter ha = getHandlerAdapter(mappedHandler.getHandler());

        // 3. 执行拦截器 preHandle
        if (!mappedHandler.applyPreHandle(processedRequest, response)) {
            return;
        }

        // 4. 实际调用 Handler
        mv = ha.handle(processedRequest, response, mappedHandler.getHandler());

        // 5. 执行拦截器 postHandle
        mappedHandler.applyPostHandle(processedRequest, response, mv);

    } catch (Exception ex) {
        dispatchException = ex;
    }

    // 6. 处理结果（视图渲染或 JSON 响应）
    processDispatchResult(processedRequest, response, mappedHandler, mv, dispatchException);
}
```

## HandlerMapping 详解

Spring MVC 内置了多种 HandlerMapping 实现：

- **RequestMappingHandlerMapping**：处理 `@RequestMapping`、`@GetMapping`、`@PostMapping` 等注解标注的方法，是最常用的 HandlerMapping
- **SimpleUrlHandlerMapping**：通过 URL 直接映射到 Handler
- **BeanNameUrlHandlerMapping**：Bean 名称以 `/` 开头时作为 URL 映射

### 请求匹配优先级

```java
@RestController
@RequestMapping("/api/users")
public class UserController {

    // 精确匹配，优先级最高
    @GetMapping("/list")
    public List<User> listUsers() { ... }

    // 路径变量匹配
    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) { ... }

    // 通配符匹配，优先级最低
    @GetMapping("/**")
    public String catchAll() { ... }
}
```

匹配规则：**精确路径 > 路径变量 > 通配符**

## HandlerAdapter 与参数绑定

`RequestMappingHandlerAdapter` 是处理 `@RequestMapping` 方法的核心适配器，内部使用一系列 `HandlerMethodArgumentResolver` 来解析方法参数。

### 常用参数注解

```java
@PostMapping("/users/{id}")
public Result updateUser(
    @PathVariable Long id,                    // 路径参数
    @RequestParam String name,                // 查询参数
    @RequestHeader("Authorization") String token, // 请求头
    @RequestBody @Valid UpdateUserDTO dto,    // 请求体（JSON反序列化）
    @CookieValue("session") String sessionId, // Cookie值
    HttpServletRequest request                // 原生Request
) { ... }
```

### 参数解析流程

```java
// HandlerMethodArgumentResolverComposite
public Object resolveArgument(MethodParameter parameter, ...) {
    // 遍历所有 ArgumentResolver，找到支持当前参数类型的解析器
    HandlerMethodArgumentResolver resolver = getArgumentResolver(parameter);
    return resolver.resolveArgument(parameter, mavContainer, request, binderFactory);
}
```

常用解析器：
- `RequestParamMethodArgumentResolver`：处理 `@RequestParam`
- `PathVariableMethodArgumentResolver`：处理 `@PathVariable`
- `RequestResponseBodyMethodProcessor`：处理 `@RequestBody`
- `ServletModelAttributeMethodProcessor`：处理表单数据绑定

## @RequestBody 与消息转换

当使用 `@RequestBody` 接收 JSON 数据时，Spring MVC 使用 `HttpMessageConverter` 进行反序列化：

```java
// RequestResponseBodyMethodProcessor
public Object resolveArgument(...) {
    // 1. 根据 Content-Type 选择合适的 Converter
    // 2. 常见的 Converter：
    //    - MappingJackson2HttpMessageConverter（JSON → Object，使用 Jackson）
    //    - StringHttpMessageConverter（text/plain → String）
    //    - FormHttpMessageConverter（application/x-www-form-urlencoded）
    return converter.read(targetType, inputMessage);
}
```

### 返回值处理

```java
@RestController  // = @Controller + @ResponseBody
public class UserController {

    @GetMapping("/user")
    public Result<User> getUser() {
        // @ResponseBody 标记 → 使用 HttpMessageConverter 将返回值序列化为 JSON
        return Result.success(user);
    }

    @GetMapping("/download")
    public ResponseEntity<Resource> download() {
        // ResponseEntity 可以控制 HTTP 状态码和响应头
        return ResponseEntity.ok()
            .header("Content-Disposition", "attachment; filename=file.pdf")
            .body(resource);
    }
}
```

## 拦截器（HandlerInterceptor）

拦截器是 Spring MVC 的 AOP 机制，可以在请求处理前后插入自定义逻辑。

### 实现拦截器

```java
public class AuthInterceptor implements HandlerInterceptor {

    // 在 Controller 方法执行前调用
    // 返回 true 继续执行，返回 false 终止请求链
    @Override
    public boolean preHandle(HttpServletRequest request,
                             HttpServletResponse response,
                             Object handler) {
        String token = request.getHeader("Authorization");
        if (token == null || !validateToken(token)) {
            response.setStatus(401);
            return false;  // 终止请求
        }
        // 将用户信息存入 ThreadLocal
        UserContext.setCurrentUser(parseUser(token));
        return true;
    }

    // Controller 方法执行后、视图渲染前调用
    @Override
    public void postHandle(HttpServletRequest request,
                           HttpServletResponse response,
                           Object handler,
                           ModelAndView mav) {
        // 可以修改 ModelAndView
    }

    // 整个请求完成后调用（无论是否发生异常）
    @Override
    public void afterCompletion(HttpServletRequest request,
                                HttpServletResponse response,
                                Object handler,
                                Exception ex) {
        // 清理 ThreadLocal，防止内存泄漏
        UserContext.clear();
    }
}
```

### 注册拦截器

```java
@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new AuthInterceptor())
                .addPathPatterns("/api/**")         // 拦截的路径
                .excludePathPatterns("/api/login");  // 排除的路径
    }
}
```

### 拦截器 vs Filter

| 对比项 | Filter（Servlet规范） | HandlerInterceptor（Spring MVC） |
|--------|----------------------|-------------------------------|
| 规范 | Servlet 规范 | Spring MVC 框架 |
| 作用范围 | 所有请求（包括静态资源） | 只作用于 DispatcherServlet 处理的请求 |
| 能访问 Spring 容器 | 不能直接访问 | 可以直接访问 |
| 能获取 Handler 信息 | 不能 | 可以获取 HandlerMethod |
| 执行顺序 | Filter → DispatcherServlet → Interceptor → Controller |

## 全局异常处理

### @ControllerAdvice + @ExceptionHandler

```java
@RestControllerAdvice
public class GlobalExceptionHandler {

    // 处理参数校验异常
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Result<?> handleValidationException(MethodArgumentNotValidException e) {
        List<String> errors = e.getBindingResult()
            .getFieldErrors()
            .stream()
            .map(err -> err.getField() + ": " + err.getDefaultMessage())
            .collect(Collectors.toList());
        return Result.fail(400, "参数校验失败", errors);
    }

    // 处理业务异常
    @ExceptionHandler(BusinessException.class)
    public Result<?> handleBusinessException(BusinessException e) {
        return Result.fail(e.getCode(), e.getMessage());
    }

    // 兜底：处理所有未捕获异常
    @ExceptionHandler(Exception.class)
    public Result<?> handleException(Exception e) {
        log.error("未知异常", e);
        return Result.fail(500, "服务器内部错误");
    }
}
```

### 异常处理优先级

Spring MVC 的异常处理遵循 **就近原则**：

1. Controller 内部的 `@ExceptionHandler` 方法（优先级最高）
2. `@ControllerAdvice` 中的 `@ExceptionHandler` 方法
3. `HandlerExceptionResolver` 实现类

## RESTful 接口设计规范

### 统一响应格式

```java
@Data
public class Result<T> {
    private Integer code;      // 业务状态码
    private String message;    // 提示信息
    private T data;            // 业务数据
    private Long timestamp;    // 时间戳

    public static <T> Result<T> success(T data) {
        return new Result<>(200, "success", data, System.currentTimeMillis());
    }

    public static <T> Result<T> fail(Integer code, String message) {
        return new Result<>(code, message, null, System.currentTimeMillis());
    }
}
```

### RESTful 风格实践

```java
@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    @GetMapping                          // GET /api/v1/users       - 查询用户列表
    public Result<PageResult<UserVO>> list(UserQuery query) { ... }

    @GetMapping("/{id}")                 // GET /api/v1/users/1     - 查询单个用户
    public Result<UserVO> get(@PathVariable Long id) { ... }

    @PostMapping                         // POST /api/v1/users      - 创建用户
    public Result<UserVO> create(@RequestBody @Valid CreateUserDTO dto) { ... }

    @PutMapping("/{id}")                 // PUT /api/v1/users/1     - 更新用户
    public Result<UserVO> update(@PathVariable Long id,
                                 @RequestBody @Valid UpdateUserDTO dto) { ... }

    @DeleteMapping("/{id}")              // DELETE /api/v1/users/1  - 删除用户
    public Result<Void> delete(@PathVariable Long id) { ... }

    @PatchMapping("/{id}/status")        // PATCH /api/v1/users/1/status - 部分更新
    public Result<Void> updateStatus(@PathVariable Long id,
                                     @RequestParam Integer status) { ... }
}
```

### 接口版本控制

常见方案：
- **URL 路径版本**（推荐）：`/api/v1/users`、`/api/v2/users`
- **请求头版本**：`Accept: application/vnd.company.v2+json`
- **查询参数版本**：`/api/users?version=2`
