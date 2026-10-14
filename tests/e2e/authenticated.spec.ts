import { expect, test } from '@playwright/test';
import { ProfilePlanningPage } from '../../src/pages/index.js';

test.use({ trace: 'off', screenshot: 'off', video: 'off' });

test('authenticated state grants read-only access to the planning list', async ({ page }) => {
  await page.goto('/profile/planning');

  await expect(page).toHaveURL(/\/profile\/planning$/);
  await expect(new ProfilePlanningPage(page).profileTab).toBeVisible();
});
