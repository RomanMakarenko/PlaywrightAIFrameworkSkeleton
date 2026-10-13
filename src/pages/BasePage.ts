import type { Locator, Page } from '@playwright/test';
import { SiteFooterComponent } from '../components/SiteFooterComponent.js';
import { SiteNavigationComponent } from '../components/SiteNavigationComponent.js';
import { FUNTIME_BASE_URL } from '../config/testConfig.js';

export abstract class BasePage {
  readonly main: Locator;
  readonly navigation: Locator;
  readonly footer: Locator;
  readonly siteNavigation: SiteNavigationComponent;
  readonly siteFooter: SiteFooterComponent;

  protected constructor(readonly page: Page) {
    this.main = page.getByRole('main').first();
    this.navigation = page.getByRole('navigation');
    this.footer = page.getByRole('contentinfo');
    this.siteNavigation = new SiteNavigationComponent(this.navigation);
    this.siteFooter = new SiteFooterComponent(this.footer);
  }

  async open(path: string): Promise<void> {
    const url = new URL(path, FUNTIME_BASE_URL);

    if (url.origin !== FUNTIME_BASE_URL) {
      throw new Error(`Expected a Funtime path, received: ${path}`);
    }

    await this.page.goto(url.toString());
  }

  get heading(): Locator {
    return this.main.getByRole('heading', { level: 1 }).first();
  }
}
