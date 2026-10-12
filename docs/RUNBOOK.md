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
