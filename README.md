# Lost & Found Portal

## Deploy the backend

Deploy the `backend` Git repository as a Railway service using Node.js. The
backend's `npm start` command runs `createTables.js` before starting the API;
database startup fails if the schema setup cannot complete.

Set these variables in the backend service:

- `PORT` (Railway supplies this automatically)
- `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, and `DB_NAME`
- `DB_SSL` (`true` if required by the MySQL provider)
- `JWT_SECRET` (a long, random secret)
- `ADMIN_EMAIL` and `ADMIN_PASSWORD`
- `FRONTEND_URL` (the deployed frontend origin; needed for reset links)
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASSWORD`, and
  optionally `SMTP_FROM` (required to send password-reset emails)

Use `backend/.env.example` as a list of required variable names. Never commit
`.env` or put secrets in frontend variables.

## Deploy the frontend

Deploy the `frontend` Git repository as a Railway service. Set
`VITE_API_URL` to the backend service's public origin, for example:

```text
https://lost-found-backend-production-02a1.up.railway.app
```

`VITE_API_URL` is read at build time. Set it before building/redeploying the
frontend; do not point it at the frontend's own URL.

The frontend start command serves the built `dist` directory and supports
client-side routes such as `/reset-password`.

For Vercel deployments, `vercel.json` rewrites client-side routes to
`index.html`, so direct links and page refreshes continue to load the app.

## Local development

1. Configure the backend environment using `backend/.env.example`.
2. From `backend`, run `npm start`. This prepares the database schema and
   starts the API on port 5000 by default.
3. From `frontend`, run `npm run dev`. Vite proxies `/api` requests to
   `http://localhost:5000`.

Password-reset emails are sent only when SMTP variables are configured.
