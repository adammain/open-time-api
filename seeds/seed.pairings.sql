INSERT INTO employees (employee_number, crew_type, first_name, last_name) 
VALUES
  (00984, 'CA', 'Carol', 'Bohland'),
  (05194, 'CA', 'David', 'Hall'),
  (08914, 'CA', 'Les', 'Crook'),
  (07131, 'CA', 'Stephen', 'Godlevsky'),
  (05838, 'CA', 'Michael', 'De Herrera'),
  (04728, 'CA', 'Arvin', 'Woodbury'),
  (07302, 'CA', 'Doug', 'Kauffman'),
  (05467, 'CA', 'Nick', 'Rockeman'),
  (30984, 'FO', 'Adam', 'Main'),
  (31503, 'FO', 'Jacob', 'Best'),
  (29984, 'FO', 'Jonathan', 'Cullum'),
  (28984, 'FO', 'Brian', 'Cullinan'),
  (29155, 'FO', 'Brian', 'Glasner'),
  (31337, 'FO', 'Roxanne', 'Shaffer'),
  (29812, 'FO', 'Anne', 'Hrenchir'),
  (29939, 'FO', 'Matthew', 'Hurtley');

INSERT INTO hotels (name, phone)
VALUES
  ('Sheraton North Houston at', '(281)442-5100'),
  ('Graduate Tempe Hotel', '(480)968-1877'),
  ('Radisson Hotel Salt Lake', '(801)531-7500'),
  ('Wyndham San Diego Bayside', '(619)232-3861'), 
  ('Courtyard North CLE', '(440)716-9977');

-- @TODO Update day legs total GRNT, TBLK, TDHD, TCRD, TDUTY, FDP to be in pairing_legs table and trips totals calculated from that
INSERT INTO pairings (
pairing_id, 
report,
captain,
first_officer,
pair_start,
pair_end,
base,
time_away_from_base,
trip_rig,
total_block,
total_deadhead,
total_credit,
total_duty,
flight_duty_period,
time_in_opentime)
VALUES           
  ('D3029', '2021-01-31 06:15', 00984, 30984, '2021-01-31', '2021-01-31', 'DEN', '07:42', null, '05:23', '0000', '05:23', '07:42', '07:27', null),
  ('D3257', '2021-02-01 13:45', 05194, 30984, '2021-02-01', '2021-02-02', 'DEN', '26:47', '01:13', '08:47', '0000', '10:00', '12:58', '12:28', null),
  ('D3144', '2021-02-04 05:00', 08914, 30984, '2021-02-04', '2021-02-05', 'DEN', '29:16', '00:13', '07:46', '02:01', '10:00', '14:51', '10:21', null),
  ('D3303', '2021-02-08 17:20', 07131, 30984, '2021-02-08', '2021-02-08', 'DEN', '06:49', '00:21', '04:39', '00:00', '05:00', '06:49', '06:34', null),
  ('D3290', '2021-02-11 15:28', 05838, 30984, '2021-02-11', '2021-02-12', 'DEN', '29:44', null, '10:20', '00:00', '10:20', '17:12', '16:42', null),
  ('D3291', '2021-02-14 15:28', 04728, 30984, '2021-02-14', '2021-02-15', 'DEN', '29:40', null, '10:03', '00:00', '10:03', '17:08', '16:38', null),
  ('D3308', '2021-02-18 19:30', 07302, 30984, '2021-02-18', '2021-02-19', 'DEN', '27:39', '00:27', '09:33', '00:00', '10:00', '13:43', '13:13', null),
  ('D3308', '2021-02-25 19:30', 05838, 30984, '2021-02-25', '2021-02-26', 'DEN', '27:39', '00:27', '09:33', '00:00', '10:00', '13:43', '13:13', null),
  ('D3B41', '2021-02-27 08:00', 05467, null, '2021-02-27', '2021-02-27', 'DEN', '05:00', '02:00', '03:00', '00:00', '05:00', '05:00', '04:45', '46:02'),
  ('D3321', '2021-02-14 21:09', 00984, null, '2021-02-14', '2021-02-15', 'DEN', '07:16', '00:06', '04:54', '00:00', '05:00', '07:16', '07:01', '52:07'),
  ('D3380', '2021-02-21 10:09', 05194, null, '2021-02-21', '2021-02-22', 'DEN', '29:16', '00:00', '13:01', '00:00', '13:01', '14:01', '15:01', '198:07'),
  ('D3290', '2021-02-28 15:09', 08914, null, '2021-02-28', '2021-03-01', 'DEN', '28:16', '00:00', '11:00', '00:00', '11:00', '12:16', '13:01', '00:07');

