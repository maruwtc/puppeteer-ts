# Puppeteer with Typescript
Puppeteer with Typescript

# Usage

```bash
pnpm install
pnpm start
```

```typescript
// Navigate the page to a URL
await page.goto('https://developer.chrome.com/');

// Set screen size
await page.setViewport({ width: 1080, height: 1024 });

// Type into search box
await page.locator('.devsite-search-field').fill('automate beyond recorder');

// Wait and click on first result
await page.locator('.devsite-result-item-link').click();

// Locate the full title with a unique string
const textSelector = await page
    .locator('text/Customize and automate')
    .waitHandle();

const fullTitle: string | null = await textSelector?.evaluate(
    (el: Element) => el.textContent
);

Can pause by injecting a "debugger;" statement. Uncomment to see the magic
await page.evaluate(() => { debugger; });

// Print the full title
if (fullTitle) {
    console.log('The title of this blog post is "%s".', fullTitle);
} else {
    console.log('Title not found');
}
```