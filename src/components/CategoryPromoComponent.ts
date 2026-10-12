import type { Locator } from '@playwright/test';

export class CategoryPromoComponent {
  constructor(readonly root: Locator) {}

  get heading(): Locator {
    return this.root.locator('.ui.header');
  }

  get links(): Locator {
    return this.root.getByRole('link');
  }
}
