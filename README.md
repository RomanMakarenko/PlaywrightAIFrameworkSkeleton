# Playwright + TypeScript Test Framework Skeleton

A starter skeleton for UI, API, end-to-end, and other automated checks using **Playwright Test** and **TypeScript**. The repository provides a baseline structure, configuration, a sample test, and utilities; it does not include a separate application under test.

**Language:** English (primary) · [Українська](README.uk.md)

## Prerequisites

- Node.js (the current LTS release is recommended) and npm.
- Internet access to install Playwright browsers and run the existing sample tests, which visit `https://playwright.dev/`.

## Installation

From the repository root, run:

```bash
npm ci
npx playwright install
```

On Linux, if browser system dependencies are not installed yet:

```bash
npx playwright install --with-deps
```

## Run tests

```bash
# Run all tests across the configured browser projects
npx playwright test

# List the tests Playwright discovers
npx playwright test --list

# Run one browser project
npx playwright test --project=chromium

# Start Playwright's interactive UI mode
npx playwright test --ui
```

The current sample in `tests/example.spec.ts` checks the Playwright documentation site at `playwright.dev`. It does not require a local web server. `baseURL` and `webServer` are not currently configured in `playwright.config.ts`.

After running tests, open the HTML report with:

```bash
npx playwright show-report
```

The Playwright configuration includes Chromium, Firefox, and WebKit projects. It uses the HTML reporter and collects a trace on the first retry.

## Optional: Playwright CLI

The repository also includes an optional `playwright-cli` skill for Claude Code, with browser-automation guidance in `.claude/skills/playwright-cli/SKILL.md` and task-specific references alongside it. The CLI is separate from `@playwright/test`; it is not required to run the test suite, type checks, or CI.

Install the CLI globally and initialize its browser and skill support with:

```bash
npm install -g @playwright/cli@latest
playwright-cli install
playwright-cli install --skills
```

The CLI writes browser-session output under `.playwright-cli/`, which is ignored by Git. Treat snapshots, traces, screenshots, videos, and any saved browser state as potentially sensitive; review them before sharing and never commit credentials or authenticated state.

## Type checking and linting

Strict TypeScript checking and `noEmit` are enabled:

```bash
npx tsc --noEmit
```

Run ESLint against source, tests, and the Playwright configuration with:

```bash
npx eslint src tests playwright.config.ts
```

There are currently no npm scripts in `package.json`, so use the CLI commands directly instead of commands such as `npm test`.

## Environment configuration

`.env.example` lists environment-variable names with placeholder values. If you need a local environment file, copy the template:

```bash
cp .env.example .env
```

Replace placeholders with your own local values. Do not commit `.env` or publish its contents. `.gitignore` ignores local `.env` files while keeping `.env.example` available.

**Important:** dotenv loading is currently commented out in `playwright.config.ts`. Copying `.env` alone will not automatically load its variables into the test process. The current sample test does not require `.env`; for other scenarios, pass the needed variables to the test process or configure CI secrets. Never print secrets in logs, reports, or artifacts.

## Repository structure

```text
src/
  api/          # reusable API code
  components/   # reusable UI components
  config/       # framework configuration
  data/         # shared data and models
  fixtures/     # typed Playwright fixtures when useful
  models/       # shared TypeScript models
  pages/        # Page Objects
  utils/        # existing utilities

tests/
  api/          # API tests
  db/           # database tests
  e2e/          # end-to-end journeys
  integration/  # integration tests
  testdata/     # static test inputs
  visual/       # visual checks
  example.spec.ts
```

Keep reusable framework code in `src/` and test-specific scenarios and files in `tests/`. Some directories are scaffolding for future work; their presence does not mean the corresponding integration is configured or complete.

`src/utils/` currently includes helpers for test-data generation, JSON and environment-variable access, MySQL queries, UI waits, dates, and file uploads. Database tests require a reachable test database and runtime configuration; the presence of a client alone does not provide either.

## CI

The GitHub Actions workflow in `.github/workflows/playwright.yml` runs on pushes and pull requests targeting `main` or `master`. It installs dependencies and browsers, runs `npx playwright test`, and uploads `playwright-report/` as an artifact. In CI, Playwright uses two retries and one worker.

## Further documentation

- [`CLAUDE.md`](CLAUDE.md) — project conventions, security boundaries, and instructions for maintaining project records.
- [`docs/IMPLEMENTATION_PLAN.md`](docs/IMPLEMENTATION_PLAN.md) — roadmap and source of truth for phase checklists and acceptance status.
- [`docs/RUNBOOK.md`](docs/RUNBOOK.md) — chronological checkpoints with scope, rationale, verification outcomes, and handoff notes.
- [`docs/DECISIONS.md`](docs/DECISIONS.md) — durable architecture and process decisions, recorded with stable IDs and rationale.
- [`playwright-mcp-context.md`](playwright-mcp-context.md) — detailed browser and testing guidance for this repository.

Keep these records distinct: the plan tracks current phase status, the runbook records what happened, and the decisions log explains durable choices.
