import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByPlaceholder('Enter country code').click();
  await page.getByPlaceholder('Enter country code').fill('ar');
  await page.getByRole('button', { name: 'Search' }).click();
  await page.getByPlaceholder('Enter country code').click();
  await page.getByPlaceholder('Enter country code').fill('');
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'Search' }).click();
  await page.getByRole('link', { name: 'Home' }).click();
  await page.getByRole('link', { name: 'Codes' }).click();
  await page.getByPlaceholder('Code').click();
  await page.getByPlaceholder('Code').fill('a');
  await page.getByPlaceholder('Country').click();
  await page.getByPlaceholder('Country').fill('test');
  await page.getByPlaceholder('Services IDs').click();
  await page.getByPlaceholder('Services IDs').fill('1,2,3');
  await page.getByRole('button', { name: 'Add Country' }).click();
  await page.locator('li').filter({ hasText: 'atestServices: 1, 2, 3 Delete' }).getByRole('button').click();
  await page.getByRole('link', { name: 'Services' }).click();
  await page.getByPlaceholder('ID').click();
  await page.getByPlaceholder('ID').fill('123');
  await page.getByPlaceholder('Name').click();
  await page.getByPlaceholder('Name').fill('test');
  await page.getByPlaceholder('Monthly Fee').click();
  await page.getByPlaceholder('Monthly Fee').fill('£12.69');
  await page.getByRole('button', { name: 'Add Service' }).click();
  await page.locator('li').filter({ hasText: '123test£12.69 Delete' }).getByRole('button').click();
  await page.getByRole('link', { name: 'Home' }).click();
  await page.getByPlaceholder('Enter country code').click();
  await page.getByPlaceholder('Enter country code').fill('a');
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'Search' }).click();
});