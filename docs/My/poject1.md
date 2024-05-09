---
group: 1.0.0
title: core 
order: 1
---

# proxy-core : 核心类

## annotation

一些自定义注解

### Autowired

自定义框架下的类自动注入，之后几个自定义注解与其类似

```java
/**
 * @ Target(ElementType.FIELD)  注解表示该注解可以应用于字段（Field）上。
 * @ Retention(RetentionPolicy.RUNTIME) 注解表示该注解在运行时（Runtime）仍然可用，可以通过反射来获取。
 */
@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
public @interface Autowired {
    String value() default "";
}
```

> `ElementType.FIELD` 表示注解的作用目标是字段，除了 `ElementType.FIELD`，
>
> 还有`ElementType.METHOD`: 注解作用在方法上，`ElementType.TYPE`: 注解作用在类、接口、枚举上

> `RetentionPolicy.RUNTIME` 是 Java 注解的保留策略之一，表示注解**在运行时保留**，可以通过反射机制读取，没有这个注解的话就无法通过反射获取。除了这个还有：
>
> `RetentionPolicy.SOURCE`: 注解**仅在源代码中保留，在编译时会被丢弃，不会包含在编译后的字节码中**
>
> `RetentionPolicy.CLASS`: 注解在编译时保留，会被包含在编译后的字节码文件中，**但在运行时不可获取**

### Bean，Component，Configuration，Destroy，Init，Lazy，Match，NeutrinoApplication，Order，Value等

以后需要时拓展



## base `消息分发器`

### CodeBlock

```java
@FunctionalInterface
public interface CodeBlock {
    /**
     * 执行
     */
    void execute();
}
```

`@FunctionalInterface` 是 Java 8 引入的一个注解，用于标识接口是否是函数式接口，即该接口只有一个抽象方法。在这里，`CodeBlock` 接口只有一个抽象方法 `execute()`，用于执行某个代码块

如果一个接口被标记为 `@FunctionalInterface`，那么编译器会检查该接口是否只包含一个抽象方法。如果接口中包含多于一个抽象方法，则编译器会报错。这样可以帮助开发者避免不必要的错误

**函数式接口的特点是可以通过 lambda 表达式或方法引用来创建接口的实例**。因此，`CodeBlock` 接口可以通过 lambda 表达式来创建执行某个具体操作的代码块，从而实现某个功能

**例子：**

```java
// 使用 lambda 表达式创建一个 CodeBlock 对象
CodeBlock codeBlock = () -> System.out.println("Executing code block");
        
// 执行 codeBlock 对象的 execute 方法
codeBlock.execute();
```

### DefaultDispatcher,Dispatcher,Handler<Context, Data>

Dispatcher和Handler<Context, Data>的代码：

```java
public interface Dispatcher<Context, Data> {
	//调度
	void dispatch(Context context, Data data);
}

public interface Handler<Context, Data> {
	//处理
	void handle(Context context, Data data);
	//名称
	default String name() {return "";}
}
```

DefaultDispatcher继承Dispatcher接口

**DefaultDispatcher部分代码：**

默认的分发器实现，用于**根据传入的数据类型，将任务分发给相应的处理器**，会在客户端和服务端各初始化一次

1. 首先，需要创建一些处理器类，并实现 Handler<Context, Data> 接口。 
2. 然后，创建一个匹配器函数，根据传入的数据从中提取类型信息。 
3. 最后，创建一个 DefaultDispatcher 实例，传入名称、处理器列表和匹配器函数，然后就可以使用 dispatch 方法进行任务分发了。

```java
@Slf4j
public class DefaultDispatcher<Context, Data> implements Dispatcher<Context, Data> {
	//调度器名称
    private String name;
    //处理器映射
    private Map<String, Handler<Context,Data>> handlerMap;
	//匹配器
    private Function<Data,String> matcher;
```

**构造函数接收三个参数：name、handlerList 和 matcher**   

- name 是分发器的名称，不能为空    

- handlerList 是处理器列表，它是一个泛型列表，其中的元素是实现了 Handler<Context, Data> 接口的类的实例。     

