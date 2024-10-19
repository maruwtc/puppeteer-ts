import puppeteer, { Browser, Page } from 'puppeteer';

const runScraper = async (): Promise<void> => {
    let browser: Browser | null = null;
    try {
        browser = await puppeteer.launch();
        const page: Page = await browser.newPage();

        await page.goto('https://www.google.com/');

        await page.setViewport({ width: 1080, height: 1024 });

        await page.type('textarea', 'github');

        await Promise.all([
            page.keyboard.press('Enter'),
            page.waitForNavigation(),
        ]);

        const topLinks = await page.evaluate(() => {
            const translateRegex = /translate|traducir|traduire|übersetzen|翻訳|перевести|翻譯|번역/i;

            const results = [...document.querySelectorAll('#search a')] as HTMLElement[];
            return results
                .map(el => [el.innerText, el.getAttribute('href')])
                .filter(([title]) => title && !translateRegex.test(title));
        });

        if (topLinks.length > 0) {
            console.log('Top search results:');
            topLinks.forEach(([title, link], index) => {
                console.log(`${index + 1}. ${title?.replace(/\n/g, '')} - ${link}`);
            });
        } else {
            console.log('No search results found');
        }
    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}

runScraper().catch(console.error);