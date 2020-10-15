import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import themeFile from './util/theme'
// Redux
import { Provider } from 'react-redux'
import store from './redux/store'
// Components
import Navbar from './components/Navbar'
import AuthRoute from './util/AuthRoute'
// Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
const theme = createMuiTheme(themeFile)

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
