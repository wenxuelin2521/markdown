# 一、Typescript的数据类型
## 介绍
Typescript支持与javascript几乎相同的数据类型，此外还提供了枚举类型

## 布尔值 boolean
```ts
let flag : boolean = true
flag = 1 > 2
console.log(`flag=${flag}`);
```

## 数字
```ts
let sum : number = 100 // 十进制
let bin : number = 0x0101 // 二进制
let oct : number = 0o271 // 八进制
let hex : number = 0xfff // 十六进制
console.log(sum , bin , oct , hex);
```
## 字符串
```ts
let desc : string = "hello world"
desc = `typescript + ${desc}`
console.log(desc)
```

## 数组
```ts
let strArr : string[] = ['a', 'b' , 'c'] //字符数组
let numArr : number[] = [1,2,3,4] // 数字数组
let objArr : object[] = [{name:'xm',age:18}] // 对象数组
let bolArr : Array<boolean> = [true , false] // 范式的写法
```

## 元祖Tuple
- 表示一个已知**元素数量**和**类型**的数组，各元素的类型不必相同。
- 当访问一个已知索引的元素，会返回正确类型。
- 当访问一个越界元素，报错。
```ts
let x : [number , string] = [10 , 'hello']
console.log('元祖====使用',x[0]);
// x[3] = 100;  // error
```

## 枚举 enum
- enum类型是对javascript标准数据类型的一个补充，使用枚举类型可以为一组数据赋予友好的名字
- 默认情况下，从0开始为元素编号。你也可以手动的指定成员的数值
- 或者全部都采用手动赋值
- 枚举类型提供的一个便利是你可以由枚举的值得到他的名字
```ts
enum Color {
    Red = 1,
    Green,
    Blue
}
let color1 : Color = Color.Red
let color2 : string = Color[2] 
console.log(color1 , color2); // 1 Green
```

## 任意值 any
```ts
let unknowVal : any
unknowVal = 1
unknowVal = "hello"
unknowVal = {name:'xx'}
let anyList : any[] = [1 , 'hello' , {} , []]
```


## 空值 void
- void类型它表示没有任何类型，当一个函数没有返回值的时候，你通常会见到其返回值为`void`
- 声明一个void类型的变量没有什么作用，因为只能赋值`undefined`
```ts
function func1(x:number):void{
    console.log(x++);
    // return 0 // error
}
let voidVal : void = undefined
```

## Null和Undefined
- typescript中，`undefined`和`null`两者有各自自身的类型`undefined`和`null`，作用不大。
- 默认情况下，`undefined`和`null`是所有类型的子类，你可以`undefined`和`null`类型的变量赋值给其他类型的变量
- 然而当指定了`--strictNullChecks`标记，`undefined`和`null`只能赋值给各自的变量
```ts
// Not much else we can assign to these variables!
let u: undefined = undefined;
let n: null = null;
```

## Never
- never类型表示永不存在的值的类型
- never可以赋值给任何类型
```ts
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
  throw new Error(message);
}
```

## Object
- object表示非原始类型，也就是除number，string，boolean，symbol，null或undefined之外的类型。
```ts
declare function create(o: object | null): void;

create({ prop: 0 }); // OK
create(null); // OK

create(42); // Error
create("string"); // Error
create(false); // Error
create(undefined); // Error
```
## 类型断言
- 有时会出现你比Typescript更了解某个值的的详细信息，类型断言就是告诉编辑器，相信你，你知道在干什么
```ts
let str : any= "hello world!"
// let strlen : number = (<string>str).length // 方式一：尖括号+类型
let strlen : number = (str as string).length // 方式二： as语法。A as Type
console.log(`类型断言：${strlen}`);

```

# 二、类

## 类的使用
```ts
class Person{
    name:string
    age:number
    constructor(name:string , age:number){
        this.name = name
        this.age = age
    }
    sayHi():void{
        console.log(`hi ! i am ${this.name}`);
    }
}
let p  = new Person('小明' , 20)
p.sayHi()
console.log(p , Person.prototype);
```
## 继承
```ts
class Teacher extends Person{
    skill:string
    constructor(name:string , age:number , skill:string){
        super(name , age)
        this.skill = skill
    }
    teach():void{
        console.log('i am a teach. i can ' + this.skill);
    }
    sayHi():void{
        console.log('teach类的sayHi');
        super.sayHi()
    }
}
let t = new Teacher('tony' , 22 , 'teach')
t.sayHi()
t.teach()
```
## 公共、私有与受保护的修饰符
- `public`修饰符：成员对外可以访问（不添加修饰符，默认都是public）
- `private`修饰符：成员只有当前类的内部可以访问
- `protected`修饰符：与private相似，但是protected的成员在派生类中也能访问
```ts

class Animal{
    private name : string
    constructor(name:string){
        this.name = name
    }
    public eat():void{
        console.log('animal eat');
    }
    protected clean():void{
        console.log('animal clean');
    }
}
// let catA = new Animal('tom')
// console.log(catA.name); //error
// catA.eat() // ok
// catA.clean() // error

class Cat extends Animal{
    constructor(name : string){
        super(name)
    }
    public clean(){
        console.log('cat----clean');
        super.clean()
    }
}

let catB = new Cat('jack')
catB.clean()
```

