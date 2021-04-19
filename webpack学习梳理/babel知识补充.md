# 简单对babel进行概括

来源《[不容错过的 Babel7 知识](https://juejin.cn/post/6844904008679686152)》


## 核心库 @babel/core
核心模块，必须安装

```shell
npm install --save-dev @babel/core
```


## CLI命令行工具 @babel/cli
`babel`提供的命令行工具，适合安装在项目中

```shell
npm install --save-dev @babel/cli
```

在项目`package.json`中配置`script`
```json
"scripts":{
    "compiler":"babel src --out-dir dist --watch"
}
```
备注：执行`npm run compiler`进行编译，前后代码完全一样，如果想要`babel`实际做点什么，需要为其添加插件


## 插件
`Babel`插件分为两种

- 语法插件：解析特定类型的语法

- 转换插件：会启用相应的**语法插件**，如果不启用相应的语法插件，意味着无法解析，连解析都不能解析谈何转换


### 插件的使用
在项目目录下新建`.babelrc`文件（后面会具体介绍配置文件），配置如下
```js
// .babelrc
{
    "plugins":["@babel/plugin-transform-arrow-functions"]
    // "plugins": ["./node_modules/@babel/plugin-transform-arrow-functions"] // 指定相对/绝对路径
}
```
安装插件后，此时再进行编译，就可以看到正确的语法转换了。

### 预设
**为了将其他新的JS语法特性转换成低版本代码**，如果一个个配置插件，将会非常繁琐。**为了简化配置**，babel为我们提供了预设`preset`,通过使用或者创建一个`preset`即可以轻松使用一组插件。

- 官方Preset
```txt
1. @babel/preset-env
2. @babel/preset-flow
3. @babel/preset-react
4. @babel/preset-typescript
说明：从Babel v7开始，官方已经移除了针对标准提案阶段功能所编写的预设。
即@babel-preset-stage-x
```


- @babel/preset-env
```js
// .babelrc
{
    "presets":["@babel/preset-env"]
}
```

## Polyfill
语法转换只是将高版本转换成低版本的，但是新的内置函数，实例方法无法转换，这时候就需要`polyfill`（垫片）上场了。垫片的作用是抹平不同浏览器或者不同环境下的差异，让新的内置函数，实例方法再低版本的浏览器中也可以使用。



