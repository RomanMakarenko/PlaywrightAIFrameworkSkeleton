import type { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage.js';

export abstract class AuthPage extends BasePage {
  protected constructor(page: Page) {
    super(page);
  }

  get heading(): Locator {
    return this.page.getByRole('heading', { level: 1 });
  }
}

export class LoginPage extends AuthPage {
  constructor(page: Page) {
    super(page);
  }

  get emailInput(): Locator {
    return this.page.getByRole('textbox', { name: 'Введіть email', exact: true });
  }

  get passwordInput(): Locator {
    return this.page.getByRole('textbox', { name: 'Введіть пароль', exact: true });
  }

  get submitButton(): Locator {
    return this.page.getByRole('button', { name: 'Увійти', exact: true });
  }

  get registerLink(): Locator {
    return this.page.getByRole('link', { name: 'Зареєструватись?', exact: true });
  }

  get resetPasswordLink(): Locator {
    return this.page.getByRole('link', { name: 'Забули пароль?', exact: true });
  }
}

export class RegistrationPage extends AuthPage {
  constructor(page: Page) {
    super(page);
  }

  get nameInput(): Locator {
    return this.page.getByRole('textbox', { name: "Введіть ім'я", exact: true });
  }

  get emailInput(): Locator {
    return this.page.getByRole('textbox', { name: 'Введіть email', exact: true });
  }

  get passwordInput(): Locator {
    return this.page.getByRole('textbox', { name: 'Введіть пароль', exact: true });
  }

  get submitButton(): Locator {
    return this.page.getByRole('button', { name: 'Зареєструватись', exact: true });
  }
}

export class PasswordResetPage extends AuthPage {
  constructor(page: Page) {
    super(page);
  }

  get emailInput(): Locator {
    return this.page.getByRole('textbox', { name: 'Введіть email', exact: true });
  }

  get submitButton(): Locator {
    return this.page.getByRole('button', { name: 'Скинути', exact: true });
  }
}
