import React, { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'
import AppIcon from '../images/icon.png'
import axios from 'axios'

// Material UI Stuff
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

const styles = (theme) => ({
  ...theme.userPage,
})

const Signup = ({ classes }) => {
  const [form, setState] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    handle: '',
    loading: false,
    errors: {},
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
    setState({ ...form, loading: true })
    const newUserData = {
      email: form.email,
      password: form.password,
      confirmPassword: form.password,
      handle: form.handle,
    }
    axios
      .post('/signup', newUserData)
      .then((res) => {
        console.log(res.data)
        localStorage.setItem('FBBIdToken', `Bearer ${res.data.token}`)
        setState({ ...form, loading: false })
        history.push('/')
      })
      .catch((err) => {
        setState({ ...form, errors: err.response.data, loading: false })
      })
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
            helperText={form.errors.email}
            error={form.errors.email ? true : false}
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
            helperText={form.errors.password}
            error={form.errors.password ? true : false}
            value={form.password}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            id='confirmPassword'
            name='confirmPassword'
            type='confirmPassword'
            label='Confirm Password'
            className={classes.textField}
            helperText={form.errors.confirmPassword}
            error={form.errors.confirmPassword ? true : false}
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
            helperText={form.errors.handle}
            error={form.errors.handle ? true : false}
            value={form.handle}
            onChange={handleChange}
            fullWidth
          />
          {form.errors.general && (
            <Typography variant='body2' className={classes.customError}>
              {form.errors.general}
            </Typography>
          )}
          <Button
            type='submit'
            variant='contained'
            color='primary'
            className={classes.button}
            disabled={form.loading}
          >
            Sign Up
            {form.loading && (
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
}

export default withStyles(styles)(Signup)
