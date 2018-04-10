const path=require('path');
const htmlWebpackPlugin=require('html-webpack-plugin');
const webpackMerge=require('webpack-merge')
const webpackBase=require('./webpack.base')
const isDev=process.env.NODE_ENV==="development";//启动时判断当前环境是否为开发环境
const webpack=require('webpack');
const config=webpackMerge(webpackBase,{
    entry:{
        app:path.join(__dirname,'../client/app.js')
    },
    output:{
        filename:'[name].[hash].js',
        path:path.join(__dirname,'../dist'),
        publicPath:'/public/'
    },
    plugins:[
        new htmlWebpackPlugin({
            template:path.join(__dirname,'../client/tempelate.html')
        })
    ]
});
console.log('isdev:'+isDev);
console.log('process.env.NODE_ENV:'+process.env.NODE_ENV);
if(isDev){
    config.entry={
        app:[
            'react-hot-loader/patch',
            path.join(__dirname,'../client/app.js')
        ]
    }
    console.log('isdev');
    config.devServer={//开发环境的常用配置
        host:'0.0.0.0',//指向本地访问  可以通过localhost | 127.0.0.1  | 本机ip
        port:'8888',
        contentBase:path.join(__dirname,'../dist'),//服务于编译的静态文件
        hot:true,
        overlay:{//编译过程的错误提示  （网页黑色背景错误提示弹窗）
            errors:true//显示错误信息
        },
        publicPath:'/public/',
        historyApiFallback:{
            index:'/public/index.html'
        },
      proxy:{
          '/api':'http://localhost:3333'
      }
    }
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
}
module.exports=config;
