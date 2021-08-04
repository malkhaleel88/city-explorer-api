
const express = require('express');
const server = express();

const weatherData = require('./data/weather.json');
const axios = require('axios');

require('dotenv').config();
const PORT = process.env.PORT;
const WEATHERBIT_KEY = process.env.WEATHERBIT_API_KEY;
const WEATHERBIT_URL = process.env.WEATHERBIT_API_URL;
const MOVIE_KEY = process.env.MOVIE_API_KEY;
const MOVIE_URL = process.env.MOVIE_API_URL;


const cors = require('cors');
server.use(cors());

class Forecast {
    constructor(value) {
        this.description = `Low of ${value.low_temp}, high of ${value.high_temp} with ${value.weather.description}`;
        this.datetime = value.datetime;

    }
}

class Movies {
    constructor(element) { 
        this.title = element.title;
        this.overview = element.overview;
        this.avgVotes = element.vote_average;
        this.totalVotes = element.vote_count;
        this.imgUrl = `https://image.tmdb.org/t/p/w500${element.backdrop_path}`;
        this.popularity = element.popularity;
        this.releasedOn = element.release_date;
    
    }
}


server.get('/', (req, res) => {

    res.send("Hello From My Server");
});

server.get('/weather', async(req, res) => {


        let {lat, lon} = req.query;

        let queryParams = {
            params:{
                key: WEATHERBIT_KEY,
                lat: lat,
                lon: lon
            }
        };
        let responseWeather = await axios.get(WEATHERBIT_URL, queryParams);
        let dataWeather = responseWeather.data.data.map(item => new Forecast(item));
        res.send(dataWeather);

});

server.get('/movies', async(req, res) => {


    let {q} = req.query;

    let queryParams = {
        params:{
            key: MOVIE_KEY,
            q: q
        }
    };
    let responseMovies = await axios.get(MOVIE_URL, queryParams);
    let dataMovies = responseMovies.data.data.map(item => new Movies(item));
    res.send(dataMovies);

});


server.listen(PORT, () => {
    console.log(`Listening PORT = ${PORT}`);
});

// server.get('/weather', (req, res) => {

//     try {

//         let {searchQuery, lat, lon} = req.query;

//         let cityData = weatherData.find(item =>
//             item.city_name.toLocaleLowerCase() === searchQuery.toLocaleLowerCase() ||
//             (item.lat === lat && item.lon === lon)
//         );
//         let forecastArr = cityData.data.map(element => new Forecast(element));

//         res.send(forecastArr);
//     }

//     catch {
//         res.status(404).send(' ');
//     }

// });




