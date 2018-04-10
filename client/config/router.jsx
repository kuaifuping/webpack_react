import React from 'react'
import {
  Route,Redirect
} from 'react-router-dom'
import TopicList from '../views/topic_list/index'
import TopicDetail from '../views/topic_detail/index'
import TestApi from '../views/test/api-test'
export default ()=>[
  <Route render={()=><Redirect  to="/list"/>} path='/' exact key="first"></Route>,
  <Route component={TopicDetail } path='/detail' key="detail"></Route>,
  <Route component={TopicList } path='/list' key="list"></Route>,
  <Route component={TestApi } path='/test' key="testApi"></Route>,
]
