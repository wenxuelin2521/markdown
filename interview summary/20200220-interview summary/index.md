# 1.react怎样提高性能
- React 会创建一个虚拟 DOM(virtual DOM)。当一个组件中的状态改变时，React 首先会通过 "diffing" 算法来标记虚拟 DOM 中的改变，第二步是调节(reconciliation)，会用 diff 的结果来更新 DOM。

# 2.随意给定一个无序的、不重复的数组data，任意抽取n个数，相加和为sum，也可能无解，请写出该函数
```js

function getSum(arr , n){
    if(arr.length < n || n <= 0){
        return null
    }
    if(arr.length == n){
        let sum = 0 
        arr.forEach(item => {
            sum += item
        })
        return sum
    }
    let sum = 0 , targetArr = []
    for(let i = n ; i > 0 ; i--){
        let rIndex = Math.round(Math.random() * i)
        let ele = arr.splice(rIndex ,1)
        targetArr.push(ele[0])
        sum += ele[0]
    }
    return sum
    

}
```

# 3.一个div，高度是宽度的50%，让该div的宽度占据整个屏幕，然后能自适应，垂直居中，怎么实现？
```html
<body>
    <div></div>
</body>
```
```css
body{
    width: 100vw;
    height: 100vh;
    position: relative;
}
div{
    width: 100vw;
    height: 50vw;
    background-color: hotpink;
    margin: 0 auto;
    position: absolute;
    top:50%;
    transform: translateY(-50%);
}
```

# 4.防抖和节流实现
- 防抖：函数防抖就是在函数需要频发触发的情况下，只有足够的空闲时间，才执行一次
```js
function debounce(handler, delay){
    delay = delay || 300
    var timer = null

    return function(){
        let _args = arguments
        clearTimeout(timer)
        timer = setTimeout(() => {
            handler(_args)
        } , delay)
    }
}
```
- 节流：一个函数只有在大于周期时才执行，周期内调用不执行。
```js
function throttle(handler, wait){
    wait = wait || 300
    var lastTime = 0

    return function(){
        let _args = arguments
        let _self = this
        var currTime = new Date().getTime()
        if(currTime - lastTime > wait){
            handler.apply(_self , _args)
            lastTime = currTime
        }
    }
    
}
```

# 5.call apply bind的模拟实现
定义：
- call() apply() bind()都是用来重定义方法里面的this
```js
// code 1
var name = "小明" , age = 18;
var person = {
    name : this.name,
    age : this.age,
    sayHi(){
        console.log(this.name , this.age)
    }
}
person.sayHi() // 小明 , 18
/*========== 分割线 ==========*/
// code 2
var dog = {
    name : '旺财',
    age: 3
}
person.sayHi.call(dog)
person.sayHi.apply(dog)
person.sayHi.bind(dog)()
```
- 三者的区别：
    + bind返回的是一个新的函数，你必须使用它才会被调用
    + call(obj , para1 , para2 ...)
    + apply(obj , [para1 , para2 ...])
    + bind(obj , para1 , para2 ...)()；bind除了返回值是一个函数外，传参跟call一样。
```js
var teacher = {
    desc: '我是一个教师',
    teach(subject, exp) {
        console.log(`${this.desc},我的专业是${subject}, 我有${exp}年经验`);
    }
}
teacher.teach('文学', 5) // 我是一个教师,我的专业是文学, 我有5年经验
var doctor = {
    desc: 'i am a doctor'
}
teacher.teach.call(doctor, '医学', 20) //i am a doctor,我的专业是医学, 我有20年经验
teacher.teach.apply(doctor, ['医学', 20])//i am a doctor,我的专业是医学, 我有20年经验
teacher.teach.bind(doctor, '医学', 20)()//i am a doctor,我的专业是医学, 我有20年经验
```
模拟实现一个call方法
```js
// 使用ES6语法实现一个call
Function.prototype._call = function () {
    let context = arguments[0];
    context.fn = this;

    let args = [];
    for (let i = 0, len = arguments.length; i < len; i++) {
        args.push(arguments[i]);
    }

    // 把数组转换为一个伪数组
    let res = context.fn({ ...args });

    delete context.fn;
    return res;
}
```


# 6.promise、setTimeout、async/await的执行顺序
js中的宏任务一般是：包括整体代码script,setTimeout,setInterval;
微任务是： Promise,process.nextTick;
一段代码执行时，会先执行宏任务中的同步代码：
- 如果执行中遇到setTimout之类的宏任务，那么就把这个setTimeout内部的函数推入**宏任务的队列**，下一轮宏任务执行时调用
- 如果执行中遇到Promise.then()之类的微任务，就会推入到**当前宏任务的微任务队列**中，在本轮宏任务的同步代码执行完成后，依次执行微任务


