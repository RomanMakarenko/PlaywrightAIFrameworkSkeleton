# Project Change Runbook

Chronological, append-only record of meaningful project checkpoints: what changed, why, what was verified, and what remains for handoff. This is a historical log, not a statement that every planned capability is implemented.

## How to maintain this log

- Add a dated entry after a meaningful task, milestone, or handoff—not for every small edit. Include scope, changed artifacts, reason, exact verification results (`PASS`, `FAIL`, or `NOT RUN` with a reason), blockers/unknowns, and next steps or rollback guidance when relevant.
- Link durable choices by their IDs in [`DECISIONS.md`](DECISIONS.md); keep decision rationale in that log rather than duplicating full ADRs here.
- Use [`IMPLEMENTATION_PLAN.md`](IMPLEMENTATION_PLAN.md) as the only source for current phase checklists and acceptance status. A checkpoint may describe the result of work but must not independently mark a phase complete.
- Preserve history: append a correction or superseding checkpoint instead of silently changing a past result. Never record secret values, credentials, tokens, or authentication state.

### 2026-10-11 — Initial Playwright framework skeleton

- **Session / scope:** Establish the repository as a Playwright Test + TypeScript framework skeleton.
- **Changed artifacts:** Added the Playwright configuration, an example test, GitHub Actions workflow, ESLint setup, initial project guidance, implementation roadmap, lockfile, and Playwright best-practices skill.
- **Reason:** Provide a versioned starting point for browser tests and a roadmap, rather than relying on global tools or undocumented local setup.
- **Evidence:** Commit `1f79ce8` (`Add Playwright framework skeleton`).
- **Status / handoff:** The repository is a skeleton; the initial sample exercises Playwright documentation, not a bundled application. Treat roadmap items as planned until their acceptance criteria are met.

### 2026-10-12 — Framework infrastructure and local TypeScript dependency

- **Session / scope:** Extend the baseline with reusable utilities, TypeScript configuration, environment setup guidance, CI/security guardrails, and framework dependencies.
- **Changed artifacts:** Updated `package.json` and lockfile; added `tsconfig.json`, `src/utils/`, `.env.example`, `.claude/settings.json`, `.claude/hooks/deny-env-read.cjs`, `playwright-mcp-context.md`, utility prompts, and shell/Windows environment setup scripts; expanded `CLAUDE.md` and `.gitignore`.
- **Reason:** Make the framework's tooling and reusable support explicit in the project, including a local TypeScript dependency instead of relying on a globally installed compiler. Add guardrails for handling local environment secrets.
- **Commands and status:** `npm ls typescript --depth=0` confirmed the local `typescript@6.0.3`; targeted `npx eslint src tests playwright.config.ts` passed. A full `npx eslint .` reported existing issues in `.claude/hooks/deny-env-read.cjs` and `package-lock.json`; those findings were outside the targeted source/test lint check and were not addressed here.
- **Evidence:** Commit `11baec1` (`Add Playwright framework infrastructure`), merged via PR #1 (`95df834`).
- **Security boundary:** `.env` was not read or included. Continue to treat `.env.example` as a placeholder template and do not assume dotenv is enabled in the Playwright configuration.

### 2026-10-12 — English primary README and retained Ukrainian translation

- **Session / scope:** Rework the root README language arrangement without removing the Ukrainian documentation.
- **Changed artifacts:** Set `README.md` as the English primary guide and added `README.uk.md`, with links between the two.
- **Reason:** Make English the default README while preserving a Ukrainian version for readers who prefer it.
- **Evidence:** Commit `cebeb57` (`Add English primary README`).
- **Status / handoff:** Keep both language versions aligned when changing setup or project-usage instructions.

### 2026-10-12 — Playwright CLI skill added and merged to main

- **Session / scope:** Add the optional Playwright CLI guidance and skill references to the repository.
- **Changed artifacts:** Added `.claude/skills/playwright-cli/SKILL.md` and its task-specific `references/` documents; added `.playwright-cli/` to `.gitignore`.
- **Reason:** Provide Claude Code with reusable instructions for browser automation, test workflows, request mocking, session/storage handling, tracing, video, and related tasks. Ignore generated browser-session output because it can contain sensitive page or authentication data.
- **Installation:** The skill files are versioned in the repository. The global CLI installation commands documented in the README (`npm install -g @playwright/cli@latest`, `playwright-cli install`, `playwright-cli install --skills`) were not run as part of adding the skill; `playwright-cli` remains optional and separate from `@playwright/test`.
- **Evidence:** Commit `390447f` (`Add Playwright CLI skill`), merged via PR #2 as `f7487d1`.
- **Status / handoff:** Use the skill for relevant browser tasks, but continue to use the project's Playwright Test configuration for the automated test suite. Do not commit browser profiles, traces, screenshots, videos, or saved authenticated state.

### 2026-10-12 — README and Claude Code guidance updated for the CLI

