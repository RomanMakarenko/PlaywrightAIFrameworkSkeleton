# Implementation Plan — Playwright + TypeScript Framework

## Status & Context

**Status:** Audited on 2026-10-13 against the current repository. Individual checkboxes below are marked only where implementation evidence exists; no phase is complete unless all its criteria and acceptance checks are satisfied.

The framework has a strict TypeScript 6 toolchain (`tsconfig.json`, Node16 module resolution), focused root npm scripts, a typed test-scoped `CatalogPage` fixture, and Funtime E2E plus read-only HTTP smoke coverage. Playwright is configured for Chromium, Firefox, and WebKit. The Playwright 1.64.0 Docker image built successfully; the Chromium smoke and full cross-browser suite ran in the container, with reports/results persisted to host mounts. CI is configured to use that image and uploads the HTML report and test results. There are no API contract tests/client or visual tests. See the checklists below for verified coverage and remaining work.

This plan follows the broad organization of the Java framework plan while adapting it to this repository's Node.js, TypeScript, and Playwright Test stack. It is a roadmap, not authorization to implement every item at once.

## Agreed Decisions

- Use Node.js, TypeScript, Playwright Test, and npm; commit and use the lockfile for repeatable installs.
- Use Playwright Test's native runner, configuration, projects, and fixtures. In particular, use typed `test.extend` fixtures and Playwright's built-in `page`, `context`, and `request` resources instead of Java `BaseTest`/`PlaywrightFactory`, TestNG lifecycle hooks, dependency-injection containers, or thread-local driver patterns.
- Keep the proposed project boundaries from `TASK_SPECK.md`: `src/` for reusable framework code and `tests/` for API, E2E, integration, and visual tests.
- Consult `CLAUDE.md` and the local TypeScript Playwright template as guidance, not as code or architecture to copy wholesale. Check official Playwright documentation and the versions in the root lockfile before adopting APIs or examples.
- Use a Docker image whose Playwright version matches the version installed from the root lockfile. Supply secrets at runtime and keep test reports/results accessible outside the container.
- Prefer Playwright's built-in reporters, traces, screenshots, and video options initially. Add third-party reporting only when there is a concrete requirement.

## Risks & Notes

- **Toolchain follow-up:** Root scripts now expose typecheck, lint, test execution, discovery, and a Chromium smoke selection. The reported ESLint issue in `src/pages/AuthPages.ts` has been corrected; rerun the checks after future toolchain changes. Phase 1 acceptance still depends on reproducible-install and supported-runtime evidence.
- **Version drift:** The Docker image bundles browser binaries for a specific Playwright release. A mismatch with the package-lock version can cause missing or incompatible browsers; verify the versions together whenever either changes.
- **CommonJS/module consistency:** The current `package.json` declares `"type": "commonjs"`. Keep TypeScript, ESLint, and Playwright config module behavior aligned; change module format only as a deliberate, verified decision.
- **Parallelism and data collisions:** Tests must be independently runnable. Shared accounts or mutable server-side data can make parallel execution flaky; isolate data and register cleanup where the system under test persists writes.
- **Visual snapshots:** Baselines are sensitive to browser, operating system, fonts, and rendering environment. Generate and compare them in a stable environment, preferably the same pinned container used for CI.
- **Secrets and authentication state:** Never bake credentials, `.env` files, tokens, or Playwright `storageState` into the image, repository, logs, or uploaded artifacts.
- **Reference freshness:** The local starter template's Playwright dependency/image version differs from the root project. Do not copy its Docker tag or dependency versions without checking the root lockfile and official compatibility guidance.

## Phases

### Phase 0 — Prerequisites and Current-State Verification

- [x] Confirm supported Node.js and npm versions for the project and document them.
- [x] Verify the root lockfile, installed `@playwright/test` version, and installed browser binaries; use the root project only, not the nested reference project.
- [x] Confirm the existing config, E2E tests, ESLint setup, requested directory layout, and GitHub Actions workflow.
- [x] Record the module-format decision based on the existing CommonJS package setting and the chosen TypeScript configuration.

