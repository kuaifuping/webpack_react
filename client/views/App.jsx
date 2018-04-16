import React from 'react'
import { Link } from 'react-router-dom'
import Routes from '../config/router'

export default class App extends React.Component {
  componentDidMount() {}
  render() {
    return [
      <div>
        <Link to="/">首页</Link>
        <br />
        <Link to="/detail">topic</Link>
        <br />
        <Link to="/topic">detail</Link>
      </div>,
      <Routes key="routes" />,
    ]
  }
}