- **Session / scope:** Document the already-added CLI skill in the contributor-facing guides.
- **Changed artifacts:** Updated `README.md` and `README.uk.md` with optional CLI installation instructions, its distinction from Playwright Test, and a warning about potentially sensitive `.playwright-cli/` output. Updated `CLAUDE.md` with the skill/reference location, CLI's optional status, and output-data handling guidance.
- **Reason:** Keep project documentation aligned with the CLI and skills now present in the repository, without implying that the CLI is a required project dependency or part of CI.
- **Commands and status:** `git diff --check` passed. No tests were run because these were documentation-only changes; the CLI was not installed.
- **Evidence:** Working-tree changes at the time of this entry; not yet committed.
- **Rollback / handoff:** Review the documentation diff before committing. If rejected, revert only the uncommitted documentation changes; do not reset the branch or alter the committed CLI skill.

### 2026-10-12 — Runbook created

- **Goal and scope:** Record major project milestones, their reasons, evidence, and verification outcomes in one chronological document.
- **Changed artifact:** Added `docs/RUNBOOK.md`.
- **Reason:** Preserve an auditable project history and make the current handoff and verification boundaries clear.
- **Verification:** Documentation-only; run `git diff --check` after editing. No tests or dependency installation are required.

### 2026-10-12 — Checkpoint and decision logging workflow established

- **Goal and scope:** Define how future project work records checkpoints, durable decisions, and implementation status without maintaining competing sources of truth.
- **Changed artifacts:** Added `docs/DECISIONS.md`; defined append-only checkpoint rules here; updated `CLAUDE.md`, `README.md`, and `README.uk.md` to explain and link the workflow.
- **Decision references:** `D-2026-10-12-01` through `D-2026-10-12-04` record confirmed historical choices and the new documentation responsibilities.
- **Reason:** Make work history, decision rationale, and phase completion status discoverable and independently maintained.
- **Verification:** `git diff --check` — PASS; relative documentation links checked. Tests were not run because the changes are documentation-only.
- **Evidence:** This checkpoint records the documentation changes and verification results; the resulting commit will be the Git history reference.
- **Handoff:** Append future meaningful checkpoints here, record only consequential durable choices in `DECISIONS.md`, and update phase status only in `IMPLEMENTATION_PLAN.md` after acceptance criteria pass.

### 2026-10-12 — Playwright MCP shared with project clones

- **Session / scope:** Add Playwright MCP to the repository's shared Claude Code project configuration and remove the private local registration.
- **Changed artifacts:** Added root `.mcp.json` defining `playwright` as a stdio server launched by `npx -y @playwright/mcp@latest`; removed the project-specific local registration from `~/.claude.json`. No package dependency was added.
- **Reason:** Ensure collaborators receive the MCP server configuration when cloning the repository while keeping approval in each contributor's hands.
- **Commands / status:** `claude mcp remove --scope local playwright` — PASS; `claude mcp add --scope project playwright -- npx -y @playwright/mcp@latest` — PASS; `claude mcp list` — configured, **Pending approval**; `.mcp.json` reviewed and valid. `git diff --check` — PASS after the checkpoint was written. Automated tests — NOT RUN (MCP configuration only).
- **Handoff:** Commit `.mcp.json` so clones receive the configuration. Each contributor must approve the project MCP in Claude Code before using it.

### 2026-10-12 — Funtime Page Objects

- **Session / scope:** Add reusable Page Objects for verified public Funtime page templates and publicly accessible authentication screens, without creating one object per dynamic slug.
- **Changed artifacts:** Added `src/pages/BasePage.ts`, `HomePage.ts`, `CatalogPage.ts`, `PlacePage.ts`, `CollectionPages.ts`, `NearbyPage.ts`, `ReviewsPage.ts`, `EditorialPages.ts`, `StaticContentPage.ts`, `SiteMapPage.ts`, `AuthPages.ts`, and `index.ts` for home, catalog/category, place detail, collection list/detail, nearby locations, reviews, editorial list/detail, static content, site map, login, registration, and password reset. Appended this checkpoint.
- **Reason:** Provide typed, reusable locators based on read-only inspection of live page accessibility snapshots, rather than guessed selectors.
- **Browser inspection / status:** Read-only GET navigation and DOM snapshots — PASS for `/`, `/nature`, `/nature/type/lakes`, `/nature/ikva-river`, `/collections`, a collection detail, `/nearby`, `/nearby/lakes`, `/reviews`, `/reviews/about/castles`, article and publication list/detail pages, `/press-releases`, `/pagemap` and its locations/collections branches, `/about`, `/feedback`, `/login`, `/register`, and `/password/reset`. No forms were submitted; no profile, booking, or purchase data was changed. `/pr` was not opened. The registration page snapshot reported 2 console errors and 4 warnings; they were not investigated as this task only required selector discovery.
- **Commands / status:** `npx tsc --noEmit` — PASS; `npx eslint src/pages` — PASS; `npx playwright test --list` — PASS (6 existing tests discovered in `tests/example.spec.ts`); `git diff --check` — PASS. `npx playwright test` — NOT RUN; the existing suite targets `playwright.dev`, and no automated tests against the live Funtime site were added. The MCP browser navigations above were manual, read-only smoke inspections, not an automated assertion suite.
- **Coverage limits / blockers:** No authorized profile session was available; `/profile/*` and `/users/{id}` Page Objects were not added. The earlier plan file named by the task could not be read under the current directory-access restriction; the user authorized proceeding from the current task and repository documentation instead. `/pr` remains intentionally excluded. This covers verified page families, not every slug or uninspected footer/legal route.
- **Working-tree note:** `README.uk.md` contains an unrelated working-tree edit and was left untouched. The untracked `TASK_SPECK_TARGET_SITE.md` and generated `.playwright-mcp/` browser snapshots were preserved.
- **Handoff:** Use the exported classes from `src/pages/index.ts`; provide a permitted authenticated session before extending coverage to private profile routes. Reinspect live DOM if the site changes.