- matcher 是一个函数接口，用于从数据中提取出类型信息的功能函数。

  > `Function<Data,String>`是一个函数式接口，它定义了一个函数，该函数接受一个类型为`Data`的参数，并返回一个类型为`String`的结果
  >
  > 通过`Function<Data,String>`接口的**`apply(Data data)`方法**，`matcher`函数接受一个`Data`类型的参数，根据参数中的数据信息，返回对应的类型字符串

```java
public DefaultDispatcher(String name, List<? extends Handler<Context,Data>> handlerList, Function<Data,String> matcher) {
		//..参数判空
        this.name = name;
        this.handlerMap = new HashMap<>();
        this.matcher = matcher;
        // 遍历处理器列表，初始化处理器映射
        for (Handler handler : handlerList) {
            Match match = handler.getClass().getAnnotation(Match.class);
            if (null == match) {
                log.warn("类: {} 缺失Match注解", handler.getClass().getName());
                continue;
            }
            if (StringUtil.isEmpty(match.type())) {
                log.warn("类: {} match注解缺失type参数！", handler.getClass().getName());
                continue;
            }
            if (handlerMap.containsKey(match.type())) {
                log.warn("类: {} match注解type值{} 存在重复!", handler.getClass().getName(), match.type());
                continue;
            }
            handlerMap.put(match.type(), handler);
        }
        log.info("{} 处理器初始化完成", name);
    }
```

这里以某个handler`ProxyMessageConnectHandler`举例：

```java
//ProxyMessageHandler实现了Handler
@Match(type = Constants.ProxyDataTypeName.CONNECT)
@Component
public class ProxyMessageConnectHandler implements ProxyMessageHandler {..}

//数据类型
interface ProxyDataTypeName {
    //...
    String CONNECT = "CONNECT";
    //...
}
```

上面那段构造函数就会拿到所有继承了所有Handler的实现类，然后拿到上面@Match注解的内容，将这个类型比如"CONNECT"加入到处理器Map中，如果重复或没有这个注解或注解内容为空会报错

**也就是说，CONNECT为处理器类型，ProxyMessageConnectHandler为处理器实例，分发任务时能够根据数据类型找到对应的处理器实例进行处理**



**`dispatch(Context context, Data data)`用于根据传入的数据类型，将任务分发给相应的处理器。**

先以服务端的分发器实现为例：

```java
//构造函数初始化
public ServerChannelHandler() {
    LockUtil.doubleCheckProcess(() -> null == dispatcher,
        ServerChannelHandler.class,
        () -> {
            dispatcher = new DefaultDispatcher<>("消息调度器",
                BeanManager.getBeanListBySuperClass(ProxyMessageHandler.class),
				//接受一个proxyMessage参数（表示消息），并根据消息的类型返回对应的名称
                //eg:proxyMessage->CONNECT
                proxyMessage -> ProxyDataTypeEnum.of((int)proxyMessage.getType()) == null ? null : ProxyDataTypeEnum.of((int)proxyMessage.getType()).getName());
     });
}

//ProxyDataTypeEnum示例
public enum ProxyDataTypeEnum {
    //..
	CONNECT(0x03, Constants.ProxyDataTypeName.CONNECT,"连接"),
    //..
    //cache将数据类型的整数值与对应的枚举常量进行映射
	private static Map<Integer,ProxyDataTypeEnum> cache = 	Stream.of(values()).collect(Collectors.toMap(ProxyDataTypeEnum::getType, Function.identity()));
    
    private int type;
	private String name;
	private String desc;

    //用于根据给定的整数类型值查找对应的枚举常量ProxyDataTypeEnum，在cache中查找并返回与给定类型值对应的枚举常量
	public static ProxyDataTypeEnum of(Integer type) {
		return cache.get(type);
	}
}
```

1. 首先，它通过调用 matcher.apply(data) 方法来获取数据的类型信息。
2. 然后，它根据获取到的类型信息从 handlerMap 中获取对应的处理器。
3. 最后，它调用获取到的处理器的 handle 方法来处理数据。

