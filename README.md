# Sarnia Hindu Society — Backend API

Node.js 22+, Express 5, Mongoose 9 (ES modules).

## Commands
| Command | What it does |
| --- | --- |
| `npm install` | install dependencies |
| `npm run dev` | start with auto-restart (`node --watch`) on http://localhost:8000 |
| `npm start` | start normally |

Copy `.env.example` to `.env` and fill in the values. If `mongodb+srv` lookups fail on your
machine (`querySrv ECONNREFUSED`), set `DNS_SERVERS=1.1.1.1,8.8.8.8` for local runs.

## Structure
```
src/
  server.js          entry point (listens locally, exported for Vercel)
  app.js             Express app: middleware, static /resources, /api routes
  config/            env loading and MongoDB connection
  middleware/        admin auth, validation, uploads, error handling
  models/            Mongoose models
  controllers/       request handlers
  routes/            URL → controller mapping (mounted under /api)
  utils/
upload/              uploaded images, served at /resources
```

All API paths are unchanged (`/api/admin`, `/api/events`, `/api/gallery`, `/api/members`, `/api/schedules`).
`POST /api/admin/createadmin` now requires an admin token.
