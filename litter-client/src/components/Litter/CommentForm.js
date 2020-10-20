import React, { useState } from 'react'
import { get, post } from '../../util/apiClient'
// Material UI
import withStyles from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
// Redux
import { connect } from 'react-redux'
import { setComment } from '../../redux/actions/dataActions'

const styles = (theme) => ({
  ...theme.theme,
})

const submitComment = async (litterId, commentData) => {
  try {
    await post(`/litter/${litterId}/comment`, commentData)
  } catch (error) {
    throw error.response.data
  }
}

const CommentForm = ({ classes, token, litterId, setComment }) => {
  const [state, setState] = useState({
    body: '',
    errors: null,
  })

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const commentData = { body: state.body }
      await submitComment(litterId, commentData)
      const commentedLitter = await get(`/litter/${litterId}`)
      setComment(commentedLitter)
      setState({ body: '', errors: null })
    } catch (error) {
      setState({ ...state, errors: error })
    }
  }

  const commentFormMarkup = token ? (
    <Grid item sm={12} style={{ textAlign: 'center' }}>
      <form onSubmit={handleSubmit}>
        <TextField
          name='body'
          type='text'
          label='Comment on litter'
          error={!!state.errors?.comment}
          helperText={state.errors?.comment}
          value={state.body}
          onChange={handleChange}
          fullWidth
          className={classes.textField}
        />
        <Button
          type='submit'
          variant='contained'
          color='primary'
          className={classes.button}
        >
          Submit
        </Button>
      </form>
      <hr className={classes.visibleSeparator} />
    </Grid>
  ) : null

  return commentFormMarkup
}

const mapStateToProps = (state) => ({
  token: state.user.token,
})

const mapActionsToProps = (dispatch) => ({
  setComment: setComment(dispatch),
})

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(CommentForm))