### 2026-10-12 — Authenticated Funtime profile Page Objects

- **Session / scope:** Inspect the authorized profile area and add Page Objects for authenticated profile routes and observed public user-profile routes; no account data was changed.
- **Changed artifacts:** Added `src/pages/ProfilePages.ts`; exported its page classes and route-section type from `src/pages/index.ts`; removed only the profile-inspection snapshots and console logs generated during this session from `.playwright-mcp/`.
- **Reason:** Complete the sitemap's profile-route coverage using observed DOM structure and role/placeholder/attribute locators, without persisting account-specific data or authentication artifacts.
- **Browser inspection / status:** Authenticated, read-only navigation and structure inspection — PASS for `/profile`, `/profile/planning`, `/profile/visited`, `/profile/reviews`, `/profile/reviews/replies`, and the public-user family `/users/{id}`, `/users/{id}/planning`, `/users/{id}/visited`, `/users/{id}/reviews`. No profile fields or preferences were changed; no forms were submitted. No storage state was exported. The browser tab was closed after inspection; site-side logout was not confirmed.
- **Commands / status:** `npx tsc --noEmit` — PASS; `npx eslint src/pages` — PASS; `npx playwright test --list` — PASS (6 existing tests discovered); `git diff --check` — PASS. Full Playwright tests — NOT RUN; the existing suite targets `playwright.dev`, not Funtime.
- **Coverage limits / blockers:** Profile list routes displayed empty lists for this account during inspection; locators focus on the verified section headings and navigation rather than unobserved populated-list controls. Public user IDs remain dynamic and are validated as numeric by `PublicUserProfilePage.openUser()`.
- **Handoff:** Import `ProfilePage`, `ProfilePlanningPage`, `ProfileVisitedPage`, `ProfileReviewsPage`, `ProfileReviewRepliesPage`, and `PublicUserProfilePage` from `src/pages/index.ts`. Reinspect profile DOM before adding locators for populated collections or behavior that mutates account data.

### 2026-10-12 — Funtime place-page component objects

- **Session / scope:** Extract repeated place-detail regions into locator-rooted Component Objects and compose them into the existing `PlacePage`.
- **Changed artifacts:** Added `src/components/PlaceCardComponent.ts`, `RelatedPlacesSectionComponent.ts`, `ContactDetailsComponent.ts`, and component barrel `src/components/index.ts`; updated `src/pages/PlacePage.ts` to expose contact details, nearby-place recommendations, and same-type recommendations as components.
- **Reason:** Make repeated UI regions reusable while keeping ownership relationships natural: `PlacePage` composes its section/contact component wrappers; related sections expose aggregated reusable place-card wrappers; the components retain injected Playwright `Locator` references rather than owning browser/page lifecycle.
- **Browser inspection / status:** Read-only DOM checks — PASS for `/relaxation-and-recreation/haiky-rezort` and `/art-and-culture/cosmos-museum`. Both pages had one `.ui.segment.contacts` and two recommendation grids, each with 7 article cards plus a separate view-all link. Contact contents vary: the first page had phone/social/directions/map controls but no website link; the museum page had phone, website, social, map, directions, and map-preview entries. Section grids were scoped by their confirmed header/divider/grid sibling sequence. No links or state-changing controls were activated.
- **Cross-template reuse limits:** The related `article.img-list-grid` card shape was confirmed on both inspected place-detail pages, so it is reused there through `PlacePage`. Nearby results were not rendered while geolocation permission was unavailable; collection-detail cards use different markup. Those page objects were not forced onto this component.
- **Commands / status:** `npx tsc --noEmit` — PASS; `npx eslint src/components src/pages/PlacePage.ts` — PASS; `npx playwright test --list` — PASS (6 existing tests discovered); `git diff --check` — PASS. Full Playwright tests — NOT RUN; the existing suite targets `playwright.dev`. Browser checks were read-only DOM smoke inspections, not automated test assertions.
- **Handoff:** Use `PlacePage.contacts`, `nearbyPlacesSection`, and `otherPlacesByTypeSection`; import the component classes from `src/components/index.ts`. Phone/website/map locators may be empty when the particular place has no corresponding contact entry. Recheck the live sibling layout if Funtime changes its detail-page markup.

