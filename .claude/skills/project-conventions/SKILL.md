---
name: project-conventions
description: Core conventions for this fullstack TypeScript project. Use when writing or modifying any code in this repository — enforces file size limits, naming patterns, import style, architectural rules, and mandatory file splitting for new features and integrations.
---

# Project Conventions

## File Rules
- **Max 300 lines per file.** Split before reaching it, not after.
- One component/hook/service/model/router per file.
- Named exports only — never use `export default`.
- Use `.js` extensions in all import paths (ESM requirement).
- Use `import type` for type-only imports.

## Naming Conventions

### Files
| Type | Pattern | Example |
|------|---------|---------|
| Zod schema | `entity.schema.ts` | `post.schema.ts` |
| Mongoose model | `entity.model.ts` | `post.model.ts` |
| Service | `entity.service.ts` | `post.service.ts` |
| External API client | `entity.client.ts` | `stripe.client.ts` |
| tRPC router | `entity.router.ts` | `post.router.ts` |
| Incoming webhook | `entity.webhook.ts` | `stripe.webhook.ts` |
| React component | `EntityName.tsx` | `PostList.tsx` |
| React page | `EntityPage.tsx` | `PostsPage.tsx` |
| React hook | `useEntity.ts` | `usePosts.ts` |
| RN screen | `EntityScreen.tsx` | `UsersScreen.tsx` |
| RN component | `EntityCard.tsx` | `UserCard.tsx` |
| Utility functions | `entity.util.ts` | `date.util.ts` |
| Test | `entity.service.test.ts` | `post.service.test.ts` |

### Code
| Type | Pattern | Example |
|------|---------|---------|
| Schema | `entitySchema` | `postSchema` |
| Create schema | `createEntitySchema` | `createPostSchema` |
| Type | `Entity` | `Post` |
| Model | `EntityModel` | `PostModel` |
| Service | `entityService` | `postService` |
| Router | `entityRouter` | `postRouter` |

## Architecture Rules
- **Shared schemas are the single source of truth.** Never manually define API types.
- Types are inferred from Zod: `type Post = z.infer<typeof postSchema>`
- Services contain business logic. They receive validated data and return plain objects.
- Routers are thin — they wire Zod validation to service calls. No logic in routers.
- Webhook files handle ONLY signature verification and dispatching to the service.
- Components receive typed props. No `any` types.
- Path aliases: `@shared/`, `@client/`, `@server/`, `@mobile/`

---

## Mandatory File Splitting for New Features

**Never put a new feature in one file.** Every feature or integration MUST be split by responsibility from the start.

### Example: Adding a Telegram Bot

```
BAD — everything in one file:
  src/server/telegram.ts  (500 lines — handlers, service, types, routes all mixed)

GOOD — split by responsibility:
  src/shared/schemas/telegram.schema.ts    — Zod schemas for webhook payload, bot commands
  src/server/services/telegram.service.ts  — Core bot logic: send message, handle commands
  src/server/services/telegram.handler.ts  — Update router: dispatches to the correct handler
  src/server/routers/telegram.router.ts    — tRPC procedures for bot management
  src/server/webhooks/telegram.webhook.ts  — Express route for incoming updates
  src/client/pages/TelegramPage.tsx        — Admin UI (if needed)
```

### Example: Adding Stripe Payments

```
BAD — everything in one file:
  src/server/stripe.ts  (600 lines)

GOOD — split by responsibility:
  src/shared/schemas/billing.schema.ts     — Pricing tiers, subscription status types
  src/server/services/stripe.service.ts    — Stripe API calls: checkout, portal, subscription
  src/server/webhooks/stripe.webhook.ts    — Express route for Stripe webhooks (raw body)
  src/server/routers/billing.router.ts     — tRPC procedures: createCheckout, getStatus
  src/client/components/PricingCard.tsx    — Single pricing tier card
  src/client/pages/PricingPage.tsx         — Pricing page with tier cards
```

---

## File Splitting Decision Tree

Before writing any code, answer this:

```
Does the code do more than ONE of these?
  ├── Define types/schemas        → extract to shared/schemas/
  ├── Call an external API        → extract to services/entity.client.ts
  ├── Handle incoming webhooks    → extract to webhooks/
  ├── Define tRPC procedures      → extract to routers/
  ├── Render UI                   → extract to components/ or pages/
  ├── Contain reusable logic      → extract to hooks/ (client) or utils/ (server)
  └── Configure/connect things    → extract to config/ or db/

If YES to 2 or more → MUST split into separate files. No exceptions.
```

---

## Single Responsibility Table

| Responsibility | Where it goes | Max lines |
|---|---|---|
| Types & validation | `shared/schemas/entity.schema.ts` | ~60 |
| Database model | `server/models/entity.model.ts` | ~50 |
| Business logic | `server/services/entity.service.ts` | ~150 |
| External API calls | `server/services/entity.client.ts` | ~100 |
| Incoming webhooks | `server/webhooks/entity.webhook.ts` | ~80 |
| tRPC procedures | `server/routers/entity.router.ts` | ~80 |
| React component | `client/components/EntityCard.tsx` | ~100 |
| React page | `client/pages/EntityPage.tsx` | ~120 |
| React hook | `client/hooks/useEntity.ts` | ~60 |
| RN screen | `mobile/src/screens/EntityScreen.tsx` | ~120 |
| Utility functions | `server/utils/entity.util.ts` | ~60 |

These are soft targets, not hard limits — but if you are approaching them, plan a split before continuing.

---

## The "New Integration" Checklist

When adding ANY external integration (Telegram, Stripe, SendGrid, S3, Twilio, etc.), create these files:

1. `shared/schemas/entity.schema.ts` — Zod types for the integration's data shapes
2. `server/services/entity.service.ts` — wraps the external SDK/API, returns plain objects
3. `server/webhooks/entity.webhook.ts` — if the service sends incoming events (signature verification + dispatch ONLY)
4. `server/routers/entity.router.ts` — tRPC procedures that call the service
5. `client/components/` — one file per visual unit, no combined components
6. **No file over 150 lines for a new integration.** If approaching that limit, split further before finishing.

---

## Splitting Triggers

| Signal | Action |
|---|---|
| File approaching 200 lines | Plan a split now, before it hits 300 |
| 2+ unrelated functions in one file | Extract to separate files |
| Mix of sync + async logic | Likely different concerns — split |
| Imports from 3+ different domains | File is doing too much |
| Hard to name the file with one word | It has multiple responsibilities — split |
| "and" appears in the file's description | "handles webhooks AND sends messages" → 2 files |
| A function is called only from one other function | Consider inlining or extracting to a util |

---

## Splitting Existing Files

- Component does data fetching + rendering → extract tRPC call into a hook in `hooks/`
- Component has multiple visual sections → extract sub-components, one per section
- Service file grows → split by operation type (reads vs. writes, or by sub-domain)
- Router grows → split into sub-routers and merge with `router()` in `routers/index.ts`
- Webhook handler grows → extract each event type handler into the service layer
