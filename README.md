
---

```markdown
# Weather Subscription Service

## Description

A RESTful API service that allows users to subscribe to weather updates for a specific city with a selected frequency (`hourly` or `daily`). After confirming their email via a tokenized link, users will receive weather forecasts automatically by email.

Built with Node.js (Express), PostgreSQL (Sequelize), WeatherAPI.com, Mailtrap, and Docker.

---

## Features

- Get real-time weather data for any city
- Subscribe via email to periodic forecasts
- Confirm subscription by email
- Receive weather updates (hourly or daily)
- Unsubscribe with a single click
- Email delivery via SMTP (Mailtrap)
- Cron-based scheduled email jobs
- Swagger-compatible API
- Unit and integration tests (Jest + Supertest)
- Fully Dockerized

---

## Technologies

- Node.js (Express)
- PostgreSQL (via Sequelize ORM)
- WeatherAPI.com (external API)
- Nodemailer + Mailtrap (email)
- node-cron (scheduled jobs)
- Jest + Supertest (testing)
- Docker & Docker Compose

---

## Directory Structure

```

weather-service/
├── src/
│   ├── config/             # Database config
│   ├── controllers/        # API logic
│   ├── models/             # Sequelize models
│   ├── migrations/         # Sequelize migrations
│   ├── public/             # HTML form
│   ├── routes/             # API routing
│   ├── services/           # Weather & email services
│   ├── utils/              # Scheduler logic
│   └── index.js            # Entry point
├── tests/                  # Test cases
├── Dockerfile              # Image setup
├── docker-compose.yml      # Dev environment
├── .env                    # Environment config (excluded from repo)
├── .env.example            # Sample environment file
└── README.md

````

---

## Environment Variables

Create your own `.env` file (see `.env.example`) with the following:

```env
PORT=3000

DB_HOST=db
DB_PORT=5432
DB_NAME=weather
DB_USER=postgres
DB_PASSWORD=postgres

BASE_URL=http://localhost:3000

SMTP_HOST=sandbox.smtp.mailtrap.io
SMTP_PORT=587
SMTP_USER=your_mailtrap_username
SMTP_PASS=your_mailtrap_password

WEATHER_API_KEY=your_weatherapi_key
````

> If your SMTP password contains special characters like `#`, wrap it in double quotes.

---

## Running Locally (with Docker)

```bash
docker-compose up --build
```

The API will be available at:
`http://localhost:3000`

You can access the HTML form at:
`http://localhost:3000/index.html`

---

## Running Tests

Use the included test container:

```bash
docker-compose run --rm test
```

Runs all Jest + Supertest-based API tests.

---

## API Endpoints

### GET `/api/weather?city={name}`

Returns the current weather forecast for the specified city.

### POST `/api/subscribe`

Subscribes a user via form data:

* `email` (string)
* `city` (string)
* `frequency` (`hourly` | `daily`)

### GET `/api/confirm/:token`

Confirms a subscription via email token.

### GET `/api/unsubscribe/:token`

Removes a user from the subscription list.

---

## Deployment Notes

* Uses Docker for full local isolation
* WeatherAPI and Mailtrap credentials are required to run properly
* For production, replace Mailtrap with real SMTP (SendGrid, Gmail App password, etc.)

---


