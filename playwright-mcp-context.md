# Playwright MCP Context — This Project

## Purpose

Use this guide when assisting with browser-driven Playwright and TypeScript work in this repository. It describes this project's current conventions and workflow; it is not a generic framework template. Follow the repository's `CLAUDE.md`, the user's task-specific instructions, and the actual code before applying any guidance here.

Use configured Playwright MCP/browser tools to inspect a live application when they are available and the task requires browser exploration. If they are unavailable, do not claim that the application was inspected; use the available project tools or ask for the missing URL, access, or behavior details.

## Project facts and source of truth

- Runtime and package manager: Node.js with npm; `package.json` currently declares CommonJS (`"type": "commonjs"`). Keep TypeScript and tooling consistent with this unless changing module format is a separate, verified task.
- Test runner: `@playwright/test`. The root `playwright.config.ts` discovers tests from `tests/` and has Chromium, Firefox, and WebKit projects.
- TypeScript: strict checking is configured in the root `tsconfig.json`; it includes `playwright.config.ts`, `src/**/*.ts`, and `tests/**/*.ts`, and uses `noEmit`. There are no configured path aliases.
- The root package has no project test/lint scripts. Use the actual commands (`npx tsc --noEmit`, `npx eslint ...`, and `npx playwright test ...`) unless scripts are added deliberately.
- `docs/IMPLEMENTATION_PLAN.md` is a roadmap, not evidence that every planned phase is implemented. Check the current files and test results before describing capabilities as complete.
- Check that the requested prompt file exists before following it. Do not assume a file named `TASK_SPEC.md` exists or silently treat a differently named file as equivalent; if a matching task file is present under another name, verify its contents and report that choice.

## Current repository layout

```text
src/
  api/          # reusable API code; inspect before adding routes or clients
  components/   # reusable UI component abstractions, when justified
  config/       # framework configuration
  data/         # reusable framework data and models, not a dump of test fixtures
  models/       # shared TypeScript models
  pages/        # Page Objects for meaningful application pages
  utils/        # implemented data, file, DB, and UI/date utilities

tests/
  fixtures.ts   # typed test-scoped fixtures, only when shared setup is useful
  api/          # API specifications
  db/           # database specifications (only with verified DB access/schema)
  e2e/          # end-to-end user journeys
  integration/  # cross-layer integration checks
  testdata/     # static inputs owned by tests
  visual/       # intentional visual/snapshot checks
  example.spec.ts

api/
  endpoints/    # scaffold directory; avoid duplicating implementation in src/api
  schemas/      # scaffold directory; avoid duplicating implementation in src/api

docs/
prompts/utilities/prompt.md
playwright.config.ts
```

This is a guide to the present layout, not a demand to populate every directory. `CLAUDE.md` directs reusable framework code to `src/` and tests to `tests/`; typed Playwright Test fixtures belong in `tests/fixtures.ts`, not `src/`. The current fixture extends the test with a `CatalogPage`; authentication remains configured at the Playwright project level through `storageState`, not a custom auth fixture. Prefer `src/api/` for new reusable API code. Root `api/endpoints/` and `api/schemas/` also exist as scaffold paths: do not maintain duplicate versions of the same module in both locations. If a task explicitly requires using those root paths, follow the task and explain the placement.

Keep `src/data/` for framework-owned reusable data/model code and `tests/testdata/` for static inputs consumed by tests. Keep generated reports and Playwright results separate from source and test data.

## Secret and environment-variable handling

- Never open, print, search, or otherwise inspect the project's `.env` file. Do not bypass the project's Claude Code hook or permission deny rule.
- `.env.example` is a safe template for variable names, but its values are not proof of the local environment's actual configuration.
- Do not echo environment values, credentials, tokens, connection strings, or authentication state in logs, test output, reports, screenshots, traces, or artifacts.
- `getEnvVariable()` reads `process.env`; it does not itself load a dotenv file. The dotenv setup in `playwright.config.ts` is currently commented out. Do not enable or invoke code that loads local secrets unless the task specifically requires it and the user authorizes that exposure. Prefer environment values supplied explicitly by the user, CI, or the test process.
- The Claude Code hook is a project-level guard for ordinary tool calls, not an OS-level sandbox. Do not describe it as a hard security boundary.

## Implementation workflow

