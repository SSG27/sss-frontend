import { test, expect } from '@playwright/test';

test('Search for a valid country code', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByPlaceholder('Enter country code').fill('ae');
  await page.getByRole('button', { name: 'Search' }).click();
  await expect(page.getByText('Amazon Prime')).toBeVisible();
});
  
test('Attempt to search with an invalid country code', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByPlaceholder('Enter country code').fill('a');
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'Search' }).click();
  await expect(page.getByText('Invalid country code. Please enter a valid country code.')).toBeVisible();
});

test('Attempt to add country with no data', async ({ page }) => {
  await page.goto('http://localhost:3000/codes');
  await page.getByRole('button', { name: 'Add Country' }).click();
  await expect(page.getByText('All fields (code, country, services) are required.')).toBeVisible();
}); 

test('Attempt to add country with invalid data', async ({ page }) => {
  await page.goto('http://localhost:3000/codes');
  await page.getByPlaceholder('Code').fill('a');
  await page.getByPlaceholder('Country').fill('a');
  await page.getByPlaceholder('Services IDs').fill('1');
  await page.getByRole('button', { name: 'Add Country' }).click();
  await expect(page.getByText('Code must be exactly two letters.')).toBeVisible();
});

test('Add country with valid data', async ({ page }) => { 
  await page.goto('http://localhost:3000/codes');
  await page.getByPlaceholder('Code').fill('ab');
  await page.getByPlaceholder('Country').fill('Some Country');
  await page.getByPlaceholder('Services IDs').fill('1, 2');
  await page.getByRole('button', { name: 'Add Country' }).click();
  await expect(page.getByText('Country with code ab successfully added!')).toBeVisible();
});

test('Delete the added country', async ({ page }) => { 
  await page.goto('http://localhost:3000/codes');
  await page.waitForTimeout(7000);
  await page.goto('http://localhost:3000/services');
  await page.goto('http://localhost:3000/codes');
  await page.locator('li').filter({ hasText: 'Some Country' }).getByRole('button').click();
  await expect(page.getByText('Country with code ab successfully deleted!')).toBeVisible();
});

test('Add a service with invalid data', async ({ page }) => {
  await page.goto('http://localhost:3000/services');
  await page.getByPlaceholder('ID').fill('122');
  await page.getByPlaceholder('Name').fill('a');
  await page.getByPlaceholder('Monthly Fee').fill('3 g');
  await page.getByRole('button', { name: 'Add Service' }).click();
  await expect(page.getByText('monthlyFee must only contain numbers, dots, and currency symbols.')).toBeVisible();
});
  
test('Add service with valid data', async ({ page }) => {
  await page.goto('http://localhost:3000/services');
  await page.getByPlaceholder('ID').fill('122');
  await page.getByPlaceholder('Name').fill('a');
  await page.getByPlaceholder('Monthly Fee').fill('£3.50');
  await page.getByRole('button', { name: 'Add Service' }).click();
  await expect(page.getByText('Service with name a successfully created!')).toBeVisible();
});

test('Delete the added service', async ({ page }) => {
  await page.goto('http://localhost:3000/services');
  await page.waitForTimeout(10000);
  await page.locator('li').filter({ hasText: '122' }).getByRole('button').click();
  await expect(page.getByText('Service with name a successfully deleted!')).toBeVisible();
  await page.getByRole('link', { name: 'Home' }).click();
});