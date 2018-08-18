const path = require('path')
const webpack = require("webpack");
const UglifyPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/index.js",

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js"
  },
  devServer: {
    port: 4000,
    open: true,
    proxy: {
      '/api': {
        target: "http://localhost:3100", // 将 URL 中带有 /api 的请求代理到本地的 3000 端口的服务上
        pathRewrite: { '^/api': '' }, // 把 URL 中 path 部分的 `api` 移除掉
      },
    }
  },
  resolve: {
    alias: {
      page: path.resolve(__dirname, "src/page") // 这里使用 path.resolve 和 __dirname 来获取绝对路径
      // log$: path.resolve(__dirname, "src/utils/log.js") // 只匹配 log
    },
    extensions: [".js", ".json", ".jsx", ".css", ".less"],
    modules: [
      path.resolve(__dirname, "node_modules") // 指定当前目录下的 node_modules 优先查找
    ]
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: [path.resolve(__dirname, "src")],
        use: "babel-loader"
      },
      {
        test: /\.css$/,
        // 因为这个插件需要干涉模块转换的内容，所以需要使用它对应的 loader
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {
        test: /\.less$/,
        // 因为这个插件需要干涉模块转换的内容，所以需要使用它对应的 loader
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "less-loader"]
        })
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {}
          }
        ]
      }
    ]
  },

  // 代码模块路径解析的配置
  resolve: {
    modules: ["node_modules", path.resolve(__dirname, "src")],

    extensions: [".wasm", ".mjs", ".js", ".json", ".jsx"]
  },

  plugins: [
    // 使用 uglifyjs-webpack-plugin 来压缩 JS 代码
    // 如果你留意了我们一开始直接使用 webpack 构建的结果，你会发现默认已经使用了 JS 代码压缩的插件
    // 这其实也是我们命令中的 --mode production 的效果，后续的小节会介绍 webpack 的 mode 参数
    new UglifyPlugin(),
    // 通过 html-webpack-plugin 就可以将我们的页面和构建 JS 关联起来
    new HtmlWebpackPlugin({
      filename: "index.html", // 配置输出文件名和路径
      template: "assets/index.html" // 配置文件模板
    }),
    // 引入插件，配置文件名，这里同样可以使用 [hash]
    new ExtractTextPlugin("[name].css"),
    // 有些文件没经过 webpack 处理，但是我们希望它们也能出现在 build 目录下，这时就可以使用 CopyWebpackPlugin 来处理了
    // new CopyWebpackPlugin([
    //   { from: "src/assets/favicon.ico", to: "favicon.ico" } // 顾名思义，from 配置来源，to 配置目标路径
    // ]),
    // webpack的内置插件
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(true), // const PRODUCTION = true
      VERSION: JSON.stringify("5fa3b9"), // const VERSION = '5fa3b9'
      BROWSER_SUPPORTS_HTML5: true, // const BROWSER_SUPPORTS_HTML5 = 'true'
      TWO: "1+1", // const TWO = 1 + 1,
      CONSTANTS: {
        APP_VERSION: JSON.stringify("1.1.2") // const CONSTANTS = { APP_VERSION: '1.1.2' }
      }
    }),
    new webpack.ProvidePlugin({
      _: "lodash"
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ]
};