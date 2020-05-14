module.exports = {
  plugins: [
    require("autoprefixer"),
    require("postcss-px2rem")({
      remUnit: 75
    })
  ]
}

// 750 --> 100 * 120

// 375 --> 50 * 60

// 414 ---> 56 * 67

// 前端开发人员拿到设计稿(750 * 1600)高度会根据内容变化改变
// 将设计稿切成10份，每份就 = 75px
// 让 1rem = 75px，postcss计算px2rem的时候，就根据1rem = 75px来换算


// lib-flexible将设备分辨率切成10分,然后设置html标签的font-size，使得1rem = screenwidth / 10 px
// 在别的屏幕下，1rem 就会根据 十分之一的screenwidth来换算

// 从而实现适配
