import React from 'react'
import ReactDOM from 'react-dom' // eslint-disable-line
import { AppContainer } from 'react-hot-loader'
import App from './App.jsx'
// ReactDOM.hydrate(<App />,document.getElementById("root"));
const root = document.getElementById('root')
const render = (Component) => {
  ReactDOM.hydrate(
    <AppContainer>
      <Component />
    </AppContainer>
    , root,
  )
}
render(App);
if (module.hot) {
  module.hot.accept('./App.jsx', () => {
    const NextApp = require('./App.jsx').default // eslint-disable-line
    // ReactDOM.hydrate(<NextApp />,document.getElementById("root"));
    render(NextApp)
  })
}