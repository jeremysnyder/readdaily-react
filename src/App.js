import React, { useState } from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack';
import ArrowForward from '@material-ui/icons/ArrowForward';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { loadDay, loadPlanType } from './actions/data'
import { connect } from 'react-redux'
import moment from 'moment'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    textAlign: 'center',
    flexGrow: 1
  },
  bottomBar: {
    width: '100%',
    position: 'fixed',
    textAlign: 'center',
    bottom: 82,
    backgroundColor: 'lightGray'
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function Title(props) {
  return (
    <div className={props.classes.title}>
      <Typography variant="h5">
        Read Daily
      </Typography>
      <Typography variant="subtitle2">
        {props.loadedDay.format('ddd, MMMM Do')}
      </Typography>
    </div>
  )
}

function TitleBar(props) {
  const { classes, loadedDay, changeDay } = props
  return (
    <Toolbar>
      <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => changeDay(loadedDay.subtract(1, 'days'))}>
        <ArrowBack />
      </IconButton>
      <Title classes={classes} loadedDay={loadedDay} />
      <IconButton edge="end" color="inherit" aria-label="menu" onClick={() => changeDay(loadedDay.add(1, 'days'))}>
        <ArrowForward />
      </IconButton>
    </Toolbar>
  )
}

function Reading(props) {
  const { title, reading } = props
  const headerStyle = {
    backgroundColor: 'lightgray',
    padding: 8,
    fontSize: '1.1rem',
    fontWeight: 'bold',
    textAlign: 'center'
  }
  return (
    <Card style={{ margin: 10 }}>
      <CardHeader title={title} disableTypography={true} style={headerStyle} />
      <CardActions style={{ padding: 8, fontWeight: 'bold' }}>
        {reading}
        <Button
          variant="contained"
          color="default"
          startIcon={<LibraryBooksIcon />}
          style={{ marginLeft: 'auto' }}
        >
          Read
        </Button>
      </CardActions>
    </Card>
  )
}

function ReadingList(props) {
  const { readings } = props
  return readings.map(x => <Reading key={x.title} title={x.title} reading={x.reading} />)
}

function BottomBar(props) {
  const { classes, plan, updatePlanTimeframe } = props
  const planTimeframeOptions = {
    '1': 'All In 1 Year',
    '2:1': '2yr Plan - Year 1',
    '2:2': '2yr Plan - Year 2'
  }

  return (
    <div className={classes.bottomBar}>
      <FormControl style={{ width: 200 }}>
        <Select
          value={plan}
          onChange={event => updatePlanTimeframe(event.target.value)}
          style={{ marginBottom: 15, marginTop: 15 }}
        >
          <MenuItem value="" disabled>Reading Plan</MenuItem>
          {Object.keys(planTimeframeOptions).map(x => <MenuItem key={x} value={x}>{planTimeframeOptions[x]}</MenuItem>)}
        </Select>
      </FormControl>
    </div>
  )
}

const loadReadings = (readingFormat, readingData) => {
  const toReading = (title, reading) => ({ title, reading })
  const readings = []
  switch (readingFormat) {
    case '1':
      if (readingData.otReading) readings.push(toReading('Old Testament 1', readingData.otReading))
      if (readingData.ot2Reading) readings.push(toReading('Old Testament 2', readingData.ot2Reading))
      break
    case '2:1':
      if (readingData.otReading) readings.push(toReading('Old Testament', readingData.otReading))
      break
    case '2:2':
      if (readingData.ot2Reading) readings.push(toReading('Old Testament', readingData.ot2Reading))
      break
    default:
      break;
  }

  if (readingData.psalmsReading) readings.push(toReading('Psalms', readingData.psalmsReading))
  if (readingData.gapReading) readings.push(toReading('Gospels/Acts/Proverbs', readingData.gapReading))
  if (readingData.letterReading) readings.push(toReading('Letters', readingData.letterReading))

  return readings
}

function App(props) {
  const { data, loadDay, loadPlanType, planTimeframe } = props
  const [dayChanged, setDayChanged] = useState(true)
  const [loadedDay, setLoadedDay] = useState(moment())
  const classes = useStyles()
  const readings = loadReadings(planTimeframe, data)
  if (dayChanged) {
    loadDay(loadedDay)
    loadPlanType(localStorage.getItem('readDaily-planType') || '1')
    setDayChanged(false)
  }

  const changeDay = day => {
    setDayChanged(true)
    setLoadedDay(day)
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <TitleBar classes={classes} loadedDay={loadedDay} changeDay={changeDay} />
      </AppBar>
      <ReadingList readings={readings} />
      <BottomBar classes={classes} plan={planTimeframe} updatePlanTimeframe={loadPlanType} />
    </div>
  )
}

const mapStateToProps = state => ({
  data: (state.data.readingPlan || {}),
  planTimeframe: (state.data.readingPlanType || '1'),
})

const mapDispatchToProps = dispatch => ({
  loadDay: date => dispatch(loadDay(date)),
  loadPlanType: planType => dispatch(loadPlanType(planType))
})


export default connect(mapStateToProps, mapDispatchToProps)(App)
