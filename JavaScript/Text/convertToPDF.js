const puppeteer = require('puppeteer');
const fs = require('fs');

// Function to delay execution
function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

(async () => {
    // Launch a headless browser
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate to the protected page and wait for it to load
    await page.goto('https://v2-sandbox.aurorasolar.com/e-proposal/MMVaAQ3UkA7U_HD7sj-d4whhZbRTL4JgthXWFy91OhI', {
        waitUntil: 'networkidle2',  // Wait for the network to be idle
    });

    console.log('Page loaded. Waiting for 2 minutes before generating PDF...');

    // Wait for 2 minutes (120000 milliseconds) after page load
    await delay(120000);

    // After 2 minutes, proceed to convert the page to PDF
    await page.pdf({
        path: 'proposal.pdf',       // Output file
        format: 'A4',               // Page format
        printBackground: true,      // Print CSS background
    });

    console.log('PDF generated successfully.');

    // Close the browser
    await browser.close();
})();
