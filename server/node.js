//创建服务
const express=require('express');
const ReactSSR=require('react-dom/server');
const bodyParse=require('body-parser')
const session=require('express-session')
const React=require('react');
const fs=require('fs');
const path=require('path');
const app=express()
app.use(bodyParse.json())
app.use(bodyParse.urlencoded({extended:false}))
app.use(session({
  maxAge:10*60*1000,
  name:'tid',
  resave:false,
  saveUninitialized:false,
  secret:'react cnode class'
  })
)
const favicon=require('serve-favicon');
const isDev=(process.env.NODE_ENV==="development")
app.listen(3333,function(){
    console.log("server is listening on 3333");
})
console.log(process.env.NODE_ENV==="development");
console.log(process.env.NODE_ENV);
app.use('/api/use',require('./utils/handle-login'))
app.use('/api',require('./utils/proxy'))
if(!isDev){
    console.log("!isDev");
    const severEntry=require('../dist/server-entry').default;
    const tempelate=fs.readFileSync(path.join(__dirname,'../dist/index.html'),'utf8');
    app.use('/public',express.static(path.join(__dirname,'../dist')));//处理服务器端静态文件
    app.use(favicon(path.join(__dirname,'../favicon.icon')));
    app.get('*',function(req,res){
        const appString=ReactSSR.renderToString(severEntry);
        res.send( tempelate.replace('<!--app-->',appString));
    });
}else{
    console.log("isDev");
    const devStatic=require('./utils/dev_static')
    devStatic(app)
}