### 2026-10-12 — Shared Funtime page components

- **Session / scope:** Extend locator-rooted component composition to the shared site shell, editorial detail pages, and category/type catalog pages while retaining the existing place-detail components.
- **Changed artifacts:** Added navigation, footer, breadcrumbs, social-follow, editorial-comments, related-editorial-content, category-type-links, and category-promo components under `src/components/`; updated `BasePage.ts`, `EditorialPages.ts`, and `CatalogPage.ts`; expanded `src/components/index.ts` exports.
- **Reason:** Give repeated page regions explicit component boundaries and compose them through their owning Page Objects without treating all `article` elements as the same card type.
- **Browser inspection / status:** Read-only DOM inspections — PASS for article and publication details, `/nature`, and `/nature/type/lakes`. Post-implementation selector smoke checks confirmed one type-link section, two promo panels, one social-follow section, 15 location cards, one comments grid/write button, one related-editorial section, and the observed footer/RSS controls on the checked routes. No forms were submitted and no state-changing controls were activated. Manual DOM smoke checks are not automated test coverage. Snapshots generated during this session were removed; browser tabs were closed.
- **Commands / status:** `npx tsc --noEmit` — PASS; `npx eslint src/components src/pages/BasePage.ts src/pages/CatalogPage.ts src/pages/EditorialPages.ts` — PASS; `npx playwright test --list` — PASS (6 existing tests discovered); `git diff --check` — PASS. Full Playwright tests — NOT RUN; the existing suite targets `playwright.dev`, not Funtime.
- **Reuse limits:** Place-detail recommendation/contact components remain specific to place details. Editorial related-content insertion zones were present but had no observed cards; their component exposes only the verified section heading. Category location cards reuse `PlaceCardComponent` only for `article.img-list-grid` cards, not collection cards.
- **Handoff:** `BasePage` exposes `siteNavigation` and `siteFooter` while preserving its existing locator properties. `EditorialDetailPage` composes breadcrumbs, comments, related content, and social-follow; `CatalogPage` composes breadcrumbs, location cards, type links, promo panels, and social-follow. Recheck the live DOM if Funtime changes these page templates.

### 2026-10-12 — Profile review navigation component

- **Session / scope:** Complete the source-level audit of shared blocks across existing Page Objects and compose the repeated review/replies navigation used by both private profile review pages.
- **Changed artifacts:** Added `src/components/ProfileReviewNavigationComponent.ts`; updated `src/pages/ProfilePages.ts` to compose it in `ProfileReviewsPage` and `ProfileReviewRepliesPage` while preserving `reviewListTab` and `repliesTab`; exported it from `src/components/index.ts`.
- **Reason:** Represent the duplicated review/replies navigation as a locator-rooted component without wrapping isolated Filter/Sort/Share buttons or conflating different `article` card types. Existing profile-section tabs already share implementation through `ProfileSectionPage` inheritance.
- **Audit limits:** The cross-Page-Object inventory was source-only; no live DOM confirmation was performed. No profile data, forms, or state-changing controls were accessed. The unrelated `AuthPages.ts:23` source anomaly was not changed.
- **Commands / status:** `npx tsc --noEmit` — PASS; `npx eslint src/components/ProfileReviewNavigationComponent.ts src/pages/ProfilePages.ts src/components/index.ts` — PASS; `npx playwright test --list` — PASS (6 existing tests discovered); `git diff --check` — PASS. Full Playwright tests — NOT RUN; the existing suite targets `playwright.dev`, not Funtime.
- **Handoff:** `ProfileReviewsPage` and `ProfileReviewRepliesPage` retain their prior tab getters and now expose `reviewNavigation`. Reinspect source/live DOM if the Funtime profile navigation changes.

### 2026-10-13 — Expand Funtime manual test scenarios

- **Session / scope:** Broaden the manual functional catalog with negative, boundary, permission, and recovery scenarios; synchronize route/template references.
- **Changed artifacts:** `docs/web/FUNCTIONAL_TEST_CASES.md` (11 additional cases, bringing the catalog to 27); `docs/web/SITEMAP_TEST_TRACEABILITY.md`; `docs/web/PAGE_TEMPLATE_COVERAGE.md`; this RUNBOOK entry.
- **Reason:** Address identified coverage gaps in authentication/forms, search, unknown routes, geolocation, catalog exhaustion, review filters, and directions links while retaining explicit unknowns and safe-execution prerequisites.
- **Commands / status:** `python3 -I` inline documentation consistency check — PASS (27 case headings, all IDs unique, every ID referenced in traceability and page-template coverage); `git diff --check` — PASS. Playwright/live-site tests — NOT RUN; this change specifies manual cases only, and some scenarios require explicit test-environment authorization and safe test data.
- **Blockers / unknowns:** Product behavior remains unverified for validation messages, search matching/empty states, unknown-route responses, geolocation permission/recovery, catalog terminal/persistence behavior, and review filter semantics. New cases retain `BLOCKED` or `NEEDS_VERIFICATION` statuses where applicable; no defect was inferred.
- **Handoff:** Review the new cases with product owners or in an authorized non-production environment before treating uncertain expected outcomes as acceptance criteria or automating state-changing flows.

