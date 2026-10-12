import type { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage.js';

export class SiteMapPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get sectionLinks(): Locator {
    return this.main.getByRole('link');
  }

  get locationsLink(): Locator {
    return this.main.getByRole('link', { name: 'Місця', exact: true });
  }

  get collectionsLink(): Locator {
    return this.main.getByRole('link', { name: 'Добірки', exact: true });
  }
}
