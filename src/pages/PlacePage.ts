import type { Locator, Page } from '@playwright/test';
import { ContactDetailsComponent } from '../components/ContactDetailsComponent.js';
import { RelatedPlacesSectionComponent } from '../components/RelatedPlacesSectionComponent.js';
import { BasePage } from './BasePage.js';

export class PlacePage extends BasePage {
  readonly contacts: ContactDetailsComponent;
  readonly nearbyPlacesSection: RelatedPlacesSectionComponent;
  readonly otherPlacesByTypeSection: RelatedPlacesSectionComponent;

  constructor(page: Page) {
    super(page);

    this.contacts = new ContactDetailsComponent(this.main.locator('.ui.segment.contacts'));

    const nearbyGrid = this.main.locator('#near_locations + .ui.hidden.divider + .locs-grid');
    const nearbyViewAllLink = nearbyGrid.getByRole('link', {
      name: /^Переглянути все, що є поруч/,
    });
    const otherPlacesGrid = this.main.locator(
      '#otherbytype-locations + .ui.hidden.divider + .locs-grid',
    );
    const otherPlacesViewAllLink = otherPlacesGrid.getByRole('link', {
      name: /^Переглянути всі /,
    });

    this.nearbyPlacesSection = new RelatedPlacesSectionComponent(
      this.main.locator('#near_locations').getByRole('heading', { level: 2 }),
      nearbyGrid,
      nearbyViewAllLink,
    );
    this.otherPlacesByTypeSection = new RelatedPlacesSectionComponent(
      this.main.locator('#otherbytype-locations').getByRole('heading', { level: 2 }),
      otherPlacesGrid,
      otherPlacesViewAllLink,
    );
  }

  get reviewsHeading(): Locator {
    return this.main.getByRole('heading', {
      name: 'Відгуки користувачів',
      exact: true,
    });
  }

  get nearbyPlacesHeading(): Locator {
    return this.nearbyPlacesSection.heading;
  }

  get shareButton(): Locator {
    return this.main.getByRole('button', { name: 'Поділитись', exact: true });
  }

  get planVisitButton(): Locator {
    return this.main.getByRole('button', { name: 'Хочу відвідати', exact: true });
  }

  get markVisitedButton(): Locator {
    return this.main.getByRole('button', { name: 'Вже відвідав', exact: true });
  }
}
