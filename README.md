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

## Authenticated tests

The fresh-login check and reusable authenticated tests run only in Chromium. The auth setup logs in once per test run and saves Playwright `storageState` to `playwright/.auth/user.json`; the authenticated project reuses it for read-only protected-page checks. The state is a credential: it is Git-ignored, excluded from the Docker build context, and must not be shared or added to reports/artifacts. Remove the local state when it is no longer needed:

```bash
rm -f playwright/.auth/user.json
```

Set both `APP_EMAIL` and `APP_PASSWORD` in the local test process using an approved secret manager or shell environment, then explicitly run the authenticated Chromium project:

```bash
npm test -- --project=authenticated-chromium
```

With neither variable set, Playwright leaves the auth projects out and continues public tests; a partial pair is a configuration error. Dotenv loading remains disabled. In GitHub Actions, these secrets are used only for trusted non-pull-request events (protected-branch pushes or manual dispatch); they are never passed to pull requests or forks. CI keeps authenticated reports/results in separate subdirectories, and the saved state is not uploaded.

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
```

Keep reusable framework code in `src/` and test-specific scenarios and files in `tests/`. Some directories are scaffolding for future work; their presence does not mean the corresponding integration is configured or complete.

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
