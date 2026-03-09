# Project: Fullstack Template

## Tech Stack
- **Frontend:** React 19 + Vite + TypeScript
- **Backend:** Express + tRPC v11
- **Database:** MongoDB + Mongoose
- **Validation:** Zod (shared schemas)
- **State:** React Query (via tRPC)
- **Routing:** React Router v7

## Architecture
Single project, three source directories sharing types:
```
src/
├── client/     # React frontend (Vite dev server :3000)
├── server/     # Express API (tRPC on :4000)
└── shared/     # Zod schemas + constants (imported by both)
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
npm run dev          # Start both client + server
npm run dev:client   # Vite dev server only
npm run dev:server   # Express server only (with hot reload)
npm run build        # Build for production
npm run typecheck    # Check types without emitting
npm run lint         # ESLint
npm run test         # Vitest
npm run db:seed      # Seed database with sample data
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

## Slash Commands (Claude Code)
Custom commands available in `.claude/commands/`:
- `/add-feature <name>` — Full CRUD scaffold (schema + model + service + router + page)
- `/add-page <name>` — New React page with route + nav
- `/add-schema <name>` — New Zod schema with create/update variants
- `/add-service <name>` — Backend service + tRPC router for existing schema
- `/setup` — First-time project setup
- `/debug <issue>` — Systematic debugging workflow

## Conventions
- Use named exports, not default exports
- Use `.js` extensions in imports (ESM)
- Prefer named function declarations for components
- Service functions return plain objects, not Mongoose documents
- Always validate input with Zod schemas via tRPC
- See `docs/CONVENTIONS.md` for full details
- See `docs/ADDING_FEATURES.md` for step-by-step feature guide
- See `docs/ARCHITECTURE.md` for architecture deep dive
