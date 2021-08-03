
const express = require('express');
const server = express();

const weatherData = require('./data/weather.json');

require('dotenv').config();
const PORT = process.env.PORT;

const cors = require('cors');
server.use(cors());

class Forecast {
    constructor(value) {
        this.description = `Low of ${value.low_temp}, high of ${value.high_temp} with ${value.weather.description}`;
        this.datetime = value.datetime;

    }
}

server.get('/', (req, res) => {

    res.send("Hello From My Server");
});


server.get('/weather', (req, res) => {

    try {

        let {searchQuery, lat, lon} = req.query;

        let cityData = weatherData.find(item =>
            item.city_name.toLocaleLowerCase() === searchQuery.toLocaleLowerCase() ||
            (item.lat === lat && item.lon === lon)
        );
        let forecastArr = cityData.data.map(element => new Forecast(element));

        res.send(forecastArr);
    }

    catch {
        res.status(404).send('No Available Data For City');
    }

});


server.listen(PORT, () => {
    console.log(`Listening PORT = ${PORT}`);
});