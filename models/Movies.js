class Movies {
    constructor(element) { 
        this.title = element.title;
        this.overview = element.overview;
        this.avgVotes = element.vote_average;
        this.totalVotes = element.vote_count;
        this.imgUrl = `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${element.poster_path}`;
        this.popularity = element.popularity;
        this.releasedOn = element.release_date;
    
    }
}

module.exports = Movies;