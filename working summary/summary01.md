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