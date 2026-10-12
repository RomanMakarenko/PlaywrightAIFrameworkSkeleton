import type { Locator } from '@playwright/test';
import { PlaceCardComponent } from './PlaceCardComponent.js';

export class RelatedPlacesSectionComponent {
  constructor(
    readonly heading: Locator,
    readonly grid: Locator,
    readonly viewAllLink: Locator,
  ) {}

  get cards(): Locator {
    return this.grid.getByRole('article');
  }

  getCardByName(name: string): PlaceCardComponent {
    return new PlaceCardComponent(this.cards.filter({ hasText: name }).first());
  }
}
