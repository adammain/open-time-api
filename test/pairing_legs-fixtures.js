function makePairingsLegsArray() {
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
      deadhead_duration: 'null',
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
      pairing_id: 2,
      deadhead_duration: 'null',
      layover: 'null'
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
      deadhead_duration: 'null',
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
      pairing_id: 3,
      deadhead_duration: 'null',
      layover: 'null'
    },
  ]
}

module.exports = {
  makePairingsLegsArray
}