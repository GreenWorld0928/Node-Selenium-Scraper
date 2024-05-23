const express = require('express');
const scrapeProducts = require('./scraper');


const app = express();
const PORT = process.env.PORT || 8080;

app.all('/pcs/products', async (req, res) => {
    try {
        const scrapeData = await scrapeProducts();
        res.status(200).send('Products scraped successfully.'+ scrapeData);
    } catch (error) {
        console.error('Error scraping products:', error);
        res.status(500).send('Error scraping products.');
    }
});

app.get('/pcs/status', async (req, res) => {
    res.status(200).send('PCS is running!')
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});