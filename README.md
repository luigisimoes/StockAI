# StockAI Replenishment Redesign

A working prototype redesigning the Replenishment feature of StockAI, a fictional retail intelligence SaaS. Built as a case study for [Foundey](https://foundey.com)'s Senior Product Designer placement program.

## Why this exists

The brief asked for a Figma file. I built a working prototype too, because the design is about AI trust as a UI primitive, and that is hard to evaluate from a static frame.

## Live URL

https://stockai-replen.vercel.app

## Figma file

[Public view-only link]

## Stack

React 19 · TypeScript · Vite 6 · Tailwind v4 · shadcn/ui · Motion · Lucide · Zustand · Vercel

## Three experiences

1. **Opportunity Dashboard** — AI-prioritized feed of 8 recommendations, ranked by impact
2. **AI Recommendation Review** — single-SKU drawer with live what-if slider, 4 tabs, Ask AI panel
3. **Bulk Approve Dialog** — aggregate impact preview before mass commit

## The "Ask about this rec" feature

A designed conversation simulator. Demonstrates how AI explainability would feel as a first-class UI primitive. Real Anthropic API integration is on the v1.1 roadmap.

## Run locally

```
npm install
npm run dev
```

## Author

Luigi Simões · [luigi.is](https://luigi.is) · Senior Product Designer
