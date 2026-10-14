# Playwright + TypeScript Test Framework Skeleton

A starter skeleton for UI, API, end-to-end, and other automated checks using **Playwright Test** and **TypeScript**. The repository provides a baseline structure, configuration, a sample test, and utilities; it does not include a separate application under test.

**Language:** English (primary) · [Українська](README.uk.md)

## Prerequisites

- Node.js 24.x LTS with the npm version bundled with that Node.js distribution (`.nvmrc` selects the Node.js major version; npm is not pinned separately).
- Docker Engine with the Compose plugin, for the pinned container runtime.
- Internet access to install dependencies and run the read-only Funtime E2E and HTTP smoke checks.

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
npm test

# List the tests Playwright discovers
npm run test:list

# Run the focused, read-only HTTP smoke check in Chromium
npm run test:smoke

# Run one test by its stable test ID in Chromium
npm test -- --grep "NAV-001" --project=chromium

# Run tests in a visible Chromium browser
npm test -- --project=chromium --headed

# Debug tests with Playwright Inspector (headed, single worker)
npm test -- --project=chromium --debug

# Run the full regression suite in all configured browser projects
npm test

# Run one browser project
npm test -- --project=chromium

# Explicitly run all configured browser projects
npm test -- --project=chromium --project=firefox --project=webkit

# Start Playwright's interactive UI mode
npx playwright test --ui
```

The E2E suite includes read-only public Funtime journeys and an HTTP availability smoke check; it does not require a local web server. Playwright's `baseURL` defaults to `https://funtime.com.ua` and can be overridden with `FUNTIME_BASE_URL`.

## Public and authenticated tests

Tests that require login and public tests run in **separate, isolated browser contexts**. An unauthenticated test does not inherit cookies or other state from an authenticated test. Playwright organizes this with projects:

- `chromium`, `firefox`, `webkit` — regular tests. Each test starts in a fresh context without `storageState`; this includes public journeys.
- `auth-setup` — a conditional Chromium setup project: logs in as the test user and saves `storageState`.
- `authenticated-chromium` — a conditional Chromium project: depends on `auth-setup` and loads the saved state to test protected pages.

Therefore, run `npm test` for the full suite. If **both** `APP_EMAIL` and `APP_PASSWORD` are available in the test process, one run executes public tests in the regular projects and additionally runs authenticated tests in `authenticated-chromium`. If both variables are absent, the authenticated project is omitted and the fresh-login check `AUTH-002` is skipped. Setting only one variable is a configuration error.

```bash
# Full suite: public browser projects + authenticated Chromium,
# when APP_EMAIL and APP_PASSWORD are available to this process
npm test

# Public tests only in all three browsers; auth projects are not selected
npm test -- --project=chromium --project=firefox --project=webkit

# Only checks that use the saved authenticated state
npm test -- --project=authenticated-chromium

# Test the login flow by itself (logs in from a fresh Chromium context)
npm test -- --project=chromium --grep AUTH-002

# Public projects only, even if credentials are set; exclude the login check
npm test -- --project=chromium --project=firefox --project=webkit --grep-invert AUTH-002
```

`AUTH-002` tests the login flow itself: it opens a fresh login page, enters the credentials, and checks access to the profile. It runs in the regular Chromium project. Separately, `auth-setup` logs in and saves state for `authenticated-chromium`. Thus a full run with credentials includes both the fresh-login check and a check that reuses authenticated state.

### Local run with credentials

Provide both variables to the `npm test` process using an approved secret manager or a secure shell environment mechanism. Do not put real values in a command, README, source code, or chat, and do not store them in the repository. Dotenv loading is disabled, so creating a `.env` file alone does not pass the variables to tests.

### GitHub Actions run

In the GitHub repository, create two **Repository secrets** via **Settings → Secrets and variables → Actions → New repository secret**:

1. `APP_EMAIL` — the test user's email.
2. `APP_PASSWORD` — the test user's password.

The workflow passes these secrets to the test process and Docker only for the separate authenticated-test step. That step runs on `push` or manual `workflow_dispatch` for the `main`/`master` branches. The main public test run is separate and has no credentials. Secrets are not passed to `pull_request` runs (including fork PRs), and the authenticated step is not run for those events. If both secrets are absent, the authenticated step is skipped; if only one is configured, the workflow fails.

The setup test saves `storageState` to `playwright/.auth/user.json`. This file contains authenticated state and is a credential: it is Git-ignored, excluded from the Docker build context, and must not be shared or added to reports/artifacts. CI stores authenticated reports/results in separate subdirectories and does not upload the `storageState` itself. Remove the local state when no longer needed:

