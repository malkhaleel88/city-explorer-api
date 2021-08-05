require('dotenv').config();
const WEATHERBIT_KEY = process.env.WEATHERBIT_API_KEY;
const WEATHERBIT_URL = process.env.WEATHERBIT_API_URL;
const axios = require('axios');
const Forecast = require('../models/Forecast');
const Cache = require('../helpers/cache.helper');
let cacheObject = new Cache();


let weatherBitData = async (lat, lon) => {

    console.log('Getting The Data From WeatherBit API');
    let queryParams = {
        params: {
            key: WEATHERBIT_KEY,
            lat: lat,
            lon: lon
        }
    };
    try {
    let response = await axios.get(WEATHERBIT_URL, queryParams)
    
    

        let data = response.data.data.map(item => new Forecast(item));

        cacheObject.forecast.push({
            "lat": lat,
            "lon": lon,
            "data": data
        });

        return data;

    } catch(err) {
        res.send(err);
    
    }
}


let getWeather = async (req, res) => {
    let { lat, lon } = req.query;

    if ((Date.now() - cacheObject.timeStamp) > 50000){
        console.log('Reset Cache');
        cacheObject = new Cache();
    }

    if (cacheObject.forecast.length) {
        let filteredData = cacheObject.forecast.find((location) => {
            return location.lat === lat && location.lon === lon;
        });
        if (filteredData) {
            console.log('Getting The Data From The Cache');
            res.json(filteredData.data);
        }  else {   
        res.json(await weatherBitData(lat, lon));
        }
     } else {
      res.json(await weatherBitData(lat, lon));

    }

}

module.exports = getWeather;