# TASK: Functional E2E Audit and Test Case Design for Funtime

## 1. Role and objective

Act as a Senior QA Automation Engineer, Test Analyst, and exploratory testing specialist with extensive experience in web applications, content-heavy websites, functional testing, and Playwright automation.

Your task is to perform a thorough functional audit of the production website:

https://funtime.com.ua/

Use the available Playwright MCP and Playwright CLI browser automation tools to explore the actual website, inspect real user journeys, identify functional requirements, and prepare a comprehensive, prioritized catalog of manual-executable functional E2E test cases.

**IMPORTANT: This is the test analysis and test design phase only. Do not implement automated tests yet.**

The final output must contain detailed test cases with numbered execution steps and expected results for each step. These test cases will subsequently be used as the specification for implementing automated tests in Playwright + TypeScript.

## 2. Project context

Project root:

`/Users/romanmakarenko/Documents/code/QA/JS-TS/PlaywrightAIFrameworkSkeleton`

Existing sitemap:

`/Users/romanmakarenko/Documents/code/QA/JS-TS/PlaywrightAIFrameworkSkeleton/docs/web/SITEMAP.md`

Website under test:

`https://funtime.com.ua/`

All new documentation must be created inside the existing project's `docs/web/` directory.

Before doing anything else, inspect the project structure and read the entire sitemap file.

Check whether the project already contains:
- Existing QA documentation and test plans.
- Requirements, user stories, or functional specifications.
- Existing test case templates.
- Playwright MCP and Playwright CLI configuration or skills.
- Existing browser automation conventions.
- Any existing authentication or test-data documentation.

Reuse existing conventions when appropriate. Do not overwrite existing files or modify the framework implementation.

## 3. Browser investigation requirements

Use both Playwright MCP and Playwright CLI if both are available and operational.

First, inspect the installed tools and their documented capabilities. Determine which browser sessions are available and how they should be used.

### Playwright MCP

Use MCP for exploratory browser interaction, examining accessibility snapshots, inspecting page structure, navigating through real user journeys, and investigating interactive elements.

### Playwright CLI

Use CLI for efficient browser exploration, navigation, snapshots, screenshots, and repeatable verification of observed behavior.

Do not assume that MCP and CLI share the same browser session, cookies, or authentication state. Verify session availability and state explicitly.

Do not confuse Playwright CLI with Playwright Test. At this stage, use browser exploration capabilities, not automated test implementation.

If one tool is unavailable, continue with the available tool and document the limitation.

### Website investigation rules

1. Open the website and explore its actual interface.
2. Read the sitemap and compare it with the pages discovered in the browser.
3. Identify page templates, content types, navigation structures, interactive elements, and user workflows.
4. Follow actual links and interact with controls to establish their real behavior.
5. Inspect desktop navigation and responsive/mobile navigation where practical.
6. Inspect visible validation messages, loading states, empty states, error messages, and confirmation feedback where accessible.
7. Check relevant console errors and failed network requests when the available tools support this.
8. Use real observed URLs, labels, and page content in the documentation.
9. Do not invent features, UI elements, expected behavior, test accounts, API endpoints, or business rules.
10. If a feature cannot be verified, label it `NEEDS_VERIFICATION` and explain what remains unknown.
11. Do not submit destructive actions, contact real people, make purchases, or alter production content.
12. Do not attempt to bypass authentication, CAPTCHAs, rate limits, or access controls.
13. Never include passwords, session tokens, cookies, or other secrets in the generated documentation.

Production data must be treated as real. Prefer read-only exploration and reversible actions. Do not create persistent production data unless explicitly authorized and necessary.

## 4. Sitemap and coverage analysis

Read:

`docs/web/SITEMAP.md`

Use it as the initial inventory of the website, not as proof that every listed URL or feature works.

For each sitemap entry or meaningful URL pattern, determine where practical:

- Whether the page is accessible.
- Its actual page type.
- Its main purpose.
- Its parent category or navigation path.
- Its outgoing internal links.
- Its breadcrumbs, if present.
- Its content sections and related-content blocks.
- Its important interactive controls.
- Whether it belongs to a reusable page template.
- Whether it is covered by a planned test case.
- Any discrepancies between the sitemap and the live website.

Do not blindly open every URL if the sitemap contains thousands of entries. Group URLs by page type, route pattern, category, and template. Inspect representative examples from every meaningful group, including unusual or edge-case entries.

