import type { Locator } from '@playwright/test';

export class RelatedEditorialContentComponent {
  constructor(readonly root: Locator) {}

  get heading(): Locator {
    return this.root.getByText('Вас також зацікавить', { exact: true });
  }
}
