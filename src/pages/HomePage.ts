import type { Locator, Page } from '@playwright/test';
import { SocialFollowComponent } from '../components/SocialFollowComponent.js';
import { BasePage } from './BasePage.js';

export class HomePage extends BasePage {
  readonly socialFollow: SocialFollowComponent;

  constructor(page: Page) {
    super(page);
    this.socialFollow = new SocialFollowComponent(this.section('Підписуйтесь на нас'));
  }

  get heroHeading(): Locator {
    return this.main.getByRole('heading', {
      level: 1,
      name: 'Ми знаємо, як провести час із користю!',
    });
  }

  get mapButton(): Locator {
    return this.main.getByText('Переглянути усі місця на карті', { exact: true });
  }

  get mapRegion(): Locator {
    return this.main.getByRole('region', { name: 'Карта' });
  }

  get topCategoryLinks(): Locator {
    return this.main
      .locator('.ui.responsive.stackable.centered.grid .ui.large.icon.header')
      .getByRole('link');
  }

  get locationTypeLinks(): Locator {
    return this.main.locator('.category-types-list').getByRole('link');
  }

  get newestPlaceCards(): Locator {
    return this.section('Нове на сайті').getByRole('article');
  }

  get reviewedPlaceCards(): Locator {
    return this.section('Перевірено Funtime').getByRole('article');
  }

  get newCollectionCards(): Locator {
    return this.section('Нові добірки').getByRole('article');
  }

  get recentReviewCards(): Locator {
    return this.section('Нові відгуки').locator('.home-reviews-content');
  }

  get newArticleCards(): Locator {
    return this.section('Нові статті').getByRole('article');
  }

  get allCollectionsLink(): Locator {
    return this.section('Нові добірки').getByRole('link', { name: 'Переглянути всі добірки' });
  }

  get allReviewsLink(): Locator {
    return this.section('Нові відгуки').getByRole('link', { name: 'Переглянути всі відгуки' });
  }

  get allArticlesLink(): Locator {
    return this.main.getByRole('link', { name: 'Переглянути всі статті' });
  }

  private section(title: string): Locator {
    return this.main.locator('.ui.responsive.grid').filter({ hasText: title }).first();
  }
}
