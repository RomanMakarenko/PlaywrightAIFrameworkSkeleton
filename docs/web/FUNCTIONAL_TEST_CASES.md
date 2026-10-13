# Functional E2E Test Case Catalog — Funtime

**Designed:** 2026-10-13. Manual test specifications only; none were executed as a test suite. Production cases involving submissions or persistent changes require an approved test environment/account and rollback plan.

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
**Evidence:** Article content and internal category links observed; this specific link activation was not recorded. **Automation notes:** Pin the actual href when converting to automation; no assumed link target is supplied here.

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
