# Functional E2E Test Case Catalog — Funtime

**Designed:** 2026-10-13. The catalog contains manual specifications; its per-case status fields track completion of those manual specifications. Automated execution and its narrower scope are recorded in the mapping at the end of this document. Production cases involving submissions or persistent changes require an approved test environment/account and rollback plan.

## Execution-state meanings

- `NOT_EXECUTED`: scenario is specified but no test run was performed.
- `BLOCKED`: execution is prevented by a known access/tool constraint.
- `NEEDS_VERIFICATION`: expected behavior or prerequisite needs confirmation before treating as an acceptance criterion.

## Initial smoke subset

Run `NAV-001`, `CAT-001`, `LOC-001`, `REL-001`, and `ART-001` first in a safe environment. These cover core navigation, catalog expansion, location rendering, related-content navigation, and an editorial cross-link. This is a proposed prioritization subset, not a claim of execution.

## Navigation and category

### NAV-001 — Mobile menu opens and navigates to a category

**Functional area:** Responsive navigation
**Priority:** P1
**Type:** Navigation
**Preconditions:** Use a viewport around 390×844; site is publicly reachable.
**Test data:** `/`; category target `/nature/type/lakes`; menu label “Меню”; category label “Озера”.
**Initial state:** Anonymous visitor at the home page, mobile viewport.
**Template:** Home / mobile global navigation. **Sitemap pattern:** `/` and `/{category}/type/{type}`.
**Related cases:** CAT-001.

| Step | Action | Expected result |
|---|---|---|
| 1 | Open `https://funtime.com.ua/` at the target viewport. | Home page loads and the mobile navigation control is available. |
| 2 | Activate “Меню”. | A navigation panel/menu becomes visible with category links. |
| 3 | Choose “Озера”. | Browser navigates to `/nature/type/lakes`; the page heading is “Озера”. |
| 4 | Use browser Back. | The browser returns to the preceding home-page state/URL. Exact menu persistence is not specified and must not be asserted. |

**Final expected state:** Home page restored after Back.
**Cleanup:** None.
**Status:** `NOT_EXECUTED`.
**Evidence:** The mobile menu and “Озера” navigation were directly observed at 390×844.
**Automation notes:** Prefer role/name locators; do not assume the mobile menu DOM is identical to desktop navigation.

### NAV-002 — Breadcrumb returns from location to parent category

**Functional area:** Global navigation
**Priority:** P2
**Type:** Navigation
**Preconditions:** Public location route is reachable.
**Test data:** `/nature/ikva-river`; breadcrumb link “Природа” to `/nature`.
**Initial state:** Browser on a blank/new tab.
**Template:** Location detail. **Sitemap pattern:** `/{category}/{slug}`.
**Related cases:** LOC-001.

| Step | Action | Expected result |
|---|---|---|
| 1 | Open `https://funtime.com.ua/nature/ikva-river` directly. | The detail page loads and identifies “Іква” as its heading/title. |
| 2 | Locate the breadcrumb link “Природа”. | Breadcrumb is visible and its destination is `/nature`. |
| 3 | Activate “Природа”. | Browser opens `/nature` and displays the nature category page. |
| 4 | Use browser Back. | Browser returns to `/nature/ikva-river`. |

**Final expected state:** River detail route is restored. **Cleanup:** None. **Status:** `NOT_EXECUTED`.
**Evidence:** River detail and breadcrumb structure were observed; this precise breadcrumb activation was not performed. **Automation notes:** Verify href and destination content, not only click completion.

### CAT-001 — Lake catalog expands one additional batch

**Functional area:** Category navigation/catalog
**Priority:** P1
**Type:** Positive / boundary
**Preconditions:** Public lake catalog is reachable.
**Test data:** `/nature/type/lakes`; “показати ще”; initial displayed count 15 of 172.
**Initial state:** Catalog loaded before expansion.
**Template:** Type catalog. **Sitemap pattern:** `/{category}/type/{type}`.
**Related cases:** NAV-001, LOC-001.

| Step | Action | Expected result |
|---|---|---|
| 1 | Open `https://funtime.com.ua/nature/type/lakes`. | Heading “Озера” and lake cards are visible; count reads 15 of 172 in the observed dataset. The exact count may change over time. |
| 2 | Record the current visible card count and URL. | Fifteen location entries are shown; the URL is `/nature/type/lakes`. |
| 3 | Activate “показати ще” once. | A further batch of cards appears; observed behavior increased the displayed count from 15 to 30 without changing the URL. |
| 4 | Inspect the updated count and list. | Count reflects the newly displayed items; previously displayed cards remain and the newly appended entries are visible. |

**Final expected state:** Expanded catalog remains on the same route. **Cleanup:** None. **Status:** `NOT_EXECUTED`.
**Evidence:** One activation was observed to take the count from 15 to 30. Total record count is time-sensitive. **Automation notes:** Avoid hard-coded total/record ordering; assert a positive increase and unchanged URL if still true in the test environment.

## Location and related content

### LOC-001 — Location detail displays its identity and navigation sections