### 2026-10-13 — Implement Funtime E2E smoke subset

- **Session / scope:** Implement and execute a bounded set of production Funtime journeys after the user authorized production testing for their account. Public scenarios perform read-only navigation/content checks; no account state, forms, subscriptions, or reviews were changed.
- **Changed artifacts:** Added `tests/e2e/public-journeys.spec.ts` and `tests/e2e/auth.spec.ts`; removed the unrelated starter `tests/example.spec.ts`; updated `docs/web/FUNCTIONAL_TEST_CASES.md` with automated-case mapping and a verified new-tab clarification for the sampled ART-001 link; appended this checkpoint.
- **Implemented coverage:** `NAV-001`, `CAT-001`, `LOC-001`, `REL-001`, `NAV-003`, `ART-001`, `DATA-001`, `UI-001`, and three representative routes for `ERR-001`. `AUTH-002` is only a positive-login/read-only planning-page subset; saved/visited state changes, cleanup, and logout are not implemented.
- **Verification commands / status:** `npx tsc --noEmit` — PASS; `npx eslint tests/e2e/public-journeys.spec.ts tests/e2e/auth.spec.ts` — PASS; `npx playwright test --list` — PASS (36 test instances across Chromium, Firefox, and WebKit). `npx playwright test tests/e2e/public-journeys.spec.ts --project=chromium --reporter=line` — PASS (11 tests). `npx playwright test tests/e2e/auth.spec.ts --project=chromium --reporter=line` — SKIPPED (1 test; `APP_EMAIL` and/or `APP_PASSWORD` were unavailable in the test process; secret values were not read, printed, or stored). Firefox/WebKit execution — NOT RUN; the selected live suite was deliberately bounded to Chromium.
- **Investigation / correction:** An initial public-suite attempt failed `ART-001` because the article link opens in a new tab. DOM inspection confirmed `target="_blank"`; the test now waits for the popup, validates its route and heading, closes it, and confirms the source article remains open. `npx playwright test tests/e2e/public-journeys.spec.ts --project=chromium --grep ART-001 --reporter=line` — PASS (1 test); the subsequent complete public suite passed.
- **Blockers / unknowns:** Positive login was not executed because the credentials were not available as runtime environment variables. `AUTH-002` still requires a safe, approved data setup/cleanup path before automating saved/visited transitions. Catalog cases marked `BLOCKED` or `NEEDS_VERIFICATION` remain deferred; no statuses in `docs/IMPLEMENTATION_PLAN.md` were changed.
- **Handoff:** Provide `APP_EMAIL` and `APP_PASSWORD` to the test process through an approved secret-injection mechanism to run the read-only login subset; do not put values in command text, source, reports, or repository files. Before implementing save/visit transitions, establish and verify the user's starting state and a reliable restoration procedure. Review unrelated pre-existing working-tree changes separately; they were preserved.

### 2026-10-13 — Add partial review-sort menu automation

- **Session / scope:** Add a read-only automated subset of `REV-001` for the verified review-sort menu; preserve the original manual scenario and do not select a sort option or assert ordering.
- **Changed artifacts:** `tests/e2e/public-journeys.spec.ts`; `docs/web/FUNCTIONAL_TEST_CASES.md`; this RUNBOOK entry.
- **Browser inspection / status:** Read-only Playwright browser inspection of `/reviews/about/castles` — PASS. Confirmed the page heading, “Сортувати” control, and the four catalog-listed options. Opened the menu only; no option was selected and no data was changed.
- **Implementation:** Reused `ReviewsPage.sortButton`; used exact visible text checks for the observed options. The menu renders outside the main landmark, so assertions use page-scoped text locators.
- **Verification commands / status:** `npx tsc --noEmit` — PASS; `npx eslint tests/e2e/public-journeys.spec.ts` — PASS; `npx playwright test --list` — PASS (39 test instances across Chromium, Firefox, and WebKit). Initial `npx playwright test tests/e2e/public-journeys.spec.ts --project=chromium --grep REV-001 --reporter=line` — FAIL because the menu options are rendered outside `main`; after correcting the scope, the same command — PASS (1 test).
- **Blockers / unknowns:** `REV-001` remains partial: selection behavior and resulting sort order are unverified. Other unmapped cases remain deferred according to their prerequisites and uncertainty; no manual case statuses or implementation phase statuses were changed.
- **Handoff:** The automation mapping marks the test as a partial subset. Run the sort-selection/order case only after expected behavior and a safe test context are verified.

### 2026-10-13 — Audit implementation-plan progress