Build a traceability matrix linking:
- Sitemap entries or URL patterns.
- Page templates.
- Functional features.
- Test case IDs.
- Coverage status.

Identify missing URLs, unexpected redirects, broken internal links, inaccessible pages, and discrepancies where they can be established safely.

Do not claim complete sitemap coverage unless every relevant entry has actually been checked.

## 5. Functional areas to investigate

Explore all relevant areas below. Treat this list as an investigation checklist, not as confirmation that every feature exists.

### 5.1 Global navigation

Investigate:
- Header and logo navigation.
- Main navigation and dropdown menus.
- Desktop and mobile navigation.
- Footer navigation.
- Breadcrumb navigation.
- Back and forward browser navigation.
- Internal links and cross-page transitions.
- Direct navigation to URLs.
- Browser refresh on nested pages.
- Search-related navigation.
- Category and subcategory navigation.
- Links between articles and locations.
- Pagination, load-more controls, or infinite scrolling, if present.
- Behavior when a destination page is missing or unavailable.

Verify that links lead to the expected destinations and that navigation does not unexpectedly lose relevant application state.

### 5.2 Authentication and account management

First establish which account features actually exist.

Investigate, where available:
- Registration.
- Login.
- Logout.
- Invalid credentials.
- Empty required fields.
- Input validation.
- Password visibility controls.
- Forgot-password flow.
- Password-reset flow.
- Email verification.
- Social login.
- Protected pages or actions.
- Session persistence after refresh.
- Session persistence across navigation.
- Behavior after logout.
- Access to account profile and user-specific pages.
- Authentication-required prompts when an anonymous visitor attempts a protected action.

Do not invent credentials or create accounts on production without authorization.

If authentication requires an existing account, document the required account and test-data prerequisites. If no authorized test account is available, prepare the test cases but mark execution as blocked.

Distinguish verified functionality from inferred behavior.

### 5.3 Search

Investigate the real search implementation and available search entry points.

Cover applicable scenarios:
- Search by a complete location name.
- Search by a partial name.
- Search by a unique keyword.
- Search by category or location type.
- Search with multiple words.
- Search with uppercase and lowercase letters.
- Search with leading and trailing spaces.
- Search with Ukrainian characters.
- Search with punctuation or special characters.
- Empty search submission.
- No-results state.
- Multiple results.
- Opening a result from the results list.
- Search behavior from different page types.
- Search filters, suggestions, autocomplete, or sorting, if present.
- Search results consistency with the selected query.
- Search URL behavior, if the query is reflected in the URL.

Record which behaviors actually exist. Do not require filters or autocomplete if the website does not implement them.

### 5.4 Location favorites and visit tracking

Investigate the actual controls for saving locations and recording visits.

Specifically verify whether the site supports:
- Adding a location to a wishlist or a list of places to visit.
- Removing a location from that list.
- Marking a location as visited.
- Removing a visited status.
- Viewing saved locations.
- Viewing visited locations.
- Moving a location between these states.
- Preventing or handling duplicates.
- Persistence after refresh.
- Persistence after navigating away and returning.
- Persistence after logout and login, where safely testable.
- Authentication requirements for these operations.
- Appropriate feedback after each action.
- Consistency between a location page, its cards, and the user's lists.

Test state transitions such as:

`Not saved → Want to visit → Removed`

`Not visited → Visited → Unmarked as visited`

`Want to visit → Visited`

Use only state transitions that the real UI supports.

If saving a location and marking it as visited are mutually exclusive or have other business rules, establish those rules through observation or authorized requirements rather than assumptions.

### 5.5 Location comparison

Determine whether the website supports comparing locations.

If it does, investigate:
- Adding a location to comparison.
- Removing a location from comparison.
- Comparing two locations.
- Comparing multiple locations up to the actual supported limit.
- Duplicate selection.
- Empty comparison state.
- Comparison of locations of the same type.
- Comparison of locations of different types, if supported.
- Comparison data accuracy.
- Navigation from comparison results to individual location pages.
- Persistence of comparison selections.
- Behavior when the maximum number of locations is reached.
- Behavior when a location is removed or becomes unavailable.

Verify that the displayed information belongs to the correct locations and that missing attributes are handled appropriately.

If comparison is not found, document the investigation evidence and do not invent a comparison interface.

