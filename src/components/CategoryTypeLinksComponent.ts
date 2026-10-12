import type { Locator } from '@playwright/test';

export class CategoryTypeLinksComponent {
  constructor(readonly root: Locator) {}

  get heading(): Locator {
    return this.root.locator('.ui.horizontal.divider');
  }

  get links(): Locator {
    return this.root.getByRole('link');
  }
}
