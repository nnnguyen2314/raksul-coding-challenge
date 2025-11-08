This project implements the Raksul price table feature with a feature-first architecture.

Setup

- Copy .env.example to .env.local and adjust NEXT_PUBLIC_API_BASE_URL if necessary.
- Install dependencies: npm install
- Run dev: npm run dev
- Unit tests: npm test
- E2E tests: npm run test:e2e

Libraries and decisions

- React Query for server caching and request dedupe
- Redux Toolkit + Thunk for app state (selection, UI flags)
- Axios for HTTP; Lodash for utilities (if needed)
- TailwindCSS for lightweight styling; React Toolbox can be integrated similarly if desired.
- Custom number formatter implemented in src/shared/utils/number.ts without Intl APIs.