**Acceptance checks:** A clean checkout can use `npm ci`; the documented Node/npm requirements are accurate; the Playwright package and browser installation are known and mutually compatible.

### Phase 1 — TypeScript Toolchain and npm Scripts

- [x] Add TypeScript and any required type packages to the root project; update the lockfile through npm.
- [x] Add a `tsconfig.json` with strict type checking and include/exclude paths appropriate for framework code, tests, generated reports, and references.
- [x] Configure TypeScript module resolution consistently with the chosen CommonJS/module decision and the existing Playwright config.
- [x] Add focused npm scripts for test execution, linting, and `tsc --noEmit`; add formatting only if the project adopts a formatter.
- [x] Ensure ESLint parses and checks the intended TypeScript files without linting `reference/**`.

**Acceptance checks:** `npm ci`, typecheck, and ESLint complete successfully from the repository root; reference repositories remain excluded from root linting and typechecking.

### Phase 2 — Configuration, Environment, and Project Layout

- [x] Define the responsibilities and naming conventions for `src/pages`, `components`, `api`, `models`, `data`, `config`, and `utils`, plus test-scoped fixtures in `tests/fixtures.ts` and `tests/e2e`, `api`, `integration`, and `visual`.
- [x] Add typed configuration for base URLs and any required environment selection; validate required values at startup with actionable errors.
- [x] Provide a safe `.env.example` and ignore real local environment files. Use shell/CI environment variables for secrets; do not place secret values in defaults or examples.
- [x] Configure `baseURL` and other shared options in `playwright.config.ts` where appropriate, rather than duplicating them in tests.

**Acceptance checks:** Configuration uses a documented local default or validated environment value; missing required settings fail clearly; no real credentials are committed; Playwright discovers tests in the intended directories.

### Phase 3 — Test Lifecycle and Native Fixtures

- [x] Establish the project's custom `test` entry point using typed `test.extend<...>()` fixtures only where a reusable dependency is needed.
- [x] Construct page objects, components, API clients, or test-data helpers inside fixtures and expose them to tests by fixture name.
- [x] Prefer built-in test-scoped `page`, `context`, and `request` fixtures for per-test isolation. Use worker-scoped fixtures only for safe, read-only or deliberately shared setup, with teardown and parallelism implications documented.
- [x] Keep fixture dependency chains small and make teardown/cleanup explicit. Do not manually create a global browser/page singleton or duplicate Playwright's normal context lifecycle.
- [ ] Keep tests focused on business behavior; avoid embedding selectors, endpoint construction, or environment parsing in test bodies.

**Acceptance checks:** A typed custom fixture compiles and can be used from a spec; parallel tests receive isolated test-scoped state; any worker-scoped resource is shared only by intentional design and cleans up correctly.

### Phase 4 — Reusable UI/API Abstractions and Representative Journeys

- [x] Add Page Objects for meaningful pages and Component Objects for genuinely reused UI regions; keep locators with the objects and expose business-level actions.
- [ ] Add typed API clients/services around Playwright's `APIRequestContext` only where shared request behavior or domain operations justify the abstraction.
- [ ] Define request/response models and keep API assertions focused on status and contract-relevant fields.
- [ ] Add representative tests: a UI journey in `tests/e2e`, isolated endpoint coverage in `tests/api`, and cross-layer or boundary checks in `tests/integration` when they provide distinct value.
- [x] Use role-, label-, and other user-facing locators where possible, plus Playwright's web-first assertions and auto-waiting; avoid fixed sleeps.

**Acceptance checks:** At least one representative UI journey and one API request/response assertion run successfully; test code uses reusable abstractions where appropriate without hiding assertions or creating unnecessary framework layers.

### Phase 5 — Test Data, Isolation, and Diagnostics

- [x] Add typed data factories only for data that benefits from consistent defaults, overrides, or unique values.
- [ ] Make tests independent and safe to retry/run in parallel; clean up data when the target persists changes, preferably through explicit fixture teardown.
- [ ] Configure HTML reporting and failure diagnostics (trace, screenshot, and video) with clear retention and CI upload behavior; avoid collecting more sensitive data than needed.
- [ ] Define visual snapshot conventions in `tests/visual`, including a stable baseline-generation environment and a review/update process. Keep visual tests limited to intentional rendering checks rather than duplicating all E2E coverage.

