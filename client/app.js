import React from 'react'
import ReactDOM from 'react-dom' // eslint-disable-line
import { BrowserRouter } from 'react-router-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'mobx-react'
import App from './views/App'
import appState from './store/app-state'
// ReactDOM.hydrate(<App />,document.getElementById("root"));
const root = document.getElementById('root')
const render = (Component) => {
  ReactDOM.hydrate(
    <AppContainer>
      <Provider appState={appState}>
        <BrowserRouter >
          <Component />
        </BrowserRouter>
      </Provider>
    </AppContainer>
    , root,
  )
}
render(App);
if (module.hot) {
  module.hot.accept('./views/App.jsx', () => {
    const NextApp = require('./views/App').default // eslint-disable-line
    // ReactDOM.hydrate(<NextApp />,document.getElementById("root"));
    render(NextApp)
  })
}
