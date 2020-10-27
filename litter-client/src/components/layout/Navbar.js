import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import MyButton from '../../util/MyButton'
import PostLitter from '../litter/PostLitter'
import Notifications from './Notifications'
// Material UI Stuff
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
// Icons
import HomeIcon from '@material-ui/icons/Home'
// Redux
import { connect } from 'react-redux'

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
              <Notifications />
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
