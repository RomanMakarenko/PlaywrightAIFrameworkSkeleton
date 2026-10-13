import { test, expect } from '@playwright/test';

test('HTTP smoke @smoke: configured Funtime homepage responds successfully', async ({ request }) => {
  const response = await request.get('/');

  expect(response.status()).toBe(200);
});
