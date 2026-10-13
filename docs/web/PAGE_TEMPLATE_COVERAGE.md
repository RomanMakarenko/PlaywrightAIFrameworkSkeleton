# Funtime Page-Template Coverage

**Snapshot date:** 2026-10-13. A representative template being inspected does not mean every URL in that route family was checked.

## Template inventory

| Template | Sitemap / route pattern | Representative live URL(s) | Common elements / observed behavior | Related-content behavior | Test cases | Coverage |
|---|---|---|---|---|---|---|
| Home | `/` | `https://funtime.com.ua/` | Main category links, featured places/collections/editorial content, shared header/footer; entry points to nearby, collections and reviews. | Home has featured content; no generic related block rule asserted. | NAV-001, NAV-002 | `PARTIALLY_VERIFIED` |
| Category catalog | `/{category}` | `/nature`, `/relaxation-and-recreation` (representative visits) | Breadcrumb, category content/cards, cross-links. Details may differ by category. | Not treated as place-detail recommendations. | NAV-002 | `PARTIALLY_VERIFIED` |
| Type/subcategory catalog | `/{category}/type/{type}` | `/nature/type/lakes` | Breadcrumb; intro text; heading; map-related link; cards; count; “показати ще”; “Дивіться також”. One load-more action expanded 15 to 30 without URL change. | Catalog cross-links to other types; no detail recommendation rules inferred. | NAV-001, CAT-001, DATA-001 | `VERIFIED` for this sampled lake catalog interaction only; route family otherwise `PARTIALLY_VERIFIED` |
| Place detail — lake | `/{category}/{slug}` | `/nature/male-domashnye` | Place title/type indicator, body content, possible map/contact/review data. | “Що ще є поруч”, “Інші озера” observed. | LOC-001, REL-002, DATA-001 | `PARTIALLY_VERIFIED` |
| Place detail — river | `/{category}/{slug}` | `/nature/ikva-river` | Heading “Іква”, directions/map affordance, review region. | “Що ще є поруч”, “Інші річки”; recommendation to `/architecture/dubenskiy` opened successfully. | LOC-001, NAV-002, REL-001, REL-002 | `PARTIALLY_VERIFIED` |
| Place detail — country complex | `/{category}/{slug}` | `/relaxation-and-recreation/haiky-rezort` | Place detail and contact/content regions vary by record. | “Що ще є поруч”, “Інші заміські комплекси” observed. | LOC-001, REL-002 | `PARTIALLY_VERIFIED` |
| Collection list/detail | `/collections`, `/collections/{category}`, `/collections/{category}/{slug}` | `/collections/relaxation-and-recreation/parky-z-dynozavrvmy-v-ukrayini` | Detail showed eight item cards; one DinoSofia item opened its location route. | List membership is not a place-detail related-content block. | NAV-003, DATA-001 | `PARTIALLY_VERIFIED` |
| Nearby by type | `/nearby`, `/nearby/{type}` | `/nearby/lakes` | Heading “Озера поруч”, filter action, geolocation status. | Nearby list itself is location discovery. | NEAR-001 | `NEEDS_VERIFICATION`: loading state persisted 5 seconds; permission/context unknown |
| Reviews by type | `/reviews`, `/reviews/about/{type}` | `/reviews/about/castles` | 7/7 shown at audit time, filter and sort controls; sort menu choices observed. | No related-content rule inferred. | REV-001 | `PARTIALLY_VERIFIED` |
| Article detail | `/articles/{slug}` | `/articles/dictionary-of-quest-gamers` | Long-form body, internal links, share/comment controls; “Вас також зацікавить” area. | Related editorial area had no visible cards in snapshot; intentionality unknown. | ART-001 | `PARTIALLY_VERIFIED` |
| Publication list/detail | `/publications`, `/publications/{slug}` | `/publications`; `/publications/podorozh-ukrayinou-na-vykhidni-porady-dlya-simei` | Pagination link navigated to `?page=2`; detail contained title, sections, lists and tables. | Not treated as location recommendations. | ERR-001 | `PARTIALLY_VERIFIED` |
| Static/contact information | `/about`, `/feedback`, `/interesting-links`, `/reviews-remove`, `/user-agreement`, `/disclaimer` | `/feedback` | Feedback page showed contact/social/RSS information; no main form visible. Footer RSS field/button repeated. | Not applicable. | FORM-001 | `PARTIALLY_VERIFIED` for `/feedback`; other pages only inventoried |
| Authentication screens | `/login`, `/register`, `/password/reset` | all three opened | Login fields, register fields/terms/Google sign-in, reset email field. No form submission. | Not applicable. | AUTH-001, AUTH-002 | `PARTIALLY_VERIFIED`; stateful journeys blocked |
| Sitemap UI | `/pagemap`, `/pagemap/locations`, `/pagemap/collections` | `/pagemap/locations` | Hierarchical location-type links grouped by category. Distinct from XML sitemap. | Not applicable. | ERR-001 | `PARTIALLY_VERIFIED` |
| Profile/account lists | `/profile`, `/profile/planning`, `/profile/visited`, `/profile/reviews`, `/profile/reviews/replies`; public user routes `/users/{id}` | Current session not accessed | Existing sitemap and historical RUNBOOK record prior authorized inspection; this audit does not establish current behavior or test-data state. | Not applicable. | AUTH-002 | `BLOCKED` for current execution without explicit authorized account/environment |

## Common versus optional content

- **Observed shared shell:** desktop navigation, mobile menu at a narrow viewport, footer navigation/social links, RSS email field/button, and legal footer text. Exact visibility/layout varies by viewport.
- **Observed catalog-specific:** breadcrumb, catalog heading, intro text, card list, location count, load-more action, and cross-links. Do not require the same controls or counts on every category until checked.
- **Observed place-detail-specific:** heading/type, optional contact/map/directions information, review area on the river example, and related blocks. Contacts and content sections can vary by place; missing optional fields are not automatically defects.
- **Observed editorial-specific:** article body/internal links/comments/share controls; the related-editorial region may have no cards in the captured page.
- **No mandatory section order has been established across the entire site.**

## Coverage gaps

1. The six main categories and 24 type subroutes from the sitemap have not all been checked individually. The live sample does not establish all category-specific filters, sorting, or list behavior.
2. Individual location and collection slugs are not exhaustively crawled; sitemap samples are not proof of availability.
3. Search entry behavior and result matching remain blocked by browser input permission.
4. Nearby geolocation result/empty/error behavior needs a controlled permission/device context.
5. Login validation, successful login/logout, saved/visited state transitions, and profile persistence require an authorized test account and cleanup path.
6. Review sorting/filter results were not checked; only the menu and options were observed.
7. Maps, galleries, social sharing, RSS and contact forms were not submitted or comprehensively activated.
8. `/pr` is intentionally excluded by the existing sitemap/robots note; other lower-priority legal pages remain inventoried but not individually sampled here.

## Representative test mapping

Use [FUNCTIONAL_TEST_CASES.md](FUNCTIONAL_TEST_CASES.md) for complete cases and [SITEMAP_TEST_TRACEABILITY.md](SITEMAP_TEST_TRACEABILITY.md) for route-family status. Current case coverage: mobile navigation (NAV-001), breadcrumb (NAV-002), category load-more (CAT-001), place detail (LOC-001), related recommendations (REL-001/002), collection-to-place (NAV-003), article internal link (ART-001), search (SRCH-001), auth/state (AUTH-001/002), nearby (NEAR-001), reviews (REV-001), forms (FORM-001), direct-route refresh (ERR-001), and card consistency (DATA-001).
