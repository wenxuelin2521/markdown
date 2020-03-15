# 1.webpack与grunt、gulp的不同？
# 2.与webpack类似的工具还有哪些？谈谈你为什么最终选择（或放弃）使用webpack？
# 3.有哪些常见的Loader？他们是解决什么问题的？
# 4.有哪些常见的Plugin？他们是解决什么问题的？
# 5.Loader和Plugin的不同？
- Loader直译为"加载器"。Webpack将一切文件视为模块，但是webpack原生是只能解析js文件，如果想将其他文件也打包的话，就会用到loader。 所以Loader的作用是让webpack拥有了加载和解析非JavaScript文件的能力。
- Plugin直译为"插件"。Plugin可以扩展webpack的功能，让webpack具有更多的灵活性。 在 Webpack 运行的生命周期中会广播出许多事件，Plugin 可以监听这些事件，在合适的时机通过 Webpack 提供的 API 改变输出结果。


# 6.webpack的构建流程是什么?从读取配置到输出文件这个过程尽量说全
# 7.是否写过Loader和Plugin？描述一下编写loader或plugin的思路？
# 8.webpack的热更新是如何做到的？说明其原理？
# 9.如何利用webpack来优化前端性能？（提高性能和体验）
# 10.如何提高webpack的构建速度？
（1）多入口情况下，使用CommonsChunkPlugin来提取公共代码
（2）通过externals配置来提取常用库
（3）利用DllPlugin和DllReferencePlugin预编译资源模块，通过DllPlugin来对那些我们引用但是绝对不会修改的npm包来进行预编译，在通过DllReferencePlugin将预编译的模块加载进来
（4）使用Happypack实现多线程加速编译
（5）使用webpack-ugligy-parallel来提升ugligyPlugin的压缩速度。原理上webpack-ugligy-parallel采用了多喝并行压缩来提升压缩速度
（6）使用tree-shaking和scope hoistiong来剔除多余代码
# 11.怎么配置单页应用？怎么配置多页应用？
# 12.npm打包时需要注意哪些？如何利用webpack来更好的构建？
# 13.如何在vue项目中实现按需加载？