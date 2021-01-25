# 组件的通讯（6种方法）

[学习文章总结](https://github.com/ljianshu/Blog/issues/66)

## 方法一、props和$emit
- 父组件向子组件传值
给子组件元素中绑定属性，子组件中定义props中接受

- 子组件向父组件传值
子组件通过事项的形式，将数据传递给父组件

备注：**props只有只读属性，子组件不应该直接修改props中的值！！**


## 方法二、$on和\$emit
通过一个空的vue实例，作为事件总线`EventBus`，利用`$on`来做事件的监听，`$emit`做事件的发布,`$off`实现取消事件的监听。从而实现父子，兄弟，跨级等组件间的通讯。

```js
// 1.在main.js中，给Vue.prototype绑定EventBust
Vue.prototype.$eventBus = new Vue();

// 2. 在组件creted或者mounted中进行事件的订阅
this.$eventBus.$on("事件名" , "触发的回调方法")

this.$eventBus.$off("事件名" , "监听时候传入的回调")
/*
关于$off：
（1）如果没有传入参数，那么就会移除所有事件监听
（2）如果只传入了事件名称，那么就会移除该事件的所有金婷
（3）如果传入了事件名称，并且传入了对应的回调，那么就只会移除该回调的监听事件
*/

// 3. 触发发布事件
this.$eventBus.$emit("事件名" , "传给订阅事件的参数")

```


## 方法三、vuex和localStorage
vues生态中的一环，不做解释。


## 方法四、$attrs和\$listeners
- `$attr`：包含父作用域中不被props所识别且获取的特性。（class和style除外），可以通过`v-bind="$attrs"`传递给内部组件
- `$listeners`：包含了父作用域中（不含.native修饰器）的v-on事件监听器，可以通过`v-on="$listeners"`传递给内部组件
简单来说：`$attrs`与`$listeners`是两个对象，`$attrs`里存放的是父组件中绑定的非Props属性，`$listeners`里存放的是父组件中绑定的非原生事件。

## 方法五、provide和inject
- 祖先组件向其所有子孙后代注入一个依赖，不论组件层次有多深，并在起上下游关系成立的时间里始终生效。
- 概括：祖先组件中通过`provide`来提供变量，然后子组件中通过`inject`来注入变量。
- 使用场景：子组件获取上级组件的状态，跨级组件间建立了一种主动提供与依赖注入的关系。
- 注意：`provide`和`inject`的绑定并不是响应式的。
实现响应式的方法：
1. 传递组件组件实例
2. 使用`Vue.observable`优化

```vue
<!-- 简单用法 -->
<!-- 祖先组件中-->
export default {
    provide:{
        msg:"test-provide", // 组件自身渲染使用会报未定义
    },
    methods:{
        changeMsg(){
            this.msg = "test-provide-"+Math.random()
        }
    }
}
<!--子组件中获取-->
export default {
    inject:["msg"],// 如果祖先改变了值，这里并不会跟着改变。（对象类型可以）
}

<!--响应式实现用法 Vue.observable实现-->
<!-- 父组件-->
import Vue from "vue"
export default {
    provide(){
        this.article = Vue.observable({
            msg:"test-provide-0"
        })
        return {
            article:this.article
        }
    },
    methods:{
        changeMsg(){
          this.article.msg = "test-provide-"+Math.random()
      }
    }
}
<!--子组件-->
<template functional>
    {{injections.article.msg}}
</template>
export default {
    inject:{
        article:{
            default:() => {}
        }
    }
}
```


## 方法六、$parent和\$children，ref

- `ref`：如果用在普通Dom元素上，获取的是Dom元素的引用，如果用在子组件中，获取到的就是组件实例。
- `$parent/$children`：访问组件的父/子实例

通过使用组件实例中的`data`和`methods`来实现组件间的通讯

```vue
<!--父组件：往下传了四个属性:apple,banana,orange,lemon，两个方法:ok,cancel-->
<div>
    <son :apple="apple" :banana="banana" :orange="orange" :lemon="lemon" @ok="ok" @cancel="cancel"/>
</div>

data() {
  return {
      apple:"apple",
      banana:"banana",
      orange:"orange",
      lemon:"lemon",
  };
},
methods:{
    ok(data){
        this.count = data
    },
    cancel(){
        console.log("cancel")
    },
}
<!--子组件  son-->
<div>
    <grandson v-bind="$attrs" v-on="$listeners" />
</div>

props:{
    apple:String
}
created(){
    // 这里取到的$attrs就是除了apple,因为apple已经被props取了
    // 而$listeners就是ok，cancel
}

<!--孙组件 grandson-->
<div>
    <nextgrandson  v-bind="$attrs" v-on="$listeners"  />
</div>

props:{
    banana:String
}
created(){
    // 这里取到的$attrs就是除了apple,banana,因为apple,banana已经被props取了
    // 而$listeners就是ok，cancel
}

<!--曾孙组件 nextgrandson-->
<div>一堆内容</div>

props:{
    orange:String
}
created(){
    // 这里取到的$attrs就是lemon，其他已经被其他props取了
    // 而$listeners就是ok，cancel
}
```


# vue的响应式

# vue的整个实现流程

# vue的虚拟dom算法

