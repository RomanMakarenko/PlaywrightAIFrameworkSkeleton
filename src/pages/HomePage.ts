import type { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage.js';

export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get heroHeading(): Locator {
    return this.main.getByRole('heading', {
      level: 1,
      name: 'Ми знаємо, як провести час із користю!',
    });
  }

  get allCollectionsLink(): Locator {
    return this.main.getByRole('link', { name: 'Переглянути всі добірки' });
  }

  get allReviewsLink(): Locator {
    return this.main.getByRole('link', { name: 'Переглянути всі відгуки' });
  }

  get allArticlesLink(): Locator {
    return this.main.getByRole('link', { name: 'Переглянути всі статті' });
  }
}
