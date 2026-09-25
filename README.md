# cudz.io

Source for Tomasz Cudziło's corner of the web.

| URL                                        | Project         | What                                                                                              |
| ------------------------------------------ | --------------- | ------------------------------------------------------------------------------------------------- |
| `https://cudz.io/`                         | `apps/landing`  | Landing page: profiles, blog, design system, legal and privacy pages                              |
| `https://cudz.io/thinking-inside-the-box/` | `apps/blog`     | _Thinking inside the Box_: frontend, design systems, a11y, l10n, module federation                |
| `https://szyk.cudz.io/`                    | `packages/szyk` | **Szyk** design system in Storybook. <span lang="pl">Inni zadają pytania, ja zadaję szyku.</span> |

Static files only, served by Cloudflare Workers Static Assets. Every change reaches production by merging to `main` and running GitHub Actions. There are no admin UIs.

## Setup

```sh
mise install     # Node, pnpm, gitleaks from mise.toml
pnpm install     # also installs git hooks (lefthook)
```

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
