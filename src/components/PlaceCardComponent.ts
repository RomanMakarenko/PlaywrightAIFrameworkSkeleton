import type { Locator } from '@playwright/test';

export class PlaceCardComponent {
  constructor(readonly root: Locator) {}

  get link(): Locator {
    return this.root.getByRole('link').first();
  }

  get distance(): Locator {
    return this.root.locator('.grid-distance-text');
  }
}
