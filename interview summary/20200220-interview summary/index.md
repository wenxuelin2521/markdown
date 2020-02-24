# 1.react怎样提高性能

# 2.随意给定一个无序的、不重复的数组data，任意抽取n个数，相加和为sum，也可能误解，请写出该函数

# 3.一个div，高度是宽度的50%，让该div的宽度占据整个屏幕，然后能自适应，垂直居中，怎么实现？

# 4.节流函数怎么写

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

# 6.promise、setTimeout、async/await的执行顺序
js中的宏任务一般是：包括整体代码script,setTimeout,setInterval;
微任务是： Promise,process.nextTick;
一段代码执行时，会先执行宏任务中的同步代码：
- 如果执行中遇到setTimout之类的宏任务，那么就把这个setTimeout内部的函数推入**宏任务的队列**，下一轮宏任务执行时调用
- 如果执行中遇到Promise.then()之类的微任务，就会推入到**当前宏任务的微任务队列**中，在本轮宏任务的同步代码执行完成后，依次执行微任务


# 7.用过nodejs的EventEmitter模块吗，他是怎么实现功能的，步骤是什么？

# 8.arguments是数组吗？怎么实现用它的调用数组的方法？类数组和数组的区别是什么？arguments有length属性吗？为什么要遍历类数组取值组成数组，还有更简单的方法吗？
- arguments是类数组