```bash
rm -f playwright/.auth/user.json
```

## Run tests in Docker

The Docker image is pinned to the Playwright version in `package-lock.json`. From the repository root, build it and run either the focused smoke check or the full browser suite:

```bash
mkdir -p playwright-report test-results
# macOS only, if Docker Desktop's CLI is not already on PATH
export PATH="/Applications/Docker.app/Contents/Resources/bin:$PATH"
export PLAYWRIGHT_UID="$(id -u)" PLAYWRIGHT_GID="$(id -g)"
docker compose --env-file /dev/null build
docker compose --env-file /dev/null run --rm playwright npm run test:smoke
docker compose --env-file /dev/null run --rm playwright npm test
```

Compose mounts `playwright-report/` and `test-results/` back to the host; container output is placed in their `html/` and `results/` subdirectories so Playwright can clean each output directory without trying to remove a mounted directory. `--env-file /dev/null` prevents Compose from implicitly reading a local `.env`; variables explicitly exported in the invoking process (such as `FUNTIME_BASE_URL`, `APP_EMAIL`, and `APP_PASSWORD`) are passed to the test container at runtime only. Do not put credentials in the Docker build context or image. The authenticated test is skipped when credentials are absent. Both suites use the public Funtime site and require network access.

After running tests, open the HTML report with the matching path:

```bash
# Default output from a local (non-Docker) run
npx playwright show-report

# HTML report from a Docker run
npx playwright show-report playwright-report/html
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

Strict TypeScript checking and `noEmit` are enabled. Run type checking and linting with:

```bash
npm run typecheck
npm run lint
```

## Environment configuration

`.env.example` lists environment-variable names with placeholder values. If you need a local environment file, copy the template:

```bash
cp .env.example .env
```

Replace placeholders with your own local values. Do not commit `.env` or publish its contents. `.gitignore` ignores local `.env` files while keeping `.env.example` available.

**Important:** dotenv loading is disabled. Copying `.env` alone will not automatically load its variables into the test process; pass needed values through the process environment or CI. `FUNTIME_BASE_URL` is optional and defaults to `https://funtime.com.ua`; if supplied, it must be an HTTP(S) origin without a path. Never print secrets in logs, reports, or artifacts.

## Repository structure

```text
src/
  api/          # reusable API code
  components/   # reusable UI components
  config/       # framework configuration
  data/         # shared data and models
  models/       # shared TypeScript models
  pages/        # Page Objects
  utils/        # existing utilities

tests/
  fixtures.ts   # typed test-scoped fixtures when useful
  api/          # API tests
  db/           # database tests
  e2e/          # end-to-end journeys
  integration/  # integration tests
  testdata/     # static test inputs
  visual/       # visual checks
```

Keep reusable framework code in `src/` and test-specific scenarios, fixtures, and files in `tests/`. Typed shared fixtures live in `tests/fixtures.ts` (currently the `CatalogPage` fixture). Authentication is configured at the Playwright project level with `storageState`; it does not use a custom auth fixture. Some directories are scaffolding for future work; their presence does not mean the corresponding integration is configured or complete.

`src/utils/` currently includes helpers for test-data generation, JSON and environment-variable access, MySQL queries, UI waits, dates, and file uploads. Database tests require a reachable test database and runtime configuration; the presence of a client alone does not provide either.

## CI

The GitHub Actions workflow in `.github/workflows/playwright.yml` runs on pushes and pull requests targeting `main` or `master`. It uses Node 24 for lint/typecheck, builds the version-matched Playwright Docker image for smoke and full-suite runs, and uploads `playwright-report/` and `test-results/` as an artifact. In CI, Playwright uses two retries and one worker.

## Further documentation

- [`CLAUDE.md`](CLAUDE.md) — project conventions, security boundaries, and instructions for maintaining project records.
- [`docs/IMPLEMENTATION_PLAN.md`](docs/IMPLEMENTATION_PLAN.md) — roadmap and source of truth for phase checklists and acceptance status.
- [`docs/web/SITEMAP.md`](docs/web/SITEMAP.md) — evidence-based map of publicly discovered `funtime.com.ua` page families and coverage limits.
- [`docs/RUNBOOK.md`](docs/RUNBOOK.md) — chronological checkpoints with scope, rationale, verification outcomes, and handoff notes.
- [`docs/DECISIONS.md`](docs/DECISIONS.md) — durable architecture and process decisions, recorded with stable IDs and rationale.
- [`playwright-mcp-context.md`](playwright-mcp-context.md) — detailed browser and testing guidance for this repository.

Keep these records distinct: the plan tracks current phase status, the runbook records what happened, and the decisions log explains durable choices.
