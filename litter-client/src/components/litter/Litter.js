import React from 'react'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import DeleteLitter from './DeleteLitter'
import LitterDialog from './LitterDialog'
import LikeButton from './LikeButton'
import CommentButton from './CommentButton'
// Material UI
import withStyles from '@material-ui/core/styles/withStyles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
// Redux
import { connect } from 'react-redux'

dayjs.extend(relativeTime)

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
    credentials: { handle },
  },
  openDialog,
}) => {
  const deleteButton =
    token && userHandle === handle ? <DeleteLitter litterId={litterId} /> : null

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
        <LikeButton litterId={litterId} />
        <span>{likeCount} Likes</span>
        <CommentButton litterId={litterId} userHandle={userHandle} />
        <span>{commentCount} Comments</span>
        <LitterDialog
          litterId={litterId}
          userHandle={userHandle}
          openDialog={openDialog}
        />
      </CardContent>
    </Card>
  )
}

const mapStateToProps = (state) => ({
  user: state.user,
})

export default connect(mapStateToProps)(withStyles(styles)(Litter))
