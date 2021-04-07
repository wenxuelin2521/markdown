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