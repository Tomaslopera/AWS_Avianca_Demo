/**
 * flights_data.js
 * Base de datos estática de vuelos Avianca
 * Cubre rutas nacionales e internacionales con vuelos directos y con escala
 * Migrable a backend/BD en el futuro
 */

const flightsDB = [

  // ─── NACIONALES COLOMBIA ──────────────────────────────────────────────────

  // ==========================================
  // BOGOTÁ (BOG) → MEDELLÍN (MDE) - 6 VUELOS DIARIOS
  // ==========================================
  {
    id: "AV9001",
    flightNumber: "AV 9001",
    origin: "BOG", originCity: "Bogotá", originAirport: "El Dorado Internacional",
    destination: "MDE", destinationCity: "Medellín", destinationAirport: "José María Córdova",
    departure: "06:00", arrival: "07:05",
    duration: "1h 05m",
    stops: [],
    aircraft: "Airbus A320",
    prices: { economica: 189000, ejecutiva: 420000 },
    seatsLeft: { economica: 12, ejecutiva: 4 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9003",
    flightNumber: "AV 9003",
    origin: "BOG", originCity: "Bogotá", originAirport: "El Dorado Internacional",
    destination: "MDE", destinationCity: "Medellín", destinationAirport: "José María Córdova",
    departure: "09:15", arrival: "10:20",
    duration: "1h 05m",
    stops: [],
    aircraft: "Airbus A320 NEO",
    prices: { economica: 215000, ejecutiva: 460000 },
    seatsLeft: { economica: 40, ejecutiva: 8 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9005",
    flightNumber: "AV 9005",
    origin: "BOG", originCity: "Bogotá", originAirport: "El Dorado Internacional",
    destination: "MDE", destinationCity: "Medellín", destinationAirport: "José María Córdova",
    departure: "12:30", arrival: "13:35",
    duration: "1h 05m",
    stops: [],
    aircraft: "Airbus A319",
    prices: { economica: 210000, ejecutiva: 450000 },
    seatsLeft: { economica: 28, ejecutiva: 6 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9007",
    flightNumber: "AV 9007",
    origin: "BOG", originCity: "Bogotá", originAirport: "El Dorado Internacional",
    destination: "MDE", destinationCity: "Medellín", destinationAirport: "José María Córdova",
    departure: "15:45", arrival: "16:50",
    duration: "1h 05m",
    stops: [],
    aircraft: "Airbus A320",
    prices: { economica: 195000, ejecutiva: 410000 },
    seatsLeft: { economica: 18, ejecutiva: 5 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9009",
    flightNumber: "AV 9009",
    origin: "BOG", originCity: "Bogotá", originAirport: "El Dorado Internacional",
    destination: "MDE", destinationCity: "Medellín", destinationAirport: "José María Córdova",
    departure: "19:15", arrival: "20:20",
    duration: "1h 05m",
    stops: [],
    aircraft: "Airbus A320",
    prices: { economica: 175000, ejecutiva: 390000 },
    seatsLeft: { economica: 5, ejecutiva: 2 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9011",
    flightNumber: "AV 9011",
    origin: "BOG", originCity: "Bogotá", originAirport: "El Dorado Internacional",
    destination: "MDE", destinationCity: "Medellín", destinationAirport: "José María Córdova",
    departure: "22:00", arrival: "23:05",
    duration: "1h 05m",
    stops: [],
    aircraft: "Airbus A320 NEO",
    prices: { economica: 145000, ejecutiva: 350000 },
    seatsLeft: { economica: 50, ejecutiva: 12 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },

  // ==========================================
  // MEDELLÍN (MDE) → BOGOTÁ (BOG) - 6 VUELOS DIARIOS
  // ==========================================
  {
    id: "AV9002",
    flightNumber: "AV 9002",
    origin: "MDE", originCity: "Medellín", originAirport: "José María Córdova",
    destination: "BOG", destinationCity: "Bogotá", destinationAirport: "El Dorado Internacional",
    departure: "06:30", arrival: "07:35",
    duration: "1h 05m",
    stops: [],
    aircraft: "Airbus A320 NEO",
    prices: { economica: 220000, ejecutiva: 470000 },
    seatsLeft: { economica: 8, ejecutiva: 2 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9004",
    flightNumber: "AV 9004",
    origin: "MDE", originCity: "Medellín", originAirport: "José María Córdova",
    destination: "BOG", destinationCity: "Bogotá", destinationAirport: "El Dorado Internacional",
    departure: "08:00", arrival: "09:05",
    duration: "1h 05m",
    stops: [],
    aircraft: "Airbus A320",
    prices: { economica: 185000, ejecutiva: 415000 },
    seatsLeft: { economica: 18, ejecutiva: 5 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9006",
    flightNumber: "AV 9006",
    origin: "MDE", originCity: "Medellín", originAirport: "José María Córdova",
    destination: "BOG", destinationCity: "Bogotá", destinationAirport: "El Dorado Internacional",
    departure: "11:15", arrival: "12:20",
    duration: "1h 05m",
    stops: [],
    aircraft: "Airbus A319",
    prices: { economica: 170000, ejecutiva: 380000 },
    seatsLeft: { economica: 25, ejecutiva: 7 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9008",
    flightNumber: "AV 9008",
    origin: "MDE", originCity: "Medellín", originAirport: "José María Córdova",
    destination: "BOG", destinationCity: "Bogotá", destinationAirport: "El Dorado Internacional",
    departure: "14:45", arrival: "15:50",
    duration: "1h 05m",
    stops: [],
    aircraft: "Airbus A320",
    prices: { economica: 190000, ejecutiva: 425000 },
    seatsLeft: { economica: 35, ejecutiva: 9 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9010",
    flightNumber: "AV 9010",
    origin: "MDE", originCity: "Medellín", originAirport: "José María Córdova",
    destination: "BOG", destinationCity: "Bogotá", destinationAirport: "El Dorado Internacional",
    departure: "17:00", arrival: "18:05",
    duration: "1h 05m",
    stops: [],
    aircraft: "Airbus A319",
    prices: { economica: 195000, ejecutiva: 430000 },
    seatsLeft: { economica: 32, ejecutiva: 8 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9012",
    flightNumber: "AV 9012",
    origin: "MDE", originCity: "Medellín", originAirport: "José María Córdova",
    destination: "BOG", destinationCity: "Bogotá", destinationAirport: "El Dorado Internacional",
    departure: "20:30", arrival: "21:35",
    duration: "1h 05m",
    stops: [],
    aircraft: "Airbus A320",
    prices: { economica: 165000, ejecutiva: 395000 },
    seatsLeft: { economica: 15, ejecutiva: 3 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },

  // ==========================================
  // BOGOTÁ (BOG) → CARTAGENA (CTG) - 6 VUELOS
  // ==========================================
  {
    id: "AV9101",
    flightNumber: "AV 9101",
    origin: "BOG", originCity: "Bogotá", originAirport: "El Dorado Internacional",
    destination: "CTG", destinationCity: "Cartagena", destinationAirport: "Rafael Núñez Internacional",
    departure: "06:15", arrival: "07:45",
    duration: "1h 30m",
    stops: [],
    aircraft: "Airbus A320",
    prices: { economica: 215000, ejecutiva: 480000 },
    seatsLeft: { economica: 15, ejecutiva: 4 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9103",
    flightNumber: "AV 9103",
    origin: "BOG", originCity: "Bogotá", originAirport: "El Dorado Internacional",
    destination: "CTG", destinationCity: "Cartagena", destinationAirport: "Rafael Núñez Internacional",
    departure: "09:30", arrival: "11:00",
    duration: "1h 30m",
    stops: [],
    aircraft: "Airbus A320 NEO",
    prices: { economica: 245000, ejecutiva: 520000 },
    seatsLeft: { economica: 32, ejecutiva: 8 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9105",
    flightNumber: "AV 9105",
    origin: "BOG", originCity: "Bogotá", originAirport: "El Dorado Internacional",
    destination: "CTG", destinationCity: "Cartagena", destinationAirport: "Rafael Núñez Internacional",
    departure: "13:00", arrival: "14:30",
    duration: "1h 30m",
    stops: [],
    aircraft: "Airbus A320",
    prices: { economica: 195000, ejecutiva: 440000 },
    seatsLeft: { economica: 20, ejecutiva: 5 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9107",
    flightNumber: "AV 9107",
    origin: "BOG", originCity: "Bogotá", originAirport: "El Dorado Internacional",
    destination: "CTG", destinationCity: "Cartagena", destinationAirport: "Rafael Núñez Internacional",
    departure: "16:45", arrival: "18:15",
    duration: "1h 30m",
    stops: [],
    aircraft: "Airbus A319",
    prices: { economica: 230000, ejecutiva: 495000 },
    seatsLeft: { economica: 8, ejecutiva: 2 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9109",
    flightNumber: "AV 9109",
    origin: "BOG", originCity: "Bogotá", originAirport: "El Dorado Internacional",
    destination: "CTG", destinationCity: "Cartagena", destinationAirport: "Rafael Núñez Internacional",
    departure: "19:30", arrival: "21:00",
    duration: "1h 30m",
    stops: [],
    aircraft: "Airbus A320 NEO",
    prices: { economica: 210000, ejecutiva: 460000 },
    seatsLeft: { economica: 45, ejecutiva: 10 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9111",
    flightNumber: "AV 9111",
    origin: "BOG", originCity: "Bogotá", originAirport: "El Dorado Internacional",
    destination: "CTG", destinationCity: "Cartagena", destinationAirport: "Rafael Núñez Internacional",
    departure: "22:15", arrival: "23:45",
    duration: "1h 30m",
    stops: [],
    aircraft: "Airbus A320",
    prices: { economica: 165000, ejecutiva: 390000 },
    seatsLeft: { economica: 55, ejecutiva: 12 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },

  // ==========================================
  // CARTAGENA (CTG) → BOGOTÁ (BOG) - 6 VUELOS
  // ==========================================
  {
    id: "AV9102",
    flightNumber: "AV 9102",
    origin: "CTG", originCity: "Cartagena", originAirport: "Rafael Núñez Internacional",
    destination: "BOG", destinationCity: "Bogotá", destinationAirport: "El Dorado Internacional",
    departure: "08:30", arrival: "10:00",
    duration: "1h 30m",
    stops: [],
    aircraft: "Airbus A320",
    prices: { economica: 210000, ejecutiva: 470000 },
    seatsLeft: { economica: 12, ejecutiva: 3 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9104",
    flightNumber: "AV 9104",
    origin: "CTG", originCity: "Cartagena", originAirport: "Rafael Núñez Internacional",
    destination: "BOG", destinationCity: "Bogotá", destinationAirport: "El Dorado Internacional",
    departure: "11:45", arrival: "13:15",
    duration: "1h 30m",
    stops: [],
    aircraft: "Airbus A320 NEO",
    prices: { economica: 190000, ejecutiva: 430000 },
    seatsLeft: { economica: 28, ejecutiva: 6 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9106",
    flightNumber: "AV 9106",
    origin: "CTG", originCity: "Cartagena", originAirport: "Rafael Núñez Internacional",
    destination: "BOG", destinationCity: "Bogotá", destinationAirport: "El Dorado Internacional",
    departure: "15:15", arrival: "16:45",
    duration: "1h 30m",
    stops: [],
    aircraft: "Airbus A320",
    prices: { economica: 220000, ejecutiva: 485000 },
    seatsLeft: { economica: 18, ejecutiva: 4 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9108",
    flightNumber: "AV 9108",
    origin: "CTG", originCity: "Cartagena", originAirport: "Rafael Núñez Internacional",
    destination: "BOG", destinationCity: "Bogotá", destinationAirport: "El Dorado Internacional",
    departure: "18:50", arrival: "20:20",
    duration: "1h 30m",
    stops: [],
    aircraft: "Airbus A319",
    prices: { economica: 250000, ejecutiva: 540000 },
    seatsLeft: { economica: 5, ejecutiva: 1 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9110",
    flightNumber: "AV 9110",
    origin: "CTG", originCity: "Cartagena", originAirport: "Rafael Núñez Internacional",
    destination: "BOG", destinationCity: "Bogotá", destinationAirport: "El Dorado Internacional",
    departure: "21:40", arrival: "23:10",
    duration: "1h 30m",
    stops: [],
    aircraft: "Airbus A320 NEO",
    prices: { economica: 175000, ejecutiva: 410000 },
    seatsLeft: { economica: 38, ejecutiva: 9 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9112",
    flightNumber: "AV 9112",
    origin: "CTG", originCity: "Cartagena", originAirport: "Rafael Núñez Internacional",
    destination: "BOG", destinationCity: "Bogotá", destinationAirport: "El Dorado Internacional",
    departure: "23:55", arrival: "01:25",
    duration: "1h 30m",
    stops: [],
    aircraft: "Airbus A320",
    prices: { economica: 140000, ejecutiva: 360000 },
    seatsLeft: { economica: 60, ejecutiva: 12 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },

  // ==========================================
  // MEDELLÍN (MDE) → CARTAGENA (CTG) - 6 VUELOS
  // ==========================================
  {
    id: "AV9201",
    flightNumber: "AV 9201",
    origin: "MDE", originCity: "Medellín", originAirport: "José María Córdova",
    destination: "CTG", destinationCity: "Cartagena", destinationAirport: "Rafael Núñez Internacional",
    departure: "07:00", arrival: "08:10",
    duration: "1h 10m",
    stops: [],
    aircraft: "Airbus A320",
    prices: { economica: 178000, ejecutiva: 395000 },
    seatsLeft: { economica: 10, ejecutiva: 2 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9203",
    flightNumber: "AV 9203",
    origin: "MDE", originCity: "Medellín", originAirport: "José María Córdova",
    destination: "CTG", destinationCity: "Cartagena", destinationAirport: "Rafael Núñez Internacional",
    departure: "10:20", arrival: "11:30",
    duration: "1h 10m",
    stops: [],
    aircraft: "Airbus A319",
    prices: { economica: 195000, ejecutiva: 420000 },
    seatsLeft: { economica: 22, ejecutiva: 5 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9205",
    flightNumber: "AV 9205",
    origin: "MDE", originCity: "Medellín", originAirport: "José María Córdova",
    destination: "CTG", destinationCity: "Cartagena", destinationAirport: "Rafael Núñez Internacional",
    departure: "13:50", arrival: "15:00",
    duration: "1h 10m",
    stops: [],
    aircraft: "Airbus A320 NEO",
    prices: { economica: 165000, ejecutiva: 380000 },
    seatsLeft: { economica: 40, ejecutiva: 8 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9207",
    flightNumber: "AV 9207",
    origin: "MDE", originCity: "Medellín", originAirport: "José María Córdova",
    destination: "CTG", destinationCity: "Cartagena", destinationAirport: "Rafael Núñez Internacional",
    departure: "17:10", arrival: "18:20",
    duration: "1h 10m",
    stops: [],
    aircraft: "Airbus A320",
    prices: { economica: 210000, ejecutiva: 460000 },
    seatsLeft: { economica: 5, ejecutiva: 1 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9209",
    flightNumber: "AV 9209",
    origin: "MDE", originCity: "Medellín", originAirport: "José María Córdova",
    destination: "CTG", destinationCity: "Cartagena", destinationAirport: "Rafael Núñez Internacional",
    departure: "20:25", arrival: "21:35",
    duration: "1h 10m",
    stops: [],
    aircraft: "Airbus A320 NEO",
    prices: { economica: 185000, ejecutiva: 410000 },
    seatsLeft: { economica: 25, ejecutiva: 6 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9211",
    flightNumber: "AV 9211",
    origin: "MDE", originCity: "Medellín", originAirport: "José María Córdova",
    destination: "CTG", destinationCity: "Cartagena", destinationAirport: "Rafael Núñez Internacional",
    departure: "23:00", arrival: "00:10",
    duration: "1h 10m",
    stops: [],
    aircraft: "Airbus A319",
    prices: { economica: 150000, ejecutiva: 340000 },
    seatsLeft: { economica: 48, ejecutiva: 10 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },

  // ==========================================
  // CARTAGENA (CTG) → MEDELLÍN (MDE) - 6 VUELOS
  // ==========================================
  {
    id: "AV9202",
    flightNumber: "AV 9202",
    origin: "CTG", originCity: "Cartagena", originAirport: "Rafael Núñez Internacional",
    destination: "MDE", destinationCity: "Medellín", destinationAirport: "José María Córdova",
    departure: "08:50", arrival: "10:00",
    duration: "1h 10m",
    stops: [],
    aircraft: "Airbus A320",
    prices: { economica: 182000, ejecutiva: 405000 },
    seatsLeft: { economica: 14, ejecutiva: 4 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9204",
    flightNumber: "AV 9204",
    origin: "CTG", originCity: "Cartagena", originAirport: "Rafael Núñez Internacional",
    destination: "MDE", destinationCity: "Medellín", destinationAirport: "José María Córdova",
    departure: "12:10", arrival: "13:20",
    duration: "1h 10m",
    stops: [],
    aircraft: "Airbus A319",
    prices: { economica: 168000, ejecutiva: 375000 },
    seatsLeft: { economica: 30, ejecutiva: 7 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9206",
    flightNumber: "AV 9206",
    origin: "CTG", originCity: "Cartagena", originAirport: "Rafael Núñez Internacional",
    destination: "MDE", destinationCity: "Medellín", destinationAirport: "José María Córdova",
    departure: "15:40", arrival: "16:50",
    duration: "1h 10m",
    stops: [],
    aircraft: "Airbus A320 NEO",
    prices: { economica: 198000, ejecutiva: 435000 },
    seatsLeft: { economica: 20, ejecutiva: 5 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9208",
    flightNumber: "AV 9208",
    origin: "CTG", originCity: "Cartagena", originAirport: "Rafael Núñez Internacional",
    destination: "MDE", destinationCity: "Medellín", destinationAirport: "José María Córdova",
    departure: "19:00", arrival: "20:10",
    duration: "1h 10m",
    stops: [],
    aircraft: "Airbus A320",
    prices: { economica: 225000, ejecutiva: 510000 },
    seatsLeft: { economica: 10, ejecutiva: 2 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9210",
    flightNumber: "AV 9210",
    origin: "CTG", originCity: "Cartagena", originAirport: "Rafael Núñez Internacional",
    destination: "MDE", destinationCity: "Medellín", destinationAirport: "José María Córdova",
    departure: "22:15", arrival: "23:25",
    duration: "1h 10m",
    stops: [],
    aircraft: "Airbus A320 NEO",
    prices: { economica: 172000, ejecutiva: 385000 },
    seatsLeft: { economica: 35, ejecutiva: 8 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9212",
    flightNumber: "AV 9212",
    origin: "CTG", originCity: "Cartagena", originAirport: "Rafael Núñez Internacional",
    destination: "MDE", destinationCity: "Medellín", destinationAirport: "José María Córdova",
    departure: "00:45", arrival: "01:55",
    duration: "1h 10m",
    stops: [],
    aircraft: "Airbus A319",
    prices: { economica: 135000, ejecutiva: 320000 },
    seatsLeft: { economica: 62, ejecutiva: 12 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },

  // ==========================================
  // BOGOTÁ (BOG) → CALI (CLO) - 6 VUELOS
  // ==========================================
  {
    id: "AV9301",
    flightNumber: "AV 9301",
    origin: "BOG", originCity: "Bogotá", originAirport: "El Dorado Internacional",
    destination: "CLO", destinationCity: "Cali", destinationAirport: "Alfonso Bonilla Aragón",
    departure: "06:45", arrival: "07:47",
    duration: "1h 02m",
    stops: [],
    aircraft: "Airbus A320",
    prices: { economica: 155000, ejecutiva: 360000 },
    seatsLeft: { economica: 18, ejecutiva: 5 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9303",
    flightNumber: "AV 9303",
    origin: "BOG", originCity: "Bogotá", originAirport: "El Dorado Internacional",
    destination: "CLO", destinationCity: "Cali", destinationAirport: "Alfonso Bonilla Aragón",
    departure: "09:50", arrival: "10:52",
    duration: "1h 02m",
    stops: [],
    aircraft: "Airbus A320 NEO",
    prices: { economica: 178000, ejecutiva: 395000 },
    seatsLeft: { economica: 30, ejecutiva: 8 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9305",
    flightNumber: "AV 9305",
    origin: "BOG", originCity: "Bogotá", originAirport: "El Dorado Internacional",
    destination: "CLO", destinationCity: "Cali", destinationAirport: "Alfonso Bonilla Aragón",
    departure: "12:55", arrival: "13:57",
    duration: "1h 02m",
    stops: [],
    aircraft: "Airbus A319",
    prices: { economica: 162000, ejecutiva: 375000 },
    seatsLeft: { economica: 25, ejecutiva: 6 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9307",
    flightNumber: "AV 9307",
    origin: "BOG", originCity: "Bogotá", originAirport: "El Dorado Internacional",
    destination: "CLO", destinationCity: "Cali", destinationAirport: "Alfonso Bonilla Aragón",
    departure: "15:30", arrival: "16:32",
    duration: "1h 02m",
    stops: [],
    aircraft: "Airbus A320",
    prices: { economica: 185000, ejecutiva: 410000 },
    seatsLeft: { economica: 12, ejecutiva: 3 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9309",
    flightNumber: "AV 9309",
    origin: "BOG", originCity: "Bogotá", originAirport: "El Dorado Internacional",
    destination: "CLO", destinationCity: "Cali", destinationAirport: "Alfonso Bonilla Aragón",
    departure: "18:40", arrival: "19:42",
    duration: "1h 02m",
    stops: [],
    aircraft: "Airbus A320 NEO",
    prices: { economica: 210000, ejecutiva: 440000 },
    seatsLeft: { economica: 8, ejecutiva: 1 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9311",
    flightNumber: "AV 9311",
    origin: "BOG", originCity: "Bogotá", originAirport: "El Dorado Internacional",
    destination: "CLO", destinationCity: "Cali", destinationAirport: "Alfonso Bonilla Aragón",
    departure: "21:15", arrival: "22:17",
    duration: "1h 02m",
    stops: [],
    aircraft: "Airbus A320",
    prices: { economica: 140000, ejecutiva: 320000 },
    seatsLeft: { economica: 52, ejecutiva: 10 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },

  // ==========================================
  // CALI (CLO) → BOGOTÁ (BOG) - 6 VUELOS
  // ==========================================
  {
    id: "AV9302",
    flightNumber: "AV 9302",
    origin: "CLO", originCity: "Cali", originAirport: "Alfonso Bonilla Aragón",
    destination: "BOG", destinationCity: "Bogotá", destinationAirport: "El Dorado Internacional",
    departure: "08:30", arrival: "09:32",
    duration: "1h 02m",
    stops: [],
    aircraft: "Airbus A320",
    prices: { economica: 165000, ejecutiva: 380000 },
    seatsLeft: { economica: 14, ejecutiva: 4 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9304",
    flightNumber: "AV 9304",
    origin: "CLO", originCity: "Cali", originAirport: "Alfonso Bonilla Aragón",
    destination: "BOG", destinationCity: "Bogotá", destinationAirport: "El Dorado Internacional",
    departure: "11:35", arrival: "12:37",
    duration: "1h 02m",
    stops: [],
    aircraft: "Airbus A320 NEO",
    prices: { economica: 158000, ejecutiva: 350000 },
    seatsLeft: { economica: 32, ejecutiva: 7 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9306",
    flightNumber: "AV 9306",
    origin: "CLO", originCity: "Cali", originAirport: "Alfonso Bonilla Aragón",
    destination: "BOG", destinationCity: "Bogotá", destinationAirport: "El Dorado Internacional",
    departure: "14:40", arrival: "15:42",
    duration: "1h 02m",
    stops: [],
    aircraft: "Airbus A319",
    prices: { economica: 172000, ejecutiva: 390000 },
    seatsLeft: { economica: 20, ejecutiva: 5 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9308",
    flightNumber: "AV 9308",
    origin: "CLO", originCity: "Cali", originAirport: "Alfonso Bonilla Aragón",
    destination: "BOG", destinationCity: "Bogotá", destinationAirport: "El Dorado Internacional",
    departure: "17:15", arrival: "18:17",
    duration: "1h 02m",
    stops: [],
    aircraft: "Airbus A320",
    prices: { economica: 195000, ejecutiva: 425000 },
    seatsLeft: { economica: 10, ejecutiva: 2 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9310",
    flightNumber: "AV 9310",
    origin: "CLO", originCity: "Cali", originAirport: "Alfonso Bonilla Aragón",
    destination: "BOG", destinationCity: "Bogotá", destinationAirport: "El Dorado Internacional",
    departure: "20:25", arrival: "21:27",
    duration: "1h 02m",
    stops: [],
    aircraft: "Airbus A320 NEO",
    prices: { economica: 180000, ejecutiva: 400000 },
    seatsLeft: { economica: 25, ejecutiva: 6 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9312",
    flightNumber: "AV 9312",
    origin: "CLO", originCity: "Cali", originAirport: "Alfonso Bonilla Aragón",
    destination: "BOG", destinationCity: "Bogotá", destinationAirport: "El Dorado Internacional",
    departure: "23:00", arrival: "00:02",
    duration: "1h 02m",
    stops: [],
    aircraft: "Airbus A320",
    prices: { economica: 130000, ejecutiva: 310000 },
    seatsLeft: { economica: 65, ejecutiva: 12 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },

  // ==========================================
  // MEDELLÍN (MDE) → CALI (CLO) - 6 VUELOS
  // ==========================================
  {
    id: "AV9401",
    flightNumber: "AV 9401",
    origin: "MDE", originCity: "Medellín", originAirport: "José María Córdova",
    destination: "CLO", destinationCity: "Cali", destinationAirport: "Alfonso Bonilla Aragón",
    departure: "07:10", arrival: "08:15",
    duration: "1h 05m",
    stops: [],
    aircraft: "Airbus A319",
    prices: { economica: 142000, ejecutiva: 310000 },
    seatsLeft: { economica: 10, ejecutiva: 2 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9403",
    flightNumber: "AV 9403",
    origin: "MDE", originCity: "Medellín", originAirport: "José María Córdova",
    destination: "CLO", destinationCity: "Cali", destinationAirport: "Alfonso Bonilla Aragón",
    departure: "10:15", arrival: "11:20",
    duration: "1h 05m",
    stops: [],
    aircraft: "Airbus A320",
    prices: { economica: 155000, ejecutiva: 335000 },
    seatsLeft: { economica: 28, ejecutiva: 6 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9405",
    flightNumber: "AV 9405",
    origin: "MDE", originCity: "Medellín", originAirport: "José María Córdova",
    destination: "CLO", destinationCity: "Cali", destinationAirport: "Alfonso Bonilla Aragón",
    departure: "13:20", arrival: "14:25",
    duration: "1h 05m",
    stops: [],
    aircraft: "Airbus A320 NEO",
    prices: { economica: 138000, ejecutiva: 295000 },
    seatsLeft: { economica: 42, ejecutiva: 9 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9407",
    flightNumber: "AV 9407",
    origin: "MDE", originCity: "Medellín", originAirport: "José María Córdova",
    destination: "CLO", destinationCity: "Cali", destinationAirport: "Alfonso Bonilla Aragón",
    departure: "16:35", arrival: "17:40",
    duration: "1h 05m",
    stops: [],
    aircraft: "Airbus A320",
    prices: { economica: 165000, ejecutiva: 360000 },
    seatsLeft: { economica: 15, ejecutiva: 3 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9409",
    flightNumber: "AV 9409",
    origin: "MDE", originCity: "Medellín", originAirport: "José María Córdova",
    destination: "CLO", destinationCity: "Cali", destinationAirport: "Alfonso Bonilla Aragón",
    departure: "19:50", arrival: "20:55",
    duration: "1h 05m",
    stops: [],
    aircraft: "Airbus A320 NEO",
    prices: { economica: 172000, ejecutiva: 380000 },
    seatsLeft: { economica: 20, ejecutiva: 4 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9411",
    flightNumber: "AV 9411",
    origin: "MDE", originCity: "Medellín", originAirport: "José María Córdova",
    destination: "CLO", destinationCity: "Cali", destinationAirport: "Alfonso Bonilla Aragón",
    departure: "22:45", arrival: "23:50",
    duration: "1h 05m",
    stops: [],
    aircraft: "Airbus A319",
    prices: { economica: 125000, ejecutiva: 280000 },
    seatsLeft: { economica: 55, ejecutiva: 12 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },

  // ==========================================
  // CALI (CLO) → MEDELLÍN (MDE) - 6 VUELOS
  // ==========================================
  {
    id: "AV9402",
    flightNumber: "AV 9402",
    origin: "CLO", originCity: "Cali", originAirport: "Alfonso Bonilla Aragón",
    destination: "MDE", destinationCity: "Medellín", destinationAirport: "José María Córdova",
    departure: "09:00", arrival: "10:05",
    duration: "1h 05m",
    stops: [],
    aircraft: "Airbus A319",
    prices: { economica: 145000, ejecutiva: 315000 },
    seatsLeft: { economica: 12, ejecutiva: 3 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9404",
    flightNumber: "AV 9404",
    origin: "CLO", originCity: "Cali", originAirport: "Alfonso Bonilla Aragón",
    destination: "MDE", destinationCity: "Medellín", destinationAirport: "José María Córdova",
    departure: "12:05", arrival: "13:10",
    duration: "1h 05m",
    stops: [],
    aircraft: "Airbus A320",
    prices: { economica: 135000, ejecutiva: 290000 },
    seatsLeft: { economica: 35, ejecutiva: 8 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9406",
    flightNumber: "AV 9406",
    origin: "CLO", originCity: "Cali", originAirport: "Alfonso Bonilla Aragón",
    destination: "MDE", destinationCity: "Medellín", destinationAirport: "José María Córdova",
    departure: "15:10", arrival: "16:15",
    duration: "1h 05m",
    stops: [],
    aircraft: "Airbus A320 NEO",
    prices: { economica: 152000, ejecutiva: 340000 },
    seatsLeft: { economica: 18, ejecutiva: 5 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9408",
    flightNumber: "AV 9408",
    origin: "CLO", originCity: "Cali", originAirport: "Alfonso Bonilla Aragón",
    destination: "MDE", destinationCity: "Medellín", destinationAirport: "José María Córdova",
    departure: "18:25", arrival: "19:30",
    duration: "1h 05m",
    stops: [],
    aircraft: "Airbus A320",
    prices: { economica: 168000, ejecutiva: 375000 },
    seatsLeft: { economica: 9, ejecutiva: 2 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9410",
    flightNumber: "AV 9410",
    origin: "CLO", originCity: "Cali", originAirport: "Alfonso Bonilla Aragón",
    destination: "MDE", destinationCity: "Medellín", destinationAirport: "José María Córdova",
    departure: "21:40", arrival: "22:45",
    duration: "1h 05m",
    stops: [],
    aircraft: "Airbus A320 NEO",
    prices: { economica: 150000, ejecutiva: 330000 },
    seatsLeft: { economica: 30, ejecutiva: 6 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9412",
    flightNumber: "AV 9412",
    origin: "CLO", originCity: "Cali", originAirport: "Alfonso Bonilla Aragón",
    destination: "MDE", destinationCity: "Medellín", destinationAirport: "José María Córdova",
    departure: "00:30", arrival: "01:35",
    duration: "1h 05m",
    stops: [],
    aircraft: "Airbus A319",
    prices: { economica: 115000, ejecutiva: 260000 },
    seatsLeft: { economica: 60, ejecutiva: 12 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },

  // ==========================================
  // BOGOTÁ (BOG) ↔ SANTA MARTA (SMR) - 3 VUELOS
  // ==========================================
  {
    id: "AV9501", flightNumber: "AV 9501",
    origin: "BOG", originCity: "Bogotá", originAirport: "El Dorado Internacional",
    destination: "SMR", destinationCity: "Santa Marta", destinationAirport: "Simón Bolívar",
    departure: "07:00", arrival: "08:35", duration: "1h 35m", stops: [], aircraft: "Airbus A320",
    prices: { economica: 195000, ejecutiva: 430000 }, seatsLeft: { economica: 10, ejecutiva: 2 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9502", flightNumber: "AV 9502",
    origin: "SMR", originCity: "Santa Marta", originAirport: "Simón Bolívar",
    destination: "BOG", destinationCity: "Bogotá", destinationAirport: "El Dorado Internacional",
    departure: "09:20", arrival: "10:55", duration: "1h 35m", stops: [], aircraft: "Airbus A320",
    prices: { economica: 185000, ejecutiva: 420000 }, seatsLeft: { economica: 25, ejecutiva: 5 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9503", flightNumber: "AV 9503",
    origin: "BOG", originCity: "Bogotá", originAirport: "El Dorado Internacional",
    destination: "SMR", destinationCity: "Santa Marta", destinationAirport: "Simón Bolívar",
    departure: "13:30", arrival: "15:05", duration: "1h 35m", stops: [], aircraft: "Airbus A320 NEO",
    prices: { economica: 210000, ejecutiva: 450000 }, seatsLeft: { economica: 30, ejecutiva: 6 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9504", flightNumber: "AV 9504",
    origin: "SMR", originCity: "Santa Marta", originAirport: "Simón Bolívar",
    destination: "BOG", destinationCity: "Bogotá", destinationAirport: "El Dorado Internacional",
    departure: "15:50", arrival: "17:25", duration: "1h 35m", stops: [], aircraft: "Airbus A320 NEO",
    prices: { economica: 220000, ejecutiva: 460000 }, seatsLeft: { economica: 12, ejecutiva: 3 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9505", flightNumber: "AV 9505",
    origin: "BOG", originCity: "Bogotá", originAirport: "El Dorado Internacional",
    destination: "SMR", destinationCity: "Santa Marta", destinationAirport: "Simón Bolívar",
    departure: "19:00", arrival: "20:35", duration: "1h 35m", stops: [], aircraft: "Airbus A320",
    prices: { economica: 180000, ejecutiva: 410000 }, seatsLeft: { economica: 15, ejecutiva: 4 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9506", flightNumber: "AV 9506",
    origin: "SMR", originCity: "Santa Marta", originAirport: "Simón Bolívar",
    destination: "BOG", destinationCity: "Bogotá", destinationAirport: "El Dorado Internacional",
    departure: "21:20", arrival: "22:55", duration: "1h 35m", stops: [], aircraft: "Airbus A320",
    prices: { economica: 160000, ejecutiva: 390000 }, seatsLeft: { economica: 40, ejecutiva: 8 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },

  // ==========================================
  // MEDELLÍN (MDE) ↔ SANTA MARTA (SMR) - 3 VUELOS
  // ==========================================
  {
    id: "AV9511", flightNumber: "AV 9511",
    origin: "MDE", originCity: "Medellín", originAirport: "José María Córdova",
    destination: "SMR", destinationCity: "Santa Marta", destinationAirport: "Simón Bolívar",
    departure: "08:00", arrival: "09:15", duration: "1h 15m", stops: [], aircraft: "Airbus A320",
    prices: { economica: 175000, ejecutiva: 380000 }, seatsLeft: { economica: 15, ejecutiva: 4 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9512", flightNumber: "AV 9512",
    origin: "SMR", originCity: "Santa Marta", originAirport: "Simón Bolívar",
    destination: "MDE", destinationCity: "Medellín", destinationAirport: "José María Córdova",
    departure: "10:00", arrival: "11:15", duration: "1h 15m", stops: [], aircraft: "Airbus A320",
    prices: { economica: 180000, ejecutiva: 390000 }, seatsLeft: { economica: 20, ejecutiva: 5 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9513", flightNumber: "AV 9513",
    origin: "MDE", originCity: "Medellín", originAirport: "José María Córdova",
    destination: "SMR", destinationCity: "Santa Marta", destinationAirport: "Simón Bolívar",
    departure: "14:15", arrival: "15:30", duration: "1h 15m", stops: [], aircraft: "Airbus A319",
    prices: { economica: 190000, ejecutiva: 410000 }, seatsLeft: { economica: 10, ejecutiva: 2 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9514", flightNumber: "AV 9514",
    origin: "SMR", originCity: "Santa Marta", originAirport: "Simón Bolívar",
    destination: "MDE", destinationCity: "Medellín", destinationAirport: "José María Córdova",
    departure: "16:15", arrival: "17:30", duration: "1h 15m", stops: [], aircraft: "Airbus A319",
    prices: { economica: 205000, ejecutiva: 430000 }, seatsLeft: { economica: 12, ejecutiva: 3 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9515", flightNumber: "AV 9515",
    origin: "MDE", originCity: "Medellín", originAirport: "José María Córdova",
    destination: "SMR", destinationCity: "Santa Marta", destinationAirport: "Simón Bolívar",
    departure: "20:00", arrival: "21:15", duration: "1h 15m", stops: [], aircraft: "Airbus A320 NEO",
    prices: { economica: 165000, ejecutiva: 360000 }, seatsLeft: { economica: 35, ejecutiva: 8 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9516", flightNumber: "AV 9516",
    origin: "SMR", originCity: "Santa Marta", originAirport: "Simón Bolívar",
    destination: "MDE", destinationCity: "Medellín", destinationAirport: "José María Córdova",
    departure: "22:00", arrival: "23:15", duration: "1h 15m", stops: [], aircraft: "Airbus A320 NEO",
    prices: { economica: 155000, ejecutiva: 340000 }, seatsLeft: { economica: 45, ejecutiva: 10 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },

  // ==========================================
  // BOGOTÁ (BOG) ↔ BARRANQUILLA (BAQ) - 3 VUELOS
  // ==========================================
  {
    id: "AV9521", flightNumber: "AV 9521",
    origin: "BOG", originCity: "Bogotá", originAirport: "El Dorado Internacional",
    destination: "BAQ", destinationCity: "Barranquilla", destinationAirport: "Ernesto Cortissoz",
    departure: "06:30", arrival: "08:05", duration: "1h 35m", stops: [], aircraft: "Airbus A320",
    prices: { economica: 170000, ejecutiva: 400000 }, seatsLeft: { economica: 8, ejecutiva: 3 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9522", flightNumber: "AV 9522",
    origin: "BAQ", originCity: "Barranquilla", originAirport: "Ernesto Cortissoz",
    destination: "BOG", destinationCity: "Bogotá", destinationAirport: "El Dorado Internacional",
    departure: "08:50", arrival: "10:25", duration: "1h 35m", stops: [], aircraft: "Airbus A320",
    prices: { economica: 175000, ejecutiva: 410000 }, seatsLeft: { economica: 14, ejecutiva: 4 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9523", flightNumber: "AV 9523",
    origin: "BOG", originCity: "Bogotá", originAirport: "El Dorado Internacional",
    destination: "BAQ", destinationCity: "Barranquilla", destinationAirport: "Ernesto Cortissoz",
    departure: "12:00", arrival: "13:35", duration: "1h 35m", stops: [], aircraft: "Airbus A321",
    prices: { economica: 185000, ejecutiva: 420000 }, seatsLeft: { economica: 25, ejecutiva: 6 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9524", flightNumber: "AV 9524",
    origin: "BAQ", originCity: "Barranquilla", originAirport: "Ernesto Cortissoz",
    destination: "BOG", destinationCity: "Bogotá", destinationAirport: "El Dorado Internacional",
    departure: "14:20", arrival: "15:55", duration: "1h 35m", stops: [], aircraft: "Airbus A321",
    prices: { economica: 190000, ejecutiva: 430000 }, seatsLeft: { economica: 18, ejecutiva: 5 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9525", flightNumber: "AV 9525",
    origin: "BOG", originCity: "Bogotá", originAirport: "El Dorado Internacional",
    destination: "BAQ", destinationCity: "Barranquilla", destinationAirport: "Ernesto Cortissoz",
    departure: "18:30", arrival: "20:05", duration: "1h 35m", stops: [], aircraft: "Airbus A320 NEO",
    prices: { economica: 200000, ejecutiva: 440000 }, seatsLeft: { economica: 30, ejecutiva: 7 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9526", flightNumber: "AV 9526",
    origin: "BAQ", originCity: "Barranquilla", originAirport: "Ernesto Cortissoz",
    destination: "BOG", destinationCity: "Bogotá", destinationAirport: "El Dorado Internacional",
    departure: "20:50", arrival: "22:25", duration: "1h 35m", stops: [], aircraft: "Airbus A320 NEO",
    prices: { economica: 165000, ejecutiva: 380000 }, seatsLeft: { economica: 45, ejecutiva: 10 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },

  // ==========================================
  // MEDELLÍN (MDE) ↔ BARRANQUILLA (BAQ) - 3 VUELOS
  // ==========================================
  {
    id: "AV9531", flightNumber: "AV 9531",
    origin: "MDE", originCity: "Medellín", originAirport: "José María Córdova",
    destination: "BAQ", destinationCity: "Barranquilla", destinationAirport: "Ernesto Cortissoz",
    departure: "07:30", arrival: "08:45", duration: "1h 15m", stops: [], aircraft: "Airbus A319",
    prices: { economica: 160000, ejecutiva: 360000 }, seatsLeft: { economica: 12, ejecutiva: 3 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9532", flightNumber: "AV 9532",
    origin: "BAQ", originCity: "Barranquilla", originAirport: "Ernesto Cortissoz",
    destination: "MDE", destinationCity: "Medellín", destinationAirport: "José María Córdova",
    departure: "09:30", arrival: "10:45", duration: "1h 15m", stops: [], aircraft: "Airbus A319",
    prices: { economica: 165000, ejecutiva: 370000 }, seatsLeft: { economica: 20, ejecutiva: 4 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9533", flightNumber: "AV 9533",
    origin: "MDE", originCity: "Medellín", originAirport: "José María Córdova",
    destination: "BAQ", destinationCity: "Barranquilla", destinationAirport: "Ernesto Cortissoz",
    departure: "13:00", arrival: "14:15", duration: "1h 15m", stops: [], aircraft: "Airbus A320",
    prices: { economica: 175000, ejecutiva: 390000 }, seatsLeft: { economica: 28, ejecutiva: 6 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9534", flightNumber: "AV 9534",
    origin: "BAQ", originCity: "Barranquilla", originAirport: "Ernesto Cortissoz",
    destination: "MDE", destinationCity: "Medellín", destinationAirport: "José María Córdova",
    departure: "15:00", arrival: "16:15", duration: "1h 15m", stops: [], aircraft: "Airbus A320",
    prices: { economica: 180000, ejecutiva: 400000 }, seatsLeft: { economica: 15, ejecutiva: 2 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9535", flightNumber: "AV 9535",
    origin: "MDE", originCity: "Medellín", originAirport: "José María Córdova",
    destination: "BAQ", destinationCity: "Barranquilla", destinationAirport: "Ernesto Cortissoz",
    departure: "19:45", arrival: "21:00", duration: "1h 15m", stops: [], aircraft: "Airbus A320 NEO",
    prices: { economica: 155000, ejecutiva: 340000 }, seatsLeft: { economica: 40, ejecutiva: 9 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9536", flightNumber: "AV 9536",
    origin: "BAQ", originCity: "Barranquilla", originAirport: "Ernesto Cortissoz",
    destination: "MDE", destinationCity: "Medellín", destinationAirport: "José María Córdova",
    departure: "21:45", arrival: "23:00", duration: "1h 15m", stops: [], aircraft: "Airbus A320 NEO",
    prices: { economica: 150000, ejecutiva: 330000 }, seatsLeft: { economica: 55, ejecutiva: 12 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },

  // ==========================================
  // BOGOTÁ (BOG) ↔ SAN ANDRÉS (ADZ) - 3 VUELOS
  // ==========================================
  {
    id: "AV9541", flightNumber: "AV 9541",
    origin: "BOG", originCity: "Bogotá", originAirport: "El Dorado Internacional",
    destination: "ADZ", destinationCity: "San Andrés", destinationAirport: "Gustavo Rojas Pinilla",
    departure: "08:30", arrival: "10:45", duration: "2h 15m", stops: [], aircraft: "Airbus A320 NEO",
    prices: { economica: 290000, ejecutiva: 600000 }, seatsLeft: { economica: 12, ejecutiva: 4 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9542", flightNumber: "AV 9542",
    origin: "ADZ", originCity: "San Andrés", originAirport: "Gustavo Rojas Pinilla",
    destination: "BOG", destinationCity: "Bogotá", destinationAirport: "El Dorado Internacional",
    departure: "11:30", arrival: "13:45", duration: "2h 15m", stops: [], aircraft: "Airbus A320 NEO",
    prices: { economica: 295000, ejecutiva: 610000 }, seatsLeft: { economica: 25, ejecutiva: 6 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9543", flightNumber: "AV 9543",
    origin: "BOG", originCity: "Bogotá", originAirport: "El Dorado Internacional",
    destination: "ADZ", destinationCity: "San Andrés", destinationAirport: "Gustavo Rojas Pinilla",
    departure: "14:00", arrival: "16:15", duration: "2h 15m", stops: [], aircraft: "Airbus A320",
    prices: { economica: 320000, ejecutiva: 650000 }, seatsLeft: { economica: 5, ejecutiva: 1 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9544", flightNumber: "AV 9544",
    origin: "ADZ", originCity: "San Andrés", originAirport: "Gustavo Rojas Pinilla",
    destination: "BOG", destinationCity: "Bogotá", destinationAirport: "El Dorado Internacional",
    departure: "17:00", arrival: "19:15", duration: "2h 15m", stops: [], aircraft: "Airbus A320",
    prices: { economica: 330000, ejecutiva: 660000 }, seatsLeft: { economica: 10, ejecutiva: 2 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9545", flightNumber: "AV 9545",
    origin: "BOG", originCity: "Bogotá", originAirport: "El Dorado Internacional",
    destination: "ADZ", destinationCity: "San Andrés", destinationAirport: "Gustavo Rojas Pinilla",
    departure: "20:30", arrival: "22:45", duration: "2h 15m", stops: [], aircraft: "Airbus A320 NEO",
    prices: { economica: 270000, ejecutiva: 580000 }, seatsLeft: { economica: 30, ejecutiva: 8 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9546", flightNumber: "AV 9546",
    origin: "ADZ", originCity: "San Andrés", originAirport: "Gustavo Rojas Pinilla",
    destination: "BOG", destinationCity: "Bogotá", destinationAirport: "El Dorado Internacional",
    departure: "23:30", arrival: "01:45", duration: "2h 15m", stops: [], aircraft: "Airbus A320 NEO",
    prices: { economica: 250000, ejecutiva: 550000 }, seatsLeft: { economica: 50, ejecutiva: 12 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },

  // ==========================================
  // MEDELLÍN (MDE) ↔ SAN ANDRÉS (ADZ) - 3 VUELOS
  // ==========================================
  {
    id: "AV9551", flightNumber: "AV 9551",
    origin: "MDE", originCity: "Medellín", originAirport: "José María Córdova",
    destination: "ADZ", destinationCity: "San Andrés", destinationAirport: "Gustavo Rojas Pinilla",
    departure: "09:00", arrival: "10:55", duration: "1h 55m", stops: [], aircraft: "Airbus A320",
    prices: { economica: 260000, ejecutiva: 540000 }, seatsLeft: { economica: 20, ejecutiva: 3 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9552", flightNumber: "AV 9552",
    origin: "ADZ", originCity: "San Andrés", originAirport: "Gustavo Rojas Pinilla",
    destination: "MDE", destinationCity: "Medellín", destinationAirport: "José María Córdova",
    departure: "11:40", arrival: "13:35", duration: "1h 55m", stops: [], aircraft: "Airbus A320",
    prices: { economica: 265000, ejecutiva: 550000 }, seatsLeft: { economica: 15, ejecutiva: 2 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9553", flightNumber: "AV 9553",
    origin: "MDE", originCity: "Medellín", originAirport: "José María Córdova",
    destination: "ADZ", destinationCity: "San Andrés", destinationAirport: "Gustavo Rojas Pinilla",
    departure: "15:15", arrival: "17:10", duration: "1h 55m", stops: [], aircraft: "Airbus A320",
    prices: { economica: 285000, ejecutiva: 580000 }, seatsLeft: { economica: 10, ejecutiva: 2 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9554", flightNumber: "AV 9554",
    origin: "ADZ", originCity: "San Andrés", originAirport: "Gustavo Rojas Pinilla",
    destination: "MDE", destinationCity: "Medellín", destinationAirport: "José María Córdova",
    departure: "17:55", arrival: "19:50", duration: "1h 55m", stops: [], aircraft: "Airbus A320",
    prices: { economica: 295000, ejecutiva: 590000 }, seatsLeft: { economica: 12, ejecutiva: 3 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9555", flightNumber: "AV 9555",
    origin: "MDE", originCity: "Medellín", originAirport: "José María Córdova",
    destination: "ADZ", destinationCity: "San Andrés", destinationAirport: "Gustavo Rojas Pinilla",
    departure: "21:00", arrival: "22:55", duration: "1h 55m", stops: [], aircraft: "Airbus A320 NEO",
    prices: { economica: 245000, ejecutiva: 510000 }, seatsLeft: { economica: 30, ejecutiva: 8 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9556", flightNumber: "AV 9556",
    origin: "ADZ", originCity: "San Andrés", originAirport: "Gustavo Rojas Pinilla",
    destination: "MDE", destinationCity: "Medellín", destinationAirport: "José María Córdova",
    departure: "23:40", arrival: "01:35", duration: "1h 55m", stops: [], aircraft: "Airbus A320 NEO",
    prices: { economica: 230000, ejecutiva: 490000 }, seatsLeft: { economica: 40, ejecutiva: 10 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },

  // ==========================================
  // BARRANQUILLA (BAQ) ↔ CARTAGENA (CTG) - 2 VUELOS
  // ==========================================
  {
    id: "AV9601", flightNumber: "AV 9601",
    origin: "BAQ", originCity: "Barranquilla", originAirport: "Ernesto Cortissoz",
    destination: "CTG", destinationCity: "Cartagena", destinationAirport: "Rafael Núñez Internacional",
    departure: "08:00", arrival: "08:40", duration: "0h 40m", stops: [], aircraft: "ATR 72",
    prices: { economica: 120000, ejecutiva: 0 }, seatsLeft: { economica: 14, ejecutiva: 0 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9602", flightNumber: "AV 9602",
    origin: "CTG", originCity: "Cartagena", originAirport: "Rafael Núñez Internacional",
    destination: "BAQ", destinationCity: "Barranquilla", destinationAirport: "Ernesto Cortissoz",
    departure: "09:30", arrival: "10:10", duration: "0h 40m", stops: [], aircraft: "ATR 72",
    prices: { economica: 115000, ejecutiva: 0 }, seatsLeft: { economica: 20, ejecutiva: 0 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9603", flightNumber: "AV 9603",
    origin: "BAQ", originCity: "Barranquilla", originAirport: "Ernesto Cortissoz",
    destination: "CTG", destinationCity: "Cartagena", destinationAirport: "Rafael Núñez Internacional",
    departure: "17:00", arrival: "17:40", duration: "0h 40m", stops: [], aircraft: "ATR 72",
    prices: { economica: 130000, ejecutiva: 0 }, seatsLeft: { economica: 5, ejecutiva: 0 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9604", flightNumber: "AV 9604",
    origin: "CTG", originCity: "Cartagena", originAirport: "Rafael Núñez Internacional",
    destination: "BAQ", destinationCity: "Barranquilla", destinationAirport: "Ernesto Cortissoz",
    departure: "18:30", arrival: "19:10", duration: "0h 40m", stops: [], aircraft: "ATR 72",
    prices: { economica: 125000, ejecutiva: 0 }, seatsLeft: { economica: 12, ejecutiva: 0 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },

  // ==========================================
  // BARRANQUILLA (BAQ) ↔ CALI (CLO) - 2 VUELOS
  // ==========================================
  {
    id: "AV9631", flightNumber: "AV 9631",
    origin: "BAQ", originCity: "Barranquilla", originAirport: "Ernesto Cortissoz",
    destination: "CLO", destinationCity: "Cali", destinationAirport: "Alfonso Bonilla Aragón",
    departure: "06:15", arrival: "07:50", duration: "1h 35m", stops: [], aircraft: "Airbus A319",
    prices: { economica: 245000, ejecutiva: 510000 }, seatsLeft: { economica: 15, ejecutiva: 4 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9632", flightNumber: "AV 9632",
    origin: "CLO", originCity: "Cali", originAirport: "Alfonso Bonilla Aragón",
    destination: "BAQ", destinationCity: "Barranquilla", destinationAirport: "Ernesto Cortissoz",
    departure: "08:45", arrival: "10:20", duration: "1h 35m", stops: [], aircraft: "Airbus A319",
    prices: { economica: 230000, ejecutiva: 490000 }, seatsLeft: { economica: 20, ejecutiva: 5 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9633", flightNumber: "AV 9633",
    origin: "BAQ", originCity: "Barranquilla", originAirport: "Ernesto Cortissoz",
    destination: "CLO", destinationCity: "Cali", destinationAirport: "Alfonso Bonilla Aragón",
    departure: "17:30", arrival: "19:05", duration: "1h 35m", stops: [], aircraft: "Airbus A319",
    prices: { economica: 260000, ejecutiva: 530000 }, seatsLeft: { economica: 8, ejecutiva: 2 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9634", flightNumber: "AV 9634",
    origin: "CLO", originCity: "Cali", originAirport: "Alfonso Bonilla Aragón",
    destination: "BAQ", destinationCity: "Barranquilla", destinationAirport: "Ernesto Cortissoz",
    departure: "20:00", arrival: "21:35", duration: "1h 35m", stops: [], aircraft: "Airbus A319",
    prices: { economica: 250000, ejecutiva: 515000 }, seatsLeft: { economica: 12, ejecutiva: 3 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },

  // ==========================================
  // CARTAGENA (CTG) ↔ CALI (CLO) - 2 VUELOS
  // ==========================================
  {
    id: "AV9641", flightNumber: "AV 9641",
    origin: "CTG", originCity: "Cartagena", originAirport: "Rafael Núñez Internacional",
    destination: "CLO", destinationCity: "Cali", destinationAirport: "Alfonso Bonilla Aragón",
    departure: "09:15", arrival: "10:45", duration: "1h 30m", stops: [], aircraft: "Airbus A320",
    prices: { economica: 235000, ejecutiva: 495000 }, seatsLeft: { economica: 18, ejecutiva: 4 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9642", flightNumber: "AV 9642",
    origin: "CLO", originCity: "Cali", originAirport: "Alfonso Bonilla Aragón",
    destination: "CTG", destinationCity: "Cartagena", destinationAirport: "Rafael Núñez Internacional",
    departure: "11:30", arrival: "13:00", duration: "1h 30m", stops: [], aircraft: "Airbus A320",
    prices: { economica: 220000, ejecutiva: 470000 }, seatsLeft: { economica: 25, ejecutiva: 6 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9643", flightNumber: "AV 9643",
    origin: "CTG", originCity: "Cartagena", originAirport: "Rafael Núñez Internacional",
    destination: "CLO", destinationCity: "Cali", destinationAirport: "Alfonso Bonilla Aragón",
    departure: "18:45", arrival: "20:15", duration: "1h 30m", stops: [], aircraft: "Airbus A320",
    prices: { economica: 255000, ejecutiva: 520000 }, seatsLeft: { economica: 5, ejecutiva: 1 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9644", flightNumber: "AV 9644",
    origin: "CLO", originCity: "Cali", originAirport: "Alfonso Bonilla Aragón",
    destination: "CTG", destinationCity: "Cartagena", destinationAirport: "Rafael Núñez Internacional",
    departure: "21:00", arrival: "22:30", duration: "1h 30m", stops: [], aircraft: "Airbus A320",
    prices: { economica: 240000, ejecutiva: 500000 }, seatsLeft: { economica: 14, ejecutiva: 3 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },

  // ==========================================
  // BARRANQUILLA (BAQ) ↔ SANTA MARTA (SMR) - 2 VUELOS
  // ==========================================
  {
    id: "AV9611", flightNumber: "AV 9611",
    origin: "BAQ", originCity: "Barranquilla", originAirport: "Ernesto Cortissoz",
    destination: "SMR", destinationCity: "Santa Marta", destinationAirport: "Simón Bolívar",
    departure: "07:15", arrival: "07:55", duration: "0h 40m", stops: [], aircraft: "ATR 72",
    prices: { economica: 110000, ejecutiva: 0 }, seatsLeft: { economica: 18, ejecutiva: 0 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9612", flightNumber: "AV 9612",
    origin: "SMR", originCity: "Santa Marta", originAirport: "Simón Bolívar",
    destination: "BAQ", destinationCity: "Barranquilla", destinationAirport: "Ernesto Cortissoz",
    departure: "08:40", arrival: "09:20", duration: "0h 40m", stops: [], aircraft: "ATR 72",
    prices: { economica: 105000, ejecutiva: 0 }, seatsLeft: { economica: 25, ejecutiva: 0 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9613", flightNumber: "AV 9613",
    origin: "BAQ", originCity: "Barranquilla", originAirport: "Ernesto Cortissoz",
    destination: "SMR", destinationCity: "Santa Marta", destinationAirport: "Simón Bolívar",
    departure: "16:00", arrival: "16:40", duration: "0h 40m", stops: [], aircraft: "ATR 72",
    prices: { economica: 115000, ejecutiva: 0 }, seatsLeft: { economica: 10, ejecutiva: 0 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9614", flightNumber: "AV 9614",
    origin: "SMR", originCity: "Santa Marta", originAirport: "Simón Bolívar",
    destination: "BAQ", destinationCity: "Barranquilla", destinationAirport: "Ernesto Cortissoz",
    departure: "17:30", arrival: "18:10", duration: "0h 40m", stops: [], aircraft: "ATR 72",
    prices: { economica: 110000, ejecutiva: 0 }, seatsLeft: { economica: 15, ejecutiva: 0 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },

  // ==========================================
  // CARTAGENA (CTG) ↔ SANTA MARTA (SMR) - 2 VUELOS
  // ==========================================
  {
    id: "AV9621", flightNumber: "AV 9621",
    origin: "CTG", originCity: "Cartagena", originAirport: "Rafael Núñez Internacional",
    destination: "SMR", destinationCity: "Santa Marta", destinationAirport: "Simón Bolívar",
    departure: "10:00", arrival: "10:45", duration: "0h 45m", stops: [], aircraft: "ATR 72",
    prices: { economica: 125000, ejecutiva: 0 }, seatsLeft: { economica: 22, ejecutiva: 0 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9622", flightNumber: "AV 9622",
    origin: "SMR", originCity: "Santa Marta", originAirport: "Simón Bolívar",
    destination: "CTG", destinationCity: "Cartagena", destinationAirport: "Rafael Núñez Internacional",
    departure: "11:30", arrival: "12:15", duration: "0h 45m", stops: [], aircraft: "ATR 72",
    prices: { economica: 120000, ejecutiva: 0 }, seatsLeft: { economica: 30, ejecutiva: 0 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9623", flightNumber: "AV 9623",
    origin: "CTG", originCity: "Cartagena", originAirport: "Rafael Núñez Internacional",
    destination: "SMR", destinationCity: "Santa Marta", destinationAirport: "Simón Bolívar",
    departure: "19:00", arrival: "19:45", duration: "0h 45m", stops: [], aircraft: "ATR 72",
    prices: { economica: 140000, ejecutiva: 0 }, seatsLeft: { economica: 8, ejecutiva: 0 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9624", flightNumber: "AV 9624",
    origin: "SMR", originCity: "Santa Marta", originAirport: "Simón Bolívar",
    destination: "CTG", destinationCity: "Cartagena", destinationAirport: "Rafael Núñez Internacional",
    departure: "20:30", arrival: "21:15", duration: "0h 45m", stops: [], aircraft: "ATR 72",
    prices: { economica: 135000, ejecutiva: 0 }, seatsLeft: { economica: 12, ejecutiva: 0 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },


  // ─── INTERNACIONALES — SUDAMÉRICA ─────────────────────────────────────────

  // ==========================================
  // BOGOTÁ (BOG) ↔ LIMA (LIM) - 2 VUELOS
  // ==========================================
  {
    id: "AV9701", flightNumber: "AV 9701",
    origin: "BOG", originCity: "Bogotá", originAirport: "El Dorado Internacional",
    destination: "LIM", destinationCity: "Lima", destinationAirport: "Jorge Chávez Internacional",
    departure: "06:15", arrival: "09:25", duration: "3h 10m", stops: [], aircraft: "Airbus A321",
    prices: { economica: 850000, ejecutiva: 1850000 }, seatsLeft: { economica: 15, ejecutiva: 4 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9702", flightNumber: "AV 9702",
    origin: "LIM", originCity: "Lima", originAirport: "Jorge Chávez Internacional",
    destination: "BOG", destinationCity: "Bogotá", destinationAirport: "El Dorado Internacional",
    departure: "10:45", arrival: "14:00", duration: "3h 15m", stops: [], aircraft: "Airbus A321",
    prices: { economica: 820000, ejecutiva: 1780000 }, seatsLeft: { economica: 22, ejecutiva: 5 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9703", flightNumber: "AV 9703",
    origin: "BOG", originCity: "Bogotá", originAirport: "El Dorado Internacional",
    destination: "LIM", destinationCity: "Lima", destinationAirport: "Jorge Chávez Internacional",
    departure: "15:20", arrival: "18:30", duration: "3h 10m", stops: [], aircraft: "Airbus A320 NEO",
    prices: { economica: 920000, ejecutiva: 1950000 }, seatsLeft: { economica: 10, ejecutiva: 2 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9704", flightNumber: "AV 9704",
    origin: "LIM", originCity: "Lima", originAirport: "Jorge Chávez Internacional",
    destination: "BOG", destinationCity: "Bogotá", destinationAirport: "El Dorado Internacional",
    departure: "19:45", arrival: "23:00", duration: "3h 15m", stops: [], aircraft: "Airbus A320 NEO",
    prices: { economica: 890000, ejecutiva: 1820000 }, seatsLeft: { economica: 30, ejecutiva: 6 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },

  // ==========================================
  // MEDELLÍN (MDE) ↔ LIMA (LIM) - ESCALA BOG - 2 VUELOS
  // ==========================================
  {
    id: "AV9711", flightNumber: "AV 9711",
    origin: "MDE", originCity: "Medellín", originAirport: "José María Córdova",
    destination: "LIM", destinationCity: "Lima", destinationAirport: "Jorge Chávez Internacional",
    departure: "04:30", arrival: "09:25", duration: "4h 55m", aircraft: "Airbus A320",
    prices: { economica: 950000, ejecutiva: 2100000 }, seatsLeft: { economica: 8, ejecutiva: 1 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"],
    stops: [
      {
        airport: "El Dorado Internacional",
        city: "Bogotá",
        code: "BOG",
        arrival: "05:25",   // Llega de MDE
        departure: "06:15", // Sale hacia LIM (Mismo que AV9701)
        layover: "0h 50m"
      }
    ]
  },
  {
    id: "AV9712", flightNumber: "AV 9712",
    origin: "LIM", originCity: "Lima", originAirport: "Jorge Chávez Internacional",
    destination: "MDE", destinationCity: "Medellín", destinationAirport: "José María Córdova",
    departure: "10:45", arrival: "16:10", duration: "5h 25m", aircraft: "Airbus A321",
    prices: { economica: 930000, ejecutiva: 2050000 }, seatsLeft: { economica: 14, ejecutiva: 3 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"],
    stops: [
      {
        airport: "El Dorado Internacional",
        city: "Bogotá",
        code: "BOG",
        arrival: "14:00",   // Llega de LIM (Mismo que AV9702)
        departure: "15:20", // Sale hacia MDE
        layover: "1h 20m"
      }
    ]
  },
  {
    id: "AV9713", flightNumber: "AV 9713",
    origin: "MDE", originCity: "Medellín", originAirport: "José María Córdova",
    destination: "LIM", destinationCity: "Lima", destinationAirport: "Jorge Chávez Internacional",
    departure: "12:15", arrival: "18:30", duration: "6h 15m", aircraft: "Airbus A320 NEO",
    prices: { economica: 1050000, ejecutiva: 2250000 }, seatsLeft: { economica: 5, ejecutiva: 0 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"],
    stops: [
      {
        airport: "El Dorado Internacional",
        city: "Bogotá",
        code: "BOG",
        arrival: "13:10",   // Llega de MDE
        departure: "15:20", // Sale hacia LIM (Mismo que AV9703)
        layover: "2h 10m"
      }
    ]
  },
  {
    id: "AV9714", flightNumber: "AV 9714",
    origin: "LIM", originCity: "Lima", originAirport: "Jorge Chávez Internacional",
    destination: "MDE", destinationCity: "Medellín", destinationAirport: "José María Córdova",
    departure: "19:45", arrival: "01:25", duration: "5h 40m", aircraft: "Airbus A320 NEO",
    prices: { economica: 980000, ejecutiva: 2120000 }, seatsLeft: { economica: 20, ejecutiva: 4 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"],
    stops: [
      {
        airport: "El Dorado Internacional",
        city: "Bogotá",
        code: "BOG",
        arrival: "23:00",   // Llega de LIM (Mismo que AV9704)
        departure: "00:30", // Sale hacia MDE al día siguiente
        layover: "1h 30m"
      }
    ]
  },

  // ==========================================
  // BOGOTÁ (BOG) ↔ SÃO PAULO (GRU) - 2 VUELOS
  // ==========================================
  {
    id: "AV9801", flightNumber: "AV 9801",
    origin: "BOG", originCity: "Bogotá", originAirport: "El Dorado Internacional",
    destination: "GRU", destinationCity: "São Paulo", destinationAirport: "Guarulhos Internacional",
    departure: "07:30", arrival: "15:40", duration: "6h 10m", stops: [], aircraft: "Airbus A330",
    prices: { economica: 1250000, ejecutiva: 2850000 }, seatsLeft: { economica: 20, ejecutiva: 5 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9802", flightNumber: "AV 9802",
    origin: "GRU", originCity: "São Paulo", originAirport: "Guarulhos Internacional",
    destination: "BOG", destinationCity: "Bogotá", destinationAirport: "El Dorado Internacional",
    departure: "17:00", arrival: "21:15", duration: "6h 15m", stops: [], aircraft: "Airbus A330",
    prices: { economica: 1200000, ejecutiva: 2780000 }, seatsLeft: { economica: 15, ejecutiva: 3 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },

  // ==========================================
  // MEDELLÍN (MDE) ↔ SÃO PAULO (GRU) - ESCALA BOG - 2 VUELOS
  // ==========================================
  {
    id: "AV9811", flightNumber: "AV 9811",
    origin: "MDE", originCity: "Medellín", originAirport: "José María Córdova",
    destination: "GRU", destinationCity: "São Paulo", destinationAirport: "Guarulhos Internacional",
    departure: "05:15", arrival: "15:40", duration: "8h 25m", aircraft: "Airbus A320",
    prices: { economica: 1350000, ejecutiva: 3100000 }, seatsLeft: { economica: 10, ejecutiva: 2 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"],
    stops: [
      {
        airport: "El Dorado Internacional",
        city: "Bogotá",
        code: "BOG",
        arrival: "06:10",
        departure: "07:30",
        layover: "1h 20m"
      }
    ]
  },
  {
    id: "AV9812", flightNumber: "AV 9812",
    origin: "GRU", originCity: "São Paulo", originAirport: "Guarulhos Internacional",
    destination: "MDE", destinationCity: "Medellín", destinationAirport: "José María Córdova",
    departure: "17:00", arrival: "23:55", duration: "8h 55m", aircraft: "Airbus A320",
    prices: { economica: 1300000, ejecutiva: 3050000 }, seatsLeft: { economica: 12, ejecutiva: 1 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"],
    stops: [
      {
        airport: "El Dorado Internacional",
        city: "Bogotá",
        code: "BOG",
        arrival: "21:15",
        departure: "22:50",
        layover: "1h 35m"
      }
    ]
  },

  // ==========================================
  // BOGOTÁ (BOG) ↔ RÍO DE JANEIRO (GIG) - 2 VUELOS
  // ==========================================
  {
    id: "AV9821", flightNumber: "AV 9821",
    origin: "BOG", originCity: "Bogotá", originAirport: "El Dorado Internacional",
    destination: "GIG", destinationCity: "Río de Janeiro", destinationAirport: "Galeão Internacional",
    departure: "08:00", arrival: "16:20", duration: "6h 20m", stops: [], aircraft: "Airbus A320 NEO",
    prices: { economica: 1320000, ejecutiva: 2950000 }, seatsLeft: { economica: 18, ejecutiva: 4 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9822", flightNumber: "AV 9822",
    origin: "GIG", originCity: "Río de Janeiro", originAirport: "Galeão Internacional",
    destination: "BOG", destinationCity: "Bogotá", destinationAirport: "El Dorado Internacional",
    departure: "18:00", arrival: "22:30", duration: "6h 30m", stops: [], aircraft: "Airbus A320 NEO",
    prices: { economica: 1280000, ejecutiva: 2880000 }, seatsLeft: { economica: 22, ejecutiva: 5 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },

  // ==========================================
  // MEDELLÍN (MDE) ↔ RÍO DE JANEIRO (GIG) - ESCALA BOG - 2 VUELOS
  // ==========================================
  {
    id: "AV9831", flightNumber: "AV 9831",
    origin: "MDE", originCity: "Medellín", originAirport: "José María Córdova",
    destination: "GIG", destinationCity: "Río de Janeiro", destinationAirport: "Galeão Internacional",
    departure: "05:45", arrival: "16:20", duration: "8h 35m", aircraft: "Airbus A320",
    prices: { economica: 1420000, ejecutiva: 3250000 }, seatsLeft: { economica: 5, ejecutiva: 1 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"],
    stops: [
      {
        airport: "El Dorado Internacional",
        city: "Bogotá",
        code: "BOG",
        arrival: "06:40",
        departure: "08:00",
        layover: "1h 20m"
      }
    ]
  },
  {
    id: "AV9832", flightNumber: "AV 9832",
    origin: "GIG", originCity: "Río de Janeiro", originAirport: "Galeão Internacional",
    destination: "MDE", destinationCity: "Medellín", destinationAirport: "José María Córdova",
    departure: "18:00", arrival: "01:10", duration: "9h 10m", aircraft: "Airbus A320 NEO",
    prices: { economica: 1380000, ejecutiva: 3180000 }, seatsLeft: { economica: 15, ejecutiva: 2 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"],
    stops: [
      {
        airport: "El Dorado Internacional",
        city: "Bogotá",
        code: "BOG",
        arrival: "22:30",
        departure: "00:15",
        layover: "1h 45m"
      }
    ]
  },

  // ==========================================
  // BOGOTÁ (BOG) ↔ SANTIAGO (SCL) - 2 VUELOS
  // ==========================================
  {
    id: "AV9921", flightNumber: "AV 9921",
    origin: "BOG", originCity: "Bogotá", originAirport: "El Dorado Internacional",
    destination: "SCL", destinationCity: "Santiago", destinationAirport: "Arturo Merino Benítez",
    departure: "09:30", arrival: "17:15", duration: "5h 45m", stops: [], aircraft: "Boeing 787-8",
    prices: { economica: 1150000, ejecutiva: 2750000 }, seatsLeft: { economica: 20, ejecutiva: 6 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9922", flightNumber: "AV 9922",
    origin: "SCL", originCity: "Santiago", originAirport: "Arturo Merino Benítez",
    destination: "BOG", destinationCity: "Bogotá", destinationAirport: "El Dorado Internacional",
    departure: "18:45", arrival: "22:35", duration: "5h 50m", stops: [], aircraft: "Boeing 787-8",
    prices: { economica: 1080000, ejecutiva: 2600000 }, seatsLeft: { economica: 12, ejecutiva: 2 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },

  // ==========================================
  // MEDELLÍN (MDE) ↔ SANTIAGO (SCL) - DIRECTO (1 VUELO)
  // ==========================================
  {
    id: "AV9931", flightNumber: "AV 9931",
    origin: "MDE", originCity: "Medellín", originAirport: "José María Córdova",
    destination: "SCL", destinationCity: "Santiago", destinationAirport: "Arturo Merino Benítez",
    departure: "16:45", arrival: "00:30", duration: "5h 45m", stops: [], aircraft: "Airbus A320",
    prices: { economica: 1250000, ejecutiva: 2950000 }, seatsLeft: { economica: 10, ejecutiva: 2 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9932", flightNumber: "AV 9932",
    origin: "SCL", originCity: "Santiago", originAirport: "Arturo Merino Benítez",
    destination: "MDE", destinationCity: "Medellín", destinationAirport: "José María Córdova",
    departure: "01:50", arrival: "07:35", duration: "5h 45m", stops: [], aircraft: "Airbus A320",
    prices: { economica: 1180000, ejecutiva: 2800000 }, seatsLeft: { economica: 15, ejecutiva: 3 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },

  // ==========================================
  // BOGOTÁ (BOG) ↔ BUENOS AIRES (EZE) - 2 VUELOS
  // ==========================================
  {
    id: "AV9901", flightNumber: "AV 9901",
    origin: "BOG", originCity: "Bogotá", originAirport: "El Dorado Internacional",
    destination: "EZE", destinationCity: "Buenos Aires", destinationAirport: "Ezeiza Internacional",
    departure: "06:40", arrival: "15:05", duration: "6h 25m", stops: [], aircraft: "Boeing 787-8",
    prices: { economica: 1550000, ejecutiva: 3450000 }, seatsLeft: { economica: 25, ejecutiva: 8 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9902", flightNumber: "AV 9902",
    origin: "EZE", originCity: "Buenos Aires", originAirport: "Ezeiza Internacional",
    destination: "BOG", destinationCity: "Bogotá", destinationAirport: "El Dorado Internacional",
    departure: "16:50", arrival: "21:20", duration: "6h 30m", stops: [], aircraft: "Boeing 787-8",
    prices: { economica: 1480000, ejecutiva: 3200000 }, seatsLeft: { economica: 15, ejecutiva: 4 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },

  // ==========================================
  // MEDELLÍN (MDE) ↔ BUENOS AIRES (EZE) - DIRECTO (1 VUELO)
  // ==========================================
  // ==========================================
  // MEDELLÍN (MDE) ↔ BUENOS AIRES (AEP) - DIRECTO (1 VUELO)
  // ==========================================
  {
    id: "AV9915", flightNumber: "AV 9915",
    origin: "MDE", originCity: "Medellín", originAirport: "José María Córdova",
    destination: "AEP", destinationCity: "Buenos Aires", destinationAirport: "Aeroparque Jorge Newbery",
    departure: "17:30", arrival: "01:55", duration: "6h 25m", stops: [], aircraft: "Airbus A320 NEO",
    prices: { economica: 1680000, ejecutiva: 3650000 }, seatsLeft: { economica: 10, ejecutiva: 2 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9916", flightNumber: "AV 9916",
    origin: "AEP", originCity: "Buenos Aires", originAirport: "Aeroparque Jorge Newbery",
    destination: "MDE", destinationCity: "Medellín", destinationAirport: "José María Córdova",
    departure: "03:15", arrival: "09:40", duration: "6h 25m", stops: [], aircraft: "Airbus A320 NEO",
    prices: { economica: 1620000, ejecutiva: 3400000 }, seatsLeft: { economica: 15, ejecutiva: 3 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },

  // ─── INTERNACIONALES — NORTEAMÉRICA / MÉXICO ──────────────────────────────

  // ==========================================
  // BOGOTÁ (BOG) ↔ MIAMI (MIA) - 3 VUELOS
  // ==========================================
  {
    id: "AV9101", flightNumber: "AV 9101",
    origin: "BOG", originCity: "Bogotá", originAirport: "El Dorado Internacional",
    destination: "MIA", destinationCity: "Miami", destinationAirport: "Miami Internacional",
    departure: "06:00", arrival: "10:50", duration: "3h 50m", stops: [], aircraft: "Airbus A320 NEO",
    prices: { economica: 950000, ejecutiva: 2100000 }, seatsLeft: { economica: 12, ejecutiva: 4 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9102", flightNumber: "AV 9102",
    origin: "MIA", originCity: "Miami", originAirport: "Miami Internacional",
    destination: "BOG", destinationCity: "Bogotá", destinationAirport: "El Dorado Internacional",
    departure: "12:30", arrival: "15:10", duration: "3h 40m", stops: [], aircraft: "Airbus A320 NEO",
    prices: { economica: 920000, ejecutiva: 1980000 }, seatsLeft: { economica: 20, ejecutiva: 5 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9103", flightNumber: "AV 9103",
    origin: "BOG", originCity: "Bogotá", originAirport: "El Dorado Internacional",
    destination: "MIA", destinationCity: "Miami", destinationAirport: "Miami Internacional",
    departure: "14:15", arrival: "19:05", duration: "3h 50m", stops: [], aircraft: "Boeing 787-8",
    prices: { economica: 1100000, ejecutiva: 2450000 }, seatsLeft: { economica: 35, ejecutiva: 10 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9104", flightNumber: "AV 9104",
    origin: "MIA", originCity: "Miami", originAirport: "Miami Internacional",
    destination: "BOG", destinationCity: "Bogotá", destinationAirport: "El Dorado Internacional",
    departure: "21:00", arrival: "23:40", duration: "3h 40m", stops: [], aircraft: "Boeing 787-8",
    prices: { economica: 1050000, ejecutiva: 2300000 }, seatsLeft: { economica: 15, ejecutiva: 6 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9105", flightNumber: "AV 9105",
    origin: "BOG", originCity: "Bogotá", originAirport: "El Dorado Internacional",
    destination: "MIA", destinationCity: "Miami", destinationAirport: "Miami Internacional",
    departure: "22:30", arrival: "03:20", duration: "3h 50m", stops: [], aircraft: "Airbus A320",
    prices: { economica: 850000, ejecutiva: 1850000 }, seatsLeft: { economica: 45, ejecutiva: 8 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9106", flightNumber: "AV 9106",
    origin: "MIA", originCity: "Miami", originAirport: "Miami Internacional",
    destination: "BOG", destinationCity: "Bogotá", destinationAirport: "El Dorado Internacional",
    departure: "05:00", arrival: "07:40", duration: "3h 40m", stops: [], aircraft: "Airbus A320",
    prices: { economica: 820000, ejecutiva: 1750000 }, seatsLeft: { economica: 60, ejecutiva: 12 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },

  // ==========================================
  // MEDELLÍN (MDE) ↔ MIAMI (MIA) - DIRECTO (2 VUELOS)
  // ==========================================
  {
    id: "AV9111", flightNumber: "AV 9111",
    origin: "MDE", originCity: "Medellín", originAirport: "José María Córdova",
    destination: "MIA", destinationCity: "Miami", destinationAirport: "Miami Internacional",
    departure: "08:30", arrival: "12:45", duration: "3h 15m", stops: [], aircraft: "Airbus A320 NEO",
    prices: { economica: 1020000, ejecutiva: 2200000 }, seatsLeft: { economica: 14, ejecutiva: 3 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9112", flightNumber: "AV 9112",
    origin: "MIA", originCity: "Miami", originAirport: "Miami Internacional",
    destination: "MDE", destinationCity: "Medellín", destinationAirport: "José María Córdova",
    departure: "14:30", arrival: "16:45", duration: "3h 15m", stops: [], aircraft: "Airbus A320 NEO",
    prices: { economica: 980000, ejecutiva: 2150000 }, seatsLeft: { economica: 18, ejecutiva: 2 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9113", flightNumber: "AV 9113",
    origin: "MDE", originCity: "Medellín", originAirport: "José María Córdova",
    destination: "MIA", destinationCity: "Miami", destinationAirport: "Miami Internacional",
    departure: "17:15", arrival: "21:30", duration: "3h 15m", stops: [], aircraft: "Airbus A320",
    prices: { economica: 950000, ejecutiva: 2050000 }, seatsLeft: { economica: 22, ejecutiva: 4 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9114", flightNumber: "AV 9114",
    origin: "MIA", originCity: "Miami", originAirport: "Miami Internacional",
    destination: "MDE", destinationCity: "Medellín", destinationAirport: "José María Córdova",
    departure: "23:00", arrival: "01:15", duration: "3h 15m", stops: [], aircraft: "Airbus A320",
    prices: { economica: 890000, ejecutiva: 1900000 }, seatsLeft: { economica: 30, ejecutiva: 6 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },

  // ==========================================
  // BOGOTÁ (BOG) ↔ NUEVA YORK (JFK) - 3 VUELOS
  // ==========================================
  {
    id: "AV9121", flightNumber: "AV 9121",
    origin: "BOG", originCity: "Bogotá", originAirport: "El Dorado Internacional",
    destination: "JFK", destinationCity: "Nueva York", destinationAirport: "John F. Kennedy Internacional",
    departure: "07:15", arrival: "14:15", duration: "6h 00m", stops: [], aircraft: "Boeing 787-8",
    prices: { economica: 1450000, ejecutiva: 3100000 }, seatsLeft: { economica: 10, ejecutiva: 2 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9122", flightNumber: "AV 9122",
    origin: "JFK", originCity: "Nueva York", originAirport: "John F. Kennedy Internacional",
    destination: "BOG", destinationCity: "Bogotá", destinationAirport: "El Dorado Internacional",
    departure: "16:30", arrival: "21:30", duration: "6h 00m", stops: [], aircraft: "Boeing 787-8",
    prices: { economica: 1380000, ejecutiva: 2950000 }, seatsLeft: { economica: 15, ejecutiva: 3 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9123", flightNumber: "AV 9123",
    origin: "BOG", originCity: "Bogotá", originAirport: "El Dorado Internacional",
    destination: "JFK", destinationCity: "Nueva York", destinationAirport: "John F. Kennedy Internacional",
    departure: "15:00", arrival: "22:00", duration: "6h 00m", stops: [], aircraft: "Airbus A321",
    prices: { economica: 1250000, ejecutiva: 2800000 }, seatsLeft: { economica: 25, ejecutiva: 5 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9124", flightNumber: "AV 9124",
    origin: "JFK", originCity: "Nueva York", originAirport: "John F. Kennedy Internacional",
    destination: "BOG", destinationCity: "Bogotá", destinationAirport: "El Dorado Internacional",
    departure: "23:55", arrival: "04:55", duration: "6h 00m", stops: [], aircraft: "Airbus A321",
    prices: { economica: 1180000, ejecutiva: 2650000 }, seatsLeft: { economica: 40, ejecutiva: 10 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9125", flightNumber: "AV 9125",
    origin: "BOG", originCity: "Bogotá", originAirport: "El Dorado Internacional",
    destination: "JFK", destinationCity: "Nueva York", destinationAirport: "John F. Kennedy Internacional",
    departure: "23:15", arrival: "06:15", duration: "6h 00m", stops: [], aircraft: "Airbus A320 NEO",
    prices: { economica: 1100000, ejecutiva: 2450000 }, seatsLeft: { economica: 30, ejecutiva: 4 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9126", flightNumber: "AV 9126",
    origin: "JFK", originCity: "Nueva York", originAirport: "John F. Kennedy Internacional",
    destination: "BOG", destinationCity: "Bogotá", destinationAirport: "El Dorado Internacional",
    departure: "08:00", arrival: "13:00", duration: "6h 00m", stops: [], aircraft: "Airbus A320 NEO",
    prices: { economica: 1050000, ejecutiva: 2350000 }, seatsLeft: { economica: 50, ejecutiva: 8 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },

  // ==========================================
  // MEDELLÍN (MDE) ↔ NUEVA YORK (JFK) - DIRECTO (2 VUELOS)
  // ==========================================
  {
    id: "AV9131", flightNumber: "AV 9131",
    origin: "MDE", originCity: "Medellín", originAirport: "José María Córdova",
    destination: "JFK", destinationCity: "Nueva York", destinationAirport: "John F. Kennedy Internacional",
    departure: "09:45", arrival: "16:15", duration: "5h 30m", stops: [], aircraft: "Airbus A320 NEO",
    prices: { economica: 1350000, ejecutiva: 2950000 }, seatsLeft: { economica: 12, ejecutiva: 2 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9132", flightNumber: "AV 9132",
    origin: "JFK", originCity: "Nueva York", originAirport: "John F. Kennedy Internacional",
    destination: "MDE", destinationCity: "Medellín", destinationAirport: "José María Córdova",
    departure: "18:00", arrival: "22:30", duration: "5h 30m", stops: [], aircraft: "Airbus A320 NEO",
    prices: { economica: 1300000, ejecutiva: 2850000 }, seatsLeft: { economica: 15, ejecutiva: 3 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9133", flightNumber: "AV 9133",
    origin: "MDE", originCity: "Medellín", originAirport: "José María Córdova",
    destination: "JFK", destinationCity: "Nueva York", destinationAirport: "John F. Kennedy Internacional",
    departure: "22:00", arrival: "04:30", duration: "5h 30m", stops: [], aircraft: "Airbus A320",
    prices: { economica: 1150000, ejecutiva: 2600000 }, seatsLeft: { economica: 25, ejecutiva: 5 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9134", flightNumber: "AV 9134",
    origin: "JFK", originCity: "Nueva York", originAirport: "John F. Kennedy Internacional",
    destination: "MDE", destinationCity: "Medellín", destinationAirport: "José María Córdova",
    departure: "06:00", arrival: "10:30", duration: "5h 30m", stops: [], aircraft: "Airbus A320",
    prices: { economica: 1100000, ejecutiva: 2500000 }, seatsLeft: { economica: 40, ejecutiva: 7 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },

  // ==========================================
  // BOGOTÁ (BOG) ↔ ORLANDO (MCO) - 3 VUELOS
  // ==========================================
  {
    id: "AV9201", flightNumber: "AV 9201",
    origin: "BOG", originCity: "Bogotá", originAirport: "El Dorado Internacional",
    destination: "MCO", destinationCity: "Orlando", destinationAirport: "Orlando Internacional",
    departure: "05:45", arrival: "10:35", duration: "3h 50m", stops: [], aircraft: "Airbus A321",
    prices: { economica: 980000, ejecutiva: 2200000 }, seatsLeft: { economica: 5, ejecutiva: 1 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9202", flightNumber: "AV 9202",
    origin: "MCO", originCity: "Orlando", originAirport: "Orlando Internacional",
    destination: "BOG", destinationCity: "Bogotá", destinationAirport: "El Dorado Internacional",
    departure: "12:15", arrival: "15:05", duration: "3h 50m", stops: [], aircraft: "Airbus A321",
    prices: { economica: 940000, ejecutiva: 2050000 }, seatsLeft: { economica: 18, ejecutiva: 4 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9203", flightNumber: "AV 9203",
    origin: "BOG", originCity: "Bogotá", originAirport: "El Dorado Internacional",
    destination: "MCO", destinationCity: "Orlando", destinationAirport: "Orlando Internacional",
    departure: "13:30", arrival: "18:20", duration: "3h 50m", stops: [], aircraft: "Airbus A320 NEO",
    prices: { economica: 1150000, ejecutiva: 2400000 }, seatsLeft: { economica: 25, ejecutiva: 6 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9204", flightNumber: "AV 9204",
    origin: "MCO", originCity: "Orlando", originAirport: "Orlando Internacional",
    destination: "BOG", destinationCity: "Bogotá", destinationAirport: "El Dorado Internacional",
    departure: "19:50", arrival: "22:40", duration: "3h 50m", stops: [], aircraft: "Airbus A320 NEO",
    prices: { economica: 1080000, ejecutiva: 2250000 }, seatsLeft: { economica: 12, ejecutiva: 3 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9205", flightNumber: "AV 9205",
    origin: "BOG", originCity: "Bogotá", originAirport: "El Dorado Internacional",
    destination: "MCO", destinationCity: "Orlando", destinationAirport: "Orlando Internacional",
    departure: "22:15", arrival: "03:05", duration: "3h 50m", stops: [], aircraft: "Airbus A320",
    prices: { economica: 880000, ejecutiva: 1950000 }, seatsLeft: { economica: 40, ejecutiva: 8 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9206", flightNumber: "AV 9206",
    origin: "MCO", originCity: "Orlando", originAirport: "Orlando Internacional",
    destination: "BOG", destinationCity: "Bogotá", destinationAirport: "El Dorado Internacional",
    departure: "04:40", arrival: "07:30", duration: "3h 50m", stops: [], aircraft: "Airbus A320",
    prices: { economica: 850000, ejecutiva: 1800000 }, seatsLeft: { economica: 55, ejecutiva: 12 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },

  // ==========================================
  // MEDELLÍN (MDE) ↔ ORLANDO (MCO) - DIRECTO (1 VUELO)
  // ==========================================
  {
    id: "AV9211", flightNumber: "AV 9211",
    origin: "MDE", originCity: "Medellín", originAirport: "José María Córdova",
    destination: "MCO", destinationCity: "Orlando", destinationAirport: "Orlando Internacional",
    departure: "09:15", arrival: "13:30", duration: "3h 15m", stops: [], aircraft: "Airbus A320 NEO",
    prices: { economica: 1120000, ejecutiva: 2350000 }, seatsLeft: { economica: 10, ejecutiva: 2 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9212", flightNumber: "AV 9212",
    origin: "MCO", originCity: "Orlando", originAirport: "Orlando Internacional",
    destination: "MDE", destinationCity: "Medellín", destinationAirport: "José María Córdova",
    departure: "15:00", arrival: "17:15", duration: "3h 15m", stops: [], aircraft: "Airbus A320 NEO",
    prices: { economica: 1050000, ejecutiva: 2150000 }, seatsLeft: { economica: 15, ejecutiva: 3 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },

  // ==========================================
  // BOGOTÁ (BOG) ↔ TAMPA (TPA) - 2 VUELOS
  // ==========================================
  {
    id: "AV9221", flightNumber: "AV 9221",
    origin: "BOG", originCity: "Bogotá", originAirport: "El Dorado Internacional",
    destination: "TPA", destinationCity: "Tampa", destinationAirport: "Tampa Internacional",
    departure: "08:15", arrival: "13:20", duration: "4h 05m", stops: [], aircraft: "Airbus A320 NEO",
    prices: { economica: 1100000, ejecutiva: 2300000 }, seatsLeft: { economica: 15, ejecutiva: 4 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9222", flightNumber: "AV 9222",
    origin: "TPA", originCity: "Tampa", originAirport: "Tampa Internacional",
    destination: "BOG", destinationCity: "Bogotá", destinationAirport: "El Dorado Internacional",
    departure: "14:50", arrival: "17:55", duration: "4h 05m", stops: [], aircraft: "Airbus A320 NEO",
    prices: { economica: 1050000, ejecutiva: 2180000 }, seatsLeft: { economica: 22, ejecutiva: 5 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9223", flightNumber: "AV 9223",
    origin: "BOG", originCity: "Bogotá", originAirport: "El Dorado Internacional",
    destination: "TPA", destinationCity: "Tampa", destinationAirport: "Tampa Internacional",
    departure: "23:00", arrival: "04:05", duration: "4h 05m", stops: [], aircraft: "Airbus A320",
    prices: { economica: 920000, ejecutiva: 1950000 }, seatsLeft: { economica: 35, ejecutiva: 6 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9224", flightNumber: "AV 9224",
    origin: "TPA", originCity: "Tampa", originAirport: "Tampa Internacional",
    destination: "BOG", destinationCity: "Bogotá", destinationAirport: "El Dorado Internacional",
    departure: "05:45", arrival: "08:50", duration: "4h 05m", stops: [], aircraft: "Airbus A320",
    prices: { economica: 890000, ejecutiva: 1850000 }, seatsLeft: { economica: 45, ejecutiva: 10 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },

  // ==========================================
  // MEDELLÍN (MDE) ↔ TAMPA (TPA) - DIRECTO (1 VUELO)
  // ==========================================
  {
    id: "AV9231", flightNumber: "AV 9231",
    origin: "MDE", originCity: "Medellín", originAirport: "José María Córdova",
    destination: "TPA", destinationCity: "Tampa", destinationAirport: "Tampa Internacional",
    departure: "11:30", arrival: "16:00", duration: "3h 30m", stops: [], aircraft: "Airbus A320",
    prices: { economica: 1250000, ejecutiva: 2500000 }, seatsLeft: { economica: 12, ejecutiva: 2 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9232", flightNumber: "AV 9232",
    origin: "TPA", originCity: "Tampa", originAirport: "Tampa Internacional",
    destination: "MDE", destinationCity: "Medellín", destinationAirport: "José María Córdova",
    departure: "17:30", arrival: "20:00", duration: "3h 30m", stops: [], aircraft: "Airbus A320",
    prices: { economica: 1180000, ejecutiva: 2350000 }, seatsLeft: { economica: 18, ejecutiva: 3 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  
  // ==========================================
  // BOGOTÁ (BOG) ↔ LOS ÁNGELES (LAX) - ESCALA MIA - 1 VUELO
  // ==========================================
  {
    id: "AV9301", flightNumber: "AV 9301",
    origin: "BOG", originCity: "Bogotá", originAirport: "El Dorado Internacional",
    destination: "LAX", destinationCity: "Los Ángeles", destinationAirport: "Los Ángeles Internacional",
    departure: "06:00", arrival: "17:45", duration: "11h 45m", aircraft: "Airbus A320 NEO",
    prices: { economica: 1850000, ejecutiva: 4200000 }, seatsLeft: { economica: 10, ejecutiva: 2 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"],
    stops: [
      {
        airport: "Miami Internacional",
        city: "Miami",
        code: "MIA",
        arrival: "10:50",
        departure: "12:50",
        layover: "2h 00m"
      }
    ]
  },
  {
    id: "AV9302", flightNumber: "AV 9302",
    origin: "LAX", originCity: "Los Ángeles", originAirport: "Los Ángeles Internacional",
    destination: "BOG", destinationCity: "Bogotá", destinationAirport: "El Dorado Internacional",
    departure: "10:00", arrival: "23:40", duration: "13h 40m", aircraft: "Airbus A320 NEO",
    prices: { economica: 1780000, ejecutiva: 3950000 }, seatsLeft: { economica: 15, ejecutiva: 3 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"],
    stops: [
      {
        airport: "Miami Internacional",
        city: "Miami",
        code: "MIA",
        arrival: "18:15",
        departure: "21:00",
        layover: "2h 45m"
      }
    ]
  },

  // ==========================================
  // MEDELLÍN (MDE) ↔ LOS ÁNGELES (LAX) - ESCALA MIA - 1 VUELO
  // ==========================================
  {
    id: "AV9311", flightNumber: "AV 9311",
    origin: "MDE", originCity: "Medellín", originAirport: "José María Córdova",
    destination: "LAX", destinationCity: "Los Ángeles", destinationAirport: "Los Ángeles Internacional",
    departure: "08:30", arrival: "20:15", duration: "11h 45m", aircraft: "Airbus A320 NEO",
    prices: { economica: 1920000, ejecutiva: 4350000 }, seatsLeft: { economica: 8, ejecutiva: 1 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"],
    stops: [
      {
        airport: "Miami Internacional",
        city: "Miami",
        code: "MIA",
        arrival: "12:45",
        departure: "15:15",
        layover: "2h 30m"
      }
    ]
  },

  {
    id: "AV9312", flightNumber: "AV 9312",
    origin: "LAX", originCity: "Los Ángeles", originAirport: "Los Ángeles Internacional",
    destination: "MDE", destinationCity: "Medellín", destinationAirport: "José María Córdova",
    departure: "12:00", arrival: "01:15", duration: "13h 15m", aircraft: "Airbus A320 NEO",
    prices: { economica: 1850000, ejecutiva: 4100000 }, seatsLeft: { economica: 12, ejecutiva: 2 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"],
    stops: [
      {
        airport: "Miami Internacional",
        city: "Miami",
        code: "MIA",
        arrival: "20:15",
        departure: "23:00",
        layover: "2h 45m"
      }
    ]
  },

  // ==========================================
  // BOGOTÁ (BOG) ↔ HOUSTON (IAH) - ESCALA MIA - 1 VUELO
  // ==========================================
  {
    id: "AV9321", flightNumber: "AV 9321",
    origin: "BOG", originCity: "Bogotá", originAirport: "El Dorado Internacional",
    destination: "IAH", destinationCity: "Houston", destinationAirport: "George Bush Intercontinental",
    departure: "14:15", arrival: "00:45", duration: "10h 30m", aircraft: "Boeing 787-8",
    prices: { economica: 1450000, ejecutiva: 3100000 }, seatsLeft: { economica: 20, ejecutiva: 5 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"],
    stops: [
      {
        airport: "Miami Internacional",
        city: "Miami",
        code: "MIA",
        arrival: "19:05",   // Sincronizado con llegada de AV9103
        departure: "21:15",
        layover: "2h 10m"
      }
    ]
  },
  {
    id: "AV9322", flightNumber: "AV 9322",
    origin: "IAH", originCity: "Houston", originAirport: "George Bush Intercontinental",
    destination: "BOG", destinationCity: "Bogotá", destinationAirport: "El Dorado Internacional",
    departure: "01:30", arrival: "15:10", duration: "13h 40m", aircraft: "Boeing 787-8",
    prices: { economica: 1380000, ejecutiva: 2900000 }, seatsLeft: { economica: 25, ejecutiva: 4 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"],
    stops: [
      {
        airport: "Miami Internacional",
        city: "Miami",
        code: "MIA",
        arrival: "05:05",
        departure: "12:30", // Conecta con la salida de AV9102
        layover: "7h 25m"
      }
    ]
  },

  // ==========================================
  // BOGOTÁ (BOG) ↔ CIUDAD DE MÉXICO (MEX) - 2 VUELOS
  // ==========================================
  {
    id: "AV9401", flightNumber: "AV 9401",
    origin: "BOG", originCity: "Bogotá", originAirport: "El Dorado Internacional",
    destination: "MEX", destinationCity: "Ciudad de México", destinationAirport: "Benito Juárez Internacional",
    departure: "07:00", arrival: "11:45", duration: "4h 45m", stops: [], aircraft: "Airbus A321",
    prices: { economica: 1100000, ejecutiva: 2450000 }, seatsLeft: { economica: 10, ejecutiva: 3 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9402", flightNumber: "AV 9402",
    origin: "MEX", originCity: "Ciudad de México", originAirport: "Benito Juárez Internacional",
    destination: "BOG", destinationCity: "Bogotá", destinationAirport: "El Dorado Internacional",
    departure: "13:15", arrival: "18:00", duration: "4h 45m", stops: [], aircraft: "Airbus A321",
    prices: { economica: 1050000, ejecutiva: 2300000 }, seatsLeft: { economica: 15, ejecutiva: 4 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9403", flightNumber: "AV 9403",
    origin: "BOG", originCity: "Bogotá", originAirport: "El Dorado Internacional",
    destination: "MEX", destinationCity: "Ciudad de México", destinationAirport: "Benito Juárez Internacional",
    departure: "14:50", arrival: "19:35", duration: "4h 45m", stops: [], aircraft: "Boeing 787-8",
    prices: { economica: 1250000, ejecutiva: 2800000 }, seatsLeft: { economica: 30, ejecutiva: 8 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9404", flightNumber: "AV 9404",
    origin: "MEX", originCity: "Ciudad de México", originAirport: "Benito Juárez Internacional",
    destination: "BOG", destinationCity: "Bogotá", destinationAirport: "El Dorado Internacional",
    departure: "21:00", arrival: "01:45", duration: "4h 45m", stops: [], aircraft: "Boeing 787-8",
    prices: { economica: 1180000, ejecutiva: 2650000 }, seatsLeft: { economica: 20, ejecutiva: 5 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },

  // ==========================================
  // MEDELLÍN (MDE) ↔ CIUDAD DE MÉXICO (MEX) - DIRECTO (1 VUELO)
  // ==========================================
  {
    id: "AV9411", flightNumber: "AV 9411",
    origin: "MDE", originCity: "Medellín", originAirport: "José María Córdova",
    destination: "MEX", destinationCity: "Ciudad de México", destinationAirport: "Benito Juárez Internacional",
    departure: "08:00", arrival: "12:15", duration: "4h 15m", stops: [], aircraft: "Airbus A320 NEO",
    prices: { economica: 1150000, ejecutiva: 2550000 }, seatsLeft: { economica: 12, ejecutiva: 2 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9412", flightNumber: "AV 9412",
    origin: "MEX", originCity: "Ciudad de México", originAirport: "Benito Juárez Internacional",
    destination: "MDE", destinationCity: "Medellín", destinationAirport: "José María Córdova",
    departure: "13:45", arrival: "18:00", duration: "4h 15m", stops: [], aircraft: "Airbus A320 NEO",
    prices: { economica: 1100000, ejecutiva: 2400000 }, seatsLeft: { economica: 18, ejecutiva: 3 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },

  // ==========================================
  // BOGOTÁ (BOG) ↔ CANCÚN (CUN) - 3 VUELOS
  // ==========================================
  {
    id: "AV9421", flightNumber: "AV 9421",
    origin: "BOG", originCity: "Bogotá", originAirport: "El Dorado Internacional",
    destination: "CUN", destinationCity: "Cancún", destinationAirport: "Cancún Internacional",
    departure: "06:15", arrival: "09:45", duration: "3h 30m", stops: [], aircraft: "Airbus A320 NEO",
    prices: { economica: 950000, ejecutiva: 2100000 }, seatsLeft: { economica: 10, ejecutiva: 2 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9422", flightNumber: "AV 9422",
    origin: "CUN", originCity: "Cancún", originAirport: "Cancún Internacional",
    destination: "BOG", destinationCity: "Bogotá", destinationAirport: "El Dorado Internacional",
    departure: "11:15", arrival: "14:45", duration: "3h 30m", stops: [], aircraft: "Airbus A320 NEO",
    prices: { economica: 920000, ejecutiva: 1980000 }, seatsLeft: { economica: 15, ejecutiva: 4 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9423", flightNumber: "AV 9423",
    origin: "BOG", originCity: "Bogotá", originAirport: "El Dorado Internacional",
    destination: "CUN", destinationCity: "Cancún", destinationAirport: "Cancún Internacional",
    departure: "13:00", arrival: "16:30", duration: "3h 30m", stops: [], aircraft: "Airbus A321",
    prices: { economica: 1050000, ejecutiva: 2350000 }, seatsLeft: { economica: 25, ejecutiva: 6 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9424", flightNumber: "AV 9424",
    origin: "CUN", originCity: "Cancún", originAirport: "Cancún Internacional",
    destination: "BOG", destinationCity: "Bogotá", destinationAirport: "El Dorado Internacional",
    departure: "18:00", arrival: "21:30", duration: "3h 30m", stops: [], aircraft: "Airbus A321",
    prices: { economica: 980000, ejecutiva: 2200000 }, seatsLeft: { economica: 30, ejecutiva: 5 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9425", flightNumber: "AV 9425",
    origin: "BOG", originCity: "Bogotá", originAirport: "El Dorado Internacional",
    destination: "CUN", destinationCity: "Cancún", destinationAirport: "Cancún Internacional",
    departure: "22:45", arrival: "02:15", duration: "3h 30m", stops: [], aircraft: "Airbus A320",
    prices: { economica: 880000, ejecutiva: 1850000 }, seatsLeft: { economica: 40, ejecutiva: 8 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9426", flightNumber: "AV 9426",
    origin: "CUN", originCity: "Cancún", originAirport: "Cancún Internacional",
    destination: "BOG", destinationCity: "Bogotá", destinationAirport: "El Dorado Internacional",
    departure: "03:45", arrival: "07:15", duration: "3h 30m", stops: [], aircraft: "Airbus A320",
    prices: { economica: 850000, ejecutiva: 1750000 }, seatsLeft: { economica: 50, ejecutiva: 12 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },

  // ==========================================
  // MEDELLÍN (MDE) ↔ CANCÚN (CUN) - DIRECTO (2 VUELOS)
  // ==========================================
  {
    id: "AV9431", flightNumber: "AV 9431",
    origin: "MDE", originCity: "Medellín", originAirport: "José María Córdova",
    destination: "CUN", destinationCity: "Cancún", destinationAirport: "Cancún Internacional",
    departure: "09:00", arrival: "11:55", duration: "2h 55m", stops: [], aircraft: "Airbus A320 NEO",
    prices: { economica: 1020000, ejecutiva: 2250000 }, seatsLeft: { economica: 12, ejecutiva: 2 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9432", flightNumber: "AV 9432",
    origin: "CUN", originCity: "Cancún", originAirport: "Cancún Internacional",
    destination: "MDE", destinationCity: "Medellín", destinationAirport: "José María Córdova",
    departure: "13:15", arrival: "16:10", duration: "2h 55m", stops: [], aircraft: "Airbus A320 NEO",
    prices: { economica: 980000, ejecutiva: 2150000 }, seatsLeft: { economica: 15, ejecutiva: 3 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9433", flightNumber: "AV 9433",
    origin: "MDE", originCity: "Medellín", originAirport: "José María Córdova",
    destination: "CUN", destinationCity: "Cancún", destinationAirport: "Cancún Internacional",
    departure: "17:00", arrival: "19:55", duration: "2h 55m", stops: [], aircraft: "Airbus A320",
    prices: { economica: 950000, ejecutiva: 2050000 }, seatsLeft: { economica: 20, ejecutiva: 4 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9434", flightNumber: "AV 9434",
    origin: "CUN", originCity: "Cancún", originAirport: "Cancún Internacional",
    destination: "MDE", destinationCity: "Medellín", destinationAirport: "José María Córdova",
    departure: "21:15", arrival: "00:10", duration: "2h 55m", stops: [], aircraft: "Airbus A320",
    prices: { economica: 890000, ejecutiva: 1950000 }, seatsLeft: { economica: 35, ejecutiva: 5 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },

  // ==========================================
  // BOGOTÁ (BOG) ↔ PUNTA CANA (PUJ) - 2 VUELOS
  // ==========================================
  {
    id: "AV9441", flightNumber: "AV 9441",
    origin: "BOG", originCity: "Bogotá", originAirport: "El Dorado Internacional",
    destination: "PUJ", destinationCity: "Punta Cana", destinationAirport: "Punta Cana Internacional",
    departure: "07:30", arrival: "11:15", duration: "2h 45m", stops: [], aircraft: "Airbus A320 NEO",
    prices: { economica: 880000, ejecutiva: 1950000 }, seatsLeft: { economica: 15, ejecutiva: 3 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9442", flightNumber: "AV 9442",
    origin: "PUJ", originCity: "Punta Cana", originAirport: "Punta Cana Internacional",
    destination: "BOG", destinationCity: "Bogotá", destinationAirport: "El Dorado Internacional",
    departure: "13:00", arrival: "14:45", duration: "2h 45m", stops: [], aircraft: "Airbus A320 NEO",
    prices: { economica: 850000, ejecutiva: 1850000 }, seatsLeft: { economica: 20, ejecutiva: 5 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9443", flightNumber: "AV 9443",
    origin: "BOG", originCity: "Bogotá", originAirport: "El Dorado Internacional",
    destination: "PUJ", destinationCity: "Punta Cana", destinationAirport: "Punta Cana Internacional",
    departure: "15:20", arrival: "19:05", duration: "2h 45m", stops: [], aircraft: "Airbus A320",
    prices: { economica: 950000, ejecutiva: 2100000 }, seatsLeft: { economica: 10, ejecutiva: 2 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9444", flightNumber: "AV 9444",
    origin: "PUJ", originCity: "Punta Cana", originAirport: "Punta Cana Internacional",
    destination: "BOG", destinationCity: "Bogotá", destinationAirport: "El Dorado Internacional",
    departure: "20:30", arrival: "22:15", duration: "2h 45m", stops: [], aircraft: "Airbus A320",
    prices: { economica: 920000, ejecutiva: 2000000 }, seatsLeft: { economica: 25, ejecutiva: 4 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },

  // ==========================================
  // MEDELLÍN (MDE) ↔ PUNTA CANA (PUJ) - DIRECTO (1 VUELO)
  // ==========================================
  {
    id: "AV9451", flightNumber: "AV 9451",
    origin: "MDE", originCity: "Medellín", originAirport: "José María Córdova",
    destination: "PUJ", destinationCity: "Punta Cana", destinationAirport: "Punta Cana Internacional",
    departure: "11:00", arrival: "14:30", duration: "2h 30m", stops: [], aircraft: "Airbus A320 NEO",
    prices: { economica: 980000, ejecutiva: 2150000 }, seatsLeft: { economica: 12, ejecutiva: 2 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9452", flightNumber: "AV 9452",
    origin: "PUJ", originCity: "Punta Cana", originAirport: "Punta Cana Internacional",
    destination: "MDE", destinationCity: "Medellín", destinationAirport: "José María Córdova",
    departure: "16:00", arrival: "17:30", duration: "2h 30m", stops: [], aircraft: "Airbus A320 NEO",
    prices: { economica: 940000, ejecutiva: 2050000 }, seatsLeft: { economica: 18, ejecutiva: 3 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9453", flightNumber: "AV 9453",
    origin: "MDE", originCity: "Medellín", originAirport: "José María Córdova",
    destination: "PUJ", destinationCity: "Punta Cana", destinationAirport: "Punta Cana Internacional",
    departure: "14:15", arrival: "17:45", duration: "2h 30m", stops: [], aircraft: "Airbus A320 NEO",
    prices: { economica: 1050000, ejecutiva: 2280000 }, seatsLeft: { economica: 15, ejecutiva: 4 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9454", flightNumber: "AV 9454",
    origin: "PUJ", originCity: "Punta Cana", originAirport: "Punta Cana Internacional",
    destination: "MDE", destinationCity: "Medellín", destinationAirport: "José María Córdova",
    departure: "19:15", arrival: "20:45", duration: "2h 30m", stops: [], aircraft: "Airbus A320 NEO",
    prices: { economica: 990000, ejecutiva: 2150000 }, seatsLeft: { economica: 22, ejecutiva: 3 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },

  // ─── INTERNACIONALES — CENTROAMÉRICA / CARIBE ─────────────────────────────

  // ==========================================
  // BOGOTÁ (BOG) ↔ CIUDAD DE PANAMÁ (PTY) - 3 VUELOS
  // ==========================================
  {
    id: "AV9501", flightNumber: "AV 9501",
    origin: "BOG", originCity: "Bogotá", originAirport: "El Dorado Internacional",
    destination: "PTY", destinationCity: "Ciudad de Panamá", destinationAirport: "Tocumen Internacional",
    departure: "06:30", arrival: "08:10", duration: "1h 40m", stops: [], aircraft: "Airbus A320 NEO",
    prices: { economica: 650000, ejecutiva: 1450000 }, seatsLeft: { economica: 12, ejecutiva: 4 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9502", flightNumber: "AV 9502",
    origin: "PTY", originCity: "Ciudad de Panamá", originAirport: "Tocumen Internacional",
    destination: "BOG", destinationCity: "Bogotá", destinationAirport: "El Dorado Internacional",
    departure: "09:30", arrival: "11:10", duration: "1h 40m", stops: [], aircraft: "Airbus A320 NEO",
    prices: { economica: 620000, ejecutiva: 1380000 }, seatsLeft: { economica: 15, ejecutiva: 2 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9503", flightNumber: "AV 9503",
    origin: "BOG", originCity: "Bogotá", originAirport: "El Dorado Internacional",
    destination: "PTY", destinationCity: "Ciudad de Panamá", destinationAirport: "Tocumen Internacional",
    departure: "14:00", arrival: "15:40", duration: "1h 40m", stops: [], aircraft: "Airbus A320",
    prices: { economica: 720000, ejecutiva: 1550000 }, seatsLeft: { economica: 25, ejecutiva: 6 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9504", flightNumber: "AV 9504",
    origin: "PTY", originCity: "Ciudad de Panamá", originAirport: "Tocumen Internacional",
    destination: "BOG", destinationCity: "Bogotá", destinationAirport: "El Dorado Internacional",
    departure: "17:00", arrival: "18:40", duration: "1h 40m", stops: [], aircraft: "Airbus A320",
    prices: { economica: 680000, ejecutiva: 1480000 }, seatsLeft: { economica: 30, ejecutiva: 5 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9505", flightNumber: "AV 9505",
    origin: "BOG", originCity: "Bogotá", originAirport: "El Dorado Internacional",
    destination: "PTY", destinationCity: "Ciudad de Panamá", destinationAirport: "Tocumen Internacional",
    departure: "21:30", arrival: "23:10", duration: "1h 40m", stops: [], aircraft: "Airbus A320 NEO",
    prices: { economica: 580000, ejecutiva: 1250000 }, seatsLeft: { economica: 45, ejecutiva: 8 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9506", flightNumber: "AV 9506",
    origin: "PTY", originCity: "Ciudad de Panamá", originAirport: "Tocumen Internacional",
    destination: "BOG", destinationCity: "Bogotá", destinationAirport: "El Dorado Internacional",
    departure: "06:00", arrival: "07:40", duration: "1h 40m", stops: [], aircraft: "Airbus A320 NEO",
    prices: { economica: 550000, ejecutiva: 1200000 }, seatsLeft: { economica: 50, ejecutiva: 10 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },

  // ==========================================
  // MEDELLÍN (MDE) ↔ CIUDAD DE PANAMÁ (PTY) - DIRECTO (2 VUELOS)
  // ==========================================
  {
    id: "AV9511", flightNumber: "AV 9511",
    origin: "MDE", originCity: "Medellín", originAirport: "José María Córdova",
    destination: "PTY", destinationCity: "Ciudad de Panamá", destinationAirport: "Tocumen Internacional",
    departure: "08:45", arrival: "10:05", duration: "1h 20m", stops: [], aircraft: "Airbus A320 NEO",
    prices: { economica: 750000, ejecutiva: 1650000 }, seatsLeft: { economica: 10, ejecutiva: 3 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9512", flightNumber: "AV 9512",
    origin: "PTY", originCity: "Ciudad de Panamá", originAirport: "Tocumen Internacional",
    destination: "MDE", destinationCity: "Medellín", destinationAirport: "José María Córdova",
    departure: "11:30", arrival: "12:50", duration: "1h 20m", stops: [], aircraft: "Airbus A320 NEO",
    prices: { economica: 720000, ejecutiva: 1580000 }, seatsLeft: { economica: 15, ejecutiva: 2 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9513", flightNumber: "AV 9513",
    origin: "MDE", originCity: "Medellín", originAirport: "José María Córdova",
    destination: "PTY", destinationCity: "Ciudad de Panamá", destinationAirport: "Tocumen Internacional",
    departure: "18:20", arrival: "19:40", duration: "1h 20m", stops: [], aircraft: "Airbus A320",
    prices: { economica: 690000, ejecutiva: 1450000 }, seatsLeft: { economica: 20, ejecutiva: 4 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9514", flightNumber: "AV 9514",
    origin: "PTY", originCity: "Ciudad de Panamá", originAirport: "Tocumen Internacional",
    destination: "MDE", destinationCity: "Medellín", destinationAirport: "José María Córdova",
    departure: "21:00", arrival: "22:20", duration: "1h 20m", stops: [], aircraft: "Airbus A320",
    prices: { economica: 640000, ejecutiva: 1350000 }, seatsLeft: { economica: 35, ejecutiva: 5 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },

  // ==========================================
  // BOGOTÁ (BOG) ↔ SAN JOSÉ (SJO) - 2 VUELOS
  // ==========================================
  {
    id: "AV9521", flightNumber: "AV 9521",
    origin: "BOG", originCity: "Bogotá", originAirport: "El Dorado Internacional",
    destination: "SJO", destinationCity: "San José", destinationAirport: "Juan Santamaría Internacional",
    departure: "07:45", arrival: "09:05", duration: "2h 20m", stops: [], aircraft: "Airbus A320 NEO",
    prices: { economica: 850000, ejecutiva: 1850000 }, seatsLeft: { economica: 8, ejecutiva: 2 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9522", flightNumber: "AV 9522",
    origin: "SJO", originCity: "San José", originAirport: "Juan Santamaría Internacional",
    destination: "BOG", destinationCity: "Bogotá", destinationAirport: "El Dorado Internacional",
    departure: "10:30", arrival: "13:50", duration: "2h 20m", stops: [], aircraft: "Airbus A320 NEO",
    prices: { economica: 820000, ejecutiva: 1750000 }, seatsLeft: { economica: 12, ejecutiva: 3 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9525", flightNumber: "AV 9525",
    origin: "BOG", originCity: "Bogotá", originAirport: "El Dorado Internacional",
    destination: "SJO", destinationCity: "San José", destinationAirport: "Juan Santamaría Internacional",
    departure: "22:00", arrival: "23:20", duration: "2h 20m", stops: [], aircraft: "Airbus A320 NEO",
    prices: { economica: 750000, ejecutiva: 1650000 }, seatsLeft: { economica: 40, ejecutiva: 7 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9526", flightNumber: "AV 9526",
    origin: "SJO", originCity: "San José", originAirport: "Juan Santamaría Internacional",
    destination: "BOG", destinationCity: "Bogotá", destinationAirport: "El Dorado Internacional",
    departure: "05:00", arrival: "08:20", duration: "2h 20m", stops: [], aircraft: "Airbus A320 NEO",
    prices: { economica: 720000, ejecutiva: 1580000 }, seatsLeft: { economica: 45, ejecutiva: 9 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },

  // ==========================================
  // MEDELLÍN (MDE) ↔ SAN JOSÉ (SJO) - DIRECTO (1 VUELO)
  // ==========================================
  {
    id: "AV9531", flightNumber: "AV 9531",
    origin: "MDE", originCity: "Medellín", originAirport: "José María Córdova",
    destination: "SJO", destinationCity: "San José", destinationAirport: "Juan Santamaría Internacional",
    departure: "09:30", arrival: "10:35", duration: "2h 05m", stops: [], aircraft: "Airbus A320 NEO",
    prices: { economica: 890000, ejecutiva: 1980000 }, seatsLeft: { economica: 15, ejecutiva: 3 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV9532", flightNumber: "AV 9532",
    origin: "SJO", originCity: "San José", originAirport: "Juan Santamaría Internacional",
    destination: "MDE", destinationCity: "Medellín", destinationAirport: "José María Córdova",
    departure: "12:00", arrival: "15:05", duration: "2h 05m", stops: [], aircraft: "Airbus A320 NEO",
    prices: { economica: 850000, ejecutiva: 1850000 }, seatsLeft: { economica: 20, ejecutiva: 2 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },

  // ─── INTERNACIONALES — EUROPA ─────────────────────────────────────────────

  // ==========================================
  // BOGOTÁ (BOG) ↔ MADRID (MAD) - 1 VUELO DIARIO
  // ==========================================
  {
    id: "AV4001", flightNumber: "AV 4001",
    origin: "BOG", originCity: "Bogotá", originAirport: "El Dorado Internacional",
    destination: "MAD", destinationCity: "Madrid", destinationAirport: "Adolfo Suárez Madrid-Barajas",
    departure: "23:45", arrival: "17:30+1", duration: "9h 45m", stops: [], aircraft: "Boeing 787-9",
    prices: { economica: 3200000, ejecutiva: 7500000 }, seatsLeft: { economica: 52, ejecutiva: 18 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV4002", flightNumber: "AV 4002",
    origin: "MAD", originCity: "Madrid", originAirport: "Adolfo Suárez Madrid-Barajas",
    destination: "BOG", destinationCity: "Bogotá", destinationAirport: "El Dorado Internacional",
    departure: "22:15", arrival: "04:00+1", duration: "10h 45m", stops: [], aircraft: "Boeing 787-9",
    prices: { economica: 3100000, ejecutiva: 7200000 }, seatsLeft: { economica: 45, ejecutiva: 15 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },

  
  // ==========================================
  // MEDELLÍN (MDE) ↔ MADRID (MAD) - ESCALA BOG - 1 VUELO DIARIO
  // ==========================================
  {
    id: "AV4011", flightNumber: "AV 4011",
    origin: "MDE", originCity: "Medellín", originAirport: "José María Córdova",
    destination: "MAD", destinationCity: "Madrid", destinationAirport: "Adolfo Suárez Madrid-Barajas",
    departure: "19:30", arrival: "17:30+1", duration: "14h 00m", aircraft: "Boeing 787-9",
    prices: { economica: 3450000, ejecutiva: 7800000 }, seatsLeft: { economica: 20, ejecutiva: 5 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"],
    stops: [
      {
        airport: "El Dorado Internacional",
        city: "Bogotá",
        code: "BOG",
        arrival: "20:30",
        departure: "23:45", // Conecta con el AV4001
        layover: "3h 15m"
      }
    ]
  },
  {
    id: "AV4012", flightNumber: "AV 4012",
    origin: "MAD", originCity: "Madrid", originAirport: "Adolfo Suárez Madrid-Barajas",
    destination: "MDE", destinationCity: "Medellín", destinationAirport: "José María Córdova",
    departure: "22:15", arrival: "08:15+1", duration: "16h 00m", aircraft: "Boeing 787-9",
    prices: { economica: 3350000, ejecutiva: 7600000 }, seatsLeft: { economica: 25, ejecutiva: 4 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"],
    stops: [
      {
        airport: "El Dorado Internacional",
        city: "Bogotá",
        code: "BOG",
        arrival: "04:00", // Llega del vuelo AV4002
        departure: "07:15",
        layover: "3h 15m"
      }
    ]
  },

  // ==========================================
  // MEDELLÍN (MDE) ↔ BARCELONA (BCN) - DIRECTO
  // ==========================================
  {
    id: "AV4101", flightNumber: "AV 4101",
    origin: "MDE", originCity: "Medellín", originAirport: "José María Córdova",
    destination: "BCN", destinationCity: "Barcelona", destinationAirport: "El Prat",
    departure: "21:30", arrival: "14:40+1", duration: "10h 10m", stops: [], aircraft: "Boeing 787-8",
    prices: { economica: 3350000, ejecutiva: 7800000 }, seatsLeft: { economica: 38, ejecutiva: 12 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },
  {
    id: "AV4102", flightNumber: "AV 4102",
    origin: "BCN", originCity: "Barcelona", originAirport: "El Prat",
    destination: "MDE", destinationCity: "Medellín", destinationAirport: "José María Córdova",
    departure: "18:00", arrival: "23:55", duration: "11h 55m", stops: [], aircraft: "Boeing 787-8",
    prices: { economica: 3250000, ejecutiva: 7400000 }, seatsLeft: { economica: 42, ejecutiva: 10 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"]
  },

  // ==========================================
  // BOGOTÁ (BOG) ↔ BARCELONA (BCN) - ESCALA MDE
  // ==========================================
  {
    id: "AV4111", flightNumber: "AV 4111",
    origin: "BOG", originCity: "Bogotá", originAirport: "El Dorado Internacional",
    destination: "BCN", destinationCity: "Barcelona", destinationAirport: "El Prat",
    departure: "17:45", arrival: "14:40+1", duration: "13h 55m", aircraft: "Boeing 787-8",
    prices: { economica: 3550000, ejecutiva: 8100000 }, seatsLeft: { economica: 15, ejecutiva: 4 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"],
    stops: [
      {
        airport: "José María Córdova",
        city: "Medellín",
        code: "MDE",
        arrival: "18:45",
        departure: "21:30", // Conecta con el AV4101
        layover: "2h 45m"
      }
    ]
  },
  {
    id: "AV4112", flightNumber: "AV 4112",
    origin: "BCN", originCity: "Barcelona", originAirport: "El Prat",
    destination: "BOG", destinationCity: "Bogotá", destinationAirport: "El Dorado Internacional",
    departure: "18:00", arrival: "07:30+1", duration: "19h 30m", aircraft: "Boeing 787-8",
    prices: { economica: 3450000, ejecutiva: 7900000 }, seatsLeft: { economica: 20, ejecutiva: 6 },
    days: ["lun","mar","mié","jue","vie","sáb","dom"],
    stops: [
      {
        airport: "José María Córdova",
        city: "Medellín",
        code: "MDE",
        arrival: "23:55", // Llega del vuelo AV4102
        departure: "06:30",
        layover: "6h 35m" // Escala nocturna técnica
      }
    ]
  },

  // ==========================================
  // BOGOTÁ (BOG) ↔ LONDRES (LHR) - VÍA MADRID
  // ==========================================
  {
    id: "AV4201", flightNumber: "AV 4201",
    origin: "BOG", originCity: "Bogotá", originAirport: "El Dorado Internacional",
    destination: "LHR", destinationCity: "Londres", destinationAirport: "Heathrow",
    departure: "23:45", arrival: "21:30+1", duration: "15h 45m", aircraft: "Boeing 787-9",
    prices: { economica: 3850000, ejecutiva: 8200000 }, seatsLeft: { economica: 15, ejecutiva: 4 },
    days: ["lun","mié","vie"],
    stops: [
      { airport: "Barajas", city: "Madrid", code: "MAD", arrival: "17:30+1", departure: "19:30", layover: "2h 00m" }
    ]
  },

  // ==========================================
  // MEDELLÍN (MDE) ↔ LONDRES (LHR) - VÍA BOG Y MAD (DOBLE ESCALA)
  // ==========================================
  {
    id: "AV4211", flightNumber: "AV 4211",
    origin: "MDE", originCity: "Medellín", originAirport: "José María Córdova",
    destination: "LHR", destinationCity: "Londres", destinationAirport: "Heathrow",
    departure: "19:30", arrival: "21:30+1", duration: "20h 00m", aircraft: "Boeing 787-9",
    prices: { economica: 4100000, ejecutiva: 8500000 }, seatsLeft: { economica: 8, ejecutiva: 2 },
    days: ["lun","mié","vie"],
    stops: [
      { airport: "El Dorado", city: "Bogotá", code: "BOG", arrival: "20:30", departure: "23:45", layover: "3h 15m" },
      { airport: "Barajas", city: "Madrid", code: "MAD", arrival: "17:30+1", departure: "19:30", layover: "2h 00m" }
    ]
  },

  // ==========================================
  // MEDELLÍN (MDE) ↔ PARÍS (CDG) - VÍA BARCELONA
  // ==========================================
  {
    id: "AV4301", flightNumber: "AV 4301",
    origin: "MDE", originCity: "Medellín", originAirport: "José María Córdova",
    destination: "CDG", destinationCity: "París", destinationAirport: "Charles de Gaulle",
    departure: "21:30", arrival: "18:45+1", duration: "15h 15m", aircraft: "Boeing 787-8",
    prices: { economica: 3950000, ejecutiva: 8400000 }, seatsLeft: { economica: 12, ejecutiva: 3 },
    days: ["mar","jue","sáb"],
    stops: [
      { airport: "El Prat", city: "Barcelona", code: "BCN", arrival: "14:40+1", departure: "17:15", layover: "2h 35m" }
    ]
  },

  // ==========================================
  // BOGOTÁ (BOG) ↔ PARÍS (CDG) - VÍA MDE Y BCN (DOBLE ESCALA)
  // ==========================================
  {
    id: "AV4311", flightNumber: "AV 4311",
    origin: "BOG", originCity: "Bogotá", originAirport: "El Dorado Internacional",
    destination: "CDG", destinationCity: "París", destinationAirport: "Charles de Gaulle",
    departure: "17:45", arrival: "18:45+1", duration: "19h 00m", aircraft: "Boeing 787-8",
    prices: { economica: 4200000, ejecutiva: 8800000 }, seatsLeft: { economica: 10, ejecutiva: 2 },
    days: ["mar","jue","sáb"],
    stops: [
      { airport: "J.M. Córdova", city: "Medellín", code: "MDE", arrival: "18:45", departure: "21:30", layover: "2h 45m" },
      { airport: "El Prat", city: "Barcelona", code: "BCN", arrival: "14:40+1", departure: "17:15", layover: "2h 35m" }
    ]
  },

  // ==========================================
  // LONDRES (LHR) ↔ BOGOTÁ (BOG) - VÍA MADRID
  // ==========================================
  {
    id: "AV4202", flightNumber: "AV 4202",
    origin: "LHR", originCity: "Londres", originAirport: "Heathrow",
    destination: "BOG", destinationCity: "Bogotá", destinationAirport: "El Dorado Internacional",
    departure: "18:00", arrival: "04:00+1", duration: "16h 00m", aircraft: "Boeing 787-9",
    prices: { economica: 3750000, ejecutiva: 8100000 }, seatsLeft: { economica: 18, ejecutiva: 5 },
    days: ["mar","jue","sáb"],
    stops: [
      { airport: "Barajas", city: "Madrid", code: "MAD", arrival: "21:15", departure: "22:15", layover: "1h 00m" }
    ]
  },

  // ==========================================
  // LONDRES (LHR) ↔ MEDELLÍN (MDE) - VÍA MAD Y BOG (DOBLE ESCALA)
  // ==========================================
  {
    id: "AV4212", flightNumber: "AV 4212", // Re-confirmado para tu base
    origin: "LHR", originCity: "Londres", originAirport: "Heathrow",
    destination: "MDE", destinationCity: "Medellín", destinationAirport: "José María Córdova",
    departure: "18:00", arrival: "08:15+1", duration: "20h 15m", aircraft: "Boeing 787-9",
    prices: { economica: 3950000, ejecutiva: 8400000 }, seatsLeft: { economica: 12, ejecutiva: 3 },
    days: ["mar","jue","sáb"],
    stops: [
      { airport: "Barajas", city: "Madrid", code: "MAD", arrival: "21:15", departure: "22:15", layover: "1h 00m" },
      { airport: "El Dorado", city: "Bogotá", code: "BOG", arrival: "04:00+1", departure: "07:15", layover: "3h 15m" }
    ]
  },

  // ==========================================
  // PARÍS (CDG) ↔ MEDELLÍN (MDE) - VÍA BARCELONA
  // ==========================================
  {
    id: "AV4302", flightNumber: "AV 4302",
    origin: "CDG", originCity: "París", originAirport: "Charles de Gaulle",
    destination: "MDE", destinationCity: "Medellín", destinationAirport: "José María Córdova",
    departure: "14:30", arrival: "23:55", duration: "15h 25m", aircraft: "Boeing 787-8",
    prices: { economica: 3850000, ejecutiva: 8200000 }, seatsLeft: { economica: 15, ejecutiva: 4 },
    days: ["mié","vie","dom"],
    stops: [
      { airport: "El Prat", city: "Barcelona", code: "BCN", arrival: "16:05", departure: "18:00", layover: "1h 55m" }
    ]
  },

  // ==========================================
  // PARÍS (CDG) ↔ BOGOTÁ (BOG) - VÍA BCN Y MDE (DOBLE ESCALA)
  // ==========================================
  {
    id: "AV4312", flightNumber: "AV 4312",
    origin: "CDG", originCity: "París", originAirport: "Charles de Gaulle",
    destination: "BOG", destinationCity: "Bogotá", destinationAirport: "El Dorado Internacional",
    departure: "14:30", arrival: "07:30+1", duration: "23h 00m", aircraft: "Boeing 787-8",
    prices: { economica: 4050000, ejecutiva: 8600000 }, seatsLeft: { economica: 10, ejecutiva: 2 },
    days: ["mié","vie","dom"],
    stops: [
      { airport: "El Prat", city: "Barcelona", code: "BCN", arrival: "16:05", departure: "18:00", layover: "1h 55m" },
      { airport: "J.M. Córdova", city: "Medellín", code: "MDE", arrival: "23:55", departure: "06:30", layover: "6h 35m" }
    ]
  }

];

// ─── HELPERS ──────────────────────────────────────────────────────────────────

/**
 * Busca vuelos según los parámetros del buscador
 * @param {string} origin     - Código IATA origen
 * @param {string} destination - Código IATA destino
 * @returns {Array} vuelos encontrados
 */
function searchFlights(origin, destination) {
  if (!origin || !destination) return [];

  return flightsDB.filter(flight =>
    flight.origin.toUpperCase()      === origin.toUpperCase() &&
    flight.destination.toUpperCase() === destination.toUpperCase()
  );
}

/**
 * Busca un vuelo por ID
 * @param {string} id
 * @returns {Object|null}
 */
function getFlightById(id) {
  return flightsDB.find(f => f.id === id) || null;
}

/**
 * Ordena resultados por criterio
 * @param {Array}  flights
 * @param {string} criteria - 'precio' | 'duracion' | 'salida' | 'escalas'
 * @returns {Array}
 */
function sortFlights(flights, criteria) {
  const copy = [...flights];

  switch (criteria) {
    case 'precio':
      return copy.sort((a, b) => a.prices.economica - b.prices.economica);

    case 'duracion':
      return copy.sort((a, b) => {
        const toMinutes = d => {
          const [h, m] = d.replace('h', '').replace('m', '').trim().split(' ').map(Number);
          return h * 60 + m;
        };
        return toMinutes(a.duration) - toMinutes(b.duration);
      });

    case 'salida':
      return copy.sort((a, b) => a.departure.localeCompare(b.departure));

    case 'escalas':
      return copy.sort((a, b) => a.stops.length - b.stops.length);

    default:
      return copy;
  }
}

/**
 * Formatea precio en COP
 * @param {number} price
 * @returns {string}
 */
function formatPrice(price) {
  return `COP ${price.toLocaleString('es-CO')}`;
}