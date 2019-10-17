import React from 'react'

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

export function Info(props) {
  return (
    <Paper style={{ margin: 10, padding: 10 }}>
      <Typography variant="h5" component="h3">
        Read Daily v1.0.0
      </Typography>
      <Typography component="p">
        Read Daily provides chapter-based readings from the Two-Year Bible Reading Plan, produced jointly by
        Reformation OPC (Queens, NYC) and Resurrection OPC (State College, PA).
        For more resources, visit <a href="http://resurrectionopc.org/resources" target="_blank" rel="noopener noreferrer">resurrectionopc.org/resources</a>.
      </Typography>
    </Paper>
  )
}