INSERT INTO layovers (airport, duration, hotel, pairing, day_end, report)
VALUES
  ('IAH', '13:49', 1, 2, '00:05', '13:54'),
  ('PHX', '14:25', 2, 3, '16:55', '07:20'),
  ('SLC', '12:32', 3, 5, '00:08', '12:40'),
  ('SLC', '12:32', 3, 6, '00:08', '12:40'),
  ('IAH', '13:56', 1, 7, '23:59', '13:55');

INSERT INTO pairing_legs (flight_number, departure_time, arrival_time, block, departure_service, arrival_service, pairing_id, deadhead_duration, layover)
VALUES 
  (753, '2021-02-01 14:45', '2021-02-01 16:43', '01:58', 'DEN', 'PHX', 2, null, null),
  (754, '2021-02-01 17:48', '2021-02-01 19:39', '01:51', 'PHX', 'DEN', 2, null, null),
  (244, '2021-02-01 20:30', '2021-02-01 23:50', '02:20', 'DEN', 'IAH', 2, null, 1),
  (243, '2021-02-02 20:30', '2021-02-02 23:50', '02:20', 'IAH', 'DEN', 2, null, null),
  (753, '2021-02-04 14:39', '2021-02-04 16:40', '02:01', 'DEN', 'PHX', 3, '02:01', null),
  (750, '2021-02-05 08:05', '2021-02-05 10:01', '01:56', 'PHX', 'DEN', 3, null, null),
  (370, '2021-02-08 18:20', '2021-02-08 19:44', '02:24', 'DEN', 'ONT', 4, null, null),
  (371, '2021-02-08 20:39', '2021-02-08 23:54', '02:15', 'ONT', 'DEN', 4, null, null),
  (383, '2021-02-11 16:28', '2021-02-11 18:19', '01:51', 'DEN', 'ELP', 5, null, null),
  (382, '2021-02-11 19:04', '2021-02-11 21:00', '01:56', 'ELP', 'DEN', 5, null, null),
  (575, '2021-02-11 22:22', '2021-02-11 23:53', '01:31', 'DEN', 'SLC', 5, null, 3),
  (572, '2021-02-12 13:25', '2021-02-12 14:53', '01:28', 'SLC', 'DEN', 5, null, null),
  (634, '2021-02-12 16:15', '2021-02-12 18:51', '01:36', 'DEN', 'TUL', 5, null, null),
  (635, '2021-02-12 19:59', '2021-02-12 20:57', '01:58', 'TUL', 'DEN', 5, null, null),
  (383, '2021-02-14 16:28', '2021-02-14 18:19', '01:51', 'DEN', 'ELP', 6, null, null),
  (382, '2021-02-14 19:04', '2021-02-14 21:00', '01:56', 'ELP', 'DEN', 6, null, null),
  (575, '2021-02-14 22:22', '2021-02-14 23:53', '01:31', 'DEN', 'SLC', 6, null, 4),
  (572, '2021-02-15 13:25', '2021-02-15 14:53', '01:28', 'SLC', 'DEN', 6, null, null),
  (182, '2021-02-15 16:44', '2021-02-15 19:09', '01:25', 'DEN', 'OMA', 6, null, null),
  (183, '2021-02-15 20:01', '2021-02-15 20:53', '01:52', 'OMA', 'DEN', 6, null, null),
  (244, '2021-02-18 20:30', '2021-02-18 23:44', '02:14', 'DEN', 'IAH', 7, null, 5),
  (243, '2021-02-19 14:40', '2021-02-19 16:18', '02:38', 'IAH', 'DEN', 7, null, null),
  (269, '2021-02-19 17:15', '2021-02-19 18:41', '02:26', 'DEN', 'SNA', 7, null, null),
  (268, '2021-02-19 19:39', '2021-02-19 22:54', '02:15', 'SNA', 'DEN', 7, null, null),
  (244, '2021-02-25 20:30', '2021-02-25 23:44', '02:14', 'DEN', 'IAH', 8, null, 5),
  (243, '2021-02-26 14:40', '2021-02-26 16:18', '02:38', 'IAH', 'DEN', 8, null, null),
  (269, '2021-02-26 17:15', '2021-02-26 18:41', '02:26', 'DEN', 'SNA', 8, null, null),
  (268, '2021-02-26 19:39', '2021-02-26 22:54', '02:15', 'SNA', 'DEN', 8, null, null);

