import React, { useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import { get } from '../util/apiClient'
// Components
import Litter from '../components/Litter'
import Profile from '../components/Profile'
// Redux
import { connect } from 'react-redux'
import { setLitters } from '../redux/actions/dataActions'

const Home = ({ data: { litters, loading }, setLitters }) => {
  useEffect(() => {
    const getLitters = async () => {
      try {
        const incomingLitters = await get('/litters')
        setLitters(incomingLitters)
      } catch (error) {
        console.error(error)
      }
    }
    getLitters()
  }, [setLitters])

  let recentLittersMarkUp =
    litters.length > 0 ? (
      litters.map((litter) => <Litter key={litter.litterId} litter={litter} />)
    ) : (
      <p>Loading ...</p>
    )

  return (
    <Grid container spacing={10}>
      <Grid item sm={4} xs={12}>
        <Profile />
      </Grid>
      <Grid item sm={8} xs={12}>
        {recentLittersMarkUp}
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

export default connect(mapStateToProps, mapActionsToProps)(Home)
