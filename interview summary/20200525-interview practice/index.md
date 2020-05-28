>  https://github.com/Advanced-Frontend/Daily-Interview-Question 

- 第159题：实现Promise.retry，成功后resoleve结果，失败后重试，尝试超过一定次数才真正的reject
```js
Promise.retry = function(promFn , resolve1 , reject1 , max = 2){
  return new Promise((resolve , reject) => {
    resolve1 = resolve1 || resolve
    reject1 = reject1 || reject
    promFn().then(res => {
      resolve1(res)
    },err =>{
      if(!max){
        reject1(err)
      }else{
        this.retry(promFn , resolve1 , reject1 , --max)
      }
    })
  })
}

function fn(){
  var n = Math.random()
  return new Promise((resolve , reject) => {
    setTimeout(() => {
      if(n > 0.5){
        resolve(n)
      }
      reject(n)
    } , 1000)
  })
}

Promise.retry(fn)
```

- 第160题：输出以下代码运行结果，为什么？如果希望每隔 1s 输出一个结果，应该如何改造？注意不可改动 square 方法
```js
const list = [1, 2, 3]
const square = num => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(num * num)
    }, 1000)
  })
}

function test() {
  list.forEach(async x=> {
    const res = await square(x)
    console.log(res)
  })
}
test()

// 一次性输出 1 4 9
// 解析：foreach不阻塞
// 修改每隔1s输出
async function test() {
    for (let i = 0; i < list.length; i++) {
        const res = await square(list[i])
        console.log(res)
    }
}
```