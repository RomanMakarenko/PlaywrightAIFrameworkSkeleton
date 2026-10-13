# Prompt: Implement the Funtime E2E Test Case Catalog

You are a Senior QA Automation Engineer implementing the approved, automatable functional E2E scenarios in this repository using **Playwright Test and TypeScript**. Follow the repository's conventions and current code; do not copy a framework or assume a scaffold is implemented.

## Objective

Turn the test cases in `docs/web/FUNCTIONAL_TEST_CASES.md` into maintainable automated Playwright tests, reusing the existing framework code, fixtures, Page Objects, and utilities where appropriate. Implement only what can be tested safely and whose behavior is supported by the catalog and current application. Preserve a clear trace from each automated test to its stable catalog case ID.

## Sources of truth — read before changing files

Read and follow:

1. `CLAUDE.md` — authoritative repository instructions.
2. `playwright-mcp-context.md` — browser and test workflow for this repository.
3. `docs/web/FUNCTIONAL_TEST_CASES.md` — scenario definitions, status, evidence, and automation notes.
4. `docs/web/PAGE_TEMPLATE_COVERAGE.md`, `docs/web/SITEMAP_TEST_TRACEABILITY.md`, `docs/web/RELATED_CONTENT_MATRIX.md`, and `docs/web/FUNCTIONAL_AUDIT.md` — use to corroborate representative pages, coverage, and uncertainties.
5. `playwright.config.ts`, `package.json`, `package-lock.json`, `tsconfig.json`, `.env.example`, and existing files under `src/` and `tests/` that are relevant to the selected scenarios.
6. The applicable skills and local browser-tool documentation, including `.claude/skills/playwright-best-practices/SKILL.md` and `.claude/skills/playwright-cli/SKILL.md`, when browser inspection or CLI use is relevant. Verify tool availability and current configuration rather than assuming either CLI or MCP is installed or usable.

Treat existing code/configuration as current truth. `docs/IMPLEMENTATION_PLAN.md` is a roadmap and does not prove a capability exists. Do not edit files in `reference/`.

## Required discovery and decision gate

Before implementation:

- Inspect the repository structure, current git changes, existing E2E tests, fixtures, Page Objects, components, test-data helpers, dependencies, and Playwright project configuration. Preserve unrelated user changes; do not overwrite or revert them.
- Read the catalog completely and identify its current case IDs, execution statuses, prerequisites, uncertainty notes, and safety restrictions. Do not rely on a hard-coded case count or assume every catalog entry is suitable for automation.
- Use available authorized browser tools to inspect current application behavior before choosing selectors or encoding an expected result. Do not claim a page or behavior was inspected unless it was. If a browser tool or target environment is unavailable, record the limitation and continue only with scenarios that can be implemented safely from verified evidence.
- Sort cases into: (a) safe, read-only, sufficiently verified; (b) requiring explicit authorization, a non-production environment, dedicated account, request interception, or cleanup; and (c) insufficiently specified / `NEEDS_VERIFICATION`. Implement category (a). Leave categories (b) and (c) unexecuted unless their prerequisites are explicitly provided and verified; report them as blocked/deferred rather than guessing.
- If implementation requires a decision that cannot be resolved from repository instructions, the catalog, or safe defaults—especially test target/environment authorization, account access, side effects, and cleanup—ask the user before proceeding with the affected work. Do not ask merely to confirm a conventional implementation choice.

## Safety and environment boundaries

- The live website `https://funtime.com.ua/` is production unless the user explicitly identifies and authorizes a separate test environment. Treat production data as real.
- Do not submit login, registration, password-reset, search, newsletter, review, or other forms to production. Do not create accounts, subscriptions, reviews, saved/visited state, or other persistent data. Do not purchase, contact people, or perform destructive/state-changing actions.
- Do not bypass authentication, CAPTCHA/Turnstile, rate limits, permissions, or access controls. Do not evade browser-tool permission denials or use an alternate channel to perform a denied interaction.
- Cases marked `BLOCKED` or `NEEDS_VERIFICATION` in the catalog are not ready to become asserted acceptance behavior merely because a test can be written. Keep them out of the runnable suite until requirements, safe setup, and cleanup are established.
- Do not use real account identifiers or credentials. Never hardcode, print, log, commit, or expose secrets, cookies, tokens, or authentication state. Never read or search the root `.env`. Use `.env.example` only to learn safe variable names; environment loading is not assumed to be configured.
- Do not make broad network scans or enumerate every sitemap URL. Use only representative URLs already documented or specifically approved, and keep automated coverage focused and bounded.

## Implementation conventions

