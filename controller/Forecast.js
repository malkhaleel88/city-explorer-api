require('dotenv').config();
const WEATHERBIT_KEY = process.env.WEATHERBIT_API_KEY;
const WEATHERBIT_URL = process.env.WEATHERBIT_API_URL;
const axios = require('axios');
const Forecast = require('../models/Forecast');

async function getWeather(req, res) {


    let { lat, lon } = req.query;

    let queryParams = {
        params: {
            key: WEATHERBIT_KEY,
            lat: lat,
            lon: lon
        }
    };
    axios.get(WEATHERBIT_URL, queryParams).then(arr => {
        
        let dataWeather = arr.data.data.map(item => new Forecast(item));
        res.json(dataWeather);

    }).catch(err =>
        res.send(err)
    );

}

module.exports = getWeather;