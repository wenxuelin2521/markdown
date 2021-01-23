# 1.vuex是什么？怎么使用，用在什么场景？
- vue框架中的状态管理
- 使用方式：查看项目 : `/Users/lin/workspace/code/vue-review`
- 场景：组件之间的传参，数据状态记录共享

# 2.vuex有哪几种属性？
vuex中有五种属性：`state , getters , mutations , actions , modules`

- state:存放状态值
- getters:state中的派生属性
- mutations:直接更新状态值（同步）
- actions:与mutations作用相同，不同点：不是直接更新状态值，而是通过提交mutations来更新状态值。（异步）
- modules:将store切割成模块


# 3.vuex的state特性？
- state就是数据源存放
- state中存放的数据是响应式的
- 可以使用`mapState`辅助函数把state映射到组件中compute属性
```js
import { mapState } from "vuex";
/** 使用方法1： */
  computed:{
    count(){
      return this.$store.state.count
    }
  }
  /** 使用方法2： */
  computed:mapState({
    count: state => state.count,

    countPlusLocalData(state){
      return state.count +  this.localCount
    }
  })
  /** 使用方法3： */
  computed:{
    localNewCount(){ // 组件自身需要计算的值
      return Math.random() + this.localCount
    },
    ...mapState([
      "count"
    ])
  }
```

**备注：**
通过computed属性将store中的值映射出去如果使用v-model绑定会报错：`no setter`;


# 4.vuex的getters的特性？
- 对state进行计算操作
- 虽然在组件中内也可以进行计算属性，但是写在getters可以在多组件之间复用
- gettter接受第个参数为`state`，第二个参数为`getters`
- 可以使用`mapGetters`辅助函数把store中的getter映射到组件中的compute属性
```js
// store中
export default new Vuex.Store({
  state: {
    count:10,
    list:[
      10,20,30
    ]
  },
  getters:{
    /** 通过属性使用 */
    listLen:state => state.list.length,
    listSum :(state , getters) => {
      let sum = 0
      state.list.forEach((item) => {
        sum += item
      })
      return sum
    },
    /** 通过方法使用 */
    getTargetFromList:(state) => (target)=>{
      return state.list.find(item => item === target)
    }
  },
  mutations: {},
  actions: {},
  modules: {}
});

// 组件中
import {mapGetters} from "vuex";
computed:{
  ...mapGetters([
    "listLen",
    "listSum",
    "getTargetFromList"
  ])
},
```

# 5.vuex的mutations的特性？
- 更改state的唯一方法是提交mutation
- store.commit传入的额外的参数，称为**载荷**，在大多数情况下，载荷应该是一个对象
- mutation必须是同步函数
- 可以使用`mapMutations`辅助函数把组件中的methods映射为`store.commit`调用，**需要在根节点中注入store**

```js
export default new Vuex.Store({
  state: {
    count:10,
  },
  getters:{},
  mutations: {
    increment(state , payload){
      state.count += payload.val
    }
  },
  actions: {},
  modules: {}
});

// 组件中使用
...mapMutations([
  "increment"
]),
update(){
  // 提交载荷的形式使用
  this.$store.commit("increment" , {val: 100})
  // 对象风格使用
  this.$store.commit({
    type: "increment",
    val: 50
  })
}

```

# 6.vuex的actions的特性？
- action提交的是mutation，而不是直接变更状态
- action接收一个与store实例具有相同方法和属性的对象`context`
- action可以包含任意的异步操作
- 可以使用`mapActions`辅助函数将组件的methods映射为`store.dispatch`调用。
```js
export default new Vuex.Store({
  state: {
    count:10,
  },
  getters:{},
  mutations: {
    increment(state , payload = {val : 1}){
      state.count += payload.val
    }
  },
  actions: {
    useIncrement(context , payload){
      console.log(context , payload)
      setTimeout(() => {
        context.commit('increment' , payload)
      }, 2000);
    }
  },
  modules: {}
});

// 组件中
methods: {
  ...mapActions([
    "useIncrement"
  ]),
  update(){
    this.$store.dispatch('useIncrement' , {val : 11})
  }
},
```


# 7.vuex的优缺
- 优点：
  + 提高代码可维护性
  + 属于vue生态的一环，能够触发响应式的渲染页面更新
  + 限定了一种可改变数据的方式，避免数据污染
- 缺点：
  + 刷新浏览器，vuex中的状态会重置为初始状态（可以使用插件vuex-persistedstate处理）

# 8.vuex的原理

[学习掘金博主YXi的文章，点击查看详情](https://juejin.cn/post/6844903949938475022#heading-6)

总结：vuex仅仅是作为vue的一个插件而存在，依赖于Vue的设计。
利用`computed`,`Object.defineProperty`,`data`的响应式等实现。
其本质就是没有`template`的隐藏组件。

```js
// 简单模拟实现vuex的state,getters,mutations,actions功能
let Vue;

class Store{
    constructor(options){
        
        // state实现一：
        // this.state = options.state
        // state实现二：（响应式）
        this._s = new Vue({
            data:{
                state:options.state
            }
        })
        

        // getter实现：利用Object.defineProperty中的get属性实现
        let getters = options.getters || {}

        this.getters = {}

        Object.keys(getters).forEach(getter => {
            Object.defineProperty(this.getters , getter , {
                get:() => {
                    return getters[getter](this.state)
                }
            })
        })

        // mutation实现：传递进来的mutations遍历，然后挂载到this上
        let mutations = options.mutations || {}

        this.mutations = {}

        Object.keys(mutations).forEach(mutation => {
            this.mutations[mutation] = (payload) => {
                mutations[mutation](this.state , payload)
            }
        })


        // actions实现：与mutations相类似
        let actions = options.actions || {}

        this.actions = {}

        Object.keys(actions).forEach(action => {
            this.actions[action] = (payload)=>{
                actions[action](this , payload)
            }
        })


    }

    // 定义commit提供组件使用
    commit = (type , payload) => {
        this.mutations[type](payload)
    }

    // 定义dispatch提供组件使用
    dispatch = (type , payload) => {
        this.actions[type](payload)
    }

    get state(){
        return this._s.state
    }
}

const install = (_Vue) => {
    Vue = _Vue;
    // 混入进每一个组件中
    Vue.mixin({
        beforeCreate() {
            console.log("打印出this指向：", this)
            console.log(this.$options.name)// this指向各个组件

            // 给每一个组件都挂在$store
            if(this.$options && this.$options.store){
                // 根组件
                this.$store = this.$options.store
            }else{
                // 非根组件
                this.$store = this.$parent?.$store
            }
        },
    })
}


export default {
    install,
    Store
}
```