- **Session / scope:** Compare the implementation roadmap with the current framework, tests, configuration, CI, and contributor documentation; mark only individually verified criteria.
- **Changed artifacts:** Updated `docs/IMPLEMENTATION_PLAN.md` with an audited current-state summary and checkmarks for implemented TypeScript tooling/configuration, ESLint/reference exclusions, documented directory responsibilities and environment template, Page Objects/components, user-facing locators/assertions, and typed data generation.
- **Reason:** Keep the roadmap current without implying entire phases are complete when acceptance criteria remain unmet.
- **Commands / status:** `npx tsc --noEmit` — PASS; `npx eslint src tests playwright.config.ts` — FAIL (existing `@typescript-eslint/no-unused-expressions` at `src/pages/AuthPages.ts:23`); `npx playwright test --list` — PASS (39 test instances across Chromium, Firefox, and WebKit); `git diff --check` — PASS. Full cross-browser suite — NOT RUN as part of this audit.
- **Blockers / remaining work:** No phase is marked complete. TypeScript/npm-script acceptance is incomplete because scripts are absent and lint currently fails. Configuration/environment validation, custom fixtures, API test/client coverage, diagnostics and visual baselines, suite-specific selection, Docker, and the stronger CI pipeline remain unchecked. Exact Node/npm support and browser-install compatibility are not fully documented/verified.
- **Handoff:** Continue using `docs/IMPLEMENTATION_PLAN.md` as the only checklist source. Fix the reported lint issue in a separate scoped task, then re-run lint before considering Phase 1 acceptance.

### 2026-10-13 — Add scripts, URL configuration, fixture, and HTTP smoke

- **Session / scope:** Add focused npm commands, validated Funtime base URL configuration, one reusable test-scoped Page Object fixture, and a read-only HTTP availability check; avoid inventing API coverage without a documented endpoint contract.
- **Changed artifacts:** Added npm scripts in `package.json`; added `src/config/testConfig.ts`, `tests/fixtures.ts`, and `tests/e2e/smoke.spec.ts`; wired `FUNTIME_BASE_URL` through `playwright.config.ts`, `BasePage`, and E2E specs; corrected the existing lint error in `src/pages/AuthPages.ts`; updated `.env.example`, both READMEs, this record, and verified checkboxes in `docs/IMPLEMENTATION_PLAN.md`.
- **Reason:** Make common checks and a bounded smoke selection easy to run, remove duplicated Funtime origins, and exercise Playwright's typed fixture model without adding unnecessary API abstractions.
- **Commands / status:** `npm run typecheck` — PASS; `npm run lint` — PASS; `npm run test:list` — PASS (42 test instances across Chromium, Firefox, and WebKit); `npm run test:smoke -- --list` — PASS (1 Chromium smoke test selected); `npm run test:smoke` — PASS (1 read-only GET of the configured Funtime homepage, status 200); `FUNTIME_BASE_URL='ftp://example.com' npm run test:list` — PASS (configuration correctly rejected the unsupported scheme with an actionable error); `git diff --check` — PASS. `npm ci` — NOT RUN (no dependencies or lockfile changes); full cross-browser suite and authenticated journey — NOT RUN.
- **Blockers / remaining work:** This smoke check verifies public HTTP availability only, not an API contract. No repository-backed public API endpoint/response contract was found, so API test/client/model coverage remains deferred. No implementation phase is complete; browser/runtime support, API coverage, diagnostics/visual conventions, broader suite selection, Docker, and CI follow-up remain open.
- **Handoff:** Continue from `docs/IMPLEMENTATION_PLAN.md`; add API coverage only after a public read-only endpoint and expected response contract are documented. Preserve the existing unrelated working-tree edits.

### 2026-10-13 — Add CI lint, typecheck, and smoke gates

- **Session / scope:** Extend the existing GitHub Actions Playwright workflow with the repository's existing lint, TypeScript typecheck, and Chromium HTTP smoke commands.
- **Changed artifacts:** `.github/workflows/playwright.yml`; checked the matching Phase 8 item in `docs/IMPLEMENTATION_PLAN.md`; appended this checkpoint.
- **Reason:** Run fast quality checks on pull requests and relevant branch pushes before the existing full Playwright suite, without adding dependencies or changing the broader workflow behavior.
- **Commands / status:** `npm run lint` — PASS; `npm run typecheck` — PASS; `npm run test:smoke` — PASS (1 Chromium test; read-only homepage GET returned the asserted successful status); `git diff --check` — PASS. GitHub Actions PR execution — NOT RUN (no PR or push was requested). Full cross-browser suite — NOT RUN separately; it remains in the workflow unchanged.
- **Blockers / remaining work:** Phase 8 remains incomplete; regression orchestration, diagnostic artifact handling, runtime pinning, and other unchecked criteria remain open. No secrets or `.env` contents were accessed.
- **Handoff:** Review and run the workflow through an authorized PR when ready; preserve the existing unrelated working-tree changes.

### 2026-10-13 — Preserve Playwright artifacts after failure or cancellation

