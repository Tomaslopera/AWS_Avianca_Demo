-- ─────────────────────────────────────────
-- Buscar vuelos (reemplaza searchFlights())
-- Equivale a: searchFlights('BOG', 'MDE')
-- ─────────────────────────────────────────
SELECT
  f.id,
  f.flight_number,
  f.origin_iata,
  f.destination_iata,
  a_orig.city          AS origin_city,
  a_orig.name          AS origin_airport,
  a_dest.city          AS destination_city,
  a_dest.name          AS destination_airport,
  ac.model             AS aircraft,
  f.departure_time,
  f.arrival_time,
  f.duration_min,
  f.price_economy,
  f.price_business,
  f.seats_economy,
  f.seats_business,
  COUNT(fs.id)         AS stop_count
FROM flights f
JOIN airports a_orig ON a_orig.iata_code = f.origin_iata
JOIN airports a_dest ON a_dest.iata_code = f.destination_iata
JOIN aircraft ac     ON ac.id = f.aircraft_id
LEFT JOIN flight_stops fs ON fs.flight_id = f.id
WHERE f.origin_iata      = 'BOG'
  AND f.destination_iata = 'MDE'
  AND f.is_active        = TRUE
  AND f.seats_economy    > 0             -- con disponibilidad
GROUP BY f.id
ORDER BY f.price_economy ASC;


-- ─────────────────────────────────────────
-- Obtener escalas de un vuelo
-- Equivale a: flight.stops[]
-- ─────────────────────────────────────────
SELECT
  fs.stop_order,
  fs.airport_iata      AS code,
  a.city,
  a.name               AS airport,
  fs.arrival_time,
  fs.departure_time,
  fs.layover_min
FROM flight_stops fs
JOIN airports a ON a.iata_code = fs.airport_iata
WHERE fs.flight_id = 42
ORDER BY fs.stop_order;


-- ─────────────────────────────────────────
-- Recuperar una reserva completa por código
-- Equivale a leer avianca_reservations de localStorage
-- ─────────────────────────────────────────
SELECT
  b.booking_code,
  b.status,
  b.cabin,
  b.passengers_count,
  b.contact_email,
  b.total_cop,
  b.created_at,
  bl.leg_type,
  bl.flight_date,
  f.flight_number,
  f.origin_iata,
  f.destination_iata,
  ao.city              AS origin_city,
  ad.city              AS destination_city,
  f.departure_time,
  f.arrival_time,
  p.first_name,
  p.last_name,
  p.doc_type,
  p.doc_number,
  p.is_lead,
  ps.seat_code,
  ps.is_upgraded,
  pb.baggage_type,
  pb.price_cop         AS baggage_price
FROM bookings b
JOIN booking_legs   bl ON bl.booking_id  = b.id
JOIN flights        f  ON f.id           = bl.flight_id
JOIN airports       ao ON ao.iata_code   = f.origin_iata
JOIN airports       ad ON ad.iata_code   = f.destination_iata
JOIN passengers     p  ON p.booking_id   = b.id
LEFT JOIN passenger_seats   ps ON ps.passenger_id = p.id
                               AND ps.leg_id      = bl.id
LEFT JOIN passenger_baggage pb ON pb.passenger_id = p.id
WHERE b.booking_code = 'XK29TF'
ORDER BY bl.leg_type, p.is_lead DESC;


-- ─────────────────────────────────────────
-- Asientos ocupados para el mapa
-- Reemplaza generateOccupiedSeats() para sillas reales
-- ─────────────────────────────────────────
SELECT ps.seat_code
FROM passenger_seats ps
JOIN booking_legs bl ON bl.id       = ps.leg_id
JOIN bookings     b  ON b.id        = bl.booking_id
WHERE bl.flight_id   = 42
  AND bl.flight_date = '2025-08-15'
  AND b.status      != 'cancelled';


-- ─────────────────────────────────────────
-- Queries analíticos (para practicar con datos reales)
-- ─────────────────────────────────────────

-- Rutas más vendidas
SELECT
  f.origin_iata,
  f.destination_iata,
  ao.city              AS origin_city,
  ad.city              AS destination_city,
  COUNT(bl.id)         AS total_reservas,
  SUM(b.total_cop)     AS ingresos_cop
FROM booking_legs bl
JOIN flights   f  ON f.id         = bl.flight_id
JOIN bookings  b  ON b.id         = bl.booking_id
JOIN airports  ao ON ao.iata_code = f.origin_iata
JOIN airports  ad ON ad.iata_code = f.destination_iata
WHERE b.status = 'confirmed'
GROUP BY f.origin_iata, f.destination_iata
ORDER BY total_reservas DESC
LIMIT 10;

-- Ingresos por mes
SELECT
  DATE_FORMAT(bl.flight_date, '%Y-%m') AS mes,
  COUNT(DISTINCT b.id)                 AS reservas,
  SUM(b.total_cop)                     AS ingresos_cop
FROM bookings b
JOIN booking_legs bl ON bl.booking_id = b.id
WHERE b.status = 'confirmed'
  AND bl.leg_type = 'outbound'          -- contar una vez por reserva
GROUP BY mes
ORDER BY mes;

-- Ocupación por vuelo
SELECT
  f.flight_number,
  f.origin_iata,
  f.destination_iata,
  ac.total_seats,
  f.seats_economy      AS asientos_disponibles,
  ac.total_seats - f.seats_economy AS asientos_vendidos,
  ROUND(
    (ac.total_seats - f.seats_economy) * 100.0 / ac.total_seats, 1
  )                    AS ocupacion_pct
FROM flights f
JOIN aircraft ac ON ac.id = f.aircraft_id
WHERE f.is_active = TRUE
ORDER BY ocupacion_pct DESC;