**Functional area:** Location details
**Priority:** P1
**Type:** Positive / data consistency
**Preconditions:** Public route reachable.
**Test data:** `/nature/ikva-river`; heading “Іква”; directions/map link; review and related-content sections.
**Initial state:** Anonymous visitor.
**Template:** River detail; repeat identity checks for other location types. **Sitemap pattern:** `/{category}/{slug}`.
**Related cases:** NAV-002, REL-001, DATA-001.

| Step | Action | Expected result |
|---|---|---|
| 1 | Open `https://funtime.com.ua/nature/ikva-river`. | Page loads at the requested URL and the main heading is “Іква”. |
| 2 | Inspect the category/type indicator and breadcrumb. | The page is identified as a nature location; breadcrumb links are visible and point to parent navigation. |
| 3 | Inspect the directions/map affordance. | A directions/map control is present; the exact external destination should match the page location if opened in a controlled check. |
| 4 | Inspect the review and related-content regions. | Review area and the observed “Що ще є поруч” and “Інші річки” regions are present. |
| 5 | Refresh the page. | The same location route and heading load again; no session-dependent state is required for basic public content. |

**Final expected state:** Public detail remains accessible and correctly identified. **Cleanup:** None. **Status:** `NOT_EXECUTED`.
**Evidence:** These page elements were observed in a read-only snapshot. **Automation notes:** Treat map/contact and recommendation contents as optional where location data differs.

### REL-001 — Open a related-place recommendation and return

**Functional area:** Related content
**Priority:** P2
**Type:** Navigation / data consistency
**Preconditions:** River detail is reachable and its related list contains the observed destination.
**Test data:** Source `/nature/ikva-river`; recommendation “Дубенський Замок”; destination `/architecture/dubenskiy`.
**Initial state:** Anonymous visitor on the source location page.
**Template:** River detail and related-place cards. **Sitemap pattern:** `/{category}/{slug}`.
**Related cases:** LOC-001, REL-002.

| Step | Action | Expected result |
|---|---|---|
| 1 | Open `https://funtime.com.ua/nature/ikva-river`. | River detail loads with heading “Іква”. |
| 2 | Locate “Дубенський Замок” in the observed recommendation block. | A recommendation link with that label is visible and targets `/architecture/dubenskiy`. |
| 3 | Activate the recommendation. | Browser navigates to `/architecture/dubenskiy`; the destination page identifies the linked place as Дубенський Замок. |
| 4 | Use browser Back. | Browser returns to `/nature/ikva-river` and the source heading remains “Іква”. |

**Final expected state:** Back navigation returns to the original river page. **Cleanup:** None. **Status:** `NOT_EXECUTED`.
**Evidence:** Link navigation and return were directly observed. **Automation notes:** Recommendation ordering may change; locate by accessible link name and validate href/content.

### REL-002 — Validate related-section identity and card destinations on representative types

**Functional area:** Related content
**Priority:** P2
**Type:** Data consistency
**Preconditions:** Representative detail pages load and display recommendation sections.
**Test data:** `/nature/male-domashnye`, `/nature/ikva-river`, `/relaxation-and-recreation/haiky-rezort`.
**Initial state:** Anonymous visitor.
**Template:** Lake, river, country-complex detail. **Sitemap pattern:** `/{category}/{slug}`.
**Related cases:** REL-001, DATA-001.

| Step | Action | Expected result |
|---|---|---|
| 1 | Open `/nature/male-domashnye`. | Page identifies “Мале Домашнє” and exposes “Що ще є поруч” and “Інші озера” blocks as observed. |
| 2 | Inspect the visible related cards. | Each visible card has a label and a link destination; no assertion is made about the undisclosed selection algorithm. |
| 3 | Open `/nature/ikva-river`. | Page identifies “Іква” and exposes “Що ще є поруч” and “Інші річки” as observed. |
| 4 | Open `/relaxation-and-recreation/haiky-rezort`. | Page identifies the country-complex detail and exposes “Що ще є поруч” and “Інші заміські комплекси” as observed. |
| 5 | For each chosen card, compare label with destination page heading. | Destination page identity corresponds to the selected card label; any mismatch is recorded with source URL, card label, and href. |

**Final expected state:** All sampled block/card labels and destinations are internally consistent; no unverified proximity or taxonomy rule is asserted. **Cleanup:** None. **Status:** `NEEDS_VERIFICATION` for generalized selection rules; direct navigation examples partly observed.
**Evidence:** Blocks observed; only one link path validated end-to-end in this exploration. **Automation notes:** Separate stable link/content integrity from variable recommendation relevance.

## Collections and editorial

### NAV-003 — Collection item opens the matching location

**Functional area:** Cross-content navigation
**Priority:** P2
**Type:** Navigation / data consistency
**Preconditions:** Collection is reachable and the DinoSofia item is present.
**Test data:** `/collections/relaxation-and-recreation/parky-z-dynozavrvmy-v-ukrayini`; “DinoSofia”; `/relaxation-and-recreation/dinosofia-park`.
**Initial state:** Anonymous visitor.
**Template:** Collection detail → location detail. **Sitemap pattern:** `/collections/{category}/{slug}`.
**Related cases:** ART-001, DATA-001.

