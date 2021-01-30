function makeLayoversArray() {
  return [
    {
      id: 1,
      airport: 'IAH',
      duration: '13:49',
      hotel: 1,
      pairing: 1,
      day_end: '00:05',
      report: '13:54'
    },
    {
      id: 2,
      airport: 'PHX',
      duration: '14:25',
      hotel: 2,
      pairing: 2,
      day_end: '16:55',
      report: '07:20'
    }
  ]
}

function getLayoverResponseArray() {
  return [
    {
      id: 1,
      airport: 'IAH',
      day_end: '00:05:00',
      duration: {
        hours: 13,
        minutes: 49
      },
      hotel: 1,
      pairing: 1,
      report: '13:54:00'
    },
    {
      id: 2,
      airport: 'PHX',
      duration: {
        hours: 14,
        minutes: 25
      },
      hotel: 2,
      pairing: 2,
      day_end: '16:55:00',
      report: '07:20:00'
    }
  ]
}


module.exports = {
  makeLayoversArray,
  getLayoverResponseArray
}