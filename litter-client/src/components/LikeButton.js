import React from 'react'
import { Link } from 'react-router-dom'
import { get } from '../util/apiClient'
import MyButton from '../util/MyButton'
// Icons
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
import FavoriteIcon from '@material-ui/icons/Favorite'
// Redux
import { connect } from 'react-redux'
import { setLike, setUnlike } from '../redux/actions/dataActions'

function LikeButton({ user: { likes, token }, litterId, setLike, setUnlike }) {
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
  const likeButton = !token ? (
    <Link to='/login'>
      <MyButton tip='Like'>
        <FavoriteBorder color='primary' />
      </MyButton>
    </Link>
  ) : isLiked() ? (
    <MyButton tip='Unlike' onClick={unlikeLitter}>
      <FavoriteIcon color='primary' />
    </MyButton>
  ) : (
    <MyButton tip='Like' onClick={likeLitter}>
      <FavoriteBorder color='primary' />
    </MyButton>
  )
  return likeButton
}

const mapStateToProps = (state) => ({
  user: state.user,
})

const mapActionsToProps = (dispatch) => ({
  setLike: setLike(dispatch),
  setUnlike: setUnlike(dispatch),
})

export default connect(mapStateToProps, mapActionsToProps)(LikeButton)