| Step | Action | Expected result |
|---|---|---|
| 1 | Open the collection URL. | Collection detail loads and displays its collection content. |
| 2 | Confirm the DinoSofia item is visible. | A card/link identifies DinoSofia Park. |
| 3 | Activate the item. | Browser navigates to `/relaxation-and-recreation/dinosofia-park`. |
| 4 | Inspect the destination heading. | Destination page identity matches the selected collection item. |

**Final expected state:** Matching location detail is open. **Cleanup:** None. **Status:** `NOT_EXECUTED`.
**Evidence:** The collection listed eight locations; the DinoSofia link transition was observed. **Automation notes:** Do not require a fixed collection size as content may change.

### ART-001 — Article internal link opens its referenced category

**Functional area:** Editorial navigation
**Priority:** P2
**Type:** Navigation
**Preconditions:** Article and a known quest-category link are available.
**Test data:** `/articles/dictionary-of-quest-gamers`; internal quest-category link observed in article body.
**Initial state:** Anonymous visitor.
**Template:** Article detail → category/subcategory. **Sitemap pattern:** `/articles/{slug}`.
**Related cases:** NAV-003.

| Step | Action | Expected result |
|---|---|---|
| 1 | Open `https://funtime.com.ua/articles/dictionary-of-quest-gamers`. | Article detail loads with its title and long-form content. |
| 2 | Locate a visible internal link to a quest category in the article body. | Link is visible with a meaningful label and an internal Funtime destination. |
| 3 | Activate that link. | Browser opens the linked quest category route and the destination heading/category corresponds to the link label. |
| 4 | Use browser Back. | Browser returns to the article route. |

**Final expected state:** Article route restored after following and returning from its internal link. **Cleanup:** None. **Status:** `NOT_EXECUTED`.
**Evidence:** Article content and internal category links observed; this specific link activation was not recorded before automation. **Automation notes:** Implemented in `tests/e2e/public-journeys.spec.ts`. The sampled link has `target="_blank"`; automation verifies the popup destination and confirms the article remains open. This is a verified clarification of the sampled link behavior, not a universal rule for article links.

## Search and account journeys

### SRCH-001 — Search results correspond to an entered location query

**Functional area:** Search
**Priority:** P1
**Type:** Positive / data consistency
**Preconditions:** Search control is available and test input is permitted in an authorized test environment.
**Test data:** Query “озеро”; expected matching behavior/results must first be confirmed.
**Initial state:** Anonymous visitor on a public page.
**Template:** Global search / result view. **Sitemap pattern:** Search route not inventoried.
**Related cases:** ERR-001.

| Step | Action | Expected result |
|---|---|---|
| 1 | Open the home page and activate “Пошук на сайті”. | Search interface opens or becomes available. The exact interaction is to be confirmed for the current build. |
| 2 | Enter “озеро” and submit using the visible search action. | Search is submitted only in an authorized test context; no production submission is required for this specification. |
| 3 | Inspect the resulting page/list. | Results, empty state, and URL behavior are recorded; expected matching rules are confirmed before asserting them. |
| 4 | Open a result labelled as a location. | Destination loads and its heading/content match the selected result. |

**Final expected state:** Query outcome is recorded and result identity verified. **Cleanup:** Clear query if the interface persists it. **Status:** `BLOCKED` (browser input submission to external site denied; search behavior unverified).
**Evidence:** Search entry point observed; query input was not performed. **Automation notes:** Do not evade the browser permission denial; use an explicitly approved test environment.

### AUTH-001 — Validate anonymous login form required-field behavior

**Functional area:** Authentication
**Priority:** P1
**Type:** Negative / boundary
**Preconditions:** Use a non-production environment where form submission is explicitly authorized.
**Test data:** Empty email and password; no credentials.
**Initial state:** Anonymous visitor on `/login`.
**Template:** Login. **Sitemap pattern:** `/login` (public auth route; not listed as a sitemap family in all inventories).
**Related cases:** AUTH-002, FORM-001.

| Step | Action | Expected result |
|---|---|---|
| 1 | Open `https://funtime.com.ua/login`. | Login screen shows email and password fields and a sign-in action. |
| 2 | Leave both fields empty and activate the sign-in action only in an approved test environment. | Required-field/browser validation or a visible application validation response is produced; exact validation is to be verified. |
| 3 | Observe the URL and form state. | No authenticated session is created from an empty submission; the observed validation is documented. |

**Final expected state:** Visitor remains anonymous. **Cleanup:** None. **Status:** `NEEDS_VERIFICATION` (no form submission performed).
**Evidence:** Login form fields observed; no validation outcome observed. **Automation notes:** Requires a controlled environment and must not infer the validation mechanism.

### AUTH-002 — Authenticated session lifecycle and saved/visited lists

**Functional area:** Authentication / wishlist and visit tracking
**Priority:** P1
**Type:** State transition
**Preconditions:** Authorized non-production account and explicit permission to change test data; documented cleanup/reset path.
**Test data:** Dedicated test account; one disposable test location approved for state changes. Credentials must be provided securely at execution and never documented.
**Initial state:** Signed-out, authorized test environment.
**Template:** Login, location detail, profile planning/visited lists. **Sitemap patterns:** `/login`, `/profile/planning`, `/profile/visited`, `/{category}/{slug}`.
**Related cases:** LOC-001.

