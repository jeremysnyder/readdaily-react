import React, { useState } from 'react'
import { connect } from 'react-redux'
import AppBar from '@material-ui/core/AppBar'
import { loadDay, loadPlanType } from './actions/data'
import moment from 'moment'

import { TitleBar } from './components/TitleBar'
import { ReadingList } from './components/ReadingSection'
import { BottomBar } from './components/BottomBar'

import './App.css'


const loadReadings = (readingFormat, readingData) => {
  if (!readingData) return null
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
      break
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
    <div className='app'>
      <AppBar position="static">
        <TitleBar loadedDay={loadedDay} changeDay={changeDay} />
      </AppBar>
      <ReadingList readings={readings} />
      <BottomBar plan={planTimeframe} updatePlanTimeframe={loadPlanType} />
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
