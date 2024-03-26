import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/myblog/",

  lang: "zh-CN",
  title: "My Blog",
  description: "一个简单的摸鱼网站",

  theme,

  
});


