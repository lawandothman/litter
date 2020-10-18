import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import MyButton from '../util/MyButton'
import PostLitter from './PostLitter'
// Material UI Stuff
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
// Icons
import HomeIcon from '@material-ui/icons/Home'
import Notifications from '@material-ui/icons/Notifications'

const Navbar = ({ authenticated }) => {
  return (
    <AppBar>
      <Toolbar className='nav-container'>
        {(() => {
          if (!authenticated) {
            return (
              <Fragment>
                <Button color='inherit' component={Link} to='/'>
                  Home
                </Button>
                <Button color='inherit' component={Link} to='/login'>
                  Log In
                </Button>
                <Button color='inherit' component={Link} to='/signup'>
                  Sign Up
                </Button>
              </Fragment>
            )
          }
          return (
            <Fragment>
              <PostLitter />
              <Link to='/'>
                <MyButton tip='Home'>
                  <HomeIcon color='secondary' />
                </MyButton>
              </Link>
              <MyButton tip='Notifications'>
                <Notifications color='secondary' />
              </MyButton>
            </Fragment>
          )
        })()}
      </Toolbar>
    </AppBar>
  )
}

const mapStateToProps = (state) => ({
  authenticated: !!state.user?.token,
})

export default connect(mapStateToProps)(Navbar)
