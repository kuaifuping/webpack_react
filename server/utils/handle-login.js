const router=require('express').Router()
const axios=require('axios')
const baseUrl='http://cnodejs.org/api/vl'
router.post('/login',function(req,res,next){
  axios.post(`${baseUrl}/accesstoken`,{accesstoken:req.body.accesstoken})
    .then(resp=>{
      if(resp.status==2000&&resp.data.success){
        req.session.user={
          accesstoken:req.body.accesstoken,
          loginName:resp.data.loginname,
          id:resp.data.id,
          avatarUrl:resp.data.avatar_url
        }
        res.json({
          sucess:true,
          data:resp.data
        })
      }
    })
    .catch(err=>{
      if(err.response){
        res.json({
          success:false,
          data:err.response
        })
      }else{
        next(err)
      }
    })
})
module.exports=router
