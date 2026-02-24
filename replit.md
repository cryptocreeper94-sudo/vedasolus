# VedaSolus - Holistic Health Platform

## Overview

VedaSolus is a holistic health tracking application that integrates Eastern health philosophies (Ayurveda, Traditional Chinese Medicine) with Western science. It enables users to track key health metrics like sleep, diet, and exercise through a modern, visually engaging interface. The platform aims to provide personalized wellness guidance, connect users with practitioners, and foster a health-focused community, bridging ancient wisdom with contemporary health practices. Key capabilities include personal health tracking, Ayurvedic analysis, a health passport, a practitioner marketplace, an AI wellness coach, and an educational library. The business vision is to tap into the growing wellness market by offering a unique blend of traditional and modern health approaches, supported by advanced technology and a robust ecosystem.

## User Preferences

- **Preferred communication style**: Simple, everyday language
- **Design**: "Cyberpunk Zen" aesthetic - NO brown/yellow colors, use cyan/pink/emerald pastels
- **Cards**: All subject-matter cards require full photorealistic backgrounds
- **UI**: True Bento grid with accordion dropdowns, glassmorphism effects, 3D/glow styling

## System Architecture

### Frontend
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter
- **State Management**: TanStack React Query
- **Styling**: Tailwind CSS v4, custom CSS variables
- **UI Components**: shadcn/ui (New York style), Radix UI
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Build Tool**: Vite

### Backend
- **Runtime**: Node.js with Express
- **Language**: TypeScript with ESM
- **API Design**: RESTful endpoints (`/api/*`)
- **Authentication**: Replit Auth (OpenID Connect), custom email/password with Resend and bcrypt
- **Session Management**: `express-session` with PostgreSQL store

### Data Storage
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM with `drizzle-zod` for validation
- **Schema**: `shared/schema.ts`
- **Key Tables**: `users`, `sessions`, `user_profiles`, `sleep_logs`, `diet_logs`, `exercise_logs`, `notification_preferences`, `analytics_sessions`, `analytics_page_views`, `analytics_events`, `seo_pages`, `medical_disclaimers`

### Core Features
- **Personal Health Tracking**: Sleep, diet, exercise, heart rate logging.
- **Ayurvedic Integration**: Dosha analysis and personalized routines.
- **AI Wellness Coach**: OpenAI integration with ElevenLabs for voice interaction.
- **Developer Dashboard**: Provides roadmap, analytics, system overview, and documentation.
- **Analytics System**: First-party tracking for sessions, page views, and events with real-time KPIs.
- **SEO Management**: CRUD for per-route SEO configurations via admin dashboard.
- **PWA**: Configured with manifest and icons for installability.
- **Command Center**: PIN-gated admin dashboard for various platform controls.

### Project Structure
- `client/`: Frontend React application.
- `server/`: Backend Express application.
- `shared/`: Shared code, schemas, and types.

### Design Patterns
- **Storage Pattern**: `IStorage` interface for database abstraction.
- **API Hooks**: Custom hooks for API interaction with React Query.
- **Path Aliases**: `@/` for client, `@shared/` for shared code.

## External Dependencies

### Database
- PostgreSQL (via `DATABASE_URL`)
- Drizzle Kit

### Authentication
- Replit Auth (OpenID Connect)
- Resend (for email verification)

### AI Services
- OpenAI (for AI chat completions)
- ElevenLabs (for voice synthesis)

### Payment Processing
- Stripe (for subscriptions and practitioner payments)

### HR & Payroll
- Orbit Staffing (for practitioner management, payroll, timesheets, and revenue syncing)
  - Base URL: `https://orbitstaffing.io`
  - Ecosystem Registration: `/api/admin/ecosystem/register-app`
  - SSO Login (Trust Layer): `/api/auth/ecosystem-login`
  - Trust Layer Chat Register: `/api/chat/auth/register`
  - Financial Hub Revenue Sync: `/api/financial-hub/ingest`
  - Worker/Timesheet/1099/W2/Certification Sync: `/api/ecosystem/sync/*`

### Key npm Packages
- `drizzle-orm`, `drizzle-zod`
- `@tanstack/react-query`
- `express-session`, `connect-pg-simple`
- `passport`, `openid-client`
- `recharts`
- `framer-motion`
- `qrcode.react`
- `openai`