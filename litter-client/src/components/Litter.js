import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import withStyles from '@material-ui/core/styles/withStyles'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { get, del } from '../util/apiClient'
import MyButton from '../util/MyButton'
// Material UI Stuff
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
//Icons
import ChatIcon from '@material-ui/icons/Chat'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
import FavoriteIcon from '@material-ui/icons/Favorite'
import DeleteOutline from '@material-ui/icons/DeleteOutline'
// Redux
import { connect } from 'react-redux'
import { setLike, setUnlike, setDelete } from '../redux/actions/dataActions'

const styles = {
  card: {
    position: 'relative',
    display: 'flex',
    marginBottom: 20,
  },
  image: {
    minWidth: 200,
  },
  content: {
    padding: 25,
    objectFit: 'cover',
  },
  deleteButton: {
    position: 'absolute',
    left: '90%',
    top: '10%',
  },
}

const Litter = ({
  classes,
  litter: {
    body,
    createdAt,
    userImage,
    userHandle,
    litterId,
    likeCount,
    commentCount,
  },
  user: {
    token,
    likes,
    credentials: { handle },
  },
  setLike,
  setUnlike,
  setDelete,
}) => {
  dayjs.extend(relativeTime)
  const [open, setOpen] = useState(false)

  const isLiked = () => {
    if (likes && likes.find((like) => like.litterId === litterId)) return true
    else return false
  }

  const likeLitter = async () => {
    try {
      const likedLitter = await get(`/litter/${litterId}/like`)
      setLike(likedLitter)
    } catch (error) {
      console.error(error)
    }
  }
  const unlikeLitter = async () => {
    try {
      const unlikedLitter = await get(`litter/${litterId}/unlike`)
      setUnlike(unlikedLitter)
    } catch (error) {
      console.error(error)
    }
  }

  const deleteLitter = async () => {
    try {
      const deletedLitter = await del(`/litter/${litterId}`)
      setOpen(false)
      setDelete(litterId)
    } catch (error) {
      console.error(error)
    }
  }

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const likeButton = !token ? (
    <MyButton tip='Like'>
      <Link to='/login'>
        <FavoriteBorder color='primary' />
      </Link>
    </MyButton>
  ) : isLiked() ? (
    <MyButton tip='Unlike' onClick={unlikeLitter}>
      <FavoriteIcon color='primary' />
    </MyButton>
  ) : (
    <MyButton tip='Like' onClick={likeLitter}>
      <FavoriteBorder color='primary' />
    </MyButton>
  )

  const deleteButton =
    token && userHandle === handle ? (
      <Fragment>
        <MyButton
          tip='Delete'
          onClick={handleOpen}
          btnClassName={classes.deleteButton}
        >
          <DeleteOutline color='primary' />
        </MyButton>
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
          <DialogTitle>
            Are you sure you want to delete this litter?
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleClose} color='primary'>
              Cancel
            </Button>
            <Button onClick={deleteLitter} color='primary' variant='contained'>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    ) : null

  return (
    <Card className={classes.card}>
      <CardMedia
        image={userImage}
        title='Profile image'
        className={classes.image}
      />
      <CardContent className={classes.content}>
        <Typography
          variant='h5'
          component={Link}
          to={`/users/${userHandle}`}
          color='primary'
        >
          {userHandle}
        </Typography>
        {deleteButton}
        <Typography variant='body2' color='textSecondary'>
          {dayjs(createdAt).fromNow()}
        </Typography>
        <Typography variant='body1'>{body}</Typography>
        {likeButton}
        <span>{likeCount} Likes</span>
        <MyButton tip='comments'>
          <ChatIcon color='primary' />
        </MyButton>
        <span>{commentCount} Comments</span>
      </CardContent>
    </Card>
  )
}

const mapStateToProps = (state) => ({
  user: state.user,
})

const mapActionsToProps = (dispatch) => ({
  setLike: setLike(dispatch),
  setUnlike: setUnlike(dispatch),
  setDelete: setDelete(dispatch),
})

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Litter))
