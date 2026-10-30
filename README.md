# Sheeladitya Vinay Kumar — Portfolio & AI Agent Platform

Interactive developer portfolio website featuring Bento-grid layout, terminal simulator, project modals, and an integrated AI agent assistant (**"Stranger"**).

## Tech Stack
- **Framework:** Next.js 16 (App Router)
- **UI Library:** React 19, Tailwind CSS v4
- **Language:** TypeScript
- **Linter:** ESLint 9 (`eslint-config-next`)

## Development Commands
- `npm run dev` - Start local development server (default: `http://localhost:3000`)
- `npm run build` - Create production build
- `npm run start` - Start production server
- `npm run lint` - Run ESLint code checks

## Project Structure
- `src/app/` - Next.js App Router pages and API routes:
  - `page.tsx` - Main portfolio page (bento grid layout)
  - `layout.tsx` - Root layout with fonts, metadata, and theme
  - `projects/page.tsx` - Detailed projects showcase
  - `api/chat/route.ts` - AI assistant chat API endpoint
  - `api/contact/route.ts` - Contact form submission endpoint
- `src/components/` - Reusable UI components:
  - `AIAgentModal.tsx` - Interactive AI assistant modal
  - `HeroBento.tsx`, `ProjectsBento.tsx`, `SkillsBento.tsx`, `ExperienceBento.tsx`, `ContactBento.tsx`
  - `Header.tsx`, `Footer.tsx`, `Toast.tsx`
- `src/data/` - Static data (`portfolioData.ts`)
- `src/lib/` - Shared utilities and AI engines (`aiAgentEngine.ts`)

---
🤖 Generated with [Claude Code](https://claude.com/claude-code)
