# 1.使用 eval 将字符串转对象

```js
var a = "{'name':'xm'}";
console.log(eval("(" + a + ")"));
```


# 2.mac系统修改chorme安全协议
```
open -n /Applications/Google\ Chrome.app/ --args --disable-web-security  --user-data-dir=/Users/lin/MyChromeDevUserData/
```