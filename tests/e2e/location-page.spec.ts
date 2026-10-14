import { test, expect } from '../fixtures.js';
import { PlacePage } from '../../src/pages/index.js';

test.describe('Funtime location detail', () => {
  test('LOC-002: table of contents links target the corresponding sections', async ({ page }) => {
    const placePage = new PlacePage(page);
    await placePage.open('/relaxation-and-recreation/haiky-rezort');

    const tableOfContentsToggle = page.getByText('Показати зміст', { exact: true });
    await expect(tableOfContentsToggle).toBeVisible();
    await tableOfContentsToggle.click();

    for (const [label, target] of [
      ['Опис', '#description'],
      ['Рецензія', '#overviews'],
      ['Галерея зображень', '#gallery'],
      ['Контакти', '#contacts'],
      ['Відгуки', '#reviews'],
      ['Що ще є поруч', '#near_locations'],
    ]) {
      const link = page.locator(`a[href="${target}"]`);
      await expect(link).toBeVisible();
      const section = placePage.main.locator(target);
      await expect(link).toHaveText(label);
      await expect(section).toBeAttached();

      await link.click();
      await expect(section).toBeInViewport();
    }
  });

  test('LOC-003: Russian-language location link opens separately', async ({ page }) => {
    const placePage = new PlacePage(page);
    await placePage.open('/relaxation-and-recreation/haiky-rezort');

    const russianVersionLink = placePage.main.getByRole('link', {
      name: /загородном комплексе «Гайки»/,
    });
    await expect(russianVersionLink).toHaveAttribute('href', /^https:\/\/funtime\.kiev\.ua\//);
    await expect(russianVersionLink).toHaveAttribute('target', '_blank');

    const popupPromise = page.waitForEvent('popup');
    await russianVersionLink.click();
    const russianPage = await popupPromise;

    await expect(russianPage).toHaveURL(/^https:\/\/funtime\.kiev\.ua\//);
    await expect(page).toHaveURL(/funtime\.com\.ua\/relaxation-and-recreation\/haiky-rezort$/);
    await expect(placePage.heading).toHaveText('Гайки');
    await russianPage.close();
  });

  test('LOC-004: contact block exposes an address, directions, and a revealed phone', async ({ page }) => {
    const placePage = new PlacePage(page);
    await placePage.open('/relaxation-and-recreation/haiky-rezort');

    await expect(placePage.contacts.addressEntry).toContainText('Житомирська область');
    await expect(placePage.contacts.directionsLink).toHaveAttribute(
      'href',
      /^https:\/\/www\.google\.com\/maps\/dir\//,
    );

    const phoneLink = placePage.contacts.phoneLinks.first();
    const revealPhoneButton = phoneLink.getByText('показати', { exact: true });
    await expect(revealPhoneButton).toBeVisible();
    await revealPhoneButton.click();
    await expect(revealPhoneButton).toBeHidden();
    await expect(phoneLink).toContainText('(041) 248-21-24');
  });

  test('LOC-005: comparison result includes the location overview rows', async ({ page }) => {
    const placePage = new PlacePage(page);
    await placePage.open('/architecture/dubenskiy');

    const overviewLabels = await placePage.main
      .locator('#overviews table tr')
      .evaluateAll((rows) =>
        rows
          .map((row) => row.querySelector('th, td')?.textContent?.trim() ?? '')
          .filter(Boolean),
      );
    expect(overviewLabels.length).toBeGreaterThan(0);

    await placePage.main.getByRole('button', { name: /Порівняти з іншими/ }).click();

    const dialog = page.locator('.ui.small.modal.visible');
    await expect(dialog).toBeVisible();
    await expect(dialog).toContainText('Порівняння замку «Дубенський»');

    const dropdown = dialog.locator('.ui.selection.dropdown');
    await dropdown.click();
    const firstOption = dialog.locator('.menu .item').first();
    await expect(firstOption).toBeVisible();
    const selectedSlug = await firstOption.getAttribute('data-value');
    if (!selectedSlug) {
      throw new Error('The comparison option is missing its location slug.');
    }
    await firstOption.click();
    await dialog.getByText('Порівняти', { exact: true }).click();

    await expect(page).toHaveURL(new RegExp(`/compare/dubenskiy/${selectedSlug}$`));
    const comparisonLabels = await page
      .getByRole('main')
      .getByRole('table')
      .first()
      .locator('tr')
      .evaluateAll((rows) =>
        rows
          .map((row) => row.querySelector('th, td')?.textContent?.trim() ?? '')
          .filter(Boolean),
      );
    expect(comparisonLabels).toEqual(expect.arrayContaining(overviewLabels));
  });

  test('LOC-006: gallery exposes full-size images and a fullscreen viewer', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    const placePage = new PlacePage(page);
    await placePage.open('/architecture/dubenskiy');

    const gallery = placePage.main.locator('#location_gallery');
    const galleryImages = gallery.getByRole('link');
    await expect(galleryImages.first()).toBeVisible();
    await expect(galleryImages.first()).toHaveAttribute(
      'href',
      /^\/u\/i\/gallery\/.+\.jpg$/,
    );
    expect(await galleryImages.count()).toBeGreaterThan(0);

    if ((await galleryImages.count()) >= 5) {
      const firstRow = await Promise.all(
        Array.from({ length: 4 }, (_, index) => galleryImages.nth(index).boundingBox()),
      );
      const secondRowFirstImage = await galleryImages.nth(4).boundingBox();
      expect(firstRow.every((box) => box !== null)).toBe(true);
      expect(secondRowFirstImage).not.toBeNull();
      expect(Math.max(...firstRow.map((box) => box?.y ?? 0)) - Math.min(...firstRow.map((box) => box?.y ?? 0))).toBeLessThan(1);
      expect(secondRowFirstImage!.y).toBeGreaterThan(firstRow[0]!.y);
    }

    await galleryImages.first().click();
    const viewer = page.locator('.lg-container.lg-show');
    const counter = viewer.locator('.lg-counter');
    await expect(counter).toBeVisible();
    await expect(counter).toHaveText(/^\s*1\s*\/\s*\d+\s*$/);

    for (const label of ['Previous slide', 'Next slide', 'Close gallery']) {
      await expect(page.getByRole('button', { name: label })).toBeAttached();
    }
  });

  test('LOC-007: map preview opens the location map view', async ({ page }) => {
    const placePage = new PlacePage(page);
    await placePage.open('/relaxation-and-recreation/haiky-rezort');

    await expect(placePage.contacts.mapPreview).toBeVisible();
    await placePage.contacts.mapPreview.click();

    await expect(page).toHaveURL(/#map$/);
    await expect(page.locator('#google_map_canvas')).toBeVisible();

    await page.goBack();
    await expect(page).not.toHaveURL(/#map$/);
    await expect(placePage.heading).toHaveText('Гайки');
  });

  test('LOC-008: breadcrumbs navigate through category and location type', async ({ page }) => {
    const placePage = new PlacePage(page);
    await placePage.open('/architecture/dubenskiy');

    const categoryLink = placePage.breadcrumbs.root.getByRole('link', {
      name: 'Архітектура',
      exact: true,
    });
    const typeLink = placePage.breadcrumbs.root.getByRole('link', {
      name: 'Замки',
      exact: true,
    });
    await expect(categoryLink).toHaveAttribute('href', '/architecture');
    await expect(typeLink).toHaveAttribute('href', '/architecture/type/castles');
    await expect(placePage.breadcrumbs.currentItem).toContainText('Дубенський');

    await categoryLink.click();
    await expect(page).toHaveURL(/\/architecture$/);
    await page.goBack();
    await expect(placePage.heading).toHaveText('Дубенський');

    await typeLink.click();
    await expect(page).toHaveURL(/\/architecture\/type\/castles$/);
    await expect(page.getByRole('main').getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('LOC-009: optional website and social contact links expose destinations', async ({ page }) => {
    const placePage = new PlacePage(page);
    await placePage.open('/architecture/dubenskiy');

    await expect(placePage.contacts.websiteLink).toBeVisible();
    await expect(placePage.contacts.websiteLink).toHaveAttribute('target', '_blank');
    const websiteHref = await placePage.contacts.websiteLink.getAttribute('href');
    if (!websiteHref) {
      throw new Error('The website link is missing its destination.');
    }
    const websiteUrl = new URL(websiteHref);
    expect(websiteUrl.searchParams.get('utm_source')).toBe('funtime.com.ua');
    expect(websiteUrl.searchParams.get('utm_medium')).toBe('funtime.com.ua');
    expect(websiteUrl.searchParams.get('utm_campaign')).toBe('funtime.com.ua');

    const socialLinks = placePage.contacts.socialLinks;
    expect(await socialLinks.count()).toBeGreaterThan(0);
    const socialDestinations = await socialLinks.evaluateAll((links) =>
      links.map((link) => ({
        label: link.textContent?.trim() ?? '',
        href: link.getAttribute('href') ?? '',
        target: link.getAttribute('target'),
      })),
    );

    for (const destination of socialDestinations) {
      expect(destination.target).toBe('_blank');
      const url = new URL(destination.href);
      expect(url.protocol).toBe('https:');

      if (/facebook/i.test(destination.label)) {
        expect(url.hostname).toMatch(/facebook\.com$/);
      } else if (/instagram/i.test(destination.label)) {
        expect(url.hostname).toMatch(/instagram\.com$/);
      } else if (/youtube/i.test(destination.label)) {
        expect(url.hostname).toMatch(/youtube\.com$|youtu\.be$/);
      } else if (/telegram/i.test(destination.label)) {
        expect(url.hostname).toMatch(/t\.me$|telegram\.me$/);
      } else if (/tripadvisor/i.test(destination.label)) {
        expect(url.hostname).toMatch(/tripadvisor\./);
      }
    }

    expect(socialDestinations.map(({ label }) => label)).toEqual(
      expect.arrayContaining(['Сторінка у Facebook', 'Сторінка у Instagram', 'Канал на Youtube']),
    );
  });

  test('LOC-010: anonymous visit and review actions expose authorization prompts', async ({
    page,
  }) => {
    const placePage = new PlacePage(page);
    await placePage.open('/relaxation-and-recreation/haiky-rezort');

    for (const action of [placePage.planVisitButton, placePage.markVisitedButton]) {
      await expect(action).toHaveAttribute('data-ajaxmodal-url', 'modal/loginform');
      await expect(action).toHaveAttribute('data-header', /зареєструйтесь/i);
    }

    const reviewButton = placePage.main.getByRole('button', {
      name: 'Написати відгук',
      exact: true,
    });
    await expect(reviewButton).toHaveAttribute('data-ajaxmodal-url', 'modal/loginform');
    await expect(reviewButton).toHaveAttribute('data-header', /зареєструйтесь/i);
  });

  test('LOC-011: reviews, related sections, social-follow block, and footer render', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    const placePage = new PlacePage(page);
    await placePage.open('/relaxation-and-recreation/haiky-rezort');

    await expect(placePage.main.locator('#description')).toBeAttached();
    await expect(placePage.reviewsHeading).toBeVisible();
    await expect(placePage.main.locator('#reviews')).toContainText('Відгуки користувачів');

    for (const section of [placePage.nearbyPlacesSection, placePage.otherPlacesByTypeSection]) {
      await expect(section.heading).toBeVisible();
      await expect(section.viewAllLink).toBeVisible();
      await expect(section.cards.first()).toBeVisible();
      expect(await section.cards.count()).toBeGreaterThanOrEqual(7);

      const boxes = await Promise.all(
        Array.from({ length: 7 }, (_, index) => section.cards.nth(index).boundingBox()),
      );
      expect(boxes.every((box) => box !== null)).toBe(true);
      const firstRowY = boxes[0]!.y;
      for (const box of boxes.slice(0, 4)) {
        expect(Math.abs(box!.y - firstRowY)).toBeLessThan(1);
      }
      for (const box of boxes.slice(4)) {
        expect(box!.y).toBeGreaterThan(firstRowY);
      }
    }

    await placePage.nearbyPlacesSection.viewAllLink.click();
    await expect(page).toHaveURL('/nearto/haiky-rezort');
    await expect(page.getByRole('main').getByRole('heading', { level: 1 })).toBeVisible();
    await page.goBack();
    await expect(placePage.heading).toHaveText('Гайки');

    await placePage.otherPlacesByTypeSection.viewAllLink.click();
    await expect(page).toHaveURL('/relaxation-and-recreation/type/country-complexes');
    await expect(page.getByRole('main').getByRole('heading', { level: 1 })).toBeVisible();
    await page.goBack();
    await expect(placePage.heading).toHaveText('Гайки');

    await expect(placePage.socialFollow.heading).toBeVisible();
    await expect(placePage.socialFollow.links).toHaveCount(4);
    await expect(placePage.siteFooter.rubricsHeading).toBeVisible();
    await expect(placePage.siteFooter.pagesHeading).toBeVisible();
    await expect(placePage.siteFooter.legalNotice).toBeVisible();
  });
});