```java
@Override
public void dispatch(Context context, Data data) {
    //没有处理器直接返回
    if (CollectionUtil.isEmpty(handlerMap)) {
        return;
    }
    //根据data获取type，在使用构造函数时就已经将type和泛型data(也就是之后的message)关联了起来
    //eg:proxyMessage-> CONNECT 
    String type = matcher.apply(data);
    if (null == type) {
        log.warn("获取匹配类型失败 data:{]", JSONObject.toJSONString(data));
        return;
    }
    //从 handlerMap 中获取对应的处理器
    //eg:CONNECT->ProxyMessageConnectHandler
    Handler<Context,Data> handler = handlerMap.get(type);
    if (null == handler) {
        log.warn("找不到匹配的处理器 type:{}", type);
        return;
    }
    String name = handler.name();
    if (StringUtil.isEmpty(name)) {
        //获取类的简单名称
        name = TypeUtil.getSimpleName(handler.getClass());
    }
    log.debug("处理器[{}]执行.", name);
    //处理器的 handle 方法来处理数据
    handler.handle(context, data);
}
```



## cache `自定义缓存`

### Cache<K,V> `缓存模板`

包含了一些缓存的常用方法

```java
public interface Cache<K,V> {
 	//设置缓存
    void set(K k, V v);
	//获取缓存
    V get(K k);
    //判断缓存是否存在
    boolean containsKey(K k);
    //判断缓存值是否存在
    boolean containsValue(V v);
    //key集合
    Set<K> keySet();
	//值集合
    Collection<V> values();
    //是否为空
    boolean isEmpty();
    //清空缓存
    void clear();
    //缓存大小
    int size();
    //如果有且只有一个缓存，则返回该缓存值，否则返回空
    V isOnePeek();
}
```

### CacheGroup<K,V>`缓存组模板`

 其中K是group，一组缓存对应的键值，V就是Cache<K,V>

### Preservable `持久化的模板`

```java
public interface Preservable {
    //保存到磁盘
    void save();
	//从磁盘加载
    void load();
}
```

### LocalCache`本地缓存`

定义了一个本地缓存类 LocalCache，实现了 Cache<String, Object> 接口和 Preservable 接口,实现持久化缓存

```java
/**
 构造方法接收一个文件路径作为参数，初始化 cache 为一个新的 JSONObject 实例，并调用 load() 方法加载文件中的缓存数据
 cache：使用 JSONObject 对象作为缓存容器，存储键值对。
 path：存储缓存数据的文件路径
 */
public LocalCache(String path) {
    this.cache = new JSONObject();
    this.path = path;
    FileUtil.makeDirs(path);
    this.load();
}
```

将缓存的数据与文件路径上的文件持久化关联，随去随用

### MemoryCache<K,V>`内存缓存`

### MemoryCacheGroup<K,V> `MemoryCache的缓存组`



## config`解析配置类`

**解析配置类**，将指定目录下的yml配置文件转化为需要转化的类。其中`@Configuration`的file属性获取文件名称，`prefix`属性获取需要从yml文件过滤的值，然后根据`@Value`注解对配置类指定的属性赋值，最后返回

### ConfigurationParser

配置的解析器接口，有三种输入方式

`parse(InputStream in, Class<T> clazz)` 方法用于从输入流中解析配置。

`parse(Class<T> clazz)` 方法用于从默认位置解析配置。

`parse(Map<String, Object> config, Class<T> clazz)` 方法用于直接解析一个配置项的 Map 对象。

### AbstractConfigurationParser

实现了ConfigurationParser的抽象类，重写了三个parse方法进行中转解析配置类

```java
@Override
public <T> T parse(InputStream in, Class<T> clazz) throws ConfigurationParserException {
    // 方法将输入流解析为一个配置项的 Map 对象
    Map<String, Object> config = parse2Map(in);
    //解析得到的配置项 Map 对象和目标类类型传入，进行实际的配置解析
    return parse(config, clazz);
}
```

