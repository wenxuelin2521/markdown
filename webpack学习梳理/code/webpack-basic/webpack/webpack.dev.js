const {merge} = require("webpack-merge");
const baseConfig = require('./webpack.base.js');
const webpack = require("webpack");

module.exports = merge(baseConfig , {
    mode : "development",
    devtool: 'cheap-module-eval-source-map',
    devServer:{
        port : 8000, // 指定端口
        // open : true, // 打开浏览器
        hot : true // 开启热更新
    },
})