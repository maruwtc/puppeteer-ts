import puppeteer, { Browser, Page } from 'puppeteer';

const runScraper = async (): Promise<void> => {
    let browser: Browser | null = null;
    try {
        // Launch the browser and open a new blank page
        browser = await puppeteer.launch();
        const page: Page = await browser.newPage();

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

        // Print the full title
        if (fullTitle) {
            console.log('The title of this blog post is "%s".', fullTitle);
        } else {
            console.log('Title not found');
        }
    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        // Ensure the browser is closed even if an error occurs
        if (browser) {
            await browser.close();
        }
    }
}

runScraper().catch(console.error);