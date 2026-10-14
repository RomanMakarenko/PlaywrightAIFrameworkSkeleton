import type { Page } from '@playwright/test';
import type { CatalogPage } from '../../src/pages/CatalogPage.js';
import { FUNTIME_BASE_URL } from '../../src/config/testConfig.js';
import { test, expect } from '../fixtures.js';

async function openNatureCategory(page: Page, catalogPage: CatalogPage): Promise<void> {
  await catalogPage.open('/nature');
  await expect(catalogPage.heading).toHaveText('Природа');
  await expect(page).toHaveURL(`${FUNTIME_BASE_URL}/nature`);
}

type PlaceCardSnapshot = {
  title: string;
  href: string;
};

async function getDisplayedPlaceCards(catalogPage: CatalogPage): Promise<PlaceCardSnapshot[]> {
  return catalogPage.placeCards.evaluateAll((cards) =>
    cards.map((card) => ({
      title: card.querySelector('.grid-title')?.textContent?.replace(/\s+/g, ' ').trim() ?? '',
      href: card.querySelector('a[href]')?.getAttribute('href') ?? '',
    })),
  );
}

async function selectAlphabeticalSortAndVerifyOrder(
  page: Page,
  catalogPage: CatalogPage,
  label: string,
  direction: 'ascending' | 'descending',
): Promise<void> {
  await openNatureCategory(page, catalogPage);
  await catalogPage.sortButton.click();
  const option = catalogPage.sortMenu.locator('.link.item').getByText(label, { exact: true });
  await expect(option).toBeVisible();
  await option.click();
  await expect(option).toHaveClass(/active/);

  const collator = new Intl.Collator('uk-UA', { sensitivity: 'base' });
  await expect
    .poll(async () => {
      const cards = await getDisplayedPlaceCards(catalogPage);
      const titles = cards.map(({ title }) => title);
      const sortedTitles = [...titles].sort((left, right) => {
        const result = collator.compare(left, right);
        return direction === 'ascending' ? result : -result;
      });

      return (
        cards.length > 1 &&
        cards.every(({ title, href }) => title.length > 0 && href.length > 0) &&
        new Set(cards.map(({ href }) => href)).size === cards.length &&
        titles.every((title, index) => title === sortedTitles[index])
      );
    })
    .toBe(true);
}

function normalizeText(value: string): string {
  return value.replace(/\s+/g, ' ').trim();
}

