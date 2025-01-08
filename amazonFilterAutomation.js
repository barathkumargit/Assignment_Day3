const { chromium } = require('playwright');  // Use Playwright's Chromium browser

(async () => {
  // Launch browser
  const browser = await chromium.launch({ headless: false });  // Set to true to run headlessly
  const page = await browser.newPage();

  // Navigate to Amazon's homepage
  await page.goto('https://www.amazon.com');

  // Search for an item
  const searchQuery = 'laptop';  // Modify search term as needed
  await page.fill('input[name="field-keywords"]', searchQuery);
  await page.click('input[type="submit"]');
  
  // Wait for the search results page to load
  await page.waitForSelector('.s-main-slot');

  // Add the first item from the search results to the cart
  await page.click('.s-main-slot .s-result-item:first-child .s-title-instructions-style');
  await page.waitForSelector('#add-to-cart-button');  // Wait for the "Add to Cart" button
  await page.click('#add-to-cart-button');

  // Wait for the "Added to Cart" notification
  await page.waitForSelector('#nav-cart-count');
  
  // Open the cart to verify the item was added
  await page.click('#nav-cart');
  await page.waitForSelector('.sc-list-item');

  // Verify that the cart contains the item
  const cartItem = await page.innerText('.sc-list-item');
  console.log('Cart contains:', cartItem);

  // Close the browser
  await browser.close();
})();
