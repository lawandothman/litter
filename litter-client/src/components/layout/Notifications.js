import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import { post } from '../../util/apiClient'
import dayjs from 'dayjs'
import relativTime from 'dayjs/plugin/relativeTime'
// Material UI
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Badge from '@material-ui/core/Badge'
// Icons
import NotificationsIcon from '@material-ui/icons/Notifications'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ChatIcon from '@material-ui/icons/Chat'
// Redux
import { connect } from 'react-redux'
import { setNotificationsRead } from '../../redux/actions/userActions'

dayjs.extend(relativTime)

function Notifications({ notifications, setNotificationsRead }) {
  const [state, setState] = useState({
    anchorEl: null,
  })

  const handleOpen = (event) => {
    setState({ anchorEl: event.target })
  }

  const handleClose = () => {
    setState({ anchorEl: null })
  }

  const onMenuOpened = async () => {
    try {
      let unreadNotifications = notifications
        .filter((not) => !not.read)
        .map((not) => not.notificationId)
      await post('/notifications', unreadNotifications)
      setNotificationsRead()
    } catch (error) {
      console.error(error)
    }
  }

  let notificationsIcon
  if (notifications && notifications.length > 0) {
    notifications.filter((not) => not.read === false).length > 0
      ? (notificationsIcon = (
          <Badge
            badgeContent={
              notifications.filter((not) => not.read === false).length
            }
            color='secondary'
          >
            <NotificationsIcon color='secondary' />
          </Badge>
        ))
      : (notificationsIcon = <NotificationsIcon color='secondary' />)
  } else {
    notificationsIcon = <NotificationsIcon color='secondary' />
  }

  let notificationsMarkup =
    notifications && notifications.length > 0 ? (
      notifications.map((not) => {
        const verb = not.type === 'like' ? 'liked' : 'commented on'
        const time = dayjs(not.createdAt).fromNow()
        const icon =
          not.type === 'like' ? (
            <FavoriteIcon style={{ marginRight: 10 }} />
          ) : (
            <ChatIcon style={{ marginRight: 10 }} />
          )
        return (
          <MenuItem key={not.createdAt} onClick={handleClose}>
            {icon}
            <Typography
              component={Link}
              color='textPrimary'
              variant='body1'
              to={`/users/${not.recipient}/litter/${not.litterId}`}
            >
              {not.sender} {verb} your litter {time}
            </Typography>
          </MenuItem>
        )
      })
    ) : (
      <MenuItem onClick={handleClose}>You have no notifiactions yet</MenuItem>
    )

  return (
    <Fragment>
      <Tooltip placement='top' title='Notifications'>
        <IconButton
          aria-owns={state.anchorEl ? 'simple-menu' : undefined}
          aria-haspopup='true'
          onClick={handleOpen}
        >
          {notificationsIcon}
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={state.anchorEl}
        open={Boolean(state.anchorEl)}
        onClose={handleClose}
        onEntered={onMenuOpened}
      >
        {notificationsMarkup}
      </Menu>
    </Fragment>
  )
}

const mapStateToProps = (state) => ({
  notifications: state.user.notifications,
})

const mapActionsToProps = (dispatch) => ({
  setNotificationsRead: setNotificationsRead(dispatch),
})

export default connect(mapStateToProps, mapActionsToProps)(Notifications)
