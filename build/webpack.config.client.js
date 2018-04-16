const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const webpackBase = require('./webpack.config.base')
const HtmlPlugins = require('html-webpack-plugin')
const isDev = process.env.NODE_ENV === 'development'
const config = webpackMerge(webpackBase, {
  entry: {
    app: path.join(__dirname, '../client/app.js')
  },
  output: {
    filename: '[name].[hash].js',
    path: path.join(__dirname, '../dist'),
    publicPath: '/public/'//  浏览器加载时候区别静态资源和通过http请求的资源****
  },
  resolve: {
    extensions: ['.jsx', '.js']
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /.(jsx|js)$/,
        loader: 'eslint-loader',
        exclude: [
          path.resolve(__dirname, '../node_modules')
        ]
      },
      {
        test: /.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /.js$/,
        loader: 'babel-loader',
        exclude: [
          path.join(__dirname, '../node_modules')
        ]
      }
    ]
  },
  plugins: [
    new HtmlPlugins({
      template: path.join(__dirname, '../client/template.html')
    }),
    new HtmlPlugins({
      template: '!!ejs-compiled-loader!' + path.join(__dirname, '../client/server.template.ejs'),
      filename: 'server.ejs'
    })
  ]
})
if (isDev) {
  config.entry = {
    app: [
      'react-hot-loader/patch',
      path.join(__dirname, '../client/app.js')
    ]
  }
  config.devServer = {
    host: '0.0.0.0',
    port: '8888',
    contentBase: path.join(__dirname, '../dist'),
    hot: true,
    overlay: {
      errors: true
    },
    publicPath: '/public/',
    historyApiFallback: {
      index: '/public/index.html'
    },
    proxy: {
      '/api': 'http://localhost:3333'
    }
  }
  config.plugins.push(new webpack.HotModuleReplacementPlugin())
} else {

}
module.exports = config
