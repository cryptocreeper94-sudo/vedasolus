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
- AI Wellness Coach with voice interaction (OpenAI + ElevenLabs)
- Strategic roadmap and business documentation

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
│   ├── replit_integrations/  # Replit Auth + OpenAI integrations
│   ├── routes.ts     # API route definitions
│   ├── elevenlabs.ts # AI wellness coach with voice
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
- `openai`: AI chat completions for wellness coach

## Integrations

### Stripe Payments (ACTIVE)
- **Status**: Configured with STRIPE_SECRET_KEY and STRIPE_PUBLISHABLE_KEY
- **Endpoints**:
  - `GET /api/subscription/tiers` - Get available subscription tiers
  - `POST /api/subscription/checkout` - Create subscription checkout session
  - `POST /api/payment/practitioner` - Create practitioner payment session
- **Subscription Tiers**:
  - Seeker (Free): Basic tracking, 3 meditations
  - Practitioner Path ($9.99/mo): Unlimited tracking, full library
  - Healer's Circle ($19.99/mo): Marketplace access, consultations
  - Master's Journey ($39.99/mo): Unlimited consultations, family sharing
- **File**: `server/stripe.ts` contains all Stripe configuration

### AI Wellness Coach (ACTIVE)
- **OpenAI**: Via Replit AI Integrations (AI_INTEGRATIONS_OPENAI_API_KEY, AI_INTEGRATIONS_OPENAI_BASE_URL)
- **ElevenLabs**: Voice synthesis with ELEVENLABS_API_KEY
- **Endpoint**: `POST /api/wellness-chat` - Get AI wellness guidance with optional voice
- **File**: `server/elevenlabs.ts` contains wellness coach logic

### Firebase Auth (PENDING)
- Missing secrets: VITE_FIREBASE_API_KEY, VITE_FIREBASE_APP_ID, VITE_FIREBASE_PROJECT_ID
- Currently using Replit Auth as fallback

### Orbit Staffing (FUTURE)
- Integration for payroll system - details TBD

### Dark Wave Smart Chain (FUTURE)
- Blockchain integration for health credentials and NFT verification - details TBD

## Developer Dashboard Features

### Roadmap (4 Phases)
1. **Foundation** (Q4 2024) - Auth, tracking, payments, AI coach, health passport
2. **Intelligence & Personalization** (Q1 2025) - Dosha engine, insights, FHIR/HealthKit
3. **Ecosystem Growth** (Q2 2025) - Marketplace, messaging, tribes, video consultations
4. **Web3 & Enterprise** (Q3 2025) - Blockchain, Orbit payroll, enterprise API, HIPAA

### Analytics Dashboard
- User metrics (total, active, growth)
- Revenue metrics (MRR, subscribers, conversion)
- Engagement metrics (session time, streaks, logs)
- AI coach performance (conversations, satisfaction)

### Documentation Hub
- API Reference
- Integration Guides (FHIR, HealthKit, Blockchain)
- Security & Compliance (HIPAA)
- Database Schema
- Business Plan
- Release Notes

## Recent Changes

### December 2024
- Added AI Wellness Coach with ElevenLabs voice synthesis
- Created comprehensive Developer Dashboard with Roadmap, Analytics, System, and Docs tabs
- Added Mission Statement / Executive Summary in hamburger menu
- Created Business Plan page with market analysis and projections
- Updated notification preferences system
- Added personalized insights based on dosha type and time of day
