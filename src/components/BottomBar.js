import React from 'react'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

export function BottomBar(props) {
  const { plan, updatePlanTimeframe } = props
  const planTimeframeOptions = {
    '1': 'All In 1 Year',
    '2:1': '2yr Plan - Year 1',
    '2:2': '2yr Plan - Year 2'
  }

  return (
    <div className='bottom-bar'>
      <FormControl>
        <Select
          value={plan}
          onChange={event => updatePlanTimeframe(event.target.value)}
          className='bottom-bar-select'
        >
          <MenuItem value="" disabled>Reading Plan</MenuItem>
          {Object.keys(planTimeframeOptions).map(x => <MenuItem key={x} value={x}>{planTimeframeOptions[x]}</MenuItem>)}
        </Select>
      </FormControl>
    </div>
  )
}
