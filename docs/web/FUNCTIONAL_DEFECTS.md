# Functional Defects and Verification Queue — Funtime

**Audit date:** 2026-10-13
**Confirmed reproducible defects:** 0

No functional defect met the evidence threshold during the read-only audit. This file separates observed behavior from hypotheses requiring controlled verification. Observations below are not defect tickets or proof of root cause.

## Confirmed defects

None confirmed.

## `NEEDS_VERIFICATION` observations

### OBS-001 — Nearby page retained its geolocation loading message

- **Severity:** Not assigned; no defect confirmed.
- **Affected URL:** `https://funtime.com.ua/nearby/lakes`
- **Preconditions:** Browser state and geolocation permission/device location were not controlled or established.
- **Reproduction observed:** Open `/nearby/lakes`; observe “Визначення геолокації...” after page load; wait five seconds.
- **Expected result:** Unknown. Need product requirement for granted, denied, unavailable, and timed-out geolocation states.
- **Actual result:** The loading message remained visible during this five-second observation; a “Фільтрувати” control was available and opened a category menu.
- **Evidence:** Playwright MCP snapshot/observation on 2026-10-13; MCP console inspection returned zero messages at that time.
- **Reproducibility:** One observed session only; not reproduced with a controlled permission state.
- **Related test case:** `NEAR-001`.
- **Next action:** Verify using a controlled test environment with explicit geolocation grant/deny and known test coordinates. Do not classify as a defect until an expected terminal state and reproducibility are established.

### OBS-002 — Editorial related-content insertion area showed no cards

- **Severity:** Not assigned; no defect confirmed.
- **Affected URL:** `https://funtime.com.ua/articles/dictionary-of-quest-gamers`
- **Preconditions:** Public article page loaded; snapshot captured at the time of the audit.
- **Reproduction observed:** Open article and inspect “Вас також зацікавить”.
- **Expected result:** Unknown; no requirement establishes that cards must be present.
- **Actual result:** The section/insertion area was visible in the snapshot without visible recommendation cards.
- **Evidence:** Playwright MCP accessibility snapshot from read-only inspection.
- **Reproducibility:** One captured state; loading timing and content rules unverified.
- **Related test case:** `ART-001` (navigation only; does not assert cards exist).
- **Next action:** Confirm whether the block is conditional and repeat after the page reaches its normal terminal state.

### OBS-003 — Turnstile console messages on registration page

- **Severity:** Not assigned; console output alone is not a functional defect.
- **Affected URL:** `https://funtime.com.ua/register`
- **Preconditions:** Public registration screen loaded; no form submitted and no challenge bypass attempted.
- **Reproduction observed:** Load `/register` and inspect console.
- **Expected result:** Not defined by this functional audit.
- **Actual result:** Two console errors and four warnings were reported; the two errors referenced Cloudflare Turnstile logging `NaN`.
- **Evidence:** Playwright MCP console output during the audit session.
- **Reproducibility:** Not independently rechecked in a second context; no user-visible failure established.
- **Related test case:** `AUTH-001`.
- **Next action:** Investigate only in an authorized test setup if the registration flow demonstrably fails; do not bypass the challenge.

## Access and verification blockers (not defects)

- **Search:** Browser input for a search query was explicitly denied by the tool's external-site input permission classifier. No workaround was attempted. Search result behavior remains `BLOCKED`; see `SRCH-001`.
- **Account and persistent actions:** No current authorized test account/environment plus cleanup protocol was used for login, registration, saved/visited changes, comments, or subscriptions. These are not defects; see `AUTH-001`, `AUTH-002`, and `FORM-001`.
- **Sitemap breadth:** Dynamic URLs and most sitemap entries were not opened individually. A missing verification is not evidence of a broken page.

## Reporting threshold

Promote an observation to a defect only when the expected behavior is known, the issue is reproducible with documented steps, the actual result differs from that expectation, and the evidence is safe to retain. Do not infer business rules for recommendation relevance, geolocation, or conditional editorial content.
