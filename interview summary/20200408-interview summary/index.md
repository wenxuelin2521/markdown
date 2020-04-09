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