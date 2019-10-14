import React from 'react'
import Typography from '@material-ui/core/Typography'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import ArrowBack from '@material-ui/icons/ArrowBack'
import ArrowForward from '@material-ui/icons/ArrowForward'

function Title(props) {
  return (
    <div className='title'>
      <Typography variant="h5">
        {props.loadedDay.format('ddd, MMMM Do')}
      </Typography>
      <Typography variant="subtitle2">
        Read Daily
      </Typography>
    </div>
  )
}

export function TitleBar(props) {
  const { loadedDay, changeDay } = props
  return (
    <Toolbar>
      <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => changeDay(loadedDay.subtract(1, 'days'))}>
        <ArrowBack />
      </IconButton>
      <Title loadedDay={loadedDay} />
      <IconButton edge="end" color="inherit" aria-label="menu" onClick={() => changeDay(loadedDay.add(1, 'days'))}>
        <ArrowForward />
      </IconButton>
    </Toolbar>
  )
}
