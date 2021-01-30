function makePairingLegsArray() {
  return [
    {
      id: 1,
      flight_number: '753',
      departure_time: '2021-01-31 14:45',
      arrival_time: '2021-01-31 16:43',
      block: '01:58',
      departure_service: 'DEN',
      arrival_service: 'IAH',
      pairing_id: 1,
      deadhead_duration: null,
      layover: 1
    },
    {
      id: 2,
      flight_number: '754',
      departure_time: '2021-02-01 20:30',
      arrival_time: '2021-02-01 23:50',
      block: '02:20',
      departure_service: 'IAH',
      arrival_service: 'DEN',
      pairing_id: 1,
      deadhead_duration: null,
      layover: null
    },
    {
      id: 3,
      flight_number: '554',
      departure_time: '2021-02-04 14:45',
      arrival_time: '2021-02-04 16:43',
      block: '01:58',
      departure_service: 'DEN',
      arrival_service: 'PHX',
      pairing_id: 2,
      deadhead_duration: null,
      layover: 2
    },
    {
      id: 4,
      flight_number: '555',
      departure_time: '2021-02-05 08:05',
      arrival_time: '2021-02-05 10:01',
      block: '01:56',
      departure_service: 'PHX',
      arrival_service: 'DEN',
      pairing_id: 2,
      deadhead_duration: null,
      layover: null
    },
  ]
}

function getPairingLegsResponseArray() {
  return [
    {
      id: 1,
      flight_number: 753,
      departure_time: '2021-01-31T14:45:00.000Z',
      arrival_time: '2021-01-31T16:43:00.000Z',
      block: {
        hours: 1,
        minutes: 58
      },
      departure_service: 'DEN',
      arrival_service: 'IAH',
      pairing_id: 1,
      deadhead_duration: null,
      layover: 1
    },
    {
      id: 2,
      flight_number: 754,
      departure_time: '2021-02-01T20:30:00.000Z',
      arrival_time: '2021-02-01T23:50:00.000Z',
      block: {
        hours: 2,
        minutes: 20
      },
      departure_service: 'IAH',
      arrival_service: 'DEN',
      pairing_id: 1,
      deadhead_duration: null,
      layover: null
    },
    {
      id: 3,
      flight_number: 554,
      departure_time: '2021-02-04T14:45:00.000Z',
      arrival_time: '2021-02-04T16:43:00.000Z',
      block: {
        hours: 1,
        minutes: 58
      },
      departure_service: 'DEN',
      arrival_service: 'PHX',
      pairing_id: 2,
      deadhead_duration: null,
      layover: 2
    },
    {
      id: 4,
      flight_number: 555,
      departure_time: '2021-02-05T08:05:00.000Z',
      arrival_time: '2021-02-05T10:01:00.000Z',
      block: {
        hours: 1,
        minutes: 56
      },
      departure_service: 'PHX',
      arrival_service: 'DEN',
      pairing_id: 2,
      deadhead_duration: null,
      layover: null
    },
  ]
}

module.exports = {
  makePairingLegsArray,
  getPairingLegsResponseArray
}