import React from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks'

const openReading = passages => {
  const url = `http://esv.org/${passages.map(x => window.encodeURIComponent(x.reading)).join(';')}/`
  window.open(url, '_blank')
}

function NoReading(props) {
  return (
    <Card className='reading'>
      <CardHeader title='No readings today' disableTypography={true} className='reading-header' />
    </Card>
  )
}

function Reading(props) {
  const { title, reading } = props
  return (
    <Card className='reading'>
      <CardHeader title={title} disableTypography={true} className='reading-header' />
      <CardActions className='reading-body'>
        {reading}
        <ReadButton passage={reading} />
      </CardActions>
    </Card>
  )
}

function ReadButton(props) {
  const { passage } = props
  return <Button
    variant="contained"
    color="default"
    startIcon={<LibraryBooksIcon />}
    style={{ marginLeft: 'auto' }}
    onClick={openReading.bind(null, [passage])}
  >
    Read
  </Button>
}

function ReadAllSection(props) {
  const { readings } = props
  return <div style={{ textAlign: 'center', marginTop: 20 }}>
    <Button
      variant="contained"
      color="default"
      startIcon={<LibraryBooksIcon />}

      onClick={openReading.bind(null, readings)}
    >
      Read All Passages
  </Button>
  </div>
}

export function ReadingList(props) {
  const { readings } = props
  return readings && readings.length
    ? <div>
      {readings.map(x => <Reading key={x.title} title={x.title} reading={x.reading} />)}
      <ReadAllSection readings={readings} />
    </div>
    : <NoReading />
}

