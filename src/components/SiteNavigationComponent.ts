import type { Locator } from '@playwright/test';

export class SiteNavigationComponent {
  constructor(readonly root: Locator) {}

  get links(): Locator {
    return this.root.getByRole('link');
  }
}
