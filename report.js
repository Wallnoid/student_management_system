const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        const reportPath = path.resolve(__dirname, 'reports/test-report.html');
        await page.goto(`file://${reportPath}`, { waitUntil: 'networkidle0' });
        await browser.close();
    } catch (error) {
        console.error(error);
    }
})();