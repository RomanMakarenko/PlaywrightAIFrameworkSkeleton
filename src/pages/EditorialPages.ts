import type { Locator, Page } from '@playwright/test';
import { BreadcrumbsComponent } from '../components/BreadcrumbsComponent.js';
import { EditorialCommentsComponent } from '../components/EditorialCommentsComponent.js';
import { RelatedEditorialContentComponent } from '../components/RelatedEditorialContentComponent.js';
import { SocialFollowComponent } from '../components/SocialFollowComponent.js';
import { BasePage } from './BasePage.js';

export class EditorialListingPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get heading(): Locator {
    return this.main.getByRole('heading', { level: 1 }).first();
  }

  get entries(): Locator {
    return this.main.getByRole('link');
  }
}

export class EditorialDetailPage extends BasePage {
  readonly breadcrumbs: BreadcrumbsComponent;
  readonly comments: EditorialCommentsComponent;
  readonly relatedContent: RelatedEditorialContentComponent;
  readonly socialFollow: SocialFollowComponent;

  constructor(page: Page) {
    super(page);

    this.breadcrumbs = new BreadcrumbsComponent(this.main.getByRole('list').first());
    this.comments = new EditorialCommentsComponent(
      this.main
        .locator('.ui.doubling.two.column.grid')
        .filter({ has: this.main.getByRole('heading', { name: 'Коментарі', exact: true }) }),
    );
    this.relatedContent = new RelatedEditorialContentComponent(
      this.main
        .locator('section')
        .filter({ has: this.main.getByText('Вас також зацікавить', { exact: true }) }),
    );
    this.socialFollow = new SocialFollowComponent(
      this.main
        .locator('section.ui.center.aligned.grid')
        .filter({ hasText: 'Підписуйтесь на нас' }),
    );
  }

  get pageHeading(): Locator {
    return this.main.getByRole('heading', { level: 1 }).first();
  }

  get shareButton(): Locator {
    return this.main.getByRole('button', { name: 'Поділитись', exact: true });
  }
}
