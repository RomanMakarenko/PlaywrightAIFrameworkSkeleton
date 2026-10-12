import type { Locator } from '@playwright/test';

export class SocialFollowComponent {
  constructor(readonly root: Locator) {}

  get heading(): Locator {
    return this.root.getByText('Підписуйтесь на нас', { exact: true });
  }

  get links(): Locator {
    return this.root.getByRole('link');
  }
}
