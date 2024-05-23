const { Builder, By, Capabilities, Key, until } = require('selenium-webdriver');
const { Options } = require('selenium-webdriver/chrome');

// Define the URL you want to scrape
const url = 'https://supplier.getyourguide.com/login/#';

// Define the scraping logic
async function scrapeProducts() {
    
    const options = new Options();
    options.addArguments("--headless=new");
    const driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();

    try {
        // Navigate to the URL
        await driver.get(url);

        // Perform scraping tasks
        // Example: Find an element by CSS selector and get text
        const emailInput = await driver.wait(until.elementLocated(By.id('email')), 10000);
        const passwordInput = await driver.wait(until.elementLocated(By.id('password')), 10000);
        const loginButton = await driver.wait(until.elementLocated(By.className('p-button rounded-full')), 10000);
        await emailInput.sendKeys('lokafy.cad@gmail.com');
        await passwordInput.sendKeys('Mandolin3510!');
        // Click the login button
        await loginButton.click();
        console.log("finished")
        const productsURL = `https://supplier.getyourguide.com/products/list#includeReviewRating=true&page=1&status=all`;
        await driver.get(productsURL);
        
        return "";
    } finally {
        // Quit the driver after scraping is done
        if (driver) {
            await driver.quit();
        }
    }
}

module.exports = scrapeProducts;
