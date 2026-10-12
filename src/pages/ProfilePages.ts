import type { Locator, Page } from '@playwright/test';
import { ProfileReviewNavigationComponent } from '../components/ProfileReviewNavigationComponent.js';
import { BasePage } from './BasePage.js';

abstract class ProfileSectionPage extends BasePage {
  protected constructor(page: Page) {
    super(page);
  }

  get profileTab(): Locator {
    return this.main.getByRole('link', { name: 'Профіль', exact: true });
  }

  get planningTab(): Locator {
    return this.main.getByRole('link', { name: /^Хочу відвідати \d+$/ });
  }

  get visitedTab(): Locator {
    return this.main.getByRole('link', { name: /^Відвідав \d+$/ });
  }

  get reviewsTab(): Locator {
    return this.main.getByRole('link', { name: /^Мої відгуки \d+$/ });
  }

  get sectionHeading(): Locator {
    return this.main.getByRole('heading', { level: 2 }).first();
  }
}

export class ProfilePage extends ProfileSectionPage {
  constructor(page: Page) {
    super(page);
  }

  get avatarInput(): Locator {
    return this.page.locator('input[type="file"]');
  }

  get nameInput(): Locator {
    return this.page.getByPlaceholder("Введіть ім'я", { exact: true });
  }

  get emailInput(): Locator {
    return this.page.getByPlaceholder('Email', { exact: true });
  }

  get genderSelect(): Locator {
    return this.page.locator('select[name="gender"]');
  }

  get birthDaySelect(): Locator {
    return this.page.locator('select[name="birth_day"]');
  }

  get birthMonthSelect(): Locator {
    return this.page.locator('select[name="birth_month"]');
  }

  get birthYearSelect(): Locator {
    return this.page.locator('select[name="birth_year"]');
  }

  get websiteInput(): Locator {
    return this.page.getByPlaceholder('https://website.com', { exact: true });
  }

  get facebookInput(): Locator {
    return this.page.getByPlaceholder('https://www.facebook.com/nickname', { exact: true });
  }

  get instagramInput(): Locator {
    return this.page.getByPlaceholder('https://www.instagram.com/nickname', { exact: true });
  }

  get telegramInput(): Locator {
    return this.page.getByPlaceholder('https://t.me/nickname', { exact: true });
  }

  get aboutTextarea(): Locator {
    return this.page.getByPlaceholder('Розкажіть про себе...', { exact: true });
  }

  get saveProfileLink(): Locator {
    return this.page.getByRole('link', { name: 'Зберегти дані', exact: true });
  }

  get typicalEmailsCheckbox(): Locator {
    return this.page.locator('input[name="send_typical_emails"]');
  }

  get promotionalEmailsCheckbox(): Locator {
    return this.page.locator('input[name="send_promo_emails"]');
  }

  get saveNotificationsLink(): Locator {
    return this.page.getByRole('link', { name: 'Зберегти налаштування сповіщень', exact: true });
  }

  get publicProfileCheckbox(): Locator {
    return this.page.locator('input[name="is_public"]');
  }

  get publicProfileLink(): Locator {
    return this.page.getByRole('link', { name: 'цим посиланням', exact: true });
  }

  get savePrivacyLink(): Locator {
    return this.page.getByRole('link', { name: 'Зберегти налаштування приватності', exact: true });
  }

  get currentPasswordInput(): Locator {
    return this.page.getByPlaceholder('Введіть ваш поточний пароль', { exact: true });
  }

  get newPasswordInput(): Locator {
    return this.page.getByPlaceholder('Введіть новий пароль', { exact: true });
  }

  get changePasswordLink(): Locator {
    return this.page.getByRole('link', { name: 'Змінити пароль', exact: true });
  }
}

export class ProfilePlanningPage extends ProfileSectionPage {
  constructor(page: Page) {
    super(page);
  }
}

export class ProfileVisitedPage extends ProfileSectionPage {
  constructor(page: Page) {
    super(page);
  }
}

export class ProfileReviewsPage extends ProfileSectionPage {
  readonly reviewNavigation: ProfileReviewNavigationComponent;

  constructor(page: Page) {
    super(page);
    this.reviewNavigation = new ProfileReviewNavigationComponent(this.main);
  }

  get reviewListTab(): Locator {
    return this.reviewNavigation.reviewListTab;
  }

  get repliesTab(): Locator {
    return this.reviewNavigation.repliesTab;
  }
}

export class ProfileReviewRepliesPage extends ProfileSectionPage {
  readonly reviewNavigation: ProfileReviewNavigationComponent;

  constructor(page: Page) {
    super(page);
    this.reviewNavigation = new ProfileReviewNavigationComponent(this.main);
  }

  get reviewListTab(): Locator {
    return this.reviewNavigation.reviewListTab;
  }

  get repliesTab(): Locator {
    return this.reviewNavigation.repliesTab;
  }
}

export type PublicUserProfileSection = 'about' | 'planning' | 'visited' | 'reviews';

export class PublicUserProfilePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async openUser(userId: string | number, section: PublicUserProfileSection = 'about'): Promise<void> {
    const id = String(userId);

    if (!/^\d+$/.test(id)) {
      throw new Error(`Expected a numeric Funtime user ID, received: ${id}`);
    }

    const path = section === 'about' ? `/users/${id}` : `/users/${id}/${section}`;
    await this.open(path);
  }

  get aboutTab(): Locator {
    return this.main.getByRole('link', { name: 'Про користувача', exact: true });
  }

  get planningTab(): Locator {
    return this.main.getByRole('link', { name: /^Планує \d+$/ });
  }

  get visitedTab(): Locator {
    return this.main.getByRole('link', { name: /^Відвідав \d+$/ });
  }

  get reviewsTab(): Locator {
    return this.main.getByRole('link', { name: /^Відгуки \d+$/ });
  }

  get informationHeading(): Locator {
    return this.main.getByRole('heading', { name: 'Інформація про користувача', exact: true });
  }

  get sectionHeading(): Locator {
    return this.main.getByRole('heading', { level: 2 }).first();
  }
}
