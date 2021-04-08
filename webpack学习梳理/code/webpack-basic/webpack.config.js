const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode : 'development' , // 默认取值为production ，区别就是是否进行压缩混淆
    // 入口文件配置
    entry : './src/index.js',
    
    // 输出文件配置
    output : {
        path : path.join(__dirname , 'dist') , // 输出路径规定必须是绝对路径
        filename : 'bundle.js' , // 输出文件名字
    },

    // watch : true

    devServer:{
        port : 8000, // 指定端口
        // open : true, // 打开浏览器
        hot : true // 开启热更新
    },

    module : {
        rules : [
            {test: /\.css$/, use: ['style-loader' , 'css-loader']},
            {test: /\.less$/, use: ['style-loader' , 'css-loader' , 'less-loader']},
            {test: /\.s(c|a)ss$/, use: ['style-loader' , 'css-loader' , 'sass-loader']},
            {test: /\.(png|jpg|gif)/, use: [{
                loader:'url-loader',
                options : {
                    limit: 5 * 1024,
                    outputPath:'images',
                    name:'[name]-[hash].[ext]'
                }
            }]},
        ]
    },

    plugins : [
        new HtmlWebpackPlugin({
            filename : 'index.html',
            template : './src/template.html'
        })
    ]

}