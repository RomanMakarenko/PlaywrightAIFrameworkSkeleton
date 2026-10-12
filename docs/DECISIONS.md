# Project Decisions

Append-only log of durable architecture and process decisions. Each ID is stable; use a new entry to supersede or correct a decision rather than silently rewriting its history. This file records why a choice was made, not the current completion status of implementation phases; see [`IMPLEMENTATION_PLAN.md`](IMPLEMENTATION_PLAN.md) for phase status and [`RUNBOOK.md`](RUNBOOK.md) for dated work checkpoints.

### D-2026-10-12-01 — Declare TypeScript as a project dependency

- **Status:** Accepted
- **Context:** TypeScript had been installed globally during development, which would make type checking depend on each contributor's machine setup.
- **Decision:** Declare `typescript@^6.0.3` as a local development dependency and keep its resolved version in the root lockfile.
- **Rationale:** Contributors and CI should use the project-managed compiler rather than an untracked global installation. Version `6.0.3` is within the compatibility range of the installed `typescript-eslint` peer dependency.
- **Consequences:** TypeScript checks can be run from the project toolchain after `npm ci`; TypeScript remains a development dependency, not an application runtime dependency.
- **Evidence:** Commit `11baec1` (`Add Playwright framework infrastructure`).

### D-2026-10-12-02 — Make English the primary README and retain Ukrainian

- **Status:** Accepted
- **Context:** The project needed an English default entry point without discarding the existing Ukrainian documentation.
- **Decision:** Use `README.md` as the English primary guide and keep the Ukrainian translation in `README.uk.md`.
- **Rationale:** English is the default landing page while Ukrainian documentation remains available to the project's Ukrainian-speaking readers.
- **Consequences:** Changes to contributor-facing setup and workflow guidance should be kept aligned across both README files.
- **Evidence:** Commit `cebeb57` (`Add English primary README`).

### D-2026-10-12-03 — Keep Playwright CLI optional and separate from Playwright Test

- **Status:** Accepted
- **Context:** The repository added Claude Code guidance for the Playwright CLI, while its automated test suite is already based on `@playwright/test`.
- **Decision:** Version the CLI skill and its references in `.claude/skills/playwright-cli/`, but keep `playwright-cli` optional and separate from the project's required test dependencies and CI test runner.
- **Rationale:** Browser-agent workflows can be used when needed without changing the standard Playwright Test install or test execution path.
- **Consequences:** README setup instructions present CLI installation as optional; the repository skill documents its use, but the CLI itself is not assumed to be installed.
- **Evidence:** Commit `390447f` (`Add Playwright CLI skill`), merged as `f7487d1`.

### D-2026-10-12-04 — Separate work checkpoints, decisions, and phase status

- **Status:** Accepted
- **Context:** Project history, durable rationale, and implementation completion status serve different purposes and can drift if maintained as duplicate checklists.
- **Decision:** Use `RUNBOOK.md` for append-only chronological checkpoints, this file for durable decisions, and `IMPLEMENTATION_PLAN.md` as the sole source of phase checklists and acceptance status.
- **Rationale:** Each record has one clear owner: work history and handoff, decision rationale, or current phase status.
- **Consequences:** Checkpoints may link decision IDs and plan phases, but must not duplicate or independently declare phase completion. Decisions should be recorded only when they are consequential and durable.
- **Evidence:** The documentation workflow established in the current project change; see the latest checkpoint in [`RUNBOOK.md`](RUNBOOK.md).