### 5.6 Category pages and category navigation

Investigate:
- Main category pages.
- Subcategory pages.
- Category cards and links.
- Lists of locations within categories.
- Category-specific filters and sorting.
- Pagination or load-more behavior.
- Empty categories or empty search/filter results.
- Transitions from category pages to location details.
- Transitions between parent and child categories.
- Breadcrumb correctness.
- Category URLs and browser history.
- Consistency between category titles, selected filters, and displayed locations.

Cover the different types of categories discovered in the sitemap and browser.

### 5.7 Location and article detail pages

Inspect representative examples of every meaningful page template.

Examples may include:
- Country complexes.
- Lakes.
- Rivers.
- Waterfalls.
- Historical monuments and archaeological sites.
- Tourist attractions.
- Other location types identified on the website.
- Editorial articles, guides, collections, and destination lists.

Do not assume that all these page types exist; confirm them against the sitemap and the actual website.

For every applicable template, inspect:
- Page title and main heading.
- Main image or gallery.
- Introductory description.
- Main content sections.
- Tables and structured information.
- Coordinates and map links, where applicable.
- Contact information and external links, where applicable.
- Breadcrumbs.
- Category or type indicators.
- Related-content sections.
- Location-specific actions.
- Social sharing or other controls, if present.
- Internal navigation and links to other pages.

Check that the page loads correctly and that the expected content blocks appear in the appropriate order where the template defines such an order.

Do not treat optional content as mandatory if the website legitimately omits it for certain locations.

## 6. Critical related-content validation

This is a high-priority investigation area.

The website may display related-content blocks with titles such as:

- `Що ще є поруч`
- `Інші заміські комплекси`
- Other category-specific or location-specific recommendations.

Discover the actual titles and behavior of these blocks by inspecting real pages.

### 6.1 Identify the related-content rules

For each page template and location type, determine:

1. Which related-content blocks are displayed.
2. Whether the block is mandatory, optional, or conditional.
3. What determines which items appear.
4. Whether items are selected by geographic proximity, category, location type, tags, or another observable relationship.
5. Whether the current page is incorrectly included in its own recommendations.
6. Whether duplicate items appear.
7. Whether cards contain valid titles, images, and destination links.
8. Whether the destination URL matches the displayed location.
9. Whether the destination page loads successfully.
10. How the block behaves when no related items are available.
11. Whether the block is consistent across locations using the same template.
12. Whether the block differs appropriately between different location types.

Do not assume the selection algorithm if the implementation cannot be inspected or its behavior cannot be established. Record the observed behavior and any unresolved business rules.

### 6.2 Build a page-template and related-content matrix

Create a matrix with these columns:

- Page template.
- Representative page URL.
- Location type.
- Expected related-content block.
- Observed related-content block.
- Expected number of items, if defined.
- Link destination validation.
- Data consistency validation.
- Test case IDs.
- Coverage status.
- Notes and uncertainties.

For example, verify whether a country-complex page displays other country complexes and whether a lake page displays recommendations appropriate to lakes or nearby attractions, based on the actual website rules.

These are examples of questions to investigate, not predefined expected results.

### 6.3 Related-content test scenarios

Prepare test cases for applicable scenarios:
- Correct block title for the current page template.
- Correct block visibility.
- Correct type of recommended content.
- Valid recommendation links.
- Correct titles and images.
- No self-recommendation.
- No unintended duplicates.
- Correct behavior for pages with few related items.
- Correct behavior when no related items exist.
- Navigation between related locations.
- Consistency across multiple pages using the same template.
- Correct behavior after navigating back from a related location.

If several page types share the same template, use representative data and explicitly identify which test cases should be repeated for each relevant template.

## 7. Article-to-article and cross-content navigation

Investigate all relevant cross-content transitions.

Examples:
- Editorial article → location page.
- Editorial article → another article.
- Location page → related location.
- Location page → category page.
- Category page → location page.
- Category page → subcategory.
- Breadcrumb → parent page.
- Related-content card → destination page.
- Internal text link → referenced location or article.
- Guide or collection → individual items in the collection.

For each discovered link type, verify:
- The link is visible when expected.
- The link has an appropriate label.
- The destination is correct.
- The destination loads successfully.
- The link does not unexpectedly point to an external domain.
- The browser URL changes appropriately.
- Back navigation returns to the previous page.
- The destination content corresponds to the linked item.

