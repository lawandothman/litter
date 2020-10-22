import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import jwtDecode from 'jwt-decode'
import { logoutUser } from '../redux/actions/userActions'

const AuthRoute = ({ component: Component, token, logoutUser, ...rest }) => {
  if (token) {
    const decodedToken = jwtDecode(token)
    console.log(decodedToken.exp * 1000, Date.now())
    if (decodedToken.exp * 1000 < Date.now()) {
      logoutUser()
      return <Redirect to='/' />
    }
  }
  return (
    <Route
      {...rest}
      render={(props) =>
        token != null ? <Redirect to='/' /> : <Component {...props} />
      }
    />
  )
}

const mapStateToProps = (state) => ({
  token: state.user.token,
})

const mapActionsToProps = (dispatch) => ({
  logoutUser: logoutUser(dispatch),
})

export default connect(mapStateToProps, mapActionsToProps)(AuthRoute)
