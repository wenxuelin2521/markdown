# webpack 高级配置

## HTML中img标签图片资源处理
1. 安装依赖
```sh
npm install --save-dev html-withimg-loader
```

2. 在webpack.config.js中添加loader
```js
{
    test : /\.(htm|html)$/i,
    use : ['html-withimg-loader']
}
// 注意：如果同时配置了url-loader或者file-loader，需要在该loader里面添加选项esModule:false
{test: /\.(png|jpg|gif)/, use: [{
    loader:'url-loader',
    options : {
        limit: 5 * 1024,
        outputPath:'images',
        name:'[name]-[hash].[ext]',
        esModule:false
    }
}]},

```

## 多页应用打包
修改webpack.config.js
```js
// 1. entry修改为多入口
entry : {
    index : './src/index.js',
    other : './src/other.js'
}
// 2. 修改出口
output: {
    path : path.join(__dirname , 'dist'),
    filename : "[name].js",
    publicPath : "/"
}
// 3. webpack-html-plugin
plugins : [
    new HtmlWebpackPlugin({
        filename : 'index.html',
        template : './src/template.html',
        chunks:['index']
    }),
    new HtmlWebpackPlugin({
        filename : 'other.html',
        template : './src/template.html',
        chunks:['other']
    }),
]
```


## 第三方库引入
通过将第三方库进行全局变量的注入，使得不需要到处import或require就能使用（不要过度使用，毕竟全局变量不是什么好东西）

webpack.ProvidePlugin将库自动加载到每一个模块
```js
// 通过npm install 第三方库后，将别名配置在webpack.config.js中
plugins : [
    new webpack.ProvidePlugin({
        $ : 'jquery',
        jQuery : 'jquery'
    })
]
```

## 区分不同的环境
为了区分开发环境还是生产环境的情况，我们会根据`process.env.NODE_ENV`,去进行区分配置。
但是更好的做法，创建多个配置文件

抽取三个配置文件：
- webpack.base.js（定义公共配置）
- webpack.prod.js（定义生产配置）
- webpack.dev.js（定义开发配置）

步骤：
1. 安装依赖`npm install webpack-merge --save-dev`
2. 将公用配置放在base中，不同的配置各自放入prod或dev文件中
3. 然后在dev和prod中使用**webpack-merge**把自己的配置和base进行合并后导出
4. 修改package.json中的脚本参数，通过`--config`指定配置文件


## 环境变量

使用webpack内置插件`DefinePlugin`可以定义环境变量




## devServer解决跨域

## 热更新

# webpack 优化
