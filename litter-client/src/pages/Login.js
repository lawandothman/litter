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

const Login = ({ classes }) => {
  const [form, setState] = useState({
    email: '',
    password: '',
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
    const userData = {
      email: form.email,
      password: form.password,
    }
    axios
      .post('/login', userData)
      .then((res) => {
        console.log(res.data)
        localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`)
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
            Log In
            {form.loading && (
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

Login.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Login)
