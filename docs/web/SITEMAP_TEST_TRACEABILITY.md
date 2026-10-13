# Sitemap-to-Test Traceability — Funtime

**Audit date:** 2026-10-13. Route patterns come from `SITEMAP.md`; representative URLs are samples, not a crawl. Existing sitemap XML counts (93 general URLs and 40 URLs sampled from `2026-09.xml`) are inventory facts recorded in that file, not counts freshly re-fetched here.

## Status definitions

- `VERIFIED`: the specific representative page/behavior in the row was directly observed. Does not imply every URL in the route pattern is verified.
- `PARTIALLY_VERIFIED`: one or more representative pages/elements were inspected; significant behavior or sibling URLs remain unchecked.
- `NOT_VERIFIED`: no current live inspection for the row in this audit.
- `BLOCKED`: execution was prevented by missing authorization, test data, or an explicit tool permission boundary.
- `NOT_APPLICABLE`: no meaningful functional test applies to the route pattern.

## Traceability matrix

| Sitemap URL / pattern | Page type | Functional areas | Case IDs | Investigation status | Coverage status | Known issues / unverified behavior |
|---|---|---|---|---|---|---|
| `/` | Home | Navigation, responsive entry points | NAV-001 | `VERIFIED` representative page | `PARTIALLY_VERIFIED` | No exhaustive links/cards audit. |
| `/{category}` (6 categories) | Category | Category navigation, breadcrumbs | NAV-002 | `PARTIALLY_VERIFIED` | `PARTIALLY_VERIFIED` | `/nature` and category examples observed; six category pages not individually checked. |
| `/{category}/type/{type}` (24 patterns in `general.xml`) | Type catalog | Navigation, list/load-more, cards, cross-links | NAV-001, CAT-001, DATA-001 | `/nature/type/lakes` inspected; mobile route reached; load-more expanded once | `PARTIALLY_VERIFIED` at family level; `VERIFIED` only for observed lake load-more action | Other 23 patterns, filters, sort, result consistency, later batches and terminal state not checked. |
| `/{category}/{slug}` | Place detail | Details, map/contact/reviews, related content, card links | LOC-001, NAV-002, REL-001, REL-002, DATA-001 | Lake `/nature/male-domashnye`, river `/nature/ikva-river`, country complex `/relaxation-and-recreation/haiky-rezort`; other examples in sitemap/historical notes | `PARTIALLY_VERIFIED` | No slug-by-slug crawl. Optional content varies. Recommendation selection rules broadly unknown. |
| `/collections` | Collection list | Navigation | NAV-003 | Historical sitemap/runbook inventory; not rechecked in this audit | `NOT_VERIFIED` current | Current list contents and filters not checked. |
| `/collections/{category}` | Category collection list | Collection navigation | NAV-003 | Inventory only | `NOT_VERIFIED` current | Not checked individually. |
| `/collections/{category}/{slug}` | Collection detail | Item navigation, destination consistency | NAV-003, DATA-001 | Dino-themed parks collection observed | `PARTIALLY_VERIFIED` | Eight cards observed; one item transition checked; count/order can change. |
| `/nearby` | Nearby base | Geolocation, nearby navigation | NEAR-001 | Inventory from sitemap; not separately inspected in current audit | `NOT_VERIFIED` | Base nearby behavior not checked. |
| `/nearby/{type}` (24 patterns in `general.xml`) | Nearby by type | Geolocation, filtering, result navigation | NEAR-001 | `/nearby/lakes` observed; filter menu opened | `NEEDS_VERIFICATION` / `PARTIALLY_VERIFIED` | “Визначення геолокації...” persisted for 5 seconds; permission/device context unknown. Other 23 patterns not checked. |
| `/reviews` | Review index | Review navigation | REV-001 | Existing inventory/historical evidence; not directly rechecked here | `NOT_VERIFIED` current | Current page behavior not checked. |
| `/reviews/about/{type}` (24 patterns in `general.xml`) | Reviews by type | Filter/sort, list state | REV-001 | `/reviews/about/castles` inspected; sort menu opened | `PARTIALLY_VERIFIED` | Only one type sample; sorting/filter outcomes and remaining patterns not verified. |
| `/articles` | Article index | Editorial navigation | ART-001 | Existing inventory/historical evidence; not rechecked here | `NOT_VERIFIED` current | Current list state not checked. |
| `/articles/{slug}` | Article detail | Internal links, comments/share, related editorial | ART-001 | `/articles/dictionary-of-quest-gamers` inspected | `PARTIALLY_VERIFIED` | Related insertion region had no visible cards; expected behavior unknown. Forms/comments not submitted. |
| `/publications` | Publication index | Pagination/navigation | ERR-001 | Page 1 and `?page=2` navigation observed | `PARTIALLY_VERIFIED` | Pagination links worked by URL navigation; data/order correctness not established. |
| `/publications/{slug}` | Publication detail | Content rendering, internal links | ERR-001 | `/publications/podorozh-ukrayinou-na-vykhidni-porady-dlya-simei` inspected | `PARTIALLY_VERIFIED` | Only representative detail; all slug routes unchecked. |
| `/press-releases` | Editorial index | Navigation | — | Historical inventory; not rechecked here | `NOT_VERIFIED` current | No current inspection. |
| `/pagemap` | Sitemap UI | Site map navigation | ERR-001 | Existing inventory; no direct current detail in this audit | `NOT_VERIFIED` current | Main page not rechecked. |
| `/pagemap/locations` | Sitemap UI — places | Category/type navigation | ERR-001 | Opened with Playwright CLI; category-grouped links observed | `PARTIALLY_VERIFIED` | Individual links not exhaustively opened. |
| `/pagemap/locations/{type}` | Sitemap UI — type listing | Route discovery/navigation | ERR-001 | Inventory only | `NOT_VERIFIED` | Current child pages not checked individually. |
| `/pagemap/collections` | Sitemap UI — collections | Route discovery/navigation | — | Existing inventory; not rechecked in current audit | `NOT_VERIFIED` current | Individual links not checked. |
| `/about`, `/interesting-links`, `/reviews-remove`, `/user-agreement`, `/disclaimer` | Static/help/legal | Footer navigation/content | — | Listed in sitemap from footer; not all separately requested this audit | `NOT_VERIFIED` current | Links' current availability/content unverified. |
| `/feedback` | Contact/social/RSS info | Navigation, form presence | FORM-001 | Opened; social/contact/RSS info observed; no main feedback form visible | `PARTIALLY_VERIFIED` | RSS not submitted; absence of a main form is only snapshot observation. |
| `/login` | Login | Authentication/validation | AUTH-001, AUTH-002 | Anonymous login screen loaded | `PARTIALLY_VERIFIED`; login behavior `BLOCKED` | No submission, credentials or authorized test account. |
| `/register` | Registration | Authentication/forms | AUTH-001 | Registration fields/terms/Google sign-in observed | `PARTIALLY_VERIFIED`; registration journey `BLOCKED` | Form not submitted. Cloudflare Turnstile console messages observed; not a confirmed defect. |
| `/password/reset` | Password reset | Authentication/forms | AUTH-001 | Reset email field and action observed | `PARTIALLY_VERIFIED`; reset journey `BLOCKED` | No request submitted. |
| `/profile`, `/profile/planning`, `/profile/visited`, `/profile/reviews`, `/profile/reviews/replies` | Authenticated profile | Session, saved/visited, reviews | AUTH-002 | Historical RUNBOOK/SITEMAP evidence only; not inspected with a current session | `BLOCKED` current execution | Need authorized non-production account and safe cleanup procedure. |
| `/users/{id}` and subroutes | Public user profile | Profile/list visibility | AUTH-002 | Dynamic family in sitemap; historical observations are not current proof | `NOT_VERIFIED` current | Dynamic user ID/data; privacy and access requirements unverified. |
| `/pr` and `/pr/*` | Advertising / owner info | External/business flow | — | Existing sitemap says `/pr/*` disallowed by robots; not explored by task | `NOT_APPLICABLE` to this audit sample | Intentionally excluded. No assertion about live route behavior. |
| `/bnnr/*` | Banner routes | Not in user journeys | — | Existing sitemap notes robots disallow | `NOT_APPLICABLE` | Not explored. |
| Search URL/results (not present as established sitemap pattern) | Search | Search, result matching | SRCH-001 | Search entry point seen, input action denied | `BLOCKED` | No query entered; route/query behavior unknown. |

## Sitemap inventory coverage statement

`SITEMAP.md` inventories route families and selected sitemap files; it explicitly states that the monthly sitemap files and every individual address were not reviewed. This audit adds representative live observations but does not re-fetch or verify all sitemap entries. Therefore, no entire dynamic pattern or complete sitemap is marked `VERIFIED`.

## Test case index

- `NAV-001` mobile menu to lakes; `NAV-002` breadcrumb; `NAV-003` collection item navigation.
- `CAT-001` catalog load-more; `LOC-001` place detail; `REL-001` recommendation navigation; `REL-002` cross-type recommendation consistency.
- `ART-001` article internal link; `SRCH-001` search (blocked).
- `AUTH-001` login validation; `AUTH-002` authenticated state lifecycle (blocked).
- `NEAR-001` nearby/geolocation; `REV-001` review sorting; `FORM-001` RSS validation (blocked).
- `ERR-001` direct route/refresh; `DATA-001` card-label/destination consistency.
