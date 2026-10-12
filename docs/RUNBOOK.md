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

### 2026-10-12 — Public and authenticated Funtime page map

- **Session / scope:** Document the discoverable public route families on `https://funtime.com.ua` and, at the user's explicit request, inspect the pages available in an authenticated account before framework implementation.
- **Changed artifacts:** Added `docs/web/SITEMAP.md`; added links to it in `README.md` and `README.uk.md`.
- **Reason:** Establish an evidence-based target-site map, including authenticated profile sections, to guide subsequent test-framework design.
- **Discovery:** Reviewed `robots.txt`, the general sitemap (93 URLs), one monthly sitemap (`2026-09.xml`, 40 URLs), the homepage, category/listing pages, and site maps. The sitemap index listed monthly files from 2022-08 through 2027-01. Logged in with credentials supplied by the user, confirmed `/profile`, `/profile/planning`, `/profile/visited`, `/profile/reviews`, and `/profile/reviews/replies`, then logged out and closed the browser. No credentials, account identifiers, or profile values are recorded here.
- **Commands / verification:** `playwright-cli open https://funtime.com.ua` — PASS; `playwright-cli goto https://funtime.com.ua/login` — PASS; authenticated route navigation — PASS; logout and `playwright-cli close` — PASS. Relative Markdown link check across `README.md`, `README.uk.md`, and `docs/web/SITEMAP.md` — PASS. `git -C /Users/romanmakarenko/Documents/code/QA/JS-TS/PlaywrightAIFrameworkSkeleton diff --check` — PASS. Automated tests — NOT RUN (documentation-only task).
- **Security and limits:** `robots.txt` disallows `/profile/*`; the user explicitly requested authenticated inspection. `/bnnr/*` and `/pr/*` were not explored. No account settings were saved and no forms, purchases, bookings, or registrations were submitted. Only the general sitemap and one monthly sitemap were inspected in detail; the route map documents patterns and examples, not every dynamic URL. The web fetch tool reported redirect-loop behavior on direct sitemap-index retrieval, so the sitemap coverage is limited to the returned index summary and the two reviewed sitemap files.
- **Handoff:** Use `docs/web/SITEMAP.md` as discovery evidence for upcoming test design. Re-check current routes before relying on this dated snapshot; this checkpoint does not mark an implementation phase complete.
