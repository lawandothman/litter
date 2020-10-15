import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import themeFile from './util/theme'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
// Redux
import { Provider } from 'react-redux'
import store from './redux/store'
import { SET_AUTHENTICATED } from './redux/types'
import { logoutUser, getUserData } from './redux/actions/userActions'
// Components
import Navbar from './components/Navbar'
import AuthRoute from './util/AuthRoute'
// Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'

axios.defaults.baseURL =
  'https://europe-west2-litter-cf67f.cloudfunctions.net/api'

const theme = createMuiTheme(themeFile)

const token = localStorage.FBIdToken
if (token) {
  const decodedToken = jwtDecode(token)
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser())
    window.location.href = '/login'
    localStorage.clear()
  } else {
    store.dispatch({ type: SET_AUTHENTICATED })
    axios.defaults.headers.common['Authorization'] = token
    store.dispatch(getUserData())
  }
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <Navbar />
          <div className='container'>
            <Switch>
              <Route exact path='/' component={Home}></Route>
              <AuthRoute exact path='/login' component={Login}></AuthRoute>
              <AuthRoute exact path='/signup' component={Signup}></AuthRoute>
            </Switch>
          </div>
        </Router>
      </Provider>
    </ThemeProvider>
  )
}

export default App
