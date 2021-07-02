# 1.使用 eval 将字符串转对象

```js
var a = "{'name':'xm'}";
console.log(eval("(" + a + ")"));
```


# 2.mac系统修改chorme安全协议
```
open -n /Applications/Google\ Chrome.app/ --args --disable-web-security  --user-data-dir=/Users/lin/MyChromeDevUserData/
```


# 3. ios客户端中input框为readonly状态，点击会弹出有上下箭头以及完成按钮的一条操作栏

<img src="./images/ios-input框tab栏的问题.png" style="zoom:50%;">


```html
<input type="text"  readonly="readonly"  placeholder="请选择" id="service">
```

```js
$("#service").on("click", function() {
	document.activeElement.blur();
})
```

# 4. 文本框内按enter键，禁止回车
```js
keydown(e){ // 一定是keydown事件，keyup还是会先执行换行
    if(e.keyCode == 13){
      // do something......
      e.returnValue = false;
      return false;
    }
  }
```

# 5.-webkit-overflow-scrolling:auto;
ios系统上，禁止滚动回弹效果；
取值touch的时候开启回弹效果;


# 6. 前端模块化：AMD CMD CommonJS ES6对比

- CommonJS：主要实践Node.js，浏览器端不支持
```js
// 定义模块math.js
module.exports = {
  number : 0,
  add : function(){}
}
// 引入自定义模块
var math = require('./math')
math.add()
```

- AMD和require.js
AMD是require.js在推广过程中对模块定义的规范化产出，是一个概念。require.js是对这个概念的实现。
AMD规范采用异步方式加载模块，模块的加载不影响它后面语句的运行。
```js
// 网页中引入require.js和入口main.js
// <script src="js/require.js" data-main="js/main></src>
// 入口文件main.js中配置基础模块
require.config({
  baseUrl:"js/lib",
  paths:{
    "jquery":"jquery.min", // 实际路径为js/lib/jquery.min.js
    "underscore":"underscore.min"
  }
})
// 执行基本操作：模块名作为require()第一参数，如果定义的模块本身也依赖其他模块，那就需要将它们放在[]中作为define第一参数
require(["jquery" , "underscore"] , function($ , underscore){
  // do something
})
// 自定义math.js模块
defined(function(){
  return {
    number:0,
    add:function(){}
  }
})
// 自定义一个依赖underscore的模块
defined(["underscore"],function(_){
  return {}
})
// 引用模块
require(["jquery","math"] , function($ , math){})
```

- CMD和sea.js
CMD与AMD很类似，不同在于：AMD推崇依赖前置，提前执行，CMD推崇依赖就近，延迟执行。
```js
// AMD写法
define(['a','b','c'] , function(a,b,c){
  // 等于在最前面声明并初始化了要用到的所有代码，即使某个模块没有使用到
})
// CMD写法
define(function(require , exports , module){
  var a = require('./a')//在需要的时候声明
  // a.doSomething
})
/* sea.js使用 */
// 定义模块math.js
define(function(require,exports,module){
  var $ = require('jquery.js')
  var add = function(){}
  exports.add = add
})
// 加载模块
seajs.use(['math.js'] , function(math){
  var sum = math.add()
})
```

- ES6 Module：浏览器和服务器通用的模块解决方案
```js
// 自定义math.js模块
var add = function(){}
export {add}
// 引用模块
import {add} from "./math.js"

// 自定义util.js模块
var sub = function(){}
export default {sub}

// 引入
import util from "./util.js"
util.sub()

```