```java
@Override
public <T> T parse(Class<T> clazz) throws ConfigurationParserException {
    //获取默认的配置文件名，默认值由 defaultFileName() 方法提供
    String fileName = defaultFileName();
    //检查目标类是否使用了 @Configuration 注解，并且该注解是否指定了配置文件名。如果指定了，就使用指定的配置文件名，否则继续使用默认的配置文件名 （）@Configuration(file = "test1.yml")
    Configuration configuration = clazz.getAnnotation(Configuration.class);
    if (null != configuration && StringUtils.isNotEmpty(configuration.file())) {
        fileName = configuration.file();
    }
    try {
        //尝试获取指定文件名对应的输入流
        InputStream in = FileUtil.getInputStream(MetaDataConstant.CLASSPATH_RESOURCE_IDENTIFIER.concat("/").concat(fileName));
        //调用 parse(InputStream in, Class<T> clazz) 方法，将获取的输入流和目标类类型传入，进行配置解析并返回解析得到的配置对象
        return parse(in, clazz);
    } catch (FileNotFoundException e) {
        throw new ConfigurationParserException(String.format("配置文件[%s]不存在", fileName));
    }
}
```

最终调用的方法

```java
@Override
public <T> T parse(Map<String, Object> config, Class<T> clazz) throws ConfigurationParserException {
    return parseProxy(config, clazz);
}
```

**最终的实现方法：parseProxy(Map<String, Object> config, Class<?> clazz)**

```java
private  <T> T parseProxy(Map<String, Object> config, Class<?> clazz) throws ConfigurationParserException {
    T instance = null;
    try {
       //尝试使用反射创建目标类的实例
       instance = (T)clazz.newInstance();
    } catch (InstantiationException e) {
       throw new ConfigurationParserException(String.format("无法实例化类：%s", clazz.getName()));
    } catch (IllegalAccessException e) {
       throw new ConfigurationParserException(String.format("没有权限访问类：%s", clazz.getName()));
    }

    String prefix = "";
    //根据目标类上的 @Configuration 注解获取配置项的前缀（如果有的话）
    Configuration configuration = clazz.getAnnotation(Configuration.class);
    if (null != configuration) {
       prefix = configuration.prefix();
    }

    if (StringUtils.isNotEmpty(prefix)) {
        //配置项的前缀不为空，则根据前缀从配置项的 Map 中逐层获取子 Map，直到找到对应的配置
       String[] prefixNodes = prefix.split("\\.");
       for (String prefixNode : prefixNodes) {
          if (config.containsKey(prefixNode) && config.get(prefixNode) instanceof Map) {
             config = (Map<String, Object>) config.get(prefixNode);
             if (CollectionUtil.isEmpty(config)) {
                return instance;
             }
          } else {
             return instance;
          }
       }
    }
    
    //使用反射获取目标类的所有字段
    Set<Field> fields = ReflectUtil.getInheritChainDeclaredFieldSet(clazz);
    if (CollectionUtil.isEmpty(fields)) {
       return instance;
    }
    for (Field field : fields) {
       String key = field.getName();
       //检查字段上是否有 @Value 注解，如果有，获取注解的值作为配置项的键
       Value value = field.getAnnotation(Value.class);
       if (null != value && StringUtil.notEmpty(value.value())) {
          key = value.value();
       }
       //从配置项的 Map 中获取与字段对应的值，并使用反射设置字段的值
       boolean success = ReflectUtil.setFieldValue(field, instance, config.get(key));
       if (!success) {
          try {
             //设置字段值失败，则尝试递归调用 parseProxy 方法，以字段的类型和对应的配置项作为参数，尝试解析字段的复杂类型
             Object o = parseProxy((Map)config.get(key), field.getType());
             if (null != o) {
                ReflectUtil.setFieldValue(field, instance, o);
             }
             //解析失败，忽略异常继续遍历下一个字
          } catch (Exception ignored) {
          }
       }
    }
    return instance;
}
```

### YmlConfigurationParser

重写了AbstractConfigurationParser的`Map<String, Object> parse2Map(InputStream in)`和`String defaultFileName()`

`parse2Map(InputStream in)：` 将yaml配置文件转化为Map

`defaultFileName():` 获取配置文件的默认名称`application.yml`



## constant.MetaDataConstant

指定了一些常量：文件下的路径等



## context`应用配置`

### ApplicationConfig

应用名称配置



### ApplicationContext

应用上下文，里面有属性应用环境`Environment environment,`应用配置`ApplicationConfig applicationConfig,`bean容器`BeanContainer beanContainer`



### Environment

一些环境配置`@Accessors(chain = true)`可以让它链式调用