| Step | Action | Expected result |
|---|---|---|
| 1 | Sign in using the approved test account. | Authenticated profile/session is available; expected landing behavior is confirmed from requirements. |
| 2 | Open the approved location and inspect save/visit controls. | Actual controls and starting states are recorded; do not assume which state transitions exist. |
| 3 | Perform only a specifically approved save or visit transition. | UI gives observable feedback and indicates the resulting state, if the site supports that action. |
| 4 | Open the corresponding profile list. | The location appears in the matching list if the action is supported. |
| 5 | Refresh and revisit the list. | Persistence matches the verified product requirement. |
| 6 | Restore the location to its original test state using the approved cleanup path, then sign out. | Test data is cleaned up; the account returns to signed-out state. |

**Final expected state:** No residual test data; session signed out. **Cleanup:** Mandatory and account-specific; do not run against an uncontrolled production account. **Status:** `BLOCKED` until authorized test account/environment and cleanup procedure exist.
**Evidence:** Auth pages are public; prior sitemap/RUNBOOK context lists profile routes, but this audit did not execute current authenticated journeys. **Automation notes:** Do not embed secrets or export storage state.

## Filters, nearby, forms, and errors

### NEAR-001 — Nearby lake page resolves location state

**Functional area:** Nearby locations
**Priority:** P2
**Type:** Positive / state
**Preconditions:** Browser geolocation is available and a permitted test location can be used.
**Test data:** `/nearby/lakes`; controlled test coordinates/device.
**Initial state:** No geolocation permission decision made in a controlled test profile.
**Template:** Nearby by type. **Sitemap pattern:** `/nearby/{type}`.
**Related cases:** ERR-001.

| Step | Action | Expected result |
|---|---|---|
| 1 | Open `/nearby/lakes` in a controlled browser context. | Page heading “Озера поруч” and filter control are visible. |
| 2 | Grant geolocation only if authorized and required by the test setup. | Browser permission state is explicit and uses the approved test location. |
| 3 | Observe the location-loading state and results. | Loading state resolves to a result or an explicit, understandable permission/error/empty state; exact result content depends on test coordinates. |
| 4 | Open a displayed location result. | The corresponding location detail opens and matches the card identity. |

**Final expected state:** A location result or explicit terminal state is displayed, not indefinite unclassified loading. **Cleanup:** Revoke/reset test permission and remove location override. **Status:** `NEEDS_VERIFICATION`; observed loading text persisted for five seconds but permission context was unknown.
**Evidence:** “Визначення геолокації...” remained visible for five seconds in one session; geolocation permission/result was not established. **Automation notes:** Use controlled geolocation fixtures; do not use arbitrary waits as synchronization.

### REV-001 — Review sort menu exposes available choices

**Functional area:** Reviews
**Priority:** P2
**Type:** Positive
**Preconditions:** Review type page is reachable.
**Test data:** `/reviews/about/castles`; sort choices observed.
**Initial state:** Page loaded with reviews.
**Template:** Reviews by type. **Sitemap pattern:** `/reviews/about/{type}`.
**Related cases:** DATA-001.

| Step | Action | Expected result |
|---|---|---|
| 1 | Open `/reviews/about/castles`. | Page loads with heading/content for castle reviews and displays the observed 7/7 count at the time of audit (count may change). |
| 2 | Activate “Сортувати”. | A sort menu becomes visible. |
| 3 | Inspect available options. | Options include “спочатку найновіші”, “спочатку самі перші”, “спочатку популярні”, and “спочатку перевірені”, if unchanged. |
| 4 | Select one option only in an approved test context and inspect the list. | The menu closes or selection is shown; ordering change must be verified against timestamps/rules before asserting. |

**Final expected state:** Review list remains accessible and selected order is recorded. **Cleanup:** Restore default ordering if state persists. **Status:** `NEEDS_VERIFICATION` for ordering effect; menu options were observed.
**Evidence:** Sort menu and four options were observed; selecting an option and verifying the resulting order were not performed. **Automation notes:** Avoid exact review count and do not assert sort semantics without validated data.

### FORM-001 — RSS email field validation

**Functional area:** Forms
**Priority:** P3
**Type:** Negative / boundary
**Preconditions:** Use an approved non-production environment or a safely intercepted request; do not subscribe a real address.
**Test data:** Empty value and a reserved invalid-address value that cannot reach a real subscriber system.
**Initial state:** Footer visible with “введіть email” and “Підписатись”.
**Template:** Shared footer. **Sitemap pattern:** All sampled public pages.
**Related cases:** ERR-001.

| Step | Action | Expected result |
|---|---|---|
| 1 | Scroll to the footer on a public page. | RSS email textbox and “Підписатись” button are visible. |
| 2 | In the approved isolated environment, submit an empty value. | Validation behavior is visible and no subscription is created; exact message is recorded. |
| 3 | Submit a reserved invalid address only if requests are safely intercepted. | The interface rejects invalid input or returns its documented response; no external message/subscription is created. |

