import React, { Fragment, useState } from 'react'
import { del } from '../util/apiClient'
import MyButton from '../util/MyButton'
// Material UI
import withStyles from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
// Icons
import DeleteOutline from '@material-ui/icons/DeleteOutline'
// Redux
import { connect } from 'react-redux'
import { setDelete } from '../redux/actions/dataActions'

const styles = {
  deleteButton: {
    position: 'absolute',
    left: '90%',
    top: '10%',
  },
}

function DeleteLitter({ classes, litterId, setDelete }) {
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const deleteLitter = async () => {
    try {
      await del(`/litter/${litterId}`)
      setOpen(false)
      setDelete(litterId)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Fragment>
      <MyButton
        tip='Delete'
        onClick={handleOpen}
        btnClassName={classes.deleteButton}
      >
        <DeleteOutline color='primary' />
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
        <DialogTitle>Are you sure you want to delete this litter?</DialogTitle>
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
  )
}

const mapActionsToProps = (dispatch) => ({
  setDelete: setDelete(dispatch),
})

export default connect(
  null,
  mapActionsToProps
)(withStyles(styles)(DeleteLitter))