```java
@Accessors(chain = true)
@Data
public class Environment {
    //启动类
    private Class<?> mainClass;
    //启动参数
    private String[] mainArgs;
    //包扫描路径
    private List<String> scanBasePackages;
    //横幅
    private String banner;
	//应用配置
    private ApplicationConfig config;
}
```



### Bean

管理 Bean 的生命周期，包括实例化、初始化、依赖注入和销毁等操作

**变量**

```java
/**
 * name: Bean 的名称。
 * clazz: Bean 的类 类型。
 * instance: Bean 的实例。
 * component: Bean 类上的 @Component 注解。
 * order: Bean 的排序顺序。
 * isBoot: 标志是否为启动时必须初始化的 Bean。
 * isInit: 标志 Bean 是否已经初始化。
 */
private String name;
private Class<?> clazz;
private Object instance;
private Component component;
private int order;
private boolean isBoot;
private volatile boolean isInit;
```

**初始化方法**`@init注解`

```java
@Override
public void init() {
    //...如果已经被初始化或有实例则返回
    isInit = true;
    //反射获取目标类所有方法
    Set<Method> methods = ReflectUtil.getMethods(clazz);
    if (CollectionUtil.notEmpty(methods)) {
       for (Method method : methods) {
           //检查该方法是否被 @Init 注解标记，并且方法是否没有参数
          if (method.isAnnotationPresent(Init.class) && method.getParameters().length == 0) {
             try {
                 //符合条件，通过反射调用带有 @Init 注解的无参初始化方法
                method.invoke(instance);
             } catch (Exception e) {
               	//...初始化方法执行异常
             }
          }
       }
    }
}
```

**destroy()**

销毁方法，针对`@Destroy`注解，和上个方法类似

**newInstance0()**

创建类的对应实例方法

```java
	//实际创建 Bean 实例的方法。首先检查是否已经存在实例，然后使用双重检查锁定模式创建实例。如果 Bean 类上标记了 @Configuration 注解，则通过 ConfigUtil.getYmlConfig(clazz) 方法从 YAML 配置文件中获取实例
private boolean newInstance0() {
    return LockUtil.doubleCheckProcess(() -> !hasInstance(),
       this,
       () -> {
          try {
             // 暂时先只支持yml配置
             Configuration configuration = clazz.getAnnotation(Configuration.class);
             if (null != configuration) {
                instance = ConfigUtil.getYmlConfig(clazz);
             } else {
                // 由编码规避没有无参构造器的问题
                instance = clazz.newInstance();
             }
          } catch (Exception e) {
             // ignore
          }
       },
       () -> hasInstance()
    );
}
```

**newInstance(ApplicationContext context)**

创建Bean实例的方法

```java
//创建 Bean 的实例，并进行注入和初始化。首先调用 newInstance0() 方法创建实例，然后进行依赖注入并调用 init() 方法进行初始化
public boolean newInstance(ApplicationContext context) {
    boolean result = newInstance0();
    if (result) {
       inject(context);
       init();
    }
    return result;
}
```

**inject(ApplicationContext context)**

对Bean进行依赖注入

