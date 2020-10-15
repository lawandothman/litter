import React, { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import withStyles from '@material-ui/core/styles/withStyles'
import AppIcon from '../images/icon.png'
// Material UI Stuff
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import { post, get } from '../util/apiClient'
// Redux Stuff
import { connect } from 'react-redux'
import { setToken, setUser } from '../redux/actions/userActions'

const styles = (theme) => ({
  ...theme.userPage,
})

const getToken = async (newUserData) => {
  try {
    return await post('/signup', newUserData)
  } catch (error) {
    throw error.response.data
  }
}

const getUser = async () => {
  try {
    return await get('/user')
  } catch (error) {
    throw error.response.data
  }
}

const Signup = ({ classes, UI: { loading } }) => {
  const [form, setState] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    handle: '',
    errors: null,
  })

  const handleChange = (event) => {
    setState({
      ...form,
      [event.target.name]: event.target.value,
    })
  }

  const history = useHistory()

  const handleSubmit = async (event) => {
    event.preventDefault()
    const newUserData = {
      email: form.email,
      password: form.password,
      confirmPassword: form.password,
      handle: form.handle,
    }
    try {
      const { token } = await getToken(newUserData)
      setToken(token)
      const newUser = await getUser()
      setUser(newUser)
      history.push('/')
    } catch (error) {
      setState({ ...form, errors: error })
    }
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
            helperText={form.errors?.email}
            error={!!form.errors?.email}
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
            helperText={form.errors?.password}
            error={form.errors?.password ? true : false}
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
            helperText={form.errors?.confirmPassword}
            error={form.errors?.confirmPassword ? true : false}
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
            helperText={form.errors?.handle}
            error={form.errors?.handle ? true : false}
            value={form.handle}
            onChange={handleChange}
            fullWidth
          />
          {form.errors?.general && (
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

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
})

const mapActionsToProps = (dispatch) => ({
  setUser: setUser(dispatch),
  setToken: setToken(dispatch),
})

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Signup))
