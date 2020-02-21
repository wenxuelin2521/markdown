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
## 枚举
## 任意值
## 空值
## Null和Undefined
## Never
## Objecct
## 类型断言


# 二、类

## 介绍
## 类
## 继承
## 公共、私有与受保护的修饰符
## readonly修饰符
## 存取器




# 三、接口

## 介绍
## 接口初探
## 可选属性
## 只读属性
## 额外的属性检查
## 函数类型
## 类类型
## 继承接口
## 接口继承类