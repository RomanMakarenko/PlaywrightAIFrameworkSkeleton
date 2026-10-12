import type { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage.js';

export class StaticContentPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get contentHeadings(): Locator {
    return this.main.getByRole('heading');
  }

  get contactEmailLink(): Locator {
    return this.main.getByRole('link', { name: /@funtime\.com\.ua$/ });
  }
}
