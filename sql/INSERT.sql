-- =============================================================
-- SEED COMPLETO: avianca_flights
-- Tablas: airports, aircraft, flights, flight_stops
-- Generado desde flights_data.js + destinations.js
-- =============================================================

USE avianca_flights;

-- ─────────────────────────────────────────
-- 1. AIRPORTS
-- ─────────────────────────────────────────
INSERT INTO airports (iata_code, name, city, country, country_code, type) VALUES
-- Colombia
('AUC', 'Santiago Pérez Quiroz', 'Arauca', 'Colombia', 'CO', 'national'),
('AXM', 'El Edén',                         'Armenia',             'Colombia', 'CO', 'national'),
('EJA', 'Yariguíes',                       'Barrancabermeja',     'Colombia', 'CO', 'national'),
('BAQ', 'Ernesto Cortissoz',               'Barranquilla',        'Colombia', 'CO', 'national'),
('BOG', 'El Dorado Internacional',         'Bogotá',              'Colombia', 'CO', 'national'),
('BGA', 'Palonegro',                       'Bucaramanga',         'Colombia', 'CO', 'national'),
('CLO', 'Alfonso Bonilla Aragón',          'Cali',                'Colombia', 'CO', 'national'),
('CTG', 'Rafael Núñez Internacional',      'Cartagena',           'Colombia', 'CO', 'national'),
('CUC', 'Camilo Daza',                     'Cúcuta',              'Colombia', 'CO', 'national'),
('IBE', 'Perales',                         'Ibagué',              'Colombia', 'CO', 'national'),
('IPI', 'San Luis',                        'Ipiales',             'Colombia', 'CO', 'national'),
('LET', 'Alfredo Vásquez Cobo',            'Leticia',             'Colombia', 'CO', 'national'),
('MDE', 'José María Córdova',              'Medellín',            'Colombia', 'CO', 'national'),
('MTR', 'Los Garzones',                    'Montería',            'Colombia', 'CO', 'national'),
('NVA', 'Benito Salas',                    'Neiva',               'Colombia', 'CO', 'national'),
('PSO', 'Antonio Nariño',                  'Pasto',               'Colombia', 'CO', 'national'),
('PEI', 'Matecaña',                        'Pereira',             'Colombia', 'CO', 'national'),
('PPN', 'Guillermo León Valencia',         'Popayán',             'Colombia', 'CO', 'national'),
('UIB', 'El Caraño',                       'Quibdó',              'Colombia', 'CO', 'national'),
('RCH', 'Almirante Padilla',               'Riohacha',            'Colombia', 'CO', 'national'),
('ADZ', 'Gustavo Rojas Pinilla',           'San Andrés',          'Colombia', 'CO', 'national'),
('SMR', 'Simón Bolívar',                   'Santa Marta',         'Colombia', 'CO', 'national'),
('VUP', 'Alfonso López Pumarejo',          'Valledupar',          'Colombia', 'CO', 'national'),
('VVC', 'La Vanguardia',                   'Villavicencio',       'Colombia', 'CO', 'national'),
('EYP', 'El Alcaraván',                    'Yopal',               'Colombia', 'CO', 'national'),
-- Suramérica
('AEP', 'Aeroparque Jorge Newbery',        'Buenos Aires',        'Argentina',    'AR', 'international'),
('EZE', 'Ezeiza Internacional',            'Buenos Aires',        'Argentina',    'AR', 'international'),
('COR', 'Ambrosio Taravella',              'Córdoba',             'Argentina',    'AR', 'international'),
('LPB', 'El Alto Internacional',           'La Paz',              'Bolivia',      'BO', 'international'),
('VVI', 'Viru Viru',                       'Santa Cruz',          'Bolivia',      'BO', 'international'),
('BEL', 'Val de Cans',                     'Belém',               'Brasil',       'BR', 'international'),
('BSB', 'Presidente Juscelino Kubitschek', 'Brasilia',            'Brasil',       'BR', 'international'),
('MAO', 'Eduardo Gomes',                   'Manaos',              'Brasil',       'BR', 'international'),
('GIG', 'Galeão Internacional',            'Río de Janeiro',      'Brasil',       'BR', 'international'),
('GRU', 'Guarulhos Internacional',         'São Paulo',           'Brasil',       'BR', 'international'),
('SCL', 'Arturo Merino Benítez',           'Santiago',            'Chile',        'CL', 'international'),
('CUE', 'Mariscal Lamar',                  'Cuenca',              'Ecuador',      'EC', 'international'),
('GYE', 'José Joaquín de Olmedo',          'Guayaquil',           'Ecuador',      'EC', 'international'),
('GPS', 'Seymour',                         'Isla Baltra',         'Ecuador',      'EC', 'international'),
('MEC', 'Eloy Alfaro',                     'Manta',               'Ecuador',      'EC', 'international'),
('UIO', 'Mariscal Sucre',                  'Quito',               'Ecuador',      'EC', 'international'),
('SCY', 'San Cristóbal',                   'San Cristóbal',       'Ecuador',      'EC', 'international'),
('GEO', 'Cheddi Jagan',                    'Georgetown',          'Guyana',       'GY', 'international'),
('ASU', 'Silvio Pettirossi',               'Asunción',            'Paraguay',     'PY', 'international'),
('CUZ', 'Alejandro Velasco Astete',        'Cusco',               'Perú',         'PE', 'international'),
('LIM', 'Jorge Chávez Internacional',      'Lima',                'Perú',         'PE', 'international'),
('MVD', 'Carrasco Internacional',          'Montevideo',          'Uruguay',      'UY', 'international'),
('CCS', 'Simón Bolívar Internacional',     'Caracas',             'Venezuela',    'VE', 'international'),
-- Norteamérica
('YUL', 'Montréal-Trudeau',                'Montreal',            'Canadá',       'CA', 'international'),
('YYZ', 'Toronto Pearson',                 'Toronto',             'Canadá',       'CA', 'international'),
('CUN', 'Cancún Internacional',            'Cancún',              'México',       'MX', 'international'),
('MEX', 'Benito Juárez Internacional',     'Ciudad de México',    'México',       'MX', 'international'),
('MTY', 'Mariano Escobedo',                'Monterrey',           'México',       'MX', 'international'),
('TQO', 'Tulum',                           'Tulum',               'México',       'MX', 'international'),
('BOS', 'Logan Internacional',             'Boston',              'Estados Unidos','US', 'international'),
('ORD', "O'Hare Internacional",            'Chicago',             'Estados Unidos','US', 'international'),
('DFW', 'Dallas Fort Worth',               'Dallas',              'Estados Unidos','US', 'international'),
('FLL', 'Fort Lauderdale-Hollywood',       'Fort Lauderdale',     'Estados Unidos','US', 'international'),
('IAH', 'George Bush Intercontinental',    'Houston',             'Estados Unidos','US', 'international'),
('LAS', 'Harry Reid Internacional',        'Las Vegas',           'Estados Unidos','US', 'international'),
('LAX', 'Los Ángeles Internacional',       'Los Ángeles',         'Estados Unidos','US', 'international'),
('MIA', 'Miami Internacional',             'Miami',               'Estados Unidos','US', 'international'),
('JFK', 'John F. Kennedy Internacional',   'Nueva York',          'Estados Unidos','US', 'international'),
('ONT', 'Ontario Internacional',           'Ontario',             'Estados Unidos','US', 'international'),
('MCO', 'Orlando Internacional',           'Orlando',             'Estados Unidos','US', 'international'),
('SFO', 'San Francisco Internacional',     'San Francisco',       'Estados Unidos','US', 'international'),
('TPA', 'Tampa Internacional',             'Tampa',               'Estados Unidos','US', 'international'),
('IAD', 'Washington Dulles',               'Washington D.C.',     'Estados Unidos','US', 'international'),
-- Centroamérica y Caribe
('AUA', 'Reina Beatrix',                   'Oranjestad',          'Aruba',             'AW', 'international'),
('SJO', 'Juan Santamaría Internacional',   'San José',            'Costa Rica',        'CR', 'international'),
('CUR', 'Hato',                            'Willemstad',          'Curazao',           'CW', 'international'),
('SAL', 'Monseñor Óscar Arnulfo Romero',   'San Salvador',        'El Salvador',       'SV', 'international'),
('FRS', 'Mundo Maya',                      'Flores',              'Guatemala',         'GT', 'international'),
('GUA', 'La Aurora',                       'Ciudad de Guatemala', 'Guatemala',         'GT', 'international'),
('XPL', 'Palmerola',                       'Comayagua',           'Honduras',          'HN', 'international'),
('SAP', 'Ramón Villeda Morales',           'San Pedro Sula',      'Honduras',          'HN', 'international'),
('MGA', 'Augusto Cesar Sandino',           'Managua',             'Nicaragua',         'NI', 'international'),
('PTY', 'Tocumen Internacional',           'Ciudad de Panamá',    'Panamá',            'PA', 'international'),
('SJU', 'Luis Muñoz Marín',               'San Juan',            'Puerto Rico',       'PR', 'international'),
('PUJ', 'Punta Cana Internacional',        'Punta Cana',          'Rep. Dominicana',   'DO', 'international'),
('SDQ', 'Las Américas',                    'Santo Domingo',       'Rep. Dominicana',   'DO', 'international'),
-- Europa
('BCN', 'El Prat',                         'Barcelona',           'España',        'ES', 'international'),
('MAD', 'Adolfo Suárez Madrid-Barajas',    'Madrid',              'España',        'ES', 'international'),
('CDG', 'Charles de Gaulle',               'París',               'Francia',       'FR', 'international'),
('LHR', 'Heathrow',                        'Londres',             'Reino Unido',   'GB', 'international')