**Final expected state:** No real subscription side effect. **Cleanup:** Remove intercepted test data if created in isolation. **Status:** `BLOCKED` pending safe interception/non-production environment.
**Evidence:** Controls observed; no submission performed. **Automation notes:** Never use a real email address or submit to production without explicit authorization.

### ERR-001 — Public page refresh and direct-route availability

**Functional area:** Error handling/navigation
**Priority:** P2
**Type:** Boundary / navigation
**Preconditions:** Public representative URLs are reachable.
**Test data:** `/nature/type/lakes`, `/nature/male-domashnye`, `/collections/relaxation-and-recreation/parky-z-dynozavrvmy-v-ukrayini`.
**Initial state:** New anonymous browser context.
**Template:** Catalog, location detail, collection detail. **Sitemap patterns:** `/{category}/type/{type}`, `/{category}/{slug}`, `/collections/{category}/{slug}`.
**Related cases:** CAT-001, LOC-001, NAV-003.

| Step | Action | Expected result |
|---|---|---|
| 1 | Open each URL directly in a new tab/context. | Each known representative public route loads its matching page without requiring prior navigation. |
| 2 | Refresh each page. | The same route remains available and page identity is consistent after refresh. |
| 3 | Use Back/Forward where a navigation transition exists. | Browser history moves between the actual visited routes and does not land on an unrelated page. |

**Final expected state:** Each route remains directly addressable. **Cleanup:** Close tabs. **Status:** `NOT_EXECUTED`.
**Evidence:** Representative pages were opened directly; refresh across all three was not explicitly exercised. **Automation notes:** Check final URL and main heading; avoid asserting transient cache/network behavior.

## Data consistency

### DATA-001 — Card label, route, and destination heading agree

**Functional area:** Content/data consistency
**Priority:** P2
**Type:** Data consistency
**Preconditions:** Representative cards and links remain available.
**Test data:** One lake card from `/nature/type/lakes`; one collection item; one related-place card.
**Initial state:** Public pages loaded.
**Template:** Catalog, collection, location detail. **Sitemap patterns:** `/{category}/type/{type}`, `/collections/{category}/{slug}`, `/{category}/{slug}`.
**Related cases:** CAT-001, NAV-003, REL-002.

| Step | Action | Expected result |
|---|---|---|
| 1 | Select a visible named location card and record its label and href. | Link label and internal destination are available for comparison. |
| 2 | Open the destination. | Destination loads successfully at the recorded URL. |
| 3 | Compare the destination heading/title with the source card identity. | Destination represents the location named by the card; discrepancies are recorded with both values and URL. |
| 4 | Repeat for one collection card and one related-content card. | Each checked link resolves to its corresponding destination; no assumption is made about recommendation ranking. |

**Final expected state:** All selected card identities match destination pages. **Cleanup:** None. **Status:** `NOT_EXECUTED` (some individual transitions have been observed; this broader repeatable check has not been run).
**Evidence:** Catalog cards, one collection item, and a river recommendation were observed; the corresponding individual transitions are documented in NAV-003 and REL-001. The broader repeated consistency check has not run. **Automation notes:** Use stable accessible names and verify the href before navigation.

## Additional negative and boundary scenarios

### AUTH-003 — Login rejects invalid or unrecognized credentials without authenticating

**Functional area:** Authentication
**Priority:** P1
**Type:** Negative / security boundary
**Preconditions:** An approved non-production environment and disposable test account/data are available; submission is explicitly authorized.
**Test data:** Malformed email; separately, a reserved non-existent account identifier and non-secret invalid password. Do not use real user identifiers or credentials.
**Initial state:** Anonymous visitor on `/login` in the approved environment.
**Template:** Login. **Sitemap pattern:** `/login`.
**Related cases:** AUTH-001, AUTH-002.

| Step | Action | Expected result |
|---|---|---|
| 1 | Enter a malformed email and a non-secret password, then submit only in the approved environment. | The attempt does not create an authenticated session; record the observed validation or response without assuming its wording or mechanism. |
| 2 | If permitted by the test environment, submit an unrecognized test account identifier with a non-secret invalid password. | The visitor remains unauthenticated; record the response without requiring whether the application distinguishes unknown users from incorrect passwords. |
| 3 | Inspect the URL and any visible response. | No authenticated profile state is available; any messages/redirects are recorded for requirements review. |

**Final expected state:** Anonymous session; no account or persistent data created. **Cleanup:** Clear form state and end the isolated browser context. **Status:** `BLOCKED` until an authorized non-production environment and safe test data are available.
**Evidence:** Login fields were observed, but submission behavior was not tested. **Automation notes:** Do not submit against production, use real identifiers, or assert account-enumeration behavior.

### AUTH-004 — Registration form handles missing and malformed input

**Functional area:** Authentication / registration
**Priority:** P1
**Type:** Negative / boundary
**Preconditions:** An approved non-production environment is available; registration attempts are safely isolated and explicitly authorized.
**Test data:** Empty required fields and malformed email; use reserved test values only.
**Initial state:** Anonymous visitor on `/register`.
**Template:** Registration. **Sitemap pattern:** `/register`.
**Related cases:** AUTH-001, AUTH-002.

