import React, { Fragment } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import { post, get } from '../util/apiClient'
import EditDetails from './EditDetails'
import MyButton from '../util/MyButton'
// Material UI
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import MuiLink from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
// Icons
import LocationOn from '@material-ui/icons/LocationOn'
import LinkIcon from '@material-ui/icons/Link'
import CalendarToday from '@material-ui/icons/CalendarToday'
import CameraAltIcon from '@material-ui/icons/CameraAlt'
import KeyboardReturn from '@material-ui/icons/KeyboardReturn'
// Redux
import { setUser, loadUser, logoutUser } from '../redux/actions/userActions'
import { connect } from 'react-redux'

const styles = (theme) => ({
  paper: {
    padding: 20,
  },
  profile: {
    '& .image-wrapper': {
      textAlign: 'center',
      position: 'relative',
      '& button': {
        position: 'absolute',
        top: '80%',
        left: '70%',
      },
    },
    '& .profile-image': {
      width: 200,
      height: 200,
      objectFit: 'cover',
      maxWidth: '100%',
      borderRadius: '50%',
    },
    '& .profile-details': {
      textAlign: 'center',
      '&span, svg': {
        verticalAlign: 'middle',
      },
      '& a': {
        color: theme.palette.primary.main,
      },
    },
    '& hr': {
      border: 'none',
      margin: '0 0 10px 0',
    },
    '& svg.button': {
      '&: hover': {
        cursor: 'pointer',
      },
    },
  },
  buttons: {
    textAlign: 'center',
    '& a': {
      margin: '20px 10px',
    },
  },
})

const Profile = ({
  classes,
  user: {
    credentials: { handle, createdAt, imageUrl, bio, location, website },
    loading,
    token,
  },
  loadUser,
  setUser,
  logoutUser,
}) => {
  const handleEditPicture = () => {
    const fileInput = document.getElementById('imageInput')
    fileInput.click()
  }

  const handleImageChange = async (event) => {
    const image = event.target.files[0]
    const formData = new FormData()
    formData.append('image', image, image.name)
    try {
      await post('/user/image', formData)
      loadUser()
      const user = await get('/user')
      setUser(user)
    } catch (error) {
      console.error(error)
    }
  }

  let profileMarkUp = !loading ? (
    token ? (
      <Paper className={classes.paper}>
        <div className={classes.profile}>
          <div className='image-wrapper'>
            <img src={imageUrl} alt='profile' className='profile-image' />
            <input
              type='file'
              id='imageInput'
              onChange={handleImageChange}
              hidden='hidden'
            />
            <MyButton
              tip='Change profile picture'
              onClick={handleEditPicture}
              btnClassName='button'
            >
              <CameraAltIcon color='primary'></CameraAltIcon>
            </MyButton>
          </div>
          <hr />
          <div className='profile-details'>
            <MuiLink
              component={Link}
              to={`/users/${handle}`}
              color='primary'
              variant='h5'
            >
              @{handle}
            </MuiLink>
            <hr />
            {bio && <Typography variant='body2'>{bio}</Typography>}
            <hr />
            {location && (
              <Fragment>
                <LocationOn color='primary' /> <span>{location}</span>
                <hr />
              </Fragment>
            )}
            {website && (
              <Fragment>
                <LinkIcon color='primary' />
                <a href={website} target='_blank' rel='noopener noreferrer'>
                  {' '}
                  {website}
                </a>
                <hr />
              </Fragment>
            )}
            <CalendarToday color='primary' />{' '}
            <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
          </div>
          <MyButton tip='Log Out' onClick={logoutUser}>
            <KeyboardReturn color='primary' />
          </MyButton>
          <EditDetails />
        </div>
      </Paper>
    ) : (
      <Paper className={classes.paper}>
        <Typography variant='body2' align='center'>
          No profile found, please log in
        </Typography>
        <div className={classes.buttons}>
          <Button
            variant='contained'
            color='primary'
            component={Link}
            to='/login'
          >
            Log In
          </Button>
          <Button
            variant='contained'
            color='secondary'
            component={Link}
            to='/signup'
          >
            Sign Up
          </Button>
        </div>
      </Paper>
    )
  ) : (
    <div>
      <p>Loading</p>
    </div>
  )
  return profileMarkUp
}

const mapStateToProps = (state) => ({
  user: state.user,
})

const mapActionsToProps = (dispatch) => ({
  setUser: setUser(dispatch),
  loadUser: loadUser(dispatch),
  logoutUser: logoutUser(dispatch),
})

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Profile))
