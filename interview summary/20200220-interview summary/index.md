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
for(var i= 0 ； i < 5 ; i++){
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
（1）多入口情况下，使用CommonsChunkPlugin来提取公共代码
（2）通过externals配置来提取常用库
（3）利用DllPlugin和DllReferencePlugin预编译资源模块，通过DllPlugin来对那些我们引用但是绝对不会修改的npm包来进行预编译，在通过DllReferencePlugin将预编译的模块加载进来
（4）使用Happypack实现多线程加速编译
（5）使用webpack-ugligy-parallel来提升ugligyPlugin的压缩速度。原理上webpack-ugligy-parallel采用了多喝并行压缩来提升压缩速度
（6）使用tree-shaking和scope hoistiong来剔除多余代码

- 更多关于webpack:https://zhuanlan.zhihu.com/p/44438844

# 34.前端内存泄露问题
- 内存泄露：应用程序不需要占用内存的时候，由于某些原因，内存没有被操作系统回收或者内存池回收。
- 常见的javascript内存泄露

（1）意外的全局变量
比如在函数里面给一个没有声明的变量赋值，或者在函数中使用this赋值，然后直接调用，相当于创建了一个全局变量。这种可以通过`use strict`严格模式，避免意外的全局变量。全局变量存储大量数据时候，确保用完以后把他设置成null或者重新定义。

（2）被遗忘的计时器或回调函数
在js中使用`setInterval`，如果计时器不停止，那么就不会被回收
```js
for (var i = 0; i < 90000; i++) {
  var buggyObject = {
    callAgain: function() {
      var ref = this;
      var val = setTimeout(function() {
        ref.callAgain();
      }, 90000);
    }
  }  
   buggyObject.callAgain();
  //虽然你想回收但是timer还在
  buggyObject = null;
}
```

（3）dom泄露
当原有的com被移除时，子节点引用没有被移除则无法回收
```js
var treeRef = document.querySelector('#tree');  
//在COM树中leafRef是treeFre的一个子结点
var leafRef = document.querySelector('#leaf');  
var body = document.querySelector('body'); 
body.removeChild(treeRef); 
//#tree不能被回收入，因为treeRef还在
//解决方法:
treeRef = null; 
//tree还不能被回收，因为叶子结果leafRef还在
leafRef = null; 
//现在#tree可以被释放了。
```

（4）闭包
在闭包中引入闭包外部变量时候，当闭包结束的时候此对象无法被垃圾回收
```js
var a = function() {
  var largeStr = new Array(1000000).join('x');
  return function() {
    return largeStr;
  }
}();
```

- 调试内存
chorme开发者工具 -> timeline -> menory 点击record



# 35.vuex有哪些属性
- store：状态管理值
- getter： store的派生值，相当于计算属性
- mutation：修改state方法（同步），外部通过store.commit修改
- action：修改state方法（异步），外部通过store.dispatch修改
- module：store模块化

# 36.数组api的[1,3,11,2].sort()
- sort方法的无参调用
如果调用该方法时没有使用参数，将按字母顺序对数组中的元素进行排序，按照字符编码的顺序进行排序。要实现这一点，首先应把数组的元素都转换成字符串以便进行比较。如果数组元素是数字的话会得到错的结果，这时需要使用有参的方法。
- 带参调用：sort方法的参数是一个比较函数，函数有a和b两个参数。
**当函数返回值小于0的时候，a和b顺序不变；当返回值等于0的时候，a和b顺序也是不变；当函数返回值大于0的时候，a和b顺序交换**


# 37.数组去重的方法
- 两层循环：如果两个数相等，就把后面的去掉
- 对象数组：数组转成对象，再把对象的key值转回数组
- indexOf
```js
let c=[1,2,3,4,5,6,1,2,3]
function unique(arr){
    let b=[]
    for(let i=0;i<arr.length;i++){
        if(b.indexOf(arr[i])==-1){
            b.push(arr[i])
        }
    }
    return b
}
```
- ES6 Set：Set是一种新的数据结构，类似于数组，但成员值都是唯一的，没有重复的值。Set本身是一个构造函数用来生成Set数据结构。
```js
const set = new Set([1, 2, 3, 4, 4]);
console.log([...set])
```

# 38.vue中的sync,相当于一种子组件与父组件沟通的一种语法糖，
```js
// 父组件
<child :isShow.sync="isShow" v-show="isShow"/>
//子组件
methods:{
    upIsShow(){
        this.$emit("update:isShow",false);
    }
}

```

# 39.Object.create(proto, [propertiesObject])
作用创建一个新的对象
`proto`必须，表示新建对象的原型对象，即该参数会被赋值到创建出来的对象的原型上。
`propertiesObject`可选，添加到新创建对象的可枚举属性对象的属性描述符以及相应的属性名称


# 40.http和https，如果两个协议之间需要通讯
（1）http:超文本传输协议，由请求和响应构成，是一个标准的客户端服务器模型，http是一个无状态协议。
（2）https:https并不是一个新的协议，它是在http协议上添加了一层TLS/SSL协议。
（3）区别：

- http是明文传输，https通过TSL/SSL进行了加密
- http端口是80，https端口是443
- https需要到ca申请证书
- http连接简单，是无状态的；https是由SSL+HTTP协议构建的可进行加密传输、身份认证的网络协议、比http协议安全
（4）http请求https：属于跨域，http通过申请升级，然后再通过nginx做转发

# 41.vue中的`$attr`和`$listener`
父孙组件传值
```js
//父组件
<Child1 :child1Info="child1" :child2Info="child2" @test1="onTest1" @test2="onTest2"></Child1>

// 子组件
<div class="child-1">
     <p>props-child1Info: {{child1Info}}</p>
     <p>$attrs: {{$attrs}}</p>
    <hr>
    //通过v-bind 绑定$attrs属性，孙子组件组件可以直接获取父组件传递的值（除了child1组件中props声明的）通过v-on绑定$listeners属性 父组件可以获取从孙子组件传来的事件
    <Child2 v-bind="$attrs" v-on="$listeners"></Child2>
</div>

// 孙组件
<div class="child-2">
    <-- 可以直接通过$attrs来得到父组件传递过来的值 -->
    <p> $attrs 的值: {{$attrs.child2Info}}</p>
    <hr>
</div>
mounted() {
    // 通过$emit来给父组件传递事件
    this.$emit('test2','哈哈');
}
```

# 42.组件中的data为什么是函数
因为组件可能被多处使用，但它们的data是私有的，所以每个组件都要return一个新的data对象，如果共享data，修改其中一个会影响其他组件

# 43.vue组件通讯方式补充`event bus`简单应用
```js
// 入口函数中创建一个新的vue实例
var EventBus = new Vue();

Object.defineProperties(Vue.prototype, {
    $bus: {
        get: function () {
            return EventBus
        }
    }
})
```
```js
// 发送组件
test2(){
  this.$bus.$emit("updateMessage", [1,2 , Math.random()])
}
```
```js
// 接收组件
created() {
    this.$bus.$on("updateMessage", (value) => {
        this.postMsg = value  // 赋值给data中的属性，然后通过watch属性即可
    });
},
// 销毁
beforeDestroy() {
    this.$bus.$off("updateMessage");
}
```


