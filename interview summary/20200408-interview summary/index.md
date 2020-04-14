# 1.javascript中的深拷贝与浅拷贝
**浅拷贝**就是将对象的属性依次复制不会进行递归，换句话说就是将变量指向同一个内存地址。
**深拷贝**会开辟一块新的内存空间用来存放新对象的值，两个对象对应两个不同的内存地址。

- 实现浅拷贝的方法：
（1）`Object.assign()`
（2）`Array.prototype.slice()`
（3）`Array.prototype.concat()`
遍历源对象，将对象的属性值都放到新对象中即可

- 实现深拷贝的方法：
（1）`JSON.stringfy()`和`JSON.parse()`混合配对使用。缺点：序列化的时候undefined/函数/symbol会被忽略
（2）递归

# 2.弹性布局
容器属性：
- `flex-direction`,可选属性值row/row-reverse/column/column-reverse
- `flex-wrap`,可选属性值nowrap/wrap/wrap-reverse
- `flex-flow`,该属性值是flex-direction和flex-wrap简写，`flex-flow:<flex-direction> || <flex-wrap>`
- `justify-content`,可选值flex-start/flex-end/center/space-between/space-around
- `align-items`,可选值flex-start/flex-end/center/baseline/strench
- `align-content`,（该属性定义多轴线下的对齐方式）可选值flex-start/flex-end/center/space-between/space-around/strench

项目属性：
- `order`,定义项目的排列顺序，数值越少越靠前,默认0，`order:<integer/>`
- `flex-grow`,定义项目放大比例
- `flex-shrink`,定义项目缩小比例
- `flex-basis`,定义项目在分配多余空间之前，占据主轴空间
- `flex`,flex-grow|flex-shrink|flex-basis的简写
- `align-self`,设置单个项目与其他项目不一样的对齐方式，可覆盖align-items,默认auto

# 3.javascript实现继承的方式 （5种）
- 类继承（原型继承）：**修改子类构造函数原型，指向父类实例**
缺点：
（1）引用缺陷
（2）初始化继承属性会变成一样的

- 构造函数继承：**子类使用apply调用父类**
缺点：
（1）无法获取父类的公共方法

- 组合继承：**原型继承和构造函数继承组合在一起**
缺点：
（1）调用了两次父类构造函数

- 寄生组合式继承：**在组合继承的基础上减少一次多余的调用父类的构造函数：**
利用了`Object.create()`进行一次浅拷贝
`Object.create`相当于
```js
funCreate(obj){
    function Fun(){}
    Fun.prototype = obj
    return Fun()
}
```

- extends继承：**使用es6中的class和extends实现**


# 4.promise的特性
- 定义：一个对象，用来传递异步操作的消息。可以理解成异步编程的一种解决方案。

- 特性：
代码立即执行；
状态不可逆；
回调异步；
链式调用；


# 5.观察者模式和订阅-发布模式的区别，分别用在哪里
- 观察者模式：一对多的依赖关系，当目标状态改变，所有依赖它的对象都会得到通知

- 发布订阅模式：一个（主题/事件），希望接收到通知的对象通过自定义事件订阅（主题/事件）subscriber，（主题/事件）对象publisher通过发布主题事件通知每一个订阅的subscriber。

- 区别：发布订阅，多了一个第三者：事件中心。目标对象并不直接通知观察者，而是通过事件中心来派发通知。



# 6.行内元素、块级元素、空元素

# 7.html5和css3新特性

# 8.cookie、localstorage、sessionstorage

# 9.统计字符次数

# 10.js对字符串去空（前后空格）

# 11.原生dom操作（增删改移动）