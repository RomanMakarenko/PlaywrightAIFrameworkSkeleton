import type { Locator } from '@playwright/test';

export class BreadcrumbsComponent {
  constructor(readonly root: Locator) {}

  get items(): Locator {
    return this.root.getByRole('listitem');
  }

  get links(): Locator {
    return this.root.getByRole('link');
  }

  get currentItem(): Locator {
    return this.items.last();
  }
}