# 7.arguments是数组吗？怎么实现用它的调用数组的方法？类数组和数组的区别是什么？arguments有length属性吗？类数组转换成数组的方法？
- arguments是类数组
- 实现它调用数组的方法,使用call改变this指向
```js
var listobj = {
    0 : '00',
    1 : '01',
    2 : '02',
    3 : '03',
    length : 4
}

Array.prototype.push.call(listobj , '04')
let res = Array.prototype.map.call(listobj , function(item){
    return item + 'ok'
})
```
- 区别：一个是数组，一个是对象，具有length属性
- 转换的方法
```js
// 转换成真正的数组

// 1.遍历
let res = Array.prototype.map.call(listobj , (item) => {
    return item
})
console.log(res);

// 2. slice splice
let res2 = Array.prototype.slice.call(listobj)
console.log(res2);

// 用splice会改变原数据
// let res3 = Array.prototype.splice.call(listobj , 0) 
// console.log(res3 , listobj);

// 3. Array.from
let res4 = Array.from(listobj)
console.log(res4);
```


# 8.关于javascript的变量提升
- javascript并不是严格的自上而下执行的语言
- 它会将当前作用域的所有变量的声明提升到程序顶部
- 当函数声明和其他声明一起出现的时候，函数声明会覆盖其他的声明
- 如果有多个同名函数声明，则是由最后一个函数声明覆盖之前所有的声明

# 9.instanceof用法
- 用于检测构造函数的prototype属性是否出现在某个实例对象的原型链上
```js
var A = function(){}
A.prototype = {}
var a = new A()
A.prototype = {}
var b = new A()
console.log(a instanceof A)
console.log(b instanceof A)
```

# 10.变量的解构赋值

- 数组的结构赋值
数组中提取值，按照对应的位置，对变量赋值
如果结构不成功，变量的值就等于undefined
解构赋值允许指定默认值，如果默认值是一个表达式，那么这个表达式是惰性求值的，即只有在用到的时候，才会求值

- 对象的结构赋值
```js
// 变量名与属性名不一致，必须写成以下形式
let {foo:baz} = {foo:'aaa' , bar:'bbb'} // baz的值为'aaa'
```

- 用途
    + 交换变量的值
    + 从函数返回多个值
    + 函数参数的定义
    + 提取JSON数据
    + 函数参数的默认值
    + 遍历Map结构
    + 输入模块的指定方法


# 11.闭包问题
循环中赋值为引用的问题
```js
for (var i = 1; i < 5; i++) {
  setTimeout(function timer() {
    console.log(i)
  }, i * 1000)
}
```
解决方法：
```js
// 方法一：使用立即执行函数
for(var i = 1 ; i < 5 ; i++){
    (function(j){
        setTimeout(function timer(){
            console.log(j)
        } , j * 1000)
    })(i)
}
// 方法二：使用ES6中的let：块级作用域
for(let i = 1 ; i < 5 ; i++){
    setTimeout(function timer(){
        console.log(i)
    } , i * 1000)
}
// 方法三：使用setTimeout的第三个参数：定时器启动的时候，第三个及以后的参数是作为第一个函数的参数传入进去
for(vari= 0 ； i < 5 ; i++){
    setTimeout((j) => {
        console.log(j);
    } , i * 1000 , i)
}
```
# 12.跨域通信的几种方式
- jsonp
- hash
- postMessage(html5新增)
- websocket
- cors
支持跨域通信版本的Ajax，是一种新的标准（Origin头）【ajax的一个变种，适用于任何】


# 13.http状态码
- 状态码的第一位
    + 1xx：指示信息-表示请求已经接受，继续处理
    + 2xx：表示请求已被成功接收
    + 3xx：重定向，要完成请求必须进行更进一步操作
    + 4xx：客户端错误，请求有语法错误或请求无法实现
    + 5xx：服务器错误，服务器未能实现合法的请求

# 14.使用css实现一个上/下/左/右三角形
```css
.box1{
    width: 0;
    height: 0;
    border: 50px solid transparent;
    border-top: 50px solid #000; /*上*/
}
.box2{
    width: 0;
    height: 0;
    border: 50px solid transparent;
    border-bottom: 50px solid #000;/*下*/
}
.box3{
    width: 0;
    height: 0;
    border: 50px solid transparent;
    border-left: 50px solid #000;/*左*/
}
.box4{
    width: 0;
    height: 0;
    border: 50px solid transparent;
    border-right: 50px solid #000;/*右*/
}
```
# 15.对JS作用域的理解
JS是没有块级作用域的，只有函数和全局作用域

# 16.什么是自由变量和作用域链
- 自由变量：当前作用域没有定义的变量，就是“自由变量”，假设函数中有一个变量aaa，发现这个函数作用域里没有定义这个变量，就开始去父级作用域中寻找aaa这个变量（全局作用域中），发现还是没有找到这个变量的定义，就会报错。
-作用域链：实际上就是函数作用域中没有定义的变量，回去它的父级作用域中寻找的过程。

# 16. 0.1 + 0.2 = 0.30000000000000004
解决：分别乘以一个大数 再除以这个数；如果是判断的话可以两数相减，如果小于Number.epsilon就可以为true

# 17. css选择符
选择符：id选择器，类选择器，标签，子选择其，后代选择器，通配符选择器，属性选择器，相邻选择器，伪类选贼气
优先级：import > 行内 > id > class > tag > 通配符 > 继承 > 默认
权重算法：100代表id，10代表类，1代表派生选择器 （不标准，但是可以帮助理解）

