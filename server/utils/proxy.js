const axios=require('axios')
const baseUrl='http://cnodejs.org/api/vl'
module.exports=function(req,res,next){
  const path=req.path
  const user=req.session.user||{}
  const needAccessToken=req.query.needAccessToken

  if(needAccessToken&&user.accessToken){
    res.status(401).send({
      success:false,
      msq:'need login'
    })
    const query=Object.assign({},req,query)
    axios(`${baseUrl}${path}`,{
      method:req.method,
      params:query,
      data:Object.assign({},req.body,{
        accesstoken:use.accesstoken
      }),
      header:{
        'Content-Type':'application/x-www-form-urlencoded'
      }
    }).then(resp=>{
      if(resp.status==200){
        res.send(resp.data)
      }else{
        res.status(resp.status).send(resp.data)
      }
    }).catch(err=>{
      if(err.response){
        res.status(500).send(err.response.data)
      }else{
        res.status(500).send({
          success:false,
          msg:'router.js 未知错误'
        })
      }
    })
  }
}
