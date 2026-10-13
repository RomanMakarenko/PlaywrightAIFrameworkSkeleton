# Funtime Functional E2E Audit

**Audit date:** 2026-10-13
**Target:** https://funtime.com.ua/
**Purpose:** Read-only functional reconnaissance and manual E2E test design. This is not an automated test report.

## Scope and method

Inspected public production pages using Playwright MCP and the independently launched Playwright CLI 1.64.0. Browsers were navigated directly and through observed internal links; accessibility snapshots, page titles, visible text, and available console messages were inspected. A responsive viewport of 390×844 was used for the mobile navigation check. No credentials were used, forms were not submitted, and no persistent account/content changes were made. Existing `docs/web/SITEMAP.md` and prior RUNBOOK observations were used as inventory/background; historical observations were not treated as current proof.

**Tools used:** Playwright MCP browser navigation/snapshot/click/console; Playwright CLI navigation/snapshot/console; repository sitemap and prompt. MCP and CLI sessions were treated independently. Search text input was explicitly denied by the browser input permission classifier, so no alternate input method was attempted.

## Inventory and sampling

`SITEMAP.md` describes 93 URLs in `general.xml` and a 40-URL sample from `2026-09.xml`, plus route families; these are inventory figures from that document, not a live crawl. The live audit sampled templates and did not check every sitemap URL. At least 15 distinct representative live page URLs were directly opened in this audit/available session; some are repeated route families, and this count excludes pages known only from historical RUNBOOK evidence. It is not a claim of exhaustive URL coverage.

Page families sampled in the current reconnaissance include home, category/subcategory, place detail (lake, river, country complex), collection detail, article detail, publication list/detail, reviews by type, nearby-by-type, static feedback, login/register/password reset, and sitemap locations. Examples and limits are mapped in [PAGE_TEMPLATE_COVERAGE.md](PAGE_TEMPLATE_COVERAGE.md) and [SITEMAP_TEST_TRACEABILITY.md](SITEMAP_TEST_TRACEABILITY.md).

## Confirmed behavior and navigation

- Desktop header exposes the six main categories, nearby places, collections, user reviews, search entry point, and profile entry point. Footer includes category and information-page links, social links, and an RSS email field/button.
- At 390×844, the mobile menu opened and displayed category and secondary navigation. Selecting “Озера” navigated to `/nature/type/lakes`.
- `/nature/type/lakes` shows a breadcrumb, heading “Озера”, introductory text, a map-related action/link to `/nearby/lakes`, location cards, a visible count (`показано 15 із 172 локацій` before expansion), and “показати ще”. Activating “показати ще” expanded the list and updated the visible count to 30; no URL pagination change was observed during that action. Cards link to place detail URLs.
- `/nature/ikva-river` displayed title “Іква”, directions/map affordance, review area, “Що ще є поруч”, and “Інші річки”. Following the “Дубенський Замок” recommendation navigated to `/architecture/dubenskiy`; browser Back returned to the river detail.
- `/nature/male-domashnye` displayed the “Що ще є поруч” and “Інші озера” blocks. `/relaxation-and-recreation/haiky-rezort` displayed “Що ще є поруч” and “Інші заміські комплекси”. Specific selection rules and consistency across all records remain unverified.
- A collection detail at `/collections/relaxation-and-recreation/parky-z-dynozavrvmy-v-ukrayini` listed eight locations. Following the DinoSofia card reached `/relaxation-and-recreation/dinosofia-park`.
- `/articles/dictionary-of-quest-gamers` contained long-form content, internal links to quest categories, share/comment controls, and a “Вас також зацікавить” insertion area with no visible cards in the inspected snapshot. It is not established whether this was intentional or a transient content state.
- `/publications` exposed pagination; selecting page 2 navigated to `/publications?page=2`. A publication detail at `/publications/podorozh-ukrayinou-na-vykhidni-porady-dlya-simei` displayed its title and structured text including lists/tables.
- `/reviews/about/castles` displayed 7/7 reviews and “Фільтрувати”/“Сортувати”. Opening sort exposed “спочатку найновіші”, “спочатку самі перші”, “спочатку популярні”, and “спочатку перевірені”. Result ordering was not asserted.
- `/nearby/lakes` displayed “Озера поруч”, “Фільтрувати”, and “Визначення геолокації...”; the loading text remained through a 5-second observation. Browser geolocation permission/result was not established, so this is not classified as a defect.
- `/login`, `/register`, and `/password/reset` loaded with visible forms/links. Forms were not submitted. Registration snapshot reported two console errors and four warnings associated with Cloudflare Turnstile logging `NaN`; no challenge bypass was attempted and these messages alone do not prove a functional defect.
- `/feedback` displayed contact/social/RSS information; no main feedback form was visible in the snapshot. RSS submission was not attempted.
- `/pagemap/locations` rendered location-type links grouped under category headings. This is a hierarchical sitemap view, distinct from XML sitemap coverage.
- CLI inspection of `/nature/male-domashnye` returned zero console errors/warnings at the time observed. MCP console inspection on `/nearby/lakes` also returned zero messages at that time. Console observations are route/session-specific, not a site-wide assertion.

