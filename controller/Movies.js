require('dotenv').config();
const MOVIE_KEY = process.env.MOVIE_API_KEY;
const MOVIE_URL = process.env.MOVIE_API_URL;
const axios = require('axios');
const Movies = require('../models/Movies');
const Cache = require('../helpers/cache.helper');
let cacheObject = new Cache();


let moviesApiData = async (query) => {

    console.log('Getting The Data From Movies API');

    let queryParams = {
        params: {
            api_key: MOVIE_KEY,
            query: query
        }
    };
    try {
    let response = await axios.get(MOVIE_URL, queryParams);
        
        let data = response.data.results.map(item => new Movies(item));
        
        cacheObject.movies.push({
            "query": query,
            "data": data
        });
        
        return data;

    } catch(err) {
        res.send(err)
    }

}


let getMovies = async (req, res) => {
    let { query } = req.query;

    if ((Date.now() - cacheObject.timeStamp) > 50000){
        console.log('Reset Cache');
        cacheObject = new Cache();
    }

    if (cacheObject.movies.length) {
        let filteredData = cacheObject.movies.find((location) => {
            return location.query === query ;
        });
        if (filteredData) {
            console.log('Getting The Data From The Cache');
            res.json(filteredData.data);
        }  else {   
        res.json(await moviesApiData(query));
        }
     } else {
      res.json(await moviesApiData(query));

    }  

}

module.exports = getMovies;