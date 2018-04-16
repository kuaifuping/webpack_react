import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import detailList from '../views/detail-list/index'
import topicList from '../views/topic-list/index'
import testApi from '../views/topic-list/test'

export default () => [
  <Route path="/" render={() => <Redirect to="/topic" key="first" />} exact />,
  <Route path="/detail" component={detailList} key="detail" />,
  <Route path="/topic" component={topicList} key="topic" />,
  <Route path="/test" component={testApi} key="test" />,
]
