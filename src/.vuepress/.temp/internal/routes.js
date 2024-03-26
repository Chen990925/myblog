export const redirects = JSON.parse("{}")

export const routes = Object.fromEntries([
  ["/intro.html", { loader: () => import(/* webpackChunkName: "intro.html" */"D:/Java/project/myblog/src/.vuepress/.temp/pages/intro.html.js"), meta: {"v":"/assets/images/cover3.jpg","e":"\n<p>Place your introduction and profile here.</p>\n","t":"Intro Page","i":"circle-info","y":"a"} }],
  ["/", { loader: () => import(/* webpackChunkName: "index.html" */"D:/Java/project/myblog/src/.vuepress/.temp/pages/index.html.js"), meta: {"t":"首页","i":"home"} }],
  ["/demo/disable.html", { loader: () => import(/* webpackChunkName: "disable.html" */"D:/Java/project/myblog/src/.vuepress/.temp/pages/demo/disable.html.js"), meta: {"c":["Guide"],"g":["disable"],"e":"<p>You can disable some function and layout on the page by setting the Frontmatter of the page.</p>\n","t":"Disabling layout and features","i":"gears","O":4,"y":"a"} }],
  ["/demo/encrypt.html", { loader: () => import(/* webpackChunkName: "encrypt.html" */"D:/Java/project/myblog/src/.vuepress/.temp/pages/demo/encrypt.html.js"), meta: {"c":["Guide"],"g":["encryption"],"n":true,"t":"Encryption Article","i":"lock","y":"a"} }],
  ["/demo/layout.html", { loader: () => import(/* webpackChunkName: "layout.html" */"D:/Java/project/myblog/src/.vuepress/.temp/pages/demo/layout.html.js"), meta: {"c":["Guide"],"g":["Layout"],"e":"<p>The layout contains:</p>\n<ul>\n<li><a href=\"https://theme-hope.vuejs.press/guide/layout/navbar.html\" target=\"_blank\" rel=\"noopener noreferrer\">Navbar</a></li>\n<li><a href=\"https://theme-hope.vuejs.press/guide/layout/sidebar.html\" target=\"_blank\" rel=\"noopener noreferrer\">Sidebar</a></li>\n<li><a href=\"https://theme-hope.vuejs.press/guide/layout/footer.html\" target=\"_blank\" rel=\"noopener noreferrer\">Footer</a></li>\n</ul>","t":"Layout","i":"object-group","O":2,"y":"a"} }],
  ["/demo/markdown.html", { loader: () => import(/* webpackChunkName: "markdown.html" */"D:/Java/project/myblog/src/.vuepress/.temp/pages/demo/markdown.html.js"), meta: {"c":["Guide"],"g":["Markdown"],"e":"<p>VuePress basically generate pages from Markdown files. So you can use it to generate documentation or blog sites easily.</p>\n<p>You should create and write Markdown files, so that VuePress can convert them to different pages according to file structure.</p>\n","t":"Markdown Enhance","i":"fab fa-markdown","O":2,"y":"a"} }],
  ["/demo/page.html", { loader: () => import(/* webpackChunkName: "page.html" */"D:/Java/project/myblog/src/.vuepress/.temp/pages/demo/page.html.js"), meta: {"a":"Ms.Hope","d":1577836800000,"l":"2020年1月1日","c":["Guide"],"g":["Page config","Guide"],"u":true,"e":"<p>Content before <code>more</code> comment is regarded as page excerpt.</p>\n","t":"Page Config","i":"file","O":3,"y":"a"} }],
  ["/demo/", { loader: () => import(/* webpackChunkName: "index.html" */"D:/Java/project/myblog/src/.vuepress/.temp/pages/demo/index.html.js"), meta: {"c":["Guide"],"t":"Features demo","i":"laptop-code","y":"a"} }],
  ["/posts/cherry.html", { loader: () => import(/* webpackChunkName: "cherry.html" */"D:/Java/project/myblog/src/.vuepress/.temp/pages/posts/cherry.html.js"), meta: {"d":1641686400000,"l":"2022年1月9日","c":["Cherry"],"g":["red","small","round"],"e":"\n<h2>Heading 2</h2>\n<p>Here is the content.</p>\n<h3>Heading 3</h3>\n<p>Here is the content.</p>\n","t":"Cherry","i":"pen-to-square","y":"a"} }],
  ["/posts/dragonfruit.html", { loader: () => import(/* webpackChunkName: "dragonfruit.html" */"D:/Java/project/myblog/src/.vuepress/.temp/pages/posts/dragonfruit.html.js"), meta: {"d":1641772800000,"l":"2022年1月10日","c":["Dragon Fruit","Fruit"],"g":["red","big"],"e":"\n<h2>Heading 2</h2>\n<p>Here is the content.</p>\n<h3>Heading 3</h3>\n<p>Here is the content.</p>\n","t":"Dragon Fruit","i":"pen-to-square","y":"a"} }],
  ["/posts/strawberry.html", { loader: () => import(/* webpackChunkName: "strawberry.html" */"D:/Java/project/myblog/src/.vuepress/.temp/pages/posts/strawberry.html.js"), meta: {"d":1641859200000,"l":"2022年1月11日","c":["Fruit","Strawberry"],"g":["red","small"],"e":"\n<h2>Heading 2</h2>\n<p>Here is the content.</p>\n<h3>Heading 3</h3>\n<p>Here is the content.</p>\n","t":"Strawberry","i":"pen-to-square","y":"a"} }],
  ["/posts/tomato.html", { loader: () => import(/* webpackChunkName: "tomato.html" */"D:/Java/project/myblog/src/.vuepress/.temp/pages/posts/tomato.html.js"), meta: {"d":1641945600000,"l":"2022年1月12日","c":["Vegetable"],"g":["red","round"],"u":true,"v":"/assets/images/cover2.jpg","e":"\n<h2>Heading 2</h2>\n<p>Here is the content.</p>\n<h3>Heading 3</h3>\n<p>Here is the content.</p>\n","t":"Tomato","i":"pen-to-square","y":"a"} }],
  ["/posts/apple/1.html", { loader: () => import(/* webpackChunkName: "1.html" */"D:/Java/project/myblog/src/.vuepress/.temp/pages/posts/apple/1.html.js"), meta: {"d":1640995200000,"l":"2022年1月1日","c":["Apple"],"g":["red","big","round"],"e":"\n<h2>Heading 2</h2>\n<p>Here is the content.</p>\n<h3>Heading 3</h3>\n<p>Here is the content.</p>\n","t":"Apple 1","i":"pen-to-square","y":"a"} }],
  ["/posts/apple/2.html", { loader: () => import(/* webpackChunkName: "2.html" */"D:/Java/project/myblog/src/.vuepress/.temp/pages/posts/apple/2.html.js"), meta: {"d":1641081600000,"l":"2022年1月2日","c":["Apple"],"g":["red","big","round"],"e":"\n<p>A apple article being stared.</p>\n","t":"Apple 2","i":"pen-to-square","y":"a"} }],
  ["/posts/apple/3.html", { loader: () => import(/* webpackChunkName: "3.html" */"D:/Java/project/myblog/src/.vuepress/.temp/pages/posts/apple/3.html.js"), meta: {"d":1641168000000,"l":"2022年1月3日","c":["Apple","Fruit"],"g":["red","big","round"],"e":"\n<h2>Heading 2</h2>\n<p>Here is the content.</p>\n<h3>Heading 3</h3>\n<p>Here is the content.</p>\n","t":"Apple 3","i":"pen-to-square","y":"a"} }],
  ["/posts/apple/4.html", { loader: () => import(/* webpackChunkName: "4.html" */"D:/Java/project/myblog/src/.vuepress/.temp/pages/posts/apple/4.html.js"), meta: {"d":1641254400000,"l":"2022年1月4日","c":["Apple","Fruit"],"g":["red","big","round"],"e":"\n<h2>Heading 2</h2>\n<p>Here is the content.</p>\n<h3>Heading 3</h3>\n<p>Here is the content.</p>\n","t":"Apple 4","i":"pen-to-square","y":"a"} }],
  ["/posts/banana/1.html", { loader: () => import(/* webpackChunkName: "1.html" */"D:/Java/project/myblog/src/.vuepress/.temp/pages/posts/banana/1.html.js"), meta: {"d":1641340800000,"l":"2022年1月5日","c":["Banana","Fruit"],"g":["yellow","curly","long"],"e":"\n<h2>Heading 2</h2>\n<p>Here is the content.</p>\n<h3>Heading 3</h3>\n<p>Here is the content.</p>\n","t":"Banana 1","i":"pen-to-square","y":"a"} }],
  ["/posts/banana/2.html", { loader: () => import(/* webpackChunkName: "2.html" */"D:/Java/project/myblog/src/.vuepress/.temp/pages/posts/banana/2.html.js"), meta: {"d":1641427200000,"l":"2022年1月6日","c":["Banana","Fruit"],"g":["yellow","curly","long"],"e":"\n<p>A banana article being stared with number <code>10</code>.</p>\n","t":"Banana 2","i":"pen-to-square","y":"a"} }],
  ["/posts/banana/3.html", { loader: () => import(/* webpackChunkName: "3.html" */"D:/Java/project/myblog/src/.vuepress/.temp/pages/posts/banana/3.html.js"), meta: {"d":1641513600000,"l":"2022年1月7日","c":["Banana"],"g":["yellow","curly","long"],"e":"\n<h2>Heading 2</h2>\n<p>Here is the content.</p>\n<h3>Heading 3</h3>\n<p>Here is the content.</p>\n","t":"Banana 3","i":"pen-to-square","y":"a"} }],
  ["/posts/banana/4.html", { loader: () => import(/* webpackChunkName: "4.html" */"D:/Java/project/myblog/src/.vuepress/.temp/pages/posts/banana/4.html.js"), meta: {"d":1641600000000,"l":"2022年1月8日","c":["Banana"],"g":["yellow","curly","long"],"e":"\n<h2>Heading 2</h2>\n<p>Here is the content.</p>\n<h3>Heading 3</h3>\n<p>Here is the content.</p>\n","t":"Banana 4","i":"pen-to-square","y":"a"} }],
  ["/404.html", { loader: () => import(/* webpackChunkName: "404.html" */"D:/Java/project/myblog/src/.vuepress/.temp/pages/404.html.js"), meta: {"t":""} }],
  ["/posts/", { loader: () => import(/* webpackChunkName: "index.html" */"D:/Java/project/myblog/src/.vuepress/.temp/pages/posts/index.html.js"), meta: {"t":"Posts"} }],
  ["/posts/apple/", { loader: () => import(/* webpackChunkName: "index.html" */"D:/Java/project/myblog/src/.vuepress/.temp/pages/posts/apple/index.html.js"), meta: {"t":"Apple"} }],
  ["/posts/banana/", { loader: () => import(/* webpackChunkName: "index.html" */"D:/Java/project/myblog/src/.vuepress/.temp/pages/posts/banana/index.html.js"), meta: {"t":"Banana"} }],
  ["/category/", { loader: () => import(/* webpackChunkName: "index.html" */"D:/Java/project/myblog/src/.vuepress/.temp/pages/category/index.html.js"), meta: {"t":"分类","I":false} }],
  ["/category/guide/", { loader: () => import(/* webpackChunkName: "index.html" */"D:/Java/project/myblog/src/.vuepress/.temp/pages/category/guide/index.html.js"), meta: {"t":"Guide 分类","I":false} }],
  ["/category/cherry/", { loader: () => import(/* webpackChunkName: "index.html" */"D:/Java/project/myblog/src/.vuepress/.temp/pages/category/cherry/index.html.js"), meta: {"t":"Cherry 分类","I":false} }],
  ["/category/dragon-fruit/", { loader: () => import(/* webpackChunkName: "index.html" */"D:/Java/project/myblog/src/.vuepress/.temp/pages/category/dragon-fruit/index.html.js"), meta: {"t":"Dragon Fruit 分类","I":false} }],
  ["/category/fruit/", { loader: () => import(/* webpackChunkName: "index.html" */"D:/Java/project/myblog/src/.vuepress/.temp/pages/category/fruit/index.html.js"), meta: {"t":"Fruit 分类","I":false} }],
  ["/category/strawberry/", { loader: () => import(/* webpackChunkName: "index.html" */"D:/Java/project/myblog/src/.vuepress/.temp/pages/category/strawberry/index.html.js"), meta: {"t":"Strawberry 分类","I":false} }],
  ["/category/vegetable/", { loader: () => import(/* webpackChunkName: "index.html" */"D:/Java/project/myblog/src/.vuepress/.temp/pages/category/vegetable/index.html.js"), meta: {"t":"Vegetable 分类","I":false} }],
  ["/category/apple/", { loader: () => import(/* webpackChunkName: "index.html" */"D:/Java/project/myblog/src/.vuepress/.temp/pages/category/apple/index.html.js"), meta: {"t":"Apple 分类","I":false} }],
  ["/category/banana/", { loader: () => import(/* webpackChunkName: "index.html" */"D:/Java/project/myblog/src/.vuepress/.temp/pages/category/banana/index.html.js"), meta: {"t":"Banana 分类","I":false} }],
  ["/tag/", { loader: () => import(/* webpackChunkName: "index.html" */"D:/Java/project/myblog/src/.vuepress/.temp/pages/tag/index.html.js"), meta: {"t":"标签","I":false} }],
  ["/tag/disable/", { loader: () => import(/* webpackChunkName: "index.html" */"D:/Java/project/myblog/src/.vuepress/.temp/pages/tag/disable/index.html.js"), meta: {"t":"标签: disable","I":false} }],
  ["/tag/encryption/", { loader: () => import(/* webpackChunkName: "index.html" */"D:/Java/project/myblog/src/.vuepress/.temp/pages/tag/encryption/index.html.js"), meta: {"t":"标签: encryption","I":false} }],
  ["/tag/layout/", { loader: () => import(/* webpackChunkName: "index.html" */"D:/Java/project/myblog/src/.vuepress/.temp/pages/tag/layout/index.html.js"), meta: {"t":"标签: Layout","I":false} }],
  ["/tag/markdown/", { loader: () => import(/* webpackChunkName: "index.html" */"D:/Java/project/myblog/src/.vuepress/.temp/pages/tag/markdown/index.html.js"), meta: {"t":"标签: Markdown","I":false} }],
  ["/tag/page-config/", { loader: () => import(/* webpackChunkName: "index.html" */"D:/Java/project/myblog/src/.vuepress/.temp/pages/tag/page-config/index.html.js"), meta: {"t":"标签: Page config","I":false} }],
  ["/tag/guide/", { loader: () => import(/* webpackChunkName: "index.html" */"D:/Java/project/myblog/src/.vuepress/.temp/pages/tag/guide/index.html.js"), meta: {"t":"标签: Guide","I":false} }],
  ["/tag/red/", { loader: () => import(/* webpackChunkName: "index.html" */"D:/Java/project/myblog/src/.vuepress/.temp/pages/tag/red/index.html.js"), meta: {"t":"标签: red","I":false} }],
  ["/tag/small/", { loader: () => import(/* webpackChunkName: "index.html" */"D:/Java/project/myblog/src/.vuepress/.temp/pages/tag/small/index.html.js"), meta: {"t":"标签: small","I":false} }],
  ["/tag/round/", { loader: () => import(/* webpackChunkName: "index.html" */"D:/Java/project/myblog/src/.vuepress/.temp/pages/tag/round/index.html.js"), meta: {"t":"标签: round","I":false} }],
  ["/tag/big/", { loader: () => import(/* webpackChunkName: "index.html" */"D:/Java/project/myblog/src/.vuepress/.temp/pages/tag/big/index.html.js"), meta: {"t":"标签: big","I":false} }],
  ["/tag/yellow/", { loader: () => import(/* webpackChunkName: "index.html" */"D:/Java/project/myblog/src/.vuepress/.temp/pages/tag/yellow/index.html.js"), meta: {"t":"标签: yellow","I":false} }],
  ["/tag/curly/", { loader: () => import(/* webpackChunkName: "index.html" */"D:/Java/project/myblog/src/.vuepress/.temp/pages/tag/curly/index.html.js"), meta: {"t":"标签: curly","I":false} }],
  ["/tag/long/", { loader: () => import(/* webpackChunkName: "index.html" */"D:/Java/project/myblog/src/.vuepress/.temp/pages/tag/long/index.html.js"), meta: {"t":"标签: long","I":false} }],
  ["/article/", { loader: () => import(/* webpackChunkName: "index.html" */"D:/Java/project/myblog/src/.vuepress/.temp/pages/article/index.html.js"), meta: {"t":"文章","I":false} }],
  ["/star/", { loader: () => import(/* webpackChunkName: "index.html" */"D:/Java/project/myblog/src/.vuepress/.temp/pages/star/index.html.js"), meta: {"t":"星标","I":false} }],
  ["/timeline/", { loader: () => import(/* webpackChunkName: "index.html" */"D:/Java/project/myblog/src/.vuepress/.temp/pages/timeline/index.html.js"), meta: {"t":"时间轴","I":false} }],
]);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateRoutes) {
    __VUE_HMR_RUNTIME__.updateRoutes(routes)
  }
  if (__VUE_HMR_RUNTIME__.updateRedirects) {
    __VUE_HMR_RUNTIME__.updateRedirects(redirects)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ routes, redirects }) => {
    __VUE_HMR_RUNTIME__.updateRoutes(routes)
    __VUE_HMR_RUNTIME__.updateRedirects(redirects)
  })
}