test.describe('Funtime category catalog', () => {
  test('CAT-003: category introduction toggle can be dismissed', async ({ page, catalogPage }) => {
    await openNatureCategory(page, catalogPage);
    await expect(catalogPage.categoryIntroExpandControl).toBeVisible();
    const initialUrl = page.url();

    await catalogPage.categoryIntroExpandControl.click();

    await expect(catalogPage.categoryIntroExpandControl).toBeHidden();
    await expect(page).toHaveURL(initialUrl);
  });

  test('CAT-004: category map opens on the category route', async ({ page, catalogPage }) => {
    await openNatureCategory(page, catalogPage);
    await catalogPage.categoryMapControl.click();

    await expect(page).toHaveURL(`${FUNTIME_BASE_URL}/nature#map`);
    await expect(page.getByRole('region', { name: 'Карта' })).toBeVisible();
  });

  test('CAT-005: map marker icons match the approved location-type mapping', async ({
    catalogPage,
  }) => {
    test.fixme(
      true,
      'The live map exposes unnamed provider controls; no stable marker identity or approved type-to-icon mapping is available.',
    );
    await catalogPage.open('/nature');
  });

  test('CAT-006: activating a map marker opens its matching location preview', async ({
    catalogPage,
  }) => {
    test.fixme(
      true,
      'Map markers have no accessible identity and the preview-to-marker association cannot be asserted reliably.',
    );
    await catalogPage.open('/nature');
  });

  test('CAT-007: map preview image and title open the matching location', async ({
    catalogPage,
  }) => {
    test.fixme(
      true,
      'CAT-006 has no stable marker/preview identity signal, so the destination cannot be tied to a selected location.',
    );
    await catalogPage.open('/nature');
  });

  test('CAT-008: initial location-card count matches the category count label', async ({
    page,
    catalogPage,
  }) => {
    await openNatureCategory(page, catalogPage);

    const countLabel = catalogPage.main.getByText(/показано \d+ із \d+ локацій/);
    const countMatch = (await countLabel.innerText()).match(/показано (\d+) із (\d+) локацій/);
    expect(countMatch).not.toBeNull();
    expect(await catalogPage.placeCards.count()).toBe(Number(countMatch?.[1]));
    expect(Number(countMatch?.[1])).toBeGreaterThan(0);
  });

  test('CAT-009: category location grid has four columns at a 1440px viewport', async ({
    page,
    catalogPage,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await openNatureCategory(page, catalogPage);
    const initialCardCount = await catalogPage.placeCards.count();
    expect(initialCardCount).toBeGreaterThanOrEqual(5);

    const firstRowCount = await catalogPage.placeCards.evaluateAll((cards) => {
      const firstRowTop = cards[0].getBoundingClientRect().top;
      return cards.filter((card) => Math.abs(card.getBoundingClientRect().top - firstRowTop) < 1)
        .length;
    });
    const pageHasNoHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth <= document.documentElement.clientWidth,
    );

    expect(firstRowCount).toBe(4);
    expect(pageHasNoHorizontalOverflow).toBe(true);
  });

  test('CAT-010: category load-more appends locations without replacing prior cards', async ({
    page,
    catalogPage,
  }) => {
    await openNatureCategory(page, catalogPage);
    const initialUrl = page.url();
    const initialCardHrefs = await catalogPage.placeCards.evaluateAll((cards) =>
      cards.map((card) => card.querySelector('a')?.getAttribute('href')).filter(Boolean),
    );
    const initialCardCount = initialCardHrefs.length;

    await catalogPage.showMoreButton.click();
    await expect.poll(() => catalogPage.placeCards.count()).toBeGreaterThan(initialCardCount);

    const expandedCardHrefs = await catalogPage.placeCards.evaluateAll((cards) =>
      cards.map((card) => card.querySelector('a')?.getAttribute('href')).filter(Boolean),
    );
    for (const href of initialCardHrefs) {
      expect(expandedCardHrefs).toContain(href);
    }
    await expect(page).toHaveURL(initialUrl);
  });

  test('CAT-011: category advertising placement and repetition follow product rules', async ({
    catalogPage,
  }) => {
    test.fixme(
      true,
      'No approved ad-identification, disclosure, counting, placement, or frequency rule is available for this category.',
    );
    await catalogPage.open('/nature');
  });

  test('CAT-012: a category type link opens its matching type catalog', async ({
    page,
    catalogPage,
  }) => {
    await openNatureCategory(page, catalogPage);
    const typeLink = catalogPage.typeLinksSection.links.first();
    const typeLabel = normalizeText(await typeLink.innerText());
    const typeHref = await typeLink.getAttribute('href');

    expect(typeHref).toBeTruthy();
    await typeLink.click();

    await expect(page).toHaveURL(new URL(typeHref!, FUNTIME_BASE_URL).toString());
    await expect(catalogPage.heading).toHaveText(typeLabel);
  });

  test('CAT-013: collection image and title open the matching collection', async ({
    page,
    catalogPage,
  }) => {
    await openNatureCategory(page, catalogPage);
    const collectionCard = catalogPage.collectionCards.first();
    const collectionLinks = collectionCard.getByRole('link');
    const imageLink = collectionLinks.first();
    const titleLink = collectionLinks.nth(1);
    const title = normalizeText(await titleLink.innerText());
    const href = await titleLink.getAttribute('href');

    expect(href).toBeTruthy();
    await expect(imageLink).toHaveAttribute('href', href!);
    await imageLink.click();
    await expect(page).toHaveURL(new URL(href!, FUNTIME_BASE_URL).toString());
    await expect(catalogPage.heading).toHaveText(title);

    await page.goBack();
    await expect(catalogPage.heading).toHaveText('Природа');
    await titleLink.click();
    await expect(page).toHaveURL(new URL(href!, FUNTIME_BASE_URL).toString());
    expect(normalizeText(await catalogPage.heading.innerText())).toBe(title);
  });

  test('CAT-014: category sort menu exposes the observed selectable choices', async ({
    page,
    catalogPage,
  }) => {
    await openNatureCategory(page, catalogPage);
    await catalogPage.sortButton.click();

    const observedOptions = [
      'по замовчуванню',
      'спочатку найновіші',
      'спочатку самі перші',
      'від А до Я',
      'від Я до А',
      'спочатку з високим рейтингом',
      'спочатку з низьким рейтингом',
    ];
    for (const label of observedOptions) {
      await expect(
        catalogPage.sortMenu.locator('.link.item').getByText(label, { exact: true }),
      ).toBeVisible();
    }
  });

  test('CAT-015: default category order follows the defined ordering rule', async ({ catalogPage }) => {
    test.fixme(
      true,
      'The product-defined default order has no independently verified data oracle or expected sequence.',
    );
    await catalogPage.open('/nature');
  });

  test('CAT-016: category locations can be sorted by popularity', async ({ catalogPage }) => {
    test.fixme(
      true,
      'The live sort menu shows “за популярністю” as a section heading, not a selectable option; the metric and oracle are unknown.',
    );
    await catalogPage.open('/nature');
  });

  test('CAT-017: category locations can be sorted by date added', async ({ catalogPage }) => {
    test.fixme(
      true,
      'The live sort menu shows “за датою додавання” as a section heading, not a selectable option; the date field and ordering rule are unknown.',
    );
    await catalogPage.open('/nature');
  });

  test('CAT-018: newest-first category order follows publication dates', async ({ catalogPage }) => {
    test.fixme(
      true,
      'Category cards expose no publication date; image paths and the “new” badge are not reliable date oracles.',
    );
    await catalogPage.open('/nature');
  });

  test('CAT-019: oldest-first category order follows publication dates', async ({ catalogPage }) => {
    test.fixme(
      true,
      'Category cards expose no publication date; image paths and the “new” badge are not reliable date oracles.',
    );
    await catalogPage.open('/nature');
  });

  test('CAT-020: category cards appear in ascending Ukrainian alphabetical order', async ({
    page,
    catalogPage,
  }) => {
    await selectAlphabeticalSortAndVerifyOrder(
      page,
      catalogPage,
      'від А до Я',
      'ascending',
    );
  });

  test('CAT-021: category cards appear in descending Ukrainian alphabetical order', async ({
    page,
    catalogPage,
  }) => {
    await selectAlphabeticalSortAndVerifyOrder(
      page,
      catalogPage,
      'від Я до А',
      'descending',
    );
  });

  test('CAT-022: category cards appear in high-to-low rating order', async ({ catalogPage }) => {
    test.fixme(
      true,
      'Category cards expose no numeric rating values; their rating blocks are empty or show non-rating badges.',
    );
    await catalogPage.open('/nature');
  });

  test('CAT-023: category cards appear in low-to-high rating order', async ({ catalogPage }) => {
    test.fixme(
      true,
      'Category cards expose no numeric rating values; their rating blocks are empty or show non-rating badges.',
    );
    await catalogPage.open('/nature');
  });
});
