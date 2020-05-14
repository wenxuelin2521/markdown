const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin") // css打包单独文件
const HtmlWebpackPlugin = require("html-webpack-plugin")
module.exports = {
  mode: "production",
  entry: "./main.js",
  output: {
    path: path.join(__dirname, "./dist/"),
    filename: "bundle.js",
    publicPath: "/"
  },
  devServer: {
    open: false,
    hot: true,
    compress: true,
    port: 3001
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css"
    })
  ],
  module: {
    rules: [
      {
        test: /\.css/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"]
      },
      {
        test: /\.scss/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ]
      }
    ]
  }
}
