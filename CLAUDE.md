# Project: Fullstack Template

## Tech Stack
- **Web Frontend:** React 19 + Vite + TypeScript
- **Mobile:** React Native (Expo) + TypeScript
- **Backend:** Express + tRPC v11
- **Database:** MongoDB + Mongoose
- **Validation:** Zod (shared schemas)
- **State:** TanStack Query (via tRPC)
- **Web Routing:** React Router v7
- **Mobile Navigation:** React Navigation v7

## Architecture
Single project: web, mobile, and server share types through `src/shared/`:
```
src/
├── client/     # React web frontend (Vite :3000)
├── server/     # Express API (tRPC :4000)
├── shared/     # Zod schemas + constants (used by ALL platforms)
└── mobile/     # React Native (Expo) — imports from shared/
```

## Key Patterns

### Type Safety Flow
Zod schema (shared/) -> tRPC router validates input -> tRPC infers return type -> React Query auto-types on client.
**Never manually define API types.** They flow automatically through tRPC.

### Adding a New Feature (e.g., "posts")
1. Create schema: `src/shared/schemas/post.schema.ts` (Zod schemas + inferred types)
2. Create model: `src/server/models/post.model.ts` (Mongoose schema)
3. Create service: `src/server/services/post.service.ts` (business logic)
4. Create router: `src/server/routers/post.router.ts` (tRPC procedures)
5. Register router in `src/server/routers/index.ts`
6. Create page: `src/client/pages/PostsPage.tsx`
7. Add route in `src/client/App.tsx`

### File Organization Rules
- **Max 300 lines per file.** Split if larger.
- One model/service/router per feature module.
- Components in `src/client/components/` — one component per file.
- Hooks in `src/client/hooks/` — one hook per file.
- Shared schemas are the SINGLE SOURCE OF TRUTH for types.

## Commands
```bash
# Web + Server
npm run dev          # Start both client + server
npm run dev:client   # Vite dev server only
npm run dev:server   # Express server only (with hot reload)
npm run build        # Build for production
npm run typecheck    # Check types without emitting
npm run lint         # ESLint
npm run test         # Vitest
npm run db:seed      # Seed database with sample data

# Mobile (run from src/mobile/ directory)
cd src/mobile && npm run dev      # Start Expo dev server
cd src/mobile && npm run ios      # Run on iOS simulator
cd src/mobile && npm run android  # Run on Android emulator
```

## Path Aliases
- `@shared/*` -> `src/shared/*`
- `@client/*` -> `src/client/*`
- `@server/*` -> `src/server/*`

## API Structure
All API routes go through tRPC at `/api/trpc`. Health check at `/api/health`.
- tRPC routers in `src/server/routers/`
- Use `publicProcedure` for open routes
- Use `protectedProcedure` for auth-required routes
- Use `adminProcedure` for admin-only routes

## Database
MongoDB with Mongoose. Connection in `src/server/db/connection.ts`.
Models in `src/server/models/`. Each model file has:
- TypeScript interface extending Document
- Mongoose schema
- Exported model

## Environment Variables
Copy `.env.example` to `.env`. Required:
- `MONGODB_URI` — MongoDB connection string
- `PORT` — Server port (default: 4000)

## Skills (Auto-Loaded)
Claude automatically loads these when working on relevant code:

### Stack Skills (project-specific patterns):
- **project-conventions** — File limits, naming, architecture rules
- **trpc-patterns** — Router, procedure, middleware patterns
- **zod-schemas** — Schema creation, validation, type inference
- **mongoose-patterns** — Model, service, query patterns
- **react-patterns** — Component, page, hook, tRPC usage
- **react-native-patterns** — Screen, navigation, native components

### Engineering Skills (best practices):
- **code-reviewer** — PR review checklist for type safety, security, performance
- **security-auditor** — OWASP top 10, auth, MongoDB security patterns
- **ci-cd-pipeline** — GitHub Actions, Docker, deployment pipelines
- **tech-debt-tracker** — Code smell detection, debt classification, audit commands
- **dependency-auditor** — Package updates, vulnerability scanning, bundle size
- **git-workflow** — Branch strategy, commit conventions, PR process

### Startup Skills (business & growth):
- **product-manager** — PRDs, user stories, RICE prioritization, sprint planning
- **pricing-strategy** — SaaS pricing tiers, value metrics, freemium models
- **launch-strategy** — Product launches, go-to-market, beta releases
- **landing-page** — Conversion-optimized React landing pages
- **competitive-analysis** — Market research, feature matrices, battle cards
- **saas-metrics** — MRR, churn, LTV, CAC, unit economics tracking
- **copywriting** — Homepage copy, CTAs, email subjects, conversion text

### Integration Skills:
- **telegram-bot** — Telegram Bot API: webhooks, messages, keyboards, payments

Skills live in `.claude/skills/`. They load on-demand — no context cost until needed.

## Slash Commands (Claude Code)
Custom commands in `.claude/commands/`. User-invoked actions.

### Scaffolding:
- `/add-feature <name>` — Full CRUD: schema + model + service + router + page
- `/add-page <name>` — React page + route + nav link
- `/add-schema <name>` — Zod schema with create/update + inferred types
- `/add-service <name>` — Service + tRPC router for existing schema
- `/add-hook <name>` — Custom React hook
- `/add-middleware <name>` — Express or tRPC middleware
- `/add-auth` — Full JWT auth (backend + frontend + guards)

### Mobile:
- `/add-screen <name>` — React Native screen + navigation
- `/add-mobile-feature <name>` — Full mobile feature (screen + components + navigation)

### Workflow:
- `/setup` — First-time project bootstrap
- `/review` — Code review with project-specific checklist
- `/test <feature>` — Write Vitest tests for a feature
- `/refactor <target>` — Refactor with project rules (300 line limit, etc.)
- `/debug <issue>` — Systematic full-stack debugging
- `/explain <topic>` — Explain how something works in this codebase
- `/optimize <target>` — Performance optimization checklist
- `/deploy <target>` — Prepare for deployment (Railway, Docker, VPS)
- `/sync-skills` — Sync skills from alirezarezvani/claude-skills repo
- `/update-telegram-skill` — Update Telegram Bot skill from latest API docs

## Conventions
- Use named exports, not default exports
- Use `.js` extensions in imports (ESM)
- Prefer named function declarations for components
- Service functions return plain objects, not Mongoose documents
- Always validate input with Zod schemas via tRPC
- See `docs/CONVENTIONS.md` for full rules
