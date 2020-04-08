# 1.javascript中的深拷贝与浅拷贝
**浅拷贝**就是将对象的属性依次复制不会进行递归，换句话说就是将变量指向同一个内存地址。
**深拷贝**会开辟一块新的内存空间用来存放新对象的值，两个对象对应两个不同的内存地址。

- 实现浅拷贝的方法：
（1）`Object.assign()`
（2） `Array.prototype.slice()`
（3） `Array.prototype.concat()`
遍历源对象，将对象的属性值都放到新对象中即可

- 实现深拷贝的方法：
（1）`JSON.stringfy()`和`JSON.parse()`混合配对使用。缺点：序列化的时候undefined/函数/symbol会被忽略
（2）递归