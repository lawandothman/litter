import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const AuthRoute = ({ component: Component, token, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      token != null ? <Redirect to='/' /> : <Component {...props} />
    }
  />
)

const mapStateToProps = (state) => ({
  token: state.user.token,
})

export default connect(mapStateToProps)(AuthRoute)
