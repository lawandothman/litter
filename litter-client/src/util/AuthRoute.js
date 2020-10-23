import React from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import jwtDecode from 'jwt-decode'
import { logoutUser } from '../redux/actions/userActions'

const AuthRoute = ({ component: Component, token, logoutUser, ...rest }) => {
  if (token) {
    const decodedToken = jwtDecode(token)
    if (decodedToken.exp * 1000 < Date.now()) {
      logoutUser()
    }
  }
  return <Route {...rest} render={(props) => <Component {...props} />} />
}

const mapStateToProps = (state) => ({
  token: state.user.token,
})

const mapActionsToProps = (dispatch) => ({
  logoutUser: logoutUser(dispatch),
})

export default connect(mapStateToProps, mapActionsToProps)(AuthRoute)
