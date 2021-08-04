const express = require('express');
const server = express();

const getWeather = require('./controller/Forecast')
const getMovies = require('./controller/Movies');

require('dotenv').config();
const PORT = process.env.PORT;

const cors = require('cors');
server.use(cors());


server.get('/', (req, res) => {

    res.send("Hello From My Server");
});

server.get('/weather', getWeather);

server.get('/movies', getMovies);

server.listen(PORT, () => {
    console.log(`Listening PORT = ${PORT}`);
});
