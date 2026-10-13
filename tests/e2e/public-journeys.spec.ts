import { test, expect } from '@playwright/test';
import {
  CatalogPage,
  CollectionDetailPage,
  EditorialDetailPage,
  FUNTIME_ORIGIN,
  HomePage,
  PlacePage,
  ReviewsPage,
} from '../../src/pages/index.js';

test.describe('Funtime public journeys', () => {
  test('NAV-001: mobile menu opens and navigates to a category', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });

    const homePage = new HomePage(page);
    await homePage.open('/');
    await expect(homePage.heroHeading).toBeVisible();

    await page.getByText('☰Меню', { exact: true }).click();
    const lakesLink = page
      .getByRole('navigation')
      .getByRole('link', { name: 'Озера', exact: true });
    await expect(lakesLink).toBeVisible();
    await lakesLink.click();

    await expect(page).toHaveURL(`${FUNTIME_ORIGIN}/nature/type/lakes`);
    await expect(new CatalogPage(page).heading).toHaveText('Озера');

    await page.goBack();
    await expect(page).toHaveURL(`${FUNTIME_ORIGIN}/`);
    await expect(homePage.heroHeading).toBeVisible();
  });

  test('CAT-001: one more batch expands the lake catalog', async ({ page }) => {
    const catalogPage = new CatalogPage(page);
    await catalogPage.open('/nature/type/lakes');
    await expect(catalogPage.heading).toHaveText('Озера');

    const initialCardCount = await catalogPage.placeCards.count();
    expect(initialCardCount).toBeGreaterThan(0);
    const initialUrl = page.url();

    await catalogPage.showMoreButton.click();
    await expect.poll(() => catalogPage.placeCards.count()).toBeGreaterThan(initialCardCount);
    await expect(page).toHaveURL(initialUrl);
  });

  test('LOC-001: river detail shows identity and navigation sections', async ({ page }) => {
    const placePage = new PlacePage(page);
    await placePage.open('/nature/ikva-river');

    await expect(placePage.heading).toHaveText('Іква');
    const natureBreadcrumb = placePage.main
      .getByRole('list')
      .first()
      .getByRole('link', { name: 'Природа', exact: true });
    await expect(natureBreadcrumb).toHaveAttribute('href', '/nature');
    await expect(placePage.contacts.directionsLink).toBeVisible();
    await expect(placePage.reviewsHeading).toBeVisible();
    await expect(placePage.nearbyPlacesHeading).toHaveText('Що ще є поруч');
    await expect(placePage.otherPlacesByTypeSection.heading).toHaveText('Інші річки');

    await page.reload();
    await expect(page).toHaveURL(`${FUNTIME_ORIGIN}/nature/ikva-river`);
    await expect(placePage.heading).toHaveText('Іква');
  });

  test('REL-001: related-place recommendation opens the matching location', async ({ page }) => {
    const sourcePage = new PlacePage(page);
    await sourcePage.open('/nature/ikva-river');

    const recommendation = sourcePage.nearbyPlacesSection.getCardByName('Дубенський Замок').link;
    await expect(recommendation).toHaveAttribute('href', /\/architecture\/dubenskiy$/);
    await recommendation.click();

    await expect(page).toHaveURL(`${FUNTIME_ORIGIN}/architecture/dubenskiy`);
    await expect(page.getByRole('main').getByRole('heading', { level: 1 })).toContainText(
      'Дубенський',
    );

    await page.goBack();
    await expect(page).toHaveURL(`${FUNTIME_ORIGIN}/nature/ikva-river`);
    await expect(sourcePage.heading).toHaveText('Іква');
  });

  test('NAV-003: collection item opens the matching location', async ({ page }) => {
    const collectionPage = new CollectionDetailPage(page);
    await collectionPage.open(
      '/collections/relaxation-and-recreation/parky-z-dynozavrvmy-v-ukrayini',
    );

    const dinoSofiaLink = page
      .getByRole('main')
      .getByRole('link', { name: 'DinoSofia', exact: true });
    await expect(dinoSofiaLink).toHaveAttribute('href', /\/dinosofia-park$/);
    await dinoSofiaLink.click();

    await expect(page).toHaveURL(`${FUNTIME_ORIGIN}/relaxation-and-recreation/dinosofia-park`);
    await expect(page.getByRole('main').getByRole('heading', { level: 1 })).toHaveText('DinoSofia');
  });

  test('ART-001: article opens its referenced quest category in a new tab', async ({ page }) => {
    const articlePage = new EditorialDetailPage(page);
    await articlePage.open('/articles/dictionary-of-quest-gamers');

    const questRoomsLink = page
      .getByRole('main')
      .getByRole('link', { name: 'проходження квест-кімнат', exact: true });
    await expect(questRoomsLink).toHaveAttribute('href', /\/entertainments\/type\/quest-rooms$/);
    await expect(questRoomsLink).toHaveAttribute('target', '_blank');

    const popupPromise = page.waitForEvent('popup');
    await questRoomsLink.click();
    const destinationPage = await popupPromise;

    await expect(destinationPage).toHaveURL(`${FUNTIME_ORIGIN}/entertainments/type/quest-rooms`);
    await expect(destinationPage.getByRole('main').getByRole('heading', { level: 1 })).toHaveText(
      'Квест-кімнати',
    );

    await destinationPage.close();
    await expect(page).toHaveURL(`${FUNTIME_ORIGIN}/articles/dictionary-of-quest-gamers`);
    await expect(articlePage.pageHeading).toBeVisible();
  });

  test('DATA-001: lake card identity matches its destination heading', async ({ page }) => {
    const catalogPage = new CatalogPage(page);
    await catalogPage.open('/nature/type/lakes');

    const lakeCard = catalogPage.getPlaceCardByName('Острівне');
    const lakeLink = lakeCard.link;
    await expect(lakeLink).toHaveAttribute('href', /\/nature\/ostrivne-lake$/);
    const cardText = await lakeCard.root.innerText();

    await lakeLink.click();
    await expect(page).toHaveURL(`${FUNTIME_ORIGIN}/nature/ostrivne-lake`);

    const destinationHeading = page.getByRole('main').getByRole('heading', { level: 1 });
    await expect(destinationHeading).toHaveText('Острівне');
    expect(cardText).toContain(await destinationHeading.innerText());
  });

  test('REV-001: review sort menu exposes the observed choices', async ({ page }) => {
    const reviewsPage = new ReviewsPage(page);
    await reviewsPage.open('/reviews/about/castles');

    await expect(reviewsPage.main.getByRole('heading', { level: 1 })).toHaveText(
      'Відгуки користувачів про замки',
    );
    await reviewsPage.sortButton.click();

    for (const option of [
      'спочатку найновіші',
      'спочатку самі перші',
      'спочатку популярні',
      'спочатку перевірені',
    ]) {
      await expect(page.getByText(option, { exact: true })).toBeVisible();
    }
  });

  test('UI-001: directions control has a map destination for the river', async ({ page }) => {
    const placePage = new PlacePage(page);
    await placePage.open('/nature/ikva-river');

    await expect(placePage.contacts.directionsLink).toBeVisible();
    await expect(placePage.contacts.directionsLink).toHaveAttribute(
      'href',
      /^https:\/\/www\.google\.com\/maps\/dir\//,
    );
  });

  for (const route of [
    { path: '/nature/type/lakes', heading: 'Озера' },
    { path: '/nature/male-domashnye', heading: 'Мале Домашнє' },
    {
      path: '/collections/relaxation-and-recreation/parky-z-dynozavrvmy-v-ukrayini',
      heading: 'Парки з динозаврами в Україні',
    },
  ]) {
    test(`ERR-001: ${route.path} remains available directly and after refresh`, async ({ page }) => {
      await page.goto(new URL(route.path, FUNTIME_ORIGIN).toString());
      const heading = page.getByRole('main').getByRole('heading', { level: 1 });

      await expect(page).toHaveURL(`${FUNTIME_ORIGIN}${route.path}`);
      await expect(heading).toHaveText(route.heading);

      await page.reload();
      await expect(page).toHaveURL(`${FUNTIME_ORIGIN}${route.path}`);
      await expect(heading).toHaveText(route.heading);
    });
  }
});
