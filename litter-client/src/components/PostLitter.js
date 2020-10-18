import React, { Fragment, useState } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import { get, post } from '../util/apiClient'
import MyButton from '../util/MyButton'
// Material UI
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import CircularProgress from '@material-ui/core/CircularProgress'
// Icons
import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close'
// Redux
import { connect } from 'react-redux'
import { setLitters } from '../redux/actions/dataActions'

const styles = (theme) => ({
  ...theme.theme,
  submitButton: {
    position: 'relative',
    float: 'right',
    marginTop: 10,
  },
  progressSpinner: {
    position: 'absolute',
  },
  closeButton: {
    position: 'absolute',
    left: '91%',
    top: '2%',
  },
})

function PostLitter({ classes, setLitters }) {
  const [form, setState] = useState({
    open: false,
    body: '',
    loading: false,
    errors: null,
  })

  const handleOpen = () => {
    setState({ ...form, open: true })
  }
  const handleClose = () => {
    setState({ ...form, open: false, errors: null })
  }

  const postLitter = async (newLitter) => {
    try {
      await post('/litter', newLitter)
    } catch (error) {
      throw error.response.data
    }
  }

  const handleChange = (event) => {
    setState({
      ...form,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const newLitter = {
      body: form.body,
    }
    try {
      setState({ ...form, loading: true })
      await postLitter(newLitter)
      setState({ ...form, body: '', open: false, errors: null })
      const litters = await get('/litters')
      setLitters(litters)
    } catch (error) {
      setState({ ...form, errors: error })
    }
  }

  return (
    <Fragment>
      <MyButton onClick={handleOpen} tip='Post a litter'>
        <AddIcon color='secondary' />
      </MyButton>
      <Dialog open={form.open} onClose={handleClose} fullWidth maxWidth='sm'>
        <MyButton
          tip='Close'
          onClick={handleClose}
          tipClassName={classes.closeButton}
        >
          <CloseIcon />
        </MyButton>
        <DialogTitle>Post a new litter</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              name='body'
              type='text'
              label='Litter'
              multiline
              rows='3'
              placeholder="What's littering?"
              error={!!form.errors?.body}
              helperText={form.errors?.body}
              className={classes.textField}
              onChange={handleChange}
              fullWidth
            />
            <Button
              type='submit'
              variant='contained'
              color='primary'
              className={classes.submitButton}
              disabled={form.loading}
            >
              Post
              {form.loading && (
                <CircularProgress
                  size={30}
                  className={classes.progressSpinner}
                />
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}

const mapActionsToProps = (dispatch) => ({
  setLitters: setLitters(dispatch),
})

export default connect(null, mapActionsToProps)(withStyles(styles)(PostLitter))