Prioritize broken links, incorrect destinations, navigation loops, and mismatched content.

## 8. Additional functional checks

Investigate the following wherever applicable:

- External links and their destinations.
- Maps and coordinate links.
- Gallery and image interactions.
- Embedded media.
- Share buttons.
- Cookie consent and consent persistence.
- Forms and their validation.
- Pagination and result counts.
- Filters and sorting.
- Responsive navigation and key interactions.
- Empty states and error states.
- Browser refresh and direct URL access.
- Duplicate content cards.
- Incorrect or missing page titles.
- Missing main content.
- Broken internal links.
- Unexpected redirects.
- Links to unavailable pages.
- Incorrect content type displayed in recommendation blocks.

Include only scenarios supported by the actual website.

Do not expand this task into a full performance, security, penetration, or visual-regression audit. Note significant issues that are encountered incidentally, but keep the primary focus on functional E2E behavior.

## 9. Test case design standard

Every test case must be independently understandable and executable by a manual tester.

Assign stable IDs using these prefixes:

- `AUTH` — authentication and account management.
- `NAV` — navigation and internal links.
- `SRCH` — search.
- `WISH` — wishlist and visit tracking.
- `COMP` — location comparison.
- `CAT` — category navigation.
- `LOC` — location detail pages.
- `ART` — editorial articles.
- `REL` — related-content blocks.
- `FORM` — forms and input validation.
- `RESP` — responsive functional behavior.
- `DATA` — content and data consistency.
- `ERR` — error and empty states.

Use sequential IDs, for example `SRCH-001`, `REL-001`, and `AUTH-001`.

### Required fields

Each test case must contain:

1. Test Case ID.
2. Test Case Title.
3. Functional Area.
4. Priority: P0, P1, P2, or P3.
5. Test Type: positive, negative, boundary, state transition, navigation, data consistency, or other appropriate type.
6. Preconditions.
7. Required Test Data.
8. Initial State.
9. Numbered Test Steps.
10. Expected Result for every individual step.
11. Final Expected State.
12. Cleanup or rollback steps, if necessary.
13. Applicable page template or location type.
14. Related sitemap URL or URL pattern.
15. Related test case IDs, if applicable.
16. Execution Status: `NOT_EXECUTED`, `BLOCKED`, or `NEEDS_VERIFICATION`.
17. Evidence or investigation notes.
18. Automation Notes.

### Test case quality requirements

- Use concrete, numbered actions.
- Include an expected result for every action.
- Specify actual page names, URLs, controls, and test data when observed.
- Avoid vague instructions such as "check that everything works."
- Avoid combining unrelated scenarios into one oversized test case.
- Separate positive, negative, and boundary scenarios when they represent distinct behavior.
- Use parameterized test scenarios in the documentation when the same behavior must be checked across multiple templates or representative URLs.
- Make prerequisites and dependencies explicit.
- Identify which tests require an authenticated user.
- Distinguish a verified expected result from a proposed requirement.
- Do not turn an unverified assumption into a definitive acceptance criterion.
- Avoid redundant tests that exercise exactly the same behavior without adding coverage.

### Example format

**Test Case ID:** `WISH-001`

**Title:** Add a location to the want-to-visit list.

**Priority:** P1

**Type:** Positive / State transition

**Preconditions:**
- The selected location page is accessible.
- An authorized test account is available if authentication is required.
- The location is not already saved.

**Test Data:**
- Location URL: an actual URL discovered during the investigation.
- Account: an authorized test account, if required.

**Steps:**

| Step | Action | Expected Result |
|---|---|---|
| 1 | Open the selected location page. | The correct location page loads and its title matches the selected location. |
| 2 | Locate the actual want-to-visit control. | The control is visible and its current state indicates that the location is not saved. |
| 3 | Activate the control. | The observed application behavior matches the documented result for adding a location. |
| 4 | Inspect the control state and any confirmation feedback. | The saved state is clearly indicated, if the application provides such feedback. |
| 5 | Open the user's saved-locations page, if available. | The selected location appears in the appropriate list. |
| 6 | Refresh the page and verify the state again. | The state persists according to the application's verified persistence rules. |

**Final Expected State:** The location is saved exactly once in the appropriate list.

**Automation Notes:** Identify reliable user-facing locators and the appropriate test data setup and cleanup strategy during the later automation-design phase.

