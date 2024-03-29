CREATE TYPE title AS ENUM ('CA', 'FO', 'FA');

CREATE TABLE employees (
  employee_number NUMERIC PRIMARY KEY NOT NULL,
  crew_type title NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL
);

CREATE TABLE hotels (
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL
);

CREATE TABLE pairings (
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  pairing_id TEXT NOT NULL,
  report TIMESTAMP NOT NULL,
  captain INTEGER REFERENCES employees(employee_number),
  first_officer INTEGER REFERENCES employees(employee_number),
  pair_start DATE NOT NULL,
  pair_end DATE NOT NULL,
  duration INTEGER NOT NULL,
  base TEXT NOT NULL,
  time_away_from_base INTERVAL HOUR TO MINUTE NOT NULL,
  trip_rig INTERVAL HOUR TO MINUTE,
  total_block INTERVAL HOUR TO MINUTE NOT NULL,
  total_deadhead INTERVAL HOUR TO MINUTE,
  total_credit INTERVAL HOUR TO MINUTE NOT NULL,
  total_duty INTERVAL HOUR TO MINUTE NOT NULL,
  flight_duty_period INTERVAL HOUR TO MINUTE NOT NULL,
  time_in_opentime INTERVAL HOUR TO MINUTE
);

CREATE TABLE layovers (
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  airport TEXT NOT NULL,
  duration INTERVAL HOUR TO MINUTE NOT NULL,
  hotel INTEGER REFERENCES hotels(id) NOT NULL,
  pairing INTEGER REFERENCES pairings(id) NOT NULL,
  day_end TIME NOT NULL,
  report TIME NOT NULL
);

CREATE TABLE pairing_legs (
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  flight_number INTEGER NOT NULL,
  departure_time TIMESTAMP NOT NULL,
  arrival_time TIMESTAMP NOT NULL,
  block INTERVAL HOUR TO MINUTE NOT NULL,
  departure_service TEXT NOT NULL,
  arrival_service TEXT NOT NULL,
  pairing_id INTEGER REFERENCES pairings(id) ON DELETE CASCADE NOT NULL,
  deadhead_duration INTERVAL HOUR TO MINUTE,
  layover INTEGER REFERENCES layovers(id)
);



