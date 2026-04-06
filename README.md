# VedaSolus

Wellness and holistic health platform — practitioner scheduling, client intake, session management, and payment processing.

**Live:** [vedasolus.io](https://vedasolus.io)

## Stack

| Layer | Tech |
|---|---|
| Frontend | React 19 + Vite 7 (Radix UI) |
| Backend | Express + TypeScript |
| Database | PostgreSQL (Drizzle ORM) |
| Payments | Stripe |
| Auth | Trust Layer SSO |
| Deployment | Render (free tier) |

## Structure

```
vedasolus/
├── server/
│   └── routes.ts     # 647 lines — API routes
├── client/           # React SPA
├── shared/           # Drizzle schema
└── render.yaml
```

## Development

```bash
npm install
npm run dev
npm run db:push
```
