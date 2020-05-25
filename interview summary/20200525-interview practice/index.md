## 下面js输入的结果
```js
document.addEventListener("click", function () {
  Promise.resolve().then(() => console.log(1))
  console.log(2)
})

document.addEventListener("click", function () {
  Promise.resolve().then(() => console.log(3))
  console.log(4)
})
// 2 1 4 3
```
