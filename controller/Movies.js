require('dotenv').config();
const MOVIE_KEY = process.env.MOVIE_API_KEY;
const MOVIE_URL = process.env.MOVIE_API_URL;
const axios = require('axios');
const Movies = require('../models/Movies');

async function getMovies(req, res) {


    let { query } = req.query;

    let queryParams = {
        params: {
            api_key: MOVIE_KEY,
            query: query
        }
    };
    axios.get(MOVIE_URL, queryParams).then(arr => {
        
        let dataMovies = arr.data.results.map(item => new Movies(item));
        res.json(dataMovies);
    }).catch(err => {
        res.send(err)
    });

}


module.exports = getMovies;