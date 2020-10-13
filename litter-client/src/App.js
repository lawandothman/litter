import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import axios from 'axios'

// Components
import Navbar from './components/Navbar'

// Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'

axios.defaults.baseURL =
  'https://europe-west2-litter-cf67f.cloudfunctions.net/api'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#212121',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#FAFAFA',
      contrastText: '#212121',
    },
  },
  typography: {
    useNextVariants: true,
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className='App'>
        <Router>
          <Navbar />
          <div className='container'>
            <Switch>
              <Route exact path='/' component={Home}></Route>
              <Route exact path='/login' component={Login}></Route>
              <Route exact path='/signup' component={Signup}></Route>
            </Switch>
          </div>
        </Router>
      </div>
    </ThemeProvider>
  )
}

export default App
