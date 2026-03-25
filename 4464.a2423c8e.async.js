"use strict";(self.webpackChunkblog=self.webpackChunkblog||[]).push([[4464],{34464:function(a,t,e){e.r(t),e.d(t,{texts:function(){return n}});const n=[{value:"ConfigurationClassPostProcessor \u4E2D\u7684 processConfigBeanDefinitions \u65B9\u6CD5\u5341\u5206\u91CD\u8981\uFF0C\u4E3B\u8981\u662F\u5B8C\u6210\u626B\u63CF\uFF0C\u6700\u7EC8\u6CE8\u518C\u6211\u4EEC\u5B9A\u4E49\u7684 Bean\u3002",paraId:0,tocIndex:0},{value:"\u8FD9\u4E00\u6B65\u5176\u5B9E\u5C31\u662F\u6267\u884C ConfigurationClassPostProcessor \u4E2D\u7684 ",paraId:1,tocIndex:1},{value:"postProcessBeanDefinitionRegistry",paraId:1,tocIndex:1},{value:" \u65B9\u6CD5",paraId:1,tocIndex:1},{value:`invokeBeanDefinitionRegistryPostProcessors(priorityOrderedPostProcessors, registry);
`,paraId:2,tocIndex:1},{value:"\u5C06\u5B9E\u73B0\u4E86",paraId:3,tocIndex:1},{value:"priorityOrder\u63A5\u53E3",paraId:3,tocIndex:1},{value:"\u7684\u5904\u7406\u5668",paraId:3,tocIndex:1},{value:"\u9700\u8981\u6392\u5728\u6700\u524D\u9762\u6267\u884C\u7684PostProcessor",paraId:3,tocIndex:1},{value:"\u5217\u8868\uFF0C\uFF08\u5176\u5B9E\u91CC\u9762\u5C31\u4E00\u4E2AConfigurationClassPostProcessor\uFF09\uFF0C\u548Cregistry ",paraId:3,tocIndex:1},{value:"beanFactory",paraId:3,tocIndex:1},{value:"\u4F5C\u4E3A\u4E24\u4E2A\u53C2\u6570\u4F20\u5165\u8FD9\u4E2A\u65B9\u6CD5",paraId:3,tocIndex:1},{value:`private static void invokeBeanDefinitionRegistryPostProcessors(Collection<? extends BeanDefinitionRegistryPostProcessor> postProcessors, BeanDefinitionRegistry registry) {
    Iterator var2 = postProcessors.iterator();
    while(var2.hasNext()) {
        BeanDefinitionRegistryPostProcessor postProcessor = (BeanDefinitionRegistryPostProcessor)var2.next();
        postProcessor.postProcessBeanDefinitionRegistry(registry);
    }

}
`,paraId:4,tocIndex:2},{value:"\u4E2D\u8F6C\u65B9\u6CD5\uFF0C\u83B7\u53D6priorityOrderedPostProcessors\u5217\u8868\u4E2D\u7684postProcessors\uFF08\u8FD9\u91CC\u5C31\u4E00\u4E2A\uFF09\uFF0C\u7136\u540E\u6267\u884C\u5B83\u7EE7\u627F\u81EA",paraId:5,tocIndex:2},{value:"BeanDefinitionRegistryPostProcessor",paraId:5,tocIndex:2},{value:"\u5B9E\u73B0\u7684",paraId:5,tocIndex:2},{value:"postProcessBeanDefinitionRegistry",paraId:5,tocIndex:2},{value:"\u65B9\u6CD5",paraId:5,tocIndex:2},{value:"\u70B9\u51FB\u8FDB\u5165postProcessBeanDefinitionRegistry\u65B9\u6CD5\uFF0C\u627E\u5230ConfigurationClassPostProcessor\u5B9E\u73B0",paraId:6,tocIndex:2},{value:`public void postProcessBeanDefinitionRegistry(BeanDefinitionRegistry registry) {
	...
    if (this.registriesPostProcessed.contains(registryId)) {
        throw new IllegalStateException("postProcessBeanDefinitionRegistry already called on this post-processor against " + registry);
    } else if (this.factoriesPostProcessed.contains(registryId)) {
        throw new IllegalStateException("postProcessBeanFactory already called on this post-processor against " + registry);
    } else {
        this.registriesPostProcessed.add(registryId);
        this.processConfigBeanDefinitions(registry);
    }
}
`,paraId:7,tocIndex:3},{value:"\u70B9\u51FB\u8FDB\u5165",paraId:8,tocIndex:3},{value:`this.processConfigBeanDefinitions(registry)
`,paraId:9,tocIndex:3},{value:`	public void processConfigBeanDefinitions(BeanDefinitionRegistry registry) {
		List<BeanDefinitionHolder> configCandidates = new ArrayList<>();
        //\u83B7\u5F97\u6240\u6709\u7684BeanDefinition\u7684Name\uFF0C\u653E\u5165candidateNames\u6570\u7EC4
		String[] candidateNames = registry.getBeanDefinitionNames();
        
		//\u5FAA\u73AFcandidateNames\u6570\u7EC4
		for (String beanName : candidateNames) {
			BeanDefinition beanDef = registry.getBeanDefinition(beanName);//\u6839\u636EbeanName\u83B7\u5F97BeanDefinition
 
			// \u5185\u90E8\u6709\u4E24\u4E2A\u6807\u8BB0\u4F4D\u6765\u6807\u8BB0\u662F\u5426\u5DF2\u7ECF\u5904\u7406\u8FC7\u4E86
			if (ConfigurationClassUtils.isFullConfigurationClass(beanDef) ||
					ConfigurationClassUtils.isLiteConfigurationClass(beanDef)) {
				if (logger.isDebugEnabled()) {
					logger.debug("Bean definition has already been processed as a configuration class: " + beanDef);
				}
			}
 
			else if (ConfigurationClassUtils.checkConfigurationClassCandidate(beanDef, this.metadataReaderFactory)) {
				configCandidates.add(new BeanDefinitionHolder(beanDef, beanName));
			}
		}
 
		if (configCandidates.isEmpty()) {
			return;
		}
 
		configCandidates.sort((bd1, bd2) -> {
			int i1 = ConfigurationClassUtils.getOrder(bd1.getBeanDefinition());
			int i2 = ConfigurationClassUtils.getOrder(bd2.getBeanDefinition());
			return Integer.compare(i1, i2);
		});
 
		SingletonBeanRegistry sbr = null;
		//\u5B83\u68C0\u67E5\u4F20\u5165\u7684 registry \u662F\u5426\u662F SingletonBeanRegistry \u7684\u5B9E\u4F8B\uFF0C\u56E0\u4E3A DefaultListableBeanFactory \u6700\u7EC8\u5B9E\u73B0\u4E86 SingletonBeanRegistry \u63A5\u53E3\u3002\u8FD9\u4E2A\u63A5\u53E3\u7528\u4E8E\u7BA1\u7406\u5355\u4F8B\u5BF9\u8C61\u7684\u6CE8\u518C
        //\u5982\u679C\u662F SingletonBeanRegistry \u7684\u5B9E\u4F8B\uFF0C\u5C31\u5C06\u5176\u5F3A\u5236\u8F6C\u6362\u4E3A SingletonBeanRegistry \u7C7B\u578B\u7684sbr\uFF0C\u5E76\u5728\u63A5\u4E0B\u6765\u7684\u4EE3\u7801\u4E2D\u4F7F\u7528
		if (registry instanceof SingletonBeanRegistry) {
			sbr = (SingletonBeanRegistry) registry;
			if (!this.localBeanNameGeneratorSet) {
		//spring\u4E2D\u53EF\u4EE5\u4FEE\u6539\u9ED8\u8BA4\u7684bean\u547D\u540D\u65B9\u5F0F\uFF0C\u8FD9\u91CC\u5C31\u662F\u770B\u7528\u6237\u6709\u6CA1\u6709\u81EA\u5B9A\u4E49bean\u547D\u540D\u65B9\u5F0F\uFF0C\u867D\u7136\u4E00\u822C\u6CA1\u6709\u4EBA\u4F1A\u8FD9\u4E48\u505A
        //\u5B83\u68C0\u67E5\u662F\u5426\u5DF2\u7ECF\u8BBE\u7F6E\u4E86\u81EA\u5B9A\u4E49\u7684 bean \u547D\u540D\u751F\u6210\u5668\uFF08BeanNameGenerator\uFF09\u3002\u5982\u679C\u6CA1\u6709\u8BBE\u7F6E\uFF0C\u5B83\u4F1A\u5C1D\u8BD5\u4ECE SingletonBeanRegistry \u4E2D\u83B7\u53D6\u4E00\u4E2A bean \u547D\u540D\u751F\u6210\u5668\u3002\u8FD9\u4E2A bean \u547D\u540D\u751F\u6210\u5668\u4E3B\u8981\u7528\u4E8E\u4E3A\u88AB\u626B\u63CF\u5230\u7684\u7EC4\u4EF6\u751F\u6210\u9ED8\u8BA4\u7684 bean \u540D\u79F0\u3002\u5982\u679C\u7528\u6237\u6CA1\u6709\u81EA\u5B9A\u4E49\uFF0C\u5219\u4F1A\u4F7F\u7528\u9ED8\u8BA4\u7684\u751F\u6210\u5668\u3002\u5982\u679C\u627E\u5230\u4E86\u81EA\u5B9A\u4E49\u7684 bean \u547D\u540D\u751F\u6210\u5668\uFF0C\u5219\u5C06\u5176\u8BBE\u7F6E\u4E3A componentScanBeanNameGenerator \u548C importBeanNameGenerator
				BeanNameGenerator generator = (BeanNameGenerator) sbr.getSingleton(CONFIGURATION_BEAN_NAME_GENERATOR);
				if (generator != null) {
					this.componentScanBeanNameGenerator = generator;
					this.importBeanNameGenerator = generator;
				}
			}
		}
 		//\u5982\u679C\u5F53\u524D\u73AF\u5883\u5BF9\u8C61 environment \u4E3A null\uFF0C\u5219\u4F1A\u521B\u5EFA\u4E00\u4E2A\u6807\u51C6\u7684\u73AF\u5883\u5BF9\u8C61 StandardEnvironment
		if (this.environment == null) {
			this.environment = new StandardEnvironment();
		}
 		//new\u4E00\u4E2A\u5BF9\u8C61\u89E3\u6790\u914D\u7F6E\u7C7BConfigurationClassParser
		ConfigurationClassParser parser = new ConfigurationClassParser(
				this.metadataReaderFactory, this.problemReporter, this.environment,
				this.resourceLoader, this.componentScanBeanNameGenerator, registry);
 
		Set<BeanDefinitionHolder> candidates = new LinkedHashSet<>(configCandidates);
		Set<ConfigurationClass> alreadyParsed = new HashSet<>(configCandidates.size());
		do {
			//\u89E3\u6790\u914D\u7F6E\u7C7B\uFF08\u4F20\u7EDF\u610F\u4E49\u4E0A\u7684\u914D\u7F6E\u7C7B\u6216\u8005\u662F\u666E\u901Abean\uFF0C\u6838\u5FC3\u6765\u4E86\uFF09
			parser.parse(candidates);
			parser.validate();
 
			Set<ConfigurationClass> configClasses = new LinkedHashSet<>(parser.getConfigurationClasses());
			configClasses.removeAll(alreadyParsed);
 
			// Read the model and create bean definitions based on its content
			if (this.reader == null) {
				this.reader = new ConfigurationClassBeanDefinitionReader(
						registry, this.sourceExtractor, this.resourceLoader, this.environment,
						this.importBeanNameGenerator, parser.getImportRegistry());
			}
			this.reader.loadBeanDefinitions(configClasses);//\u76F4\u5230\u8FD9\u4E00\u6B65\u624D\u628AImport\u7684\u7C7B\uFF0C@Bean @ImportRosource \u8F6C\u6362\u6210BeanDefinition
			alreadyParsed.addAll(configClasses);//\u628AconfigClasses\u52A0\u5165\u5230alreadyParsed\uFF0C\u4EE3\u8868
 
			candidates.clear();
			//\u83B7\u5F97\u6CE8\u518C\u5668\u91CC\u9762BeanDefinition\u7684\u6570\u91CF \u548C candidateNames\u8FDB\u884C\u6BD4\u8F83
			//\u5982\u679C\u5927\u4E8E\u7684\u8BDD\uFF0C\u8BF4\u660E\u6709\u65B0\u7684BeanDefinition\u6CE8\u518C\u8FDB\u6765\u4E86
			if (registry.getBeanDefinitionCount() > candidateNames.length) {
				String[] newCandidateNames = registry.getBeanDefinitionNames();//\u4ECE\u6CE8\u518C\u5668\u91CC\u9762\u83B7\u5F97BeanDefinitionNames
				Set<String> oldCandidateNames = new HashSet<>(Arrays.asList(candidateNames));//candidateNames\u8F6C\u6362set
				Set<String> alreadyParsedClasses = new HashSet<>();
				//\u5FAA\u73AFalreadyParsed\u3002\u628A\u7C7B\u540D\u52A0\u5165\u5230alreadyParsedClasses
				for (ConfigurationClass configurationClass : alreadyParsed) {
					alreadyParsedClasses.add(configurationClass.getMetadata().getClassName());
				}
				for (String candidateName : newCandidateNames) {
					if (!oldCandidateNames.contains(candidateName)) {
						BeanDefinition bd = registry.getBeanDefinition(candidateName);
						if (ConfigurationClassUtils.checkConfigurationClassCandidate(bd, this.metadataReaderFactory) &&
								!alreadyParsedClasses.contains(bd.getBeanClassName())) {
							candidates.add(new BeanDefinitionHolder(bd, candidateName));
						}
					}
				}
				candidateNames = newCandidateNames;
			}
		}
		while (!candidates.isEmpty());
 
		if (sbr != null && !sbr.containsSingleton(IMPORT_REGISTRY_BEAN_NAME)) {
			sbr.registerSingleton(IMPORT_REGISTRY_BEAN_NAME, parser.getImportRegistry());
		}
 
		if (this.metadataReaderFactory instanceof CachingMetadataReaderFactory) {
			((CachingMetadataReaderFactory) this.metadataReaderFactory).clearCache();
		}
	}
`,paraId:10,tocIndex:3},{value:"\u83B7\u5F97\u6240\u6709\u7684 BeanName\uFF0C\u653E\u5165 candidateNames \u6570\u7EC4\u3002",paraId:11,tocIndex:3},{value:"\u7B2C\u4E00\u6B21\u6267\u884C\u65F6registry",paraId:12,tocIndex:3},{value:"beanFactory",paraId:12,tocIndex:3},{value:"\u91CC\u9762\u53EA\u6709MainConfig\u8FD9\u4E2A\u914D\u7F6E\u7C7B\u7684Bean",paraId:12,tocIndex:3},{value:`String[] candidateNames = registry.getBeanDefinitionNames();
`,paraId:13,tocIndex:3},{value:"\u5FAA\u73AF candidateNames \u6570\u7EC4\uFF0C\u6839\u636E beanName \u83B7\u5F97 BeanDefinition\uFF0C\u5224\u65AD\u6B64 BeanDefinition \u662F\u5426\u5DF2\u7ECF\u88AB\u5904\u7406\u8FC7\u4E86\u3002",paraId:14,tocIndex:3},{value:"\u5224\u65AD\u662F\u5426\u662F\u914D\u7F6E\u7C7B\uFF0C\u5982\u679C\u662F\u7684\u8BDD\u3002\u52A0\u5165\u5230 configCandidates \u6570\u7EC4\uFF0C\u5728\u5224\u65AD\u7684\u65F6\u5019\uFF0C\u8FD8\u4F1A\u6807\u8BB0\u914D\u7F6E\u7C7B\u5C5E\u4E8E Full \u914D\u7F6E\u7C7B\uFF0C\u8FD8\u662F Lite \u914D\u7F6E\u7C7B\uFF0C\u8FD9\u91CC\u4F1A\u5F15\u53D1\u4E00\u8FDE\u4E32\u7684\u77E5\u8BC6\u76F2\u70B9\uFF1A",paraId:15,tocIndex:3},{value:`else if (ConfigurationClassUtils.checkConfigurationClassCandidate(beanDef, this.metadataReaderFactory)) {
	configCandidates.add(new BeanDefinitionHolder(beanDef, beanName));
}
`,paraId:16,tocIndex:3},{value:"\u5F53\u6211\u4EEC\u6CE8\u518C\u914D\u7F6E\u7C7B\u7684\u65F6\u5019\uFF0C\u53EF\u4EE5\u4E0D\u52A0 @Configuration \u6CE8\u89E3\uFF0C\u76F4\u63A5\u4F7F\u7528 ",paraId:17,tocIndex:3},{value:"@Component @ComponentScan @Import@ImportResource \u7B49\u6CE8\u89E3",paraId:17,tocIndex:3},{value:"\uFF0CSpring \u628A\u8FD9\u79CD\u914D\u7F6E\u7C7B\u79F0\u4E4B\u4E3A ",paraId:17,tocIndex:3},{value:"Lite \u914D\u7F6E\u7C7B",paraId:17,tocIndex:3},{value:"\uFF0C \u5982\u679C\u52A0\u4E86 ",paraId:17,tocIndex:3},{value:"@Configuration \u6CE8\u89E3\uFF0C\u5C31\u79F0\u4E4B\u4E3A Full \u914D\u7F6E\u7C7B",paraId:17,tocIndex:3},{value:"\u3002",paraId:17,tocIndex:3},{value:"\u5982\u679C\u6211\u4EEC\u6CE8\u518C\u4E86 Lite \u914D\u7F6E\u7C7B\uFF0C\u6211\u4EEC getBean \u8FD9\u4E2A\u914D\u7F6E\u7C7B\uFF0C\u4F1A\u53D1\u73B0\u5B83\u5C31\u662F\u539F\u672C\u7684\u90A3\u4E2A\u914D\u7F6E\u7C7B\uFF0C",paraId:17,tocIndex:3},{value:"\u5982\u679C\u6211\u4EEC\u6CE8\u518C\u4E86 Full \u914D\u7F6E\u7C7B\uFF0C\u6211\u4EEC getBean \u8FD9\u4E2A\u914D\u7F6E\u7C7B\uFF0C\u4F1A\u53D1\u73B0\u5B83\u5DF2\u7ECF\u4E0D\u662F\u539F\u672C\u90A3\u4E2A\u914D\u7F6E\u7C7B\u4E86\uFF0C\u800C\u662F\u5DF2\u7ECF\u88AB cgilb \u4EE3\u7406\u7684\u7C7B\u4E86",paraId:17,tocIndex:3},{value:"\u5199\u4E00\u4E2A A \u7C7B\uFF0C\u5176\u4E2D\u6709\u4E00\u4E2A\u6784\u9020\u65B9\u6CD5\uFF0C\u6253\u5370\u51FA \u201C\u4F60\u597D\u201D\uFF0C\u518D\u5199\u4E00\u4E2A\u914D\u7F6E\u7C7B\uFF0C\u91CC\u9762\u6709\u4E24\u4E2A\u88AB @bean \u6CE8\u89E3\u7684\u65B9\u6CD5\uFF0C\u5176\u4E2D\u4E00\u4E2A\u65B9\u6CD5 new \u4E86 A \u7C7B\uFF0C\u5E76\u4E14\u8FD4\u56DE A \u7684\u5BF9\u8C61\uFF0C\u628A\u6B64\u65B9\u6CD5\u79F0\u4E4B\u4E3A getA\uFF0C\u7B2C\u4E8C\u4E2A\u65B9\u6CD5\u53C8\u8C03\u7528\u4E86 getA \u65B9\u6CD5\uFF0C\u5982\u679C\u914D\u7F6E\u7C7B\u662F Lite \u914D\u7F6E\u7C7B\uFF0C\u4F1A\u53D1\u73B0\u6253\u5370\u4E86\u4E24\u6B21 \u201C\u4F60\u597D\u201D\uFF0C\u4E5F\u5C31\u662F\u8BF4 A \u7C7B\u88AB new \u4E86\u4E24\u6B21\uFF0C\u5982\u679C\u914D\u7F6E\u7C7B\u662F Full \u914D\u7F6E\u7C7B\uFF0C\u4F1A\u53D1\u73B0\u53EA\u6253\u5370\u4E86\u4E00\u6B21 \u201C\u4F60\u597D\u201D\uFF0C\u4E5F\u5C31\u662F\u8BF4 A \u7C7B\u53EA\u88AB new \u4E86\u4E00\u6B21\uFF0C\u56E0\u4E3A\u8FD9\u4E2A\u7C7B\u88AB cgilb \u4EE3\u7406\u4E86\uFF0C\u65B9\u6CD5\u5DF2\u7ECF\u88AB\u6539\u5199\u3002",paraId:17,tocIndex:3},{value:"\u8FD9\u4E5F\u662F\u52A0\u4E0D\u52A0Configuration\u6CE8\u89E3\u7684\u533A\u522B\u4E4B\u4E00",paraId:17,tocIndex:3},{value:"\u5982\u679C\u6CA1\u6709\u914D\u7F6E\u7C7B\u76F4\u63A5\u8FD4\u56DE\u3002",paraId:18,tocIndex:3},{value:`if (configCandidates.isEmpty()) {
    return;
}
`,paraId:19,tocIndex:3},{value:"\u5904\u7406\u6392\u5E8F\u3002",paraId:20,tocIndex:3},{value:`configCandidates.sort((bd1, bd2) -> {
    int i1 = ConfigurationClassUtils.getOrder(bd1.getBeanDefinition());
    int i2 = ConfigurationClassUtils.getOrder(bd2.getBeanDefinition());
    return Integer.compare(i1, i2);
});
`,paraId:21,tocIndex:3},{value:"\u89E3\u6790\u914D\u7F6E\u7C7B\uFF08\u4F20\u7EDF\u610F\u4E49\u4E0A\u7684\u914D\u7F6E\u7C7B\u6216\u8005\u662F\u666E\u901Abean\uFF09\uFF0C\u53EF\u80FD\u662F Full \u914D\u7F6E\u7C7B\uFF0C\u4E5F\u6709\u53EF\u80FD\u662F Lite \u914D\u7F6E\u7C7B\uFF0C\u8FD9\u4E2A\u5C0F\u65B9\u6CD5\u662F\u6B64\u65B9\u6CD5\u7684\u6838\u5FC3\u3002",paraId:22,tocIndex:3},{value:"\u5728\u7B2C 6 \u6B65\u7684\u65F6\u5019\uFF0C\u53EA\u662F\u6CE8\u518C\u4E86\u90E8\u5206 Bean\uFF0C\u50CF @Import @Bean \u7B49\uFF0C\u662F\u6CA1\u6709\u88AB\u6CE8\u518C\u7684\uFF0C\u8FD9\u91CC\u7EDF\u4E00\u5BF9\u8FD9\u4E9B\u8FDB\u884C\u6CE8\u518C\u3002",paraId:23,tocIndex:3},{value:"\u4E0B\u9762\u662F\u89E3\u6790\u914D\u7F6E\u7C7B\u7684\u8FC7\u7A0B\uFF1A",paraId:24,tocIndex:4},{value:`parser.parse(candidates)
`,paraId:25,tocIndex:4},{value:`	public void parse(Set<BeanDefinitionHolder> configCandidates) {
		this.deferredImportSelectors = new LinkedList<>();
		//\u5FAA\u73AF\u4F20\u8FDB\u6765\u7684\u914D\u7F6E\u7C7B
		for (BeanDefinitionHolder holder : configCandidates) {
            //\u83B7\u5F97BeanDefinition
			BeanDefinition bd = holder.getBeanDefinition();
			try {
				//\u5982\u679C\u83B7\u5F97BeanDefinition\u662FAnnotatedBeanDefinition\u7684\u5B9E\u4F8B
				if (bd instanceof AnnotatedBeanDefinition) {
					parse(((AnnotatedBeanDefinition) bd).getMetadata(), holder.getBeanName());
				} else if (bd instanceof AbstractBeanDefinition && ((AbstractBeanDefinition) bd).hasBeanClass()) {
					parse(((AbstractBeanDefinition) bd).getBeanClass(), holder.getBeanName());
				} else {
					parse(bd.getBeanClassName(), holder.getBeanName());
				}
			} catch (BeanDefinitionStoreException ex) {
				throw ex;
			} catch (Throwable ex) {
				throw new BeanDefinitionStoreException(
						"Failed to parse configuration class [" + bd.getBeanClassName() + "]", ex);
			}
		}
 
		//\u6267\u884CDeferredImportSelector
		processDeferredImportSelectors();
	}
`,paraId:26,tocIndex:4},{value:"\u56E0\u4E3A\u53EF\u4EE5\u6709\u591A\u4E2A\u914D\u7F6E\u7C7B\uFF0C\u6240\u4EE5\u9700\u8981\u5FAA\u73AF\u5904\u7406\u3002",paraId:27,tocIndex:4},{value:"\u6211\u4EEC\u7684\u914D\u7F6E\u7C7B\u7684 BeanDefinition \u662F AnnotatedBeanDefinition \u7684\u5B9E\u4F8B\uFF0C\u6240\u4EE5\u4F1A\u8FDB\u5165\u7B2C\u4E00\u4E2A if\uFF1A",paraId:28,tocIndex:4},{value:"\u70B9\u51FB\u8FDB\u5165 ",paraId:29,tocIndex:4},{value:"parse(((AnnotatedBeanDefinition) bd).getMetadata(), holder.getBeanName());",paraId:29,tocIndex:4},{value:`protected final void parse(AnnotationMetadata metadata, String beanName) throws IOException {
		processConfigurationClass(new ConfigurationClass(metadata, beanName));
	}
	protected void processConfigurationClass(ConfigurationClass configClass) throws IOException {
 
		//\u5224\u65AD\u662F\u5426\u9700\u8981\u8DF3\u8FC7
		if (this.conditionEvaluator.shouldSkip(configClass.getMetadata(), ConfigurationPhase.PARSE_CONFIGURATION)) {
			return;
		}
 
		ConfigurationClass existingClass = this.configurationClasses.get(configClass);
		if (existingClass != null) {
			if (configClass.isImported()) {
				if (existingClass.isImported()) {
					existingClass.mergeImportedBy(configClass);
				}
				return;
			} else {
				this.configurationClasses.remove(configClass);
				this.knownSuperclasses.values().removeIf(configClass::equals);
			}
		}
 
		SourceClass sourceClass = asSourceClass(configClass);
		do {
			sourceClass = doProcessConfigurationClass(configClass, sourceClass);
		}
		while (sourceClass != null);
 
		this.configurationClasses.put(configClass, configClass);
	}
`,paraId:30,tocIndex:4},{value:"\u91CD\u70B9\u5728\u4E8E ",paraId:31,tocIndex:4},{value:"doProcessConfigurationClass",paraId:31,tocIndex:4},{value:" \u65B9\u6CD5",paraId:31,tocIndex:4},{value:"\u9700\u8981\u7279\u522B\u6CE8\u610F\uFF0C\u6700\u540E\u4E00\u884C\u4EE3\u7801",paraId:32,tocIndex:4},{value:"this.configurationClasses.put(configClass, configClass);",paraId:32,tocIndex:4},{value:"\uFF0C\u4F1A\u628A configClass \u653E\u5165\u4E00\u4E2A Map\uFF0C\u4F1A\u5728\u4E0A\u9762\u7B2C 7 \u6B65\u4E2D\u7528\u5230",paraId:32,tocIndex:4},{value:"\u6765\u770B",paraId:33,tocIndex:5},{value:"doProcessConfigurationClass",paraId:33,tocIndex:5},{value:"\u65B9\u6CD5",paraId:33,tocIndex:5},{value:`	protected final SourceClass doProcessConfigurationClass(ConfigurationClass configClass, SourceClass sourceClass)
			throws IOException {
 
		//\u9012\u5F52\u5904\u7406\u5185\u90E8\u7C7B\uFF0C\u4E00\u822C\u4E0D\u4F1A\u5199\u5185\u90E8\u7C7B
		processMemberClasses(configClass, sourceClass);
 
		//\u5904\u7406@PropertySource\u6CE8\u89E3\uFF0C@PropertySource\u6CE8\u89E3\u7528\u6765\u52A0\u8F7Dproperties\u6587\u4EF6
		for (AnnotationAttributes propertySource : AnnotationConfigUtils.attributesForRepeatable(
				sourceClass.getMetadata(), PropertySources.class,
				org.springframework.context.annotation.PropertySource.class)) {
			if (this.environment instanceof ConfigurableEnvironment) {
				processPropertySource(propertySource);
			} else {
				logger.warn("Ignoring @PropertySource annotation on [" + sourceClass.getMetadata().getClassName() +
						"]. Reason: Environment must implement ConfigurableEnvironment");
			}
		}
 
		//\u83B7\u5F97ComponentScan\u6CE8\u89E3\u5177\u4F53\u7684\u5185\u5BB9\uFF0CComponentScan\u6CE8\u89E3\u9664\u4E86\u6700\u5E38\u7528\u7684basePackage\u4E4B\u5916\uFF0C\u8FD8\u6709includeFilters\uFF0CexcludeFilters\u7B49
		Set<AnnotationAttributes> componentScans = AnnotationConfigUtils.attributesForRepeatable(
				sourceClass.getMetadata(), ComponentScans.class, ComponentScan.class);
 
		//\u5982\u679C\u6CA1\u6709\u6253\u4E0AComponentScan\uFF0C\u6216\u8005\u88AB@Condition\u6761\u4EF6\u8DF3\u8FC7\uFF0C\u5C31\u4E0D\u518D\u8FDB\u5165\u8FD9\u4E2Aif
		if (!componentScans.isEmpty() &&
				!this.conditionEvaluator.shouldSkip(sourceClass.getMetadata(), ConfigurationPhase.REGISTER_BEAN)) {
			//\u5FAA\u73AF\u5904\u7406componentScans
			for (AnnotationAttributes componentScan : componentScans) {
				//componentScan\u5C31\u662F@ComponentScan\u4E0A\u7684\u5177\u4F53\u5185\u5BB9\uFF0CsourceClass.getMetadata().getClassName()\u5C31\u662F\u914D\u7F6E\u7C7B\u7684\u540D\u79F0
				Set<BeanDefinitionHolder> scannedBeanDefinitions =
						this.componentScanParser.parse(componentScan, sourceClass.getMetadata().getClassName());

				for (BeanDefinitionHolder holder : scannedBeanDefinitions) {
					BeanDefinition bdCand = holder.getBeanDefinition().getOriginatingBeanDefinition();
					if (bdCand == null) {
						bdCand = holder.getBeanDefinition();
					}
					if (ConfigurationClassUtils.checkConfigurationClassCandidate(bdCand, this.metadataReaderFactory)) {
						//\u9012\u5F52\u8C03\u7528\uFF0C\u56E0\u4E3A\u53EF\u80FD\u7EC4\u4EF6\u7C7B\u6709\u88AB@Bean\u6807\u8BB0\u7684\u65B9\u6CD5\uFF0C\u6216\u8005\u7EC4\u4EF6\u7C7B\u672C\u8EAB\u4E5F\u6709ComponentScan\u7B49\u6CE8\u89E3
						parse(bdCand.getBeanClassName(), holder.getBeanName());
					}
				}
			}
		}
 
		//\u5904\u7406@Import\u6CE8\u89E3
		//@Import\u6CE8\u89E3\u662Fspring\u4E2D\u5F88\u91CD\u8981\u7684\u4E00\u4E2A\u6CE8\u89E3\uFF0CSpringboot\u5927\u91CF\u5E94\u7528\u8FD9\u4E2A\u6CE8\u89E3
		//@Import\u4E09\u79CD\u7C7B\uFF0C\u4E00\u79CD\u662FImport\u666E\u901A\u7C7B\uFF0C\u4E00\u79CD\u662FImport ImportSelector\uFF0C\u8FD8\u6709\u4E00\u79CD\u662FImport ImportBeanDefinitionRegistrar
		//getImports(sourceClass)\u662F\u83B7\u5F97import\u7684\u5185\u5BB9\uFF0C\u8FD4\u56DE\u7684\u662F\u4E00\u4E2Aset
		processImports(configClass, sourceClass, getImports(sourceClass), true);
 
		// Process any @ImportResource annotations
		//\u5904\u7406@ImportResource\u6CE8\u89E3
		AnnotationAttributes importResource =
				AnnotationConfigUtils.attributesFor(sourceClass.getMetadata(), ImportResource.class);
		if (importResource != null) {
			String[] resources = importResource.getStringArray("locations");
			Class<? extends BeanDefinitionReader> readerClass = importResource.getClass("reader");
			for (String resource : resources) {
				String resolvedResource = this.environment.resolveRequiredPlaceholders(resource);
				configClass.addImportedResource(resolvedResource, readerClass);
			}
		}
 
		//\u5904\u7406@Bean\u7684\u65B9\u6CD5\uFF0C\u53EF\u4EE5\u770B\u5230\u83B7\u5F97\u4E86\u5E26\u6709@Bean\u7684\u65B9\u6CD5\u540E\uFF0C\u4E0D\u662F\u9A6C\u4E0A\u8F6C\u6362\u6210BeanDefinition\uFF0C\u800C\u662F\u5148\u7528\u4E00\u4E2Aset\u63A5\u6536
		Set<MethodMetadata> beanMethods = retrieveBeanMethodMetadata(sourceClass);
		for (MethodMetadata methodMetadata : beanMethods) {
			configClass.addBeanMethod(new BeanMethod(methodMetadata, configClass));
		}
        
		processInterfaces(configClass, sourceClass);
 
		if (sourceClass.getMetadata().hasSuperClass()) {
			String superclass = sourceClass.getMetadata().getSuperClassName();
			if (superclass != null && !superclass.startsWith("java") &&
					!this.knownSuperclasses.containsKey(superclass)) {
				this.knownSuperclasses.put(superclass, configClass);
				return sourceClass.getSuperClass();
			}
		}
		return null;
	}
`,paraId:34,tocIndex:5},{value:"\u9012\u5F52\u5904\u7406\u5185\u90E8\u7C7B\uFF0C\u4E00\u822C\u4E0D\u4F1A\u4F7F\u7528\u5185\u90E8\u7C7B\u3002",paraId:35,tocIndex:5},{value:"\u5904\u7406 @PropertySource \u6CE8\u89E3\uFF0C@PropertySource \u6CE8\u89E3\u7528\u6765\u52A0\u8F7D properties \u6587\u4EF6\u3002",paraId:36,tocIndex:5},{value:"\u83B7\u5F97 ComponentScan \u6CE8\u89E3\u5177\u4F53\u7684\u5185\u5BB9\uFF0CComponentScan \u6CE8\u89E3\u9664\u4E86\u6700\u5E38\u7528\u7684 basePackage \u4E4B\u5916\uFF0C\u8FD8\u6709 includeFilters\uFF0CexcludeFilters \u7B49\u3002",paraId:37,tocIndex:5},{value:"\u5224\u65AD\u6709\u6CA1\u6709\u88AB @ComponentScans \u6807\u8BB0\uFF0C\u6216\u8005\u88AB @Condition \u6761\u4EF6\u5E26\u8FC7\uFF0C\u5982\u679C\u6EE1\u8DB3\u6761\u4EF6\u7684\u8BDD\uFF0C\u8FDB\u5165 if\uFF0C\u8FDB\u884C\u5982\u4E0B\u64CD\u4F5C\uFF1A",paraId:38,tocIndex:5},{value:"\u6267\u884C\u626B\u63CF\u64CD\u4F5C\uFF0C\u628A\u626B\u63CF\u51FA\u6765\u7684\u653E\u5165 set\uFF0C\u8FD9\u4E2A\u65B9\u6CD5\u7A0D\u540E\u518D\u8BE6\u7EC6\u8BF4\u660E\u3002",paraId:39,tocIndex:5},{value:`beanMethods = this.componentScanParser.parse(componentScan, sourceClass.getMetadata().getClassName());
`,paraId:40,tocIndex:5},{value:"\u5FAA\u73AF set\uFF0C\u5224\u65AD\u662F\u5426\u662F\u914D\u7F6E\u7C7B\uFF0C\u662F\u7684\u8BDD\uFF0C\u9012\u5F52\u8C03\u7528 parse \u65B9\u6CD5\uFF0C\u56E0\u4E3A\u88AB\u626B\u63CF\u51FA\u6765\u7684\u7C7B\uFF0C\u8FD8\u662F\u4E00\u4E2A\u914D\u7F6E\u7C7B\uFF0C\u6709 @ComponentScans \u6CE8\u89E3\uFF0C\u6216\u8005\u5176\u4E2D\u6709\u88AB @Bean \u6807\u8BB0\u7684\u65B9\u6CD5 \u7B49\u7B49\uFF0C\u6240\u4EE5\u9700\u8981\u518D\u6B21\u88AB\u89E3\u6790\u3002",paraId:41,tocIndex:5},{value:"\u5904\u7406 @Import \u6CE8\u89E3\uFF0C@Import \u662F Spring \u4E2D\u5F88\u91CD\u8981\u7684\u4E00\u4E2A\u6CE8\u89E3\uFF0C\u6B63\u662F\u7531\u4E8E\u5B83\u7684\u5B58\u5728\uFF0C\u8BA9 Spring \u975E\u5E38\u7075\u6D3B\uFF0C\u4E0D\u7BA1\u662F Spring \u5185\u90E8\uFF0C\u8FD8\u662F\u4E0E Spring \u6574\u5408\u7684\u7B2C\u4E09\u65B9\u6280\u672F\uFF0C\u90FD\u5927\u91CF\u7684\u8FD0\u7528\u4E86 @Import \u6CE8\u89E3\uFF0C@Import \u6709\u4E09\u79CD\u60C5\u51B5\uFF0C\u4E00\u79CD\u662F Import \u666E\u901A\u7C7B\uFF0C\u4E00\u79CD\u662F Import ImportSelector\uFF0C\u8FD8\u6709\u4E00\u79CD\u662F Import ImportBeanDefinitionRegistrar\uFF0CgetImports (sourceClass) \u662F\u83B7\u5F97 import \u7684\u5185\u5BB9\uFF0C\u8FD4\u56DE\u7684\u662F\u4E00\u4E2A set\uFF0C\u8FD9\u4E2A\u65B9\u6CD5\u7A0D\u540E\u518D\u8BE6\u7EC6\u8BF4\u660E\u3002",paraId:42,tocIndex:5},{value:"\u5904\u7406 @ImportResource \u6CE8\u89E3\u3002",paraId:43,tocIndex:5},{value:"\u5904\u7406 @Bean \u7684\u65B9\u6CD5\uFF0C\u53EF\u4EE5\u770B\u5230\u83B7\u5F97\u4E86\u5E26\u6709 @Bean \u7684\u65B9\u6CD5\u540E\uFF0C\u4E0D\u662F\u9A6C\u4E0A\u8F6C\u6362\u6210 BeanDefinition\uFF0C\u800C\u662F\u5148\u7528\u4E00\u4E2A set \u63A5\u6536\u3002",paraId:44,tocIndex:5},{value:"\u603B\u800C\u8A00\u4E4B\u5C31\u662F\u6210\u7ACB\u4E86 @PropertySource\uFF0C@ComponentScan\uFF0C@Import \uFF0C@Bean\u7B49\u6CE8\u89E3",paraId:45,tocIndex:5},{value:"\u6765\u770B\u7B2C\u56DB\u6B65\u7684parse\u65B9\u6CD5",paraId:46,tocIndex:6},{value:`	public Set<BeanDefinitionHolder> parse(AnnotationAttributes componentScan, final String declaringClass) {
		//\u626B\u63CF\u5668\uFF0C\u8FD8\u8BB0\u4E0D\u8BB0\u5728new AnnotationConfigApplicationContext\u7684\u65F6\u5019
		//\u4F1A\u8C03\u7528AnnotationConfigApplicationContext\u7684\u6784\u9020\u65B9\u6CD5
		//\u6784\u9020\u65B9\u6CD5\u91CC\u9762\u6709\u4E00\u53E5 this.scanner = new ClassPathBeanDefinitionScanner(this);
		//\u5F53\u65F6\u8BF4\u8FD9\u4E2A\u5BF9\u8C61\u4E0D\u91CD\u8981\uFF0C\u8FD9\u91CC\u5C31\u662F\u8BC1\u660E\u4E86\u3002\u5E38\u89C4\u7528\u6CD5\u4E2D\uFF0C\u5B9E\u9645\u4E0A\u6267\u884C\u626B\u63CF\u7684\u53EA\u4F1A\u662F\u8FD9\u91CC\u7684scanner\u5BF9\u8C61
		ClassPathBeanDefinitionScanner scanner = new ClassPathBeanDefinitionScanner(this.registry,
				componentScan.getBoolean("useDefaultFilters"), this.environment, this.resourceLoader);
 
		//\u5224\u65AD\u662F\u5426\u91CD\u5199\u4E86\u9ED8\u8BA4\u7684\u547D\u540D\u89C4\u5219
		Class<? extends BeanNameGenerator> generatorClass = componentScan.getClass("nameGenerator");
		boolean useInheritedGenerator = (BeanNameGenerator.class == generatorClass);
		scanner.setBeanNameGenerator(useInheritedGenerator ? this.beanNameGenerator :
				BeanUtils.instantiateClass(generatorClass));
 
		ScopedProxyMode scopedProxyMode = componentScan.getEnum("scopedProxy");
		if (scopedProxyMode != ScopedProxyMode.DEFAULT) {
			scanner.setScopedProxyMode(scopedProxyMode);
		}
		else {
			Class<? extends ScopeMetadataResolver> resolverClass = componentScan.getClass("scopeResolver");
			scanner.setScopeMetadataResolver(BeanUtils.instantiateClass(resolverClass));
		}
 
		scanner.setResourcePattern(componentScan.getString("resourcePattern"));
 
		//addIncludeFilter addExcludeFilter,\u6700\u7EC8\u662F\u5F80List<TypeFilter>\u91CC\u9762\u586B\u5145\u6570\u636E
		//TypeFilter\u662F\u4E00\u4E2A\u51FD\u6570\u5F0F\u63A5\u53E3\uFF0C\u51FD\u6570\u5F0F\u63A5\u53E3\u5728java8\u7684\u65F6\u5019\u5927\u653E\u5F02\u5F69\uFF0C\u53EA\u5B9A\u4E49\u4E86\u4E00\u4E2A\u865A\u65B9\u6CD5\u7684\u63A5\u53E3\u88AB\u79F0\u4E3A\u51FD\u6570\u5F0F\u63A5\u53E3
		//\u5F53\u8C03\u7528scanner.addIncludeFilter  scanner.addExcludeFilter \u4EC5\u4EC5\u628A \u5B9A\u4E49\u7684\u89C4\u5219\u585E\u8FDB\u53BB\uFF0C\u5E76\u4E48\u6709\u771F\u6B63\u53BB\u6267\u884C\u5339\u914D\u8FC7\u7A0B
 
		//\u5904\u7406includeFilters
		for (AnnotationAttributes filter : componentScan.getAnnotationArray("includeFilters")) {
			for (TypeFilter typeFilter : typeFiltersFor(filter)) {
				scanner.addIncludeFilter(typeFilter);
			}
		}
 
		//\u5904\u7406excludeFilters
		for (AnnotationAttributes filter : componentScan.getAnnotationArray("excludeFilters")) {
			for (TypeFilter typeFilter : typeFiltersFor(filter)) {
				scanner.addExcludeFilter(typeFilter);
			}
		}
 
		boolean lazyInit = componentScan.getBoolean("lazyInit");
		if (lazyInit) {
			scanner.getBeanDefinitionDefaults().setLazyInit(true);
		}
 
		Set<String> basePackages = new LinkedHashSet<>();
		String[] basePackagesArray = componentScan.getStringArray("basePackages");
		for (String pkg : basePackagesArray) {
			String[] tokenized = StringUtils.tokenizeToStringArray(this.environment.resolvePlaceholders(pkg),
					ConfigurableApplicationContext.CONFIG_LOCATION_DELIMITERS);
			Collections.addAll(basePackages, tokenized);
		}
		// \u4ECE\u4E0B\u9762\u7684\u4EE3\u7801\u53EF\u4EE5\u770B\u51FAComponentScans\u6307\u5B9A\u626B\u63CF\u76EE\u6807\uFF0C\u9664\u4E86\u6700\u5E38\u7528\u7684basePackages\uFF0C\u8FD8\u6709\u4E24\u79CD\u65B9\u5F0F
		// 1.\u6307\u5B9AbasePackageClasses\uFF0C\u5C31\u662F\u6307\u5B9A\u591A\u4E2A\u7C7B\uFF0C\u53EA\u8981\u662F\u4E0E\u8FD9\u51E0\u4E2A\u7C7B\u540C\u7EA7\u7684\uFF0C\u6216\u8005\u5728\u8FD9\u51E0\u4E2A\u7C7B\u4E0B\u7EA7\u7684\u90FD\u53EF\u4EE5\u88AB\u626B\u63CF\u5230\uFF0C\u8FD9\u79CD\u65B9\u5F0F\u5176\u5B9E\u662Fspring\u6BD4\u8F83\u63A8\u8350\u7684
		// \u56E0\u4E3A\u6307\u5B9AbasePackages\u6CA1\u6709IDE\u7684\u68C0\u67E5\uFF0C\u5BB9\u6613\u51FA\u9519\uFF0C\u4F46\u662F\u6307\u5B9A\u4E00\u4E2A\u7C7B\uFF0C\u5C31\u6709IDE\u7684\u68C0\u67E5\u4E86\uFF0C\u4E0D\u5BB9\u6613\u51FA\u9519\uFF0C\u7ECF\u5E38\u4F1A\u7528\u4E00\u4E2A\u7A7A\u7684\u7C7B\u6765\u4F5C\u4E3AbasePackageClasses
		// 2.\u76F4\u63A5\u4E0D\u6307\u5B9A\uFF0C\u9ED8\u8BA4\u4F1A\u628A\u4E0E\u914D\u7F6E\u7C7B\u540C\u7EA7\uFF0C\u6216\u8005\u5728\u914D\u7F6E\u7C7B\u4E0B\u7EA7\u7684\u4F5C\u4E3A\u626B\u63CF\u76EE\u6807
		for (Class<?> clazz : componentScan.getClassArray("basePackageClasses")) {
			basePackages.add(ClassUtils.getPackageName(clazz));
		}
		if (basePackages.isEmpty()) {
			basePackages.add(ClassUtils.getPackageName(declaringClass));
		}
 
		//\u628A\u89C4\u5219\u586B\u5145\u5230\u6392\u9664\u89C4\u5219\uFF1AList<TypeFilter>\uFF0C\u8FD9\u91CC\u5C31\u628A \u6CE8\u518C\u7C7B\u81EA\u8EAB\u5F53\u4F5C\u6392\u9664\u89C4\u5219\uFF0C\u771F\u6B63\u6267\u884C\u5339\u914D\u7684\u65F6\u5019\uFF0C\u4F1A\u628A\u81EA\u8EAB\u7ED9\u6392\u9664
		scanner.addExcludeFilter(new AbstractTypeHierarchyTraversingFilter(false, false) {
			@Override
			protected boolean matchClassName(String className) {
				return declaringClass.equals(className);
			}
		});
		//basePackages\u662F\u4E00\u4E2ALinkedHashSet<String>\uFF0C\u8FD9\u91CC\u5C31\u662F\u628AbasePackages\u8F6C\u4E3A\u5B57\u7B26\u4E32\u6570\u7EC4\u7684\u5F62\u5F0F
		return scanner.doScan(StringUtils.toStringArray(basePackages));
	}
`,paraId:47,tocIndex:6},{value:"\u5B9A\u4E49\u4E86\u4E00\u4E2A\u626B\u63CF\u5668 scanner\uFF0C\u8FD8\u8BB0\u4E0D\u8BB0\u5728 new AnnotationConfigApplicationContext \u7684\u65F6\u5019\uFF0C\u4F1A\u8C03\u7528 AnnotationConfigApplicationContext \u7684\u6784\u9020\u65B9\u6CD5\uFF0C\u6784\u9020\u65B9\u6CD5\u91CC\u9762\u6709\u4E00\u53E5 this.scanner = new ClassPathBeanDefinitionScanner (this); \u5F53\u65F6\u8BF4\u8FD9\u4E2A\u5BF9\u8C61\u4E0D\u91CD\u8981\uFF0C\u8FD9\u91CC\u5C31\u662F\u8BC1\u660E\u4E86\u3002\u5E38\u89C4\u7528\u6CD5\u4E2D\uFF0C\u5B9E\u9645\u4E0A\u6267\u884C\u626B\u63CF\u7684\u53EA\u4F1A\u662F\u8FD9\u91CC\u7684 scanner \u5BF9\u8C61\u3002",paraId:48,tocIndex:6},{value:"\u5904\u7406 includeFilters\uFF0C\u5C31\u662F\u628A\u89C4\u5219\u6DFB\u52A0\u5230 scanner\u3002",paraId:48,tocIndex:6},{value:"\u5904\u7406 excludeFilters\uFF0C\u5C31\u662F\u628A\u89C4\u5219\u6DFB\u52A0\u5230 scanner\u3002",paraId:48,tocIndex:6},{value:"\u89E3\u6790 basePackages\uFF0C\u83B7\u5F97\u9700\u8981\u626B\u63CF\u54EA\u4E9B\u5305\u3002",paraId:48,tocIndex:6},{value:"\u6DFB\u52A0\u4E00\u4E2A\u9ED8\u8BA4\u7684\u6392\u9664\u89C4\u5219\uFF1A\u6392\u9664\u81EA\u8EAB\u3002",paraId:48,tocIndex:6},{value:"\u6267\u884C\u626B\u63CF\uFF0C\u7A0D\u540E\u8BE6\u7EC6\u8BF4\u660E\u3002",paraId:48,tocIndex:6},{value:"\u6211\u4EEC\u6765\u770B\u770B\u5230\u5E95\u662F\u600E\u4E48\u6267\u884C\u626B\u63CF\u7684\uFF1A",paraId:49,tocIndex:7},{value:`protected Set<BeanDefinitionHolder> doScan(String... basePackages) {
		Assert.notEmpty(basePackages, "At least one base package must be specified");
		Set<BeanDefinitionHolder> beanDefinitions = new LinkedHashSet<>();
		//\u5FAA\u73AF\u5904\u7406basePackages
		for (String basePackage : basePackages) {
			//\u6839\u636E\u5305\u540D\u627E\u5230\u7B26\u5408\u6761\u4EF6\u7684BeanDefinition\u96C6\u5408
			Set<BeanDefinition> candidates = findCandidateComponents(basePackage);
			for (BeanDefinition candidate : candidates) {
				ScopeMetadata scopeMetadata = this.scopeMetadataResolver.resolveScopeMetadata(candidate);
				candidate.setScope(scopeMetadata.getScopeName());
				String beanName = this.beanNameGenerator.generateBeanName(candidate, this.registry);
				//\u7531findCandidateComponents\u5185\u90E8\u53EF\u77E5\uFF0C\u8FD9\u91CC\u7684candidate\u662FScannedGenericBeanDefinition
				//\u800CScannedGenericBeanDefinition\u662FAbstractBeanDefinition\u548CAnnotatedBeanDefinition\u7684\u4E4B\u7C7B
				//\u6240\u4EE5\u4E0B\u9762\u7684\u4E24\u4E2Aif\u90FD\u4F1A\u8FDB\u5165
				if (candidate instanceof AbstractBeanDefinition) {
					//\u5185\u90E8\u4F1A\u8BBE\u7F6E\u9ED8\u8BA4\u503C
					postProcessBeanDefinition((AbstractBeanDefinition) candidate, beanName);
				}
				if (candidate instanceof AnnotatedBeanDefinition) {
					//\u5982\u679C\u662FAnnotatedBeanDefinition\uFF0C\u8FD8\u4F1A\u518D\u8BBE\u7F6E\u4E00\u6B21\u503C
					AnnotationConfigUtils.processCommonDefinitionAnnotations((AnnotatedBeanDefinition) candidate);
				}
				if (checkCandidate(beanName, candidate)) {
					BeanDefinitionHolder definitionHolder = new BeanDefinitionHolder(candidate, beanName);
					definitionHolder =
							AnnotationConfigUtils.applyScopedProxyMode(scopeMetadata, definitionHolder, this.registry);
					beanDefinitions.add(definitionHolder);
					registerBeanDefinition(definitionHolder, this.registry);
				}
			}
		}
		return beanDefinitions;
	}
`,paraId:50,tocIndex:7},{value:"\u56E0\u4E3A basePackages \u53EF\u80FD\u6709\u591A\u4E2A\uFF0C\u6240\u4EE5\u9700\u8981\u5FAA\u73AF\u5904\u7406\uFF0C\u6700\u7EC8\u4F1A\u8FDB\u884C Bean \u7684\u6CE8\u518C\u3002\u4E0B\u9762\u518D\u6765\u770B\u770B findCandidateComponents \u65B9\u6CD5\uFF1A",paraId:51,tocIndex:7},{value:`	public Set<BeanDefinition> findCandidateComponents(String basePackage) {
		//spring\u652F\u6301component\u7D22\u5F15\u6280\u672F\uFF0C\u9700\u8981\u5F15\u5165\u4E00\u4E2A\u7EC4\u4EF6\uFF0C\u56E0\u4E3A\u5927\u90E8\u5206\u60C5\u51B5\u4E0D\u4F1A\u5F15\u5165\u8FD9\u4E2A\u7EC4\u4EF6
		//\u6240\u4EE5\u4E0D\u4F1A\u8FDB\u5165\u5230\u8FD9\u4E2Aif
		if (this.componentsIndex != null && indexSupportsIncludeFilters()) {
			return addCandidateComponentsFromIndex(this.componentsIndex, basePackage);
		}
		else {
			return scanCandidateComponents(basePackage);
		}
	}
`,paraId:52,tocIndex:8},{value:`private Set<BeanDefinition> scanCandidateComponents(String basePackage) {
		Set<BeanDefinition> candidates = new LinkedHashSet<>();
		try {
			//\u628A \u4F20\u8FDB\u6765\u7684\u7C7B\u4F3C \u547D\u540D\u7A7A\u95F4\u5F62\u5F0F\u7684\u5B57\u7B26\u4E32\u8F6C\u6362\u6210\u7C7B\u4F3C\u7C7B\u6587\u4EF6\u5730\u5740\u7684\u5F62\u5F0F\uFF0C\u7136\u540E\u5728\u524D\u9762\u52A0\u4E0Aclasspath*:
			//\u5373\uFF1Acom.xx=>classpath*:com/xx/**/*.class
			String packageSearchPath = ResourcePatternResolver.CLASSPATH_ALL_URL_PREFIX +
					resolveBasePackage(basePackage) + '/' + this.resourcePattern;
			//\u6839\u636EpackageSearchPath\uFF0C\u83B7\u5F97\u7B26\u5408\u8981\u6C42\u7684\u6587\u4EF6
			Resource[] resources = getResourcePatternResolver().getResources(packageSearchPath);
			boolean traceEnabled = logger.isTraceEnabled();
			boolean debugEnabled = logger.isDebugEnabled();
			//\u5FAA\u73AF\u8D44\u6E90
			for (Resource resource : resources) {
				if (traceEnabled) {
					logger.trace("Scanning " + resource);
				}
 
				if (resource.isReadable()) {//\u5224\u65AD\u8D44\u6E90\u662F\u5426\u53EF\u8BFB\uFF0C\u5E76\u4E14\u4E0D\u662F\u4E00\u4E2A\u76EE\u5F55
					try {
						//metadataReader \u5143\u6570\u636E\u8BFB\u53D6\u5668\uFF0C\u89E3\u6790resource\uFF0C\u4E5F\u53EF\u4EE5\u7406\u89E3\u4E3A\u63CF\u8FF0\u8D44\u6E90\u7684\u6570\u636E\u7ED3\u6784
						MetadataReader metadataReader = getMetadataReaderFactory().getMetadataReader(resource);
						//\u5728isCandidateComponent\u65B9\u6CD5\u5185\u90E8\u4F1A\u771F\u6B63\u6267\u884C\u5339\u914D\u89C4\u5219
						//\u6CE8\u518C\u914D\u7F6E\u7C7B\u81EA\u8EAB\u4F1A\u88AB\u6392\u9664\uFF0C\u4E0D\u4F1A\u8FDB\u5165\u5230\u8FD9\u4E2Aif
						if (isCandidateComponent(metadataReader)) {
							ScannedGenericBeanDefinition sbd = new ScannedGenericBeanDefinition(metadataReader);
							sbd.setResource(resource);
							sbd.setSource(resource);
							if (isCandidateComponent(sbd)) {
								if (debugEnabled) {
									logger.debug("Identified candidate component class: " + resource);
								}
								candidates.add(sbd);
							}
							else {
								if (debugEnabled) {
									logger.debug("Ignored because not a concrete top-level class: " + resource);
								}
							}
						}
						else {
							if (traceEnabled) {
								logger.trace("Ignored because not matching any filter: " + resource);
							}
						}
					}
					catch (Throwable ex) {
						throw new BeanDefinitionStoreException(
								"Failed to read candidate component class: " + resource, ex);
					}
				}
				else {
					if (traceEnabled) {
						logger.trace("Ignored because not readable: " + resource);
					}
				}
			}
		}
		catch (IOException ex) {
			throw new BeanDefinitionStoreException("I/O failure during classpath scanning", ex);
		}
		return candidates;
	}
`,paraId:53,tocIndex:9},{value:"\u628A\u4F20\u8FDB\u6765\u7684\u7C7B\u4F3C\u547D\u540D\u7A7A\u95F4\u5F62\u5F0F\u7684\u5B57\u7B26\u4E32\u8F6C\u6362\u6210\u7C7B\u4F3C\u7C7B\u6587\u4EF6\u5730\u5740\u7684\u5F62\u5F0F\uFF0C\u7136\u540E\u5728\u524D\u9762\u52A0\u4E0A classpath*\uFF0C\u5373\uFF1Acom.xx=>classpath*:com/xx/**/*.class\u3002",paraId:54,tocIndex:9},{value:"\u6839\u636E packageSearchPath\uFF0C\u83B7\u5F97\u7B26\u5408\u8981\u6C42\u7684\u6587\u4EF6\u3002",paraId:54,tocIndex:9},{value:"\u5FAA\u73AF\u7B26\u5408\u8981\u6C42\u7684\u6587\u4EF6\uFF0C\u8FDB\u4E00\u6B65\u8FDB\u884C\u5224\u65AD\u3002",paraId:54,tocIndex:9},{value:"\u6700\u7EC8\u4F1A\u628A\u7B26\u5408\u8981\u6C42\u7684\u6587\u4EF6\uFF0C\u8F6C\u6362\u4E3A BeanDefinition\uFF0C\u5E76\u4E14\u8FD4\u56DE\u3002",paraId:55,tocIndex:9},{value:"@Import \u89E3\u6790\uFF1A",paraId:56},{value:`	//\u8FD9\u4E2A\u65B9\u6CD5\u5185\u90E8\u76F8\u5F53\u76F8\u5F53\u590D\u6742\uFF0CimportCandidates\u662FImport\u7684\u5185\u5BB9\uFF0C\u8C03\u7528\u8FD9\u4E2A\u65B9\u6CD5\u7684\u65F6\u5019\uFF0C\u5DF2\u7ECF\u8BF4\u8FC7\u53EF\u80FD\u6709\u4E09\u79CD\u60C5\u51B5
	//\u8FD9\u91CC\u518D\u8BF4\u4E0B\uFF0C1.Import\u666E\u901A\u7C7B\uFF0C2.Import ImportSelector\uFF0C3.Import ImportBeanDefinitionRegistrar
	//\u5FAA\u73AFimportCandidates\uFF0C\u5224\u65AD\u5C5E\u4E8E\u54EA\u79CD\u60C5\u51B5
	//\u5982\u679C\u662F\u666E\u901A\u7C7B\uFF0C\u4F1A\u8FDB\u5230else\uFF0C\u8C03\u7528processConfigurationClass\u65B9\u6CD5
	//\u8FD9\u4E2A\u65B9\u6CD5\u662F\u4E0D\u662F\u5F88\u719F\u6089\uFF0C\u6CA1\u9519\uFF0CprocessImports\u8FD9\u4E2A\u65B9\u6CD5\u5C31\u662F\u5728processConfigurationClass\u65B9\u6CD5\u4E2D\u88AB\u8C03\u7528\u7684
	//processImports\u53C8\u4E3B\u52A8\u8C03\u7528processConfigurationClass\u65B9\u6CD5\uFF0C\u662F\u4E00\u4E2A\u9012\u5F52\u8C03\u7528\uFF0C\u56E0\u4E3AImport\u7684\u666E\u901A\u7C7B\uFF0C\u4E5F\u6709\u53EF\u80FD\u88AB\u52A0\u4E86Import\u6CE8\u89E3\uFF0C@ComponentScan\u6CE8\u89E3 \u6216\u8005\u5176\u4ED6\u6CE8\u89E3\uFF0C\u6240\u4EE5\u666E\u901A\u7C7B\u9700\u8981\u518D\u6B21\u88AB\u89E3\u6790
	//\u5982\u679CImport ImportSelector\u5C31\u8DD1\u5230\u4E86\u7B2C\u4E00\u4E2Aif\u4E2D\u53BB\uFF0C\u9996\u5148\u6267\u884CAware\u63A5\u53E3\u65B9\u6CD5\uFF0C\u6240\u4EE5\u6211\u4EEC\u5728\u5B9E\u73B0ImportSelector\u7684\u540C\u65F6\uFF0C\u8FD8\u53EF\u4EE5\u5B9E\u73B0Aware\u63A5\u53E3
	//\u7136\u540E\u5224\u65AD\u662F\u4E0D\u662FDeferredImportSelector\uFF0CDeferredImportSelector\u6269\u5C55\u4E86ImportSelector
	//\u5982\u679C\u4E0D\u662F\u7684\u8BDD\uFF0C\u8C03\u7528selectImports\u65B9\u6CD5\uFF0C\u83B7\u5F97\u5168\u9650\u5B9A\u7C7B\u540D\u6570\u7EC4\uFF0C\u5728\u8F6C\u6362\u6210\u7C7B\u7684\u6570\u7EC4\uFF0C\u7136\u540E\u518D\u8C03\u7528processImports\uFF0C\u53C8\u7279\u4E48\u7684\u662F\u4E00\u4E2A\u9012\u5F52\u8C03\u7528...
	//\u53EF\u80FD\u53C8\u6709\u4E09\u79CD\u60C5\u51B5\uFF0C\u4E00\u79CD\u60C5\u51B5\u662FselectImports\u7684\u7C7B\u662F\u4E00\u4E2A\u666E\u901A\u7C7B\uFF0C\u7B2C\u4E8C\u79CD\u60C5\u51B5\u662FselectImports\u7684\u7C7B\u662F\u4E00\u4E2AImportBeanDefinitionRegistrar\u7C7B\uFF0C\u7B2C\u4E09\u79CD\u60C5\u51B5\u662F\u8FD8\u662F\u4E00\u4E2AImportSelector\u7C7B...
	//\u6240\u4EE5\u53C8\u9700\u8981\u9012\u5F52\u8C03\u7528
	//\u5982\u679CImport ImportBeanDefinitionRegistrar\u5C31\u8DD1\u5230\u4E86\u7B2C\u4E8C\u4E2Aif\uFF0C\u8FD8\u662F\u4F1A\u6267\u884CAware\u63A5\u53E3\u65B9\u6CD5\uFF0C\u8FD9\u91CC\u7EC8\u4E8E\u6CA1\u6709\u9012\u5F52\u4E86\uFF0C\u4F1A\u628A\u6570\u636E\u653E\u5230ConfigurationClass\u4E2D\u7684Map<ImportBeanDefinitionRegistrar, AnnotationMetadata> importBeanDefinitionRegistrars\u4E2D\u53BB
	private void processImports(ConfigurationClass configClass, SourceClass currentSourceClass,
								Collection<SourceClass> importCandidates, boolean checkForCircularImports) {
 
		if (importCandidates.isEmpty()) {
			return;
		}
 
		if (checkForCircularImports && isChainedImportOnStack(configClass)) {
			this.problemReporter.error(new CircularImportProblem(configClass, this.importStack));
		} else {
			this.importStack.push(configClass);
			try {
				for (SourceClass candidate : importCandidates) {
					if (candidate.isAssignable(ImportSelector.class)) {
						// Candidate class is an ImportSelector -> delegate to it to determine imports
						Class<?> candidateClass = candidate.loadClass();
						ImportSelector selector = BeanUtils.instantiateClass(candidateClass, ImportSelector.class);
						ParserStrategyUtils.invokeAwareMethods(
								selector, this.environment, this.resourceLoader, this.registry);
						if (this.deferredImportSelectors != null && selector instanceof DeferredImportSelector) {
							this.deferredImportSelectors.add(
									new DeferredImportSelectorHolder(configClass, (DeferredImportSelector) selector));
						} else {
							String[] importClassNames = selector.selectImports(currentSourceClass.getMetadata());
							Collection<SourceClass> importSourceClasses = asSourceClasses(importClassNames);
							processImports(configClass, currentSourceClass, importSourceClasses, false);
						}
					} else if (candidate.isAssignable(ImportBeanDefinitionRegistrar.class)) {
						// Candidate class is an ImportBeanDefinitionRegistrar ->
						// delegate to it to register additional bean definitions
						Class<?> candidateClass = candidate.loadClass();
						ImportBeanDefinitionRegistrar registrar =
								BeanUtils.instantiateClass(candidateClass, ImportBeanDefinitionRegistrar.class);
						ParserStrategyUtils.invokeAwareMethods(
								registrar, this.environment, this.resourceLoader, this.registry);
						configClass.addImportBeanDefinitionRegistrar(registrar, currentSourceClass.getMetadata());
					} else {
						// Candidate class not an ImportSelector or ImportBeanDefinitionRegistrar ->
						// process it as an @Configuration class
						this.importStack.registerImport(
								currentSourceClass.getMetadata(), candidate.getMetadata().getClassName());
						processConfigurationClass(candidate.asConfigClass(configClass));
					}
				}
			} catch (BeanDefinitionStoreException ex) {
				throw ex;
			} catch (Throwable ex) {
				throw new BeanDefinitionStoreException(
						"Failed to process import candidates for configuration class [" +
								configClass.getMetadata().getClassName() + "]", ex);
			} finally {
				this.importStack.pop();
			}
		}
	}
`,paraId:57,tocIndex:10},{value:"\u76F4\u5230\u8FD9\u91CC\uFF0C\u624D\u628A ConfigurationClassPostProcessor \u4E2D\u7684 processConfigBeanDefinitions \u65B9\u6CD5\u7B80\u5355\u7684\u8FC7\u4E86\u4E00\u4E0B\u3002",paraId:58,tocIndex:10},{value:"\u4F46\u662F\u8FD9\u8FD8\u6CA1\u6709\u7ED3\u675F\uFF0C\u8FD9\u91CC\u53EA\u4F1A\u89E3\u6790 @Import \u7684 Bean \u800C\u5DF2\uFF0C \u4E0D\u4F1A\u6CE8\u518C\u3002",paraId:59,tocIndex:10}]}}]);
