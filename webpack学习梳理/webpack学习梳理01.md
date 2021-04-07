# webpack介绍

**写在前面**：本文记录时间是2021-04-07，**webpack5**已经正式发布了（2020-10-10）。出于学习总结的目的，本文还是先使用webpack4.x版本来，后续再补充5.x版本的内容。



**webpack定义**：本质上，webpack是一个现代Javascript应用程序的静态模块打包器。当webpack处理应用程序的时候，它会递归地构建一个以来关系图，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个bundle。



**webpack大致工作流程**（面试有时候会问到）：
1. 根据shell和配置文件初始化参数；
2. 从上一步中得到的参数，用于初始化complier，加载插件；
3. 开始编译：从入口文件开始，将依赖模块交给loader去做翻译，如果模块中以来其他模块，它会继续递归下去直至完成；
4. 编译完成：得到文件的依赖关系；
5. 开始组装：将模块切成单独文件和chunk块；
6. 输出完成：将文件输出到文件系统；


<img src="./images/webpack.png" style="zoom:60%;">



## webpack基础配置

### 1. webpack四大核心概念

- 入口（entry）：程序入口js
- 输出（output）：打包后存放的位置
- loader：用于对模块的源代码进行转换
- 插件（plugins）：插件的目的在于解决loader无法实现的其他事



### 2. 初始化项目

- 新建文件夹`webpack-basic`，切换到文件夹中，在终端中运行`npm init -y`初始化项目。

- 安装依赖：使用的版本号分别是webpack@4.44.2 webpack-cli@4.6.0
  ```shell
  npm install webpack@4.44.2 webpack-cli -D
  ```

- webpack4.0之后可以实现0配置打包构建，但开发中还是使用配置文件来进行打包构建，所以创建配置文件`webpack.config.js`
  ```js
  const path = require('path')
  
  module.exports = {
      mode : 'development' , // 默认取值为production ，区别就是是否进行压缩混淆
      // 入口文件配置
      entry : './src/index.js',
      
      // 输出文件配置
      output : {
          path : path.join(__dirname , 'dist') , // 输出路径规定必须是绝对路径
          filename : 'bundle.js' , // 输出文件名字
      }
  
  }
  ```
  

- 将`webpack`命令配置在`package.json`的脚本中`"build": "webpack"`
- 运行命令`npm run build`



### 3. 开发时自动编译工具

### 4. 处理css/less/sass

### 5. 处理图片和字体

### 6. 处理高级javascript语法ES6/7/8

### 7. source map的使用

### 8. 插件















## webpack高级配置





## webpack性能优化





## webpack原理



