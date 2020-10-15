import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

// Material UI Stuff
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import { logoutUser } from '../redux/actions/userActions'

const Navbar = ({ authenticated, logoutUser }) => {
  return (
    <AppBar>
      <Toolbar className='nav-container'>
        <Button color='inherit' component={Link} to='/'>
          Home
        </Button>
        {(() => {
          if (!authenticated) {
            return (
              <>
                <Button color='inherit' component={Link} to='/login'>
                  Log In
                </Button>
                <Button color='inherit' component={Link} to='/signup'>
                  Sign Up
                </Button>
              </>
            )
          }
          return (
            <Button
              color='inherit'
              component={Link}
              to='/login'
              onClick={logoutUser}
            >
              Log Out
            </Button>
          )
        })()}
      </Toolbar>
    </AppBar>
  )
}

const mapStateToProps = (state) => ({
  authenticated: !!state.user?.token,
})

const mapActionsToProps = (dispatch) => ({
  logoutUser: logoutUser(dispatch),
})
export default connect(mapStateToProps, mapActionsToProps)(Navbar)
