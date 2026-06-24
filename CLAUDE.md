# Project notes

## Verify after each iteration

Use the pnpm scripts (not raw `npx`/`astro`). Run after each change:

```bash
pnpm run format:write
pnpm run lint:check
pnpm run typecheck
pnpm run build
```

All four must pass before considering a change done.

## Package manager

pnpm only. Node >=24, pnpm >=10 (`engineStrict`).
