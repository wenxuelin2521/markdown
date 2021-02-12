# vue3.0简单学习

## 参考文章
- [官方文档](https://v3.vuejs.org/)
- [中文文档](https://v3.cn.vuejs.org/)
- [Vue 3.0 源码开放，看看都有哪些新特性](https://zhuanlan.zhihu.com/p/85343099)
- [Vue 3 源码导读](https://juejin.im/post/5d977f47e51d4578453274b3)
- [Vue Function-based API RFC](https://zhuanlan.zhihu.com/p/68477600)

## 新特性简单总结
1. 全面使用Typescript
2. 响应式原理从`Object.defineProperty`变成了`Proxy`
3. 引入了`hooks`，参照react16.8新特性


## 项目构建
**备注：编写文档的时候，使用的脚手架版本为：@vue/cli 4.5.11**

方式1：无论是2.x项目还是3.0的项目，都可以通过使用`@vue/cli`脚手架来构建
方式2：使用[vite](https://vitejs.dev/)（还没看QAQ，加油）

### vue2.x项目转换成3.x的方式
方式1：通过补丁的形式[@vue/composition-api](https://github.com/vuejs/composition-api)

1. 使用命令`vue create vue-demo-1`构建一个2.x的项目，构建时候的选项，这里就不在描述，按需选择。
2. 安装包`npm install @vue/composition-api`
3. 在入口文件`main.js`中，引入`VueCompositionAPI`，通过`Vue.use()`注册一下
4. 使用API

<img src="./images2/补丁形式使用vue3.jpg" style="zoom:50%;">


方式2：通过`vue add vue-next`完完全全使用vue3.x生态（vue\vue-router\vuex）都是最新的
1. 使用命令`vue create vue-demo-1`构建一个2.x的项目，构建时候的选项，这里就不在描述，按需选择。
2. 使用命令`vue add vue-next`修改项目
3. 使用API

- 运行前：项目目录和package.json截图
<img src="./images2/对比图1-脚手架构建vue2的项目目录和packagejson.jpg" style="zoom:50%;">

- 运行后：项目目录和package.json截图
<img src="./images2/对比图2-运行了vue add vue-next命令后.jpg" style="zoom:50%;">

- API简单使用
<img src="./images2/API简单使用.jpg" style="zoom:60%;">

### 使用脚手架直接创建3.x项目
1. 使用命令`vue create vue-demo-3`构建一个3.x的项目。
<img src="./images2/脚手架直接选择create vue3项目.jpg" style="zoom:50%;">


### 使用vite
```sh
$ npm init @vitejs/app <project-name>
$ cd <project-name>
$ npm install
$ npm run dev
```

<img src="./images2/使用vite构建项目.jpg" style="zoom:50%;">



## 语法差异