```java
/**
 * 对 Bean 进行依赖注入。首先获取类中标记了 @Bean 注解的方法，并执行这些方法获取额外的 Bean，并将其加入容器中。
 * 然后遍历类中的字段，对标记了 @Autowired 注解的字段进行自动注入
 */
private void inject(ApplicationContext context) {
    //目标类 clazz 中所有的方法
    Set<Method> methods = ReflectUtil.getMethods(clazz);
    if (CollectionUtil.notEmpty(methods)) {
       methods.stream().forEach(method -> {
           //获取该方法上的 @Bean 注解实例
          fun.asgc.neutrino.core.annotation.Bean bean = method.getAnnotation(fun.asgc.neutrino.core.annotation.Bean.class);
           //如果该方法没有被 @Bean 注解标记，则直接返回，不进行后续处理
          if (null == bean) {
             return;
          }
          //从 @Bean 注解中获取 value 属性值，该值表示注册到容器中的 bean 的名称。如果 value 属性值为空，则使用方法名作为 bean 的名称
          String name = bean.value();
          if (StringUtil.isEmpty(name)) {
             name = method.getName();
          }
          //检查方法是否没有参数，如果是，则执行以下操作 (TODO 方法带参数的情况、class重复的问题，暂时由编码规避)
          if (method.getParameters().length == 0) {
             try {
                 //反射调用该方法，传入当前对象(Bean注解标注的方法会返回一个实例然后被注入到容器中)
                Object obj = method.invoke(this.instance);
                if (null == obj) {
                   log.error("bean 实例不能为空!");
                   return;
                }
                 //对象封装成 Bean 对象，并添加到容器的 bean 容器中
                context.getBeanContainer().addBean(new Bean()
                   .setClazz(obj.getClass())
                   .setBoot(false)
                   .setComponent(null)
                   .setInstance(obj)
                   .setName(name)
                   .setOrder(Integer.MAX_VALUE)
                );
             } catch (Exception e) {
                log.error(String.format("bean [%s] 实例化失败!", name), e);
             }
          }
       });
    }
    //获取目标类 clazz 及其父类中声明的所有字段
    Set<Field> fieldSet = ReflectUtil.getInheritChainDeclaredFieldSet(clazz);
    if (CollectionUtil.notEmpty(fieldSet)) {
       fieldSet.forEach(field -> {
           //获取该字段上的 @Autowired 注解实例
          Autowired autowired = field.getAnnotation(Autowired.class);
          if (null == autowired) {
             return;
          }
           //字段的类型进行不同的处理
           //果字段类型是 Environment、ApplicationConfig、BeanContainer 或者 ApplicationContext，则直接通过 ReflectUtil.setFieldValue 方法将相应的容器对象赋值给该字段
          if (field.getType() == Environment.class) {
           	//...相应的容器对象赋值
          } else {
              //表示该字段是一个自定义类型的依赖，需要从容器中获取相应的 bean 进行注入
             Class<?> autowiredType = field.getType();
             Bean autowiredBean = null;
              //根据字段的类型获取相应的依赖 bean，如果 @Autowired 注解的 value 属性不为空，则根据属性值获取对应的 bean，否则根据字段类型获取对应的 bean
             if (StringUtil.isEmpty(autowired.value())) {
                autowiredBean = context.getBeanContainer().getBean(autowiredType);
             } else {
                autowiredBean = context.getBeanContainer().getBean(autowired.value());
             }
              //获取的依赖 bean 为 null，则抛出异常，表示依赖 bean 不存在
             if (null == autowiredBean) {
				//..依赖bean不存在!
             }
              //检查是否存在循环依赖，如果当前类与依赖 bean 存在循环依赖关系，则抛出异常
             if (autowiredBean.isDependOn(clazz)) {
               	//..类[%s]与类[%s]存在循环依赖!
             }
              //初始化依赖 bean，将其实例化并注入容器，确保 依赖bean 中的依赖也能被递归地解决
             autowiredBean.newInstance(context);
              //依赖 bean 的实例赋值给目标类的字段
             ReflectUtil.setFieldValue(field, instance, autowiredBean.getInstance());
          }
       });
    }
}
```



## container`自定义容器`

执行的顺寻是`DefaultClassContainer->DefaultBeanContainer->DefaultApplicationContainer`

### Container，ClassContainer，BeanContainer，ApplicationContainer

容器接口，后面三个实现了第一个

### LifeCycle

生命周期接口，有init()和destroy()两个方法，被Bean实现了



### DefaultApplicationContainer`应用容器`

默认的应用容器实现，用于初始化和管理应用程序的组件和资源

**变量**

```java
//environment: 应用程序的环境信息
private Environment environment;
//beanContainer: Bean 容器，用于管理应用程序中的所有 Bean
private BeanContainer beanContainer;
//context: 应用程序的上下文信息，包括环境、Bean 容器和应用配置等
private ApplicationContext context;
```

**init()初始化方法**

```java
public void init() throws ContainerInitException {
    //创建了 beanContainer
    this.beanContainer = new DefaultBeanContainer(environment);
    //创建了ApplicationContext并将属性全部配置
    this.context = new ApplicationContext()
       .setEnvironment(environment)
       .setBeanContainer(beanContainer)
       .setApplicationConfig(environment.getConfig());
    //将上下文信息设置到 BeanManager 中
    BeanManager.setContext(this.context);
    this.beanContainer.beanList().forEach(bean -> {
        //根据其是否是启动 Bean 或者是否是懒加载的，进行实例化操作
       if (bean.isBoot() || !bean.isLazy()) {
          bean.newInstance(context);
       }
    });
    log.info("应用容器初始化完成");
    this.run();
}
```