-- ─────────────────────────────────────────
-- 2. AIRCRAFT
-- ─────────────────────────────────────────
INSERT INTO aircraft (model, total_seats) VALUES
('Airbus A319',     138),
('Airbus A320',     168),
('Airbus A320 NEO', 165),
('Airbus A321',     194),
('Airbus A330',     277),
('Boeing 787-8',    242),
('Boeing 787-9',    296),
('ATR 72',           70);


-- ─────────────────────────────────────────
-- 3. FLIGHTS
-- Directos + con escala (todos en una sola tabla)
-- ─────────────────────────────────────────
INSERT INTO flights
  (flight_number, origin_iata, destination_iata, aircraft_id, departure_time, arrival_time, duration_min, price_economy, price_business, seats_economy, seats_business)
VALUES
-- ── BOG ↔ MDE ──────────────────────────────────────────────────────────────
('AV 9001', 'BOG', 'MDE', (SELECT id FROM aircraft WHERE model='Airbus A320'),     '06:00', '07:05',  65,  189000,  420000, 12,  4),
('AV 9003', 'BOG', 'MDE', (SELECT id FROM aircraft WHERE model='Airbus A320 NEO'), '09:15', '10:20',  65,  215000,  460000, 40,  8),
('AV 9005', 'BOG', 'MDE', (SELECT id FROM aircraft WHERE model='Airbus A319'),     '12:30', '13:35',  65,  210000,  450000, 28,  6),
('AV 9007', 'BOG', 'MDE', (SELECT id FROM aircraft WHERE model='Airbus A320'),     '15:45', '16:50',  65,  195000,  410000, 18,  5),
('AV 9009', 'BOG', 'MDE', (SELECT id FROM aircraft WHERE model='Airbus A320'),     '19:15', '20:20',  65,  175000,  390000,  5,  2),
('AV 9011', 'BOG', 'MDE', (SELECT id FROM aircraft WHERE model='Airbus A320 NEO'), '22:00', '23:05',  65,  145000,  350000, 50, 12),
('AV 9002', 'MDE', 'BOG', (SELECT id FROM aircraft WHERE model='Airbus A320 NEO'), '06:30', '07:35',  65,  220000,  470000,  8,  2),
('AV 9004', 'MDE', 'BOG', (SELECT id FROM aircraft WHERE model='Airbus A320'),     '08:00', '09:05',  65,  185000,  415000, 18,  5),
('AV 9006', 'MDE', 'BOG', (SELECT id FROM aircraft WHERE model='Airbus A319'),     '11:15', '12:20',  65,  170000,  380000, 25,  7),
('AV 9008', 'MDE', 'BOG', (SELECT id FROM aircraft WHERE model='Airbus A320'),     '14:45', '15:50',  65,  190000,  425000, 35,  9),
('AV 9010', 'MDE', 'BOG', (SELECT id FROM aircraft WHERE model='Airbus A319'),     '17:00', '18:05',  65,  195000,  430000, 32,  8),
('AV 9012', 'MDE', 'BOG', (SELECT id FROM aircraft WHERE model='Airbus A320'),     '20:30', '21:35',  65,  165000,  395000, 15,  3),
-- ── BOG ↔ CTG ──────────────────────────────────────────────────────────────
('AV 9101', 'BOG', 'CTG', (SELECT id FROM aircraft WHERE model='Airbus A320'),     '06:15', '07:45',  90,  215000,  480000, 15,  4),
('AV 9103', 'BOG', 'CTG', (SELECT id FROM aircraft WHERE model='Airbus A320 NEO'), '09:30', '11:00',  90,  245000,  520000, 32,  8),
('AV 9105', 'BOG', 'CTG', (SELECT id FROM aircraft WHERE model='Airbus A320'),     '13:00', '14:30',  90,  195000,  440000, 20,  5),
('AV 9107', 'BOG', 'CTG', (SELECT id FROM aircraft WHERE model='Airbus A319'),     '16:45', '18:15',  90,  230000,  495000,  8,  2),
('AV 9109', 'BOG', 'CTG', (SELECT id FROM aircraft WHERE model='Airbus A320 NEO'), '19:30', '21:00',  90,  210000,  460000, 45, 10),
('AV 9111', 'BOG', 'CTG', (SELECT id FROM aircraft WHERE model='Airbus A320'),     '22:15', '23:45',  90,  165000,  390000, 55, 12),
('AV 9102', 'CTG', 'BOG', (SELECT id FROM aircraft WHERE model='Airbus A320'),     '08:30', '10:00',  90,  210000,  470000, 12,  3),
('AV 9104', 'CTG', 'BOG', (SELECT id FROM aircraft WHERE model='Airbus A320 NEO'), '11:45', '13:15',  90,  190000,  430000, 28,  6),
('AV 9106', 'CTG', 'BOG', (SELECT id FROM aircraft WHERE model='Airbus A320'),     '15:15', '16:45',  90,  220000,  485000, 18,  4),
('AV 9108', 'CTG', 'BOG', (SELECT id FROM aircraft WHERE model='Airbus A319'),     '18:50', '20:20',  90,  250000,  540000,  5,  1),
('AV 9110', 'CTG', 'BOG', (SELECT id FROM aircraft WHERE model='Airbus A320 NEO'), '21:40', '23:10',  90,  175000,  410000, 38,  9),
('AV 9112', 'CTG', 'BOG', (SELECT id FROM aircraft WHERE model='Airbus A320'),     '23:55', '01:25',  90,  140000,  360000, 60, 12),
-- ── MDE ↔ CTG ──────────────────────────────────────────────────────────────
('AV 9201', 'MDE', 'CTG', (SELECT id FROM aircraft WHERE model='Airbus A320'),     '07:00', '08:10',  70,  178000,  395000, 10,  2),
('AV 9203', 'MDE', 'CTG', (SELECT id FROM aircraft WHERE model='Airbus A319'),     '10:20', '11:30',  70,  195000,  420000, 22,  5),
('AV 9205', 'MDE', 'CTG', (SELECT id FROM aircraft WHERE model='Airbus A320 NEO'), '13:50', '15:00',  70,  165000,  380000, 40,  8),
('AV 9207', 'MDE', 'CTG', (SELECT id FROM aircraft WHERE model='Airbus A320'),     '17:10', '18:20',  70,  210000,  460000,  5,  1),
('AV 9209', 'MDE', 'CTG', (SELECT id FROM aircraft WHERE model='Airbus A320 NEO'), '20:25', '21:35',  70,  185000,  410000, 25,  6),
('AV 9211', 'MDE', 'CTG', (SELECT id FROM aircraft WHERE model='Airbus A319'),     '23:00', '00:10',  70,  150000,  340000, 48, 10),
('AV 9202', 'CTG', 'MDE', (SELECT id FROM aircraft WHERE model='Airbus A320'),     '08:50', '10:00',  70,  182000,  405000, 14,  4),
('AV 9204', 'CTG', 'MDE', (SELECT id FROM aircraft WHERE model='Airbus A319'),     '12:10', '13:20',  70,  168000,  375000, 30,  7),
('AV 9206', 'CTG', 'MDE', (SELECT id FROM aircraft WHERE model='Airbus A320 NEO'), '15:40', '16:50',  70,  198000,  435000, 20,  5),
('AV 9208', 'CTG', 'MDE', (SELECT id FROM aircraft WHERE model='Airbus A320'),     '19:00', '20:10',  70,  225000,  510000, 10,  2),
('AV 9210', 'CTG', 'MDE', (SELECT id FROM aircraft WHERE model='Airbus A320 NEO'), '22:15', '23:25',  70,  172000,  385000, 35,  8),
('AV 9212', 'CTG', 'MDE', (SELECT id FROM aircraft WHERE model='Airbus A319'),     '00:45', '01:55',  70,  135000,  320000, 62, 12),
-- ── BOG ↔ CLO ──────────────────────────────────────────────────────────────
('AV 9301', 'BOG', 'CLO', (SELECT id FROM aircraft WHERE model='Airbus A320'),     '06:45', '07:47',  62,  155000,  360000, 18,  5),
('AV 9303', 'BOG', 'CLO', (SELECT id FROM aircraft WHERE model='Airbus A320 NEO'), '09:50', '10:52',  62,  178000,  395000, 30,  8),
('AV 9305', 'BOG', 'CLO', (SELECT id FROM aircraft WHERE model='Airbus A319'),     '12:55', '13:57',  62,  162000,  375000, 25,  6),
('AV 9307', 'BOG', 'CLO', (SELECT id FROM aircraft WHERE model='Airbus A320'),     '15:30', '16:32',  62,  185000,  410000, 12,  3),
('AV 9309', 'BOG', 'CLO', (SELECT id FROM aircraft WHERE model='Airbus A320 NEO'), '18:40', '19:42',  62,  210000,  440000,  8,  1),
('AV 9311', 'BOG', 'CLO', (SELECT id FROM aircraft WHERE model='Airbus A320'),     '21:15', '22:17',  62,  140000,  320000, 52, 10),
('AV 9302', 'CLO', 'BOG', (SELECT id FROM aircraft WHERE model='Airbus A320'),     '08:30', '09:32',  62,  165000,  380000, 14,  4),
('AV 9304', 'CLO', 'BOG', (SELECT id FROM aircraft WHERE model='Airbus A320 NEO'), '11:35', '12:37',  62,  158000,  350000, 32,  7),
('AV 9306', 'CLO', 'BOG', (SELECT id FROM aircraft WHERE model='Airbus A319'),     '14:40', '15:42',  62,  172000,  390000, 20,  5),
('AV 9308', 'CLO', 'BOG', (SELECT id FROM aircraft WHERE model='Airbus A320'),     '17:15', '18:17',  62,  195000,  425000, 10,  2),
('AV 9310', 'CLO', 'BOG', (SELECT id FROM aircraft WHERE model='Airbus A320 NEO'), '20:25', '21:27',  62,  180000,  400000, 25,  6),
('AV 9312', 'CLO', 'BOG', (SELECT id FROM aircraft WHERE model='Airbus A320'),     '23:00', '00:02',  62,  130000,  310000, 65, 12),
-- ── MDE ↔ CLO ──────────────────────────────────────────────────────────────
('AV 9401', 'MDE', 'CLO', (SELECT id FROM aircraft WHERE model='Airbus A319'),     '07:10', '08:15',  65,  142000,  310000, 10,  2),
('AV 9403', 'MDE', 'CLO', (SELECT id FROM aircraft WHERE model='Airbus A320'),     '10:15', '11:20',  65,  155000,  335000, 28,  6),
('AV 9405', 'MDE', 'CLO', (SELECT id FROM aircraft WHERE model='Airbus A320 NEO'), '13:20', '14:25',  65,  138000,  295000, 42,  9),
('AV 9407', 'MDE', 'CLO', (SELECT id FROM aircraft WHERE model='Airbus A320'),     '16:35', '17:40',  65,  165000,  360000, 15,  3),
('AV 9409', 'MDE', 'CLO', (SELECT id FROM aircraft WHERE model='Airbus A320 NEO'), '19:50', '20:55',  65,  172000,  380000, 20,  4),
('AV 9411', 'MDE', 'CLO', (SELECT id FROM aircraft WHERE model='Airbus A319'),     '22:45', '23:50',  65,  125000,  280000, 55, 12),
('AV 9402', 'CLO', 'MDE', (SELECT id FROM aircraft WHERE model='Airbus A319'),     '09:00', '10:05',  65,  145000,  315000, 12,  3),
('AV 9404', 'CLO', 'MDE', (SELECT id FROM aircraft WHERE model='Airbus A320'),     '12:05', '13:10',  65,  135000,  290000, 35,  8),
('AV 9406', 'CLO', 'MDE', (SELECT id FROM aircraft WHERE model='Airbus A320 NEO'), '15:10', '16:15',  65,  152000,  340000, 18,  5),
('AV 9408', 'CLO', 'MDE', (SELECT id FROM aircraft WHERE model='Airbus A320'),     '18:25', '19:30',  65,  168000,  375000,  9,  2),
('AV 9410', 'CLO', 'MDE', (SELECT id FROM aircraft WHERE model='Airbus A320 NEO'), '21:40', '22:45',  65,  150000,  330000, 30,  6),
('AV 9412', 'CLO', 'MDE', (SELECT id FROM aircraft WHERE model='Airbus A319'),     '00:30', '01:35',  65,  115000,  260000, 60, 12),
-- ── BOG ↔ SMR ──────────────────────────────────────────────────────────────
('AV 9501', 'BOG', 'SMR', (SELECT id FROM aircraft WHERE model='Airbus A320'),     '07:00', '08:35',  95,  195000,  430000, 10,  2),
('AV 9503', 'BOG', 'SMR', (SELECT id FROM aircraft WHERE model='Airbus A320 NEO'), '13:30', '15:05',  95,  210000,  450000, 30,  6),
('AV 9505', 'BOG', 'SMR', (SELECT id FROM aircraft WHERE model='Airbus A320'),     '19:00', '20:35',  95,  180000,  410000, 15,  4),
('AV 9502', 'SMR', 'BOG', (SELECT id FROM aircraft WHERE model='Airbus A320'),     '09:20', '10:55',  95,  185000,  420000, 25,  5),
('AV 9504', 'SMR', 'BOG', (SELECT id FROM aircraft WHERE model='Airbus A320 NEO'), '15:50', '17:25',  95,  220000,  460000, 12,  3),
('AV 9506', 'SMR', 'BOG', (SELECT id FROM aircraft WHERE model='Airbus A320'),     '21:20', '22:55',  95,  160000,  390000, 40,  8),
-- ── MDE ↔ SMR ──────────────────────────────────────────────────────────────
('AV 9511', 'MDE', 'SMR', (SELECT id FROM aircraft WHERE model='Airbus A320'),     '08:00', '09:15',  75,  175000,  380000, 15,  4),
('AV 9513', 'MDE', 'SMR', (SELECT id FROM aircraft WHERE model='Airbus A319'),     '14:15', '15:30',  75,  190000,  410000, 10,  2),
('AV 9515', 'MDE', 'SMR', (SELECT id FROM aircraft WHERE model='Airbus A320 NEO'), '20:00', '21:15',  75,  165000,  360000, 35,  8),
('AV 9512', 'SMR', 'MDE', (SELECT id FROM aircraft WHERE model='Airbus A320'),     '10:00', '11:15',  75,  180000,  390000, 20,  5),
('AV 9514', 'SMR', 'MDE', (SELECT id FROM aircraft WHERE model='Airbus A319'),     '16:15', '17:30',  75,  205000,  430000, 12,  3),
('AV 9516', 'SMR', 'MDE', (SELECT id FROM aircraft WHERE model='Airbus A320 NEO'), '22:00', '23:15',  75,  155000,  340000, 45, 10),
-- ── BOG ↔ BAQ ──────────────────────────────────────────────────────────────
('AV 9521', 'BOG', 'BAQ', (SELECT id FROM aircraft WHERE model='Airbus A320'),     '06:30', '08:05',  95,  170000,  400000,  8,  3),
('AV 9523', 'BOG', 'BAQ', (SELECT id FROM aircraft WHERE model='Airbus A321'),     '12:00', '13:35',  95,  185000,  420000, 25,  6),
('AV 9525', 'BOG', 'BAQ', (SELECT id FROM aircraft WHERE model='Airbus A320 NEO'), '18:30', '20:05',  95,  200000,  440000, 30,  7),
('AV 9522', 'BAQ', 'BOG', (SELECT id FROM aircraft WHERE model='Airbus A320'),     '08:50', '10:25',  95,  175000,  410000, 14,  4),
('AV 9524', 'BAQ', 'BOG', (SELECT id FROM aircraft WHERE model='Airbus A321'),     '14:20', '15:55',  95,  190000,  430000, 18,  5),
('AV 9526', 'BAQ', 'BOG', (SELECT id FROM aircraft WHERE model='Airbus A320 NEO'), '20:50', '22:25',  95,  165000,  380000, 45, 10),
-- ── MDE ↔ BAQ ──────────────────────────────────────────────────────────────
('AV 9531', 'MDE', 'BAQ', (SELECT id FROM aircraft WHERE model='Airbus A319'),     '07:30', '08:45',  75,  160000,  360000, 12,  3),
('AV 9533', 'MDE', 'BAQ', (SELECT id FROM aircraft WHERE model='Airbus A320'),     '13:00', '14:15',  75,  175000,  390000, 28,  6),
('AV 9535', 'MDE', 'BAQ', (SELECT id FROM aircraft WHERE model='Airbus A320 NEO'), '19:45', '21:00',  75,  155000,  340000, 40,  9),
('AV 9532', 'BAQ', 'MDE', (SELECT id FROM aircraft WHERE model='Airbus A319'),     '09:30', '10:45',  75,  165000,  370000, 20,  4),
('AV 9534', 'BAQ', 'MDE', (SELECT id FROM aircraft WHERE model='Airbus A320'),     '15:00', '16:15',  75,  180000,  400000, 15,  2),
('AV 9536', 'BAQ', 'MDE', (SELECT id FROM aircraft WHERE model='Airbus A320 NEO'), '21:45', '23:00',  75,  150000,  330000, 55, 12),
-- ── BOG ↔ ADZ ──────────────────────────────────────────────────────────────
('AV 9541', 'BOG', 'ADZ', (SELECT id FROM aircraft WHERE model='Airbus A320 NEO'), '08:30', '10:45', 135,  290000,  600000, 12,  4),
('AV 9543', 'BOG', 'ADZ', (SELECT id FROM aircraft WHERE model='Airbus A320'),     '14:00', '16:15', 135,  320000,  650000,  5,  1),
('AV 9545', 'BOG', 'ADZ', (SELECT id FROM aircraft WHERE model='Airbus A320 NEO'), '20:30', '22:45', 135,  270000,  580000, 30,  8),
('AV 9542', 'ADZ', 'BOG', (SELECT id FROM aircraft WHERE model='Airbus A320 NEO'), '11:30', '13:45', 135,  295000,  610000, 25,  6),
('AV 9544', 'ADZ', 'BOG', (SELECT id FROM aircraft WHERE model='Airbus A320'),     '17:00', '19:15', 135,  330000,  660000, 10,  2),
('AV 9546', 'ADZ', 'BOG', (SELECT id FROM aircraft WHERE model='Airbus A320 NEO'), '23:30', '01:45', 135,  250000,  550000, 50, 12),
-- ── MDE ↔ ADZ ──────────────────────────────────────────────────────────────
('AV 9551', 'MDE', 'ADZ', (SELECT id FROM aircraft WHERE model='Airbus A320'),     '09:00', '10:55', 115,  260000,  540000, 20,  3),
('AV 9553', 'MDE', 'ADZ', (SELECT id FROM aircraft WHERE model='Airbus A320'),     '15:15', '17:10', 115,  285000,  580000, 10,  2),
('AV 9555', 'MDE', 'ADZ', (SELECT id FROM aircraft WHERE model='Airbus A320 NEO'), '21:00', '22:55', 115,  245000,  510000, 30,  8),
('AV 9552', 'ADZ', 'MDE', (SELECT id FROM aircraft WHERE model='Airbus A320'),     '11:40', '13:35', 115,  265000,  550000, 15,  2),
('AV 9554', 'ADZ', 'MDE', (SELECT id FROM aircraft WHERE model='Airbus A320'),     '17:55', '19:50', 115,  295000,  590000, 12,  3),
('AV 9556', 'ADZ', 'MDE', (SELECT id FROM aircraft WHERE model='Airbus A320 NEO'), '23:40', '01:35', 115,  230000,  490000, 40, 10),
-- ── BAQ ↔ CTG ──────────────────────────────────────────────────────────────
('AV 9601', 'BAQ', 'CTG', (SELECT id FROM aircraft WHERE model='ATR 72'), '08:00', '08:40',  40,  120000,       0, 14,  0),
('AV 9603', 'BAQ', 'CTG', (SELECT id FROM aircraft WHERE model='ATR 72'), '17:00', '17:40',  40,  130000,       0,  5,  0),
('AV 9602', 'CTG', 'BAQ', (SELECT id FROM aircraft WHERE model='ATR 72'), '09:30', '10:10',  40,  115000,       0, 20,  0),
('AV 9604', 'CTG', 'BAQ', (SELECT id FROM aircraft WHERE model='ATR 72'), '18:30', '19:10',  40,  125000,       0, 12,  0),
-- ── BAQ ↔ SMR ──────────────────────────────────────────────────────────────
('AV 9611', 'BAQ', 'SMR', (SELECT id FROM aircraft WHERE model='ATR 72'), '07:15', '07:55',  40,  110000,       0, 18,  0),
('AV 9613', 'BAQ', 'SMR', (SELECT id FROM aircraft WHERE model='ATR 72'), '16:00', '16:40',  40,  115000,       0, 10,  0),
('AV 9612', 'SMR', 'BAQ', (SELECT id FROM aircraft WHERE model='ATR 72'), '08:40', '09:20',  40,  105000,       0, 25,  0),
('AV 9614', 'SMR', 'BAQ', (SELECT id FROM aircraft WHERE model='ATR 72'), '17:30', '18:10',  40,  110000,       0, 15,  0),
-- ── CTG ↔ SMR ──────────────────────────────────────────────────────────────
('AV 9621', 'CTG', 'SMR', (SELECT id FROM aircraft WHERE model='ATR 72'), '10:00', '10:45',  45,  125000,       0, 22,  0),
('AV 9623', 'CTG', 'SMR', (SELECT id FROM aircraft WHERE model='ATR 72'), '19:00', '19:45',  45,  140000,       0,  8,  0),
('AV 9622', 'SMR', 'CTG', (SELECT id FROM aircraft WHERE model='ATR 72'), '11:30', '12:15',  45,  120000,       0, 30,  0),
('AV 9624', 'SMR', 'CTG', (SELECT id FROM aircraft WHERE model='ATR 72'), '20:30', '21:15',  45,  135000,       0, 12,  0),
-- ── BAQ ↔ CLO ──────────────────────────────────────────────────────────────
('AV 9631', 'BAQ', 'CLO', (SELECT id FROM aircraft WHERE model='Airbus A319'), '06:15', '07:50',  95,  245000,  510000, 15,  4),
('AV 9633', 'BAQ', 'CLO', (SELECT id FROM aircraft WHERE model='Airbus A319'), '17:30', '19:05',  95,  260000,  530000,  8,  2),
('AV 9632', 'CLO', 'BAQ', (SELECT id FROM aircraft WHERE model='Airbus A319'), '08:45', '10:20',  95,  230000,  490000, 20,  5),
('AV 9634', 'CLO', 'BAQ', (SELECT id FROM aircraft WHERE model='Airbus A319'), '20:00', '21:35',  95,  250000,  515000, 12,  3),
-- ── CTG ↔ CLO ──────────────────────────────────────────────────────────────
('AV 9641', 'CTG', 'CLO', (SELECT id FROM aircraft WHERE model='Airbus A320'), '09:15', '10:45',  90,  235000,  495000, 18,  4),
('AV 9643', 'CTG', 'CLO', (SELECT id FROM aircraft WHERE model='Airbus A320'), '18:45', '20:15',  90,  255000,  520000,  5,  1),
('AV 9642', 'CLO', 'CTG', (SELECT id FROM aircraft WHERE model='Airbus A320'), '11:30', '13:00',  90,  220000,  470000, 25,  6),
('AV 9644', 'CLO', 'CTG', (SELECT id FROM aircraft WHERE model='Airbus A320'), '21:00', '22:30',  90,  240000,  500000, 14,  3),
-- ── BOG ↔ LIM (directos) ───────────────────────────────────────────────────
('AV 9701', 'BOG', 'LIM', (SELECT id FROM aircraft WHERE model='Airbus A321'),     '06:15', '09:25', 190,  850000, 1850000, 15,  4),
('AV 9703', 'BOG', 'LIM', (SELECT id FROM aircraft WHERE model='Airbus A320 NEO'), '15:20', '18:30', 190,  920000, 1950000, 10,  2),
('AV 9702', 'LIM', 'BOG', (SELECT id FROM aircraft WHERE model='Airbus A321'),     '10:45', '14:00', 195,  820000, 1780000, 22,  5),
('AV 9704', 'LIM', 'BOG', (SELECT id FROM aircraft WHERE model='Airbus A320 NEO'), '19:45', '23:00', 195,  890000, 1820000, 30,  6),
-- ── MDE ↔ LIM (via BOG) ────────────────────────────────────────────────────
('AV 9711', 'MDE', 'LIM', (SELECT id FROM aircraft WHERE model='Airbus A320'),     '04:30', '09:25', 295,  950000, 2100000,  8,  1),
('AV 9712', 'LIM', 'MDE', (SELECT id FROM aircraft WHERE model='Airbus A321'),     '10:45', '16:10', 325,  930000, 2050000, 14,  3),
('AV 9713', 'MDE', 'LIM', (SELECT id FROM aircraft WHERE model='Airbus A320 NEO'), '12:15', '18:30', 375, 1050000, 2250000,  5,  0),
('AV 9714', 'LIM', 'MDE', (SELECT id FROM aircraft WHERE model='Airbus A320 NEO'), '19:45', '01:25', 340,  980000, 2120000, 20,  4),
-- ── BOG ↔ GRU ──────────────────────────────────────────────────────────────
('AV 9801', 'BOG', 'GRU', (SELECT id FROM aircraft WHERE model='Airbus A330'), '07:30', '15:40', 370, 1250000, 2850000, 20,  5),
('AV 9802', 'GRU', 'BOG', (SELECT id FROM aircraft WHERE model='Airbus A330'), '17:00', '21:15', 375, 1200000, 2780000, 15,  3),
-- ── MDE ↔ GRU (via BOG) ────────────────────────────────────────────────────
('AV 9811', 'MDE', 'GRU', (SELECT id FROM aircraft WHERE model='Airbus A320'), '05:15', '15:40', 505, 1350000, 3100000, 10,  2),
('AV 9812', 'GRU', 'MDE', (SELECT id FROM aircraft WHERE model='Airbus A320'), '17:00', '23:55', 535, 1300000, 3050000, 12,  1),
-- ── BOG ↔ GIG ──────────────────────────────────────────────────────────────
('AV 9821', 'BOG', 'GIG', (SELECT id FROM aircraft WHERE model='Airbus A320 NEO'), '08:00', '16:20', 380, 1320000, 2950000, 18,  4),
('AV 9822', 'GIG', 'BOG', (SELECT id FROM aircraft WHERE model='Airbus A320 NEO'), '18:00', '22:30', 390, 1280000, 2880000, 22,  5),
-- ── MDE ↔ GIG (via BOG) ────────────────────────────────────────────────────
('AV 9831', 'MDE', 'GIG', (SELECT id FROM aircraft WHERE model='Airbus A320'),     '05:45', '16:20', 515, 1420000, 3250000,  5,  1),
('AV 9832', 'GIG', 'MDE', (SELECT id FROM aircraft WHERE model='Airbus A320 NEO'), '18:00', '01:10', 550, 1380000, 3180000, 15,  2),
-- ── BOG ↔ SCL ──────────────────────────────────────────────────────────────
('AV 9921', 'BOG', 'SCL', (SELECT id FROM aircraft WHERE model='Boeing 787-8'), '09:30', '17:15', 345, 1150000, 2750000, 20,  6),
('AV 9922', 'SCL', 'BOG', (SELECT id FROM aircraft WHERE model='Boeing 787-8'), '18:45', '22:35', 350, 1080000, 2600000, 12,  2),
-- ── MDE ↔ SCL ──────────────────────────────────────────────────────────────
('AV 9931', 'MDE', 'SCL', (SELECT id FROM aircraft WHERE model='Airbus A320'),     '16:45', '00:30', 345, 1250000, 2950000, 10,  2),
('AV 9932', 'SCL', 'MDE', (SELECT id FROM aircraft WHERE model='Airbus A320'),     '01:50', '07:35', 345, 1180000, 2800000, 15,  3),
-- ── BOG ↔ EZE ──────────────────────────────────────────────────────────────
('AV 9901', 'BOG', 'EZE', (SELECT id FROM aircraft WHERE model='Boeing 787-8'), '06:40', '15:05', 385, 1550000, 3450000, 25,  8),
('AV 9902', 'EZE', 'BOG', (SELECT id FROM aircraft WHERE model='Boeing 787-8'), '16:50', '21:20', 390, 1480000, 3200000, 15,  4),
-- ── MDE ↔ AEP ──────────────────────────────────────────────────────────────
('AV 9915', 'MDE', 'AEP', (SELECT id FROM aircraft WHERE model='Airbus A320 NEO'), '17:30', '01:55', 385, 1680000, 3650000, 10,  2),
('AV 9916', 'AEP', 'MDE', (SELECT id FROM aircraft WHERE model='Airbus A320 NEO'), '03:15', '09:40', 385, 1620000, 3400000, 15,  3),
-- ── BOG ↔ MIA ──────────────────────────────────────────────────────────────
('AV 9151', 'BOG', 'MIA', (SELECT id FROM aircraft WHERE model='Airbus A320 NEO'), '06:00', '10:50', 230,  950000, 2100000, 12,  4),
('AV 9153', 'BOG', 'MIA', (SELECT id FROM aircraft WHERE model='Boeing 787-8'),    '14:15', '19:05', 230, 1100000, 2450000, 35, 10),
('AV 9155', 'BOG', 'MIA', (SELECT id FROM aircraft WHERE model='Airbus A320'),     '22:30', '03:20', 230,  850000, 1850000, 45,  8),
('AV 9152', 'MIA', 'BOG', (SELECT id FROM aircraft WHERE model='Airbus A320 NEO'), '12:30', '15:10', 220,  920000, 1980000, 20,  5),
('AV 9154', 'MIA', 'BOG', (SELECT id FROM aircraft WHERE model='Boeing 787-8'),    '21:00', '23:40', 220, 1050000, 2300000, 15,  6),
('AV 9156', 'MIA', 'BOG', (SELECT id FROM aircraft WHERE model='Airbus A320'),     '05:00', '07:40', 220,  820000, 1750000, 60, 12),
-- ── MDE ↔ MIA ──────────────────────────────────────────────────────────────
('AV 9161', 'MDE', 'MIA', (SELECT id FROM aircraft WHERE model='Airbus A320 NEO'), '08:30', '12:45', 195, 1020000, 2200000, 14,  3),
('AV 9163', 'MDE', 'MIA', (SELECT id FROM aircraft WHERE model='Airbus A320'),     '17:15', '21:30', 195,  950000, 2050000, 22,  4),
('AV 9162', 'MIA', 'MDE', (SELECT id FROM aircraft WHERE model='Airbus A320 NEO'), '14:30', '16:45', 195,  980000, 2150000, 18,  2),
('AV 9164', 'MIA', 'MDE', (SELECT id FROM aircraft WHERE model='Airbus A320'),     '23:00', '01:15', 195,  890000, 1900000, 30,  6),
-- ── BOG ↔ JFK ──────────────────────────────────────────────────────────────
('AV 9171', 'BOG', 'JFK', (SELECT id FROM aircraft WHERE model='Boeing 787-8'),    '07:15', '14:15', 360, 1450000, 3100000, 10,  2),
('AV 9173', 'BOG', 'JFK', (SELECT id FROM aircraft WHERE model='Airbus A321'),     '15:00', '22:00', 360, 1250000, 2800000, 25,  5),
('AV 9175', 'BOG', 'JFK', (SELECT id FROM aircraft WHERE model='Airbus A320 NEO'), '23:15', '06:15', 360, 1100000, 2450000, 30,  4),
('AV 9172', 'JFK', 'BOG', (SELECT id FROM aircraft WHERE model='Boeing 787-8'),    '16:30', '21:30', 360, 1380000, 2950000, 15,  3),
('AV 9174', 'JFK', 'BOG', (SELECT id FROM aircraft WHERE model='Airbus A321'),     '23:55', '04:55', 360, 1180000, 2650000, 40, 10),
('AV 9176', 'JFK', 'BOG', (SELECT id FROM aircraft WHERE model='Airbus A320 NEO'), '08:00', '13:00', 360, 1050000, 2350000, 50,  8),
-- ── MDE ↔ JFK ──────────────────────────────────────────────────────────────
('AV 9181', 'MDE', 'JFK', (SELECT id FROM aircraft WHERE model='Airbus A320 NEO'), '09:45', '16:15', 330, 1350000, 2950000, 12,  2),
('AV 9183', 'MDE', 'JFK', (SELECT id FROM aircraft WHERE model='Airbus A320'),     '22:00', '04:30', 330, 1150000, 2600000, 25,  5),
('AV 9182', 'JFK', 'MDE', (SELECT id FROM aircraft WHERE model='Airbus A320 NEO'), '18:00', '22:30', 330, 1300000, 2850000, 15,  3),
('AV 9184', 'JFK', 'MDE', (SELECT id FROM aircraft WHERE model='Airbus A320'),     '06:00', '10:30', 330, 1100000, 2500000, 40,  7),
-- ── BOG ↔ MCO ──────────────────────────────────────────────────────────────
('AV 9251', 'BOG', 'MCO', (SELECT id FROM aircraft WHERE model='Airbus A321'),     '05:45', '10:35', 230,  980000, 2200000,  5,  1),
('AV 9253', 'BOG', 'MCO', (SELECT id FROM aircraft WHERE model='Airbus A320 NEO'), '13:30', '18:20', 230, 1150000, 2400000, 25,  6),
('AV 9255', 'BOG', 'MCO', (SELECT id FROM aircraft WHERE model='Airbus A320'),     '22:15', '03:05', 230,  880000, 1950000, 40,  8),
('AV 9252', 'MCO', 'BOG', (SELECT id FROM aircraft WHERE model='Airbus A321'),     '12:15', '15:05', 230,  940000, 2050000, 18,  4),
('AV 9254', 'MCO', 'BOG', (SELECT id FROM aircraft WHERE model='Airbus A320 NEO'), '19:50', '22:40', 230, 1080000, 2250000, 12,  3),
('AV 9256', 'MCO', 'BOG', (SELECT id FROM aircraft WHERE model='Airbus A320'),     '04:40', '07:30', 230,  850000, 1800000, 55, 12),
-- ── MDE ↔ MCO ──────────────────────────────────────────────────────────────
('AV 9261', 'MDE', 'MCO', (SELECT id FROM aircraft WHERE model='Airbus A320 NEO'), '09:15', '13:30', 195, 1120000, 2350000, 10,  2),
('AV 9262', 'MCO', 'MDE', (SELECT id FROM aircraft WHERE model='Airbus A320 NEO'), '15:00', '17:15', 195, 1050000, 2150000, 15,  3),
-- ── BOG ↔ TPA ──────────────────────────────────────────────────────────────
('AV 9271', 'BOG', 'TPA', (SELECT id FROM aircraft WHERE model='Airbus A320 NEO'), '08:15', '13:20', 245, 1100000, 2300000, 15,  4),
('AV 9273', 'BOG', 'TPA', (SELECT id FROM aircraft WHERE model='Airbus A320'),     '23:00', '04:05', 245,  920000, 1950000, 35,  6),
('AV 9272', 'TPA', 'BOG', (SELECT id FROM aircraft WHERE model='Airbus A320 NEO'), '14:50', '17:55', 245, 1050000, 2180000, 22,  5),
('AV 9274', 'TPA', 'BOG', (SELECT id FROM aircraft WHERE model='Airbus A320'),     '05:45', '08:50', 245,  890000, 1850000, 45, 10),
-- ── MDE ↔ TPA ──────────────────────────────────────────────────────────────
('AV 9281', 'MDE', 'TPA', (SELECT id FROM aircraft WHERE model='Airbus A320'),     '11:30', '16:00', 210, 1250000, 2500000, 12,  2),
('AV 9282', 'TPA', 'MDE', (SELECT id FROM aircraft WHERE model='Airbus A320'),     '17:30', '20:00', 210, 1180000, 2350000, 18,  3),
-- ── BOG ↔ LAX (via MIA) ────────────────────────────────────────────────────
('AV 9351', 'BOG', 'LAX', (SELECT id FROM aircraft WHERE model='Airbus A320 NEO'), '06:00', '17:45', 705, 1850000, 4200000, 10,  2),
('AV 9352', 'LAX', 'BOG', (SELECT id FROM aircraft WHERE model='Airbus A320 NEO'), '10:00', '23:40', 820, 1780000, 3950000, 15,  3),
-- ── MDE ↔ LAX (via MIA) ────────────────────────────────────────────────────
('AV 9361', 'MDE', 'LAX', (SELECT id FROM aircraft WHERE model='Airbus A320 NEO'), '08:30', '20:15', 705, 1920000, 4350000,  8,  1),
('AV 9362', 'LAX', 'MDE', (SELECT id FROM aircraft WHERE model='Airbus A320 NEO'), '12:00', '01:15', 795, 1850000, 4100000, 12,  2),
-- ── BOG ↔ IAH (via MIA) ────────────────────────────────────────────────────
('AV 9371', 'BOG', 'IAH', (SELECT id FROM aircraft WHERE model='Boeing 787-8'),    '14:15', '00:45', 630, 1450000, 3100000, 20,  5),
('AV 9372', 'IAH', 'BOG', (SELECT id FROM aircraft WHERE model='Boeing 787-8'),    '01:30', '15:10', 820, 1380000, 2900000, 25,  4),
-- ── BOG ↔ MEX ──────────────────────────────────────────────────────────────
('AV 9451', 'BOG', 'MEX', (SELECT id FROM aircraft WHERE model='Airbus A321'),     '07:00', '11:45', 285, 1100000, 2450000, 10,  3),
('AV 9453', 'BOG', 'MEX', (SELECT id FROM aircraft WHERE model='Boeing 787-8'),    '14:50', '19:35', 285, 1250000, 2800000, 30,  8),
('AV 9452', 'MEX', 'BOG', (SELECT id FROM aircraft WHERE model='Airbus A321'),     '13:15', '18:00', 285, 1050000, 2300000, 15,  4),
('AV 9454', 'MEX', 'BOG', (SELECT id FROM aircraft WHERE model='Boeing 787-8'),    '21:00', '01:45', 285, 1180000, 2650000, 20,  5),
-- ── MDE ↔ MEX ──────────────────────────────────────────────────────────────
('AV 9461', 'MDE', 'MEX', (SELECT id FROM aircraft WHERE model='Airbus A320 NEO'), '08:00', '12:15', 255, 1150000, 2550000, 12,  2),
('AV 9462', 'MEX', 'MDE', (SELECT id FROM aircraft WHERE model='Airbus A320 NEO'), '13:45', '18:00', 255, 1100000, 2400000, 18,  3),
-- ── BOG ↔ CUN ──────────────────────────────────────────────────────────────
('AV 9471', 'BOG', 'CUN', (SELECT id FROM aircraft WHERE model='Airbus A320 NEO'), '06:15', '09:45', 210,  950000, 2100000, 10,  2),
('AV 9473', 'BOG', 'CUN', (SELECT id FROM aircraft WHERE model='Airbus A321'),     '13:00', '16:30', 210, 1050000, 2350000, 25,  6),
('AV 9475', 'BOG', 'CUN', (SELECT id FROM aircraft WHERE model='Airbus A320'),     '22:45', '02:15', 210,  880000, 1850000, 40,  8),
('AV 9472', 'CUN', 'BOG', (SELECT id FROM aircraft WHERE model='Airbus A320 NEO'), '11:15', '14:45', 210,  920000, 1980000, 15,  4),
('AV 9474', 'CUN', 'BOG', (SELECT id FROM aircraft WHERE model='Airbus A321'),     '18:00', '21:30', 210,  980000, 2200000, 30,  5),
('AV 9476', 'CUN', 'BOG', (SELECT id FROM aircraft WHERE model='Airbus A320'),     '03:45', '07:15', 210,  850000, 1750000, 50, 12),
-- ── MDE ↔ CUN ──────────────────────────────────────────────────────────────
('AV 9481', 'MDE', 'CUN', (SELECT id FROM aircraft WHERE model='Airbus A320 NEO'), '09:00', '11:55', 175, 1020000, 2250000, 12,  2),
('AV 9483', 'MDE', 'CUN', (SELECT id FROM aircraft WHERE model='Airbus A320'),     '17:00', '19:55', 175,  950000, 2050000, 20,  4),
('AV 9482', 'CUN', 'MDE', (SELECT id FROM aircraft WHERE model='Airbus A320 NEO'), '13:15', '16:10', 175,  980000, 2150000, 15,  3),
('AV 9484', 'CUN', 'MDE', (SELECT id FROM aircraft WHERE model='Airbus A320'),     '21:15', '00:10', 175,  890000, 1950000, 35,  5),
-- ── BOG ↔ PUJ ──────────────────────────────────────────────────────────────
('AV 9491', 'BOG', 'PUJ', (SELECT id FROM aircraft WHERE model='Airbus A320 NEO'), '07:30', '11:15', 165,  880000, 1950000, 15,  3),
('AV 9493', 'BOG', 'PUJ', (SELECT id FROM aircraft WHERE model='Airbus A320'),     '15:20', '19:05', 165,  950000, 2100000, 10,  2),
('AV 9492', 'PUJ', 'BOG', (SELECT id FROM aircraft WHERE model='Airbus A320 NEO'), '13:00', '14:45', 165,  850000, 1850000, 20,  5),
('AV 9494', 'PUJ', 'BOG', (SELECT id FROM aircraft WHERE model='Airbus A320'),     '20:30', '22:15', 165,  920000, 2000000, 25,  4),
-- ── MDE ↔ PUJ ──────────────────────────────────────────────────────────────
('AV 9495', 'MDE', 'PUJ', (SELECT id FROM aircraft WHERE model='Airbus A320 NEO'), '11:00', '14:30', 150,  980000, 2150000, 12,  2),
('AV 9497', 'MDE', 'PUJ', (SELECT id FROM aircraft WHERE model='Airbus A320 NEO'), '14:15', '17:45', 150, 1050000, 2280000, 15,  4),
('AV 9496', 'PUJ', 'MDE', (SELECT id FROM aircraft WHERE model='Airbus A320 NEO'), '16:00', '17:30', 150,  940000, 2050000, 18,  3),
('AV 9498', 'PUJ', 'MDE', (SELECT id FROM aircraft WHERE model='Airbus A320 NEO'), '19:15', '20:45', 150,  990000, 2150000, 22,  3),
-- ── BOG ↔ PTY ──────────────────────────────────────────────────────────────
('AV 9561', 'BOG', 'PTY', (SELECT id FROM aircraft WHERE model='Airbus A320 NEO'), '06:30', '08:10', 100,  650000, 1450000, 12,  4),
('AV 9563', 'BOG', 'PTY', (SELECT id FROM aircraft WHERE model='Airbus A320'),     '14:00', '15:40', 100,  720000, 1550000, 25,  6),
('AV 9565', 'BOG', 'PTY', (SELECT id FROM aircraft WHERE model='Airbus A320 NEO'), '21:30', '23:10', 100,  580000, 1250000, 45,  8),
('AV 9562', 'PTY', 'BOG', (SELECT id FROM aircraft WHERE model='Airbus A320 NEO'), '09:30', '11:10', 100,  620000, 1380000, 15,  2),
('AV 9564', 'PTY', 'BOG', (SELECT id FROM aircraft WHERE model='Airbus A320'),     '17:00', '18:40', 100,  680000, 1480000, 30,  5),
('AV 9566', 'PTY', 'BOG', (SELECT id FROM aircraft WHERE model='Airbus A320 NEO'), '06:00', '07:40', 100,  550000, 1200000, 50, 10),
-- ── MDE ↔ PTY ──────────────────────────────────────────────────────────────
('AV 9571', 'MDE', 'PTY', (SELECT id FROM aircraft WHERE model='Airbus A320 NEO'), '08:45', '10:05',  80,  750000, 1650000, 10,  3),
('AV 9573', 'MDE', 'PTY', (SELECT id FROM aircraft WHERE model='Airbus A320'),     '18:20', '19:40',  80,  690000, 1450000, 20,  4),
('AV 9572', 'PTY', 'MDE', (SELECT id FROM aircraft WHERE model='Airbus A320 NEO'), '11:30', '12:50',  80,  720000, 1580000, 15,  2),
('AV 9574', 'PTY', 'MDE', (SELECT id FROM aircraft WHERE model='Airbus A320'),     '21:00', '22:20',  80,  640000, 1350000, 35,  5),
-- ── BOG ↔ SJO ──────────────────────────────────────────────────────────────
('AV 9581', 'BOG', 'SJO', (SELECT id FROM aircraft WHERE model='Airbus A320 NEO'), '07:45', '10:05', 140,  850000, 1850000,  8,  2),
('AV 9585', 'BOG', 'SJO', (SELECT id FROM aircraft WHERE model='Airbus A320 NEO'), '22:00', '00:20', 140,  750000, 1650000, 40,  7),
('AV 9582', 'SJO', 'BOG', (SELECT id FROM aircraft WHERE model='Airbus A320 NEO'), '10:30', '13:50', 140,  820000, 1750000, 12,  3),
('AV 9586', 'SJO', 'BOG', (SELECT id FROM aircraft WHERE model='Airbus A320 NEO'), '05:00', '08:20', 140,  720000, 1580000, 45,  9),
-- ── MDE ↔ SJO ──────────────────────────────────────────────────────────────
('AV 9591', 'MDE', 'SJO', (SELECT id FROM aircraft WHERE model='Airbus A320 NEO'), '09:30', '11:35', 125,  890000, 1980000, 15,  3),
('AV 9592', 'SJO', 'MDE', (SELECT id FROM aircraft WHERE model='Airbus A320 NEO'), '12:00', '14:05', 125,  850000, 1850000, 20,  2),
-- ── BOG ↔ MAD ──────────────────────────────────────────────────────────────
('AV 4001', 'BOG', 'MAD', (SELECT id FROM aircraft WHERE model='Boeing 787-9'), '23:45', '17:30', 585, 3200000, 7500000, 52, 18),
('AV 4002', 'MAD', 'BOG', (SELECT id FROM aircraft WHERE model='Boeing 787-9'), '22:15', '04:00', 645, 3100000, 7200000, 45, 15),
-- ── MDE ↔ MAD (via BOG) ────────────────────────────────────────────────────
('AV 4011', 'MDE', 'MAD', (SELECT id FROM aircraft WHERE model='Boeing 787-9'), '19:30', '17:30', 840, 3450000, 7800000, 20,  5),
('AV 4012', 'MAD', 'MDE', (SELECT id FROM aircraft WHERE model='Boeing 787-9'), '22:15', '08:15', 960, 3350000, 7600000, 25,  4),
-- ── MDE ↔ BCN ──────────────────────────────────────────────────────────────
('AV 4101', 'MDE', 'BCN', (SELECT id FROM aircraft WHERE model='Boeing 787-8'), '21:30', '14:40', 610, 3350000, 7800000, 38, 12),
('AV 4102', 'BCN', 'MDE', (SELECT id FROM aircraft WHERE model='Boeing 787-8'), '18:00', '23:55', 715, 3250000, 7400000, 42, 10),
-- ── BOG ↔ BCN (via MDE) ────────────────────────────────────────────────────
('AV 4111', 'BOG', 'BCN', (SELECT id FROM aircraft WHERE model='Boeing 787-8'), '17:45', '14:40', 835, 3550000, 8100000, 15,  4),
('AV 4112', 'BCN', 'BOG', (SELECT id FROM aircraft WHERE model='Boeing 787-8'), '18:00', '07:30', 1170, 3450000, 7900000, 20,  6),
-- ── BOG ↔ LHR (via MAD) ────────────────────────────────────────────────────
('AV 4201', 'BOG', 'LHR', (SELECT id FROM aircraft WHERE model='Boeing 787-9'), '23:45', '21:30', 945, 3850000, 8200000, 15,  4),
('AV 4202', 'LHR', 'BOG', (SELECT id FROM aircraft WHERE model='Boeing 787-9'), '18:00', '04:00', 960, 3750000, 8100000, 18,  5),
-- ── MDE ↔ LHR (via BOG + MAD) ──────────────────────────────────────────────
('AV 4211', 'MDE', 'LHR', (SELECT id FROM aircraft WHERE model='Boeing 787-9'), '19:30', '21:30', 1200, 4100000, 8500000,  8,  2),
('AV 4212', 'LHR', 'MDE', (SELECT id FROM aircraft WHERE model='Boeing 787-9'), '18:00', '08:15', 1215, 3950000, 8400000, 12,  3),
-- ── MDE ↔ CDG (via BCN) ────────────────────────────────────────────────────
('AV 4301', 'MDE', 'CDG', (SELECT id FROM aircraft WHERE model='Boeing 787-8'), '21:30', '18:45', 915, 3950000, 8400000, 12,  3),
('AV 4302', 'CDG', 'MDE', (SELECT id FROM aircraft WHERE model='Boeing 787-8'), '14:30', '23:55', 925, 3850000, 8200000, 15,  4),
-- ── BOG ↔ CDG (via MDE + BCN) ──────────────────────────────────────────────
('AV 4311', 'BOG', 'CDG', (SELECT id FROM aircraft WHERE model='Boeing 787-8'), '17:45', '18:45', 1140, 4200000, 8800000, 10,  2),
('AV 4312', 'CDG', 'BOG', (SELECT id FROM aircraft WHERE model='Boeing 787-8'), '14:30', '07:30', 1380, 4050000, 8600000, 10,  2);

