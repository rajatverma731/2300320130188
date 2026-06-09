# Notification System Design

## Overview
A lightweight proxy-based notification viewer that fetches paginated,
filterable notifications from the Affordmed Evaluation Service.

---

## Architecture

```
Browser (React)
  └─ GET /api/notifications?page=&limit=&notification_type=
       │
       ▼
notification_app_be (Express + logger middleware)
  └─ notificationService → Affordmed API
       http://4.224.186.213/evaluation-service/notifications
```

---

## Backend: `notification_app_be`

| Layer          | File                                       | Responsibility                          |
|----------------|--------------------------------------------|-----------------------------------------|
| Entry point    | `server.js`                                | Express app, CORS, logger, mount routes |
| Routes         | `routes/notificationRoutes.js`             | `GET /api/notifications`                |
| Controller     | `controllers/notificationController.js`    | Extract query params, call service      |
| Service        | `services/notificationService.js`          | Axios call to external API              |
| Config         | `config/constants.js`                      | External API base URL                   |

---

## Logging Middleware: `logging_middleware`

| File        | Description                                          |
|-------------|------------------------------------------------------|
| `logger.js` | Express middleware; logs method, URL, status, duration |

Sample log output:
```
[2026-06-09T07:00:00.000Z] GET /api/notifications → 200 (142ms)
```

---

## Frontend: `notification_app_fe`

| Layer      | File                                              | Responsibility                              |
|------------|---------------------------------------------------|---------------------------------------------|
| Entry      | `src/main.jsx`                                    | React root + dark MUI theme                 |
| Router     | `src/App.jsx`                                     | AppBar + route `/notifications`             |
| Page       | `src/pages/NotificationsPage.jsx`                 | Filter, pagination, fetch logic             |
| Component  | `src/components/NotificationList.jsx`             | Renders individual notification cards       |

---

## API Endpoint

### `GET /api/notifications`

**Query Parameters**

| Param               | Type   | Description                             |
|---------------------|--------|-----------------------------------------|
| `page`              | number | Page number (default: 1)                |
| `limit`             | number | Items per page (default: 10)            |
| `notification_type` | string | `Event`, `Result`, or `Placement`       |

**Response** (proxied from external API)
```json
{
  "notifications": [...],
  "total": 100,
  "total_pages": 10
}
```

---

## Filters Supported (Frontend)

| Filter    | notification_type value |
|-----------|-------------------------|
| All       | _(no filter)_           |
| Event     | `Event`                 |
| Result    | `Result`                |
| Placement | `Placement`             |

---

## Running the Project

### Backend
```bash
cd AFFORDMED/notification_app_be
npm install
npm run dev
# → http://localhost:5000
```

### Frontend
```bash
cd AFFORDMED/notification_app_fe
npm install
npm run dev
# → http://localhost:5173
```

Vite proxies `/api/*` → `http://localhost:5000` automatically.
