import React from 'react'

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

export function Info(props) {
  return (
    <Paper style={{ margin: 10, padding: 10 }}>
      <Typography variant="h5" component="h3">
        Read Daily v1.0.1
      </Typography>
      <Typography component="p">
        Read Daily is a free service produced in the hopes
        of facilitating sustained Bible reading in a mobile
        society. The OT readings are arranged chronologically,
        configurable to a 1 or 2 year cycle. The NT and Psalms
        are read in their entirety each year, with the Gospels,
        Acts, and Proverbs repeated twice.
      </Typography>
    </Paper>
  )
}
