function makePairingsArray() {
  return [
    {
      id: 1,
      pairing_id: 'D3433',
      report: '2021-01-30 06:15',
      captain: 1,
      first_officer: 4,
      pair_start: '2021-01-30',
      pair_end: '2021-01-31',
      base: 'DEN',
      time_away_from_base: '26:47',
      trip_rig: '01:13',
      total_block: '10:00',
      total_deadhead: '00:00',
      total_credit: '11:13',
      total_duty: '12:58',
      flight_duty_period: '12:28',
      time_in_opentime: null
    },
    {
      id: 2,
      pairing_id: 'D6866',
      report: '2021-02-04 06:15',
      captain: 2,
      first_officer: 5,
      pair_start: '2021-02-04',
      pair_end: '2021-02-05',
      base: 'DEN',
      time_away_from_base: '16:47',
      trip_rig: '00:00',
      total_block: '10:00',
      total_deadhead: '02:00',
      total_credit: '13:13',
      total_duty: '14:58',
      flight_duty_period: '14:28',
      time_in_opentime: '46:02'
    },
  ]
}

function getPairingsResponseArray() {
  return [
    {
      id: 1,
      pairing_id: 'D3433',
      report: '2021-01-30T06:15:00.000Z',
      captain: 1,
      first_officer: 4,
      pair_start: '2021-01-30T00:00:00.000Z',
      pair_end: '2021-01-31T00:00:00.000Z',
      base: 'DEN',
      time_away_from_base: { hours: 26, minutes: 47 },
      trip_rig: { hours: 1, minutes: 13 },
      total_block: { hours: 10 },
      total_deadhead: {},
      total_credit: { hours: 11, minutes: 13 },
      total_duty: { hours: 12, minutes: 58 },
      flight_duty_period: { hours: 12, minutes: 28 },
      time_in_opentime: null
    },
    {
      id: 2,
      pairing_id: 'D6866',
      report: '2021-02-04T06:15:00.000Z',
      captain: 2,
      first_officer: 5,
      pair_start: '2021-02-04T00:00:00.000Z',
      pair_end: '2021-02-05T00:00:00.000Z',
      base: 'DEN',
      time_away_from_base: { hours: 16, minutes: 47 },
      trip_rig: {},
      total_block: { hours: 10 },
      total_deadhead: { hours: 2 },
      total_credit: { hours: 13, minutes: 13 },
      total_duty: { hours: 14, minutes: 58 },
      flight_duty_period: { hours: 14, minutes: 28 },
      time_in_opentime: { hours: 46, minutes: 2 }
    }
  ]
}

module.exports = {
  makePairingsArray, 
  getPairingsResponseArray
}