const path = require("path")
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
    open: true,
    hot: true,
    compress: true,
    port: 3001
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./index.html"
    })
  ],
  module: {
    rules: [
      {
        test: /\.css/,
        use: ["style-loader", "css-loader"]
      },
      {
          test:/\.scss/,
          use:['style-loader' , 'css-loader' , 'sass-loader'] 
      }
    ]
  }
}
