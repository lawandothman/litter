import React, { Fragment } from 'react'
import noImg from '../images/no-img.png'
// Material UI
import withStyles from '@material-ui/core/styles/withStyles'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'

const styles = (theme) => ({
  ...theme.theme,
})

const LitterSkeleton = ({ classes }) => {
  const content = Array.from({ length: 5 }).map((item, index) => (
    <Card className={classes.card} key={index}>
      <CardMedia className={classes.cover} image={noImg} />
      <CardContent className={classes.cardContent}>
        <div className={classes.handle} />
        <div className={classes.date} />
        <div className={classes.fullLine} />
        <div className={classes.fullLine} />
        <div className={classes.halfLine} />
      </CardContent>
    </Card>
  ))
  return <Fragment>{content}</Fragment>
}

export default withStyles(styles)(LitterSkeleton)
