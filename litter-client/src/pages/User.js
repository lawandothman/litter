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
    litterIdParam: null,
  })

  const userHandle = match.params.userHandle
  const litterId = match.params.litterId

  useEffect(() => {
    if (litterId) setState({ litterIdParam: litterId })
    const fetchUserData = async () => {
      try {
        setState({ profile: null, loading: true })
        const userData = await get(`/user/${userHandle}`)
        setLitters(userData.litters)
        setState({
          litterIdParam: litterId,
          profile: userData.user,
          loading: false,
        })
      } catch (error) {
        console.error(error)
      }
    }
    fetchUserData()
  }, [setLitters, litterId, userHandle])

  const littersMarkup = state.loading ? (
    <p>Loading litters ...</p>
  ) : litters === null ? (
    <p>No litters from this user</p>
  ) : !state.litterIdParam ? (
    litters.map((litter) => <Litter key={litter.litterId} litter={litter} />)
  ) : (
    litters.map((litter) => {
      if (litter.litterId !== state.litterIdParam)
        return <Litter key={litter.litterId} litter={litter} />
      else return <Litter key={litter.litterId} litter={litter} openDialog />
    })
  )

  return (
    <Grid container spacing={10}>
      <Grid item sm={4} xs={12}>
        {state.profile === null ? (
          <p>Loading Profile ...</p>
        ) : (
          <StaticProfile profile={state.profile} />
        )}
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