INSERT INTO schedules (month, days_in_month)
VALUES 
(
  'JANUARY', 
  ARRAY [
    (to_date('2021-01-01', 'YYYY-MM-DD')),
    (to_date('2021-01-02', 'YYYY-MM-DD')),
    (to_date('2021-01-03', 'YYYY-MM-DD')),
    (to_date('2021-01-04', 'YYYY-MM-DD')),
    (to_date('2021-01-05', 'YYYY-MM-DD')),
    (to_date('2021-01-06', 'YYYY-MM-DD')),
    (to_date('2021-01-07', 'YYYY-MM-DD')),
    (to_date('2021-01-08', 'YYYY-MM-DD')),
    (to_date('2021-01-09', 'YYYY-MM-DD')),
    (to_date('2021-01-10', 'YYYY-MM-DD')),
    (to_date('2021-01-11', 'YYYY-MM-DD')),
    (to_date('2021-01-12', 'YYYY-MM-DD')),
    (to_date('2021-01-13', 'YYYY-MM-DD')),
    (to_date('2021-01-14', 'YYYY-MM-DD')),
    (to_date('2021-01-15', 'YYYY-MM-DD')),
    (to_date('2021-01-16', 'YYYY-MM-DD')),
    (to_date('2021-01-17', 'YYYY-MM-DD')),
    (to_date('2021-01-18', 'YYYY-MM-DD')),
    (to_date('2021-01-19', 'YYYY-MM-DD')),
    (to_date('2021-01-20', 'YYYY-MM-DD')),
    (to_date('2021-01-21', 'YYYY-MM-DD')),
    (to_date('2021-01-22', 'YYYY-MM-DD')),
    (to_date('2021-01-23', 'YYYY-MM-DD')),
    (to_date('2021-01-24', 'YYYY-MM-DD')),
    (to_date('2021-01-25', 'YYYY-MM-DD')),
    (to_date('2021-01-26', 'YYYY-MM-DD')),
    (to_date('2021-01-27', 'YYYY-MM-DD')),
    (to_date('2021-01-28', 'YYYY-MM-DD')),
    (to_date('2021-01-29', 'YYYY-MM-DD')),
    (to_date('2021-01-30', 'YYYY-MM-DD'))
  ]
), (
  'FEBRUARY', 
  ARRAY [
    (to_date('2021-01-31', 'YYYY-MM-DD')),
    (to_date('2021-02-01', 'YYYY-MM-DD')),
    (to_date('2021-02-02', 'YYYY-MM-DD')),
    (to_date('2021-02-03', 'YYYY-MM-DD')),
    (to_date('2021-02-04', 'YYYY-MM-DD')),
    (to_date('2021-02-05', 'YYYY-MM-DD')),
    (to_date('2021-02-06', 'YYYY-MM-DD')),
    (to_date('2021-02-07', 'YYYY-MM-DD')),
    (to_date('2021-02-08', 'YYYY-MM-DD')),
    (to_date('2021-02-09', 'YYYY-MM-DD')),
    (to_date('2021-02-10', 'YYYY-MM-DD')),
    (to_date('2021-02-11', 'YYYY-MM-DD')),
    (to_date('2021-02-12', 'YYYY-MM-DD')),
    (to_date('2021-02-13', 'YYYY-MM-DD')),
    (to_date('2021-02-14', 'YYYY-MM-DD')),
    (to_date('2021-02-15', 'YYYY-MM-DD')),
    (to_date('2021-02-16', 'YYYY-MM-DD')),
    (to_date('2021-02-17', 'YYYY-MM-DD')),
    (to_date('2021-02-18', 'YYYY-MM-DD')),
    (to_date('2021-02-19', 'YYYY-MM-DD')),
    (to_date('2021-02-20', 'YYYY-MM-DD')),
    (to_date('2021-02-21', 'YYYY-MM-DD')),
    (to_date('2021-02-22', 'YYYY-MM-DD')),
    (to_date('2021-02-23', 'YYYY-MM-DD')),
    (to_date('2021-02-24', 'YYYY-MM-DD')),
    (to_date('2021-02-25', 'YYYY-MM-DD')),
    (to_date('2021-02-26', 'YYYY-MM-DD')),
    (to_date('2021-02-27', 'YYYY-MM-DD')),
    (to_date('2021-02-28', 'YYYY-MM-DD')),
    (to_date('2021-03-01', 'YYYY-MM-DD'))
  ]
);