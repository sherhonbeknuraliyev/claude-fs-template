---
name: ui-ux-designer
description: UI/UX design patterns for React and React Native. Use when designing user interfaces, creating design systems, generating color palettes, planning user research, creating personas, journey mapping, or working on visual consistency across web and mobile.
---

# UI/UX Designer Skill

## Shared Theme — `src/shared/constants/theme.ts`

Single source of truth for both web (CSS vars) and mobile (StyleSheet).

```ts
export const theme = {
  colors: {
    primary:  { 50:'#eff6ff', 100:'#dbeafe', 200:'#bfdbfe', 300:'#93c5fd',
                400:'#60a5fa', 500:'#3b82f6', 600:'#2563eb', 700:'#1d4ed8',
                800:'#1e40af', 900:'#1e3a8a' },
    gray:     { 50:'#f9fafb', 100:'#f3f4f6', 200:'#e5e7eb', 300:'#d1d5db',
                400:'#9ca3af', 500:'#6b7280', 600:'#4b5563', 700:'#374151',
                800:'#1f2937', 900:'#111827' },
    semantic: {
      success: '#16a34a', warning: '#d97706',
      error:   '#dc2626', info:    '#0284c7',
    },
  },
  spacing: { 0:0, 1:4, 2:8, 3:12, 4:16, 5:20, 6:24, 8:32, 10:40, 12:48, 16:64 },
  radius:  { sm:4, md:8, lg:12, xl:16, full:9999 },
  font: {
    size: { xs:12, sm:14, base:16, lg:18, xl:20, '2xl':24, '3xl':30, '4xl':36 },
    weight: { normal:'400', medium:'500', semibold:'600', bold:'700' } as const,
    family: { sans:'Inter, system-ui, sans-serif', mono:'JetBrains Mono, monospace' },
  },
  shadow: {
    sm: '0 1px 2px rgb(0 0 0/0.05)',
    md: '0 4px 6px -1px rgb(0 0 0/0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0/0.1)',
  },
} as const;

export type Theme = typeof theme;
```

---

## Web: CSS Custom Properties

Inject at app root (e.g., `index.css` or a `ThemeProvider`):

```ts
// src/client/utils/injectCssVars.ts
import { theme } from '@shared/constants/theme.js';

export function injectCssVars() {
  const root = document.documentElement.style;
  Object.entries(theme.colors.primary).forEach(([k, v]) =>
    root.setProperty(`--color-primary-${k}`, v));
  Object.entries(theme.spacing).forEach(([k, v]) =>
    root.setProperty(`--spacing-${k}`, `${v}px`));
}
```

```css
/* Usage in CSS */
.btn { background: var(--color-primary-500); padding: var(--spacing-2) var(--spacing-4); }
```

---

## Typography Scale (1.25 ratio, fluid web)

| Token  | Size   | Fluid (clamp)                         |
|--------|--------|---------------------------------------|
| xs     | 12px   | —                                     |
| sm     | 14px   | —                                     |
| base   | 16px   | `clamp(14px, 2vw, 16px)`             |
| lg     | 18px   | `clamp(16px, 2.5vw, 18px)`           |
| xl     | 20px   | `clamp(18px, 3vw, 20px)`             |
| 2xl    | 24px   | `clamp(20px, 3.5vw, 24px)`           |
| 3xl    | 30px   | `clamp(24px, 4vw, 30px)`             |
| 4xl    | 36px   | `clamp(28px, 5vw, 36px)`             |

---

## Spacing System (8pt grid)

| Token | px  | Use case              |
|-------|-----|-----------------------|
| 1     | 4   | Icon gap, tight items |
| 2     | 8   | Input padding         |
| 3     | 12  | Card inner padding    |
| 4     | 16  | Section gap           |
| 6     | 24  | Card padding          |
| 8     | 32  | Section spacing       |
| 12    | 48  | Page section gap      |
| 16    | 64  | Hero spacing          |

---

## Responsive Breakpoints

| Name | Min-width | Target              |
|------|-----------|---------------------|
| sm   | 640px     | Large phone         |
| md   | 768px     | Tablet portrait     |
| lg   | 1024px    | Tablet landscape    |
| xl   | 1280px    | Desktop             |
| 2xl  | 1536px    | Wide desktop        |

---

## WCAG Contrast Requirements

| Level | Normal text | Large text (18pt+) | UI components |
|-------|-------------|--------------------|-|
| AA    | 4.5:1       | 3:1                | 3:1 |
| AAA   | 7:1         | 4.5:1              | — |

Primary-500 on white = 4.6:1 (AA pass). Primary-600 on white = 6.3:1 (AAA pass).

---

## React Component — Variant Pattern

