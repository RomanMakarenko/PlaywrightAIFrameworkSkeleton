import type { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage.js';

export class NearbyPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get filterButton(): Locator {
    return this.main.getByRole('button', { name: 'Фільтрувати', exact: true });
  }

  get locationPermissionNotice(): Locator {
    return this.main.getByText(/Щоб переглянути список місць поруч/);
  }

  get nearbyCategoryLinks(): Locator {
    return this.main.getByRole('link', { name: /поруч$/ });
  }
}
