CREATE TABLE schedules (
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  month TEXT NOT NULL,
  days_in_month TEXT[][]
);