# cudz.io

Source for Tomasz Cudziło's corner of the web.

| URL                                        | Project         | What                                                                                              |
| ------------------------------------------ | --------------- | ------------------------------------------------------------------------------------------------- |
| `https://cudz.io/`                         | `apps/landing`  | Landing page: profiles, blog, design system, legal and privacy pages                              |
| `https://cudz.io/thinking-inside-the-box/` | `apps/blog`     | _Thinking inside the Box_: frontend, design systems, a11y, l10n, module federation                |
| `https://szyk.cudz.io/`                    | `packages/szyk` | **Szyk** design system in Storybook. <span lang="pl">Inni zadają pytania, ja zadaję szyku.</span> |

Static files only, served by Cloudflare Workers Static Assets. Every change reaches production by merging to `main` and running GitHub Actions. There are no admin UIs.

## Prerequisites

| Tool                                                                   | Why                                                          | Check                         |
| ---------------------------------------------------------------------- | ------------------------------------------------------------ | ----------------------------- |
| [mise](https://mise.jdx.dev/)                                          | Installs the pinned Node, pnpm and gitleaks from `mise.toml` | `mise --version`              |
| [Docker](https://www.docker.com/) or [OrbStack](https://orbstack.dev/) | Screenshot tests run in Playwright's Docker image            | `docker run --rm hello-world` |
| [GitHub CLI](https://cli.github.com/)                                  | PRs, issues and repo settings                                | `gh auth status`              |

Later phases also use `wrangler` (Cloudflare, via `pnpm`), `hcloud` (Hetzner) and `cloudflared` (Cloudflare Tunnel). You only need to sign in to each one when the phase that uses it starts.

## Setup

```sh
mise install     # Node 26, pnpm 12, gitleaks (versions in mise.toml)
pnpm install     # dependencies; also installs the git hooks
pnpm lint && pnpm format:check && pnpm typecheck && pnpm test
```

The pre-commit hook (lefthook) runs on staged files:

- **gitleaks** blocks commits that contain secrets.
- **Prettier** checks formatting. Run `pnpm format` to fix it.
- **Oxlint** checks code.

CI runs two jobs: `quality` (the same checks, plus a secret scan of the full history) and `dependency-review` (blocks new dependencies with known vulnerabilities). Both must pass before a PR can merge into `main`. PRs merge by squash only, and commits on `main` are signed by GitHub.

Dependabot opens update PRs weekly; minor and patch updates merge themselves once CI passes. `mise.toml` is updated by hand.

## Plan and progress

Work is tracked in [issues](https://github.com/tomasz/cudz.io/issues), grouped by phase into [milestones](https://github.com/tomasz/cudz.io/milestones). Start with the pinned **Roadmap** issue. Open choices have the `decision` label; steps that need the owner have `owner-action`.

## Commands

| Command             | Does                               |
| ------------------- | ---------------------------------- |
| `pnpm lint`         | Oxlint                             |
| `pnpm format`       | Prettier (write)                   |
| `pnpm format:check` | Prettier (check)                   |
| `pnpm typecheck`    | Type-check every workspace package |
| `pnpm test`         | Unit tests in every package        |
| `pnpm build`        | Build every package                |

## Rights

© Tomasz Cudziło. All rights reserved, including text and data mining and AI training. See [COPYRIGHT.md](COPYRIGHT.md).
