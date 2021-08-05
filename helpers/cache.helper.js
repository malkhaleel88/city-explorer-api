class Cache {
    constructor(data){
        this.forecast = [];
        this.timeStamp = Date.now();
        this.movies = [];
    }
}

module.exports = Cache;