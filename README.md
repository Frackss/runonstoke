# Apex Run Recovery

A clean frontend MVP for a runners-only recovery and performance dashboard with a demo account flow.

## Install

```bash
npm install
```

## Run

```bash
npm run dev
```

Open `http://localhost:3000`.

Use **Demo Athlete Login** to enter the local demo account.

## Build Check

```bash
npm run lint
npm run build
```

## Dependencies

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui-style primitives: Card, Badge, Separator, Avatar, Progress
- Recharts
- Framer Motion
- Lucide React

## Structure

```text
app/
  globals.css
  layout.tsx
  page.tsx
  (demo)/
components/
  chart-card.tsx
  dashboard-charts.tsx
  motion-shell.tsx
  recovery-card.tsx
  stat-card.tsx
  ui/
data/
  demo-athlete.ts
lib/
  utils.ts
```
