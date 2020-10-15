import React, { useState } from 'react'
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
import { loginUser } from '../redux/actions/userActions'
import { connect } from 'react-redux'

const styles = (theme) => ({
  ...theme.userPage,
})

const Login = ({ classes, loginUser, UI: { loading, errors } }) => {
  const [form, setState] = useState({
    email: '',
    password: '',
  })

  const handleChange = (event) => {
    setState({
      ...form,
      [event.target.name]: event.target.value,
    })
  }
  const history = useHistory()

  const handleSubmit = (event) => {
    event.preventDefault()
    const userData = {
      email: form.email,
      password: form.password,
    }
    loginUser(userData, history)
  }

  console.log(errors)
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
            helperText={errors?.email}
            error={!!errors?.email}
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
            helperText={errors?.email}
            error={!!errors?.email}
            value={form.password}
            onChange={handleChange}
            fullWidth
          />
          {errors && errors.general && (
            <Typography variant='body2' className={classes.customError}>
              {errors.general}
            </Typography>
          )}
          <Button
            type='submit'
            variant='contained'
            color='primary'
            className={classes.button}
            disabled={loading}
          >
            Log In
            {loading && (
              <CircularProgress size={30} className={classes.progress} />
            )}
          </Button>
          <br />
          <small>
            Don't have an account? <Link to='/signup'>Sign up</Link>
          </small>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  )
}

// Get rid of propTypes, they are useless unless you have typescript
Login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func,
  user: PropTypes.object, 
  UI: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
})

const mapActionsToProps = (dispatch) => ({
  loginUser: loginUser(dispatch)
})

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Login))