-- ─────────────────────────────────────────
-- 4. FLIGHT_STOPS
-- ─────────────────────────────────────────
INSERT INTO flight_stops (flight_id, stop_order, airport_iata, arrival_time, departure_time, layover_min) VALUES
-- MDE → LIM
((SELECT id FROM flights WHERE flight_number='AV 9711'), 1, 'BOG', '05:25', '06:15',  50),
((SELECT id FROM flights WHERE flight_number='AV 9712'), 1, 'BOG', '14:00', '15:20',  80),
((SELECT id FROM flights WHERE flight_number='AV 9713'), 1, 'BOG', '13:10', '15:20', 130),
((SELECT id FROM flights WHERE flight_number='AV 9714'), 1, 'BOG', '23:00', '00:30',  90),
-- MDE ↔ GRU
((SELECT id FROM flights WHERE flight_number='AV 9811'), 1, 'BOG', '06:10', '07:30',  80),
((SELECT id FROM flights WHERE flight_number='AV 9812'), 1, 'BOG', '21:15', '22:50',  95),
-- MDE ↔ GIG
((SELECT id FROM flights WHERE flight_number='AV 9831'), 1, 'BOG', '06:40', '08:00',  80),
((SELECT id FROM flights WHERE flight_number='AV 9832'), 1, 'BOG', '22:30', '00:15', 105),
-- BOG ↔ LAX
((SELECT id FROM flights WHERE flight_number='AV 9351'), 1, 'MIA', '10:50', '12:50', 120),
((SELECT id FROM flights WHERE flight_number='AV 9352'), 1, 'MIA', '18:15', '21:00', 165),
-- MDE ↔ LAX
((SELECT id FROM flights WHERE flight_number='AV 9361'), 1, 'MIA', '12:45', '15:15', 150),
((SELECT id FROM flights WHERE flight_number='AV 9362'), 1, 'MIA', '20:15', '23:00', 165),
-- BOG ↔ IAH
((SELECT id FROM flights WHERE flight_number='AV 9371'), 1, 'MIA', '19:05', '21:15', 130),
((SELECT id FROM flights WHERE flight_number='AV 9372'), 1, 'MIA', '05:05', '12:30', 445),
-- MDE ↔ MAD
((SELECT id FROM flights WHERE flight_number='AV 4011'), 1, 'BOG', '20:30', '23:45', 195),
((SELECT id FROM flights WHERE flight_number='AV 4012'), 1, 'BOG', '04:00', '07:15', 195),
-- BOG ↔ BCN
((SELECT id FROM flights WHERE flight_number='AV 4111'), 1, 'MDE', '18:45', '21:30', 165),
((SELECT id FROM flights WHERE flight_number='AV 4112'), 1, 'MDE', '23:55', '06:30', 395),
-- BOG ↔ LHR
((SELECT id FROM flights WHERE flight_number='AV 4201'), 1, 'MAD', '17:30', '19:30', 120),
((SELECT id FROM flights WHERE flight_number='AV 4202'), 1, 'MAD', '21:15', '22:15',  60),
-- MDE ↔ LHR (doble escala)
((SELECT id FROM flights WHERE flight_number='AV 4211'), 1, 'BOG', '20:30', '23:45', 195),
((SELECT id FROM flights WHERE flight_number='AV 4211'), 2, 'MAD', '17:30', '19:30', 120),
((SELECT id FROM flights WHERE flight_number='AV 4212'), 1, 'MAD', '21:15', '22:15',  60),
((SELECT id FROM flights WHERE flight_number='AV 4212'), 2, 'BOG', '04:00', '07:15', 195),
-- MDE ↔ CDG
((SELECT id FROM flights WHERE flight_number='AV 4301'), 1, 'BCN', '14:40', '17:15', 155),
((SELECT id FROM flights WHERE flight_number='AV 4302'), 1, 'BCN', '16:05', '18:00', 115),
-- BOG ↔ CDG (doble escala)
((SELECT id FROM flights WHERE flight_number='AV 4311'), 1, 'MDE', '18:45', '21:30', 165),
((SELECT id FROM flights WHERE flight_number='AV 4311'), 2, 'BCN', '14:40', '17:15', 155),
((SELECT id FROM flights WHERE flight_number='AV 4312'), 1, 'BCN', '16:05', '18:00', 115),
((SELECT id FROM flights WHERE flight_number='AV 4312'), 2, 'MDE', '23:55', '06:30', 395);