| Step | Action | Expected result |
|---|---|---|
| 1 | Inspect the registration form and record fields/controls currently shown. | The visible form can be identified; required-field rules are not assumed from appearance alone. |
| 2 | In the isolated environment, attempt submission with required fields empty. | No account is created; record the observed validation behavior for confirmation against requirements. |
| 3 | If safely supported, submit a malformed email with otherwise reserved test data. | No account is created from invalid input; exact message and validation mechanism remain to be verified. |
| 4 | Return to the form without completing any challenge or external identity flow. | No external login/challenge is bypassed and no persistent account state is left behind. |

**Final expected state:** No account created and no external identity flow completed. **Cleanup:** Remove any isolated test record if one was unexpectedly created; otherwise close the context. **Status:** `BLOCKED` pending an authorized isolated environment and cleanup process.
**Evidence:** Registration fields and terms were observed; no form submission was performed. **Automation notes:** Do not interact with production registration, CAPTCHA/Turnstile, or real identity providers.

### AUTH-005 — Password reset handles malformed and unknown test addresses safely

**Functional area:** Authentication / password reset
**Priority:** P2
**Type:** Negative / security boundary
**Preconditions:** An approved non-production environment with email delivery safely intercepted; reset requests explicitly authorized.
**Test data:** Malformed email and a reserved unknown test address. Never use a real mailbox.
**Initial state:** Anonymous visitor on `/password/reset`.
**Template:** Password reset. **Sitemap pattern:** `/password/reset`.
**Related cases:** AUTH-001, AUTH-003.

| Step | Action | Expected result |
|---|---|---|
| 1 | Inspect the reset form without submitting. | The visible input and action are recorded; no exact validation or account-existence behavior is assumed. |
| 2 | Submit a malformed email only in the isolated environment. | No real email is sent; observed response is recorded for requirements review. |
| 3 | Submit the reserved unknown test address only if email delivery is intercepted. | No external message is delivered; record response without assuming whether it reveals account existence. |

**Final expected state:** No real reset email or account change. **Cleanup:** Remove intercepted messages/test data and close the isolated context. **Status:** `BLOCKED` pending non-production isolation and email interception.
**Evidence:** Reset email field and action were observed; no request was submitted. **Automation notes:** Never use a real email address or production reset flow.

### SRCH-002 — Search with a query that should have no matching test results

**Functional area:** Search
**Priority:** P2
**Type:** Negative / empty state
**Preconditions:** Search input is permitted in an approved test environment; a controlled query can be selected and its absence from the test dataset confirmed.
**Test data:** A reserved, unique query value confirmed to have no matching test records; do not assume any specific empty-state copy.
**Initial state:** Anonymous visitor on a public page with the search control available.
**Template:** Global search / result view. **Sitemap pattern:** Search route not inventoried.
**Related cases:** SRCH-001, SRCH-003.

| Step | Action | Expected result |
|---|---|---|
| 1 | Open the search interface using its visible control. | Search input is available; current interface and route behavior are recorded. |
| 2 | Submit the controlled no-match query only in the approved environment. | The resulting state is recorded as results, empty state, or another response; the expected no-match presentation must be confirmed before acceptance assertions are added. |
| 3 | Inspect the resulting URL and available page content. | The query/result state can be recorded and does not falsely identify an unrelated location as a match. |

**Final expected state:** Search outcome is recorded; no fixed message or URL format is presumed. **Cleanup:** Clear the query if retained. **Status:** `BLOCKED` (search input was denied in the prior audit; test dataset and matching rules are not confirmed).
**Evidence:** Search entry point was observed; no query was entered. **Automation notes:** Do not bypass browser input restrictions or inject the query through an alternate channel.

### SRCH-003 — Search handles empty, whitespace, and punctuation input

**Functional area:** Search
**Priority:** P2
**Type:** Negative / boundary
**Preconditions:** Search input is permitted in an approved environment.
**Test data:** Empty string, whitespace-only input, and punctuation-only input, tested separately.
**Initial state:** Anonymous visitor with the search interface available.
**Template:** Global search / result view. **Sitemap pattern:** Search route not inventoried.
**Related cases:** SRCH-001, SRCH-002.

| Step | Action | Expected result |
|---|---|---|
| 1 | Open search and submit with the field empty, if the interface allows submission. | Record whether submission is prevented or a response is shown; exact validation is unconfirmed. |
| 2 | Enter whitespace-only input and submit in the approved environment. | Record the resulting state; no particular normalization or message is assumed. |
| 3 | Enter punctuation-only input and submit in the approved environment. | Record the resulting state and confirm that any displayed result is not treated as a valid match without evidence. |

**Final expected state:** Each input outcome is documented without inventing validation rules. **Cleanup:** Clear search state. **Status:** `BLOCKED` (input submission was denied during the audit).
**Evidence:** Search entry point was observed, but input behavior was not exercised. **Automation notes:** Preserve the browser permission boundary; test only through the visible UI in an authorized context.

### ERR-002 — Unknown or malformed public route produces a stable terminal outcome

**Functional area:** Routing / error handling
**Priority:** P1
**Type:** Negative / boundary
**Preconditions:** A safe, read-only browser context; use only a deliberately reserved path segment that is not a real content slug.
**Test data:** `/nature/__qa-nonexistent-slug__` and one malformed public path constructed without query strings or state-changing parameters.
**Initial state:** Anonymous visitor in a new browser context.
**Template:** Public route resolution. **Sitemap pattern:** `/{category}/{slug}` and unknown public route.
**Related cases:** ERR-001, NAV-002.

