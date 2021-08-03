
const express = require('express');
const weatherData = require('./data/weather.json');
require('dotenv').config();
const cors = require('cors');
const server = express();
const PORT = process.env.PORT;
server.use(cors());


server.get('/', (req, res) => {

    res.send("Hello From My Server");
});


server.get('/weatherDate', (req, res) => {

    let name = req.query.q;

    name = name.charAt(0).toUpperCase() + name.slice(1);
    let lon = request.query.lon;
    let lat = request.query.lat;

    let weatherArr = weatherData.find((element) => name == element.city_name);
    let dataArray = weatherArr.data.map((element) => {
        let obj = {};
        obj.date = element.datetime;
        obj.description = element.weather.description;
        return obj;
    });

    res.send(dataArray);
});


server.get('*', (req, res) => {

    res.status(500).send('Internal Server Error');

});

server.listen(PORT, () => {
    console.log(`PORT = ${PORT}`);
});