1. **Read the task and inspect the repository.** Read the task-specific spec/prompt and `CLAUDE.md`; inspect the relevant files, `package.json`, `tsconfig.json`, Playwright configuration, dependencies, and existing usages. Do not infer that a scaffold directory contains working code.
2. **Identify the test layer.** Decide whether the requirement is Web, API, DB, visual, or cross-layer. Keep each layer's responsibilities separate and avoid adding abstractions that do not solve a demonstrated need.
3. **Inspect before coding.** For browser work, use the available browser tools to inspect the real page and behavior before choosing locators. For API work, verify routes, methods, payloads, responses, and cleanup needs. For DB work, verify the actual server, schema, permissions, and query behavior; never invent tables, credentials, or expected records.
4. **Implement only what the task needs.** Reuse existing exports, dependencies, fixtures, data, and naming. Preserve public APIs unless a change is necessary, and update their call sites when required. Do not copy a reference framework wholesale.
5. **Verify and report.** Run applicable type checks, lint, test discovery, and relevant tests. Diagnose failures and fix changes introduced by the task. Report actual command results and any checks that could not be performed.

## Web and UI tests

- Use Playwright Test's native fixtures (`page`, `context`, and `request`) by default. Add typed `test.extend()` fixtures only for reusable setup that benefits multiple tests; keep test isolation and lifecycle visible.
- Put page-specific locators and meaningful page actions in Page Objects under `src/pages/`. Add component abstractions under `src/components/` only for genuinely reused UI regions. Do not create these layers just to wrap simple Playwright calls.
- Prefer accessible, user-facing locators (`getByRole`, `getByLabel`, `getByText`) and Playwright web-first assertions. Avoid brittle positional selectors and arbitrary sleeps.
- Use `test.step()` for meaningful workflow stages, not for every line. Keep assertions in tests unless the project has a well-established assertion abstraction.
- Put complete user journeys in `tests/e2e/`; keep visual assertions in `tests/visual/` and focused cross-layer checks in `tests/integration/`.
- Load URLs and credentials from validated configuration/environment values. Do not hardcode account details, production data, or environment-specific paths.

## API tests

- Use Playwright's built-in `request` fixture or `APIRequestContext` for test requests. Add a shared client only when repeated domain behavior or request configuration justifies it.
- Keep reusable API code in `src/api/`, with request/response types or schemas alongside it when they provide real contract validation. Do not duplicate code in the root `api/` scaffold and `src/api/`.
- Verify endpoint behavior and response shape before writing assertions. Use AJV or another already-installed validator only where runtime schema validation is needed; do not treat a TypeScript interface as runtime validation.
- Use unique test data for created resources and clean up persistent changes when the API supports it. Do not assume public demo APIs are stable or safe for destructive requests.

## Database tests

- `mysql2` is available and `src/utils/dbClient.ts` provides a lazy pool plus `executeQuery()` and `closeConnection()`. The presence of the utility does not prove a database server, schema, or credentials are available.
- Use only verified database configuration and schema details. Keep SQL values parameterized; do not build SQL by concatenating test data.
- Place database-specific specs in `tests/db/` only when the task provides a reachable test database and an understood cleanup strategy. Avoid destructive changes to shared or production data.
- Close the pool through `closeConnection()` in the appropriate suite/fixture teardown. Do not create a separate pool per query or silently swallow database errors.

## Data and utilities

- Reuse the existing utilities in `src/utils/`:
  - `generateRandomUser()`, `generateUniqueEmail()`, `generateRandomString()`
  - `readJsonFile<T>()`, `getEnvVariable()`
  - `executeQuery<T>()`, `closeConnection()`
  - `waitForElementToDisappear()`, `parseCustomDate()`, `uploadTestFile()`
- Add new helpers only when they are reusable and non-trivial; search for duplicates first. Keep helpers typed and validate important inputs.
- `readJsonFile<T>()` provides a compile-time type assertion only; validate untrusted JSON at runtime when correctness depends on its shape.
- Resolve test file paths consistently from the project working directory or the established test-data location. Do not embed machine-specific absolute paths.

## Cross-layer scenarios

For workflows that combine UI, API, and DB actions, keep each layer's operations in its own client/Page Object/spec helper and pass only the necessary scenario data between steps. Prefer verifying business outcomes through the appropriate public interface. Use DB access for setup or cleanup only when explicitly needed and safe; avoid testing the same behavior redundantly at every layer.

## Completion checklist

- [ ] New code follows `CLAUDE.md`, the existing TypeScript/CommonJS setup, and the actual project structure.
- [ ] No duplicate utilities, Page Objects, fixtures, routes, or schemas were added.
- [ ] Selectors, API details, DB schema, and environment requirements were verified rather than guessed.
- [ ] Secrets and local environment values were not read, hardcoded, logged, or included in artifacts.
- [ ] Imports and types are valid; `npx tsc --noEmit` and relevant ESLint checks pass where applicable.
- [ ] Relevant Playwright tests were run, or the exact reason they could not be run is reported.
- [ ] The final response lists changed files, reused code/dependencies, commands and their results, and unresolved configuration or test-data needs.