- **Session / scope:** Update the existing CI artifact upload to run after failed or canceled steps, include both the HTML report and Playwright test results, and reduce artifact retention.
- **Changed artifacts:** `.github/workflows/playwright.yml`; appended this checkpoint. The upload step now uses `always()`, selects only `playwright-report/` and `test-results/`, and retains artifacts for 14 days.
- **Reason:** Preserve bounded diagnostic output when the test job fails or is canceled without broadening the upload to the workspace or including authentication-state paths.
- **Commands / status:** `git diff --check` — PASS; `ruby -e 'require "yaml"; YAML.load_file(".github/workflows/playwright.yml")'` — PASS (workflow YAML parsed). Playwright tests — NOT RUN (workflow-only change). GitHub Actions failed-run and canceled-run artifact behavior/content review — NOT RUN (no Actions run was initiated); retention and artifact contents therefore remain unverified in GitHub.
- **Security / limitations:** The uploaded directories do not include the configured `playwright/.auth/` path or root environment files; the authenticated test still disables trace, screenshot, and video. Test results and reports can still contain page or request data, so inspect actual artifacts before treating their contents as safe.
- **Handoff:** Verify both failed and canceled runs in an authorized GitHub Actions execution, confirm useful artifacts are present with the 14-day retention, and inspect their contents before checking Phase 8 criterion 114. Keep Phase 5 criterion 84 unchecked until its broader acceptance checks are satisfied.

### 2026-10-13 — Add manual cross-browser regression trigger

- **Session / scope:** Enable intentional manual runs of the existing broader regression suite by adding GitHub Actions `workflow_dispatch`; avoid a recurring schedule because E2E tests target the live Funtime site.
- **Changed artifacts:** `.github/workflows/playwright.yml`; checked Phase 8 criterion 112 in `docs/IMPLEMENTATION_PLAN.md`; appended this checkpoint.
- **Reason:** The existing full Playwright command already covers Chromium, Firefox, and WebKit, but previously the workflow could only be started by a push or pull request.
- **Implementation:** Added `workflow_dispatch` to the existing workflow triggers. Manual runs reuse the existing lint, typecheck, Chromium smoke, and full-suite steps. No separate job, schedule, or credentials were added.
- **Commands / status:** `git diff --check` — PASS; `ruby -e 'require "yaml"; YAML.load_file(".github/workflows/playwright.yml"); puts "YAML parse: PASS"'` — PASS; `npx playwright test --list` — PASS (42 test instances across Chromium, Firefox, and WebKit; no test navigation performed).
- **Blockers / unknowns:** GitHub Actions manual dispatch and the full live-site suite — NOT RUN; no workflow was dispatched and no production traffic was generated during verification. The authenticated journey continues to skip unless its runtime credentials are supplied.
- **Handoff:** Manually dispatch the workflow when a broader live-site regression run is intentionally desired; review test results and artifacts from that authorized run.

### 2026-10-13 — Restrict CI token permissions

- **Session / scope:** Set explicit least-privilege permissions for the existing Playwright GitHub Actions workflow and verify Phase 8 criterion 115.
- **Changed artifacts:** `.github/workflows/playwright.yml` now grants only `contents: read` at workflow scope; checked Phase 8 criterion 115 in `docs/IMPLEMENTATION_PLAN.md`; appended this checkpoint.
- **Reason:** The workflow needs repository read access for checkout, but its setup, tests, and artifact upload do not need repository write permissions. No authenticated CI run is currently required: `tests/e2e/auth.spec.ts` skips the authenticated case when runtime credentials are absent. No secrets or variables were added or exposed.
- **Commands / status:** `git diff --check` — PASS; `ruby -e 'require "yaml"; YAML.load_file(".github/workflows/playwright.yml"); puts "YAML parse: PASS"'` — PASS; reviewed `git diff -- .github/workflows/playwright.yml` — PASS (only the explicit read-only permission block changed). GitHub Actions workflow execution — NOT RUN; no dispatch was requested, and the suite targets the live Funtime site.
- **Blockers / limitations:** This does not verify Phase 8 criterion 114's failed/canceled artifact behavior or implement secrets wiring for an authenticated CI journey. Add credentials through GitHub Actions secrets only if that journey becomes an explicit CI requirement. Phase 8 criterion 113 remains dependent on the unimplemented Phase 7 Docker runtime.
- **Handoff:** Reassess token scopes if future workflow steps need to write repository or deployment state; add only the permissions those steps specifically require.

### 2026-10-13 — Add version-matched Playwright Docker runtime

