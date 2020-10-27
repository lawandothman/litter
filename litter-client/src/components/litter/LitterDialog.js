import React, { Fragment, useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import { get } from '../../util/apiClient'
import MyButton from '../../util/MyButton'
import LikeButton from './LikeButton'
import Comments from './Comments'
import CommentForm from './CommentForm'
// Material UI
import withStyles from '@material-ui/core/styles/withStyles'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
// Icons
import CloseIcon from '@material-ui/icons/Close'
import UnfoldMore from '@material-ui/icons/UnfoldMore'
import ChatIcon from '@material-ui/icons/Chat'
// Redux
import { connect } from 'react-redux'
import { setLitter } from '../../redux/actions/dataActions'

const styles = (theme) => ({
  ...theme.theme,
  profileImage: {
    maxWidth: 200,
    height: 200,
    borderRadius: '50%',
    objectFit: 'cover',
  },
  dialogContent: {
    padding: 20,
  },
  closeButton: {
    position: 'absolute',
    left: '90%',
  },
  expandButton: {
    position: 'absolute',
    left: '90%',
  },
  spinnerDiv: {
    textAlign: 'center',
    marginTop: 50,
    marginBotton: 50,
  },
})

const LitterDialog = ({
  classes,
  litter: {
    body,
    createdAt,
    likeCount,
    commentCount,
    userImage,
    userHandle,
    comments,
  },
  setLitter,
  litterId,
  openDialog,
}) => {
  const [state, setState] = useState({
    open: false,
    loading: false,
    oldPath: '',
    newPath: '',
  })

  const handleOpen = useCallback(async () => {
    try {
      setState({ open: true, loading: true })
      const litter = await get(`/litter/${litterId}`)
      setLitter(litter)
      let oldPath = window.location.pathname
      const newPath = `/users/${userHandle}/litter/${litterId}`
      if (oldPath === newPath) oldPath = `/users/${userHandle}`
      window.history.pushState(null, null, newPath)
      setState({ open: true, loading: false, oldPath, newPath })
    } catch (error) {
      console.error(error)
    }
  }, [litterId, setLitter, userHandle])

  const handleClose = async () => {
    window.history.pushState(null, null, state.oldPath)
    setState({ open: false })
  }

  useEffect(() => {
    if (openDialog) handleOpen()
  }, [handleOpen, openDialog])

  const dialogMarkup = state.loading ? (
    <div className={classes.spinnerDiv}>
      <CircularProgress size={200} thickness={2} />
    </div>
  ) : (
    <Grid container spacing={0}>
      <Grid item sm={5}>
        <img src={userImage} alt='Profile' className={classes.profileImage} />
      </Grid>
      <Grid item sm={7}>
        <Typography
          component={Link}
          color='primary'
          variant='h5'
          to={`/users/${userHandle}`}
        >
          @{userHandle}
        </Typography>
        <hr className={classes.invisibleSeparator} />
        <Typography variant='body2' color='textSecondary'>
          {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
        </Typography>
        <hr className={classes.invisibleSeparator} />
        <Typography variant='body2'>{body}</Typography>
        <LikeButton litterId={litterId} />
        <span>{likeCount} Likes</span>
        <MyButton tip='comments'>
          <ChatIcon color='primary' />
        </MyButton>
        <span>{commentCount} Comments</span>
      </Grid>
      <hr className={classes.visibleSeparator} />
      <CommentForm litterId={litterId} />
      <Comments comments={comments} />
    </Grid>
  )

  return (
    <Fragment>
      <MyButton
        onClick={handleOpen}
        tip='Expand'
        tipClassName={classes.expandButton}
      >
        <UnfoldMore color='primary' />
      </MyButton>
      <Dialog open={state.open} onClose={handleClose} fullWidth maxWidth='sm'>
        <MyButton
          tip='Close'
          onClick={handleClose}
          tipClassName={classes.closeButton}
        >
          <CloseIcon />
        </MyButton>
        <DialogContent className={classes.dialogContet}>
          {dialogMarkup}
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}

const mapStateToProps = (state) => ({
  litter: state.data.litter,
})

const mapActionsToProps = (dispatch) => ({
  setLitter: setLitter(dispatch),
})
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(LitterDialog))