This is an illustrative template. Replace conditional and generic expectations with observed, verified application behavior before marking the test case ready for automation.

## 10. Prioritization

Use these priority definitions:

- **P0 — Critical:** Core functionality is unavailable, or a critical user journey is blocked.
- **P1 — High:** Important user workflows, authentication, search, saving locations, comparison, or core navigation fail.
- **P2 — Medium:** Important secondary functionality, content consistency, related-content behavior, or less common states fail.
- **P3 — Low:** Minor functional edge cases with limited impact.

Prioritize tests based on actual user impact and business importance, not merely on how easy they are to automate.

Prepare an initial smoke-test subset that covers the most critical verified user journeys.

## 11. Test data strategy

Create a reusable test-data inventory based on actual website content.

Include representative examples of:
- Different location types.
- Different category levels.
- Pages with rich content.
- Pages with optional or missing content.
- Pages with related-content blocks.
- Pages with multiple internal links.
- Pages that are accessible without authentication.
- Pages or actions that require authentication.

Record the actual URL and the reason each page was selected.

For authentication scenarios, document the type of account and access required without recording credentials.

For state-changing scenarios, define safe test-data preparation and cleanup procedures.

Do not assume that production accounts, registration, or deletion are safe to use.

## 12. Required documentation deliverables

Create the following files under:

`/Users/romanmakarenko/Documents/code/QA/JS-TS/PlaywrightAIFrameworkSkeleton/docs/web/`

### File 1: `FUNCTIONAL_AUDIT.md`

Include:
- Audit scope.
- Investigation methodology.
- Tools actually used.
- Sitemap analysis.
- Discovered page templates.
- Functional features confirmed.
- Functional features not found or not verified.
- Key navigation paths.
- Observed defects and anomalies.
- Access limitations.
- Coverage limitations.
- Recommendations for further investigation.

Separate confirmed findings from hypotheses.

### File 2: `FUNCTIONAL_TEST_CASES.md`

Include the complete functional E2E test case catalog.

Organize test cases by functional area, then priority.

Each test case must follow the required format and contain numbered steps with an expected result for every step.

Include enough detail for another QA engineer to execute each case without repeating the exploratory investigation.

### File 3: `PAGE_TEMPLATE_COVERAGE.md`

Include:
- The page-template inventory.
- Representative URLs.
- Sitemap-to-template mapping.
- Common functional elements.
- Template-specific behavior.
- Template-specific related-content blocks.
- Mandatory versus optional content sections, where verified.
- Test cases covering each template.
- Coverage gaps.

### File 4: `RELATED_CONTENT_MATRIX.md`

Include the detailed matrix for:
- `Що ще є поруч`.
- `Інші заміські комплекси`.
- Other related-content blocks actually found.
- Content types displayed in each block.
- Representative source pages.
- Destination URLs.
- Link and content validation.
- Missing or duplicated recommendations.
- Test case IDs.
- Unverified business rules.

### File 5: `SITEMAP_TEST_TRACEABILITY.md`

Create a traceability matrix linking:
- Sitemap URL or URL pattern.
- Page type.
- Functional area.
- Applicable test case IDs.
- Investigation status.
- Coverage status.
- Known issues.
- Unverified behavior.

Use explicit statuses such as:
- `VERIFIED`
- `PARTIALLY_VERIFIED`
- `NOT_VERIFIED`
- `BLOCKED`
- `NOT_APPLICABLE`

Do not mark an entire URL pattern as verified solely because one representative page was checked. Clearly distinguish representative template coverage from URL-by-URL validation.

### File 6: `FUNCTIONAL_DEFECTS.md`

Record reproducible functional defects discovered during the investigation.

For each defect include:
- Defect ID.
- Short title.
- Severity.
- Affected URL.
- Preconditions.
- Reproduction steps.
- Expected result.
- Actual result.
- Evidence, if available.
- Reproducibility.
- Related test case ID.

Only record issues supported by direct observation. Keep suspected defects in a separate subsection marked `NEEDS_VERIFICATION`.

Do not modify the production website or attempt to fix defects.

## 13. Evidence and reliability

For significant findings, retain the relevant evidence where practical:
- Exact URLs.
- Observed control labels.
- Accessibility snapshots.
- Screenshots.
- Navigation outcomes.
- Relevant console errors or failed requests.

