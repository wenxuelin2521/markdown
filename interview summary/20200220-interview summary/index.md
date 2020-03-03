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
