import { test, expect } from '@playwright/test';

test('should display items and handle CRUD operations', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Add item
  await page.fill('input[placeholder="Name"]', 'Test Item');
  await page.fill('input[placeholder="Description"]', 'Test Description');
  await page.click('button:text("Add Item")');
  await page.waitForTimeout(500);

  // Check item exists
  const items = await page.locator('li');
  expect(await items.count()).toBeGreaterThan(0);
  expect(await items.nth(0).textContent()).toContain('Test Item');

  // Edit item
  await page.click('button:text("Edit")');
  await page.fill('input[placeholder="Name"]', 'Updated Item');
  await page.click('button:text("Update Item")');
  await page.waitForTimeout(500);
  expect(await items.nth(0).textContent()).toContain('Updated Item');

  // Delete item
  await page.click('button:text("Delete")');
  await page.waitForTimeout(500);
  expect(await items.count()).toBe(0);
});
