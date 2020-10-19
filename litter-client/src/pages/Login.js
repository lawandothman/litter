import React, { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import AppIcon from '../images/icon.png'
import { post, get } from '../util/apiClient'
// Material UI
import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
// Redux
import { connect } from 'react-redux'
import { loadUser, setToken, setUser } from '../redux/actions/userActions'

const styles = (theme) => ({
  ...theme.theme,
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

const Login = ({ classes, setUser, setToken, loadUser }) => {
  const [form, setState] = useState({
    email: '',
    password: '',
    loading: false,
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
      setState({ ...form, loading: true })
      const { token } = await getToken(userData)
      loadUser()
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

const mapStateToProps = (state) => ({
  user: state.user,
})

const mapActionsToProps = (dispatch) => ({
  setUser: setUser(dispatch),
  setToken: setToken(dispatch),
  loadUser: loadUser(dispatch),
})

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Login))
