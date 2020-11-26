// Libraries
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const withQuery = require('with-query').default;

// Environment
const PORT = parseInt(process.argv[2] || process.env.PORT) || 3000
const ENDPOINT = "https://api.jikan.moe/v3/search/"

// Instances
const app = express();

// Express configuration
// Add CORS header to response
app.use(cors())

// API query
const getMalResults = async (medium, seriesTitle) => {
    const url = withQuery(
        `${ENDPOINT}${medium}`, {
            q: seriesTitle || " "
        }
    );
    console.log(url);
    let result = await fetch(url);
    try {
        let rawResult = await result.json();
        console.log(rawResult);
        return rawResult;
    } catch (e) {
        console.error('ERROR');
        return Promise.reject(e);
    }
};

// Resources
app.get('/search/:medium/:q', async (req, res) => {

    const medium = req.params.medium;
    const title = req.params.q;

    try {
        const resultsRaw = await getMalResults(medium, title);

        const results = resultsRaw.results;

        res.status(200);
        res.type('application/JSON');
        res.json(results);
    } catch (e) {
        console.info(e)
        res.status(500);
        res.type('text/html');
        res.send(JSON.stringify(e));
    }


})

// Start connection
app.listen(PORT, () => {
    console.log(`Application started on port ${PORT} at ${new Date()}`);
});