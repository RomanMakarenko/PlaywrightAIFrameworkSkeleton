import type { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage.js';

export class ReviewsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get reviewCards(): Locator {
    return this.main.getByRole('article');
  }

  get filterButton(): Locator {
    return this.main.getByRole('button', { name: 'Фільтрувати', exact: true });
  }

  get sortButton(): Locator {
    return this.main.getByRole('button', { name: 'Сортувати', exact: true });
  }
}
