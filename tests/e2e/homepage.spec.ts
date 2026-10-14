import { expect, test } from '../fixtures.js';
import { FUNTIME_BASE_URL } from '../../src/config/testConfig.js';
import {
  CollectionDetailPage,
  CollectionListingPage,
  EditorialDetailPage,
  HomePage,
  PlacePage,
} from '../../src/pages/index.js';

const topLevelCategories = [
  { name: 'Архітектура', path: '/architecture' },
  { name: 'Культура та мистецтво', path: '/art-and-culture' },
  { name: 'Природа', path: '/nature' },
  { name: 'Розваги', path: '/entertainments' },
  { name: 'Активний відпочинок', path: '/active-leisure' },
  { name: 'Релакс та відпочинок', path: '/relaxation-and-recreation' },
];

const footerLinks = [
  ...topLevelCategories,
  { name: 'Про нас', path: '/about' },
  { name: "Зворотний зв'язок", path: '/feedback' },
  { name: 'Реклама на сайті', path: '/pr' },
  { name: 'Статті', path: '/articles' },
  { name: 'Публікації', path: '/publications' },
  { name: 'Прес-релізи', path: '/press-releases' },
  { name: 'Мапа сайту', path: '/pagemap' },
  { name: 'Цікаві посилання', path: '/interesting-links' },
  { name: 'Видалення відгуків', path: '/reviews-remove' },
  { name: 'Угода користувача', path: '/user-agreement' },
  { name: 'Відмова від відповідальності', path: '/disclaimer' },
];

function siteUrl(path: string): string {
  return new URL(path, FUNTIME_BASE_URL).toString();
}