**Acceptance checks:** Failed tests provide enough diagnostics to investigate; generated artifacts do not expose credentials or storage state; data cleanup works for persistent test data; visual baselines are reproducible in the chosen environment.

### Phase 6 — Suite Selection, Browser Coverage, and Parallel Execution

- [ ] Organize Playwright projects, tags, or scripts so API, smoke, E2E, integration, and visual checks can be selected intentionally.
- [ ] Use the existing Chromium, Firefox, and WebKit projects according to the value and runtime cost of each suite; do not require every suite to run on every browser by default.
- [ ] Choose local and CI worker/retry settings based on observed stability and runtime. Preserve test independence instead of using retries to conceal flakiness.
- [x] Document commands for a single test, headed/debug runs, smoke checks, broader regression, and cross-browser runs.

**Acceptance checks:** Each documented command selects the expected suite/project; smoke checks remain suitable for fast feedback; broader browser coverage can be run deliberately; parallel runs do not introduce shared-state failures.

### Phase 7 — Docker Runtime

- [x] Add a root Dockerfile based on the official Playwright image for the exact Playwright version installed by `npm ci`; keep the image tag and root dependency/lockfile in sync.
- [x] Add a `.dockerignore` that excludes local dependencies, Git metadata, real environment files, auth state, and unrelated generated output.
- [x] Run the test process as a non-root user where supported by the selected image and browser execution model.
- [x] Add a Docker Compose service or documented equivalent for running tests locally, passing environment values at runtime and mounting `playwright-report/` and `test-results/` to the host.
- [x] Ensure the image does not copy secrets or generated authentication state; document safe handling of any required local credentials.
- [x] Use the same version-matched container for CI test execution where practical, so local and CI browser/system dependencies are consistent.

**Acceptance checks:** From a clean checkout, the documented Docker command builds/runs a smoke suite; the Playwright package version exactly matches the image's bundled browser version; reports and failure artifacts persist on the host; secrets and auth state are absent from the image layers.

### Phase 8 — GitHub Actions CI and Artifact Retention

- [x] Extend the existing workflow to run install, lint, typecheck, and a fast smoke suite for pull requests and relevant branch pushes.
- [x] Define a broader manual or scheduled regression run, adding cross-browser coverage as runtime and suite stability allow.
- [x] Run tests in the version-matched Docker environment established in Phase 7, or document why a workflow uses an equivalent pinned environment.
- [x] Upload the HTML report and relevant `test-results/` diagnostics after failures and cancellations, with bounded retention and no credential/auth-state files — accepted by the user with cancellation-run verification waived; see the 2026-10-14 Runbook entry.
- [x] Use GitHub Actions secrets/variables for protected configuration and grant workflows only the permissions they need.

**Acceptance checks:** Pull requests receive lint, typecheck, and smoke feedback; broader regression can be launched intentionally; failed/cancelled test jobs still publish useful artifacts; uploaded artifacts contain no secrets or storage state.

### Phase 9 — Definition of Done

The initial framework baseline is ready when all of the following hold:

- [ ] A clean checkout installs reproducibly with `npm ci` and the documented Node/npm versions.
- [ ] TypeScript typecheck, ESLint, and the selected test suites pass from documented root-level commands.
- [ ] UI/API/E2E/integration/visual suite boundaries and fixture lifetimes are documented and exercised where implemented.
- [ ] Tests use Playwright-native isolation and assertions, can run independently, and clean up persistent test data where needed.
- [ ] Docker runs the documented smoke command using an image version aligned with the lockfile and exposes reports/results outside the container.
- [ ] CI runs the agreed fast checks and preserves diagnostics on failure without exposing secrets.
- [ ] `CLAUDE.md` remains the project's source of truth for reference usage; no reference project has been copied wholesale or modified as part of this work.