## readonly修饰符
```ts
class Point{
    readonly x:number
    readonly y:number
    constructor(x:number , y:number){
        this.x = x
        this.y = y
    }
}
let ponit1 = new Point(100 , 200)
// ponit1.x = 300// error
```


## 存取器 get 和 set
```ts
class Box {
    private _fullname:string = ""
    get fullname(){
        return this._fullname
    }
    set fullname(name:string){
        this._fullname = name
    }
}
let box1 = new Box()
// console.log(box1._fullname); // error
box1.fullname = 'theB'
console.log(box1.fullname)
```



# 三、接口

## 介绍
接口可以理解为一个约定，一个规范。使用关键字`interface`
## 可选属性
接口里的属性不全都是必需的。 有些是只在某些条件下存在，或者根本不存在。 可选属性在应用“option bags”模式时很常用，即给函数传入的参数对象中只有部分属性赋值了。
## 只读属性
一些对象属性只能在对象刚刚创建的时候修改其值。 你可以在属性名前用readonly来指定只读属性
## 额外的属性检查
如果出了定义好的属性外，还有额外的属性，可以在接口中做额外属性配置
```ts

interface AjaxOptions{
    url: string,
    // 给属性加上？之后，这个属性就是可选的！
    type?: string,
    data?: object,
    success(data: object): void
}


// option参数中 需要包含 url type data success
function ajax(options: AjaxOptions) {
    
}

ajax({
    url: "http://www.baidu.com",
    type: "get", // 定义的时候使用了可选属性
    // data: {}, 
    success(data) {
        
    }
})

interface PointRules {
    readonly coordx : number; // 只读属性
    coordy : number; 
    [keyName : string] : any  //可配置属性
}
let p1 : PointRules = {
    coordx : 10,
    coordy : 20
}
// p1.coordx = 100 //error readonly
p1.coordy = 200

let p2 : PointRules = {
    coordx : 10 ,
    coordy : 20 ,
    coordz : 30
}
```

## 函数类型
为了使用接口表示函数类型，我们需要给接口定义一个调用签名。 它就像是一个只有参数列表和返回值类型的函数定义。参数列表里的每个参数都需要名字和类型。
```ts
interface SumInterFace{
    (a: number, b: number): number
}

let sum: SumInterFace = function (a: number, b: number) {
    return a + b;
}
```


## 类类型
TypeScript 也能够用它来明确的强制一个类去符合某种契约。使用关键字`implements`
```ts
interface paperInterface {
    color : string ;
    draw():void
}
class Paper implements paperInterface {
    color:string = "red"
    write(){
        console.log('write');
    }
    draw(){
        console.log('draw');
    }
}

let paper1  = new Paper()
paper1.write()
paper1.draw()
console.log(paper1.color);
```

## 继承接口
- 类一样，接口也可以相互继承。 这让我们能够从一个接口里复制成员到另一个接口里，可以更灵活地将接口分割到可重用的模块里。
- 一个接口可以继承多个接口，创建出多个接口的合成接口。


## 接口继承类
当接口继承了一个类类型时，它会继承类的成员但不包括其实现。

```ts
// 继承接口
interface P1{
    x: number,
    y: number
}

interface P2{
    z: number
}



interface P3 extends P2, P1{
    currTime: Date
}

let poi2: P3 = {
    z: 100,
    x: 100,
    y: 100,
    currTime: new Date()
}

//接口继承类
class Person{
    position: string = "学生"
    say():void {
        
    }
}


interface chiness extends Person{

}

let teacher1: chiness = {
    position: "教师",
    say(): void {
        
    }
}
```





[^文档的代码都在github上面：https://github.com/wenxuelin2521/demo-code/tree/master/typescript-demo]: 