**run()和destory()**

启动和销毁方法

```java
private void run() {
    //遍历了 beanContainer 中的所有 Bean
    this.beanContainer.beanList().forEach(bean -> {
        //某个 Bean 是启动 Bean
       if (bean.isBoot()) {
           //检查该 Bean 是否已经实例化
          if (bean.hasInstance()) {
              //是否是 ApplicationRunner 的子类
             if (ApplicationRunner.class.isAssignableFrom(bean.getClazz())) {
                ApplicationRunner runner = (ApplicationRunner)bean.getInstance();
                 //调用其 run() 方法
                runner.run(environment.getMainArgs());
             }
          }
       }
    });
}

@Override
public void destroy() {
    //销毁了 beanContainer 中的所有 Bean，并依次调用每个 Bean 的 destroy() 方法
    this.beanContainer.destroy();
    this.beanContainer.beanList().forEach(bean -> bean.destroy());
    log.info("应用容器销毁");
}
```



### DefaultBeanContainer`Bean容器`

默认的 Bean 容器实现，用于管理应用程序中的所有 Bean

**变量**，除了ClassContainer由构造函数进行统一初始化，然后调用init()

```java
// 应用程序的环境信息。
private Environment environment;
//classContainer: 类容器，用于获取应用程序中的所有类。
private ClassContainer classContainer;
//名称到 Bean 的缓存，用于快速通过名称查找 Bean。
private Cache<String, Bean> nameBeanCache;
//类到 Bean 的缓存，用于快速通过类查找 Bean。
private Cache<Class<?>, Bean> classBeanCache;
//所有的Bean
private List<Bean> beans;
```

**init()初始化方法**

```java
@Override
public void init() throws ContainerInitException {
    //创建一个 DefaultClassContainer 实例
    this.classContainer = new DefaultClassContainer(environment);
    //遍历容器中带有@Component注解的类，并对每个类执行操作
    this.classContainer.getComponentClasses().forEach(clazz -> {
       String name = clazz.getName();
        //获取组件类上的 @Component 注解实例
       Component component = ClassUtil.getAnnotation(clazz, Component.class);
       if (null != component && StringUtil.notEmpty(component.value())) {
           //如果组件类上存在 @Component 注解，并且注解的 value 属性不为空，则将 value 属性的值作为组件的名称
          name = component.value();
       }
        //获取组件类上的 @Order 注解实例
       Order order = ClassUtil.getAnnotation(clazz, Order.class);
        //初始化组件的顺序值，默认为 Integer.MAX_VALUE
       int orderValue = Integer.MAX_VALUE;
       if (null != order) {
           //如果组件类上存在 @Order 注解，则将注解的 value 属性值作为组件的顺序值
          orderValue = order.value();
       }
        //创建一个 Bean 实例，并将其添加到容器中
        //看后面方法，其实是先添加到了两个缓存中
       addBean(new Bean()
          .setClazz(clazz)
          .setName(name)
          .setComponent(component)
          .setOrder(orderValue)
       );
    });
    if (!classBeanCache.isEmpty()) {
        //将缓存中的 bean 集合赋值给 beans
       beans = Lists.newArrayList(classBeanCache.values
       //根据组件的顺序值对 beans 进行排序
       Collections.sort(beans, Comparator.comparingInt(Bean::getOrder));
    }
    log.info("bean容器初始化完成");
}
```

**addBean()添加Bean到容器的方法**

```java
@Override
public void addBean(Bean bean) {
    if (null == bean) {
       return;
    }
    // TODO 暂时由编码时规避名字冲突
    //如果这个类是ApplicationRunner子类，则进行标记
    if (ApplicationRunner.class.isAssignableFrom(bean.getClazz())) {
       bean.setOrder(Integer.MIN_VALUE);
       bean.setBoot(true);
    }
    //现根据名称和类型将类加到缓存
    classBeanCache.set(bean.getClazz(), bean);
    nameBeanCache.set(bean.getName(), bean);
}
```



### DefaultClassContainer`类容器`

