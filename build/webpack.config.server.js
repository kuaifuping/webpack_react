const path=require('path');
const webpackMerge=require('webpack-merge')
const webpackBase=require('./webpack.base')
module.exports=webpackMerge(webpackBase,{
    target:'node',//webpack打包出来的内容在什么执行环境中运行的
    entry:{
        app:path.join(__dirname,'../client/server.entry.js')
    },
    output:{
        filename:'server-entry.js',
        path:path.join(__dirname,'../dist'),
        publicPath:'/public',
        libraryTarget:'commonjs2'//打包出来的js使用的模块方案
    },
})


