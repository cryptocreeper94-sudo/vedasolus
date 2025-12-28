# Zenith - Holistic Health Tracker

## Overview

Zenith is a holistic health tracking application that blends Eastern wisdom (Ayurveda, Traditional Chinese Medicine) with Western science. The platform enables users to track sleep, diet, and exercise while exploring ancient health philosophies through a modern, visually rich interface.

The application features:
- Personal health tracking (sleep, diet, exercise logs)
- Ayurvedic dosha analysis and daily routines
- Health passport with digital identity
- Practitioner marketplace for connecting with healers
- Community features for health-focused tribes
- Educational library bridging Eastern and Western health concepts
- Role-based dashboards (Developer, Practitioner, Admin)

## User Preferences

- **Owner/Developer**: Jason (dev pin: 0424)
- **Preferred communication style**: Simple, everyday language
- **Design**: "Cyberpunk Zen" aesthetic - NO brown/yellow colors, use cyan/pink/emerald pastels
- **Cards**: All subject-matter cards require full photorealistic backgrounds
- **UI**: True Bento grid with accordion dropdowns, glassmorphism effects, 3D/glow styling

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS v4 with custom CSS variables for theming
- **UI Components**: shadcn/ui component library (New York style) with Radix UI primitives
- **Animations**: Framer Motion for page transitions and micro-interactions
- **Charts**: Recharts for data visualization
- **Build Tool**: Vite with custom plugins for meta images and Replit integration

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript with ESM modules
- **API Design**: RESTful endpoints under `/api/*` prefix
- **Authentication**: Replit Auth integration via OpenID Connect (OIDC)
- **Session Management**: express-session with PostgreSQL session store (connect-pg-simple)

### Data Storage
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM with drizzle-zod for schema validation
- **Schema Location**: `shared/schema.ts` for shared types between client and server
- **Tables**: users, sessions, user_profiles, sleep_logs, diet_logs, exercise_logs, notification_preferences

### Authentication Flow
- Replit Auth provides OIDC-based authentication
- Sessions stored in PostgreSQL `sessions` table
- User data synced to `users` table on login
- Protected routes use `isAuthenticated` middleware

### Project Structure
```
├── client/           # Frontend React application
│   ├── src/
│   │   ├── components/  # UI components (layout, ui)
│   │   ├── hooks/       # Custom React hooks
│   │   ├── lib/         # Utilities and query client
│   │   └── pages/       # Route page components
├── server/           # Backend Express application
│   ├── replit_integrations/  # Replit Auth integration
│   ├── routes.ts     # API route definitions
│   └── storage.ts    # Database access layer
├── shared/           # Shared code between client/server
│   ├── schema.ts     # Drizzle database schemas
│   └── models/       # Shared type definitions
```

### Design Patterns
- **Storage Pattern**: `IStorage` interface abstracts database operations for testability
- **API Hooks**: Custom hooks (`use-auth`, `use-profile`, `use-health-tracking`) encapsulate API calls with React Query
- **Path Aliases**: `@/` for client src, `@shared/` for shared code

## External Dependencies

### Database
- PostgreSQL via `DATABASE_URL` environment variable
- Drizzle Kit for schema migrations (`npm run db:push`)

### Authentication
- Replit Auth (OpenID Connect)
- Requires `ISSUER_URL`, `REPL_ID`, and `SESSION_SECRET` environment variables

### Key npm Packages
- `drizzle-orm` / `drizzle-zod`: Database ORM and validation
- `@tanstack/react-query`: Server state management
- `express-session` / `connect-pg-simple`: Session handling
- `passport` / `openid-client`: OIDC authentication
- `recharts`: Chart components
- `framer-motion`: Animations
- `qrcode.react`: QR code generation for health passport