```tsx
// src/client/components/Button.tsx
import { theme } from '@shared/constants/theme.js';

type Size = 'sm' | 'md' | 'lg';
type Variant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: Size;
  variant?: Variant;
}

const sizeStyles: Record<Size, string> = {
  sm:  'px-3 py-1.5 text-sm',
  md:  'px-4 py-2 text-base',
  lg:  'px-6 py-3 text-lg',
};

const variantStyles: Record<Variant, string> = {
  primary:   'bg-primary-500 text-white hover:bg-primary-600',
  secondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
  ghost:     'bg-transparent text-primary-600 hover:bg-primary-50',
};

export function Button({ size = 'md', variant = 'primary', className = '', ...props }: ButtonProps) {
  return (
    <button
      className={`rounded-lg font-medium transition-colors ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    />
  );
}
```

---

## React Native Component — Same Theme

```tsx
// src/mobile/components/Button.tsx
import { StyleSheet, Pressable, Text } from 'react-native';
import { theme } from '@shared/constants/theme.js';

type Size = 'sm' | 'md' | 'lg';
type Variant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps {
  label: string;
  onPress: () => void;
  size?: Size;
  variant?: Variant;
}

export function Button({ label, onPress, size = 'md', variant = 'primary' }: ButtonProps) {
  return (
    <Pressable style={[styles.base, styles[size], styles[variant]]} onPress={onPress}>
      <Text style={[styles.label, variant === 'primary' ? styles.labelLight : styles.labelDark]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base:       { borderRadius: theme.radius.md, alignItems: 'center' },
  sm:         { paddingHorizontal: theme.spacing[3], paddingVertical: theme.spacing[1] },
  md:         { paddingHorizontal: theme.spacing[4], paddingVertical: theme.spacing[2] },
  lg:         { paddingHorizontal: theme.spacing[6], paddingVertical: theme.spacing[3] },
  primary:    { backgroundColor: theme.colors.primary[500] },
  secondary:  { backgroundColor: theme.colors.gray[100] },
  ghost:      { backgroundColor: 'transparent' },
  label:      { fontSize: theme.font.size.base, fontWeight: theme.font.weight.medium },
  labelLight: { color: '#ffffff' },
  labelDark:  { color: theme.colors.gray[800] },
});
```

---

## Cross-Platform Consistency

```
src/shared/constants/theme.ts   ← single source
        ├── Web: CSS custom properties (injectCssVars)
        │         Tailwind config (theme.extend)
        └── Mobile: StyleSheet.create({ ... theme.spacing[4] ... })
```

Rule: never hardcode a color or spacing value. Always reference `theme.*`.

---

## UX: Persona Template

```
Name: [Archetype name]
Role: [Job title], [Company type]
Age: [Range]  |  Tech comfort: Low / Mid / High

Goals:         1. [Primary goal]  2. [Secondary goal]
Frustrations:  1. [Pain point]    2. [Pain point]
Behavior:      [1-2 sentences on how they use the product]
Quote:         "[Representative quote]"
```

---

## Journey Map Stages

| Stage       | User action          | Emotion | Touchpoint     | Opportunity          |
|-------------|----------------------|---------|----------------|----------------------|
| Awareness   | Sees ad / referral   | Curious | Social, search | Clear value prop     |
| Onboarding  | Signs up, first use  | Hopeful | App, email     | Reduce friction      |
| Activation  | Hits "aha" moment    | Excited | Core feature   | Shorten time-to-value|
| Retention   | Returns after day 3  | Habit   | Push, email    | Habit loop           |
| Advocacy    | Refers a friend      | Proud   | Share flow     | Referral incentive   |

---

## Usability Test Planning

| Method          | Sample size | When to use              | Cost  |
|-----------------|-------------|--------------------------|-------|
| Moderated 1:1   | 5–8         | Early concept validation | High  |
| Unmoderated     | 15–30       | Task flow testing        | Med   |
| 5-second test   | 20+         | First impression clarity | Low   |
| A/B test        | 100+/arm    | Conversion optimization  | Low   |
| Card sorting    | 15–20       | Navigation/IA            | Med   |

**Checklist before testing:**
- [ ] Defined hypotheses (not just "what do users think?")
- [ ] Tasks written as goals, not instructions ("Find a plan" not "Click pricing")
- [ ] Screener for target persona
- [ ] Consent form ready
- [ ] Recording method confirmed

---

## Research Synthesis

**Coding tags:** `#navigation` `#onboarding` `#performance` `#copy` `#confusion` `#delight`

**Priority score** = Frequency × Severity

| Severity  | Score | Definition                              |
|-----------|-------|-----------------------------------------|
| Critical  | 4     | Blocks task completion                  |
| Major     | 3     | Significant struggle, workaround needed |
| Minor     | 2     | Friction, but task completed            |
| Cosmetic  | 1     | Preference, no impact on task           |

Fix Critical first. Ignore Cosmetic until Critical/Major are resolved.

**Synthesis template:**
```
Finding: [1 sentence]
Evidence: "[quote]" — User 3; also seen in Users 1, 5, 7
Tag: #onboarding
Score: 3 × 4 = 12 → Priority: HIGH
Recommendation: [Specific design change]
```
