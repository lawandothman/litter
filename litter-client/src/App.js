import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import themeFile from './util/theme'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
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

let authenticated
const token = localStorage.FBIdToken
if (token) {
  const decodedToken = jwtDecode(token)
  if (decodedToken.exp * 1000 < Date.now()) {
    window.location.href = '/login'
    authenticated = false
  } else {
    authenticated = true
  }
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className='App'>
        <Router>
          <Navbar />
          <div className='container'>
            <Switch>
              <Route exact path='/' component={Home}></Route>
              <AuthRoute
                exact
                path='/login'
                component={Login}
                authenticated={authenticated}
              ></AuthRoute>
              <AuthRoute
                exact
                path='/signup'
                component={Signup}
                authenticated={authenticated}
              ></AuthRoute>
            </Switch>
          </div>
        </Router>
      </div>
    </ThemeProvider>
  )
}

export default App
