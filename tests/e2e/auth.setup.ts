import { chmod, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { expect, test } from '@playwright/test';
import { LoginPage, ProfilePlanningPage } from '../../src/pages/index.js';

const authFile = resolve('playwright/.auth/user.json');

test.use({ trace: 'off', screenshot: 'off', video: 'off' });

test('authenticate and save browser state', async ({ page, context }) => {
  const appEmail = process.env.APP_EMAIL;
  const appPassword = process.env.APP_PASSWORD;

  if (!appEmail || !appPassword) {
    throw new Error('APP_EMAIL and APP_PASSWORD are required by the auth setup project.');
  }

  await page.goto('/login');
  const loginPage = new LoginPage(page);
  await expect(loginPage.heading).toHaveText('Авторизація');
  await loginPage.emailInput.fill(appEmail);
  await loginPage.passwordInput.fill(appPassword);
  await loginPage.submitButton.click();

  await page.goto('/profile/planning');
  await expect(page).toHaveURL(/\/profile\/planning$/);
  await expect(new ProfilePlanningPage(page).profileTab).toBeVisible();

  await mkdir(dirname(authFile), { recursive: true, mode: 0o700 });
  await context.storageState({ path: authFile });
  await chmod(authFile, 0o600);
});