| Step | Action | Expected result |
|---|---|---|
| 1 | Open the reserved nonexistent path directly. | Record whether the site renders an error/not-found state, redirects, or responds another way; no specific status code or copy is assumed. |
| 2 | Refresh the resulting route. | The resulting behavior is recorded and does not silently become an unrelated content page. |
| 3 | Use browser Back to return to a known public page. | Browser history remains usable and returns to the prior known route. |

**Final expected state:** Outcome for unknown routes is documented for product confirmation; no live data is changed. **Cleanup:** Close the context. **Status:** `NEEDS_VERIFICATION` (expected not-found/redirect behavior is not defined by available requirements).
**Evidence:** Existing route checks cover known routes only. **Automation notes:** Do not assert HTTP status, redirect target, error copy, or route normalization until confirmed.

### NEAR-002 — Nearby page handles denied geolocation permission

**Functional area:** Nearby locations / geolocation
**Priority:** P1
**Type:** Negative / permission state
**Preconditions:** Controlled browser profile supports an explicit geolocation-denied state; no location override is configured.
**Test data:** `/nearby/lakes`; browser geolocation permission set to denied.
**Initial state:** New anonymous browser context with geolocation denied.
**Template:** Nearby by type. **Sitemap pattern:** `/nearby/{type}`.
**Related cases:** NEAR-001, NEAR-003.

| Step | Action | Expected result |
|---|---|---|
| 1 | Open `/nearby/lakes` with permission denied. | Nearby page and its available controls render; the browser permission state is explicit. |
| 2 | Observe the location-dependent area until a terminal state is reached. | Record whether the page shows results, an error, an empty state, or a loading state; expected copy/recovery behavior remains to be confirmed. |
| 3 | Verify the page does not remain indefinitely in an unclassified loading state. | Any persistent loading state is recorded with the permission context and investigated; no fixed timeout is asserted here. |

**Final expected state:** Permission-denied outcome and any available recovery action are documented. **Cleanup:** Reset browser permission and remove geolocation overrides. **Status:** `NEEDS_VERIFICATION` (permission behavior and expected terminal state are not established).
**Evidence:** Prior nearby observation did not establish the permission state. **Automation notes:** Use a controlled browser permission fixture; avoid arbitrary sleep-based synchronization.

### NEAR-003 — Nearby page handles unavailable location and retry/recovery

**Functional area:** Nearby locations / geolocation
**Priority:** P2
**Type:** Negative / recovery
**Preconditions:** Controlled environment can simulate unavailable geolocation or a permission request that fails/times out without relying on arbitrary delays.
**Test data:** `/nearby/lakes`; browser geolocation unavailable or a controlled geolocation error.
**Initial state:** New anonymous browser context with no valid location result.
**Template:** Nearby by type. **Sitemap pattern:** `/nearby/{type}`.
**Related cases:** NEAR-001, NEAR-002.

| Step | Action | Expected result |
|---|---|---|
| 1 | Open the nearby page with location unavailable. | Page shell and controls render; actual loading/error behavior is recorded. |
| 2 | Observe the location-dependent state through an observable UI/network completion or error. | A terminal state is recorded; expected message and recovery semantics are confirmed before becoming acceptance criteria. |
| 3 | If a visible retry or permission-change action exists, use it only after restoring a controlled valid test location. | Record whether the page retries and whether results or another terminal state appear; do not assume a retry control exists. |

**Final expected state:** Failure/recovery behavior is documented; no uncontrolled location is sent. **Cleanup:** Reset permission and geolocation override. **Status:** `NEEDS_VERIFICATION` (simulation capability and recovery behavior require confirmation).
**Evidence:** A loading label was observed for five seconds, but its cause and eventual outcome were unknown. **Automation notes:** Wait for an observable state/event rather than a fixed sleep; do not invent retry UI.

### CAT-002 — Repeated catalog expansion reaches a consistent terminal state

**Functional area:** Category catalog / list boundaries
**Priority:** P2
**Type:** Positive / boundary / data consistency
**Preconditions:** A catalog with multiple batches and a visible “показати ще” control is available.
**Test data:** `/nature/type/lakes`; record visible cards and URL before each expansion; total content is time-sensitive.
**Initial state:** Catalog loaded at its initial state in a new anonymous context.
**Template:** Type catalog. **Sitemap pattern:** `/{category}/type/{type}`.
**Related cases:** CAT-001, DATA-001.

| Step | Action | Expected result |
|---|---|---|
| 1 | Record initial card identities, count, and URL. | The baseline list and route are captured without asserting a fixed total. |
| 2 | Activate “показати ще” repeatedly while the control remains available, recording the list after each action. | Each response is recorded; new cards, count changes, or other behavior are compared with the prior state. |
| 3 | Compare the accumulated list for duplicate identities and inspect the control after the final available batch. | Duplicate cards and terminal-control behavior are documented; whether duplicates or a particular terminal-control presentation are allowed must be confirmed against requirements. |
| 4 | Refresh the catalog. | The initial or expanded state after refresh is recorded; persistence of expansion is not assumed. |

