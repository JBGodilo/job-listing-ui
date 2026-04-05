# JobConnect

A modern job listing platform built with React and TypeScript, featuring advanced filtering, search, and pagination.

## Features

- **Job Search** — Search jobs by title, company, or description
- **Multi-Filter Sidebar** — Filter by category (Engineering, Design, Marketing, Sales, Product, Customer Support) and job type (Full-time, Part-time, Contract, Remote)
- **Pagination** — Browse results with page navigation
- **URL-Based State** — Filters and search terms are preserved in the URL
- **Animated UI** — Smooth transitions and loading skeletons powered by Motion

## Tech Stack

- **React 19** with **TypeScript**
- **Vite** for build tooling
- **Tailwind CSS 4** for styling
- **React Router DOM** for client-side routing
- **TanStack React Query** for data fetching and caching
- **Motion** for animations
- **Lucide React** for icons

## Project Structure

```
src/
├── App.tsx                # Root component (QueryClient + Router)
├── main.tsx               # Entry point
├── types.ts               # Shared TypeScript interfaces & enums
├── index.css              # Tailwind imports & theme config
├── components/
│   ├── JobsPage.tsx       # Main page with search & layout
│   ├── FiltersSidebar.tsx # Category & job type filter checkboxes
│   ├── JobsList.tsx       # Animated job card list with loading skeleton
│   └── Pagination.tsx     # Page navigation
├── services/
│   └── jobService.ts      # Data fetching & filtering logic (mock data)
└── lib/
    └── utils.ts           # Tailwind class merge utility
```

## Getting Started

**Prerequisites:** Node.js

1. Install dependencies:
   ```sh
   npm install
   ```
2. Start the dev server:
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
