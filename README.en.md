<p align="center">
  <a href="./README.md">Versão em Português</a>
</p>

<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f172a,50:111827,100:0f766e&height=220&section=header&text=Nexus%20CRM&fontSize=48&fontColor=ffffff&animation=fadeIn&fontAlignY=38&desc=Modern%20Sales%20Pipeline%20%7C%20AI-Assisted%20CRM%20%7C%20Full-Stack%20Product&descAlignY=58&descSize=18" alt="Nexus CRM Banner" />
</p>

<h1 align="center">Nexus CRM</h1>

<p align="center">
  A modern CRM for lead management, sales pipeline operations, and customer follow-up,
  built with a strong focus on <strong>real product thinking</strong>, <strong>scalable architecture</strong>, and <strong>engineering quality</strong>.
</p>

<p align="center">
  <a href="https://mini-crm-sigma-one.vercel.app/"><strong>Live Demo</strong></a>
  ·
  <a href="#overview"><strong>Overview</strong></a>
  ·
  <a href="#features"><strong>Features</strong></a>
  ·
  <a href="#architecture"><strong>Architecture</strong></a>
  ·
  <a href="#local-setup"><strong>Setup</strong></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-20232A?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Bun-Runtime-F9F1E1?style=for-the-badge&logo=bun&logoColor=black" alt="Bun" />
  <img src="https://img.shields.io/badge/PostgreSQL-Neon-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma" alt="Prisma" />
  <img src="https://img.shields.io/badge/Better%20Auth-Auth-111827?style=for-the-badge" alt="Better Auth" />
  <img src="https://img.shields.io/badge/Tailwind-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Playwright-E2E-2EAD33?style=for-the-badge&logo=playwright&logoColor=white" alt="Playwright" />
  <img src="https://img.shields.io/badge/Vitest-Testing-6E9F18?style=for-the-badge&logo=vitest&logoColor=white" alt="Vitest" />
</p>

---

## Overview

**Nexus CRM** is a sales-oriented customer management system designed to organize leads, track interactions, and provide clear visibility into the sales pipeline.

This project was built as a **real full-stack product**, not just a UI showcase.

It combines:

- lead management with a Kanban pipeline
- customer interaction timeline
- multi-user authentication
- KPI dashboard
- PostgreSQL full-text search
- AI-assisted features powered by Groq
- Cloudflare R2-ready file storage layer

**Live demo:**  
👉 https://mini-crm-sigma-one.vercel.app/

---

## Preview

### Landing Page

![Landing Page](./docs/landing-page.png)

### Dashboard

![Dashboard](./docs/dashboard.png)

### Pipeline

![Pipeline](./docs/pipeline.png)

### Leads

![Leads](./docs/leads.png)

---

## Why this project matters

In a senior-level portfolio context, the value of this project is not just in the features themselves, but in **how they are modeled, structured, and delivered**.

**Nexus CRM** demonstrates the ability to:

- turn business requirements into a usable product
- model domain logic in a scalable relational structure
- build a coherent architecture across frontend, backend, and persistence
- integrate authentication, analytics, drag-and-drop, and AI into a single product
- balance user experience with technical clarity
- deliver software with product thinking, not just isolated features

---

## Features

| Category      | Feature                         | Status |
| ------------- | ------------------------------- | ------ |
| Auth          | Email/password login            | ✅     |
| Auth          | User registration               | ✅     |
| Auth          | Database-backed sessions        | ✅     |
| Multi-tenant  | Organization-based tenancy      | ✅     |
| Multi-tenant  | Member access control           | ✅     |
| CRM           | Lead registration               | ✅     |
| CRM           | Kanban sales pipeline           | ✅     |
| CRM           | Drag and drop between stages    | ✅     |
| CRM           | Detailed lead profile           | ✅     |
| CRM           | Interaction timeline            | ✅     |
| CRM           | Lead tags                       | ✅     |
| Analytics     | KPI dashboard                   | ✅     |
| Analytics     | Stage conversion metrics        | ✅     |
| Analytics     | Average ticket / pipeline value | ✅     |
| Search        | PostgreSQL full-text search     | ✅     |
| Export        | CSV export                      | ✅     |
| AI            | Groq lead scoring               | ✅     |
| AI            | Next action suggestion          | ✅     |
| UX            | Dark / Light mode               | ✅     |
| UX            | Responsive from 375px to 4K     | ✅     |
| Infra         | Cloudflare R2 ready             | 🟡     |
| Export        | PDF export                      | 🟡     |
| Collaboration | Member invitations              | 🟡     |

