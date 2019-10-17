import React from 'react'
import Typography from '@material-ui/core/Typography'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import ArrowBack from '@material-ui/icons/ArrowBack'
import ArrowForward from '@material-ui/icons/ArrowForward'
import Close from '@material-ui/icons/Close'
import Info from '@material-ui/icons/Info'

function ReadingTitle(props) {
  const { loadedDay, onInfoClick } = props
  return (
    <div className='title'>
      <Typography variant="h5">{loadedDay.format('ddd, MMMM Do')}</Typography>
      <Typography variant="subtitle2">
        <Button
          variant="contained"
          color="primary"
          size="small"
          endIcon={<Info />}
          onClick={onInfoClick}
        >
          Read Daily
        </Button>
      </Typography>
    </div>
  )
}

function InfoTitle(props) {
  return (
    <div className='title'>
      <Typography variant="h5">About Read Daily</Typography>
    </div>
  )
}

export function ReadingTitleBar(props) {
  const { loadedDay, changeDay } = props
  return (
    <Toolbar>
      <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => changeDay(loadedDay.subtract(1, 'days'))}>
        <ArrowBack />
      </IconButton>
      <ReadingTitle {...props} />
      <IconButton edge="end" color="inherit" aria-label="menu" onClick={() => changeDay(loadedDay.add(1, 'days'))}>
        <ArrowForward />
      </IconButton>
    </Toolbar>
  )
}

export function InfoTitleBar(props) {
  const { onInfoClose } = props
  return (
    <Toolbar>
      <IconButton edge="start" color="inherit" aria-label="menu">
        <Info />
      </IconButton>
      <InfoTitle />
      <IconButton edge="end" color="inherit" aria-label="menu" onClick={onInfoClose}>
        <Close />
      </IconButton>
    </Toolbar>
  )
}

export function TitleBar(props) {
  return props.showConfig
    ? <InfoTitleBar {...props} />
    : <ReadingTitleBar {...props} />
}
