import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './redux/store'
import { saveState } from './util/localStorage'
import App from './App'
import * as serviceWorker from './serviceWorker'

store.subscribe(() => {
  saveState(
    store.getState({
      user: store.getState().user,
    })
  )
})

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
