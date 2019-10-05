import moment from 'moment'

const readingDay = value => {
  const asMoment = moment(value)
  let week = asMoment.week()
  // In Moment, the week with Jan1 is week 1, so the last days can fall on that week
  // Also, week should be zero based for math
  week = (asMoment.month() === 11 && week === 1 ? 53 : week) - 1
  return asMoment.day() === 0
    ? null
    : asMoment.dayOfYear() - week
}

export const loadDay = date => dispatch => {
  const action = payload => dispatch({ type: 'LOAD_DAY', payload })
  const day = readingDay(date)
  fetch(`./data/chapter-bible-reading-plan/${day}.json`).then(response => {
    if (response.status !== 200) {
      console.log('Looks like there was a problem. Status Code: ' + response.status)
      action({})
    }
    response.json().then(data => action(data));
  })
}

export const loadPlanType = payload => dispatch => {
  localStorage.setItem('readDaily-planType', payload)
  dispatch({ type: 'LOAD_PLAN_TYPE', payload })
}