## Functional areas: confirmed, unverified, and constrained

| Area | Finding | Status |
|---|---|---|
| Global navigation / breadcrumbs | Header, footer, breadcrumbs and representative internal transitions observed. | `PARTIALLY_VERIFIED` |
| Category catalogs | Lake catalog, card links, count and incremental “показати ще” behavior observed. Other category variants and sorting/filter outcomes incomplete. | `PARTIALLY_VERIFIED` |
| Location details | Lake, river and country-complex examples loaded; related blocks observed. Optional fields/template consistency incomplete. | `PARTIALLY_VERIFIED` |
| Collections | Collection detail with eight items and one item-to-place transition observed. | `PARTIALLY_VERIFIED` |
| Editorial | Article and publication list/detail examples loaded; pagination link worked. | `PARTIALLY_VERIFIED` |
| Reviews | Type review page and sort menu observed; no sort selection/result assertion. | `PARTIALLY_VERIFIED` |
| Nearby/geolocation | Nearby lake page and filter menu observed; location result remained in loading state, permission/device cause unknown. | `NEEDS_VERIFICATION` |
| Search | Search entry point observed, but text entry was denied by browser permission. | `BLOCKED` |
| Authentication | Anonymous login/register/reset screens load; no form submitted and no valid test account supplied for this audit. | `PARTIALLY_VERIFIED` / account journeys `BLOCKED` |
| Saved/visited locations | Authenticated profile routes are documented in `SITEMAP.md` and historical RUNBOOK, but no current authorization/session was used in this audit. Public-page save controls/state transitions not confirmed. | `NEEDS_VERIFICATION` |
| Comparison | No comparison workflow established from this audit. | `NEEDS_VERIFICATION` |
| Forms | UI presence inspected; no submission/validation was triggered. | `NEEDS_VERIFICATION` |
| Gallery/maps/share | Affordances visible on sampled pages; interactions were not broadly executed. | `NEEDS_VERIFICATION` |

## Defects and anomalies

No reproducible functional defect was confirmed. Open questions and observations are recorded as `NEEDS_VERIFICATION` in [FUNCTIONAL_DEFECTS.md](FUNCTIONAL_DEFECTS.md). In particular, the nearby geolocation loading text and empty related-editorial insertion region are not reported as defects without establishing expected behavior and reproducibility.

## Coverage limitations and next steps

- Only representative routes were sampled; URL patterns are not URL-by-URL verified. Sitemap XML counts are sourced from the existing inventory and may have changed.
- Search execution was blocked by tool permission. Do not evade that permission; arrange explicit authorization or test against a controlled environment.
- Account-dependent and state-changing journeys need an authorized non-production test account/environment, data setup, and cleanup plan before execution.
- Browser geolocation permission/device context and nearby result behavior need a permitted controlled test.
- Do not treat page-load success as functional test success. All designed cases remain `NOT_EXECUTED`, `BLOCKED`, or `NEEDS_VERIFICATION`.
- Before automation, confirm requirements for search, review sorting/filtering, nearby geolocation, related-content selection, and safe handling of state-changing actions with product owners or a test environment.

## Deliverables

- [Manual functional test catalog](FUNCTIONAL_TEST_CASES.md)
- [Page-template coverage](PAGE_TEMPLATE_COVERAGE.md)
- [Related-content matrix](RELATED_CONTENT_MATRIX.md)
- [Sitemap-to-test traceability](SITEMAP_TEST_TRACEABILITY.md)
- [Defect and verification log](FUNCTIONAL_DEFECTS.md)
