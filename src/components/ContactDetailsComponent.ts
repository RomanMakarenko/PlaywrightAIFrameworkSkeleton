import type { Locator } from '@playwright/test';

export class ContactDetailsComponent {
  constructor(readonly root: Locator) {}

  get phoneLinks(): Locator {
    return this.root.locator('a[href^="tel:"]');
  }

  get websiteLink(): Locator {
    return this.root.getByRole('link', { name: 'Веб-сайт', exact: true });
  }

  get socialLinks(): Locator {
    return this.root.getByRole('link', { name: /^(?:Канал на |Сторінка у )/ });
  }

  get mapPageLink(): Locator {
    return this.root.getByRole('link', { name: 'Сторінка на Google Maps', exact: true });
  }

  get directionsLink(): Locator {
    return this.root.getByRole('link', { name: 'Побудувати маршрут', exact: true });
  }

  get locationEntries(): Locator {
    return this.root.locator('.contacts-list > .item');
  }

  get mapPreview(): Locator {
    return this.root.getByText('Переглянути на мапі', { exact: true });
  }
}
