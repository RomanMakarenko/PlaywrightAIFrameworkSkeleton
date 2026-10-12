import type { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage.js';

export class CollectionListingPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get collectionCards(): Locator {
    return this.main.getByRole('article');
  }

  get filterButton(): Locator {
    return this.main.getByRole('button', { name: 'Фільтрувати', exact: true });
  }

  get sortButton(): Locator {
    return this.main.getByRole('button', { name: 'Сортувати', exact: true });
  }
}

export class CollectionDetailPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get locationsLink(): Locator {
    return this.main.getByRole('link', { name: /^\d+ локацій$/ });
  }

  get locationCards(): Locator {
    return this.main.getByRole('article');
  }

  get shareButton(): Locator {
    return this.main.getByRole('button', { name: 'Поділитись', exact: true });
  }
}
