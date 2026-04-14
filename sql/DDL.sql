USE avianca_flights;

-- ─────────────────────────────────────────
-- 1. AIRPORTS
-- ─────────────────────────────────────────
CREATE TABLE airports (
  iata_code     CHAR(3)      NOT NULL,
  name          VARCHAR(100) NOT NULL,
  city          VARCHAR(80)  NOT NULL,
  country       VARCHAR(80)  NOT NULL,
  country_code  CHAR(2)      NOT NULL,
  type          ENUM('national','international') NOT NULL,
  PRIMARY KEY (iata_code)
);

-- ─────────────────────────────────────────
-- 2. AIRCRAFT
-- ─────────────────────────────────────────
CREATE TABLE aircraft (
  id            SMALLINT    NOT NULL AUTO_INCREMENT,
  model         VARCHAR(50) NOT NULL,
  total_seats   SMALLINT    NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uq_aircraft_model (model)
);

-- ─────────────────────────────────────────
-- 3. FLIGHTS
-- Un vuelo = un horario recurrente diario
-- ─────────────────────────────────────────
CREATE TABLE flights (
  id              INT         NOT NULL AUTO_INCREMENT,
  flight_number   VARCHAR(10) NOT NULL,
  origin_iata     CHAR(3)     NOT NULL,
  destination_iata CHAR(3)   NOT NULL,
  aircraft_id     SMALLINT    NOT NULL,
  departure_time  TIME        NOT NULL,
  arrival_time    TIME        NOT NULL,
  duration_min    SMALLINT    NOT NULL,
  price_economy   INT         NOT NULL,
  price_business  INT         NOT NULL,     -- 0 si no aplica (ATR 72, etc.)
  seats_economy   SMALLINT    NOT NULL,
  seats_business  SMALLINT    NOT NULL,
  is_active       BOOLEAN     NOT NULL DEFAULT TRUE,
  PRIMARY KEY (id),
  UNIQUE KEY uq_flight_number (flight_number),
  FOREIGN KEY (origin_iata)      REFERENCES airports(iata_code),
  FOREIGN KEY (destination_iata) REFERENCES airports(iata_code),
  FOREIGN KEY (aircraft_id)      REFERENCES aircraft(id)
);

-- ─────────────────────────────────────────
-- 4. FLIGHT_STOPS
-- Vuelos directos = 0 filas aquí
-- ─────────────────────────────────────────
CREATE TABLE flight_stops (
  id             INT     NOT NULL AUTO_INCREMENT,
  flight_id      INT     NOT NULL,
  stop_order     TINYINT NOT NULL,
  airport_iata   CHAR(3) NOT NULL,
  arrival_time   TIME    NOT NULL,
  departure_time TIME    NOT NULL,
  layover_min    SMALLINT NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uq_stop (flight_id, stop_order),
  FOREIGN KEY (flight_id)    REFERENCES flights(id) ON DELETE CASCADE,
  FOREIGN KEY (airport_iata) REFERENCES airports(iata_code)
);

-- ─────────────────────────────────────────
-- 5. BOOKINGS
-- Una reserva por transacción de checkout.
-- Puede tener 1 vuelo (oneway) o 2 (roundtrip).
-- ─────────────────────────────────────────
CREATE TABLE bookings (
  id              INT          NOT NULL AUTO_INCREMENT,
  booking_code    CHAR(6)      NOT NULL,           -- "XK29TF" el que genera el JS
  status          ENUM('confirmed','cancelled','pending') NOT NULL DEFAULT 'confirmed',
  cabin           ENUM('economica','ejecutiva')    NOT NULL,
  passengers_count TINYINT     NOT NULL,
  contact_email   VARCHAR(120) NOT NULL,
  contact_phone   VARCHAR(30)  NOT NULL,
  total_cop       INT          NOT NULL,
  created_at      DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_booking_code (booking_code)
);

-- ─────────────────────────────────────────
-- 6. BOOKING_LEGS
-- Cada tramo del viaje (ida y opcionalmente vuelta).
-- Aquí vive la fecha que elige el usuario.
-- ─────────────────────────────────────────
CREATE TABLE booking_legs (
  id          INT  NOT NULL AUTO_INCREMENT,
  booking_id  INT  NOT NULL,
  flight_id   INT  NOT NULL,
  leg_type    ENUM('outbound','return') NOT NULL,
  flight_date DATE NOT NULL,              -- la fecha que eligió el usuario
  PRIMARY KEY (id),
  UNIQUE KEY uq_leg (booking_id, leg_type),
  FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE,
  FOREIGN KEY (flight_id)  REFERENCES flights(id)
);

-- ─────────────────────────────────────────
-- 7. PASSENGERS
-- Un pasajero por fila. El principal lleva email/phone.
-- ─────────────────────────────────────────
CREATE TABLE passengers (
  id           INT         NOT NULL AUTO_INCREMENT,
  booking_id   INT         NOT NULL,
  first_name   VARCHAR(80) NOT NULL,
  last_name    VARCHAR(80) NOT NULL,
  doc_type     ENUM('CC','CE','PA','TI') NOT NULL,
  doc_number   VARCHAR(30) NOT NULL,
  birth_date   DATE,
  nationality  CHAR(2),
  is_lead      BOOLEAN     NOT NULL DEFAULT FALSE,   -- pasajero principal
  PRIMARY KEY (id),
  FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE
);

-- ─────────────────────────────────────────
-- 8. PASSENGER_SEATS
-- Asiento por pasajero por tramo.
-- ─────────────────────────────────────────
CREATE TABLE passenger_seats (
  id           INT         NOT NULL AUTO_INCREMENT,
  passenger_id INT         NOT NULL,
  leg_id       INT         NOT NULL,
  seat_code    VARCHAR(4)  NOT NULL,    -- "14C", "3A"
  is_upgraded  BOOLEAN     NOT NULL DEFAULT FALSE,
  PRIMARY KEY (id),
  UNIQUE KEY uq_seat_per_leg (leg_id, seat_code),   -- no dos personas en el mismo asiento
  FOREIGN KEY (passenger_id) REFERENCES passengers(id) ON DELETE CASCADE,
  FOREIGN KEY (leg_id)       REFERENCES booking_legs(id) ON DELETE CASCADE
);

-- ─────────────────────────────────────────
-- 9. PASSENGER_BAGGAGE
-- Equipaje por pasajero. Sin tramo porque
-- el baggage en el checkout aplica a toda la reserva.
-- ─────────────────────────────────────────
CREATE TABLE passenger_baggage (
  id           INT     NOT NULL AUTO_INCREMENT,
  passenger_id INT     NOT NULL,
  baggage_type ENUM('hand','bag23','bag32') NOT NULL,
  price_cop    INT     NOT NULL DEFAULT 0,
  PRIMARY KEY (id),
  FOREIGN KEY (passenger_id) REFERENCES passengers(id) ON DELETE CASCADE
);