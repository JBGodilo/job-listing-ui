# JobConnect

A modern job listing frontend built with React 19 and TypeScript. Features checkbox-based filtering by category and job type, paginated results, URL-driven state, and animated UI — all powered by a backend API.

## Features

- **Multi-Filter Sidebar** — Filter by category (Engineering, Design, Marketing) and job type (Full-time, Part-time, Contract) with checkbox controls and a clear-all button
- **Pagination** — Page navigation with previous/next buttons; scrolls to top on page change
- **URL-Driven State** — Filters and page number are stored in URL search params and restored on navigation
- **Animated Cards** — Staggered fade-in transitions for job cards via Motion (Framer Motion)
- **Loading Skeletons** — Pulse-animated placeholder cards during data fetches
- **Error Handling** — Distinct UI for client errors (4xx) and server errors (5xx) with retry support
- **Responsive Layout** — Sidebar stacks vertically on mobile, sits alongside on desktop

## Tech Stack

- **React 19** with **TypeScript 5.8**
- **Vite 6** for build tooling
- **Tailwind CSS 4** (via `@tailwindcss/vite` plugin)
- **React Router DOM 7** for client-side routing and URL state
- **TanStack React Query 5** for data fetching, caching, and retries
- **Motion** for animations
- **Lucide React** for icons

## Project Structure

```
src/
├── main.tsx               # Entry point (React 19, StrictMode)
├── App.tsx                # QueryClientProvider + BrowserRouter, single "/" route
├── index.css              # Tailwind v4 imports, Inter font, base styles
├── types.ts               # Job, JobsMeta, JobsResponse, JobFilters, JobCategory, JobType
├── components/
│   ├── JobsPage.tsx       # Main page: header, sidebar, job list, pagination, error states
│   ├── FiltersSidebar.tsx # Checkbox filter groups (category, type) + clear button
│   ├── JobsList.tsx       # Animated job cards with loading skeletons and empty state
│   └── Pagination.tsx     # Page navigation synced to URL params
├── hooks/
│   └── useJobFilters.ts   # URL-driven filter state management (parse, toggle, clear)
├── services/
│   └── jobService.ts      # fetchJobs() → GET /api/jobs, ApiError class
└── lib/
    └── utils.ts           # cn() utility (clsx + tailwind-merge)
```

## Prerequisites

- **Node.js** (v18+)
- A backend API server running on port **3001** (the Vite dev server proxies `/api` requests to `http://localhost:3001`)

## Getting Started

1. Install dependencies:
   ```sh
   npm install
   ```

2. Start the dev server (port 3000):
   ```sh
   npm run dev
   ```
   The app runs at `http://localhost:3000`.

## Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start dev server         |
| `npm run build`   | Production build         |
| `npm run preview` | Preview production build |
| `npm run lint`    | TypeScript type checking |
| `npm run clean`   | Remove `dist/` folder    |
