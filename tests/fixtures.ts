import { test as base, expect } from '@playwright/test';
import { CatalogPage } from '../src/pages/CatalogPage.js';

type TestFixtures = {
  catalogPage: CatalogPage;
};

export const test = base.extend<TestFixtures>({
  catalogPage: async ({ page }, use) => {
    await use(new CatalogPage(page));
  },
});

export { expect };
