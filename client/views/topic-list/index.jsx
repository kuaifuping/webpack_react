import React from 'react'
import {
  observer,
  inject,
} from 'mobx-react'
import PropTypes from 'prop-types'
import { AppState } from '../../store/app-state'

@inject('appState') @observer

export default class TopList extends React.Component {
  constructor() {
    super()
    this.changeName = this.changeName.bind(this)
  }
  componentDidMount() {

  }
  asyncBootstrap() {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.props.appState.count = 3
        resolve(true)
      })
    })
  }
  changeName(event) {
    this.props.appState.changeName(event.target.value)
  }
  render() {
    return (
      <div>
        <input type="text" onChange={this.changeName} />
        <span>{ this.props.appState.msg }</span>
      </div>
    )
  }
}
TopList.propTypes = {
  appState: PropTypes.instanceOf(AppState).isRequired,
}