test.describe('Funtime homepage journeys', () => {
  test('HOME-001: homepage map opens for anonymous visitors', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.open('/');
    await expect(homePage.heroHeading).toBeVisible();

    await homePage.mapButton.click();

    await expect(page).toHaveURL(`${FUNTIME_BASE_URL}/#map`);
    await expect(homePage.mapRegion).toBeVisible();
  });

  test('HOME-002: homepage shows eight place cards with working destinations', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.open('/');

    await expect(homePage.newestPlaceCards).toHaveCount(8);
    const firstCardLink = homePage.newestPlaceCards.first().getByRole('link').first();
    const cardLabel = (await firstCardLink.innerText()).replace(/\s+/g, ' ').trim();
    const href = await firstCardLink.getAttribute('href');
    expect(href).toMatch(/^\/(?:architecture|art-and-culture|nature|entertainments|active-leisure|relaxation-and-recreation)\//);

    await firstCardLink.click();

    await expect(page).toHaveURL(siteUrl(href!));
    const placePage = new PlacePage(page);
    await expect(placePage.heading).toBeVisible();
    expect(cardLabel).toContain(await placePage.heading.innerText());
  });

  test('HOME-003: Funtime-reviewed place cards open assessed locations', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.open('/');

    await expect(homePage.reviewedPlaceCards).toHaveCount(4);
    for (const card of await homePage.reviewedPlaceCards.all()) {
      await expect(card.locator('.funtime-checked-location-icon')).toBeVisible();
    }

    const selectedCard = homePage.reviewedPlaceCards.first();
    const selectedLink = selectedCard.getByRole('link').first();
    const cardLabel = (await selectedLink.innerText()).replace(/\s+/g, ' ').trim();
    const selectedHref = await selectedLink.getAttribute('href');
    await selectedLink.click();

    await expect(page).toHaveURL(siteUrl(selectedHref!));
    const placePage = new PlacePage(page);
    await expect(placePage.heading).toBeVisible();
    expect(cardLabel).toContain(await placePage.heading.innerText());
    await expect(placePage.main.getByText('Оцінка Funtime', { exact: false })).toBeVisible();
  });

  test('HOME-004: newest collection cards open their detail pages', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.open('/');

    await expect(homePage.newCollectionCards).toHaveCount(4);
    const selectedCard = homePage.newCollectionCards.first();
    const selectedLink = selectedCard.getByRole('link').last();
    const cardLabel = (await selectedLink.innerText()).replace(/\s+/g, ' ').trim();
    const href = await selectedLink.getAttribute('href');

    await selectedLink.click();

    await expect(page).toHaveURL(siteUrl(href!));
    const collectionPage = new CollectionDetailPage(page);
    await expect(collectionPage.heading).toBeVisible();
    expect(cardLabel).toBe((await collectionPage.heading.innerText()).replace(/\s+/g, ' ').trim());
  });

  test('HOME-005: all-collections link opens the public collection listing', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.open('/');
    await homePage.allCollectionsLink.click();

    await expect(page).toHaveURL(`${FUNTIME_BASE_URL}/collections`);
    const collectionPage = new CollectionListingPage(page);
    await expect(collectionPage.heading).toBeVisible();
    const firstCard = collectionPage.collectionCards.first();
    await expect(firstCard).toBeVisible();
    const collectionLink = firstCard.getByRole('link').last();
    const cardLabel = (await collectionLink.innerText()).replace(/\s+/g, ' ').trim();
    const href = await collectionLink.getAttribute('href');
    await collectionLink.click();

    await expect(page).toHaveURL(siteUrl(href!));
    const collectionDetailPage = new CollectionDetailPage(page);
    await expect(collectionDetailPage.heading).toBeVisible();
    expect(cardLabel).toBe((await collectionDetailPage.heading.innerText()).replace(/\s+/g, ' ').trim());
  });

  test('HOME-006: recent review links to its location and appears there', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.open('/');

    const reviewCard = homePage.recentReviewCards.filter({ has: page.locator('a[href*="#review"]') }).first();
    await expect(reviewCard).toBeVisible();
    const reviewExcerpt = (await reviewCard.locator('.align-centered').innerText()).replace(/\s+/g, ' ').trim();
    const reviewIdentity = reviewExcerpt.slice(0, Math.min(reviewExcerpt.length, 55));
    const rating = reviewCard.locator('.home-reviews-body-rating').getByText(/^\d(?:\.\d)?$/);
    const ratingText = (await rating.count()) > 0 ? await rating.innerText() : undefined;
    const placeLink = reviewCard.locator('.home-reviews-author-name').getByRole('link');
    const href = await placeLink.getAttribute('href');

    await placeLink.click();

    const placePage = new PlacePage(page);
    await expect(page).toHaveURL(siteUrl(href!));
    await expect(placePage.main.getByText(reviewIdentity, { exact: false })).toBeVisible();
    if (ratingText) {
      await expect(placePage.main.getByText(ratingText, { exact: true })).toBeVisible();
    }
  });

  test('HOME-007: all-reviews link opens the public reviews listing', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.open('/');
    await homePage.allReviewsLink.click();

    await expect(page).toHaveURL(`${FUNTIME_BASE_URL}/reviews`);
    await expect(page.getByRole('main').getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('HOME-008: homepage social links point to their platforms', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.open('/');
    await expect(homePage.socialFollow.heading).toBeVisible();

    const platforms = [
      { name: /Telegram/i, href: /^https:\/\/t\.me\// },
      { name: /Facebook/i, href: /^https:\/\/www\.facebook\.com\// },
      { name: /Youtube/i, href: /^https:\/\/www\.youtube\.com\// },
      { name: /Instagram/i, href: /^https:\/\/www\.instagram\.com\// },
    ];

    for (const platform of platforms) {
      const link = homePage.socialFollow.root.getByRole('link', { name: platform.name });
      await expect(link).toBeVisible();
      await expect(link).toHaveAttribute('href', platform.href);
    }
  });

  test('HOME-009: shared footer links render on a category page and open their routes', async ({ page, catalogPage }) => {
    test.setTimeout(120_000);

    await catalogPage.open('/architecture');
    await expect(catalogPage.siteFooter.root).toBeVisible();
    await expect(catalogPage.siteFooter.rubricsHeading).toBeVisible();
    await expect(catalogPage.siteFooter.pagesHeading).toBeVisible();
    for (const footerLink of footerLinks) {
      const link = catalogPage.siteFooter.root.getByRole('link', {
        name: footerLink.name,
        exact: true,
      });
      await expect(link).toBeVisible();
      await expect(link).toHaveAttribute('href', footerLink.path);
    }

    const homePage = new HomePage(page);
    for (const footerLink of footerLinks) {
      await homePage.open('/');
      const link = homePage.siteFooter.root.getByRole('link', {
        name: footerLink.name,
        exact: true,
      });
      await expect(link).toHaveAttribute('href', footerLink.path);
      await link.click();

      await expect(page).toHaveURL(siteUrl(footerLink.path));
      await expect(page.getByRole('main').first()).toBeVisible();
    }
  });

  test('HOME-010: all six homepage rubrics open their category pages', async ({ page }) => {
    test.setTimeout(90_000);

    const homePage = new HomePage(page);
    for (const category of topLevelCategories) {
      await homePage.open('/');
      const link = homePage.topCategoryLinks.filter({ hasText: category.name }).first();
      await expect(link).toHaveAttribute('href', category.path);
      await link.click();

      await expect(page).toHaveURL(siteUrl(category.path));
      await expect(new PlacePage(page).heading).toContainText(category.name);
    }
  });

  test('HOME-011: every homepage location-type link opens its catalog', async ({ page }) => {
    test.setTimeout(180_000);

    const homePage = new HomePage(page);
    await homePage.open('/');
    const links = await homePage.locationTypeLinks.evaluateAll((elements) =>
      elements.map((element) => ({
        href: element.getAttribute('href'),
        name: element.textContent?.trim() ?? '',
      })),
    );

    expect(links.length).toBeGreaterThan(0);
    expect(links.every(({ href, name }) => Boolean(href) && Boolean(name))).toBe(true);

    for (const [index, linkData] of links.entries()) {
      await homePage.open('/');
      const link = homePage.locationTypeLinks.nth(index);
      await expect(link).toHaveAttribute('href', linkData.href!);
      await link.click();

      await expect(page).toHaveURL(siteUrl(linkData.href!));
      await expect(new PlacePage(page).heading).toContainText(linkData.name);
    }
  });

  test('HOME-012: homepage article card title matches the article heading', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.open('/');

    const articleCard = homePage.newArticleCards.first();
    await expect(articleCard).toBeVisible();
    const articleLink = articleCard.getByRole('link').first();
    const cardTitle = (await articleLink.innerText()).replace(/\s+/g, ' ').trim();
    const href = await articleLink.getAttribute('href');
    expect(href).toMatch(/^\/articles\//);

    await articleLink.click();

    await expect(page).toHaveURL(siteUrl(href!));
    const articlePage = new EditorialDetailPage(page);
    const articleTitle = (await articlePage.pageHeading.innerText()).replace(/\s+/g, ' ').trim();
    expect(cardTitle).toBe(articleTitle);
  });
});
