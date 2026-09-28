# AGENTS.md

Conventions for anyone (human or agent) changing this repo.

## Layout

- `apps/landing`: Astro site at `https://cudz.io/`. It also hosts `/legal/` and `/privacy/`.
- `apps/blog`: Astro site at `https://cudz.io/thinking-inside-the-box/` (`base: '/thinking-inside-the-box'`). There is no `/blog` path, and there must never be one.
- `packages/szyk`: the Szyk design system. It provides tokens, CSS, React Aria Components, Astro head helpers and Storybook (`https://szyk.cudz.io/`). It ships source; there is no library build.
- `deploy/site`: assembles both apps into one `dist` and holds the Worker for headers, pageviews and `/_v` vitals.
- `deploy/szyk`: Storybook deploy config.
- `infra/stats`: self-hosted Plausible CE (Hetzner), reachable only through Cloudflare Tunnel and Access.
- `.devcontainer/`: the one development environment. `bin/setup` prepares any environment, with or without it.

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

## Environment

All work happens in the devcontainer: locally, on a VM, in Codespaces, and in CI. The host needs only a container runtime plus an editor with Dev Containers support or the [devcontainer CLI](https://github.com/devcontainers/cli).

- **`.devcontainer/Dockerfile`** is the toolchain: Vite+'s official image (`vp`, git, a non-root `vp` user) and the Claude Code, Codex and Cursor CLIs. It is pinned by digest, and Dependabot bumps it.
- **`bin/setup`** installs only what an environment lacks (`vp`, gitleaks), then the dependencies. It is idempotent. The devcontainer and Cursor cloud agents (`.cursor/environment.json`) run it on create. Claude Code on the web runs it from the SessionStart hook in `.claude/settings.json`. Codex cloud runs it as the environment's setup script (`bin/setup`, set in the Codex UI).
- **Node** comes from `engines.node` and **pnpm** from `packageManager` in `package.json`; `vp` provisions both. There is no other version file.
- **Sign-ins** for Claude, Codex, Cursor and `gh` live in `~/.config`, a named volume (`devcontainer-config`) that survives rebuilds.
- Commit inside the devcontainer: the git hooks run `vp` and gitleaks, which exist only there.

## Tooling

- Vite+ (`vp`) is the whole toolchain: Oxfmt, Oxlint with type checks, Vitest, Vite and the task runner, all configured in `vite.config.ts`. Shared dependency versions go in the `catalog:` in `pnpm-workspace.yaml`.
- TypeScript stays on 6.0.x (required by `@astrojs/check`) until that constraint lifts. Vite+ 1.0 bundles Vitest 5, while `@storybook/addon-vitest` 10.6 accepts only Vitest ^3 || ^4, so Storybook tests in `packages/szyk` need a package-local Vitest 4 until Storybook catches up.
- `pmOnFail: ignore` in `pnpm-workspace.yaml` stops pnpm 12 from writing itself into `pnpm-lock.yaml` as a second YAML document, which GitHub's dependency graph can't read. Keep it.
- gitleaks is pinned in `bin/setup`, the only place it is installed. Bump it there by hand.
- `main` is protected: changes land through pull requests merged with **squash** (linear history). Commits on `main` must be signed; GitHub signs squash merges, rebase merges would land unsigned. No direct pushes or force pushes.
- Before committing, run `vp run ready` (the same gate CI runs). The pre-commit hook in `.vite-hooks/` runs gitleaks and `vp staged`.

<!--VITE PLUS START-->

# Using Vite+, the Unified Toolchain for the Web

This project is using Vite+, a unified toolchain built on top of Vite, Rolldown, Vitest, tsdown, Oxlint, Oxfmt, and Vite Task. Vite+ wraps runtime management, package management, and frontend tooling in a single global CLI called `vp`. Vite+ is distinct from Vite, and it invokes Vite through `vp dev` and `vp build`. Run `vp help` to print a list of commands and `vp <command> --help` for information about a specific command.

Docs are local at `node_modules/vite-plus/docs` or online at https://viteplus.dev/guide/.

## Built-in Commands vs Scripts

`vp <name>` runs a built-in command. `vp run <name>` runs a `package.json` script or a `vite.config.ts` task. Scripts cannot overwrite built-ins, so `vp dev` and `vp run dev` may do different things. Check `package.json` and `vite.config.ts` first, and run `vp run <name>` when the project defines a script or task with that name.

## Tool Versions

Run `vp toolchain` to show versions and relationships in the active Vite+
release. Add a tool name to select part of the graph. For example, run
`vp toolchain vite`. Use `--global` to ignore the local `vite-plus` package. Use
`vp why <package>` to show the package-manager dependency graph.

## Review Checklist

- [ ] Run `vp install` after pulling remote changes and before getting started.
- [ ] Run `vp check` and `vp test` to format, lint, type check and test changes.
- [ ] Check if there are `vite.config.ts` tasks or `package.json` scripts necessary for validation, run via `vp run <script>`.
- [ ] If setup, runtime, or package-manager behavior looks wrong, run `vp env doctor` and include its output when asking for help.

<!--VITE PLUS END-->
