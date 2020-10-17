import React from 'react'
import { Link } from 'react-router-dom'
import withStyles from '@material-ui/core/styles/withStyles'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { get } from '../util/apiClient'
import MyButton from '../util/MyButton'
// Material UI Stuff
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
//Icons
import ChatIcon from '@material-ui/icons/Chat'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
import FavoriteIcon from '@material-ui/icons/Favorite'
// Redux
import { connect } from 'react-redux'
import { setLike, setUnlike } from '../redux/actions/dataActions'

const styles = {
  card: {
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
  user: { token, likes },
  setLike,
  setUnlike,
}) => {
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
  dayjs.extend(relativeTime)

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
})

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Litter))
