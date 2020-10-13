import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Grid from '@material-ui/core/Grid'

import Litter from '../components/Litter'

const Home = () => {
  // Fetching the litters from the API
  const [litters, setLitters] = useState([])
  useEffect(() => {
    axios
      .get('/litters')
      .then((res) => {
        setLitters(res.data)
      })
      .catch((err) => console.error(err))
  }, [])
  let recentLittersMarkUp = litters ? (
    litters.map((litter) => <Litter key={litter.litterId} litter={litter} />)
  ) : (
    <p>Loading ...</p>
  )

  return (
    <Grid container spacing={10}>
      <Grid item sm={4} xs={12}>
        <p>Profile ...</p>
      </Grid>
      <Grid item sm={8} xs={12}>
        {recentLittersMarkUp}
      </Grid>
    </Grid>
  )
}

export default Home
