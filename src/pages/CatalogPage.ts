import type { Locator, Page } from '@playwright/test';
import { BreadcrumbsComponent } from '../components/BreadcrumbsComponent.js';
import { CategoryPromoComponent } from '../components/CategoryPromoComponent.js';
import { CategoryTypeLinksComponent } from '../components/CategoryTypeLinksComponent.js';
import { PlaceCardComponent } from '../components/PlaceCardComponent.js';
import { SocialFollowComponent } from '../components/SocialFollowComponent.js';
import { BasePage } from './BasePage.js';

export class CatalogPage extends BasePage {
  readonly breadcrumbs: BreadcrumbsComponent;
  readonly typeLinksSection: CategoryTypeLinksComponent;
  readonly ideasPanel: CategoryPromoComponent;
  readonly placeOwnersPanel: CategoryPromoComponent;
  readonly socialFollow: SocialFollowComponent;

  constructor(page: Page) {
    super(page);

    this.breadcrumbs = new BreadcrumbsComponent(this.main.getByRole('list').first());
    this.typeLinksSection = new CategoryTypeLinksComponent(
      this.main.locator('.see-also-locationtypes'),
    );
    this.ideasPanel = new CategoryPromoComponent(
      this.main.locator('.ui.segment').filter({ hasText: 'Є ідеї?' }),
    );
    this.placeOwnersPanel = new CategoryPromoComponent(
      this.main.locator('.ui.segment').filter({ hasText: 'Власникам місць' }),
    );
    this.socialFollow = new SocialFollowComponent(
      this.main
        .locator('section.ui.center.aligned.grid')
        .filter({ hasText: 'Підписуйтесь на нас' }),
    );
  }

  get placeCards(): Locator {
    return this.main.locator('article.img-list-grid');
  }

  getPlaceCardByName(name: string): PlaceCardComponent {
    return new PlaceCardComponent(this.placeCards.filter({ hasText: name }).first());
  }

  get showMoreButton(): Locator {
    return this.main.getByRole('button', { name: 'показати ще', exact: true });
  }

  get sortButton(): Locator {
    return this.main.getByRole('button', { name: 'Сортувати', exact: true });
  }

  get collectionLinks(): Locator {
    return this.main.getByRole('link', { name: /Переглянути більше добірок/ });
  }
}