**Final expected state:** Batch progression, duplicate behavior, and exhaustion state are documented; no fixed page size or total is asserted. **Cleanup:** None. **Status:** `NEEDS_VERIFICATION` for terminal behavior and refresh persistence; one expansion was observed only.
**Evidence:** One activation expanded the observed list from 15 to 30 without changing URL. **Automation notes:** Avoid fixed record counts and ordering; use card identity/href comparisons.

### REV-002 — Review filters produce a recorded list state and can be reset

**Functional area:** Reviews / filters
**Priority:** P2
**Type:** Positive / boundary / state
**Preconditions:** A review page exposes a filter control and a controlled, inspectable list.
**Test data:** `/reviews/about/castles`; available filter options must be recorded at execution.
**Initial state:** Review list loaded in a new anonymous context.
**Template:** Reviews by type. **Sitemap pattern:** `/reviews/about/{type}`.
**Related cases:** REV-001, DATA-001.

| Step | Action | Expected result |
|---|---|---|
| 1 | Inspect the page for visible filter controls without assuming every review page has them. | Available controls and their labels are recorded. |
| 2 | If a filter is available, select one option in a read-only/approved context. | Resulting list, URL, and selected state are recorded; filter semantics must be confirmed before asserting membership rules. |
| 3 | If the filtered result is empty, inspect the resulting empty state; otherwise compare visible records with the selected filter using verified data. | Empty/result behavior is documented without assuming exact copy or counts. |
| 4 | Restore the default filter state if a visible reset/clear action exists. | The resulting state is recorded; persistence and reset behavior are confirmed before being asserted. |

**Final expected state:** Filter options and outcomes documented; no review data is changed. **Cleanup:** Restore default filter state or close the context. **Status:** `NEEDS_VERIFICATION` (filter controls/semantics and data rules have not been established).
**Evidence:** A review sort menu was observed; filter outcomes were not tested. **Automation notes:** Do not infer filter rules or exact counts from labels alone.

### UI-001 — Directions/map control resolves to the selected location

**Functional area:** Location detail / external navigation
**Priority:** P2
**Type:** Positive / data consistency
**Preconditions:** A sampled location detail exposes a directions or map link; external navigation can be inspected without submitting data.
**Test data:** `/nature/ikva-river`; visible directions/map affordance observed on the river detail.
**Initial state:** Anonymous visitor on the location detail page.
**Template:** Location detail. **Sitemap pattern:** `/{category}/{slug}`.
**Related cases:** LOC-001, DATA-001.

| Step | Action | Expected result |
|---|---|---|
| 1 | Open `/nature/ikva-river` and locate the visible directions/map control. | The control is present and its label/href are recorded. |
| 2 | Inspect its destination without interacting with external accounts or submitting data. | Record whether it opens a map/directions destination and the location information represented; exact provider and URL format are not assumed. |
| 3 | Return to the source page. | The source location remains identifiable and browser navigation is usable. |

**Final expected state:** Link target and location correspondence are documented for confirmation. **Cleanup:** Close any external tab/window. **Status:** `NOT_EXECUTED`.
**Evidence:** A directions/map affordance was observed; its destination was not activated during the audit. **Automation notes:** Implemented in `tests/e2e/public-journeys.spec.ts`; it checks the observed directions URL shape only. Keep external navigation isolated; do not assert a map vendor, route format, or coordinates as a product requirement.

## Automated implementation and execution mapping

The status fields in the cases above continue to describe the manual catalog scenarios; this mapping records the automated subset and actual execution. A passing automated subset does not complete every step or acceptance criterion in a broader manual case.

| Case | Automated coverage | Last recorded execution |
|---|---|---|
| NAV-001 | Mobile menu navigation and Back | Chromium: PASS |
| CAT-001 | One additional lake-card batch and unchanged URL | Chromium: PASS |
| LOC-001 | River identity, breadcrumb href, directions control, observed sections, refresh | Chromium: PASS |
| REL-001 | Recommendation href/destination heading and Back | Chromium: PASS |
| NAV-003 | DinoSofia collection link and destination heading | Chromium: PASS |
| ART-001 | Quest-category link opens popup; destination heading and source article remain available | Chromium: PASS |
| DATA-001 | One lake card label/href matches destination heading | Chromium: PASS |
| UI-001 | River directions control has an observed Google Maps directions URL | Chromium: PASS |
| REV-001 | Partial: sort menu opens and exposes the four observed choices; selection/order behavior is not asserted | Chromium: PASS (2026-10-13) |
| ERR-001 | Three representative known routes load directly and after refresh | Chromium: PASS |
| AUTH-002 | Positive login followed by read-only planning-page access; does not implement saved/visited transitions, cleanup, or logout | Chromium: SKIPPED; `APP_EMAIL`/`APP_PASSWORD` were not available to the test process |

Public journeys were executed only in Chromium; Firefox and WebKit were discovered but not run. The authenticated case is an intentionally limited subset of `AUTH-002`, not completion of its state lifecycle. The manual statuses above remain unchanged.