# 18. === 和 ==
- ==判断数值；===判断类型
- ==的类型转换规则：
    + 如果等号两边是boolean\string\number三者中的任意两者进行比较，优先转换为数字进行比较
    + 如果等号两边出现了null或者undefined，null和undefined除了和自己相等，就彼此相等

# 19. vue深度作用选择器 >>> 与 /deep/
- /deep/被chorme废弃了
- 如果你希望scoped样式中的一个选择器能够作用的更深，可以使用`>>>`
```css
<style scoped>
.a >>> .b {/*....*/}
<style>
```

# 20. 实现水平垂直居中布局
- 已知宽高：子绝父相，top/left：50%，margin-top/margin-left：自身一半
- 未知宽高：top/left：50%，transform:translate(-50% , -50%)
- 弹性：display:flex;justify-content:center;align-items:center;

# 21. keep-alive
- `keep-alive`是vue的内置组件，能在组件切换过程中保留在内存中，防止重复渲染dom
- `keep-alive`包裹动态组件时，会缓存不活动的组件实例，而不是销毁他们
- 被`keep-alive`包含的组件不会再被初始化，也意味着不会重走声明周期函数，但是有时候我们希望缓存的组件可以再次进行渲染，这是就会多出两个声明周期钩子，`activated`与`deactivated`钩子函数

# 22.访问一个url在代码里面怎么区分他是移动端还是pc端
使用Navigator对象的`Navigator.userAgent`
```js
window.location.href = /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent) ? "https://www.baidu.com/" :  "http://news.baidu.com/";
```

# 23.javascript中的作用域
- 全局作用域
- 函数作用域：函数内部定义的变量，在函数内部可以随便使用。如果跳出来则不能够进行使用了
- 块级作用域：let/const定义的变量，一个代码块内（花括号内）能够使用，而跳出这个代码块将不能使用

# 24.webpack打包流程
- 初始化参数
- 开始编译，用上一步得到的参数初始化Compiler对象，加载所有配置的插件，通过执行对象的run方法开始执行编译
- 确定入口：根据配置中的entry找出所有的入口
- 编译模块，从入口文件出发，调用所有配置的loader对模块进行编译
- 完成模块编译，经过loader翻译后，得到每一个模块编译后的内容和他们之间的依赖关系
- 输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的chunk
- 输出完成，根据配置确定的路径和文件名写入系统中

# 25.移动端和pc端的适配
- pc端：媒体查询
- 移动端：
（1）rem
（2）rem + viewport （淘宝的适配方案flexible）

# 26.移动端如何实现一条1px的边框
- 伪类 + transform scale(0.5)。为什么是一半？每一台设备的设备像素比dpr（设备上的物理像素/独立像素）都不一样，但是0.5普遍满足设计师的要求。

# 27.移动端如何做真机调试
- 安卓：通过USB数据线，将Android手机连接到电脑上，手机用Chrome浏览器打开页面，电脑上也打开Chrome，输入chrome://inspect/ ，进入调试模式，这个时候就能调试页面啦
- ios：打开iPhone手机设置设置 -> Safari -> 高级 -> 打开Web检查器，然后通过数据线将iPhone连接到Mac，电脑和手机同时打开Safari，电脑上Safari打开 开发-iPhone

# 28.怎么实现闭包
- 在函数内部返回一个函数

# 29.promise
- promise.all和promise.race
promise.all:将多个promise实例包装成一个新的promise实例。成功的时候返回一个是结果的数组，失败的时候则返回最先被reject失败状态的值
promise.race:`Promise.race([p1,p2,p3...])`里面哪个结果获取的最快，就返回哪个结果，不管成功还是失败
- 错误处理：使用.catch

# 30.async/await
- 跟promise的区别：async/await是generator的语法糖
- 错误处理：使用`try catch` 或者 `await 后面接.catch`；整个函数的的错误可以在返回的promise对象中使用`.catch`

# 31.http强缓存和协商缓存
http缓存机制主要在http响应头中设定，响应头中相关字段为expires/cache-control-last-modified/etag 
- 强缓存：浏览器不会像服务器发送任何请求，直接从本地缓存中读取文件并返回statuscode:200ok


- 协商缓存：向服务器发送请求，服务器会根据这个请求的请求头的一些参数来判断是否命中协商缓存，如果命中，则返回304状态码并带上新的响应头通知浏览器从缓存中读取资源


来源：https://juejin.im/post/5ccfccaff265da03ab233bf5


# 32.箭头函数和普通函数的区别 
- 不能作为构造函数：箭头函数属于匿名函数，是不能作为构造函数的，不能使用new
- 箭头函数没有arguments，取而代之用rest参数解决
- 箭头函数没有自己的this，函数中的this会指向上下文的this值
- this不可以被修改,使用apply , call , bind等方法时候，对this并没有影响
- 箭头函数没有原型属性

# 33.如何提高webpack构建速度