用于扫描和管理应用程序中的所有类

**变量** 由构造函数进行统一初始化，然后调用init()

```java
//environment: 应用程序的环境信息。
private Environment environment;
//classes: 存储所有类的集合。
private Set<Class<?>> classes;
//componentClasses: 存储被 @Component 注解标记的类的集合
private Set<Class<?>> componentClasses;
```

**init()方法**

```java
@Override
public void init() throws ContainerInitException {
    try {
        //检查扫描基础包是否为空，如果为空，则直接返回
       if (CollectionUtil.isEmpty(environment.getScanBasePackages())) {
          return;
       }
       //扫描指定包下的类，并将扫描到的类存储到 classes 集合中
       this.classes = ClassUtil.scan(environment.getScanBasePackages());
        //从 classes 集合中筛选出带有 @Component 注解的类，并将它们存储到 componentClasses 集合
       this.componentClasses = this.classes.stream().filter(item -> ClassUtil.isAnnotateWith(item, Component.class)).collect(Collectors.toSet());
       log.info("class容器初始化完成");
    } catch (Exception e) {
		//..
    }
}
```



## InternalException`自定义异常`

配置类解析异常，容器初始化异常，内部异常



## runner.ApplicationRunner

继承了`ApplicationRunner`的就是启动类



## launcher.NeutrinoLauncher`启动类`

用于启动应用程序。它负责初始化环境、加载配置、创建应用容器，并启动应用

**启动准备工作**

```java
//系统环境信息
private Environment environment;
//应用容器
private ApplicationContainer applicationContainer;

public static SystemUtil.RunContext run(final Class<?> clazz, final String[] args) {
    Assert.notNull(clazz, "启动类不能为空!");
    //使用 NeutrinoLauncher 类创建一个实例，并调用 launch 方法来启动系统
    return new NeutrinoLauncher(clazz, args).launch();
}

//初始化 NeutrinoLauncher 实例，接收应用程序的主类和命令行参数作为参数
private NeutrinoLauncher(Class<?> clazz, String[]  args) {
    this.environment = new Environment()
        .setMainClass(clazz)
        .setMainArgs(args);
}

//实际启动系统
private SystemUtil.RunContext launch() {
    //创建一个 StopWatch 对象 stopWatch，用于计时系统启动时间
    StopWatch stopWatch = new StopWatch();
    stopWatch.start();
    //初始化系统环境
    environmentInit();
    //将初始化好的环境传入，创建一个应用容器
    this.applicationContainer = new DefaultApplicationContainer(environment);
    //等待进程销毁，以确保在系统退出时能够执行应用容器的销毁操作，并获取运行上下文
    SystemUtil.RunContext runContext = SystemUtil.waitProcessDestroy(() -> this.applicationContainer.destroy());
    //停止计时器，并记录系统启动时间
    stopWatch.stop();
    //打印系统日志
    printLog(environment, stopWatch);
    return runContext;
}
```

**environmentInit() :初始化了重要的environment**

```java
//初始化系统环境，也就是重要的environment
private void environmentInit() {
    //设置扫描基础包
   environment.setScanBasePackages(Lists.newArrayList(TypeUtil.getPackageName(environment.getMainClass())));
    //处理系统启动时的 Banner，打印 banner的 Logo
   bannerProcess(environment);
    //获取 @NeutrinoApplication 注解
   NeutrinoApplication neutrinoApplication = environment.getMainClass().getAnnotation(NeutrinoApplication.class);
   if (null != neutrinoApplication) {
       //获取注解中的 scanBasePackages 属性值，并将其作为扫描基础包
       String[] scanBasePackages = neutrinoApplication.scanBasePackages();
       if (ArrayUtil.notEmpty(scanBasePackages)) {
           //将获取到的扫描基础包设置到环境中！
           environment.setScanBasePackages(Lists.newArrayList(scanBasePackages));
       }
   }
   log.info("scanBasePackages: {}", environment.getScanBasePackages());
	// 加载 YAML 格式的应用配置，并将配置设置到环境中
   environment.setConfig(ConfigUtil.getYmlConfig(ApplicationConfig.class));
   log.info("load ApplicationConfig finished.");
}
```



## type

对类操作的一些方法TODO



## util

工具类TODO