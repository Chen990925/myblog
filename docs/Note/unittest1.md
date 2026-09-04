---
group: 工程实践
title: Java 单元测试实战
order: 1
---

# Java 单元测试实战

## 为什么要写单元测试

- **快速反馈**：改完代码立即知道有没有破坏其他功能
- **重构信心**：有测试保护，敢于大胆重构
- **文档价值**：测试用例就是最好的使用文档
- **设计改进**：不好测试的代码通常设计有问题（耦合太紧）

## JUnit 5 核心

JUnit 5 = JUnit Platform + JUnit Jupiter + JUnit Vintage

### 核心注解

```java
import org.junit.jupiter.api.*;

class OrderServiceTest {

    @BeforeAll                           // 所有测试前执行一次（static方法）
    static void initAll() {
        // 初始化全局资源（如数据库连接池）
    }

    @BeforeEach                          // 每个测试方法前执行
    void setUp() {
        // 初始化测试数据
    }

    @Test                                // 测试方法
    void shouldCreateOrder() {
        // given - when - then 模式
        OrderDTO dto = new OrderDTO("user1", "product1", 2);

        Order order = orderService.createOrder(dto);

        assertNotNull(order);
        assertEquals("user1", order.getUserId());
        assertEquals(2, order.getQuantity());
    }

    @Test
    @DisplayName("库存不足时应抛出异常")   // 可读的测试名称
    void shouldThrowWhenStockInsufficient() {
        assertThrows(InsufficientStockException.class, () -> {
            orderService.createOrder(new OrderDTO("user1", "product1", 999));
        });
    }

    @Test
    @Disabled("功能开发中，暂时跳过")      // 跳过测试
    void futureFeature() { }

    @AfterEach                           // 每个测试方法后执行
    void tearDown() {
        // 清理测试数据
    }

    @AfterAll                            // 所有测试后执行一次（static方法）
    static void cleanUp() {
        // 释放全局资源
    }
}
```

### 断言 API

```java
// 基本断言
assertEquals(expected, actual);
assertNotEquals(unexpected, actual);
assertTrue(condition);
assertNull(object);
assertNotNull(object);

// 组合断言
assertAll("用户信息",
    () -> assertEquals("张三", user.getName()),
    () -> assertEquals(25, user.getAge()),
    () -> assertTrue(user.isActive())
);

// 异常断言
Throwable ex = assertThrows(RuntimeException.class, () -> {
    service.doSomething();
});
assertEquals("error message", ex.getMessage());

// 超时断言
assertTimeout(Duration.ofSeconds(2), () -> {
    service.slowOperation();
});
```

### 参数化测试

```java
@ParameterizedTest
@ValueSource(strings = {"hello", "world", "test"})
void shouldAcceptValidInput(String input) {
    assertTrue(service.validate(input));
}

@ParameterizedTest
@CsvSource({
    "1, 2, 3",
    "10, 20, 30",
    "-1, 1, 0"
})
void shouldAddNumbers(int a, int b, int expected) {
    assertEquals(expected, calculator.add(a, b));
}

@ParameterizedTest
@MethodSource("provideTestCases")
void shouldHandleVariousCases(UserDTO input, boolean expectedResult) {
    assertEquals(expectedResult, service.validate(input));
}

static Stream<Arguments> provideTestCases() {
    return Stream.of(
        Arguments.of(new UserDTO("张三", 25), true),
        Arguments.of(new UserDTO("", 25), false),
        Arguments.of(new UserDTO("张三", -1), false)
    );
}
```

## Mockito 实战

Mockito 是 Java 最流行的 Mock 框架，用于隔离被测代码的外部依赖。

### 基本使用

```java
@ExtendWith(MockitoExtension.class)    // JUnit 5 集成
class UserServiceTest {

    @Mock
    private UserRepository userRepository;  // Mock 对象

    @Mock
    private RedisTemplate<String, Object> redisTemplate;

    @InjectMocks
    private UserService userService;        // 自动注入 Mock

    @Test
    void shouldReturnUserFromCache() {
        // given（准备 Mock 行为）
        User cachedUser = new User("张三", 25);
        when(userRepository.findById(1L)).thenReturn(Optional.of(cachedUser));

        // when（执行被测方法）
        User result = userService.getUserById(1L);

        // then（验证结果）
        assertEquals("张三", result.getName());

        // 验证 Mock 方法被调用
        verify(userRepository).findById(1L);
        verify(userRepository, never()).save(any());
    }
}
```

### Stub（打桩）

```java
// 返回固定值
when(userRepository.findById(1L)).thenReturn(Optional.of(user));

// 返回多个值（依次返回）
when(service.getStatus()).thenReturn("pending", "processing", "done");

// 抛出异常
when(userRepository.findById(-1L))
    .thenThrow(new EntityNotFoundException("User not found"));

// 根据参数执行不同行为（Answer）
when(userRepository.save(any(User.class))).thenAnswer(invocation -> {
    User user = invocation.getArgument(0);
    user.setId(1L);  // 模拟数据库自增ID
    return user;
});

// 不关心返回值
doNothing().when(userRepository).deleteById(anyLong());
doThrow(new RuntimeException()).when(userRepository).deleteById(-1L);
```

### Verify（验证）