- Use `@playwright/test` native test-scoped fixtures (`page`, `context`, `request`) by default. Use typed `test.extend()` only when it provides genuinely reusable setup. Do not add global browser/page singletons or unnecessary fixture layers.
- Put complete user journeys in `tests/e2e/`. Use `src/pages/` for meaningful, reusable page behavior and `src/components/` only for genuinely reused UI regions. Reuse existing abstractions; do not create wrappers just to move simple Playwright calls.
- Keep assertions in tests unless an established project abstraction says otherwise. Use `test.step()` for meaningful journey stages, not each line.
- Prefer accessible, user-facing locators such as `getByRole`, `getByLabel`, and `getByText`, and Playwright web-first assertions. Inspect the live DOM/accessibility tree before relying on selectors. Avoid brittle positional selectors, implementation-detail selectors where a user-facing locator is available, and arbitrary sleeps/timeouts.
- Preserve test independence, test-scoped isolation, parallel safety, and deterministic cleanup. Do not assume fixed content totals, ordering, review counts, or optional sections when the catalog calls them variable.
- Validate links and actual destination content where the case requires it. Do not assert unverified business rules, exact validation copy, search matching semantics, sort/filter semantics, route status codes, map vendor/URL formats, or geolocation recovery behavior.
- Keep external navigation controlled. Do not interact with external accounts or submit data to third-party services.
- Use typed data only when useful; TypeScript types are not runtime validation. Reuse existing helpers, data factories, dependencies, and exports after checking their actual implementation.
- Keep the current CommonJS, strict TypeScript, ESLint, Playwright, and configuration conventions. Do not add dependencies, aliases, npm scripts, dotenv loading, project configuration, or framework-wide abstractions unless the task clearly requires them and the user approves the scope.
- Keep test URLs configurable through the existing project configuration where possible. Do not silently repurpose production as a default target for unsafe tests. If a test target/configuration is missing, report what is needed rather than inventing credentials or configuration.

## Test organization and catalog traceability

- Group specs by coherent user journey or functional area under `tests/e2e/`; avoid one giant spec and avoid redundant tests across layers.
- Give each automated test a title containing its catalog ID, for example `NAV-001: mobile menu opens and navigates to a category`.
- Add a concise reference to the catalog case in the test description/comment only if this is the local convention; do not duplicate the whole test case in code.
- Preserve catalog IDs. Do not renumber or silently redefine scenarios. If a catalog case needs clarification or a safe variant, document the distinction and keep the original manual specification intact.
- Prefer implementing a useful, runnable smoke subset first, then expand only into independently verified and safe scenarios. The catalog's suggested smoke cases are candidates, not proof of current readiness.
- If an existing fixture or Page Object needs a minimal change, keep the change narrowly scoped and update its call sites. Do not add an abstraction solely to satisfy a pattern checklist.

## Verification

After implementation, run only relevant checks, using commands confirmed by the current package/configuration. At minimum, where applicable:

- `npx tsc --noEmit`
- `npx eslint <changed TypeScript paths>`
- `npx playwright test --list`
- Run the implemented safe test(s) against an explicitly authorized environment. If that target is unavailable or unsafe, do not run against production; report `NOT RUN` and the exact reason.

Use the configured browser projects deliberately; do not incur a broad cross-browser run unless needed and safe. Investigate failures caused by the change. Never report tests as passing unless the command actually passed. Do not claim execution from test discovery, a page load, or static review.

## Documentation and completion report

- Update the catalog only if necessary to record an implementation mapping/status or a verified clarification; preserve its manual specification, evidence, and uncertainty. Do not label an unexecuted case as passed. Keep `docs/IMPLEMENTATION_PLAN.md` status untouched unless its phase acceptance criteria have actually been met.
- For a significant implementation checkpoint, append a dated entry to `docs/RUNBOOK.md` with scope, changed artifacts, reason, exact commands and `PASS`/`FAIL`/`NOT RUN` results, blockers, and next steps. Do not rewrite prior entries. Add a `docs/DECISIONS.md` record only for a genuine long-term architecture/process decision, using the next stable ID; do not create a decision for a routine test implementation.
- Final response must summarize implemented catalog IDs and deferred/blocked IDs or categories; changed files; reused fixtures/Page Objects/utilities/dependencies; actual test commands and outcomes; environment/tool limitations; and any authorization, test data, or cleanup still required. Distinguish implementation, discovery, and execution clearly.

## Explicit non-goals

- Do not rewrite the functional audit, regenerate the test catalog, or broaden this into a site-wide audit.
- Do not implement API, database, visual-regression, performance, security, or penetration tests unless a specific catalog case and user authorization require them.
- Do not modify the production website or framework configuration merely to make a test pass.
- Do not create tests that merely assert a page loads when the specified behavior calls for a user journey or content consistency check.

Begin with repository and catalog discovery. Implement the verified, safe, high-value cases first, then verify and report honestly.
