# Angular
Angular版本说明：
- AngularJS --> v1.x
- Angular   --> v2.x及其以上版本
- 编写该文档的时候使用的 Angular v9.x 最新

## Angular CLI    

1. 安装脚手架
```
npm install -g @angular/cli
```

2. 创建工作空间和初始应用
```
ng new my-app[项目名称]
```

3. 运行应用
```
cd my-app[项目名称]
ng serve --open
```

# 基本目录
根目录的目录结构
<img src="./img/目录结构1.png" alt="目录结构" style="zoom:50%">

app下的目录结构
<img src="./img/目录结构2.png" alt="app文件夹的目录结构" style="zoom:50%">





## 模块
Angular应用是模块化的。拥有自己的模块系统，称作**NgModule**。每一个Angular应用至少有一个NgModule类。文件叫做app.module.ts。
在项目中创建**模块**可以使用脚手架提供的命令`ng g(generate) m(module) path/name`

### @NgModule元数据
每一个模块中都会使用`@NgModule`去装饰。`@NgModule()`装饰器其实是一个函数，它接收一个元数据对象，用来描述这个模块，其中常用的属性：
- declarations：声明本模块中的组件、指令、管道
- imports：导入本模块中使用其他模块的东西
- exports：导出提供给其他模块使用的东西
- providers：使用的服务
- bootstrap：应用视图的根模块，只有根模块才设置`bootstrap`属性

注：

装饰器是一个函数，作用是修饰紧随其后的类或者属性。装饰器是JavaScript的一种语言特性，处于语法提案的stage2阶段，是一个试验特性

### 模块与组件
模块为组件提供了一个**编译上下文环境**，模块总会有一个根组件，任何模块都能包含任意数量的的其他组件

### NgModule和JavaScript的模块
这两种模块系统是不同的，并且没有直接关联。在JavaScript中每一个文件就是一个模块，文件中定义的内容都是属于那个模块的，需要通过`export`关键字导出

### Angular自带的库
每个Angular库的名称都带有`@angular`前缀


## 组件
在项目中创建**组件**可以使用命令`ng g(generate) c(component) path/name`。
Angular中通过`@Component()`标记类，来说明这个类才是组件
组件会有创建、更新、销毁等行为，所以会有对应的可选**声明周期**：`ngOnChanges()`,`ngOnInit()`等，后续详细描述。

### 组件中的元数据
`@component()`接收一个配置对象，常用的属性：
- selector：告诉Angular，如果在模板中遇见这个选择器对应的标签，就将内容解析成该组件。（相当于定义组件的标签名）
- templateUrl：该组件的模板路径
- template：该组件的模板，直接将模板写在里面
- styleUrls：模板对应的样式文件
- prodivers：该组件中所需服务的提供者的一个数组