- **Session / scope:** Add Docker/Compose runtime configuration pinned to the root Playwright lockfile version and configure CI smoke and regression tests to use that image.
- **Changed artifacts:** Added `Dockerfile`, `.dockerignore`, `compose.yaml`, and `.nvmrc`; updated `README.md` and `.github/workflows/playwright.yml`; marked implemented Phase 7 configuration criteria in `docs/IMPLEMENTATION_PLAN.md`. Phase 7 acceptance and Phase 8 criterion 113 remain unverified.
- **Reason:** Keep browser binaries aligned with Playwright 1.64.0, provide documented local test commands with host-persisted results, and use the same image in CI without copying local secrets or auth state into the build context.
- **Commands / status:** `npm run lint` — PASS; `npm run typecheck` — PASS; `npm run test:list` — PASS (42 test instances across Chromium, Firefox, and WebKit); `ruby -e 'require "yaml"; YAML.load_file(".github/workflows/playwright.yml"); YAML.load_file("compose.yaml"); puts "YAML parse: PASS"'` — PASS; `git diff --check` — PASS. Official Playwright v1.64.0 Docker tag and Node 24 base were checked against the official documentation and tagged Dockerfile. `docker --version && docker compose version` — FAIL (Docker CLI is unavailable: `command not found: docker`); therefore Docker build, Compose config validation, container smoke/full-suite runs, and image-layer inspection — NOT RUN. GitHub Actions execution — NOT RUN (no dispatch or push requested).
- **Security / limitations:** Build context excludes `.env`, `.env.*`, auth state, Git metadata, dependencies, references, and generated output. Dockerfile copies only package manifests, `src/`, `tests/`, and Playwright/TypeScript configuration; test values are passed at runtime only. The CI workflow retains `contents: read` and uploads only `playwright-report/` and `test-results/` with 14-day retention. Static configuration has not been exercised by Docker in this environment.
- **Handoff:** Run the documented Compose build, config, smoke, and full-suite commands on a Docker-enabled host or allow CI to execute them. Verify host report/result persistence and review artifacts before marking Phase 7 acceptance or Phase 8 criterion 113 complete.

### 2026-10-13 — Verify Docker runtime after startup

- **Session / scope:** Resume Docker verification after Docker Desktop was launched; diagnose a bind-mount output-path conflict, correct it, and run the image smoke and full suites.
- **Changed artifacts:** `playwright.config.ts` now supports `PLAYWRIGHT_HTML_REPORT` and `PLAYWRIGHT_TEST_RESULTS` overrides; `compose.yaml` sets nested output paths under the mounted host directories; `README.md` documents the nested locations and Docker report command; checked Phase 8 criterion 113 in `docs/IMPLEMENTATION_PLAN.md`.
- **Reason:** Playwright clears its configured output directories at startup. When the output directory was itself a bind-mount target, the first container smoke attempt failed with `EACCES: permission denied, rmdir '/app/test-results'`. Configuring Playwright to write into subdirectories of the mounted report/result directories avoids trying to remove the mount points.
- **Commands / status:** `docker info` — PASS; `docker --version` — PASS (29.8.1); `docker compose version` — PASS (v5.5.1); `docker compose --env-file /dev/null config` — PASS; `docker compose --env-file /dev/null build playwright` — PASS (official `v1.64.0-noble`, `npm ci` installed 326 packages and reported 0 vulnerabilities); `docker compose --env-file /dev/null run --rm ... playwright npm run test:smoke` — PASS (1 test passed); `docker compose --env-file /dev/null run --rm ... playwright npm test` — PASS (39 passed, 3 skipped; the three authenticated browser cases skipped because APP_EMAIL/APP_PASSWORD were explicitly unset); host-mounted temporary output directories contained report and result files for both runs; `npm run lint`, `npm run typecheck`, and `npm run test:list` — PASS (42 test instances); YAML parsing and `git diff --check` — PASS. The initial smoke attempt before the output-path fix — FAIL (`EACCES` at the mounted test-results directory); fixed before the passing runs.
- **Security / limitations:** Docker runs used `--env-file /dev/null`; APP_EMAIL, APP_PASSWORD, and FUNTIME_BASE_URL were unset. Output mounts used temporary host directories, which were removed after confirming generated files persisted. The image layer path audit was blocked by the repository secret-protection hook before command execution; no `.env` contents were accessed. The Dockerfile uses explicit COPY paths and `.dockerignore` excludes environment/auth-state paths. GitHub Actions itself — NOT RUN (no dispatch or push requested).
- **Handoff:** Phase 8 criterion 113 is now backed by a passing local version-matched Docker run. Review actual GitHub Actions artifact behavior separately before checking Phase 8 criterion 114; do not treat this local run as a CI dispatch.
- **Exact Docker commands:** `docker compose --env-file /dev/null config`; `docker compose --env-file /dev/null build playwright`; `docker compose --env-file /dev/null run --rm -v "$outdir/report:/app/playwright-report" -v "$outdir/results:/app/test-results" playwright npm run test:smoke`; `env -u APP_EMAIL -u APP_PASSWORD -u FUNTIME_BASE_URL docker compose --env-file /dev/null run --rm -v "$outdir/report:/app/playwright-report" -v "$outdir/results:/app/test-results" playwright npm test`. Before those runs, exported `PATH="/Applications/Docker.app/Contents/Resources/bin:$PATH"`, `PLAYWRIGHT_UID="$(id -u)"`, and `PLAYWRIGHT_GID="$(id -g)"`; created separate temporary `$outdir/report` and `$outdir/results` directories per run, confirmed output files, then removed the temporary directories.
