import type { Locator } from '@playwright/test';

export class ProfileReviewNavigationComponent {
  constructor(readonly root: Locator) {}

  get reviewListTab(): Locator {
    return this.root.getByRole('link', { name: 'Відгуки', exact: true });
  }

  get repliesTab(): Locator {
    return this.root.getByRole('link', { name: 'Відповіді на відгуки', exact: true });
  }
}