### 模板语法
跟标准的html很相似，但是还包含Angular的模板语法，逻辑、数据绑定、管道等。[官方文档关于模板语法](https://angular.cn/guide/template-syntax)
例：
```html
<!--Angular中的数据绑定-->
<li>{{hero.name}}</li>
<li [title]="hero.msg">绑定属性</li>
<li (click)="selectHero(hero)">点击测试</li>
<input type="text" [(ngModel)]="inputMsg">
```

- 数据绑定
数据双向绑定依赖模块`import { FormsModule } from '@angular/forms'`
在模块装饰器中引入：`imports:[FormsModule]`
用法`<input type="text" [(ngModel)]="inputMsg">`

- 管道
Angular中的管道可以作用于模板显示值的转换，可以使用内置管道，也可以自定义管道。
[官方文档关于管道](https://angular.cn/api?type=pipe)

- 指令 
Angular中的指令就是让模板中的dom，内容根据**指令**来进行转换显示。
[官方文档关于指令](https://angular.cn/guide/template-syntax#built-in-directives)
结构型指令
- `*ngFor`：迭代器，根据数据做遍历渲染，需要添加`trackBy`方法可以做数据优化
```html
<li *ngFor="let item of list"> {{item}}</li>
```
- `*ngIf`：条件判断，页面整个dom消失隐藏
属性型指令
- `[(ngModel)]`

## 服务与依赖注入
在项目中创建**服务**可以使用命令`ng g(generate) s(service) path/name`

### 服务
Angular中定义了**服务类**，服务为组件提供处理问题的更明确的方法，做一些更具体的事情。Angular将组件和服务进行了区分，来提高模块性和服用性。**理想情况下，组件只管用户体验，只提供数据绑定的属性和方法**。组件应该将从服务器获取数据，验证用户输入等内容交给服务。

### 依赖注入dependency injection (DI)
在Angular中定义一个服务类，要使用`@Injectable()`装饰器。`@Injectable()`装饰器也可以用来表明一个组件或者其他类（另外一个服务、管道、NgModule）拥有一个依赖。**依赖它不一定是服务，它还可以是函数或者值**

`@Injectable()`接收的也是一个对象，其中
- providedIn：说明服务的提供者，root表示注册在根，这样可以让它随处可用。也可以为特定的的模块或者组件注册提供者。

## 使用说明
1. 通过`@Inject()`装饰器来表示一个服务
2. 服务需要提供注册商才可以使用
3. Angular通过依赖注入来为组件提供服务
4. 依赖注入在使用服务的时候，只需要提供服务就可以了。不需要手动创建服务实例
5. 推荐在constructor中提供组件使用到的服务
```js
/*服务定义*/ 
import { Injectable } from '@angular/core'
@Injectable({
  providedIn: 'root'
})
export class MyService {
  constructor() {}
  doSomething(){
    console.log("do something")
  }
}

/*组件中使用*/
import {MyService} from '../service'
@Component({
  selector: "...",
  templateUrl: "...",
  styleUrls: "...",
})
export class MyCom implements OnInit{
  construncto(private services : MyService){}
  ngOnInit(){
    this.serrvices.doSomething()
  }
}

```


## 路由
Angular中的路由是使用HTML5的`history.pushState()`和`history.replaceState()`来实现。
浏览器的三种导航：
- 页面地址栏上输入URL
- 在页面中点击链接
- 浏览器的前进，后退按钮

### 基本概念
1. `<base href>`元素
index.html页面中添加`<base-href="/">`

2. 从路由库中导入`import { RouterModule, Routes } from '@angular/router';`

3. 配置路由
```ts
// step1:引入组件
import { AppHomeComponent } from './app-home/app-home.component'
import { AppAboutComponent } from './app-about/app-about.component'
// step2:引入路由模块
import { RouterModule, Routes } from '@angular/router';
// step3:定义路由，配置路由规则
const appRoutes: Routes = [
  { path : '/home' , component : AppHomeComponent} , 
  { path : '/about' , component : AppAboutComponent},
  // 通配符路由
  // 注意：通配符路由应该出现在路由规则最后。
  {
    path:'**',
    component:NotfoundComponent
  }
];
// 模块声明
@NgModule({
  declarations: [
    AppHomeComponent,
    AppAboutComponent
    // ...
  ],
  imports: [
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    )
    // ...
  ],
  providers: [],
  bootstrap: [AppComponent]
})
```
```html
<!-- step4:指定路由出口 -->
<router-outlet></router-outlet>

<!-- step5:指定路由的导航链接 -->
<a routerLink="/home">跳转</a>
```
```ts
// 编程式导航实现跳转
// 导入路由提供的服务
import { Router } from '@/angular/router'img
@Component({
  selector:'...',
  templateUrl:'...',
  styleUrls:['...' , '...']
})

export class NotFound implements OnInit{
  constructor(private router : Router){}
  // ...
  ngOnInit(){
    this.router.navigate(['/home'])
  }
}
```
4. 路由参数和子路由
```ts
// 1 导入路由模块
import { RouterModule, Routes } from '@angular/router'
// 2. 配置路由
const appRoutes:Routes = [
  {path : '' , redirectTo : '/home', pathMatch:'full'}, // 重定向路由 , 全配对
  {path : 'home' , component : Homeponent},
  {path : 'about/:id' , Component : About}, // id表示路由参数，可以匹配路由： /about/1, / about/2 ...
  {
    path : 'info' ,
    component:Info,
    children:[
      {path : 'national' , component : National} , // 子路由配置，如果path为空则立即展示该组件
    ]
  }
]
// 在模板中获取
// 1. 导入路由服务
import {ActiveRoute} from '@angular/router'
// ...
export class About implements OnInit {
  constructor (private route : ActivedRoute){}
  ngOnInit(){
    // *****使用*****
    this.route.paramMap.subscribe(param => {
      console.log('路由参数为' , param)
    })
  }
}


```


## 组件的交互
### 父组件传递数据给子组件

```ts
// 父组件中定义数据，并且在模板中通过属性绑定值，传递给父组件
export class Parent {
  parentData = "我是父亲"
}
/* 父组件的模板
<app-child [skill] = "parentData"></app-child>
*/

// 子组件中通过@Input()修饰器公开属性
import { Component, OnInit, Output, EventEmitter } from '@angular/core'

export class Child {
  constructor(){}

  // 公开属性
  @Input()
  skill

  // do something else ...
}

/* 子组件的模板

<p>子组件中接收到的数据：{{skill}}</p>

*/

```

### 子组件传递数据给父组件
子组件中创建事件，父组件中提供方法，并且绑定在子组件中，由子组件触发事件，并且将参数传递给方法
```ts
// 子组件中创建事件，使用@Output来修饰
export class Child {
  constuctor(){}
  // step 1
  @Output()
  getData = new EventEmitter()

}

// 父组件中定义方法
export class Parent {
  // step 2
  queryData(data) {
    console.log("从子组件中拿到的数据" ,data)
  }
}
/* step 3 在父组件模板中绑定事件
<app-child (getData)="queryData($event)"></app-child>
*/

// 子组件中触发事件，传递参数
this.getData.emit('hello world~~~')

```


## 指令
使用过的指令：
`[(ngModel)]`：在表单元素中实现双向数据绑定
`(click)`：事件绑定指令
`[href]`：属性绑定指令

指令的分类：
- 组件：拥有模板的指令
- 属性型指令：改变元素外观和行为。such as :`[ngClass]`和`[ngStyle]`
- 结构型指令：添加或者移除dom元素改变dom布局的指令。such as：`*ngIf`和`*ngFor`，`*ngFor`可以添加trackBy方法，目的是提高渲染对象数组的性能。（类似于vue的key）

自定义指令：
```js
// to be continue
```

## HttpClient
- 作用：发送Http请求
- 封装了浏览器提供的XMLHttpRequest接口
- 使用基于可观察（Observeable）对象的API
- 提供了请求和响应拦截
- 流式错误处理机制等
```ts
// 1. 在模块中导入HttpClient模块，并且注册。
// 如: app.module.ts
import { HttpClientModule } from '@/angular/common/http'
// ...else code
// 注册
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

// 2. 组件中使用 如： app.component.ts
// 先导入
import { HttpClient } from '@angular/common/http'
// 挂到组件中
export class AppComponent{
  constructor(private http : HttpClient)

  getData() {
    // 发送get请求
    this.http.get('../assets/test.json').subscribe((res: any) => {
      // console.log(res)
      this.name = res.name
    })
  }

}


```


## forRoot说明
- 问题说明：服务应该是单实例，在某些场景下会造成服务/模块多次注册，破坏服务单例性，比如路由懒加载
- 解决方式：使用模块的forRoot()方法导入模块
- 比如：RouterModule的forRoot()保证项目中只有一个Router服务
```ts
// 1 导入路由模块
import { RouterModule, Routes } from '@angular/router'

// 2 配置路由规则
const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  }
]
@NgModule({
  declarations: [AppComponent, HomeComponent],
  // 3 配置路由模块，作为根模块的依赖项
  imports: [BrowserModule, RouterModule.forRoot(appRoutes)],
  providers: [],
  bootstrap: [AppComponent]
})

```

## 表单
### 模板驱动表单（基于模板语法`[{ngModel}]`）
### 响应式表单



