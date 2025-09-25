# Streaming Portal Full (Updated)

This version adds simple JWT auth, favorites/history/watchlist CRUD, and instructions to deploy.

## Environment variables
Create a `.env.local` with:
```
MONGODB_URI=<your mongodb connection string>
JWT_SECRET=<random secret string>
```

## Run locally
1. npm install
2. npm run dev

## Notes
- API proxy routes forward requests to https://www.sankavollerei.com (the endpoints you provided).
- Auth endpoints: /api/auth/register, /api/auth/login, /api/auth/me
- Protected endpoints (favorites/history/watchlist) require `Authorization: Bearer <token>`
