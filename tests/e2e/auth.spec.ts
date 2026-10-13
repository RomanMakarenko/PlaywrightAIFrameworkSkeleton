import { test, expect } from '@playwright/test';
import { FUNTIME_BASE_URL } from '../../src/config/testConfig.js';
import { LoginPage, ProfilePlanningPage } from '../../src/pages/index.js';

const appEmail = process.env.APP_EMAIL;
const appPassword = process.env.APP_PASSWORD;

test.use({ trace: 'off', screenshot: 'off', video: 'off' });

test('AUTH-002: positive login grants read-only access to the planning list', async ({
    page,
    browserName,
  }) => {
    test.skip(browserName !== 'chromium', 'Run the authenticated production journey in Chromium only.');

    if (!appEmail || !appPassword) {
      test.skip(true, 'Set APP_EMAIL and APP_PASSWORD in the test process to run this case.');
      return;
    }

    await page.goto('/login');
    const loginPage = new LoginPage(page);
    await expect(loginPage.heading).toHaveText('Авторизація');
    await loginPage.emailInput.fill(appEmail);
    await loginPage.passwordInput.fill(appPassword);
    await loginPage.submitButton.click();

    await page.goto('/profile/planning');
    await expect(page).toHaveURL(`${FUNTIME_BASE_URL}/profile/planning`);
    await expect(new ProfilePlanningPage(page).profileTab).toBeVisible();
});
