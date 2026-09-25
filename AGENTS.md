# AGENTS.md

Conventions for anyone (human or agent) changing this repo.

## Layout

- `apps/landing`: Astro site at `https://cudz.io/`. It also hosts `/legal/` and `/privacy/`.
- `apps/blog`: Astro site at `https://cudz.io/thinking-inside-the-box/` (`base: '/thinking-inside-the-box'`). There is no `/blog` path, and there must never be one.
- `packages/szyk`: the Szyk design system. It provides tokens, CSS, React Aria Components, Astro head helpers and Storybook (`https://szyk.cudz.io/`). It ships source; there is no library build.
- `deploy/site`: assembles both apps into one `dist` and holds the Worker for headers, pageviews and `/_v` vitals.
- `deploy/szyk`: Storybook deploy config.
- `infra/stats`: self-hosted Plausible CE (Hetzner), reachable only through Cloudflare Tunnel and Access.

## Rules

- **Static only.** No server rendering, no admin UIs, no public preview URLs. Production changes happen only via merge to `main` and CI.
- **No third-party requests, ever.** The CSP is `default-src 'self'`. Self-host fonts and images, and add no embeds, CDNs or trackers. `e2e/privacy.spec.ts` enforces this.
- **No cookies, fingerprinting or profiling.** `localStorage` holds only explicit user preferences (theme, analytics opt-out). Honor `Sec-GPC`, `navigator.globalPrivacyControl` and `DNT`.
- **Accessibility is a release blocker.** WCAG 2.2 AA in the default themes and AAA contrast in the high-contrast themes.
  - Use native HTML first; use React Aria Components only for real widgets.
  - Respect `prefers-color-scheme`, `prefers-contrast`, `forced-colors`, `prefers-reduced-motion` and `prefers-reduced-transparency`.
  - Animations are opt-in, inside `@media (prefers-reduced-motion: no-preference)`.
  - Use logical CSS properties.
  - Mark non-English text with `lang` (e.g. `lang="pl"`).
- **Ship almost no JS.** React renders on the server only. Add no `client:*` directive without a strong reason. Budgets are enforced in CI.
- **Blog links** use `import.meta.env.BASE_URL`; never hard-code `/thinking-inside-the-box`.
- **Rights.** All content is all rights reserved with a TDM/AI reservation. Never add an open-content license, and keep the `robots.txt`, TDMRep and `tdm-reservation` signals intact.

## Naming

Every namespace and identifier derives from the domain `cudz.io`.

- Use `cudz.io` wherever dots are allowed: GitHub repo, Hetzner project and server hostnames, Plausible site, Cloudflare Tunnel and Access names.
- Use `cudz-io` where dots aren't allowed: npm scope `@cudz-io/*`, Cloudflare Worker names (`cudz-io`, `szyk-cudz-io`), Docker Compose project names.
- Use `io.cudz.*` where a reverse-DNS id is required.
- Internal dependencies use `workspace:*`, so they never resolve from a registry.

## Tooling

- Toolchain versions come from `mise.toml`. Shared dependency versions go in the `catalog:` in `pnpm-workspace.yaml`.
- TypeScript stays on 6.0.x (required by `@astrojs/check`) and Vitest on 4.1.x (required by `@storybook/addon-vitest`) until those constraints lift.
- `main` is protected: changes land through pull requests merged with **squash** (linear history). Commits on `main` must be signed; GitHub signs squash merges, rebase merges would land unsigned. No direct pushes or force pushes.
- Before committing, run `pnpm lint && pnpm format:check && pnpm typecheck && pnpm test`. Pre-commit hooks run gitleaks, Prettier and Oxlint.
