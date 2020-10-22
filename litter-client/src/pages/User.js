import React, { useState, useEffect } from 'react'
import { get } from '../util/apiClient'
import Litter from '../components/litter/Litter'
import StaticProfile from '../components/profile/StaticProfile'
// Material UI
import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid'
// Redux
import { connect } from 'react-redux'
import { setLitters } from '../redux/actions/dataActions'

const styles = (theme) => ({
  ...theme.theme,
})

function User({ match, data: { litters }, setLitters }) {
  const [state, setState] = useState({
    profile: null,
    loading: false,
  })

  const userHandle = match.params.userHandle
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setState({ profile: null, loading: true })
        const userData = await get(`/user/${userHandle}`)
        setLitters(userData.litters)
        setState({ profile: userData.user, loading: false })
      } catch (error) {
        console.error(error)
      }
    }
    fetchUserData()
  }, [setLitters, userHandle])

  const littersMarkup = state.loading ? (
    <p>Loading litters ...</p>
  ) : litters === null ? (
    <p>No litters from this user</p>
  ) : (
    litters.map((litter) => <Litter key={litter.litterId} litter={litter} />)
  )

  return (
    <Grid container spacing={10}>
      <Grid item sm={4} xs={12}>
        <StaticProfile profile={state.profile} />
      </Grid>
      <Grid item sm={8} xs={12}>
        {littersMarkup}
      </Grid>
    </Grid>
  )
}

const mapStateToProps = (state) => ({
  data: state.data,
})

const mapActionsToProps = (dispatch) => ({
  setLitters: setLitters(dispatch),
})
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(User))
