import type { Locator } from '@playwright/test';

export class SiteFooterComponent {
  constructor(readonly root: Locator) {}

  get links(): Locator {
    return this.root.getByRole('link');
  }

  get rubricsHeading(): Locator {
    return this.root.getByText('Рубрики', { exact: true });
  }

  get pagesHeading(): Locator {
    return this.root.getByText('Сторінки', { exact: true });
  }

  get rssEmailInput(): Locator {
    return this.root.getByRole('textbox', { name: 'введіть email' });
  }

  get rssSubscribeButton(): Locator {
    return this.root.getByRole('button', { name: 'Підписатись', exact: true });
  }

  get domainLinks(): Locator {
    return this.root.locator(
      'a[href^="https://funtime.kyiv.ua"], a[href^="https://funtime.kiev.ua"]',
    );
  }

  get copyright(): Locator {
    return this.root.getByText(/© 2015-/);
  }

  get legalNotice(): Locator {
    return this.root.getByText(/Всі права захищені/);
  }
}