```java
// 验证方法被调用次数
verify(userRepository, times(1)).findById(1L);
verify(userRepository, never()).deleteById(anyLong());
verify(userRepository, atLeast(2)).save(any());

// 验证调用顺序
InOrder inOrder = inOrder(userRepository, cacheService);
inOrder.verify(cacheService).get("user:1");
inOrder.verify(userRepository).findById(1L);
inOrder.verify(cacheService).set(eq("user:1"), any());

// 验证没有多余交互
verifyNoMoreInteractions(userRepository);

// 捕获参数验证
ArgumentCaptor<User> captor = ArgumentCaptor.forClass(User.class);
verify(userRepository).save(captor.capture());
User savedUser = captor.getValue();
assertEquals("张三", savedUser.getName());
```

## Spring Boot Test 集成测试

### 分层测试

```java
// ===== 纯单元测试（不启动 Spring 容器，速度最快）=====
@ExtendWith(MockitoExtension.class)
class UserServiceTest {
    @Mock private UserRepository repo;
    @InjectMocks private UserService service;
}

// ===== Web 层测试（MockMvc，不启动真实服务器）=====
@WebMvcTest(UserController.class)
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @Test
    void shouldReturnUser() throws Exception {
        when(userService.getUserById(1L))
            .thenReturn(new UserVO("张三", 25));

        mockMvc.perform(get("/api/users/1")
                .header("Authorization", "Bearer token"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.data.name").value("张三"))
            .andExpect(jsonPath("$.code").value(200));
    }

    @Test
    void shouldValidateInput() throws Exception {
        String invalidJson = """
            {"name": "", "age": -1}
            """;

        mockMvc.perform(post("/api/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(invalidJson))
            .andExpect(status().isBadRequest());
    }
}

// ===== 数据层测试（使用内嵌数据库）=====
@DataJpaTest
class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Test
    void shouldFindByEmail() {
        userRepository.save(new User("test@example.com", "张三"));

        Optional<User> found = userRepository.findByEmail("test@example.com");

        assertTrue(found.isPresent());
        assertEquals("张三", found.get().getName());
    }
}

// ===== 完整集成测试（启动完整 Spring 容器）=====
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class ApplicationIntegrationTest {

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    void fullFlowTest() {
        // 测试完整的请求链路：HTTP → Controller → Service → Repository → DB
        ResponseEntity<Result> response = restTemplate.postForEntity(
            "/api/orders", orderDTO, Result.class);
        assertEquals(200, response.getBody().getCode());
    }
}
```

## 测试分层策略

```
┌─────────────────────────────────────┐
│  E2E 测试（端到端）                  │  少量：关键业务流程
│  启动完整系统 + 数据库 + 中间件       │  运行慢，维护成本高
├─────────────────────────────────────┤
│  集成测试                            │  适量：模块间交互
│  Spring 容器 + 内嵌数据库             │
├─────────────────────────────────────┤
│  单元测试                            │  大量：核心业务逻辑
│  纯 Mockito，不启动 Spring            │  运行快，维护成本低
└─────────────────────────────────────┘
```

**测试金字塔比例建议：** 单元测试 70% : 集成测试 20% : E2E 测试 10%

## JaCoCo 覆盖率

### Maven 配置

```xml
<plugin>
    <groupId>org.jacoco</groupId>
    <artifactId>jacoco-maven-plugin</artifactId>
    <version>0.8.11</version>
    <executions>
        <execution>
            <goals>
                <goal>prepare-agent</goal>
            </goals>
        </execution>
        <execution>
            <id>report</id>
            <phase>test</phase>
            <goals>
                <goal>report</goal>
            </goals>
        </execution>
    </executions>
</plugin>
```

```bash
# 生成覆盖率报告
mvn test jacoco:report

# 报告位置：target/site/jacoco/index.html
```

### 覆盖率指标

| 指标 | 含义 | 建议 |
|------|------|------|
| 行覆盖率 | 被执行到的代码行数占比 | >= 80% |
| 分支覆盖率 | 被执行到的分支占比（if/switch） | >= 70% |
| 方法覆盖率 | 被调用过的方法占比 | >= 80% |

> 覆盖率不是越高越好，100% 覆盖率不代表没有 bug。重点是覆盖**核心业务逻辑**和**边界条件**。

## TDD 实践思路

TDD（测试驱动开发）的核心循环：**Red → Green → Refactor**

```
1. Red（红）  ：先写一个失败的测试，描述期望行为
2. Green（绿）：写最少的代码让测试通过
3. Refactor   ：重构代码，保持测试始终通过
```

### 示例：实现一个密码校验器

```java
// Step 1: Red - 写失败的测试
@Test
void shouldRejectShortPassword() {
    PasswordValidator validator = new PasswordValidator();
    assertFalse(validator.validate("123"));
}

// Step 2: Green - 最小实现
public class PasswordValidator {
    public boolean validate(String password) {
        return password.length() >= 8;
    }
}

// Step 3: 继续添加测试
@Test
void shouldRequireUppercase() {
    assertFalse(new PasswordValidator().validate("abcdefgh"));
}

@Test
void shouldRequireDigit() {
    assertFalse(new PasswordValidator().validate("Abcdefgh"));
}

@Test
void shouldAcceptValidPassword() {
    assertTrue(new PasswordValidator().validate("Abcdefg1"));
}

// Step 4: Refactor - 完善实现
public class PasswordValidator {
    public boolean validate(String password) {
        if (password == null || password.length() < 8) return false;
        if (!password.matches(".*[A-Z].*")) return false;
        if (!password.matches(".*\\d.*")) return false;
        return true;
    }
}
```
