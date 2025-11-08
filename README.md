# Raksul Paper Printing Price Table

This project implements the price table UI for Raksul’s paper printing. It follows a feature-first architecture and includes unit and e2e tests.

## Demo (local)
- Start: npm run dev then open http://localhost:3000

## Setup
1. Copy .env.example to .env.local and adjust `NEXT_PUBLIC_API_BASE_URL` if needed.
2. Install dependencies: `npm install`
3. Run development server: `npm run dev`
4. Unit tests: `npm test`
5. E2E tests: `npm run test:e2e`

## Tech choices
- Next.js App Router.
- React Query for server data caching and request dedupe.
- Redux Toolkit + Redux Thunk to manage app state (paper size, selection, expanded rows). Context could be used for theming as needed.
- Axios for HTTP, Lodash as utility library if needed.
- Styling via Material UI (MUI) components for the main UI (selector, grid cells, order bar) with Emotion styling under the hood. Tailwind utilities remain in the layout where convenient.
- Custom number formatter in `src/shared/utils/number.ts` that doesn’t use `toLocaleString` or `Intl.NumberFormat` (requirement satisfied).

## Architecture
- `src/features/priceTable`: all code for this feature
  - `components`: UI elements (selector, grid, order bar)
  - `containers`: compose feature, connect hooks and store
  - `hooks`: data fetching with React Query
  - `misc`: constants and types
  - `store`: Redux slice
- `src/shared`: reusable code (providers, store, api client, utils)

## How pricing works
- Prices are fetched from `GET /prices?paper_size=<A4|A5|B4|B5>` from the provided cloud function.
- The grid displays rows of quantities and columns of business days.
- Interactions:
  - Hover highlights the cell and faintly highlights row/column.
  - Clicking selects a cell; selection is outlined and the price shows in the Order bar.
  - "See more" reveals all 10 quantity rows (initially 5).

## Notes
- Works on latest Chrome/Firefox.
- Husky can be enabled with `npm run prepare` to add a Git pre-commit hook. You can configure it to run lint/tests.
- If you replicate algorithms, cite sources; our number-format algorithm uses a standard reverse-chunk technique.