Store new evidence only in an appropriate project documentation/evidence directory if this is consistent with the existing project structure.

Avoid storing credentials, authentication tokens, or personal information in screenshots or logs.

Do not fabricate screenshots, URLs, test results, or evidence.

## 14. Working strategy

Work in the following phases.

### Phase A — Project discovery

- Inspect the project structure.
- Read the complete sitemap.
- Review existing QA documentation.
- Check MCP and CLI availability.
- Identify safe browser access and authentication constraints.

### Phase B — Website reconnaissance

- Inspect the home page.
- Explore the global navigation.
- Explore category hierarchies.
- Inspect representative pages for each discovered template.
- Investigate search and account functionality.
- Investigate saved locations, visited locations, and comparison.
- Investigate related-content blocks and cross-content links.
- Capture evidence and record unknowns.

### Phase C — Coverage modeling

- Build the page-template inventory.
- Map sitemap entries and URL patterns.
- Identify reusable workflows.
- Identify test-data requirements.
- Map functional areas to test cases.
- Identify untested areas and blocked scenarios.

### Phase D — Test case design

- Write concrete functional E2E test cases.
- Include positive, negative, boundary, state-transition, navigation, and data-consistency scenarios.
- Add detailed steps and expected results.
- Prioritize the test cases.
- Remove unnecessary duplication.
- Include relevant template variations.

### Phase E — Documentation validation

- Verify that all six documentation files exist.
- Check that test case IDs are unique.
- Check that all referenced test case IDs exist.
- Check that each test case has numbered steps and an expected result for every step.
- Check that representative URLs actually came from observed pages or the sitemap.
- Check that the related-content matrix is consistent with the test case catalog.
- Check that the traceability matrix does not overstate coverage.
- Check that unknowns and blockers are explicitly documented.
- Ensure the documentation does not claim that unexecuted tests passed.

### Phase F — Final report

Provide a concise summary containing:
- Number of discovered page templates.
- Number of sitemap entries or URL patterns inventoried.
- Number of URLs actually inspected, where measurable.
- Number of functional test cases.
- Test case counts by priority.
- Test case counts by functional area.
- Number of verified related-content block types.
- Number of observed defects.
- Number of blocked or unverified scenarios.
- Tools successfully used.
- Documentation files created.
- Highest-priority functional risks.
- Recommended next steps before implementing Playwright automation.

Clearly explain the difference between pages inventoried, pages sampled, and pages individually verified.

## 15. Strict scope restrictions

During this task:

- DO NOT implement Playwright Test specifications.
- DO NOT create `.spec.ts` or `.test.ts` files.
- DO NOT implement page objects, fixtures, helpers, or test utilities.
- DO NOT change `package.json`, `tsconfig.json`, Playwright configuration, or framework source code.
- DO NOT install packages or change MCP/CLI configuration unless explicitly authorized.
- DO NOT modify `SITEMAP.md`.
- DO NOT make production changes that create persistent or destructive side effects.
- DO NOT claim that a test passed merely because a page loaded.
- DO NOT invent expected business rules.
- DO NOT claim full coverage without supporting evidence.
- DO NOT stop after inspecting the home page or a few representative pages.
- DO NOT replace detailed test cases with a generic checklist.

You may create or update only the six specified documentation files. If any of these files already exists, inspect it first and preserve relevant existing content rather than blindly overwriting it.

## 16. Definition of done

The task is complete when:

1. The sitemap has been analyzed and mapped to known page patterns.
2. Every meaningful page template has been investigated using representative examples, with gaps documented.
3. All discoverable critical functional areas have been investigated.
4. Authentication, search, wishlist, visited locations, comparison, navigation, category transitions, and related-content behavior have been covered wherever those features exist.
5. Related-content behavior has been examined across applicable page templates.
6. The functional E2E test cases are detailed enough for manual execution.
7. Every test case has concrete steps and expected results for each step.
8. Test cases are prioritized and traceable to functional areas and page templates.
9. Unknown behavior and blocked investigations are clearly identified.
10. All six documentation files are consistent and cross-referenced.
11. No automated tests or framework implementation changes have been made.

Start with Phase A. Then proceed through the remaining phases systematically.

If the task exceeds one working session, preserve progress in the documentation and leave a clear list of completed work, remaining work, and unresolved questions so the investigation can resume without repeating completed steps.