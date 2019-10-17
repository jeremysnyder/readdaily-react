import React from 'react'

import { ReadingList } from './ReadingSection'
import { BottomBar } from './BottomBar'

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

export function Readings(props) {
  const { data, loadPlanType, planTimeframe } = props
  const readings = loadReadings(planTimeframe, data)

  return (
    <div className='app'>
      <ReadingList readings={readings} />
      <BottomBar plan={planTimeframe} updatePlanTimeframe={loadPlanType} />
    </div>
  )
}
