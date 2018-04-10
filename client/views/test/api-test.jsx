import React from 'react'
import axios from 'axios'
export default class  TestApi extends React.Component{
  getTopic(){
    axios.get('/api/topics')
      .then(resp=>{
        console.log(resp)
      }).catch(err=>{
      console.log(err)
    })
  }
  login(){
    axios.post('/api/user/login',{
      accessToken:"10222aa6-d5af-44b6-9c0f-2b7f47e62bfc"
    }).catch(err=>{
      console.log(err)
    })
  }
  markAll(){
    axios.post('/api/message/mark_all?needAcessToken=true'
    ).then(resp=>{
      console.log(resp)
    }).catch(err=>{
      console.log(err)
    })
  }
  render(){
    return(
      <div>
        <button onClick={this.getTopic}>getTopic</button>
        <button onClick={this.login}>login</button>
        <button onClick={this.markAll}>markAll</button>
      </div>
    )
  }
}
