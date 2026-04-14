# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static flight booking demo web app for Avianca Airlines. Pure frontend (vanilla JS, HTML5, CSS3) — no build step, no bundler, no framework. Content is managed via Contentful CMS; auth via AWS Cognito; hosted on AWS S3 + CloudFront.

Live URL: https://d1cq6wgq3znilx.cloudfront.net

## Commands

**Contentful migration** (create/update CMS content types):
```bash
node contentful-migration.js
```

**Deploy to production** (requires AWS CLI configured):
```bash
./deploy.sh
```
This syncs files to S3 bucket `avianca-demo` and invalidates CloudFront distribution `E27ZEE9AOMFS01`.

There is no build, test, or lint tooling.

## Architecture

### User Flow
1. **`index.html`** — Authentication gate using AWS Cognito OAuth2/PKCE. Stores `idToken`, `accessToken`, `refreshToken` in `localStorage`. Redirects to `home.html` on success.
2. **`home.html`** — Flight search form (origin/destination/dates/passengers). On submit, stores search params in `sessionStorage` and navigates to `resultados.html`.
3. **`resultados.html`** — Reads search params from `sessionStorage`, queries `flights_data.js` for matching flights, allows filtering/sorting. Stores selected flights in `sessionStorage`, navigates to `checkout.html`.
4. **`checkout.html`** — Multi-step checkout: flight confirm → passenger details → seat selection (outbound + return) → baggage → payment (mockup only).
5. **`ofertas.html`** — Promotional offers page.
6. **`tu_reserva.html`** — Booking lookup by confirmation code.
7. **`destino.html`** — Destination detail page, receives destination via URL params.

### Data Layer
- **`flights_data.js`** — Static in-browser flight database (~100+ flights). Flight objects include IATA codes, schedule, pricing in COP, seat counts by cabin, and operating days.
- **`data_destinations.js`** — Static destination list (~95 entries) with country, type (national/international), and image paths.
- **`data_contentful.js`** — Fetches header/footer, destinations, and attractions from Contentful CDN API at runtime. Access token embedded for browser use.

### Script Organization
Each HTML page has a dedicated JS file (`script.js` for shared utilities, `script_resultados.js`, `script_checkout.js`, `script_ofertas.js`, `script_tu_reserva.js`, `destino.js`).

- **`analytics.js`** — GA4 event tracking (ID: `G-9V78277M5X`). Called from all pages to track search, selection, checkout steps, etc.
- **`contentful-migration.js`** — Node.js script (not browser) that uses `contentful-management` + `.env` to create `siteHeader` and `siteFooter` content types in Contentful.

### State Management
No framework state. Data flows through:
- `sessionStorage` — search parameters and selected flights between pages
- `localStorage` — Cognito tokens (`idToken`, `accessToken`, `refreshToken`)

### AWS Cognito Config (hardcoded in `index.html`)
- Domain: `us-east-1qawpfkusl.auth.us-east-1.amazoncognito.com`
- Client ID: `6oe10kr7ejbcu5cmhd2g8he09a`
- Redirect URI: CloudFront URL

### Environment Variables (`.env`, not committed)
Used only by `contentful-migration.js` (Node.js):
```
CONTENTFUL_SPACE_ID=
CONTENTFUL_MANAGEMENT_TOKEN=
CONTENTFUL_ENVIRONMENT=master
```

## Database Integration Plan

The `sql/` directory contains a MySQL schema (`avianca_flights`) designed to replace the static JS data layer with a real relational database.

### Schema (`sql/DDL.sql`)

| Table | Purpose |
|---|---|
| `airports` | IATA codes, city, country, type (national/international) |
| `aircraft` | Model name and total seat count |
| `flights` | Recurring schedule with pricing in COP, seat counts, active flag |
| `flight_stops` | Layover stops per flight (0 rows = direct flight) |
| `bookings` | One booking per checkout transaction; holds confirmation code, status, totals |
| `booking_legs` | Outbound and/or return leg per booking, with the user-selected date |
| `passengers` | One row per passenger per booking; lead passenger flagged |
| `passenger_seats` | Seat assignment per passenger per leg |
| `passenger_baggage` | Baggage selection per passenger (hand / bag23 / bag32) |

### Planned JS → SQL Replacements (`sql/QUERIES.sql`)

- **`searchFlights(origin, dest)`** → `SELECT` on `flights` joined with `airports` and `aircraft`, filtered by `origin_iata`, `destination_iata`, `is_active`, `seats_economy > 0`.
- **`flight.stops[]`** → `SELECT` on `flight_stops` joined with `airports` for a given `flight_id`.
- **`avianca_reservations` in `localStorage`** → full booking retrieval query joining `bookings → booking_legs → flights → passengers → passenger_seats → passenger_baggage`.
- **`generateOccupiedSeats()`** → `SELECT seat_code` from `passenger_seats` filtered by `flight_id`, `flight_date`, and `status != 'cancelled'`.
- **Analytical queries** (not yet in frontend): top routes by revenue, monthly income, per-flight occupancy percentage.

### Migration Files

- **`sql/DDL.sql`** — `CREATE TABLE` statements (run once to set up schema).
- **`sql/INSERT.sql`** — Seed data inserts.
- **`sql/INSERT APLICADOS.sql`** — Inserts already applied to the database.
- **`sql/QUERIES.sql`** — Read queries and analytical reports.

### Integration Notes

- Database engine: **MySQL** (`USE avianca_flights`).
- No backend API exists yet; connecting the frontend will require adding a server layer (e.g., AWS Lambda + API Gateway, or a lightweight Node/Express proxy) to issue authenticated DB calls — the browser cannot connect to MySQL directly.
- Current static files (`flights_data.js`, `data_destinations.js`) remain the source of truth until the API layer is built.
