const React=require('react')
import {
  observer,
  inject
}from 'mobx-react'
import PropTypes from 'prop-types'
import {AppState} from '../../store/app-state'
@inject('appState') @observer
export default class TopicList extends React.Component {
  constructor() {
    super()
    this.changeName = this.changeName.bind(this)
  }
  componentsDidMount() {
  }

  changeName(event) {
    this.props.appState.changeName(event.target.value)
  }
  render() {
    return (
      <div>
        <input type="text" onChange={this.changeName}/>
        <div>{this.props.appState.msg}</div>
      </div>
    )
  }
}
TopicList.propType={
  appState:PropTypes.instanceOf(AppState).isRequired
}

