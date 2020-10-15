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

const getToken = async (userData) => {
  try {
    return await post('/login', userData)
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

const Login = ({ classes, UI: { loading }, setUser, setToken }) => {
  const [form, setState] = useState({
    email: '',
    password: '',
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
    const userData = {
      email: form.email,
      password: form.password,
    }
    try {
      const { token } = await getToken(userData)
      setToken(token)
      const user = await getUser()
      setUser(user)
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
            helperText={form.errors?.email}
            error={!!form.errors?.email}
            value={form.password}
            onChange={handleChange}
            fullWidth
          />
          {form.errors?.general && (
            <Typography variant='body2' className={classes.customError}>
              {form.errors.general}
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
)(withStyles(styles)(Login))
