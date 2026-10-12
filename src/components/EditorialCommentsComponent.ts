import type { Locator } from '@playwright/test';

export class EditorialCommentsComponent {
  constructor(readonly root: Locator) {}

  get heading(): Locator {
    return this.root.getByRole('heading', { name: 'Коментарі', exact: true });
  }

  get writeButton(): Locator {
    return this.root.getByRole('button', { name: 'Написати', exact: true });
  }
}
