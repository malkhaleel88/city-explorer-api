class Forecast {
    constructor(value) {
        this.description = `Low of ${value['low_temp']}, high of ${value['high_temp']} with ${value.weather.description}`;
        this.datetime = value.datetime;

    }
}

module.exports = Forecast;