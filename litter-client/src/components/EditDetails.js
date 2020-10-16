import React, { Fragment, useState, useEffect } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import { post, get } from '../util/apiClient'
// Redux
import { connect } from 'react-redux'
import { loadUser, setUser } from '../redux/actions/userActions'
// Material UI
import Tooltip from '@material-ui/core/Tooltip'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'

const styles = (theme) => ({
  ...theme.theme,
})

const EditDetails = ({ credentials, classes, loadUser, setUser }) => {
  const [state, setState] = useState({
    bio: '',
    location: '',
    website: '',
    open: false,
  })

  const handleOpen = () => {
    setState({
      ...state,
      open: true,
    })
  }

  const handleClose = () => {
    setState({
      ...state,
      open: false,
    })
  }
  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmit = async () => {
    const userDetails = {
      bio: state.bio,
      website: state.website,
      location: state.location,
    }
    try {
      await post('/user', userDetails)
      loadUser()
      const user = await get('/user')
      setUser(user)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    setState({
      ...state,
      bio: credentials.bio ? credentials.bio : '',
      location: credentials.location ? credentials.location : '',
      website: credentials.website ? credentials.website : '',
    })
  }, [])

  return (
    <Fragment>
      <Tooltip title='Edit details' placement='top'>
        <IconButton onClick={handleOpen} className={classes.button}>
          <EditIcon color='primary' />
        </IconButton>
      </Tooltip>
      <Dialog open={state.open} onClose={handleClose} fullWidth maxWidth='sm'>
        <DialogTitle>Edit your details</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              name='bio'
              type='text'
              label='Bio'
              multiline
              rows='3'
              placeholder='Describe who you are'
              className={classes.texField}
              value={state.bio}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name='website'
              type='text'
              label='Website'
              multiline
              rows='3'
              placeholder='Enter your website'
              className={classes.texField}
              value={state.website}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name='location'
              type='text'
              label='Location'
              multiline
              rows='3'
              placeholder='Enter your location'
              className={classes.texField}
              value={state.location}
              onChange={handleChange}
              fullWidth
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleSubmit} color='primary'>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}

const mapActionsToProps = (dispatch) => ({
  loadUser: loadUser(dispatch),
  setUser: setUser(dispatch),
})

const mapStateToProps = (state) => ({
  credentials: state.user.credentials,
})

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(EditDetails))
