import React, { useState, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'
import AppIcon from '../images/icon.png'
// Material UI Stuff
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
// Redux Stuff
import { connect } from 'react-redux'
import { signupUser } from '../redux/actions/userActions'

const styles = (theme) => ({
  ...theme.userPage,
})

const Signup = ({ classes, signupUser, UI: { loading, errors } }) => {
  const [form, setState] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    handle: '',
    error: {},
  })

  useEffect(() => {
    if (errors) {
      setState((form) => ({ ...form, error: errors }))
    }
  }, [errors])

  const handleChange = (event) => {
    setState({
      ...form,
      [event.target.name]: event.target.value,
    })
  }

  const history = useHistory()

  const handleSubmit = (event) => {
    event.preventDefault()
    const newUserData = {
      email: form.email,
      password: form.password,
      confirmPassword: form.password,
      handle: form.handle,
    }
    signupUser(newUserData, history)
  }

  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <img src={AppIcon} alt='litter logo' className={classes.image} />
        <Typography variant='h2' className={classes.pageTitle}>
          Litter
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            id='email'
            name='email'
            type='email'
            label='Email'
            className={classes.textField}
            helperText={form.error.email}
            error={form.error.email ? true : false}
            value={form.email}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            id='password'
            name='password'
            type='password'
            label='Password'
            className={classes.textField}
            helperText={form.error.password}
            error={form.error.password ? true : false}
            value={form.password}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            id='confirmPassword'
            name='confirmPassword'
            type='password'
            label='Confirm Password'
            className={classes.textField}
            helperText={form.error.confirmPassword}
            error={form.error.confirmPassword ? true : false}
            value={form.confirmPassword}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            id='handle'
            name='handle'
            type='handle'
            label='Handle'
            className={classes.textField}
            helperText={form.error.handle}
            error={form.error.handle ? true : false}
            value={form.handle}
            onChange={handleChange}
            fullWidth
          />
          {form.error.general && (
            <Typography variant='body2' className={classes.customError}>
              {form.error.general}
            </Typography>
          )}
          <Button
            type='submit'
            variant='contained'
            color='primary'
            className={classes.button}
            disabled={loading}
          >
            Sign Up
            {loading && (
              <CircularProgress size={30} className={classes.progress} />
            )}
          </Button>
          <br />
          <small>
            Have an account? <Link to='/login'>Log in</Link>
          </small>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  )
}

Signup.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  signupUser: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
})

export default connect(mapStateToProps, { signupUser })(
  withStyles(styles)(Signup)
)