---

## Stack

### Frontend

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- Motion
- Recharts
- dnd-kit
- TanStack Query
- Zustand

### Backend and data

- Next.js App Router
- Server Components
- Server Actions
- Prisma ORM
- PostgreSQL
- Neon
- Better Auth
- Zod
- Groq SDK

### Quality

- Vitest
- Playwright
- ESLint
- TypeScript typecheck

### Runtime

- Bun
- Turbopack

---

## Architecture

```text
src/
├── app/
├── features/
│   ├── auth/
│   ├── dashboard/
│   ├── leads/
│   ├── pipeline/
│   └── marketing/
├── shared/
├── generated/
└── ...
prisma/
├── schema.prisma
└── seed.ts
```

### Visual architecture

```mermaid
flowchart LR
    U[User] --> N[Next.js App Router]
    N --> P[Public Pages]
    N --> A[Authenticated Areas]

    A --> S[Server Components]
    A --> C[Client Components]

    S --> BA[Better Auth]
    S --> SA[Server Actions / Queries]
    SA --> PR[Prisma ORM]
    PR --> DB[(PostgreSQL / Neon)]

    SA --> GQ[Groq SDK]
    SA --> R2[Cloudflare R2 - ready]

    C --> DD[dnd-kit Kanban]
    C --> RC[Recharts]
    C --> TH[Theme / UI State]
```

---

## Testing strategy

```text
E2E (Playwright)         ← Critical flows: login, create lead, move pipeline
Integration (Vitest)     ← API routes, Prisma queries, AI service
Unit tests               ← Utils, formatters, scoring, validation
```

### Commands

```bash
bun run test
bun run test:watch
bun run test:coverage
bun run test:e2e
bun run test:e2e:ui
bun run test:e2e:headed
```

---

## Local setup

### Requirements

- Bun
- PostgreSQL
- `.env` file

### Install

```bash
bun install
bun run db:generate
bun run db:migrate
bun run db:seed
bun dev
```

Application runs at:

```bash
http://localhost:3000
```

### Environment variables

```env
DATABASE_URL=""
DIRECT_URL=""
BETTER_AUTH_SECRET=""
BETTER_AUTH_URL=""
NEXT_PUBLIC_APP_URL=""
GROQ_API_KEY=""
R2_ACCOUNT_ID=""
R2_ACCESS_KEY_ID=""
R2_SECRET_ACCESS_KEY=""
R2_BUCKET_NAME=""
R2_PUBLIC_URL=""
R2_APPI_URL=""
```

---

## Infrastructure

| Layer         | Technology            |
| ------------- | --------------------- |
| Frontend      | Next.js 16 + React 19 |
| Runtime       | Bun                   |
| Database      | PostgreSQL            |
| Production DB | Neon                  |
| ORM           | Prisma                |
| Auth          | Better Auth           |
| AI            | Groq                  |
| Storage       | Cloudflare R2 (ready) |
| Deploy        | Vercel                |

---

## Senior portfolio value

This project was designed to showcase:

- product thinking
- full-stack execution
- domain modeling
- real authentication
- workflow-oriented UI
- AI integration
- maintainable architecture

In a hiring context, **Nexus CRM** demonstrates the ability to turn a business problem into a coherent software product with strong technical foundations.

---

## Author

**Douglas Maciel**  
Full Stack Developer / Software Engineer

---

## License

This project is available for study, portfolio, and technical demonstration purposes.
