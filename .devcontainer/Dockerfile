# The toolchain image for the devcontainer, CI and Cursor cloud agents.
# Vite+'s official image: Debian, git, sudo, a non-root `vp` user and the `vp` CLI, which
# provisions the Node and pnpm that package.json declares. Pinned by digest; Dependabot
# bumps it (a Dockerfile rather than an `image` field for exactly that reason).
FROM ghcr.io/voidzero-dev/vite-plus:1.0.0@sha256:8d788678fb9783ba8994c4fe5652af3316bfc414f7ef6ead0136932ee6075b8b

SHELL ["/bin/bash", "-o", "pipefail", "-c"]

# Coding agents, from their official installers into ~/.local/bin. Each updates itself.
ENV PATH=/home/vp/.local/bin:$PATH
RUN curl -fsSL https://claude.ai/install.sh | bash \
 && curl -fsSL https://chatgpt.com/codex/install.sh | sh \
 && curl -fsSL https://cursor.com/install | bash \
 && mkdir -p ~/.config/claude ~/.config/codex
