const express=require('express')
const reactSSR=require('react-dom/server')
const path=require('path')
const fs=require('fs')
const app=express()
const isDev=process.env.NODE_ENV==='development'
if(!isDev){
  const serverEntry=require('../dist/server.entry.js').default
  app.use('/public',express.static(path.join(__dirname,'../dist')))
  const template=fs.readFileSync(path.join(__dirname,'../dist/index.html'),'utf-8')
  app.get('*',function(req,res){
    const renderString=reactSSR.renderToString(serverEntry)
    res.send(template.replace('<!--app-->',renderString))
  })
}else{
  const devStatic=require('./util/dev-static.js')
  devStatic(app)
}
app.listen(3333,function(){
  console.log('server 333 is listen!')
})
