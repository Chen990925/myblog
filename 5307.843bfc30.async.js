"use strict";(self.webpackChunkblog=self.webpackChunkblog||[]).push([[5307],{5307:function(t,e,a){a.r(e),a.d(e,{texts:function(){return n}});const n=[{value:"\u8FD9\u91CC\u4EE5\u914D\u7F6E\u7C7B\u793A\u4F8B",paraId:0,tocIndex:0},{value:`public static void main(String[] args)   {
   // \u52A0\u8F7Dspring\u4E0A\u4E0B\u6587
   AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext(MainConfig.class);
 
   Car car =  context.getBean("car",Car.class);
   System.out.println(car.getName());
}
`,paraId:1,tocIndex:0},{value:"\u4ECE\u8FD9\u91CC\u51FA\u53D1\uFF1A",paraId:2,tocIndex:1},{value:` // \u52A0\u8F7Dspring\u4E0A\u4E0B\u6587
   AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext(MainConfig.class);
`,paraId:3,tocIndex:1},{value:"\u521B\u5EFA AnnotationConfigApplicationContext \u5BF9\u8C61",paraId:4,tocIndex:1},{value:`public AnnotationConfigApplicationContext(Class<?>... annotatedClasses) {
    //\u672C\u7C7B\u7684\u6784\u9020\u51FD\u6570\u91CC\u9762\uFF0C\u521D\u59CB\u5316\u4E86\u4E00\u4E2A\u8BFB\u53D6\u5668\uFF1AAnnotatedBeanDefinitionReader read\uFF0C\u4E00\u4E2A\u626B\u63CF\u5668ClassPathBeanDefinitionScanner scanner
    //scanner\u7684\u7528\u5904\u4E0D\u662F\u5F88\u5927\uFF0C\u5B83\u4EC5\u4EC5\u662F\u5728\u6211\u4EEC\u5916\u90E8\u624B\u52A8\u8C03\u7528 .scan \u7B49\u65B9\u6CD5\u624D\u6709\u7528\uFF0C\u5E38\u89C4\u65B9\u5F0F\u662F\u4E0D\u4F1A\u7528\u5230scanner\u5BF9\u8C61\u7684
    this();
    //\u628A\u4F20\u5165\u7684\u7C7B\u8FDB\u884C\u6CE8\u518C\uFF0C\u8FD9\u91CC\u6709\u4E24\u4E2A\u60C5\u51B5\uFF0C
    //\u4F20\u5165\u4F20\u7EDF\u7684\u914D\u7F6E\u7C7B
    //\u4F20\u5165bean\uFF08\u867D\u7136\u4E00\u822C\u6CA1\u6709\u4EBA\u4F1A\u8FD9\u4E48\u505A
    //\u770B\u5230\u540E\u9762\u4F1A\u77E5\u9053spring\u628A\u4F20\u7EDF\u7684\u5E26\u4E0A@Configuration\u7684\u914D\u7F6E\u7C7B\u79F0\u4E4B\u4E3AFULL\u914D\u7F6E\u7C7B\uFF0C\u4E0D\u5E26@Configuration\u7684\u79F0\u4E4B\u4E3ALite\u914D\u7F6E\u7C7B
    //\u4F46\u662F\u6211\u4EEC\u8FD9\u91CC\u5148\u628A\u5E26\u4E0A@Configuration\u7684\u914D\u7F6E\u7C7B\u79F0\u4E4B\u4E3A\u4F20\u7EDF\u914D\u7F6E\u7C7B\uFF0C\u4E0D\u5E26\u7684\u79F0\u4E4B\u4E3A\u666E\u901Abean
    register(annotatedClasses);
    //\u5237\u65B0
    refresh();
}
`,paraId:5,tocIndex:1},{value:"\u8FD9\u662F\u4E00\u4E2A\u6709\u53C2\u7684\u6784\u9020\u65B9\u6CD5 ",paraId:6,tocIndex:1},{value:"public AnnotationConfigApplicationContext(Class<?>... annotatedClasses) {",paraId:6,tocIndex:1},{value:"\uFF0C\u53EF\u4EE5\u63A5\u6536\u591A\u4E2A\u914D\u7F6E\u7C7B\uFF0C\u4E0D\u8FC7\u4E00\u822C\u60C5\u51B5\u4E0B\uFF0C\u53EA\u4F1A\u4F20\u5165\u4E00\u4E2A\u914D\u7F6E\u7C7B\u3002",paraId:6,tocIndex:1},{value:"\u8FD9\u4E2A\u914D\u7F6E\u7C7B\u6709\u4E24\u79CD\u60C5\u51B5\uFF0C\u4E00\u79CD\u662F\u4F20\u7EDF\u610F\u4E49\u4E0A\u7684",paraId:7,tocIndex:1},{value:"\u5E26\u4E0A @Configuration \u6CE8\u89E3\u7684\u914D\u7F6E\u7C7B",paraId:7,tocIndex:1},{value:"\uFF0C\u8FD8\u6709\u4E00\u79CD\u662F",paraId:7,tocIndex:1},{value:"\u6CA1\u6709\u5E26\u4E0A @Configuration",paraId:7,tocIndex:1},{value:"\uFF0C\u4F46\u662F",paraId:7,tocIndex:1},{value:"\u5E26\u6709 @Component\uFF0C@Import\uFF0C@ImportResouce\uFF0C@Service\uFF0C@ComponentScan \u7B49\u6CE8\u89E3\u7684\u914D\u7F6E\u7C7B",paraId:7,tocIndex:1},{value:"\uFF0C\u5728 Spring \u5185\u90E8\u628A\u524D\u8005\u79F0\u4E3A ",paraId:7,tocIndex:1},{value:"Full \u914D\u7F6E\u7C7B",paraId:7,tocIndex:1},{value:"\uFF0C\u628A\u540E\u8005\u79F0\u4E4B\u4E3A ",paraId:7,tocIndex:1},{value:"Lite \u914D\u7F6E\u7C7B",paraId:7,tocIndex:1},{value:"\u3002",paraId:7,tocIndex:1},{value:"\u5728\u672C\u6E90\u7801\u5206\u6790\u4E2D\uFF0C\u6709\u4E9B\u5730\u65B9\u4E5F\u628A Lite \u914D\u7F6E\u7C7B\u79F0\u4E3A",paraId:8,tocIndex:1},{value:"\u666E\u901A Bean",paraId:8,tocIndex:1},{value:`this();
`,paraId:9,tocIndex:2},{value:"\u8C03\u7528\u5B50\u7C7B\u7684\u6784\u9020\u51FD\u6570\uFF0C\u4F1A\u5148\u8C03\u7528\u7236\u7C7B",paraId:10,tocIndex:2},{value:"GenericApplicationContext",paraId:10,tocIndex:2},{value:"\u7684\u6784\u9020\u51FD\u6570\uFF0C\u8BA9\u6211\u4EEC\u770B\u770B",paraId:10,tocIndex:2},{value:"\u5728",paraId:11,tocIndex:2},{value:"\u9762\u5411\u5BF9\u8C61\u4E2D",paraId:11,tocIndex:2},{value:"\uFF0C\u5B50\u7C7B\u7EE7\u627F\u4E86\u7236\u7C7B\u7684\u5C5E\u6027\u548C\u65B9\u6CD5\uFF0C\u800C\u6784\u9020\u51FD\u6570\u8D1F\u8D23\u5BF9\u5BF9\u8C61\u8FDB\u884C\u521D\u59CB\u5316\uFF0C\u5305\u62EC\u521D\u59CB\u5316\u7EE7\u627F\u7684\u5C5E\u6027\u3002\u56E0\u6B64\u5728\u521B\u5EFA\u5B50\u7C7B\u5BF9\u8C61\u65F6\uFF0C\u5FC5\u987B\u5148\u786E\u4FDD\u7236\u7C7B\u90E8\u5206\u5DF2\u7ECF\u5B8C\u6210\u4E86\u521D\u59CB\u5316\uFF0C\u8FD9\u5C31\u9700\u8981\u5148\u8C03\u7528\u7236\u7C7B\u7684\u6784\u9020\u51FD\u6570",paraId:11,tocIndex:2},{value:`public class GenericApplicationContext extends AbstractApplicationContext implements BeanDefinitionRegistry {
public GenericApplicationContext() {
    this.beanFactory = new DefaultListableBeanFactory();
}
}
`,paraId:12,tocIndex:2},{value:"\u7236\u7C7B\u7684\u6784\u9020\u51FD\u6570\u91CC\u9762\u5C31\u662F",paraId:13,tocIndex:2},{value:"\u521D\u59CB\u5316DefaultListableBeanFactory\uFF0C\u5E76\u4E14\u8D4B\u503C\u7ED9beanFactory",paraId:13,tocIndex:2},{value:"\u4E3A\u4EC0\u4E48\u4F7F\u7528DefaultListableBeanFactory\uFF1F",paraId:14,tocIndex:2},{value:"DefaultListableBeanFactory",paraId:15,tocIndex:2},{value:" \u662F Spring \u4E2D\u6700\u5E38\u7528\u7684 ",paraId:15,tocIndex:2},{value:"BeanFactory",paraId:15,tocIndex:2},{value:" \u5B9E\u73B0\u4E4B\u4E00\uFF0C\u56E0\u4E3A\u5B83\u63D0\u4F9B\u4E86\u5BF9 bean \u7684\u6CE8\u518C\u3001\u89E3\u6790\u3001\u83B7\u53D6\u7B49\u64CD\u4F5C\u7684\u652F\u6301\uFF0C\u529F\u80FD\u6700\u4E3A\u5F3A\u5927",paraId:15,tocIndex:2},{value:"\u6267\u884C\u6784\u9020\u51FD\u6570AnnotationConfigApplicationContext()",paraId:16,tocIndex:2},{value:`public class AnnotationConfigApplicationContext extends GenericApplicationContext implements AnnotationConfigRegistry {
 
    //\u6CE8\u89E3bean\u5B9A\u4E49\u8BFB\u53D6\u5668\uFF0C\u4E3B\u8981\u4F5C\u7528\u662F\u7528\u6765\u8BFB\u53D6\u88AB\u6CE8\u89E3\u7684\u4E86bean
    private final AnnotatedBeanDefinitionReader reader;
 
    //\u626B\u63CF\u5668\uFF0C\u5B83\u4EC5\u4EC5\u662F\u5728\u6211\u4EEC\u5916\u90E8\u624B\u52A8\u8C03\u7528 .scan \u7B49\u65B9\u6CD5\u624D\u6709\u7528\uFF0C\u5E38\u89C4\u65B9\u5F0F\u662F\u4E0D\u4F1A\u7528\u5230scanner\u5BF9\u8C61\u7684
    private final ClassPathBeanDefinitionScanner scanner;
 
    public AnnotationConfigApplicationContext() {
        //\u521D\u59CB\u5316\u4E00\u4E2ABean\u8BFB\u53D6\u5668
        this.reader = new AnnotatedBeanDefinitionReader(this);
 
        //\u521D\u59CB\u5316\u4E00\u4E2A\u626B\u63CF\u5668\uFF0C\u5B83\u4EC5\u4EC5\u662F\u5728\u6211\u4EEC\u5916\u90E8\u624B\u52A8\u8C03\u7528 .scan \u7B49\u65B9\u6CD5\u624D\u6709\u7528\uFF0C\u5E38\u89C4\u65B9\u5F0F\u662F\u4E0D\u4F1A\u7528\u5230scanner\u5BF9\u8C61\u7684
        this.scanner = new ClassPathBeanDefinitionScanner(this);
    }
}
`,paraId:17,tocIndex:2},{value:"\u5176\u4E3B\u8981\u505A\u4E86 2 \u4EF6\u4E8B\u60C5",paraId:18,tocIndex:2},{value:"\u6CE8\u518C\u5185\u7F6E BeanPostProcessor",paraId:19,tocIndex:2},{value:"\u6CE8\u518C\u76F8\u5173\u7684 BeanDefinition",paraId:20,tocIndex:2},{value:"\u5B9E\u4F8B\u5316",paraId:21},{value:"BeanDefinition",paraId:21},{value:"\u8BFB\u53D6\u5668\uFF1A AnnotatedBeanDefinitionReader",paraId:21},{value:`this.reader = new AnnotatedBeanDefinitionReader(this);
`,paraId:22,tocIndex:3},{value:"\u770B\u770B Spring \u5728\u521D\u59CB\u5316 AnnotatedBeanDefinitionReader \u7684\u65F6\u5019\u505A\u4E86\u4EC0\u4E48",paraId:23,tocIndex:3},{value:"\u8FDB\u5165AnnotatedBeanDefinitionReader\uFF0C\u770B\u5230AnnotationConfigApplicationContext \u4F5C\u4E3ABeanDefinitionRegistry\u4F20\u5165",paraId:24,tocIndex:3},{value:`public AnnotatedBeanDefinitionReader(BeanDefinitionRegistry registry) {
        this(registry, getOrCreateEnvironment(registry));
}
`,paraId:25,tocIndex:3},{value:"\u8FD9\u91CC\u53C8\u76F4\u63A5\u8C03\u7528\u4E86\u6B64\u7C7B\u5176\u4ED6\u7684\u6784\u9020\u65B9\u6CD5\uFF1A\u70B9\u51FB\u8FDB\u5165this()",paraId:26,tocIndex:3},{value:`public AnnotatedBeanDefinitionReader(BeanDefinitionRegistry registry, Environment environment) {
    this.beanNameGenerator = new AnnotationBeanNameGenerator();
    this.scopeMetadataResolver = new AnnotationScopeMetadataResolver();
    Assert.notNull(registry, "BeanDefinitionRegistry must not be null");
    Assert.notNull(environment, "Environment must not be null");
    this.registry = registry;
    this.conditionEvaluator = new ConditionEvaluator(registry, environment, (ResourceLoader)null);
    AnnotationConfigUtils.registerAnnotationConfigProcessors(this.registry);
}
`,paraId:27,tocIndex:3},{value:"\u8BA9\u6211\u4EEC\u628A\u76EE\u5149\u79FB\u52A8\u5230\u8FD9\u4E2A\u65B9\u6CD5\u7684\u6700\u540E\u4E00\u884C\uFF0C\u8FDB\u5165 ",paraId:28,tocIndex:3},{value:"registerAnnotationConfigProcessors",paraId:28,tocIndex:3},{value:" \u65B9\u6CD5\uFF1A",paraId:28,tocIndex:3},{value:"\u8FDB\u5165AnnotationConfigUtils\u7C7B",paraId:29,tocIndex:3},{value:`public static void registerAnnotationConfigProcessors(BeanDefinitionRegistry registry) {
	registerAnnotationConfigProcessors(registry, null);
}
`,paraId:30,tocIndex:3},{value:"\u518D\u70B9\u8FDB\u53BB\uFF0C\u8FD9\u4E2A\u65B9\u6CD5\u7684\u8FD4\u56DE\u503C ",paraId:31,tocIndex:3},{value:"Set<BeanDefinitionHolder> ",paraId:31,tocIndex:3},{value:"\uFF0C\u4F46\u662F\u4E0A\u6E38\u65B9\u6CD5\u5E76\u6CA1\u6709\u53BB\u63A5\u6536\u8FD9\u4E2A\u8FD4\u56DE\u503C\uFF0C\u6240\u4EE5\u8FD9\u4E2A\u65B9\u6CD5\u7684\u8FD4\u56DE\u503C\u4E5F\u4E0D\u662F\u5F88\u91CD\u8981\u4E86\uFF0C\u5F53\u7136\u65B9\u6CD5\u5185\u90E8\u7ED9\u8FD9\u4E2A\u8FD4\u56DE\u503C\u8D4B\u503C\u4E5F\u4E0D\u91CD\u8981\u4E86\u3002",paraId:31,tocIndex:3},{value:"\u7531\u4E8E\u8FD9\u4E2A\u65B9\u6CD5\u5185\u5BB9\u6BD4\u8F83\u591A\uFF0C\u8FD9\u91CC\u5C31\u628A\u6700\u6838\u5FC3\u7684\u8D34\u51FA\u6765\uFF0C\u8FD9\u4E2A\u65B9\u6CD5\u7684\u6838\u5FC3\u5C31\u662F",paraId:32,tocIndex:3},{value:"\u6CE8\u518C Spring \u5185\u7F6E\u7684\u591A\u4E2A Bean",paraId:32,tocIndex:3},{value:`if (!registry.containsBeanDefinition(CONFIGURATION_ANNOTATION_PROCESSOR_BEAN_NAME)) {
	RootBeanDefinition def = new RootBeanDefinition(ConfigurationClassPostProcessor.class);
	def.setSource(source);
	beanDefs.add(registerPostProcessor(registry, def, CONFIGURATION_ANNOTATION_PROCESSOR_BEAN_NAME));
}
`,paraId:33,tocIndex:3},{value:"\u5224\u65AD\u5BB9\u5668\u4E2D\u662F\u5426\u5DF2\u7ECF\u5B58\u5728\u4E86 ConfigurationClassPostProcessor \u8FD9\u4E2ABean",paraId:34,tocIndex:3},{value:`if (!registry.containsBeanDefinition(CONFIGURATION_ANNOTATION_PROCESSOR_BEAN_NAME))
`,paraId:35,tocIndex:3},{value:"\u5982\u679C\u4E0D\u5B58\u5728\uFF08\u5F53\u7136\u8FD9\u91CC\u80AF\u5B9A\u662F\u4E0D\u5B58\u5728\u7684\uFF09\uFF0C\u5C31\u901A\u8FC7 RootBeanDefinition \u7684\u6784\u9020\u65B9\u6CD5\u83B7\u5F97 ConfigurationClassPostProcessor \u7684 BeanDefinition\uFF0CRootBeanDefinition \u662F BeanDefinition \u7684\u5B50\u7C7B",paraId:36,tocIndex:3},{value:`RootBeanDefinition def = new RootBeanDefinition(ConfigurationClassPostProcessor.class);
`,paraId:37,tocIndex:3},{value:"\u6267\u884C registerPostProcessor \u65B9\u6CD5\uFF0CregisterPostProcessor \u65B9\u6CD5\u5185\u90E8\u5C31\u662F\u6CE8\u518C Bean\uFF0C\u5F53\u7136\u8FD9\u91CC\u6CE8\u518C\u5176\u4ED6 Bean \u4E5F\u662F\u4E00\u6837\u7684\u6D41\u7A0B\u3002\u8FD9\u91CC\u7684\u8FD4\u56DE\u503C\u4E0D\u91CD\u8981\uFF0C\u6CE8\u518C\u8FDB\u53BB\u5C31\u884C\u4E86\u3002",paraId:38,tocIndex:3},{value:`registerPostProcessor(registry, def, CONFIGURATION_ANNOTATION_PROCESSOR_BEAN_NAME)
`,paraId:39,tocIndex:3},{value:"internalConfigurationAnnotationProcessor",paraId:40,tocIndex:3},{value:",",paraId:40,tocIndex:3},{value:"internalAutowiredAnnotationProcessor",paraId:40,tocIndex:3},{value:",",paraId:40,tocIndex:3},{value:"internalRequiredAnnotationProcessor",paraId:40,tocIndex:3},{value:"\u8FD9\u4E9B\u4E2A\u4E71\u4E03\u516B\u7CDF\u7684\u7C7B\u53C8\u6709\u4EC0\u4E48\u4F5C\u7528\u5462\uFF1F\u4E3A\u5565\u4E00\u5F00\u59CB\u5C31\u8981\u653E\u8FDB\u53BB\uFF1F",paraId:40,tocIndex:3},{value:"org.springframework.context.annotation.internalConfigurationAnnotationProcessor",paraId:41,tocIndex:3},{value:": \u7528\u4E8E\u5904\u7406 ",paraId:41,tocIndex:3},{value:"@Configuration",paraId:41,tocIndex:3},{value:" \u6CE8\u89E3\u7684\u5904\u7406\u5668\u3002\u5F53 Spring \u5BB9\u5668\u626B\u63CF\u5230\u4E00\u4E2A\u7C7B\u4E0A\u6807\u6CE8\u4E86 ",paraId:41,tocIndex:3},{value:"@Configuration",paraId:41,tocIndex:3},{value:" \u6CE8\u89E3\u65F6\uFF0C\u4F1A\u4F7F\u7528\u8FD9\u4E2A\u5904\u7406\u5668\u6765\u5904\u7406\u8BE5\u7C7B\uFF0C\u5C06\u5176\u8BC6\u522B\u4E3A\u914D\u7F6E\u7C7B\uFF0C\u5E76\u6267\u884C\u76F8\u5E94\u7684\u5904\u7406\u903B\u8F91\uFF0C\u4F8B\u5982\u89E3\u6790\u914D\u7F6E\u4FE1\u606F\u3001\u521B\u5EFA bean \u5B9E\u4F8B\u7B49\u3002",paraId:41,tocIndex:3},{value:"\u751F\u6210BeanDefinition\uFF1A",paraId:42,tocIndex:3},{value:" \u901A\u8FC7\u89E3\u6790 ",paraId:42,tocIndex:3},{value:"@Configuration",paraId:42,tocIndex:3},{value:" \u6CE8\u89E3\uFF0C\u8BE5\u5904\u7406\u5668\u4F1A\u751F\u6210\u76F8\u5E94\u7684 BeanDefinition\uFF0C\u5E76\u5C06\u5176\u6CE8\u518C\u5230\u5BB9\u5668\u4E2D\u3002",paraId:42,tocIndex:3},{value:"\u5904\u7406@Bean\u6CE8\u89E3\uFF1A",paraId:43,tocIndex:3},{value:" \u5728 ",paraId:43,tocIndex:3},{value:"@Configuration",paraId:43,tocIndex:3},{value:" \u7C7B\u4E2D\u4F7F\u7528 ",paraId:43,tocIndex:3},{value:"@Bean",paraId:43,tocIndex:3},{value:" \u6CE8\u89E3\u58F0\u660E\u7684\u65B9\u6CD5\uFF0C\u4F1A\u88AB\u8BE5\u5904\u7406\u5668\u8BC6\u522B\u5E76\u5904\u7406\uFF0C\u751F\u6210\u76F8\u5E94\u7684 BeanDefinition\u3002",paraId:43,tocIndex:3},{value:"\u5904\u7406@Import\u6CE8\u89E3\uFF1A",paraId:44,tocIndex:3},{value:" \u5982\u679C ",paraId:44,tocIndex:3},{value:"@Configuration",paraId:44,tocIndex:3},{value:" \u7C7B\u4E2D\u4F7F\u7528\u4E86 ",paraId:44,tocIndex:3},{value:"@Import",paraId:44,tocIndex:3},{value:" \u6CE8\u89E3\u5BFC\u5165\u5176\u4ED6\u914D\u7F6E\u7C7B\uFF0C\u8BE5\u5904\u7406\u5668\u4E5F\u4F1A\u76F8\u5E94\u5730\u5904\u7406\u8FD9\u4E9B\u5BFC\u5165\u64CD\u4F5C",paraId:44,tocIndex:3},{value:"org.springframework.context.annotation.internalAutowiredAnnotationProcessor",paraId:45,tocIndex:3},{value:": \u8FD9\u4E2A\u7C7B\u662F\u7528\u4E8E\u5904\u7406 ",paraId:45,tocIndex:3},{value:"@Autowired",paraId:45,tocIndex:3},{value:" \u6CE8\u89E3\u7684\u5904\u7406\u5668\u3002",paraId:45,tocIndex:3},{value:"@Autowired",paraId:45,tocIndex:3},{value:" \u6CE8\u89E3\u7528\u4E8E\u81EA\u52A8\u88C5\u914D bean\uFF0C\u5F53 Spring \u5BB9\u5668\u626B\u63CF\u5230\u4E00\u4E2A\u7C7B\u4E2D\u7684\u5B57\u6BB5\u3001\u65B9\u6CD5\u6216\u6784\u9020\u51FD\u6570\u4E0A\u6807\u6CE8\u4E86 ",paraId:45,tocIndex:3},{value:"@Autowired",paraId:45,tocIndex:3},{value:" \u6CE8\u89E3\u65F6\uFF0C\u4F1A\u4F7F\u7528\u8FD9\u4E2A\u5904\u7406\u5668\u6765\u5904\u7406\u8BE5\u7C7B\uFF0C\u5C06\u5176\u6807\u8BB0\u4E3A\u9700\u8981\u81EA\u52A8\u88C5\u914D\u7684 bean\u3002",paraId:45,tocIndex:3},{value:"org.springframework.context.annotation.internalRequiredAnnotationProcessor",paraId:46,tocIndex:3},{value:": \u8FD9\u4E2A\u7C7B\u662F\u7528\u4E8E\u5904\u7406 ",paraId:46,tocIndex:3},{value:"@Required",paraId:46,tocIndex:3},{value:" \u6CE8\u89E3\u7684\u5904\u7406\u5668\u3002",paraId:46,tocIndex:3},{value:"@Required",paraId:46,tocIndex:3},{value:" \u6CE8\u89E3\u7528\u4E8E\u6807\u8BB0\u5FC5\u9700\u7684 bean \u5C5E\u6027\uFF0C\u5F53 Spring \u5BB9\u5668\u626B\u63CF\u5230\u4E00\u4E2A\u7C7B\u4E2D\u7684\u5B57\u6BB5\u6216\u65B9\u6CD5\u4E0A\u6807\u6CE8\u4E86 ",paraId:46,tocIndex:3},{value:"@Required",paraId:46,tocIndex:3},{value:" \u6CE8\u89E3\u65F6\uFF0C\u4F1A\u4F7F\u7528\u8FD9\u4E2A\u5904\u7406\u5668\u6765\u5904\u7406\u8BE5\u7C7B\uFF0C\u786E\u4FDD\u76F8\u5E94\u7684\u5C5E\u6027\u88AB\u6B63\u786E\u8BBE\u7F6E\u3002",paraId:46,tocIndex:3},{value:"\u4E5F\u5C31\u662F\u8BF4\uFF0C\u8981\u5148\u628A\u8FD9\u4E9BSpring \u6846\u67B6\u5185\u90E8",paraId:47,tocIndex:3},{value:"\u8D1F\u8D23\u5904\u7406\u5E38\u89C1\u7684\u6CE8\u89E3",paraId:47,tocIndex:3},{value:"\u7684\u6838\u5FC3\u7EC4\u4EF6\u5148\u6CE8\u518C\u8FDB\u53BB\uFF0C\u624D\u80FD\u4E3A\u4E4B\u540E\u5B9E\u73B0",paraId:47,tocIndex:3},{value:"\u81EA\u52A8\u88C5\u914D\uFF0C\u914D\u7F6E\u7C7B\u7684\u89E3\u6790\uFF0C\u4F9D\u8D56\u6CE8\u5165\u548C\u914D\u7F6E\u7BA1\u7406",paraId:47,tocIndex:3},{value:"\u7B49\u529F\u80FD\u3002\u6211\u4E0D\u653E\u8FDB\u53BB\uFF0C\u90A3\u4E4B\u540E\u7684\u5E26\u6CE8\u89E3\u7684\u7C7B\u8FDB\u6765\u6211\u600E\u4E48\u8BC6\u522B\u4ED6\u4EEC\u5462\uFF1F",paraId:47,tocIndex:3},{value:"II",paraId:21},{value:"\u770B\u770B",paraId:48,tocIndex:4},{value:"registerPostProcessor(registry, def, CONFIGURATION_ANNOTATION_PROCESSOR_BEAN_NAME)",paraId:48,tocIndex:4},{value:"\u8FD9\u4E00\u53E5\u7684registerPostProcessor \u65B9\u6CD5",paraId:48,tocIndex:4},{value:`private static BeanDefinitionHolder registerPostProcessor(BeanDefinitionRegistry registry, RootBeanDefinition definition, String beanName) {

	definition.setRole(BeanDefinition.ROLE_INFRASTRUCTURE);
	registry.registerBeanDefinition(beanName, definition);
	return new BeanDefinitionHolder(definition, beanName);
}
`,paraId:49,tocIndex:4},{value:"\u8FD9\u65B9\u6CD5\u4E3A BeanDefinition \u8BBE\u7F6E\u4E86\u4E00\u4E2A ",paraId:50,tocIndex:4},{value:"Role",paraId:50,tocIndex:4},{value:"\uFF0C",paraId:50,tocIndex:4},{value:"ROLE_INFRASTRUCTURE",paraId:50,tocIndex:4},{value:" \u4EE3\u8868\u8FD9\u662F spring \u5185\u90E8\u7684\uFF0C\u5E76\u975E\u7528\u6237\u5B9A\u4E49\u7684",paraId:50,tocIndex:4},{value:"\u7136\u540E\u53C8\u8C03\u7528\u4E86 registerBeanDefinition \u65B9\u6CD5\uFF0C\u518D\u70B9\u8FDB\u53BB\uFF0C\u4F60\u4F1A\u53D1\u73B0\u5B83\u662F\u4E00\u4E2A\u63A5\u53E3\uFF0C\u6CA1\u529E\u6CD5\u76F4\u63A5\u70B9\u8FDB\u53BB\u4E86",paraId:51,tocIndex:4},{value:`public interface BeanDefinitionRegistry extends AliasRegistry {
    void registerBeanDefinition(String var1, BeanDefinition var2) throws BeanDefinitionStoreException;
    }
`,paraId:52,tocIndex:4},{value:"\u9996\u5148\u8981\u77E5\u9053 registry \u5B9E\u73B0\u7C7B\u662F\u4EC0\u4E48\uFF0C\u90A3\u4E48\u5B83\u7684\u5B9E\u73B0\u662F\u4EC0\u4E48\u5462\uFF1F",paraId:53,tocIndex:4},{value:"\u7B54\u6848\u662F ",paraId:54,tocIndex:4},{value:"DefaultListableBeanFactory",paraId:54,tocIndex:4},{value:"DefaultListableBeanFactory\u7684registerBeanDefinition \u6838\u5FC3\u5728\u4E8E\u4E0B\u9762\u4E24\u884C\u4EE3\u7801",paraId:55,tocIndex:4},{value:`//beanDefinitionMap\u662FMap<String, BeanDefinition>\uFF0C
//\u8FD9\u91CC\u5C31\u662F\u628AbeanName\u4F5C\u4E3Akey\uFF0CScopedProxyMode\u4F5C\u4E3Avalue\uFF0C\u63A8\u5230map\u91CC\u9762
this.beanDefinitionMap.put(beanName, beanDefinition);
 
//beanDefinitionNames\u5C31\u662F\u4E00\u4E2AList<String>,\u8FD9\u91CC\u5C31\u662F\u628AbeanName\u653E\u5230List\u4E2D\u53BB
this.beanDefinitionNames.add(beanName);
`,paraId:56,tocIndex:4},{value:"\u4ECE\u8FD9\u91CC\u53EF\u4EE5\u770B\u51FA DefaultListableBeanFactory \u5C31\u662F\u6211\u4EEC\u6240\u8BF4\u7684\u5BB9\u5668\u4E86\uFF0C",paraId:57,tocIndex:4},{value:"\u91CC\u9762\u653E\u7740 beanDefinitionMap\uFF0CbeanDefinitionNames",paraId:57,tocIndex:4},{value:"beanDefinitionMap",paraId:58,tocIndex:4},{value:" \u662F\u4E00\u4E2A hashMap\uFF0CbeanName \u4F5C\u4E3A Key,beanDefinition \u4F5C\u4E3A Value",paraId:58,tocIndex:4},{value:"beanDefinitionNames",paraId:59,tocIndex:4},{value:" \u662F\u4E00\u4E2AList\u96C6\u5408\uFF0C\u91CC\u9762\u5B58\u653E\u4E86 beanName",paraId:59,tocIndex:4},{value:"\u8FD9\u91CC\u4EC5\u4EC5\u662F\u6CE8\u518C\u4E86\u4E00\u4E9B\u6838\u5FC3\u914D\u7F6E\u7C7B\uFF0C\u53EF\u4EE5\u7B80\u5355\u7684\u7406\u89E3\u4E3A",paraId:60,tocIndex:4},{value:"\u628A\u4E00\u4E9B\u539F\u6599\u653E\u5165\u5DE5\u5382\uFF0C\u5DE5\u5382\u8FD8\u6CA1\u6709\u771F\u6B63\u7684\u53BB\u751F\u4EA7\uFF0C\u4F46\u662F\u5DE5\u5382\u5DF2\u7ECF\u51C6\u5907\u597D\u53BB\u751F\u4EA7\u4E86",paraId:60,tocIndex:4},{value:"ConfigurationClassPostProcessor",paraId:61,tocIndex:4},{value:"\u4E5F\u5C31\u662FinternalConfigurationAnnotationProcessor",paraId:61,tocIndex:4},{value:" \u5B9E\u73B0 ",paraId:61,tocIndex:4},{value:"BeanDefinitionRegistryPostProcessor",paraId:61,tocIndex:4},{value:" \u63A5\u53E3\uFF0C",paraId:61,tocIndex:4},{value:"BeanDefinitionRegistryPostProcessor",paraId:61,tocIndex:4},{value:" \u63A5\u53E3\u53C8\u6269\u5C55\u4E86 ",paraId:61,tocIndex:4},{value:"BeanFactoryPostProcessor",paraId:61,tocIndex:4},{value:" \u63A5\u53E3",paraId:61,tocIndex:4},{value:"BeanFactoryPostProcessor \u662F Spring \u7684\u6269\u5C55\u70B9\u4E4B\u4E00\uFF0CConfigurationClassPostProcessor \u662F Spring \u6781\u4E3A\u91CD\u8981\u7684\u4E00\u4E2A\u7C7B\uFF01",paraId:62,tocIndex:4},{value:"\u9664\u4E86\u6CE8\u518C\u4E86 ConfigurationClassPostProcessor\uFF0C\u8FD8\u6CE8\u518C\u4E86\u5176\u4ED6 Bean\uFF0C\u5176\u4ED6 Bean \u4E5F\u90FD\u5B9E\u73B0\u4E86\u5176\u4ED6\u63A5\u53E3\uFF0C\u6BD4\u5982 BeanPostProcessor \u7B49\u3002",paraId:63,tocIndex:4},{value:"BeanPostProcessor \u63A5\u53E3\u4E5F\u662F Spring \u7684\u6269\u5C55\u70B9\u4E4B\u4E00\u3002",paraId:64,tocIndex:4},{value:"\u81F3\u6B64\uFF0C\u5B9E\u4F8B\u5316 AnnotatedBeanDefinitionReader reader \u5206\u6790\u5B8C\u6BD5\u3002",paraId:65,tocIndex:4},{value:"\u521B\u5EFA",paraId:21},{value:"BeanDefinition \u626B\u63CF\u5668\uFF1AClassPathBeanDefinitionScanner\uFF08\u7565\uFF09",paraId:21},{value:"\u7531\u4E8E\u5E38\u89C4\u4F7F\u7528\u65B9\u5F0F\u662F",paraId:66,tocIndex:5},{value:"\u4E0D\u4F1A\u7528\u5230 AnnotationConfigApplicationContext \u91CC\u9762\u7684 scanner \u7684",paraId:66,tocIndex:5},{value:"\uFF0C\u4F1A\u65B0\u5EFA\u4E00\u4E2A\uFF0C\u8FD9\u91CC\u7684 scanner \u4EC5\u4EC5\u662F\u4E3A\u4E86\u7A0B\u5E8F\u5458\u53EF\u4EE5\u624B\u52A8\u8C03\u7528 AnnotationConfigApplicationContext \u5BF9\u8C61\u7684 scan \u65B9\u6CD5\uFF0C\u5355\u72EC\u626B\u63CF\u67D0\u4E2A\u5305",paraId:66,tocIndex:5},{value:"\u6240\u4EE5\u8FD9\u91CC\u5C31\u4E0D\u770B scanner \u662F\u5982\u4F55\u88AB\u5B9E\u4F8B\u5316\u7684\u4E86\u3002",paraId:67,tocIndex:5},{value:"\u628A\u76EE\u5149\u56DE\u5230\u6700\u5F00\u59CB\uFF0C\u518D\u5206\u6790\u7B2C\u4E8C\u884C\u4EE3\u7801\uFF1A",paraId:68,tocIndex:6},{value:"\u8FD9\u91CC\u662F\u5C06\u76EE\u6807\u7C7B\u6CE8\u518C\u4E3ABeanDefinition",paraId:69,tocIndex:6},{value:`register(annotatedClasses);
`,paraId:70,tocIndex:6},{value:`public void register(Class<?>... annotatedClasses) {
    Assert.notEmpty(annotatedClasses, "At least one annotated class must be specified");
    this.reader.register(annotatedClasses);
}
`,paraId:71,tocIndex:6},{value:`public void register(Class<?>... annotatedClasses) {
    Class[] var2 = annotatedClasses;
    int var3 = annotatedClasses.length;
    for(int var4 = 0; var4 < var3; ++var4) {
        Class<?> annotatedClass = var2[var4];
        this.registerBean(annotatedClass);
    }
}
`,paraId:72,tocIndex:6},{value:"\u8FD9\u91CC\u4F20\u8FDB\u53BB\u7684\u662F\u4E00\u4E2A\u6570\u7EC4\uFF0C",paraId:73,tocIndex:6},{value:"\u6700\u7EC8\u4F1A\u5FAA\u73AF\u8C03\u7528\u5982\u4E0B\u65B9\u6CD5\uFF1A",paraId:73,tocIndex:6},{value:`    <T> void doRegisterBean(Class<T> annotatedClass, @Nullable Supplier<T> instanceSupplier, @Nullable String name,
            @Nullable Class<? extends Annotation>[] qualifiers, BeanDefinitionCustomizer... definitionCustomizers) {

        AnnotatedGenericBeanDefinition abd = new AnnotatedGenericBeanDefinition(annotatedClass);
 
        if (this.conditionEvaluator.shouldSkip(abd.getMetadata())) {
            return;
        }
        abd.setInstanceSupplier(instanceSupplier);
 
        ScopeMetadata scopeMetadata = this.scopeMetadataResolver.resolveScopeMetadata(abd);
        abd.setScope(scopeMetadata.getScopeName());
 
        String beanName = (name != null ? name : this.beanNameGenerator.generateBeanName(abd, this.registry));
 
        AnnotationConfigUtils.processCommonDefinitionAnnotations(abd);

        if (qualifiers != null) {
            //\u53EF\u4EE5\u4F20\u5165qualifier\u6570\u7EC4\uFF0C\u6240\u4EE5\u9700\u8981\u5FAA\u73AF\u5904\u7406
            for (Class<? extends Annotation> qualifier : qualifiers) {
                //Primary\u6CE8\u89E3\u4F18\u5148
                if (Primary.class == qualifier) {
                    abd.setPrimary(true);
                }
                //Lazy\u6CE8\u89E3
                else if (Lazy.class == qualifier) {
                    abd.setLazyInit(true);
                }
                //\u5176\u4ED6\uFF0CAnnotatedGenericBeanDefinition\u6709\u4E2AMap<String,AutowireCandidateQualifier>\u5C5E\u6027\uFF0C\u76F4\u63A5push\u8FDB\u53BB
                else {
                    abd.addQualifier(new AutowireCandidateQualifier(qualifier));
                }
            }
        }
 
        for (BeanDefinitionCustomizer customizer : definitionCustomizers) {
            customizer.customize(abd);
        }
 
        BeanDefinitionHolder definitionHolder = new BeanDefinitionHolder(abd, beanName);
 
        definitionHolder = AnnotationConfigUtils.applyScopedProxyMode(scopeMetadata, definitionHolder, this.registry);
 
        //DefaultListableBeanFactory\u7EF4\u62A4\u7740\u4E00\u7CFB\u5217\u4FE1\u606F\uFF0C\u6BD4\u5982beanDefinitionNames\uFF0CbeanDefinitionMap
        //beanDefinitionNames\u662F\u4E00\u4E2AList<String>,\u7528\u6765\u4FDD\u5B58beanName
        //beanDefinitionMap\u662F\u4E00\u4E2AMap,\u7528\u6765\u4FDD\u5B58beanName\u548CbeanDefinition
        BeanDefinitionReaderUtils.registerBeanDefinition(definitionHolder, this.registry);
    }
`,paraId:74,tocIndex:6},{value:"\u5148\u770B",paraId:75,tocIndex:6},{value:`AnnotatedGenericBeanDefinition abd = new AnnotatedGenericBeanDefinition(annotatedClass);
`,paraId:76,tocIndex:6},{value:"AnnotatedGenericBeanDefinition\u53EF\u4EE5\u7406\u89E3\u4E3A\u4E00\u79CD\u6570\u636E\u7ED3\u6784\uFF0C\u662F\u7528\u6765\u63CF\u8FF0Bean\u7684",paraId:77,tocIndex:6},{value:"\u8FD9\u91CC\u7684\u4F5C\u7528\u5C31\u662F\u628A\u4F20\u5165\u7684\u6807\u8BB0\u4E86\u6CE8\u89E3\u7684\u7C7B\u8F6C\u4E3AAnnotatedGenericBeanDefinition\u6570\u636E\u7ED3\u6784\uFF0C\u91CC\u9762\u6709\u4E00\u4E2AgetMetadata\u65B9\u6CD5\uFF0C\u53EF\u4EE5\u62FF\u5230\u7C7B\u4E0A\u7684\u6CE8\u89E3",paraId:78,tocIndex:6},{value:`//\u62FF\u5230\u76EE\u6807\u7C7B\u4E0A\u7684\u6CE8\u89E3
public final AnnotationMetadata getMetadata() {
    return this.metadata;
}
`,paraId:79,tocIndex:6},{value:"\u200B	\u901A\u8FC7 AnnotatedGenericBeanDefinition \u7684\u6784\u9020\u65B9\u6CD5\uFF0C\u83B7\u5F97\u914D\u7F6E\u7C7B\u7684 BeanDefinition",paraId:80,tocIndex:6},{value:"\u200B	\u8FD9\u91CC\u4E0E\u6CE8\u518C ConfigurationClassPostProcessor \u7C7B\u7684\u65F6\u5019\uFF0C\u4E5F\u662F\u901A\u8FC7\u6784\u9020\u65B9\u6CD5\u53BB\u83B7\u5F97 BeanDefinition \u7684\u7C7B\u4F3C\uFF0C\u53EA\u4E0D\u8FC7\u5F53\u65F6\u662F\u901A\u8FC7 RootBeanDefinition \u53BB\u83B7\u5F97\uFF0C\u73B0\u5728\u662F\u901A\u8FC7 AnnotatedGenericBeanDefinition \u53BB\u83B7\u5F97\u3002",paraId:81,tocIndex:6},{value:"\u4E24\u79CD\u4E0D\u540C\u7684BeanDefinition\u83B7\u53D6",paraId:81,tocIndex:6},{value:"\u5224\u65AD\u662F\u5426\u9700\u8981\u8DF3\u8FC7\u6CE8\u89E3",paraId:82,tocIndex:6},{value:`if (this.conditionEvaluator.shouldSkip(abd.getMetadata()))
`,paraId:83,tocIndex:6},{value:"\u5224\u65AD\u662F\u5426\u9700\u8981\u8DF3\u8FC7\u6CE8\u89E3\uFF0Cspring\u4E2D\u6709\u4E00\u4E2A**@Condition**\u6CE8\u89E3\uFF0C\u5F53\u4E0D\u6EE1\u8DB3\u6761\u4EF6\uFF0C\u8FD9\u4E2Abean\u5C31\u4E0D\u4F1A\u88AB\u89E3\u6790",paraId:84,tocIndex:6},{value:"\u89E3\u6790\u4F5C\u7528\u57DF",paraId:85,tocIndex:6},{value:`ScopeMetadata scopeMetadata = this.scopeMetadataResolver.resolveScopeMetadata(abd);
abd.setScope(scopeMetadata.getScopeName());
`,paraId:86,tocIndex:6},{value:"\u5982\u679C\u6CA1\u6709\u8BBE\u7F6E\u7684\u8BDD\uFF0C\u9ED8\u8BA4\u4E3A\u5355\u4F8B",paraId:87,tocIndex:6},{value:"\u83B7\u53D6beanName",paraId:88,tocIndex:6},{value:` String beanName = (name != null ? name : this.beanNameGenerator.generateBeanName(abd, this.registry));
`,paraId:89,tocIndex:6},{value:"\u89E3\u6790\u901A\u7528\u6CE8\u89E3",paraId:90,tocIndex:6},{value:`AnnotationConfigUtils.processCommonDefinitionAnnotations(abd);
`,paraId:91,tocIndex:6},{value:"\u89E3\u6790\u901A\u7528\u6CE8\u89E3\uFF0C\u586B\u5145\u5230AnnotatedGenericBeanDefinition\uFF0C\u89E3\u6790\u7684\u6CE8\u89E3\u4E3A",paraId:92,tocIndex:6},{value:"Lazy\uFF0CPrimary\uFF0CDependsOn\uFF0CRole\uFF0CDescription",paraId:92,tocIndex:6},{value:"\u9650\u5B9A\u7B26\u5904\u7406",paraId:93,tocIndex:6},{value:`if (qualifiers != null) {
    Class[] var7 = qualifiers;
    int var8 = qualifiers.length;

    for(int var9 = 0; var9 < var8; ++var9) {
        Class<? extends Annotation> qualifier = var7[var9];
        if (Primary.class == qualifier) {
            abd.setPrimary(true);
        } else if (Lazy.class == qualifier) {
            abd.setLazyInit(true);
        } else {
            abd.addQualifier(new AutowireCandidateQualifier(qualifier));
        }
    }
}
`,paraId:94,tocIndex:6},{value:"\u4E0D\u662F\u7279\u6307 @Qualifier \u6CE8\u89E3\uFF0C\u4E5F\u6709\u53EF\u80FD\u662F Primary\uFF0C\u6216\u8005\u662F Lazy\uFF0C\u6216\u8005\u662F\u5176\u4ED6\u3002",paraId:95,tocIndex:6},{value:"\u628A ",paraId:96,tocIndex:6},{value:"AnnotatedGenericBeanDefinition \u6570\u636E\u7ED3\u6784\u548C beanName \u5C01\u88C5\u5230\u4E00\u4E2A\u5BF9\u8C61\u4E2D",paraId:96,tocIndex:6},{value:"\uFF08\u8FD9\u4E2A\u4E0D\u662F\u5F88\u91CD\u8981\uFF0C\u53EF\u4EE5\u7B80\u5355\u7684\u7406\u89E3\u4E3A\u65B9\u4FBF\u4F20\u53C2\uFF09",paraId:96,tocIndex:6},{value:`BeanDefinitionHolder definitionHolder = new BeanDefinitionHolder(abd, beanName);
`,paraId:97,tocIndex:6},{value:" definitionHolder = AnnotationConfigUtils.applyScopedProxyMode(scopeMetadata, definitionHolder, this.registry);",paraId:98,tocIndex:6},{value:"\u8FD9\u4E00\u53E5\u7684\u4F5C\u7528\u662F\u6839\u636E\u7ED9\u5B9A\u7684\u4F5C\u7528\u57DF\u5143\u6570\u636E\uFF08",paraId:99,tocIndex:6},{value:"scopeMetadata",paraId:99,tocIndex:6},{value:"\uFF09\uFF0C\u5C06 bean \u7684\u5B9A\u4E49\uFF08",paraId:99,tocIndex:6},{value:"definitionHolder",paraId:99,tocIndex:6},{value:"\uFF09\u5E94\u7528\u6307\u5B9A\u7684\u4EE3\u7406\u6A21\u5F0F",paraId:99,tocIndex:6},{value:"\u6B63\u5F0F\u6CE8\u518C",paraId:100,tocIndex:6},{value:"\u6700\u7EC8\u4F1A\u8C03\u7528 DefaultListableBeanFactory \u4E2D\u7684 registerBeanDefinition \u65B9\u6CD5\u62FF\u5230definitionHolder ",paraId:101,tocIndex:6},{value:"Bean\u5B9A\u4E49",paraId:101,tocIndex:6},{value:"\u53BB\u6CE8\u518C",paraId:101,tocIndex:6},{value:`BeanDefinitionReaderUtils.registerBeanDefinition(definitionHolder, this.registry);
`,paraId:102,tocIndex:6},{value:`    public static void registerBeanDefinition(BeanDefinitionHolder definitionHolder, BeanDefinitionRegistry registry)throws BeanDefinitionStoreException {
 
        //\u83B7\u53D6beanName
        // Register bean definition under primary name.
        String beanName = definitionHolder.getBeanName();
 
        //\u6CE8\u518Cbean
        registry.registerBeanDefinition(beanName, definitionHolder.getBeanDefinition());
 
        //Spring\u652F\u6301\u522B\u540D
        String[] aliases = definitionHolder.getAliases();
        if (aliases != null) {
            for (String alias : aliases) {
                registry.registerAlias(beanName, alias);
            }
        }
    }
`,paraId:103,tocIndex:7},{value:"**\u5728\u4E0A\u9762\u6CE8\u518C Spring \u5185\u7F6E\u7684 Bean \u7684\u65F6\u5019\uFF0C\u5DF2\u7ECF\u89E3\u6790\u8FC7\u8FD9\u4E2A\u65B9\u6CD5\u4E86\uFF0C**\u8FD9\u91CC\u5C31\u4E0D\u91CD\u590D\u4E86",paraId:104,tocIndex:7},{value:"\u6B64\u65F6\uFF0C\u8BA9\u6211\u4EEC\u518D\u89C2\u5BDF\u4E0B beanDefinitionMap beanDefinitionNames \u4E24\u4E2A\u53D8\u91CF\uFF0C\u9664\u4E86 Spring \u5185\u7F6E\u7684 Bean\uFF0C\u8FD8\u6709\u6211\u4EEC\u4F20\u8FDB\u6765\u7684 Bean\uFF0C\u8FD9\u91CC\u7684 Bean \u5F53\u7136\u5C31\u662F\u6211\u4EEC\u7684\u914D\u7F6E\u7C7B\u4E86\uFF1A",paraId:105,tocIndex:7},{value:"\u5230\u8FD9\u91CC\u6CE8\u518C\u914D\u7F6E\u7C7BMainConfig.class\u5B8C\u6210\u3002",paraId:106,tocIndex:7},{value:"4.refresh()",paraId:21},{value:"\u6700\u6700\u6700\u6838\u5FC3\u4E00\u6B65",paraId:21},{value:"\u5176\u5B9E\u5230\u8FD9\u91CC\uFF0CSpring \u8FD8\u6CA1\u6709\u8FDB\u884C\u626B\u63CF\uFF0C\u53EA\u662F\u5B9E\u4F8B\u5316\u4E86\u4E00\u4E2A\u5DE5\u5382\uFF0C\u6CE8\u518C\u4E86\u4E00\u4E9B\u5185\u7F6E\u7684 Bean \u548C\u6211\u4EEC\u4F20\u8FDB\u53BB\u7684\u914D\u7F6E\u7C7B\uFF0C\u771F\u6B63\u7684\u5927\u5934\u662F\u5728\u7B2C\u4E09\u884C\u4EE3\u7801\uFF1A",paraId:107,tocIndex:8},{value:`refresh();
`,paraId:108,tocIndex:8},{value:"\u8FD9\u4E2A\u65B9\u6CD5\u505A\u4E86\u5F88\u591A\u4E8B\u60C5\uFF0C\u8BA9\u6211\u4EEC\u70B9\u5F00\u8FD9\u4E2A\u65B9\u6CD5\uFF1A",paraId:109,tocIndex:8},{value:`public void refresh() throws BeansException, IllegalStateException {
    synchronized (this.startupShutdownMonitor) {
        //\u5237\u65B0\u9884\u5904\u7406\uFF0C\u548C\u4E3B\u6D41\u7A0B\u5173\u7CFB\u4E0D\u5927\uFF0C\u5C31\u662F\u4FDD\u5B58\u4E86\u5BB9\u5668\u7684\u542F\u52A8\u65F6\u95F4\uFF0C\u542F\u52A8\u6807\u5FD7\u7B49
        prepareRefresh();

        //\u548C\u4E3B\u6D41\u7A0B\u5173\u7CFB\u4E5F\u4E0D\u5927\uFF0C\u6700\u7EC8\u83B7\u5F97\u4E86DefaultListableBeanFactory\uFF0C
        // DefaultListableBeanFactory\u5B9E\u73B0\u4E86ConfigurableListableBeanFactory
        ConfigurableListableBeanFactory beanFactory = obtainFreshBeanFactory();

        //\u8FD8\u662F\u4E00\u4E9B\u51C6\u5907\u5DE5\u4F5C\uFF0C\u6DFB\u52A0\u4E86\u4E24\u4E2A\u540E\u7F6E\u5904\u7406\u5668\uFF1AApplicationContextAwareProcessor\uFF0CApplicationListenerDetector
        //\u8FD8\u8BBE\u7F6E\u4E86 \u5FFD\u7565\u81EA\u52A8\u88C5\u914D \u548C \u5141\u8BB8\u81EA\u52A8\u88C5\u914D \u7684\u63A5\u53E3,\u5982\u679C\u4E0D\u5B58\u5728\u67D0\u4E2Abean\u7684\u65F6\u5019\uFF0Cspring\u5C31\u81EA\u52A8\u6CE8\u518Csingleton bean
        //\u8FD8\u8BBE\u7F6E\u4E86bean\u8868\u8FBE\u5F0F\u89E3\u6790\u5668 \u7B49
        prepareBeanFactory(beanFactory);

        try {
            // Allows post-processing of the bean factory in context subclasses.
            //\u8FD9\u662F\u4E00\u4E2A\u7A7A\u65B9\u6CD5
            postProcessBeanFactory(beanFactory);

            // Invoke factory processors registered as beans in the context.
            //\u6267\u884C\u81EA\u5B9A\u4E49\u7684BeanFactoryProcessor\u548C\u5185\u7F6E\u7684BeanFactoryProcessor
            invokeBeanFactoryPostProcessors(beanFactory);

            // Register bean processors that intercept bean creation.
            // \u6CE8\u518CBeanPostProcessor
            registerBeanPostProcessors(beanFactory);

            // Initialize message source for this context.
            initMessageSource();

            // Initialize event multicaster for this context.
            initApplicationEventMulticaster();

            // Initialize other special beans in specific context subclasses.
            // \u7A7A\u65B9\u6CD5
            onRefresh();

            // Check for listener beans and register them.
            registerListeners();

            // Instantiate all remaining (non-lazy-init) singletons.
            finishBeanFactoryInitialization(beanFactory);

            // Last step: publish corresponding event.
            finishRefresh();
        }

        catch (BeansException ex) {
            if (logger.isWarnEnabled()) {
                logger.warn("Exception encountered during context initialization - " +
                            "cancelling refresh attempt: " + ex);
            }

            destroyBeans();

            cancelRefresh(ex);

            throw ex;
        }

        finally {
            resetCommonCaches();
        }
    }
}
`,paraId:110,tocIndex:8},{value:"1.prepareRefresh()",paraId:21},{value:"\u4ECE\u547D\u540D\u6765\u770B\uFF0C\u5C31\u77E5\u9053\u8FD9\u4E2A\u65B9\u6CD5\u4E3B\u8981\u505A\u4E86\u4E00\u4E9B\u5237\u65B0\u524D\u7684\u51C6\u5907\u5DE5\u4F5C\uFF0C\u548C\u4E3B\u6D41\u7A0B\u5173\u7CFB\u4E0D\u5927\uFF0C\u4E3B\u8981\u662F\u4FDD\u5B58\u4E86\u5BB9\u5668\u7684\u542F\u52A8\u65F6\u95F4\uFF0C\u542F\u52A8\u6807\u5FD7\u7B49\u3002",paraId:111,tocIndex:9},{value:"ConfigurableListableBeanFactory beanFactory = obtainFreshBeanFactory()",paraId:21},{value:"\u8FD9\u4E2A\u65B9\u6CD5\u548C\u4E3B\u6D41\u7A0B\u5173\u7CFB\u4E5F\u4E0D\u662F\u5F88\u5927\uFF0C\u53EF\u4EE5\u7B80\u5355\u7684\u8BA4\u4E3A\uFF0C\u5C31\u662F\u628A beanFactory \u53D6\u51FA\u6765\u800C\u5DF2\u3002XML \u6A21\u5F0F\u4E0B\u4F1A\u5728\u8FD9\u91CC\u8BFB\u53D6 BeanDefinition",paraId:112,tocIndex:10},{value:"3.prepareBeanFactory",paraId:21},{value:`prepareBeanFactory(beanFactory);
`,paraId:113,tocIndex:11},{value:"\u8FD8\u662F\u4E00\u4E9B\u51C6\u5907\u5DE5\u4F5C\uFF0C\u6DFB\u52A0\u4E86\u4E24\u4E2A\u540E\u7F6E\u5904\u7406\u5668\uFF1AApplicationContextAwareProcessor\uFF0CApplicationListenerDetector",paraId:114,tocIndex:11},{value:"\u8FD8\u8BBE\u7F6E\u4E86 \u5FFD\u7565\u81EA\u52A8\u88C5\u914D \u548C \u5141\u8BB8\u81EA\u52A8\u88C5\u914D \u7684\u63A5\u53E3\uFF0C\u5982\u679C\u4E0D\u5B58\u5728\u67D0\u4E2Abean\u7684\u65F6\u5019\uFF0Cspring\u5C31\u81EA\u52A8\u6CE8\u518Csingleton bean",paraId:115,tocIndex:11},{value:"\u8FD8\u8BBE\u7F6E\u4E86bean\u8868\u8FBE\u5F0F\u89E3\u6790\u5668 \u7B49",paraId:116,tocIndex:11},{value:"\u70B9\u51FB\u8FDB\u5165",paraId:117,tocIndex:11},{value:`protected void prepareBeanFactory(ConfigurableListableBeanFactory beanFactory) {
    //\u8BBE\u7F6E\u7C7B\u52A0\u8F7D\u5668
    beanFactory.setBeanClassLoader(getClassLoader());

    //\u8BBE\u7F6Ebean\u8868\u8FBE\u5F0F\u89E3\u6790\u5668
    beanFactory.setBeanExpressionResolver(new StandardBeanExpressionResolver(beanFactory.getBeanClassLoader()));

    //\u5C5E\u6027\u7F16\u8F91\u5668\u652F\u6301
    beanFactory.addPropertyEditorRegistrar(new ResourceEditorRegistrar(this, getEnvironment()));

    //\u6DFB\u52A0\u4E00\u4E2A\u540E\u7F6E\u5904\u7406\u5668\uFF1AApplicationContextAwareProcessor\uFF0C\u6B64\u540E\u7F6E\u5904\u7406\u5904\u7406\u5668\u5B9E\u73B0\u4E86BeanPostProcessor\u63A5\u53E3
    beanFactory.addBeanPostProcessor(new ApplicationContextAwareProcessor(this));

    //\u4EE5\u4E0B\u63A5\u53E3\uFF0C\u5FFD\u7565\u81EA\u52A8\u88C5\u914D
    beanFactory.ignoreDependencyInterface(EnvironmentAware.class);
    beanFactory.ignoreDependencyInterface(EmbeddedValueResolverAware.class);
    beanFactory.ignoreDependencyInterface(ResourceLoaderAware.class);
    beanFactory.ignoreDependencyInterface(ApplicationEventPublisherAware.class);
    beanFactory.ignoreDependencyInterface(MessageSourceAware.class);
    beanFactory.ignoreDependencyInterface(ApplicationContextAware.class);

    //\u4EE5\u4E0B\u63A5\u53E3\uFF0C\u5141\u8BB8\u81EA\u52A8\u88C5\u914D,\u7B2C\u4E00\u4E2A\u53C2\u6570\u662F\u81EA\u52A8\u88C5\u914D\u7684\u7C7B\u578B\uFF0C\uFF0C\u7B2C\u4E8C\u4E2A\u5B57\u6BB5\u662F\u81EA\u52A8\u88C5\u914D\u7684\u503C
    beanFactory.registerResolvableDependency(BeanFactory.class, beanFactory);
    beanFactory.registerResolvableDependency(ResourceLoader.class, this);
    beanFactory.registerResolvableDependency(ApplicationEventPublisher.class, this);
    beanFactory.registerResolvableDependency(ApplicationContext.class, this);

    //\u6DFB\u52A0\u4E00\u4E2A\u540E\u7F6E\u5904\u7406\u5668\uFF1AApplicationListenerDetector\uFF0C\u6B64\u540E\u7F6E\u5904\u7406\u5668\u5B9E\u73B0\u4E86BeanPostProcessor\u63A5\u53E3
    beanFactory.addBeanPostProcessor(new ApplicationListenerDetector(this));
    if (beanFactory.containsBean(LOAD_TIME_WEAVER_BEAN_NAME)) {
        beanFactory.addBeanPostProcessor(new LoadTimeWeaverAwareProcessor(beanFactory));
        beanFactory.setTempClassLoader(new ContextTypeMatchClassLoader(beanFactory.getBeanClassLoader()));
    }

    //\u5982\u679C\u6CA1\u6709\u6CE8\u518C\u8FC7bean\u540D\u79F0\u4E3AXXX\uFF0Cspring\u5C31\u81EA\u5DF1\u521B\u5EFA\u4E00\u4E2A\u540D\u79F0\u4E3AXXX\u7684singleton bean
    if (!beanFactory.containsLocalBean(ENVIRONMENT_BEAN_NAME)) {
        beanFactory.registerSingleton(ENVIRONMENT_BEAN_NAME, getEnvironment());
    }
    if (!beanFactory.containsLocalBean(SYSTEM_PROPERTIES_BEAN_NAME)) {
        beanFactory.registerSingleton(SYSTEM_PROPERTIES_BEAN_NAME, getEnvironment().getSystemProperties());
    }
    if (!beanFactory.containsLocalBean(SYSTEM_ENVIRONMENT_BEAN_NAME)) {
        beanFactory.registerSingleton(SYSTEM_ENVIRONMENT_BEAN_NAME, getEnvironment().getSystemEnvironment());
    }
}
`,paraId:118,tocIndex:11},{value:"\u4E3B\u8981\u505A\u4E86\u5982\u4E0B\u7684\u64CD\u4F5C\uFF1A",paraId:119,tocIndex:11},{value:"\u8BBE\u7F6E\u4E86\u4E00\u4E2A\u7C7B\u52A0\u8F7D\u5668",paraId:120,tocIndex:11},{value:`beanFactory.setBeanClassLoader(getClassLoader());
`,paraId:121,tocIndex:11},{value:"\u8BBE\u7F6E\u4E86 bean \u8868\u8FBE\u5F0F\u89E3\u6790\u5668",paraId:122,tocIndex:11},{value:"\u6DFB\u52A0\u4E86\u5C5E\u6027\u7F16\u8F91\u5668\u7684\u652F\u6301",paraId:123,tocIndex:11},{value:"\u6DFB\u52A0\u4E86\u4E00\u4E2A\u540E\u7F6E\u5904\u7406\u5668\uFF1AApplicationContextAwareProcessor\uFF0C\u6B64\u540E\u7F6E\u5904\u7406\u5668\u5B9E\u73B0\u4E86 BeanPostProcessor \u63A5\u53E3",paraId:124,tocIndex:11},{value:`beanFactory.addBeanPostProcessor(new ApplicationContextAwareProcessor(this));
`,paraId:125,tocIndex:11},{value:"\u8BBE\u7F6E\u4E86\u4E00\u4E9B\u5FFD\u7565\u81EA\u52A8\u88C5\u914D\u7684\u63A5\u53E3",paraId:126,tocIndex:11},{value:"\u8BBE\u7F6E\u4E86\u4E00\u4E9B\u5141\u8BB8\u81EA\u52A8\u88C5\u914D\u7684\u63A5\u53E3\uFF0C\u5E76\u4E14\u8FDB\u884C\u4E86\u8D4B\u503C\u64CD\u4F5C",paraId:127,tocIndex:11},{value:"\u81EA\u52A8\u88C5\u914D\u662F\u6307 Spring \u5BB9\u5668\u5728\u521D\u59CB\u5316 Bean \u7684\u65F6\u5019\uFF0C\u81EA\u52A8\u5C06\u7B26\u5408\u6761\u4EF6\u7684 Bean \u6CE8\u5165\u5230\u76EE\u6807 Bean \u4E2D\uFF0C\u800C\u65E0\u9700\u624B\u52A8\u914D\u7F6E",paraId:128,tocIndex:11},{value:"\u5728\u5BB9\u5668\u4E2D\u8FD8\u6CA1\u6709 XX \u7684 bean \u7684\u65F6\u5019\uFF0C\u5E2E\u6211\u4EEC\u6CE8\u518C beanName \u4E3A XX \u7684 singleton bean",paraId:129,tocIndex:11},{value:"ENVIRONMENT_BEAN_NAME\uFF1A",paraId:130,tocIndex:11},{value:" \u8FD9\u662F\u4E00\u4E2A\u5E38\u91CF\uFF0C\u8868\u793A\u6CE8\u518C\u7684 Bean \u7684\u540D\u79F0\u4E3A ",paraId:130,tocIndex:11},{value:'"environment"',paraId:130,tocIndex:11},{value:"\uFF0C\u7528\u4E8E\u5B58\u653E ",paraId:130,tocIndex:11},{value:"Spring \u5E94\u7528\u7A0B\u5E8F\u7684\u73AF\u5883\u76F8\u5173\u4FE1\u606F",paraId:130,tocIndex:11},{value:"\u3002\u5728\u6CE8\u518C\u4E4B\u524D\uFF0C\u9996\u5148\u901A\u8FC7 ",paraId:130,tocIndex:11},{value:"containsLocalBean",paraId:130,tocIndex:11},{value:" \u65B9\u6CD5\u68C0\u67E5\u5BB9\u5668\u4E2D\u662F\u5426\u5DF2\u7ECF\u5B58\u5728\u540D\u4E3A ",paraId:130,tocIndex:11},{value:'"environment"',paraId:130,tocIndex:11},{value:" \u7684 Bean\uFF0C\u5982\u679C\u4E0D\u5B58\u5728\uFF0C\u5219\u8C03\u7528 ",paraId:130,tocIndex:11},{value:"getEnvironment()",paraId:130,tocIndex:11},{value:" \u65B9\u6CD5\u83B7\u53D6\u73AF\u5883\u5BF9\u8C61\uFF0C\u5E76\u4F7F\u7528 ",paraId:130,tocIndex:11},{value:"registerSingleton",paraId:130,tocIndex:11},{value:" \u65B9\u6CD5\u5C06\u5176\u6CE8\u518C\u4E3A\u5355\u4F8B Bean\u3002",paraId:130,tocIndex:11},{value:"SYSTEM_PROPERTIES_BEAN_NAME\uFF1A",paraId:130,tocIndex:11},{value:" \u540C\u6837\u662F\u4E00\u4E2A\u5E38\u91CF\uFF0C\u8868\u793A\u6CE8\u518C\u7684 Bean \u7684\u540D\u79F0\u4E3A ",paraId:130,tocIndex:11},{value:'"systemProperties"',paraId:130,tocIndex:11},{value:"\uFF0C\u7528\u4E8E\u5B58\u653E\u7CFB\u7EDF\u5C5E\u6027\u3002\u901A\u8FC7 ",paraId:130,tocIndex:11},{value:"getEnvironment().getSystemProperties()",paraId:130,tocIndex:11},{value:" \u65B9\u6CD5\u83B7\u53D6",paraId:130,tocIndex:11},{value:"\u7CFB\u7EDF\u5C5E\u6027\u5BF9\u8C61",paraId:130,tocIndex:11},{value:"\uFF0C\u5E76\u4F7F\u7528 ",paraId:130,tocIndex:11},{value:"registerSingleton",paraId:130,tocIndex:11},{value:" \u65B9\u6CD5\u5C06\u5176\u6CE8\u518C\u4E3A\u5355\u4F8B Bean\u3002",paraId:130,tocIndex:11},{value:"SYSTEM_ENVIRONMENT_BEAN_NAME\uFF1A",paraId:130,tocIndex:11},{value:" \u540C\u6837\u662F\u4E00\u4E2A\u5E38\u91CF\uFF0C\u8868\u793A\u6CE8\u518C\u7684 Bean \u7684\u540D\u79F0\u4E3A ",paraId:130,tocIndex:11},{value:'"systemEnvironment"',paraId:130,tocIndex:11},{value:"\uFF0C\u7528\u4E8E\u5B58\u653E",paraId:130,tocIndex:11},{value:"\u7CFB\u7EDF\u73AF\u5883\u53D8\u91CF",paraId:130,tocIndex:11},{value:"\u3002\u901A\u8FC7 ",paraId:130,tocIndex:11},{value:"getEnvironment().getSystemEnvironment()",paraId:130,tocIndex:11},{value:" \u65B9\u6CD5\u83B7\u53D6\u7CFB\u7EDF\u73AF\u5883\u53D8\u91CF\u5BF9\u8C61\uFF0C\u5E76\u4F7F\u7528 ",paraId:130,tocIndex:11},{value:"registerSingleton",paraId:130,tocIndex:11},{value:" \u65B9\u6CD5\u5C06\u5176\u6CE8\u518C\u4E3A\u5355\u4F8B Bean",paraId:130,tocIndex:11},{value:"postProcessBeanFactory(beanFactory)",paraId:21},{value:`//\u8FD9\u662F\u4E00\u4E2A\u7A7A\u65B9\u6CD5
postProcessBeanFactory(beanFactory);
`,paraId:131,tocIndex:12},{value:"invokeBeanFactoryPostProcessors(beanFactory) ",paraId:21},{value:"\u91CD\u8981",paraId:21},{value:"\u6267\u884C\u81EA\u5B9A\u4E49\u7684BeanFactoryProcessor\u548C\u5185\u7F6E\u7684BeanFactoryProcessor",paraId:132,tocIndex:13},{value:"\u91CD\u70B9\u4EE3\u7801\u7EC8\u4E8E\u6765\u4E86\uFF0C\u53EF\u4EE5\u8BF4 \u8FD9\u53E5\u4EE3\u7801\u662F\u76EE\u524D\u4E3A\u6B62\u6700\u91CD\u8981\uFF0C\u4E5F\u662F\u5185\u5BB9\u6700\u591A\u7684\u4EE3\u7801\u4E86\uFF0C\u6709\u5FC5\u8981\u597D\u597D\u5206\u6790\u4E0B\uFF1A",paraId:133,tocIndex:13},{value:`protected void invokeBeanFactoryPostProcessors(ConfigurableListableBeanFactory beanFactory) {
   	//getBeanFactoryPostProcessors\u771F\u662F\u5751\uFF0C\u7B2C\u4E00\u6B21\u770B\u5230\u8FD9\u91CC\u7684\u65F6\u5019\uFF0C\u6123\u4F4F\u4E86\uFF0C\u603B\u89C9\u5F97\u83B7\u5F97\u7684\u6C38\u8FDC\u90FD\u662F\u7A7A\u7684\u96C6\u5408\uFF0C\u6389\u5165\u5751\u91CC\uFF0C\u4E45\u4E45\u65E0\u6CD5\u81EA\u62D4
    //\u540E\u6765\u624D\u77E5\u9053spring\u5141\u8BB8\u6211\u4EEC\u624B\u52A8\u6DFB\u52A0BeanFactoryPostProcessor
    //\u5373\uFF1AannotationConfigApplicationContext.addBeanFactoryPostProcessor(XXX);
    PostProcessorRegistrationDelegate.invokeBeanFactoryPostProcessors(beanFactory, getBeanFactoryPostProcessors());

    if (beanFactory.getTempClassLoader() == null && beanFactory.containsBean(LOAD_TIME_WEAVER_BEAN_NAME)) {
        beanFactory.addBeanPostProcessor(new LoadTimeWeaverAwareProcessor(beanFactory));
        beanFactory.setTempClassLoader(new ContextTypeMatchClassLoader(beanFactory.getBeanClassLoader()));
    }
}
`,paraId:134,tocIndex:13},{value:"\u8BA9\u6211\u4EEC\u770B\u770B\u7B2C\u4E00\u4E2A\u5C0F\u65B9\u6CD5\u7684\u7B2C\u4E8C\u4E2A\u53C2\u6570\uFF1A",paraId:135,tocIndex:13},{value:`public List<BeanFactoryPostProcessor> getBeanFactoryPostProcessors() {
	return this.beanFactoryPostProcessors;
}
`,paraId:136,tocIndex:13},{value:"\u8FD9\u91CC\u83B7\u5F97\u7684\u662F BeanFactoryPostProcessor\uFF0C\u6211\u4EEC\u5728\u5916\u90E8\u53EF\u4EE5\u624B\u52A8\u6DFB\u52A0\u4E00\u4E2A\u540E\u7F6E\u5904\u7406\u5668\uFF0C\u800C\u4E0D\u662F\u4EA4\u7ED9 Spring \u53BB\u626B\u63CF\uFF0C\u5373\uFF1A",paraId:137,tocIndex:13},{value:`AnnotationConfigApplicationContext annotationConfigApplicationContext =new AnnotationConfigApplicationContext(AppConfig.class);
annotationConfigApplicationContext.addBeanFactoryPostProcessor(XXX);
`,paraId:138,tocIndex:13},{value:"\u53EA\u6709\u8FD9\u6837\uFF0C\u8FD9\u4E2A\u540E\u7F6E\u5904\u7406\u5668\u96C6\u5408\u624D\u4E0D\u4F1A\u4E3A\u7A7A",paraId:139,tocIndex:13},{value:"\u70B9\u51FB\u8FDB\u5165 ",paraId:140,tocIndex:13},{value:"PostProcessorRegistrationDelegate.invokeBeanFactoryPostProcessors(beanFactory, getBeanFactoryPostProcessors());",paraId:140,tocIndex:13},{value:"\u7684",paraId:140,tocIndex:13},{value:"invokeBeanFactoryPostProcessors",paraId:140,tocIndex:13},{value:"\u65B9\u6CD5",paraId:140,tocIndex:13},{value:`	public static void invokeBeanFactoryPostProcessors(
			ConfigurableListableBeanFactory beanFactory, List<BeanFactoryPostProcessor> beanFactoryPostProcessors) {
 
		Set<String> processedBeans = new HashSet<>();
 
		//beanFactory\u662FDefaultListableBeanFactory\uFF0C\u662FBeanDefinitionRegistry\u7684\u5B9E\u73B0\u7C7B\uFF0C\u6240\u4EE5\u80AF\u5B9A\u6EE1\u8DB3if
		if (beanFactory instanceof BeanDefinitionRegistry) {
			BeanDefinitionRegistry registry = (BeanDefinitionRegistry) beanFactory;
 
			//regularPostProcessors \u7528\u6765\u5B58\u653EBeanFactoryPostProcessor\uFF0C
			List<BeanFactoryPostProcessor> regularPostProcessors = new ArrayList<>();
 
			//registryProcessors \u7528\u6765\u5B58\u653EBeanDefinitionRegistryPostProcessor
			List<BeanDefinitionRegistryPostProcessor> registryProcessors = new ArrayList<>();
 
			for (BeanFactoryPostProcessor postProcessor : beanFactoryPostProcessors) {
				// \u5224\u65ADpostProcessor\u662F\u4E0D\u662FBeanDefinitionRegistryPostProcessor\uFF0C\u56E0\u4E3ABeanDefinitionRegistryPostProcessor
				// \u6269\u5C55\u4E86BeanFactoryPostProcessor\uFF0C\u6240\u4EE5\u8FD9\u91CC\u5148\u8981\u5224\u65AD\u662F\u4E0D\u662FBeanDefinitionRegistryPostProcessor
				// \u662F\u7684\u8BDD\uFF0C\u76F4\u63A5\u6267\u884CpostProcessBeanDefinitionRegistry\u65B9\u6CD5\uFF0C\u7136\u540E\u628A\u5BF9\u8C61\u88C5\u5230registryProcessors\u91CC\u9762\u53BB
				if (postProcessor instanceof BeanDefinitionRegistryPostProcessor) {
					BeanDefinitionRegistryPostProcessor registryProcessor =
							(BeanDefinitionRegistryPostProcessor) postProcessor;
					registryProcessor.postProcessBeanDefinitionRegistry(registry);
					registryProcessors.add(registryProcessor);
				}
 
				else {//\u4E0D\u662F\u7684\u8BDD\uFF0C\u5C31\u88C5\u5230regularPostProcessors
					regularPostProcessors.add(postProcessor);
				}
			}
 
			//\u4E00\u4E2A\u4E34\u65F6\u53D8\u91CF\uFF0C\u7528\u6765\u88C5\u8F7DBeanDefinitionRegistryPostProcessor
			//BeanDefinitionRegistry\u7EE7\u627F\u4E86PostProcessorBeanFactoryPostProcessor
			List<BeanDefinitionRegistryPostProcessor> currentRegistryProcessors = new ArrayList<>();
 
			// \u83B7\u5F97\u5B9E\u73B0BeanDefinitionRegistryPostProcessor\u63A5\u53E3\u7684\u7C7B\u7684BeanName:org.springframework.context.annotation.internalConfigurationAnnotationProcessor
			// \u5E76\u4E14\u88C5\u5165\u6570\u7EC4postProcessorNames\uFF0C\u4E00\u822C\u60C5\u51B5\u4E0B\uFF0C\u53EA\u4F1A\u627E\u5230\u4E00\u4E2A
			// \u8FD9\u91CC\u53C8\u6709\u4E00\u4E2A\u5751\uFF0C\u4E3A\u4EC0\u4E48\u6211\u81EA\u5DF1\u521B\u5EFA\u4E86\u4E00\u4E2A\u5B9E\u73B0BeanDefinitionRegistryPostProcessor\u63A5\u53E3\u7684\u7C7B\uFF0C\u4E5F\u6253\u4E0A\u4E86@Component\u6CE8\u89E3
			// \u914D\u7F6E\u7C7B\u4E5F\u52A0\u4E0A\u4E86@Component\u6CE8\u89E3\uFF0C\u4F46\u662F\u8FD9\u91CC\u5374\u6CA1\u6709\u62FF\u5230
			// \u56E0\u4E3A\u76F4\u5230\u8FD9\u4E00\u6B65\uFF0CSpring\u8FD8\u6CA1\u6709\u53BB\u626B\u63CF\uFF0C\u626B\u63CF\u662F\u5728ConfigurationClassPostProcessor\u7C7B\u4E2D\u5B8C\u6210\u7684\uFF0C\u4E5F\u5C31\u662F\u4E0B\u9762\u7684\u7B2C\u4E00\u4E2AinvokeBeanDefinitionRegistryPostProcessors\u65B9\u6CD5
			String[] postProcessorNames =
					beanFactory.getBeanNamesForType(BeanDefinitionRegistryPostProcessor.class, true, false);
 
			for (String ppName : postProcessorNames) {
				if (beanFactory.isTypeMatch(ppName, PriorityOrdered.class)) {
					//\u83B7\u5F97ConfigurationClassPostProcessor\u7C7B\uFF0C\u5E76\u4E14\u653E\u5230currentRegistryProcessors
					//ConfigurationClassPostProcessor\u662F\u5F88\u91CD\u8981\u7684\u4E00\u4E2A\u7C7B\uFF0C\u5B83\u5B9E\u73B0\u4E86BeanDefinitionRegistryPostProcessor\u63A5\u53E3
					//BeanDefinitionRegistryPostProcessor\u63A5\u53E3\u53C8\u5B9E\u73B0\u4E86BeanFactoryPostProcessor\u63A5\u53E3
					//ConfigurationClassPostProcessor\u662F\u6781\u5176\u91CD\u8981\u7684\u7C7B
					//\u91CC\u9762\u6267\u884C\u4E86\u626B\u63CFBean\uFF0CImport\uFF0CImportResouce\u7B49\u5404\u79CD\u64CD\u4F5C
					//\u7528\u6765\u5904\u7406\u914D\u7F6E\u7C7B\uFF08\u6709\u4E24\u79CD\u60C5\u51B5 \u4E00\u79CD\u662F\u4F20\u7EDF\u610F\u4E49\u4E0A\u7684\u914D\u7F6E\u7C7B\uFF0C\u4E00\u79CD\u662F\u666E\u901A\u7684bean\uFF09\u7684\u5404\u79CD\u903B\u8F91
					currentRegistryProcessors.add(beanFactory.getBean(ppName, BeanDefinitionRegistryPostProcessor.class));
					//\u628Aname\u653E\u5230processedBeans\uFF0C\u540E\u7EED\u4F1A\u6839\u636E\u8FD9\u4E2A\u96C6\u5408\u6765\u5224\u65AD\u5904\u7406\u5668\u662F\u5426\u5DF2\u7ECF\u88AB\u6267\u884C\u8FC7\u4E86
					processedBeans.add(ppName);
				}
			}
 
			//\u5904\u7406\u6392\u5E8F
			sortPostProcessors(currentRegistryProcessors, beanFactory);
 
			//\u5408\u5E76Processors\uFF0C\u4E3A\u4EC0\u4E48\u8981\u5408\u5E76\uFF0C\u56E0\u4E3AregistryProcessors\u662F\u88C5\u8F7DBeanDefinitionRegistryPostProcessor\u7684
			//\u4E00\u5F00\u59CB\u7684\u65F6\u5019\uFF0Cspring\u53EA\u4F1A\u6267\u884CBeanDefinitionRegistryPostProcessor\u72EC\u6709\u7684\u65B9\u6CD5
			//\u800C\u4E0D\u4F1A\u6267\u884CBeanDefinitionRegistryPostProcessor\u7236\u7C7B\u7684\u65B9\u6CD5\uFF0C\u5373BeanFactoryProcessor\u7684\u65B9\u6CD5
			//\u6240\u4EE5\u8FD9\u91CC\u9700\u8981\u628A\u5904\u7406\u5668\u653E\u5165\u4E00\u4E2A\u96C6\u5408\u4E2D\uFF0C\u540E\u7EED\u7EDF\u4E00\u6267\u884C\u7236\u7C7B\u7684\u65B9\u6CD5
			registryProcessors.addAll(currentRegistryProcessors);
 
			//\u53EF\u4EE5\u7406\u89E3\u4E3A\u6267\u884CConfigurationClassPostProcessor\u7684postProcessBeanDefinitionRegistry\u65B9\u6CD5
			//Spring\u70ED\u63D2\u64AD\u7684\u4F53\u73B0\uFF0C\u50CFConfigurationClassPostProcessor\u5C31\u76F8\u5F53\u4E8E\u4E00\u4E2A\u7EC4\u4EF6\uFF0CSpring\u5F88\u591A\u4E8B\u60C5\u5C31\u662F\u4EA4\u7ED9\u7EC4\u4EF6\u53BB\u7BA1\u7406
			//\u5982\u679C\u4E0D\u60F3\u7528\u8FD9\u4E2A\u7EC4\u4EF6\uFF0C\u76F4\u63A5\u628A\u6CE8\u518C\u7EC4\u4EF6\u7684\u90A3\u4E00\u6B65\u53BB\u6389\u5C31\u53EF\u4EE5
			invokeBeanDefinitionRegistryPostProcessors(currentRegistryProcessors, registry);
 
			//\u56E0\u4E3AcurrentRegistryProcessors\u662F\u4E00\u4E2A\u4E34\u65F6\u53D8\u91CF\uFF0C\u6240\u4EE5\u9700\u8981\u6E05\u9664
			currentRegistryProcessors.clear();
 
			// \u518D\u6B21\u6839\u636EBeanDefinitionRegistryPostProcessor\u83B7\u5F97BeanName\uFF0C\u770B\u8FD9\u4E2ABeanName\u662F\u5426\u5DF2\u7ECF\u88AB\u6267\u884C\u8FC7\u4E86\uFF0C\u6709\u6CA1\u6709\u5B9E\u73B0Ordered\u63A5\u53E3
			// \u5982\u679C\u6CA1\u6709\u88AB\u6267\u884C\u8FC7\uFF0C\u4E5F\u5B9E\u73B0\u4E86Ordered\u63A5\u53E3\u7684\u8BDD\uFF0C\u628A\u5BF9\u8C61\u63A8\u9001\u5230currentRegistryProcessors\uFF0C\u540D\u79F0\u63A8\u9001\u5230processedBeans
			// \u5982\u679C\u6CA1\u6709\u5B9E\u73B0Ordered\u63A5\u53E3\u7684\u8BDD\uFF0C\u8FD9\u91CC\u4E0D\u628A\u6570\u636E\u52A0\u5230currentRegistryProcessors\uFF0CprocessedBeans\u4E2D\uFF0C\u540E\u7EED\u518D\u505A\u5904\u7406
			// \u8FD9\u91CC\u624D\u53EF\u4EE5\u83B7\u5F97\u6211\u4EEC\u5B9A\u4E49\u7684\u5B9E\u73B0\u4E86BeanDefinitionRegistryPostProcessor\u7684Bean
			postProcessorNames = beanFactory.getBeanNamesForType(BeanDefinitionRegistryPostProcessor.class, true, false);
			for (String ppName : postProcessorNames) {
				if (!processedBeans.contains(ppName) && beanFactory.isTypeMatch(ppName, Ordered.class)) {
					currentRegistryProcessors.add(beanFactory.getBean(ppName, BeanDefinitionRegistryPostProcessor.class));
					processedBeans.add(ppName);
				}
			}
 
			//\u5904\u7406\u6392\u5E8F
			sortPostProcessors(currentRegistryProcessors, beanFactory);
 
			//\u5408\u5E76Processors
			registryProcessors.addAll(currentRegistryProcessors);
 
			//\u6267\u884C\u6211\u4EEC\u81EA\u5B9A\u4E49\u7684BeanDefinitionRegistryPostProcessor
			invokeBeanDefinitionRegistryPostProcessors(currentRegistryProcessors, registry);
 
			//\u6E05\u7A7A\u4E34\u65F6\u53D8\u91CF
			currentRegistryProcessors.clear();
 
			// \u4E0A\u9762\u7684\u4EE3\u7801\u662F\u6267\u884C\u4E86\u5B9E\u73B0\u4E86Ordered\u63A5\u53E3\u7684BeanDefinitionRegistryPostProcessor\uFF0C
			// \u4E0B\u9762\u7684\u4EE3\u7801\u5C31\u662F\u6267\u884C\u6CA1\u6709\u5B9E\u73B0Ordered\u63A5\u53E3\u7684BeanDefinitionRegistryPostProcessor
			boolean reiterate = true;
			while (reiterate) {
				reiterate = false;
				postProcessorNames = beanFactory.getBeanNamesForType(BeanDefinitionRegistryPostProcessor.class, true, false);
				for (String ppName : postProcessorNames) {
					if (!processedBeans.contains(ppName)) {
						currentRegistryProcessors.add(beanFactory.getBean(ppName, BeanDefinitionRegistryPostProcessor.class));
						processedBeans.add(ppName);
						reiterate = true;
					}
				}
				sortPostProcessors(currentRegistryProcessors, beanFactory);
				registryProcessors.addAll(currentRegistryProcessors);
				invokeBeanDefinitionRegistryPostProcessors(currentRegistryProcessors, registry);
				currentRegistryProcessors.clear();
			}
 
			//registryProcessors\u96C6\u5408\u88C5\u8F7DBeanDefinitionRegistryPostProcessor
			//\u4E0A\u9762\u7684\u4EE3\u7801\u662F\u6267\u884C\u5B50\u7C7B\u72EC\u6709\u7684\u65B9\u6CD5\uFF0C\u8FD9\u91CC\u9700\u8981\u518D\u628A\u7236\u7C7B\u7684\u65B9\u6CD5\u4E5F\u6267\u884C\u4E00\u6B21
			invokeBeanFactoryPostProcessors(registryProcessors, beanFactory);
 
			//regularPostProcessors\u88C5\u8F7DBeanFactoryPostProcessor\uFF0C\u6267\u884CBeanFactoryPostProcessor\u7684\u65B9\u6CD5
			//\u4F46\u662FregularPostProcessors\u4E00\u822C\u60C5\u51B5\u4E0B\uFF0C\u662F\u4E0D\u4F1A\u6709\u6570\u636E\u7684\uFF0C\u53EA\u6709\u5728\u5916\u9762\u624B\u52A8\u6DFB\u52A0BeanFactoryPostProcessor\uFF0C\u624D\u4F1A\u6709\u6570\u636E
			invokeBeanFactoryPostProcessors(regularPostProcessors, beanFactory);
		}
 
		else {
			invokeBeanFactoryPostProcessors(beanFactoryPostProcessors, beanFactory);
		}
 
		//\u627E\u5230BeanFactoryPostProcessor\u5B9E\u73B0\u7C7B\u7684BeanName\u6570\u7EC4
		String[] postProcessorNames =
				beanFactory.getBeanNamesForType(BeanFactoryPostProcessor.class, true, false);

		List<BeanFactoryPostProcessor> priorityOrderedPostProcessors = new ArrayList<>();
		List<String> orderedPostProcessorNames = new ArrayList<>();
		List<String> nonOrderedPostProcessorNames = new ArrayList<>();
		//\u5FAA\u73AFBeanName\u6570\u7EC4
		for (String ppName : postProcessorNames) {
			//\u5982\u679C\u8FD9\u4E2ABean\u88AB\u6267\u884C\u8FC7\u4E86\uFF0C\u8DF3\u8FC7
			if (processedBeans.contains(ppName)) {
				// skip - already processed in first phase above
			}
			//\u5982\u679C\u5B9E\u73B0\u4E86PriorityOrdered\u63A5\u53E3\uFF0C\u52A0\u5165\u5230priorityOrderedPostProcessors
			else if (beanFactory.isTypeMatch(ppName, PriorityOrdered.class)) {
				priorityOrderedPostProcessors.add(beanFactory.getBean(ppName, BeanFactoryPostProcessor.class));
			}
			//\u5982\u679C\u5B9E\u73B0\u4E86Ordered\u63A5\u53E3\uFF0C\u52A0\u5165\u5230orderedPostProcessorNames
			else if (beanFactory.isTypeMatch(ppName, Ordered.class)) {
				orderedPostProcessorNames.add(ppName);
			}
			//\u5982\u679C\u65E2\u6CA1\u6709\u5B9E\u73B0PriorityOrdered\uFF0C\u4E5F\u6CA1\u6709\u5B9E\u73B0Ordered\u3002\u52A0\u5165\u5230nonOrderedPostProcessorNames
			else {
				nonOrderedPostProcessorNames.add(ppName);
			}
		}
		//\u6392\u5E8F\u5904\u7406priorityOrderedPostProcessors\uFF0C\u5373\u5B9E\u73B0\u4E86PriorityOrdered\u63A5\u53E3\u7684BeanFactoryPostProcessor
		sortPostProcessors(priorityOrderedPostProcessors, beanFactory);
		//\u6267\u884CpriorityOrderedPostProcessors
		invokeBeanFactoryPostProcessors(priorityOrderedPostProcessors, beanFactory);
		//\u6267\u884C\u5B9E\u73B0\u4E86Ordered\u63A5\u53E3\u7684BeanFactoryPostProcessor
		List<BeanFactoryPostProcessor> orderedPostProcessors = new ArrayList<>();
		for (String postProcessorName : orderedPostProcessorNames) {
			orderedPostProcessors.add(beanFactory.getBean(postProcessorName, BeanFactoryPostProcessor.class));
		}
		sortPostProcessors(orderedPostProcessors, beanFactory);
		invokeBeanFactoryPostProcessors(orderedPostProcessors, beanFactory);
 
		// \u6267\u884C\u65E2\u6CA1\u6709\u5B9E\u73B0PriorityOrdered\u63A5\u53E3\uFF0C\u4E5F\u6CA1\u6709\u5B9E\u73B0Ordered\u63A5\u53E3\u7684BeanFactoryPostProcessor
		List<BeanFactoryPostProcessor> nonOrderedPostProcessors = new ArrayList<>();
		for (String postProcessorName : nonOrderedPostProcessorNames) {
			nonOrderedPostProcessors.add(beanFactory.getBean(postProcessorName, BeanFactoryPostProcessor.class));
		}
		invokeBeanFactoryPostProcessors(nonOrderedPostProcessors, beanFactory);
 
		beanFactory.clearMetadataCache();
	}
`,paraId:141,tocIndex:13},{value:"\u5B9A\u4E49\u4E86\u4E00\u4E2A Set\uFF0C\u88C5\u8F7D BeanName\uFF0C\u540E\u9762\u4F1A\u6839\u636E\u8FD9\u4E2A Set\uFF0C\u6765\u5224\u65AD\u540E\u7F6E\u5904\u7406\u5668\u662F\u5426\u88AB\u6267\u884C\u8FC7\u4E86\u3002",paraId:142,tocIndex:13},{value:`Set<String> processedBeans = new HashSet<>();
`,paraId:143,tocIndex:13},{value:"\u9996\u5148\u5224\u65AD beanFactory \u662F\u4E0D\u662F BeanDefinitionRegistry \u7684\u5B9E\u4F8B",paraId:144,tocIndex:13},{value:`if (beanFactory instanceof BeanDefinitionRegistry) 
`,paraId:145,tocIndex:13},{value:"\u5F53\u7136\u80AF\u5B9A\u662F\u7684\uFF0C\u7136\u540E\u6267\u884C\u5982\u4E0B\u64CD\u4F5C\uFF1A",paraId:146,tocIndex:13},{value:"\u5B9A\u4E49\u4E86\u4E24\u4E2A List\uFF0C\u4E00\u4E2A\u662F regularPostProcessors\uFF0C\u7528\u6765\u88C5\u8F7D BeanFactoryPostProcessor\uFF0C\u4E00\u4E2A\u662F registryProcessors \u7528\u6765\u88C5\u8F7D BeanDefinitionRegistryPostProcessor",paraId:147,tocIndex:13},{value:`List<BeanFactoryPostProcessor> regularPostProcessors = new ArrayList<>();
List<BeanDefinitionRegistryPostProcessor> registryProcessors = new ArrayList<>();
`,paraId:148,tocIndex:13},{value:"\u5176\u4E2D BeanDefinitionRegistryPostProcessor \u6269\u5C55\u4E86 BeanFactoryPostProcessor\u3002",paraId:149,tocIndex:13},{value:"BeanDefinitionRegistryPostProcessor",paraId:150,tocIndex:13},{value:" \u6709\u4E24\u4E2A\u65B9\u6CD5\uFF0C\u4E00\u4E2A\u662F\u72EC\u6709\u7684 ",paraId:150,tocIndex:13},{value:"postProcessBeanDefinitionRegistry",paraId:150,tocIndex:13},{value:" \u65B9\u6CD5\uFF0C\u4E00\u4E2A\u662F\u7236\u7C7B\u7684 ",paraId:150,tocIndex:13},{value:"postProcessBeanFactory",paraId:150,tocIndex:13},{value:" \u65B9\u6CD5",paraId:150,tocIndex:13},{value:"postProcessBeanDefinitionRegistry \uFF1A\u5728 Spring \u5E94\u7528\u7A0B\u5E8F\u4E0A\u4E0B\u6587\u542F\u52A8\u65F6\uFF0C\u8BE5\u65B9\u6CD5\u4F1A\u88AB\u5BB9\u5668\u8C03\u7528\u3002\u5728\u8C03\u7528\u8FD9\u4E2A\u65B9\u6CD5\u65F6\uFF0C\u5BB9\u5668\u4F1A\u5C06 ",paraId:151,tocIndex:13},{value:"BeanDefinitionRegistry",paraId:151,tocIndex:13},{value:"(Bean\u5B9A\u4E49\u6CE8\u518C\u5668) \u7684\u5B9E\u4F8B\u4F20\u9012\u7ED9\u5B83\uFF0C\u4ECE\u800C\u5141\u8BB8\u5B83\u6CE8\u518C\u66F4\u591A\u7684 Bean \u5B9A\u4E49\uFF0C\u5982\u52A8\u6001\u6CE8\u518CBean,\u626B\u63CF\u7279\u5B9A\u7684\u5305\u5E76\u6CE8\u518C Bean",paraId:151,tocIndex:13},{value:"postProcessBeanFactory  : \u53EF\u4EE5\u5BF9 Bean \u5DE5\u5382\u8FDB\u884C\u5404\u79CD\u540E\u5904\u7406\u64CD\u4F5C\uFF0C\u4F8B\u5982\u4FEE\u6539 Bean \u7684\u5C5E\u6027\u503C\u3001\u6CE8\u518C\u65B0\u7684 Bean\u3001\u4FEE\u6539Bean \u7684\u4F5C\u7528\u57DF\u7B49\u7B49\u3002\u5B83\u4E3B\u8981\u7528\u4E8E\u5BF9 ",paraId:152,tocIndex:13},{value:"Bean \u5DE5\u5382\u672C\u8EAB\u8FDB\u884C\u914D\u7F6E",paraId:152,tocIndex:13},{value:"\uFF0C",paraId:152,tocIndex:13},{value:"\u800C\u4E0D\u662F\u5BF9 Bean \u5B9E\u4F8B\u8FDB\u884C\u4FEE\u6539",paraId:152,tocIndex:13},{value:"\u5FAA\u73AF\u4F20\u8FDB\u6765\u7684 beanFactoryPostProcessors\uFF0C\u4E0A\u9762\u5DF2\u7ECF\u89E3\u91CA\u8FC7\u4E86\uFF0C\u4E00\u822C\u60C5\u51B5\u4E0B\uFF0C\u8FD9\u91CC\u6C38\u8FDC\u90FD\u662F\u7A7A\u7684\uFF0C",paraId:153,tocIndex:13},{value:"\u53EA\u6709\u624B\u52A8 add beanFactoryPostProcessor\uFF0C\u8FD9\u91CC\u624D\u4F1A\u6709\u6570\u636E",paraId:153,tocIndex:13},{value:"\u3002",paraId:153,tocIndex:13},{value:"\u6211\u4EEC\u5047\u8BBE beanFactoryPostProcessors \u6709\u6570\u636E\uFF0C\u8FDB\u5165\u5FAA\u73AF\uFF0C\u5224\u65AD postProcessor \u662F\u4E0D\u662F BeanDefinitionRegistryPostProcessor\uFF0C\u56E0\u4E3A BeanDefinitionRegistryPostProcessor \u6269\u5C55\u4E86 BeanFactoryPostProcessor\uFF0C\u6240\u4EE5\u8FD9\u91CC\u5148\u8981\u5224\u65AD\u662F\u4E0D\u662F BeanDefinitionRegistryPostProcessor",paraId:154,tocIndex:13},{value:"\u662F\u7684\u8BDD\uFF0C\u6267\u884C postProcessBeanDefinitionRegistry \u65B9\u6CD5\uFF0C\u7136\u540E\u628A\u5BF9\u8C61\u88C5\u5230 registryProcessors \u91CC\u9762\u53BB\uFF0C\u4E0D\u662F\u7684\u8BDD\uFF0C\u5C31\u88C5\u5230 regularPostProcessors\u3002",paraId:155,tocIndex:13},{value:"\u6839\u636E\u4F20\u8FDB\u6765\u7684beanFactoryPostProcessors\u7C7B\u578B\u653E\u5230\u5BF9\u5E94\u7684List\uFF0C\u4E0D\u8FC7\u4E00\u822C\u6CA1\u6570\u636E",paraId:156,tocIndex:13},{value:`for (BeanFactoryPostProcessor postProcessor : beanFactoryPostProcessors) {
	if (postProcessor instanceof BeanDefinitionRegistryPostProcessor) {
		BeanDefinitionRegistryPostProcessor registryProcessor =
		(BeanDefinitionRegistryPostProcessor) postProcessor;
        //\u5982\u679C\u6211\u4EEC\u6DFB\u52A0\u4E86\uFF0C\u4E5F\u5C31\u662Fadd\u4E86\u7EE7\u627FBeanDefinitionRegistryPostProcessor\u7684\u7C7B\uFF0C\u5148\u4F1A\u88AB\u6267\u884C
		registryProcessor.postProcessBeanDefinitionRegistry(registry);
		registryProcessors.add(registryProcessor);
	}else {
		regularPostProcessors.add(postProcessor);
	}
}
`,paraId:157,tocIndex:13},{value:"getBeanNamesForType\uFF0C\u987E\u540D\u601D\u4E49\uFF0C\u662F\u6839\u636E\u7C7B\u578B\u67E5\u5230 BeanNames",paraId:158,tocIndex:13},{value:`String[] postProcessorNames =
	beanFactory.getBeanNamesForType(BeanDefinitionRegistryPostProcessor.class, true, false);
`,paraId:159,tocIndex:13},{value:"\u8FD9\u91CC\u6709\u4E00\u70B9\u9700\u8981\u6CE8\u610F\uFF0C\u5C31\u662F\u53BB\u54EA\u91CC\u627E\uFF0C\u70B9\u5F00\u8FD9\u4E2A\u65B9\u6CD5\u7684\u8BDD\uFF0C\u5C31\u77E5\u9053\u662F\u5FAA\u73AF beanDefinitionNames",paraId:160,tocIndex:13},{value:"\u4E4B\u524D\u5728\u5B8C\u6210register (annotatedClasses)\u540E\u7684beanDefinition\uFF0C\u4E5F\u5C31\u662F\u9700\u8981\u5148\u6267\u884C\u7684\u521B\u4E16\u7EAA\u7C7B",paraId:160,tocIndex:13},{value:" \u53BB\u627E",paraId:160,tocIndex:13},{value:"\u8FD9\u91CC\u4F20\u4E86 BeanDefinitionRegistryPostProcessor.class\uFF0C\u5C31\u662F",paraId:161,tocIndex:13},{value:"\u627E\u5230\u7C7B\u578B\u4E3A BeanDefinitionRegistryPostProcessor \u7684\u540E\u7F6E\u5904\u7406\u5668\uFF0C\u5E76\u4E14\u8D4B\u503C\u7ED9 postProcessorNames",paraId:161,tocIndex:13},{value:"\u4E00\u822C\u60C5\u51B5\u4E0B\uFF0C\u53EA\u4F1A\u627E\u5230\u4E00\u4E2A\uFF0C\u5C31\u662F org.springframework.context.annotation.internalConfigurationAnnotationProcessor\uFF0C\u4E5F\u5C31\u662F ",paraId:162,tocIndex:13},{value:"ConfigurationAnnotationProcessor",paraId:162,tocIndex:13},{value:"\uFF0C\u8FD9\u4E2A\u540E\u7F6E\u5904\u7406\u5668\u5341\u5206\u91CD\u8981\u3002",paraId:162,tocIndex:13},{value:"\u5FAA\u73AF postProcessorNames\uFF0C\u5176\u5B9E\u4E5F\u5C31\u662F ConfigurationAnnotationProcessor\uFF0C\u5224\u65AD\u6B64\u540E\u7F6E\u5904\u7406\u5668\u662F\u5426\u5B9E\u73B0\u4E86 PriorityOrdered \u63A5\u53E3",paraId:163,tocIndex:13},{value:"\u8FD9\u91CC\u6D89\u53CA\u5230\u540E\u7F6E\u5904\u7406\u5668\u7684\u6267\u884C\u987A\u5E8F\uFF0CPriorityOrdered \u63A5\u53E3\u7684\u4F18\u5148\u7EA7\u6700\u9AD8\uFF0C\u5176\u6B21 Ordered\uFF0C\u6700\u540E\u662F\u666E\u901A\u7684BeanDefinitionRegistryPostProcessor",paraId:164,tocIndex:13},{value:"ConfigurationAnnotationProcessor \u4E5F\u5B9E\u73B0\u4E86 PriorityOrdered \u63A5\u53E3\uFF0C\u6240\u4EE5\u4F1A\u6267\u884C\u540E\u9762\u903B\u8F91",paraId:165,tocIndex:13},{value:"\u5982\u679C\u5B9E\u73B0\u4E86\uFF0C\u628A\u5B83\u6DFB\u52A0\u5230 currentRegistryProcessors \u8FD9\u4E2A\u4E34\u65F6\u53D8\u91CF\u4E2D\uFF0C\u518D\u653E\u5165 processedBeans\uFF0C\u4EE3\u8868\u8FD9\u4E2A\u540E\u7F6E\u5904\u7406\u5DF2\u7ECF\u88AB\u5904\u7406\u8FC7\u4E86\u3002\u5F53\u7136\u73B0\u5728\u8FD8\u6CA1\u6709\u5904\u7406\uFF0C\u4F46\u662F\u9A6C\u4E0A\u5C31\u8981\u5904\u7406\u4E86",paraId:166,tocIndex:13},{value:`for (String ppName : postProcessorNames) {
	if (!processedBeans.contains(ppName) && beanFactory.isTypeMatch(ppName, Ordered.class)) {
		currentRegistryProcessors.add(beanFactory.getBean(ppName, BeanDefinitionRegistryPostProcessor.class));
		processedBeans.add(ppName);
		}
}
`,paraId:167,tocIndex:13},{value:"\u8FDB\u884C\u6392\u5E8F\uFF0CPriorityOrdered \u662F\u4E00\u4E2A\u6392\u5E8F\u63A5\u53E3\uFF0C\u5982\u679C\u5B9E\u73B0\u4E86\u5B83\uFF0C\u5C31\u8BF4\u660E\u6B64\u540E\u7F6E\u5904\u7406\u5668\u662F\u6709\u987A\u5E8F\u7684\uFF0C\u6240\u4EE5\u9700\u8981\u6392\u5E8F\u3002\u5F53\u7136\u76EE\u524D\u8FD9\u91CC\u53EA\u6709\u4E00\u4E2A\u540E\u7F6E\u5904\u7406\u5668\uFF0C\u5C31\u662F ConfigurationClassPostProcessor\u3002",paraId:168,tocIndex:13},{value:`sortPostProcessors(currentRegistryProcessors, beanFactory);
`,paraId:169,tocIndex:13},{value:"\u628A currentRegistryProcessors \u5408\u5E76\u5230 registryProcessors\uFF0C\u4E3A\u4EC0\u4E48\u9700\u8981\u5408\u5E76\uFF1F",paraId:170,tocIndex:13},{value:"\u56E0\u4E3A\u4E00\u5F00\u59CB ",paraId:171,tocIndex:13},{value:"spring \u53EA\u4F1A\u6267\u884C BeanDefinitionRegistryPostProcessor \u72EC\u6709\u7684\u65B9\u6CD5",paraId:171,tocIndex:13},{value:"\uFF0C\u800C\u4E0D\u4F1A\u6267\u884C BeanDefinitionRegistryPostProcessor \u7236\u7C7B\u7684\u65B9\u6CD5\uFF0C\u5373 BeanFactoryProcessor \u63A5\u53E3\u4E2D\u7684\u65B9\u6CD5",paraId:171,tocIndex:13},{value:"\u6240\u4EE5\u9700\u8981\u628A\u8FD9\u4E9B\u540E\u7F6E\u5904\u7406\u5668\u653E\u5165\u4E00\u4E2A\u96C6\u5408\u4E2D\uFF0C",paraId:172,tocIndex:13},{value:"\u4EE5\u4FBF\u540E\u7EED\u7EDF\u4E00\u6267\u884C BeanFactoryProcessor \u63A5\u53E3\u4E2D\u7684\u65B9\u6CD5\u3002",paraId:172,tocIndex:13},{value:"\u5F53\u7136\u76EE\u524D\u8FD9\u91CC\u53EA\u6709\u4E00\u4E2A\u540E\u7F6E\u5904\u7406\u5668\uFF0C\u5C31\u662F ConfigurationClassPostProcessor\u3002",paraId:173,tocIndex:13},{value:`registryProcessors.addAll(currentRegistryProcessors);
`,paraId:174,tocIndex:13},{value:"\u6267\u884CConfigurationClassPostProcessor \u7684BeanDefinitionRegistryPostProcessor",paraId:175,tocIndex:13},{value:`
\u8FD9\u4E00\u6B65\u5728\u4E0B\u4E00\u7AE0\u8BE6\u7EC6\u4ECB\u7ECD`,paraId:175,tocIndex:13},{value:`invokeBeanDefinitionRegistryPostProcessors(currentRegistryProcessors, registry);
`,paraId:176,tocIndex:13},{value:"\u53EF\u4EE5\u7406\u89E3\u4E3A\u6267\u884C ConfigurationClassPostProcessor \u4E2D\u7684 postProcessBeanDefinitionRegistry \u65B9\u6CD5\u5C06\u90A3\u4E9B\u6211\u4EEC\u81EA\u5DF1\u5B9A\u4E49\u7684\u5B9E\u73B0\u4E86\u627E\u5230\u7684BeanDefinitionRegistryPostProcessor\u548CBeanFactoryPostProcessor \u63A5\u53E3\u4E2D\u7684\u65B9\u6CD5\u7684\u540E\u7F6E\u5904\u7406\u5668\u653E\u5165registryProcessors \u96C6\u5408 (beanFactory)\u4E2D",paraId:177,tocIndex:13},{value:"\u8FD9\u5C31\u662F Spring \u8BBE\u8BA1\u601D\u60F3\u7684\u4F53\u73B0\u4E86\uFF0C\u5728\u8FD9\u91CC\u4F53\u73B0\u7684\u5C31\u662F\u5176\u4E2D\u7684",paraId:178,tocIndex:13},{value:"\u70ED\u63D2\u62D4",paraId:178,tocIndex:13},{value:"\uFF0C\u63D2\u4EF6\u5316\u5F00\u53D1\u7684\u601D\u60F3\u3002",paraId:178,tocIndex:13},{value:"\u4E00\u822C\u60C5\u51B5\u4E0B\u5C31\u4E00\u4E2A\uFF0C\u4E5F\u5C31\u662FConfigurationClassPostProcessor \uFF0C\u6839\u636E",paraId:179,tocIndex:13},{value:"String[] postProcessorNames = 	beanFactory.getBeanNamesForType(BeanDefinitionRegistryPostProcessor.class, true, false);",paraId:179,tocIndex:13},{value:"\u627E\u5230\u7684BeanDefinitionRegistryPostProcessor",paraId:179,tocIndex:13},{value:"Spring \u4E2D\u5F88\u591A\u4E1C\u897F\u90FD\u662F\u4EA4\u7ED9\u63D2\u4EF6\u53BB\u5904\u7406\u7684\uFF0C\u8FD9\u4E2A\u540E\u7F6E\u5904\u7406\u5668\u5C31\u76F8\u5F53\u4E8E\u4E00\u4E2A\u63D2\u4EF6\uFF0C\u5982\u679C\u4E0D\u60F3\u7528\u4E86\uFF0C\u76F4\u63A5\u4E0D\u6DFB\u52A0\u5C31\u662F\u4E86\u3002\u8FD9\u4E2A\u65B9\u6CD5\u7279\u522B\u91CD\u8981",paraId:180,tocIndex:13},{value:"\u6E05\u7A7A currentRegistryProcessors\uFF0C\u56E0\u4E3A currentRegistryProcessors \u662F\u4E00\u4E2A\u4E34\u65F6\u53D8\u91CF\uFF0C\u5DF2\u7ECF\u5B8C\u6210\u4E86\u76EE\u524D\u7684\u4F7F\u547D\uFF0C\u6240\u4EE5\u9700\u8981\u6E05\u7A7A\uFF0C\u5F53\u7136\u540E\u9762\u8FD8\u4F1A\u7528\u5230\u3002",paraId:181,tocIndex:13},{value:`currentRegistryProcessors.clear();
`,paraId:182,tocIndex:13},{value:"\u518D\u6B21\u6839\u636E BeanDefinitionRegistryPostProcessor \u83B7\u5F97 BeanName\uFF0C\u7136\u540E\u8FDB\u884C\u5FAA\u73AF\uFF0C\u770B\u8FD9\u4E2A\u540E\u7F6E\u5904\u7406\u5668\u662F\u5426\u88AB\u6267\u884C\u8FC7\u4E86\uFF0C\u5982\u679C\u6CA1\u6709\u88AB\u6267\u884C\u8FC7\uFF0C\u4E5F\u5B9E\u73B0\u4E86 Ordered \u63A5\u53E3\u7684\u8BDD\uFF0C\u628A\u6B64\u540E\u7F6E\u5904\u7406\u5668\u63A8\u9001\u5230 currentRegistryProcessors \u548C processedBeans \u4E2D\u3002",paraId:183,tocIndex:13},{value:"\u8FD9\u91CC\u5C31\u53EF\u4EE5\u83B7\u5F97\u6211\u4EEC\u5B9A\u4E49\u7684\uFF0C\u5E76\u4E14\u6253\u4E0A @Component \u6CE8\u89E3\u7684\u540E\u7F6E\u5904\u7406\u5668\u4E86\uFF0C\u56E0\u4E3A\u7B2C9\u6B65ConfigurationClassPostProcessor\u5DF2\u7ECF\u5B8C\u6210\u4E86\u626B\u63CF",paraId:184,tocIndex:13},{value:"\u4F46\u662F\u8FD9\u91CC\u9700\u8981\u6CE8\u610F\u7684\u662F\uFF0C\u7531\u4E8E ConfigurationClassPostProcessor \u5728\u4E0A\u9762\u5DF2\u7ECF\u88AB\u6267\u884C\u8FC7\u4E86\uFF0C\u6240\u4EE5\u867D\u7136\u53EF\u4EE5\u901A\u8FC7 getBeanNamesForType \u83B7\u5F97\uFF0C\u4F46\u662F\u5E76\u4E0D\u4F1A\u52A0\u5165\u5230 currentRegistryProcessors \u548C processedBeans\u3002",paraId:185,tocIndex:13},{value:`postProcessorNames = beanFactory.getBeanNamesForType(BeanDefinitionRegistryPostProcessor.class, true, false);
for (String ppName : postProcessorNames) {
	if (!processedBeans.contains(ppName)) {
		currentRegistryProcessors.add(beanFactory.getBean(ppName, 				BeanDefinitionRegistryPostProcessor.class));
		processedBeans.add(ppName);
		reiterate = true;
	}
}
`,paraId:186,tocIndex:13},{value:"\u5904\u7406\u6392\u5E8F\u3002",paraId:187,tocIndex:13},{value:`sortPostProcessors(currentRegistryProcessors, beanFactory);
`,paraId:188,tocIndex:13},{value:"\u5408\u5E76 Processors\uFF0C\u5408\u5E76\u7684\u7406\u7531\u548C\u4E0A\u9762\u662F\u4E00\u6837\u7684\u3002",paraId:189,tocIndex:13},{value:`registryProcessors.addAll(currentRegistryProcessors);
`,paraId:190,tocIndex:13},{value:"\u6267\u884C\u6211\u4EEC\u81EA\u5B9A\u4E49\u7684 BeanDefinitionRegistryPostProcessor\u3002",paraId:191,tocIndex:13},{value:"\u5728\u4E0A\u9762\u7684\u65B9\u6CD5\u4E2D\uFF0C\u4EC5\u4EC5\u662F\u6267\u884C\u4E86\u5B9E\u73B0\u4E86 Ordered \u63A5\u53E3\u7684 BeanDefinitionRegistryPostProcessor\uFF0C\u8FD9\u91CC\u662F\u6267\u884C\u6CA1\u6709\u5B9E\u73B0 Ordered \u63A5\u53E3\u7684 BeanDefinitionRegistryPostProcessor\u3002",paraId:192,tocIndex:13},{value:`invokeBeanDefinitionRegistryPostProcessors(currentRegistryProcessors, registry);
`,paraId:193,tocIndex:13},{value:"\u6E05\u7A7A\u4E34\u65F6\u53D8\u91CF\u3002",paraId:194,tocIndex:13},{value:`currentRegistryProcessors.clear();
`,paraId:195,tocIndex:13},{value:"\u4E0A\u9762\u7684\u4EE3\u7801\u662F\u6267\u884C\u5B50\u7C7B\u72EC\u6709\u7684\u65B9\u6CD5\uFF0C\u8FD9\u91CC\u9700\u8981\u518D\u628A\u7236\u7C7B\u7684\u65B9\u6CD5\u4E5F\u6267\u884C\u4E00\u6B21\u3002",paraId:196,tocIndex:13},{value:"\u8FD9\u91CC\u7684\u5DEE\u522B\u662F\u4E0A\u9762\u7684currentRegistryProcessors\u548CregistryProcessors",paraId:197,tocIndex:13},{value:`invokeBeanFactoryPostProcessors(registryProcessors, beanFactory);
`,paraId:198,tocIndex:13},{value:"\u6267\u884C regularPostProcessors \u4E2D\u7684\u540E\u7F6E\u5904\u7406\u5668\u7684\u65B9\u6CD5\uFF0C\u9700\u8981\u6CE8\u610F\u7684\u662F\uFF0C\u5728\u4E00\u822C\u60C5\u51B5\u4E0B\uFF0CregularPostProcessors \u662F\u4E0D\u4F1A\u6709\u6570\u636E\u7684\uFF0C\u53EA\u6709\u5728\u5916\u9762\u624B\u52A8\u6DFB\u52A0 BeanFactoryPostProcessor\uFF0C\u624D\u4F1A\u6709\u6570\u636E\u3002",paraId:199,tocIndex:13},{value:`invokeBeanFactoryPostProcessors(regularPostProcessors, beanFactory);
`,paraId:200,tocIndex:13},{value:"\u67E5\u627E\u5B9E\u73B0\u4E86 BeanFactoryPostProcessor \u7684\u540E\u7F6E\u5904\u7406\u5668\uFF0C\u5E76\u4E14\u6267\u884C\u540E\u7F6E\u5904\u7406\u5668\u4E2D\u7684\u65B9\u6CD5\u3002\u548C\u4E0A\u9762\u7684\u903B\u8F91\u5DEE\u4E0D\u591A\uFF0C\u4E0D\u518D\u8BE6\u7EC6\u8BF4\u660E\u3002",paraId:201,tocIndex:13},{value:"\u8FD9\u5C31\u662F\u8FD9\u4E2A\u65B9\u6CD5\u4E2D\u505A\u7684\u4E3B\u8981\u7684\u4E8B\u60C5\u4E86\uFF0C\u53EF\u4EE5\u8BF4\u662F\u6BD4\u8F83\u590D\u6742\u7684\u3002\u4F46\u662F\u903B\u8F91\u8FD8\u662F\u6BD4\u8F83\u6E05\u6670\u7684",paraId:202,tocIndex:13},{value:"\u5728\u7B2C 9 \u6B65\u7684\u65F6\u5019\uFF0C\u73B0\u5728\u5C31\u8BA9\u6211\u4EEC\u597D\u597D\u770B\u770B",paraId:203,tocIndex:14},{value:"invokeBeanDefinitionRegistryPostProcessors",paraId:203,tocIndex:14},{value:"\u8FD9\u4E2A\u65B9\u6CD5\u7A76\u7ADF\u505A\u4E86\u4EC0\u4E48\u5427\u3002",paraId:203,tocIndex:14},{value:`private static void invokeBeanDefinitionRegistryPostProcessors(Collection<? extends BeanDefinitionRegistryPostProcessor> postProcessors, BeanDefinitionRegistry registry) {
    Iterator var2 = postProcessors.iterator();
    while(var2.hasNext()) {
        BeanDefinitionRegistryPostProcessor postProcessor =(BeanDefinitionRegistryPostProcessor)var2.next();
        postProcessor.postProcessBeanDefinitionRegistry(registry);
    }
}
`,paraId:204,tocIndex:14},{value:"6.registerBeanPostProcessors(beanFactory);",paraId:21},{value:"\u5B9E\u4F8B\u5316\u548C\u6CE8\u518C beanFactory \u4E2D\u7EE7\u627F\u4E86\u4E86 BeanPostProcessor \u7684 bean\u3002",paraId:205,tocIndex:15},{value:"\u4F8B\u5982\uFF1A",paraId:206,tocIndex:15},{value:"AutowiredAnnotationBeanPostProcessor(\u5904\u7406\u88AB @Autowired \u6CE8\u89E3\u4FEE\u9970\u7684 bean \u5E76\u6CE8\u5165)",paraId:207,tocIndex:15},{value:"RequiredAnnotationBeanPostProcessor(\u5904\u7406\u88AB @Required \u6CE8\u89E3\u4FEE\u9970\u7684\u65B9\u6CD5)",paraId:208,tocIndex:15},{value:"CommonAnnotationBeanPostProcessor(\u5904\u7406 @PreDestroy\u3001@PostConstruct\u3001@Resource \u7B49\u591A\u4E2A\u6CE8\u89E3\u7684\u4F5C\u7528) \u7B49\u3002",paraId:209,tocIndex:15},{value:"initMessageSource()",paraId:21},{value:"\u521D\u59CB\u5316\u56FD\u9645\u5316\u8D44\u6E90\u5904\u7406\u5668\u3002\u4E0D\u662F\u4E3B\u7EBF\u4EE3\u7801\u5FFD\u7565\uFF0C\u6CA1\u4EC0\u4E48\u5B66\u4E60\u4EF7\u503C\u3002",paraId:210,tocIndex:16},{value:"8.initApplicationEventMulticaster()",paraId:21},{value:"\u521B\u5EFA\u4E8B\u4EF6\u591A\u64AD\u5668",paraId:211,tocIndex:17},{value:"9. onRefresh()",paraId:21},{value:"\u6A21\u677F\u65B9\u6CD5\uFF0C\u5728\u5BB9\u5668\u5237\u65B0\u7684\u65F6\u5019\u53EF\u4EE5\u81EA\u5B9A\u4E49\u903B\u8F91\uFF0C\u4E0D\u540C\u7684 Spring \u5BB9\u5668\u505A\u4E0D\u540C\u7684\u4E8B\u60C5",paraId:212,tocIndex:18},{value:"10.registerListeners();",paraId:21},{value:"\u6CE8\u518C\u76D1\u542C\u5668\uFF0C\u5E7F\u64AD early application events",paraId:213,tocIndex:19},{value:"11.finishBeanFactoryInitialization(beanFactory);",paraId:21},{value:"\u5B9E\u4F8B\u5316\u6240\u6709\u5269\u4F59\u7684\uFF08\u975E\u61D2\u52A0\u8F7D\uFF09\u5355\u4F8B",paraId:214,tocIndex:20},{value:"\u6BD4\u5982 invokeBeanFactoryPostProcessors \u65B9\u6CD5\u4E2D\u6839\u636E\u5404\u79CD\u6CE8\u89E3\u89E3\u6790\u51FA\u6765\u7684\u7C7B\uFF0C\u5728\u8FD9\u4E2A\u65F6\u5019\u90FD\u4F1A\u88AB\u521D\u59CB\u5316\u3002",paraId:215,tocIndex:20},{value:"\u5B9E\u4F8B\u5316\u7684\u8FC7\u7A0B\u5404\u79CD BeanPostProcessor \u5F00\u59CB\u8D77\u4F5C\u7528\u3002",paraId:216,tocIndex:20},{value:"\u8FD9\u4E2A\u65B9\u6CD5\u662F\u7528\u6765\u5B9E\u4F8B\u5316\u61D2\u52A0\u8F7D\u5355\u4F8B Bean \u7684\uFF0C\u4E5F\u5C31\u662F\u6211\u4EEC\u7684 Bean \u90FD\u662F\u5728\u8FD9\u91CC\u88AB\u521B\u5EFA\u51FA\u6765\u7684\uFF08\u7EDD\u5927\u90E8\u5206\u60C5\u51B5\u662F\u8FD9\u6837\u7684\uFF09",paraId:217,tocIndex:20},{value:`finishBeanFactoryInitialization(beanFactory);
`,paraId:218,tocIndex:20},{value:"\u518D\u8FDB\u5165 finishBeanFactoryInitialization \u8FD9\u65B9\u6CD5\uFF0C\u91CC\u9762\u6709\u4E00\u4E2A beanFactory.preInstantiateSingletons () \u65B9\u6CD5\uFF1A",paraId:219,tocIndex:20},{value:`//\u521D\u59CB\u5316\u6240\u6709\u7684\u975E\u61D2\u52A0\u8F7D\u5355\u4F8B
beanFactory.preInstantiateSingletons();
`,paraId:220,tocIndex:20},{value:"\u518D\u70B9\u8FDB\u53BB\uFF0C\u4F1A\u53D1\u73B0\u8FD9\u662F\u4E00\u4E2A\u63A5\u53E3\uFF0C\u597D\u5728\u5B83\u53EA\u6709\u4E00\u4E2A\u5B9E\u73B0\u7C7B\uFF0C\u6240\u4EE5\u6765\u5230\u4E86\u4ED6\u7684\u552F\u4E00\u5B9E\u73B0\uFF0C\u5B9E\u73B0\u7C7B\u5C31\u662F org.springframework.beans.factory.support.DefaultListableBeanFactory",paraId:221,tocIndex:20},{value:"\u8FD9\u91CC\u9762\u662F\u4E00\u4E2A\u5FAA\u73AF\uFF0C\u6211\u4EEC\u7684 Bean \u5C31\u662F\u5FAA\u73AF\u88AB\u521B\u5EFA\u51FA\u6765\u7684\uFF0C\u6211\u4EEC\u627E\u5230\u5176\u4E2D\u7684 getBean \u65B9\u6CD5\uFF1A",paraId:222,tocIndex:20},{value:`getBean(beanName);
`,paraId:223,tocIndex:20},{value:"\u8FD9\u91CC\u6709\u4E00\u4E2A\u5206\u652F\uFF0C\u5982\u679C Bean \u662F FactoryBean\uFF0C\u5982\u4F55\u5982\u4F55\uFF0C\u5982\u679C Bean \u4E0D\u662F FactoryBean \u5982\u4F55\u5982\u4F55",paraId:224,tocIndex:20},{value:"\u597D\u5728\u4E0D\u7BA1\u662F\u4E0D\u662F FactoryBean\uFF0C\u6700\u7EC8\u8FD8\u662F\u4F1A\u8C03\u7528 getBean \u65B9\u6CD5\uFF0C\u6240\u4EE5\u53EF\u4EE5\u6BEB\u4E0D\u72B9\u8C6B\u7684\u70B9\u8FDB\u53BB\uFF0C\u70B9\u8FDB\u53BB\u4E4B\u540E\u4F1A\u53D1\u73B0\uFF0C\u8FD9\u662F\u4E00\u4E2A\u95E8\u9762\u65B9\u6CD5\uFF0C\u76F4\u63A5\u8C03\u7528\u4E86 doGetBean \u65B9\u6CD5\uFF1A",paraId:225,tocIndex:20},{value:`return doGetBean(name, null, null, false);
`,paraId:226,tocIndex:20},{value:`if (mbd.isSingleton()) {
    //getSingleton\u4E2D\u7684\u7B2C\u4E8C\u4E2A\u53C2\u6570\u7C7B\u578B\u662FObjectFactory<?>\uFF0C\u662F\u4E00\u4E2A\u51FD\u6570\u5F0F\u63A5\u53E3\uFF0C\u4E0D\u4F1A\u7ACB\u523B\u6267\u884C\uFF0C\u800C\u662F\u5728
    //getSingleton\u65B9\u6CD5\u4E2D\uFF0C\u8C03\u7528ObjectFactory\u7684getObject\uFF0C\u624D\u4F1A\u6267\u884CcreateBean
    sharedInstance = getSingleton(beanName, () -> {
        try {
            return createBean(beanName, mbd, args);
        }
        catch (BeansException ex) {
            destroySingleton(beanName);
            throw ex;
        }
    });
    bean = getObjectForBeanInstance(sharedInstance, name, beanName, mbd);
}
`,paraId:227,tocIndex:20},{value:"\u8FD9\u91CC\u9762\u7684 createBean \u65B9\u6CD5\u662F\u63A5\u53E3\uFF0C\u4F46\u662F\u8FD9\u4E2A\u63A5\u53E3\u53C8\u53EA\u6709\u4E00\u4E2A\u5B9E\u73B0\u7C7B",paraId:228,tocIndex:20},{value:"\u8FD9\u4E2A\u5B9E\u73B0\u7C7B\u4E3A org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory\u3002",paraId:229,tocIndex:20},{value:"\u8FD9\u4E2A\u5B9E\u73B0\u7684\u65B9\u6CD5\u91CC\u9762\u53C8\u505A\u4E86\u5F88\u591A\u4E8B\u60C5\uFF0C\u627E\u5230\u90A3\u51E0\u4E2A\u751F\u547D\u5468\u671F\u7684\u56DE\u8C03\u5230\u5E95\u5B9A\u4E49\u5728\u54EA\u91CC\u5C31 OK",paraId:230,tocIndex:20},{value:`Object beanInstance = doCreateBean(beanName, mbdToUse, args);//\u521B\u5EFAbean\uFF0C\u6838\u5FC3
	if (logger.isDebugEnabled()) {
		logger.debug("Finished creating instance of bean '" + beanName + "'");
	}
return beanInstance;
`,paraId:231,tocIndex:20},{value:"\u518D\u7EE7\u7EED\u6DF1\u5165 doCreateBean \u65B9\u6CD5\uFF0C\u8FD9\u4E2A\u65B9\u6CD5\u53C8\u505A\u4E86\u4E00\u5806\u4E00\u5806\u7684\u4E8B\u60C5\uFF0C\u4F46\u662F\u6211\u4EEC\u5DF2\u7ECF\u627E\u5230\u4E86\u6211\u4EEC\u8981\u5BFB\u627E\u7684\u4E1C\u897F\u4E86\u3002",paraId:232,tocIndex:20},{value:"\u521B\u5EFA\u5B9E\u4F8B",paraId:233,tocIndex:20},{value:"\u9996\u5148\u662F\u521B\u5EFA\u5B9E\u4F8B\uFF0C\u4F4D\u4E8E\uFF1A",paraId:234,tocIndex:20},{value:`instanceWrapper = createBeanInstance(beanName, mbd, args);//\u521B\u5EFAbean\u7684\u5B9E\u4F8B\u3002\u6838\u5FC3
`,paraId:235,tocIndex:20},{value:"\u586B\u5145\u5C5E\u6027",paraId:236,tocIndex:20},{value:"\u5176\u6B21\u662F\u586B\u5145\u5C5E\u6027\uFF0C\u4F4D\u4E8E\uFF1A",paraId:237,tocIndex:20},{value:`populateBean(beanName, mbd, instanceWrapper);//\u586B\u5145\u5C5E\u6027\uFF0C\u91CD\u8981
`,paraId:238,tocIndex:20},{value:"\u5728\u586B\u5145\u5C5E\u6027\u4E0B\u9762\u6709\u4E00\u884C\u4EE3\u7801\uFF1A",paraId:239,tocIndex:20},{value:"initializeBean\u5F00\u59CB\u8BBE\u8BA1\u5230aware \u7CFB\u5217\u63A5\u53E3\u7684\u56DE\u8C03\u548CBeanPostProcessor \u7B49",paraId:239,tocIndex:20},{value:`exposedObject = initializeBean(beanName, exposedObject, mbd);
`,paraId:240,tocIndex:20},{value:"aware \u7CFB\u5217\u63A5\u53E3\u7684\u56DE\u8C03\u4F4D\u4E8E initializeBean \u4E2D\u7684 invokeAwareMethods \u65B9\u6CD5\uFF1A",paraId:241,tocIndex:20},{value:`BeanPostProcessor \u7684 postProcessBeforeInitialization \u65B9\u6CD5invokeAwareMethods(beanName, bean);
private void invokeAwareMethods(final String beanName, final Object bean) {
    //\u68C0\u67E5\u662F\u5426\u5B9E\u73B0 Aware \u63A5\u53E3
        if (bean instanceof Aware) {
            //\u8BBE\u7F6E BeanNameAware\uFF1A\u5982\u679C\u76EE\u6807 Bean \u5B9E\u73B0\u4E86 BeanNameAware \u63A5\u53E3\uFF0C\u90A3\u4E48\u8C03\u7528\u5B83\u7684 setBeanName() \u65B9\u6CD5\uFF0C\u5C06\u5F53\u524D Bean \u7684\u540D\u79F0\u4F20\u9012\u7ED9\u5B83
            if (bean instanceof BeanNameAware) {
                ((BeanNameAware) bean).setBeanName(beanName);
            }
            //\u8BBE\u7F6E BeanClassLoaderAware\uFF1A\u5982\u679C\u76EE\u6807 Bean \u5B9E\u73B0\u4E86 BeanClassLoaderAware \u63A5\u53E3\uFF0C\u90A3\u4E48\u8C03\u7528\u5B83\u7684 setBeanClassLoader() \u65B9\u6CD5\uFF0C\u5C06\u5F53\u524D\u7EBF\u7A0B\u4E0A\u4E0B\u6587\u7684\u7C7B\u52A0\u8F7D\u5668\uFF08ClassLoader\uFF09\u4F20\u9012\u7ED9\u5B83\u3002\u8FD9\u6837\uFF0C\u8BE5 Bean \u5C31\u53EF\u4EE5\u83B7\u53D6\u5230\u81EA\u5DF1\u7684\u7C7B\u52A0\u8F7D\u5668\u3002
            if (bean instanceof BeanClassLoaderAware) {
                ClassLoader bcl = getBeanClassLoader();
                if (bcl != null) {
                    ((BeanClassLoaderAware) bean).setBeanClassLoader(bcl);
                }
            }
            //\u8BBE\u7F6E BeanFactoryAware\uFF1A\u5982\u679C\u76EE\u6807 Bean \u5B9E\u73B0\u4E86 BeanFactoryAware \u63A5\u53E3\uFF0C\u90A3\u4E48\u8C03\u7528\u5B83\u7684 setBeanFactory() \u65B9\u6CD5\uFF0C\u5C06\u5F53\u524D\u5BB9\u5668\u7684 BeanFactory \u5B9E\u4F8B\u4F20\u9012\u7ED9\u5B83\u3002\u8FD9\u6837\uFF0C\u8BE5 Bean \u5C31\u53EF\u4EE5\u83B7\u53D6\u5230\u6240\u5728\u7684\u5BB9\u5668
            if (bean instanceof BeanFactoryAware) {
                ((BeanFactoryAware) bean).setBeanFactory(AbstractAutowireCapableBeanFactory.this);
            }
        }
    }
`,paraId:242,tocIndex:20},{value:"BeanPostProcessor \u7684 postProcessBeforeInitialization \u65B9\u6CD5\u4F4D\u4E8EinitializeBean \u7684applyBeanPostProcessorsBeforeInitialization\u65B9\u6CD5",paraId:243,tocIndex:20},{value:"\u8FD9\u6BB5\u4EE3\u7801\u662F\u5728 Bean \u521D\u59CB\u5316\u4E4B\u524D\u5E94\u7528 BeanPostProcessor \u7684\u65B9\u6CD5",paraId:244,tocIndex:20},{value:`if (mbd == null || !mbd.isSynthetic()) {
            wrappedBean = applyBeanPostProcessorsBeforeInitialization(wrappedBean, beanName);
        }
    @Override
    public Object applyBeanPostProcessorsBeforeInitialization(Object existingBean, String beanName)
            throws BeansException {
 
        Object result = existingBean;
        //\u9996\u5148\uFF0C\u901A\u8FC7 getBeanPostProcessors() \u65B9\u6CD5\u83B7\u53D6\u5BB9\u5668\u4E2D\u6240\u6709\u7684 BeanPostProcessor
        for (BeanPostProcessor processor : getBeanPostProcessors()) {
            //\u5FAA\u73AF\u5904\u7406\u3002\u5BF9\u4E8E\u6BCF\u4E2A BeanPostProcessor\uFF0C\u90FD\u4F1A\u8C03\u7528\u5B83\u7684 postProcessBeforeInitialization() \u65B9\u6CD5\uFF0C\u5E76\u4F20\u5165\u5F53\u524D\u7684 Bean \u5B9E\u4F8B\u548C Bean \u7684\u540D\u79F0
            //\u5728\u8C03\u7528 postProcessBeforeInitialization() \u65B9\u6CD5\u540E\uFF0C\u4F1A\u5F97\u5230\u4E00\u4E2A\u5904\u7406\u7ED3\u679C current\u3002\u5982\u679C\u5904\u7406\u7ED3\u679C\u4E3A null\uFF0C\u8BF4\u660E\u8BE5 BeanPostProcessor \u5DF2\u7ECF\u5904\u7406\u5B8C\u6210\uFF0C\u76F4\u63A5\u8FD4\u56DE\u7ED3\u679C\uFF1B\u5426\u5219\uFF0C\u5C06\u5904\u7406\u7ED3\u679C\u8D4B\u503C\u7ED9 result\uFF0C\u7EE7\u7EED\u5904\u7406\u4E0B\u4E00\u4E2A BeanPostProcessor
            Object current = processor.postProcessBeforeInitialization(result, beanName);
            if (current == null) {
                return result;
            }
            result = current;
        }
        //\u6700\u7EC8\u8FD4\u56DE\u5904\u7406\u5B8C\u6210\u540E\u7684 Bean \u5B9E\u4F8B result
        return result;
    }
`,paraId:245,tocIndex:20},{value:"BeanPostProcessor \u7684 postProcessAfterInitialization \u65B9\u6CD5",paraId:246,tocIndex:20},{value:"\u540CpostProcessBeforeInitialization \u5DEE\u4E0D\u591A",paraId:247,tocIndex:20},{value:"afterPropertiesSet \u548C init-method",paraId:248,tocIndex:20},{value:"afterPropertiesSet",paraId:249,tocIndex:20},{value:" \u65B9\u6CD5\u662F ",paraId:249,tocIndex:20},{value:"InitializingBean",paraId:249,tocIndex:20},{value:" \u63A5\u53E3\u4E2D\u5B9A\u4E49\u7684\u4E00\u4E2A\u65B9\u6CD5\uFF0C\u7528\u4E8E\u5728 Bean \u7684\u6240\u6709\u5C5E\u6027\u88AB\u8BBE\u7F6E\u4E4B\u540E\uFF0C\u8FDB\u884C\u4E00\u4E9B\u989D\u5916\u7684\u521D\u59CB\u5316\u64CD\u4F5C\u3002\u901A\u5E38\u60C5\u51B5\u4E0B\uFF0C\u5F53 Spring \u5BB9\u5668\u5B9E\u4F8B\u5316 Bean\uFF0C\u5E76\u5C06\u5176\u6240\u6709\u5C5E\u6027\u8BBE\u7F6E\u5B8C\u6210\u540E\uFF0C\u4F1A\u8C03\u7528\u8BE5\u65B9\u6CD5\u3002",paraId:249,tocIndex:20},{value:"afterPropertiesSet init-method \u4F4D\u4E8E initializeBean \u4E2D\u7684invokeInitMethods\u65B9\u6CD5\u4E2D",paraId:250,tocIndex:20},{value:"\u8FD9\u91CC\u9762\u8C03\u7528\u4E86\u4E24\u4E2A\u65B9\u6CD5\uFF0C\u4E00\u4E2A\u662F afterPropertiesSet \u65B9\u6CD5\uFF0C\u4E00\u4E2A\u662F init-method \u65B9\u6CD5\uFF1A",paraId:251,tocIndex:20},{value:"invokeCustomInitMethod",paraId:252,tocIndex:20},{value:" \u65B9\u6CD5\u7528\u4E8E\u8C03\u7528\u81EA\u5B9A\u4E49\u7684\u521D\u59CB\u5316\u65B9\u6CD5\uFF0C\u5373\u5728 BeanDefinition \u4E2D\u901A\u8FC7 ",paraId:252,tocIndex:20},{value:"init-method",paraId:252,tocIndex:20},{value:" \u5C5E\u6027\u6307\u5B9A\u7684\u521D\u59CB\u5316\u65B9\u6CD5\u3002\u8FD9\u4E2A\u65B9\u6CD5\u5728 ",paraId:252,tocIndex:20},{value:"invokeInitMethods",paraId:252,tocIndex:20},{value:" \u65B9\u6CD5\u4E2D\u88AB\u8C03\u7528\u3002",paraId:252,tocIndex:20},{value:"\u7B2C\u4E8C\u79CD\u5B9A\u4E49\u521D\u59CB\u5316\u903B\u8F91\u7684\u65B9\u6CD5",paraId:253,tocIndex:20},{value:`((InitializingBean) bean).afterPropertiesSet();
invokeCustomInitMethod(beanName, bean, mbd);
`,paraId:254,tocIndex:20},{value:"12. finishRefresh()",paraId:21},{value:"refresh \u505A\u5B8C\u4E4B\u540E\u9700\u8981\u505A\u7684\u5176\u4ED6\u4E8B\u60C5\u3002",paraId:255,tocIndex:21},{value:"\u6E05\u9664\u4E0A\u4E0B\u6587\u8D44\u6E90\u7F13\u5B58\uFF08\u5982\u626B\u63CF\u4E2D\u7684 ASM \u5143\u6570\u636E\uFF09",paraId:256,tocIndex:21},{value:"\u521D\u59CB\u5316\u4E0A\u4E0B\u6587\u7684\u751F\u547D\u5468\u671F\u5904\u7406\u5668\uFF0C\u5E76\u5237\u65B0\uFF08\u627E\u51FA Spring \u5BB9\u5668\u4E2D\u5B9E\u73B0\u4E86 Lifecycle \u63A5\u53E3\u7684 bean \u5E76\u6267\u884C start () \u65B9\u6CD5\uFF09\u3002",paraId:257,tocIndex:21},{value:"\u53D1\u5E03 ContextRefreshedEvent \u4E8B\u4EF6\u544A\u77E5\u5BF9\u5E94\u7684 ApplicationListener \u8FDB\u884C\u54CD\u5E94\u7684\u64CD\u4F5C",paraId:258,tocIndex:21},{value:`protected void finishRefresh() {
    // 1.\u4E3A\u6B64\u4E0A\u4E0B\u6587\u521D\u59CB\u5316\u751F\u547D\u5468\u671F\u5904\u7406\u5668
    initLifecycleProcessor();

    // 2.\u9996\u5148\u5C06\u5237\u65B0\u5B8C\u6BD5\u4E8B\u4EF6\u4F20\u64AD\u5230\u751F\u547D\u5468\u671F\u5904\u7406\u5668\uFF08\u89E6\u53D1isAutoStartup\u65B9\u6CD5\u8FD4\u56DEtrue\u7684SmartLifecycle\u7684start\u65B9\u6CD5\uFF09
    getLifecycleProcessor().onRefresh();

    // 3.\u63A8\u9001\u4E0A\u4E0B\u6587\u5237\u65B0\u5B8C\u6BD5\u4E8B\u4EF6\u5230\u76F8\u5E94\u7684\u76D1\u542C\u5668
    publishEvent(new ContextRefreshedEvent(this));

    LiveBeansView.registerApplicationContext(this);
`,paraId:259,tocIndex:21},{value:"Spring Bean \u7684\u751F\u547D\u5468\u671F",paraId:21},{value:"Spring In Action \u4EE5\u53CA\u5E02\u9762\u4E0A\u6D41\u4F20\u7684\u5927\u90E8\u5206\u535A\u5BA2\u662F\u8FD9\u6837\u7684\uFF1A",paraId:260,tocIndex:22},{value:"\u5B9E\u4F8B\u5316 Bean \u5BF9\u8C61\uFF0C\u8FD9\u4E2A\u65F6\u5019 Bean \u7684\u5BF9\u8C61\u662F\u975E\u5E38\u4F4E\u7EA7\u7684\uFF0C\u57FA\u672C\u4E0D\u80FD\u591F\u88AB\u6211\u4EEC\u4F7F\u7528\uFF0C\u56E0\u4E3A\u8FDE\u6700\u57FA\u672C\u7684\u5C5E\u6027\u90FD\u6CA1\u6709\u8BBE\u7F6E\uFF0C\u53EF\u4EE5\u7406\u89E3\u4E3A\u8FDE Autowired \u6CE8\u89E3\u90FD\u662F\u6CA1\u6709\u89E3\u6790\u7684\uFF1B",paraId:261,tocIndex:22},{value:"\u586B\u5145\u5C5E\u6027\uFF0C\u5F53\u505A\u5B8C\u8FD9\u4E00\u6B65\uFF0CBean \u5BF9\u8C61\u57FA\u672C\u662F\u5B8C\u6574\u7684\u4E86\uFF0C\u53EF\u4EE5\u7406\u89E3\u4E3A Autowired \u6CE8\u89E3\u5DF2\u7ECF\u89E3\u6790\u5B8C\u6BD5\uFF0C\u4F9D\u8D56\u6CE8\u5165\u5B8C\u6210\u4E86\uFF1B",paraId:262,tocIndex:22},{value:"\u5982\u679C Bean \u5B9E\u73B0\u4E86 BeanNameAware \u63A5\u53E3\uFF0C\u5219\u8C03\u7528 setBeanName \u65B9\u6CD5\uFF1B",paraId:263,tocIndex:22},{value:"\u5982\u679C Bean \u5B9E\u73B0\u4E86 BeanClassLoaderAware \u63A5\u53E3\uFF0C\u5219\u8C03\u7528 setBeanClassLoader \u65B9\u6CD5\uFF1B",paraId:264,tocIndex:22},{value:"\u5982\u679C Bean \u5B9E\u73B0\u4E86 BeanFactoryAware \u63A5\u53E3\uFF0C\u5219\u8C03\u7528 setBeanFactory \u65B9\u6CD5\uFF1B",paraId:265,tocIndex:22},{value:"\u8C03\u7528 BeanPostProcessor \u7684 postProcessBeforeInitialization \u65B9\u6CD5\uFF1B",paraId:266,tocIndex:22},{value:"\u5982\u679C Bean \u5B9E\u73B0\u4E86 InitializingBean \u63A5\u53E3\uFF0C\u8C03\u7528 afterPropertiesSet \u65B9\u6CD5\uFF1B",paraId:267,tocIndex:22},{value:"\u5982\u679C Bean \u5B9A\u4E49\u4E86 init-method \u65B9\u6CD5\uFF0C\u5219\u8C03\u7528 Bean \u7684 init-method \u65B9\u6CD5\uFF1B",paraId:268,tocIndex:22},{value:"\u8C03\u7528 BeanPostProcessor \u7684 postProcessAfterInitialization \u65B9\u6CD5\uFF1B\u5F53\u8FDB\u884C\u5230\u8FD9\u4E00\u6B65\uFF0CBean \u5DF2\u7ECF\u88AB\u51C6\u5907\u5C31\u7EEA\u4E86\uFF0C\u4E00\u76F4\u505C\u7559\u5728\u5E94\u7528\u7684\u4E0A\u4E0B\u6587\u4E2D\uFF0C\u76F4\u5230\u88AB\u9500\u6BC1\uFF1B",paraId:269,tocIndex:22},{value:"\u5982\u679C\u5E94\u7528\u7684\u4E0A\u4E0B\u6587\u88AB\u9500\u6BC1\u4E86\uFF0C\u5982\u679C Bean \u5B9E\u73B0\u4E86 DisposableBean \u63A5\u53E3\uFF0C\u5219\u8C03\u7528 destroy \u65B9\u6CD5\uFF0C\u5982\u679C Bean \u5B9A\u4E49\u4E86 destory-method \u58F0\u660E\u4E86\u9500\u6BC1\u65B9\u6CD5\u4E5F\u4F1A\u88AB\u8C03\u7528\u3002",paraId:270,tocIndex:22}]}}]);
