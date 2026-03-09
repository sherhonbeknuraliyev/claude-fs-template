# claude-fs-template

A fullstack TypeScript template built by Claude, for Claude users.

Every design decision — file size limits, folder structure, documentation, shared types — is optimized for AI-assisted development with [Claude Code](https://claude.com/claude-code).

## Stack

| Layer | Tech |
|-------|------|
| Frontend | React 19 + Vite + TypeScript |
| Backend | Express + tRPC v11 |
| Database | MongoDB + Mongoose |
| Validation | Zod (shared between client & server) |
| State | React Query (via tRPC) |
| Routing | React Router v7 |

## Why This Template?

**Built for AI pair programming:**

- **CLAUDE.md** at root — Claude reads this automatically and understands the entire project
- **All files < 300 lines** — Claude reads the full file every time, no truncation
- **Slash commands** — Type `/add-feature post` and Claude scaffolds the full stack
- **Shared Zod schemas** — Single source of truth, no type duplication
- **tRPC** — Zero manual API types. Change a return type on the server, the client knows instantly
- **Predictable patterns** — Every feature follows the same schema → model → service → router → page flow

## Quick Start

```bash
# Clone the template
gh repo create my-app --template sherhonbeknuraliyev/claude-fs-template --public --clone
cd my-app

# Let Claude set it up for you
# Just type: /setup
# Or manually:
cp .env.example .env
npm install
npm run dev
```

Frontend runs on `http://localhost:3000`, API on `http://localhost:4000`.

## Project Structure

```
├── CLAUDE.md                    # AI context (Claude reads this first)
├── .claude/
│   ├── settings.json            # Pre-approved safe commands
│   └── commands/                # Custom slash commands
│       ├── add-feature.md       # /add-feature <name>
│       ├── add-page.md          # /add-page <name>
│       ├── add-schema.md        # /add-schema <name>
│       ├── add-service.md       # /add-service <name>
│       ├── setup.md             # /setup
│       └── debug.md             # /debug <description>
├── docs/                        # AI-oriented documentation
│   ├── ARCHITECTURE.md          # System design & data flow
│   ├── CONVENTIONS.md           # Code style rules
│   └── ADDING_FEATURES.md       # Step-by-step feature guide
├── src/
│   ├── shared/                  # Shared between client & server
│   │   ├── schemas/             # Zod schemas = types + validation
│   │   └── constants/           # App-wide constants
│   ├── server/                  # Express + tRPC backend
│   │   ├── db/                  # Connection + seed scripts
│   │   ├── models/              # Mongoose models
│   │   ├── services/            # Business logic
│   │   ├── routers/             # tRPC route handlers
│   │   └── trpc/                # tRPC setup + auth middleware
│   └── client/                  # React frontend
│       ├── components/          # Reusable UI components
│       ├── pages/               # Route-level pages
│       ├── hooks/               # Custom React hooks
│       └── utils/               # tRPC client, helpers
└── package.json                 # Single project, one install
```

## Claude Slash Commands

These are custom Claude Code commands you can use in any conversation:

| Command | What it does |
|---------|-------------|
| `/add-feature post` | Scaffolds full CRUD: schema + model + service + router + page |
| `/add-page dashboard` | Creates a new React page with routing and nav link |
| `/add-schema comment` | Creates a Zod schema with create/update variants and types |
| `/add-service comment` | Creates service + tRPC router for an existing schema |
| `/setup` | First-time project setup (env, install, seed, start) |
| `/debug "users not loading"` | Systematic debugging across the full stack |

## How Types Flow

```
Zod Schema (shared/)
    ↓ validates input
tRPC Router (server/routers/)
    ↓ infers return type
React Query Hook (client/)
    ↓ auto-typed
Your Component — full type safety, zero manual types
```

You never write `interface ApiResponse { ... }`. It's all inferred.

## Commands

```bash
npm run dev          # Start client + server concurrently
npm run dev:client   # Vite dev server only
npm run dev:server   # Express with hot reload
npm run build        # Production build
npm run typecheck    # Type check without emit
npm run lint         # ESLint
npm run test         # Vitest
npm run db:seed      # Seed database
```

## Adding a Feature

The fastest way: type `/add-feature <name>` in Claude Code.

Or follow the manual steps in [docs/ADDING_FEATURES.md](docs/ADDING_FEATURES.md).

## License

MIT
