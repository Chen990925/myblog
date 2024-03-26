      export const typesMap = {"article":{"/":{"path":"/article/","indexes":[13,0,8,7,6,16,17,9,10,11,12,14,15,18,1,2,3,4,5]}},"star":{"/":{"path":"/star/","indexes":[9,13,14,0]}},"timeline":{"/":{"path":"/timeline/","indexes":[13,8,7,6,16,17,9,10,11,12,14,15,0]}}};
      
if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
  if (__VUE_HMR_RUNTIME__.updateBlogType)
    __VUE_HMR_RUNTIME__.updateBlogType(typesMap);
}

if (import.meta.hot)
  import.meta.hot.accept(({ typesMap }) => {
    __VUE_HMR_RUNTIME__.updateBlogType(typesMap);
  });

      