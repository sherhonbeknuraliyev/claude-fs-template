# claude-fs-template

A fullstack TypeScript template built by Claude, for Claude Code users.

Every decision — file sizes, folder structure, docs as skills, shared types — is optimized for AI-assisted development with [Claude Code](https://claude.com/claude-code).

## Why This Template?

**You talk to Claude. Claude builds your app.**

- Type `/add-feature post` — Claude scaffolds schema, model, service, API, and React page
- Type `/add-auth` — Claude adds full JWT authentication with guards
- Type `/deploy docker` — Claude prepares Dockerfile and production config
- Type `/review` — Claude reviews your code against project-specific rules
- **17 slash commands** replace traditional documentation. No reading docs — just ask Claude.
- Type `/add-screen profile` — Claude creates a React Native screen wired to the same API

**The stack is designed so Claude never loses type safety:**

```
Zod Schema (you define once)
    → tRPC validates + infers types automatically
    → React Query hook is fully typed
    → Your component has zero manual types
```

Change a field on the backend. Web AND mobile know instantly. No codegen. No manual types.

## Stack

| Layer | Tech | Why |
|-------|------|-----|
| Web | React 19 + Vite | Fast dev, huge ecosystem |
| Mobile | React Native (Expo) | Cross-platform, shares types with backend |
| Backend | Express + tRPC v11 | End-to-end type safety |
| Database | MongoDB + Mongoose | Flexible, easy to change |
| Validation | Zod | Shared schemas = single source of truth |
| State | TanStack Query (via tRPC) | Server state, caching, refetching |
| Web Routing | React Router v7 | Standard, well-supported |
| Mobile Nav | React Navigation v7 | Native navigation experience |

## Quick Start

```bash
# Option 1: Use as GitHub template
gh repo create my-app --template sherhonbeknuraliyev/claude-fs-template --public --clone
cd my-app

# Option 2: Clone directly
git clone https://github.com/sherhonbeknuraliyev/claude-fs-template.git my-app
cd my-app

# Then open Claude Code and type:
# /setup
#
# Or manually:
cp .env.example .env
npm install
npm run dev
```

Frontend: `http://localhost:3000` | API: `http://localhost:4000`

## All Slash Commands

Open Claude Code in this project and use these commands:

### Build Features
| Command | What Claude Does |
|---------|-----------------|
| `/add-feature post` | Creates the full stack: Zod schema, Mongoose model, service, tRPC router, React page + components |
| `/add-page dashboard` | Creates React page, adds route, adds nav link |
| `/add-schema comment` | Creates Zod schema with create/update variants and inferred TypeScript types |
| `/add-service comment` | Creates service with CRUD + tRPC router, wires it up |
| `/add-hook useDebounce` | Creates custom React hook with proper patterns |
| `/add-middleware rateLimit` | Creates Express or tRPC middleware |
| `/add-auth` | Adds full JWT auth: registration, login, guards, protected routes, React context |

### Mobile
| Command | What Claude Does |
|---------|-----------------|
| `/add-screen profile` | Creates React Native screen, registers in navigator |
| `/add-mobile-feature post` | Full mobile feature: screen + components + navigation (uses existing backend) |

### Maintain & Ship
| Command | What Claude Does |
|---------|-----------------|
| `/review` | Reviews code against project rules: type safety, file size, security, conventions |
| `/test user` | Writes Vitest tests for a feature (unit + integration) |
| `/refactor UserList` | Refactors code while respecting 300-line limit and project patterns |
| `/debug "form not submitting"` | Traces the issue across the full stack systematically |
| `/explain tRPC` | Explains how a concept works in this specific codebase |
| `/optimize queries` | Performance audit with actionable fixes |
| `/deploy docker` | Prepares for deployment (Docker, Railway, VPS) |
| `/setup` | First-time project setup |

## Project Structure

```
├── CLAUDE.md                      # Claude reads this automatically
├── .claude/
│   ├── settings.json              # Pre-approved safe commands
│   └── commands/                  # 17 slash commands (the docs ARE skills)
├── src/
│   ├── shared/                    # THE source of truth (web + mobile + server)
│   │   ├── schemas/               # Zod schemas = types + validation
│   │   └── constants/             # Shared constants
│   ├── server/
│   │   ├── db/                    # MongoDB connection + seed
│   │   ├── models/                # Mongoose models
│   │   ├── services/              # Business logic (framework-agnostic)
│   │   ├── routers/               # tRPC endpoints (thin wiring layer)
│   │   └── trpc/                  # tRPC setup + auth middleware
│   └── client/                    # React web frontend
│       ├── components/            # One component per file
│       ├── pages/                 # One page per route
│       ├── hooks/                 # Custom hooks
│       └── utils/                 # tRPC client setup
├── │   └── mobile/                    # React Native (Expo)
│   ├── src/
│   │   ├── screens/               # One screen per file
│   │   ├── components/            # Native UI components
│   │   ├── hooks/                 # Mobile-specific hooks
│   │   ├── navigation/            # React Navigation setup
│   │   └── utils/                 # tRPC client (same types!)
│   ├── App.tsx                    # Mobile entry point
│   └── package.json               # Mobile dependencies
├── docs/                          # Reference docs (skills are primary)
└── package.json                   # Web + server dependencies
```

**Every source file is under 300 lines.** Claude reads files in full — no truncation, no missed context.

## npm Scripts

```bash
# Web + Server
npm run dev          # Start web frontend + backend together
npm run dev:client   # Vite only (port 3000)
npm run dev:server   # Express only with hot reload (port 4000)
npm run build        # Production build
npm run typecheck    # Type check
npm run lint         # ESLint
npm run test         # Vitest
npm run db:seed      # Seed sample data

# Mobile (from src/mobile/ directory)
cd src/mobile && npm install   # Install mobile deps (first time)
cd src/mobile && npm run dev   # Start Expo dev server
cd src/mobile && npm run ios   # iOS simulator
cd src/mobile && npm run android  # Android emulator
```

## How It Works

The key insight: **Zod schemas in `src/shared/` are the single source of truth.**

1. You define a Zod schema once (e.g., `userSchema`)
2. TypeScript types are **inferred** from the schema (`type User = z.infer<typeof userSchema>`)
3. tRPC uses the schema to **validate** API input
4. tRPC **infers** the return type from your service function
5. React Query (on web and mobile) **inherits** all types from tRPC
6. Your web component AND React Native screen are **fully typed** without writing a single interface

This means:
- Add a field to the schema → server, web, and mobile all know about it
- Remove a field → TypeScript errors show you every place that needs updating
- No API type files. No codegen. No manual sync.

## Requirements

- Node.js 18+
- MongoDB (local or [Atlas](https://www.mongodb.com/atlas))
- [Claude Code](https://claude.com/claude-code) (to use slash commands)

## License

MIT
