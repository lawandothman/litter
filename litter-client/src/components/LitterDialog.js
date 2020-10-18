import React, { Fragment, useState } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import { get } from '../util/apiClient'
import MyButton from '../util/MyButton'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
// Material UI
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
// Icons
import CloseIcon from '@material-ui/icons/Close'
import UnfoldMore from '@material-ui/icons/UnfoldMore'
// Redux
import { connect } from 'react-redux'
import { setLitter } from '../redux/actions/dataActions'

const styles = (theme) => ({
  ...theme.theme,
  invisibleSeparator: {
    border: 'none',
    margin: 4,
  },
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
  litter: { body, createdAt, likeCount, commentCount, userImage, userHandle },
  setLitter,
  litterId,
}) => {
  const [state, setState] = useState({
    open: false,
    loading: false,
  })

  const getLitter = async () => {
    try {
      setState({ open: true, loading: true })
      const litter = await get(`/litter/${litterId}`)
      setLitter(litter)
      setState({ open: true, loading: false })
    } catch (error) {
      console.error(error)
    }
  }

  const handleOpen = () => {
    setState({ ...state, open: true })
    getLitter()
  }
  const handleClose = () => {
    setState({ ...state, open: false })
  }

  const dialogMarkup = state.loading ? (
    <div className={classes.spinnerDiv}>
      <CircularProgress size={200} thickness={2} />
    </div>
  ) : (
    <Grid container spacing={10}>
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
      </Grid>
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
