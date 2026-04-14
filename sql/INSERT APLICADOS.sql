-- ─────────────────────────────────────────
-- PASO 1: Insertar la reserva principal
-- Fuente: checkout.js → saveReservation(code, total)
-- ─────────────────────────────────────────
INSERT INTO bookings (
  booking_code,
  cabin,
  passengers_count,
  contact_email,
  contact_phone,
  total_cop
) VALUES (
  'XK29TF',                              -- generateBookingCode()
  'economica',                           -- checkout.cabin
  2,                                     -- checkout.passengers
  'juan@email.com',                      -- passengerData[0].email
  '+57 300 000 0000',                    -- passengerData[0].phone
  758000                                 -- total (basePrice + baggage + upgrades)
);

-- ─────────────────────────────────────────
-- PASO 2: Insertar los tramos del viaje
-- Fuente: checkout.params.dateStart / dateEnd
--         checkout.flight.id / checkout.returnFlight.id
-- ─────────────────────────────────────────

-- Tramo ida (siempre)
INSERT INTO booking_legs (
  booking_id,
  flight_id,
  leg_type,
  flight_date
) VALUES (
  LAST_INSERT_ID(),                      -- id del booking recién creado
  (SELECT id FROM flights WHERE flight_number = 'AV 9001'),
  'outbound',
  '2025-08-15'                           -- checkout.params.dateStart
);

-- Tramo vuelta (solo si checkout.isRound)
INSERT INTO booking_legs (
  booking_id,
  flight_id,
  leg_type,
  flight_date
) VALUES (
  (SELECT id FROM bookings WHERE booking_code = 'XK29TF'),
  (SELECT id FROM flights WHERE flight_number = 'AV 9002'),
  'return',
  '2025-08-20'                           -- checkout.params.dateEnd
);

-- ─────────────────────────────────────────
-- PASO 3: Insertar pasajeros
-- Fuente: checkout.passengerData[]
-- ─────────────────────────────────────────
INSERT INTO passengers (
  booking_id,
  first_name,
  last_name,
  doc_type,
  doc_number,
  birth_date,
  nationality,
  is_lead
) VALUES
-- Pasajero principal (i === 0)
(
  (SELECT id FROM bookings WHERE booking_code = 'XK29TF'),
  'Juan',
  'García',
  'CC',
  '1234567890',
  '1990-05-15',
  'CO',
  TRUE
),
-- Pasajero adicional (i > 0)
(
  (SELECT id FROM bookings WHERE booking_code = 'XK29TF'),
  'María',
  'López',
  'CC',
  '9876543210',
  '1992-11-20',
  'CO',
  FALSE
);

-- ─────────────────────────────────────────
-- PASO 4: Insertar asientos
-- Fuente: checkout.selectedSeats[] y checkout.selectedReturnSeats[]
-- Un INSERT por cada pasajero × cada tramo
-- ─────────────────────────────────────────
INSERT INTO passenger_seats (
  passenger_id,
  leg_id,
  seat_code,
  is_upgraded
) VALUES
-- Pasajero 1 - ida
(
  (SELECT id FROM passengers
   WHERE booking_id = (SELECT id FROM bookings WHERE booking_code = 'XK29TF')
   AND is_lead = TRUE),
  (SELECT id FROM booking_legs
   WHERE booking_id = (SELECT id FROM bookings WHERE booking_code = 'XK29TF')
   AND leg_type = 'outbound'),
  '14C',                                 -- checkout.selectedSeats[0]
  FALSE
),
-- Pasajero 2 - ida
(
  (SELECT id FROM passengers
   WHERE booking_id = (SELECT id FROM bookings WHERE booking_code = 'XK29TF')
   AND is_lead = FALSE
   LIMIT 1),
  (SELECT id FROM booking_legs
   WHERE booking_id = (SELECT id FROM bookings WHERE booking_code = 'XK29TF')
   AND leg_type = 'outbound'),
  '14D',                                 -- checkout.selectedSeats[1]
  FALSE
),
-- Pasajero 1 - vuelta (si isRound)
(
  (SELECT id FROM passengers
   WHERE booking_id = (SELECT id FROM bookings WHERE booking_code = 'XK29TF')
   AND is_lead = TRUE),
  (SELECT id FROM booking_legs
   WHERE booking_id = (SELECT id FROM bookings WHERE booking_code = 'XK29TF')
   AND leg_type = 'return'),
  '8A',                                  -- checkout.selectedReturnSeats[0]
  FALSE
);

-- ─────────────────────────────────────────
-- PASO 5: Insertar equipaje
-- Fuente: checkout.baggage[]
-- ─────────────────────────────────────────
INSERT INTO passenger_baggage (
  passenger_id,
  baggage_type,
  price_cop
) VALUES
-- Pasajero 1
(
  (SELECT id FROM passengers
   WHERE booking_id = (SELECT id FROM bookings WHERE booking_code = 'XK29TF')
   AND is_lead = TRUE),
  'bag23',                               -- checkout.baggage[0]
  89000                                  -- BAGGAGE_PRICES[checkout.baggage[0]]
),
-- Pasajero 2
(
  (SELECT id FROM passengers
   WHERE booking_id = (SELECT id FROM bookings WHERE booking_code = 'XK29TF')
   AND is_lead = FALSE
   LIMIT 1),
  'hand',                                -- checkout.baggage[1]
  0
);

-- ─────────────────────────────────────────
-- PASO 6: Decrementar disponibilidad
-- Fuente: checkout.cabin + checkout.passengers
-- ─────────────────────────────────────────
UPDATE flights
SET seats_economy = seats_economy - 2    -- checkout.passengers
WHERE flight_number = 'AV 9001';

-- Si es ida y vuelta, también el vuelo de vuelta
UPDATE flights
SET seats_economy = seats_economy - 2
WHERE flight_number = 'AV 9002';