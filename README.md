# Prompt Protocol Whitelist

A production-ready terminal-style whitelist landing page for **Prompt Protocol** using **Vite + React + TypeScript** on the frontend and **Express + MongoDB + Mongoose** on the backend.

No wallet connect. No mint button. No blockchain transaction. No payment flow.

## Stack

### Frontend

- Vite
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- lucide-react

### Backend

- Express.js
- MongoDB with Mongoose
- REST API
- CORS
- dotenv
- Zod validation
- Basic rate limiting
- Duplicate email/wallet prevention

## Project structure

```txt
prompt-protocol-whitelist-vite/
  index.html
  src/
    App.tsx
    main.tsx
    index.css
    components/
    lib/api.ts
  server/
    index.ts
    lib/db.ts
    models/WhitelistEntry.ts
    routes/whitelist.ts
    .env.example
  .env.example
  package.json
  tailwind.config.ts
  vite.config.ts
```

## Setup

Install dependencies:

```bash
npm install
```

Create frontend env:

```bash
cp .env.example .env
```

Frontend env:

```env
VITE_API_URL=http://localhost:4000
```

Create backend env:

```bash
cp server/.env.example server/.env
```

Backend env:

```env
MONGODB_URI=mongodb+srv://USER:PASSWORD@cluster.mongodb.net/prompt_protocol
PORT=4000
CLIENT_ORIGIN=http://localhost:3000
```

Run frontend and backend together:

```bash
npm run dev:all
```

Or run separately:

```bash
npm run dev
npm run dev:server
```

Frontend runs on:

```txt
http://localhost:3000
```

Backend runs on:

```txt
http://localhost:4000
```

## API routes

### Health

```http
GET /api/health
```

Response:

```json
{
  "success": true,
  "status": "online"
}
```

### Submit whitelist entry

```http
POST /api/whitelist
```

Payload:

```json
{
  "email": "operator@prompt.dev",
  "walletAddress": "0x0000000000000000000000000000000000000000",
  "followedTwitter": true
}
```

### Count entries

```http
GET /api/whitelist/count
```

### Recent entries

```http
GET /api/whitelist/recent
```

Returns only masked wallet addresses. Emails are not exposed.

## Build

```bash
npm run build
```

## Notes

- The frontend uses `VITE_API_URL`, not `NEXT_PUBLIC_API_URL`.
- This project intentionally does not include RainbowKit, wagmi, wallet connect, minting, or blockchain write calls.
- The X/Twitter task points to `https://x.com/promptprotocolx`.
