// 1.原型链实现继承
// 缺点：引用类型共享，父类无法接收参数
// function Parent(){
//     this.name = "gdx"
//     this.list = [1,2,3]
//     this.sayHi = function(){
//         console.log(`Hello,i am ${this.name}`)
//     }
// }
// function Child(age){
//     this.age = age
// }
// Child.prototype = new Parent()

// let c1 = new Child(18)
// let c2 = new Child(20)
// c1.list.push(4)
// console.log(c1.age , c1.name , c1.list)
// console.log(c2.age , c2.name , c2.list)
// c1.sayHi()


// 2.借用构造函数，利用call改变this指向实现
// 优点：解决了方法1的缺点：引用类型不再共享，而且可以给父类传方法
// 缺点：实例方法都定义在构造函数中，创建对象时，方法都会创建一遍
// function Parent(name){
//     this.name = name
//     this.list = [1,2,3]
//     this.sayHi = function(){
//         console.log(`hello , i am ${this.name}`)
//     }
// }
// function Child(name , age){
//     Parent.call(this , name )
//     this.age = age

//     this.sayGoodBye = function(){
//         console.log(`goodbye , i am ${this.age}`)
//     }
// }
// let c1 = new Child('gdx' , 20)
// let c2 = new Child('doinb' , 24)
// c2.list.push(4)
// console.log(c1.name , c1.age , c1.list)
// console.log(c2.name , c2.age , c2.list)
// c1.sayHi()
// c2.sayGoodBye()

// 3.组合继承：方法一和方法二的结合
// function Parent(name){
//     this.name = name
//     this.list = [1,2,3]
// }
// Parent.prototype.sayHi = function(){
//     console.log(`hello world! i am ${this.name}`)
// }
// function Child(name , age){
//     this.age = age
//     Parent.call(this , name)
// }
// Child.prototype = new Parent()
// Child.prototype.constructor = Child // 校正原型指向


// let c1 = new Child('gdx' , 19)
// console.log(c1.name , c1.age , c1.list)