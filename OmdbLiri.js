var keys = require("./keys.js");
var Helper = require("./helper.js");
var axios = require("axios");

function OMDBController(movieName) {

    this.movieName = movieName;

    this.getResults = function () {

        var queryUrl = "http://www.omdbapi.com/?t=" + this.movieName + "&y=&plot=short&apikey=trilogy";
        console.log(queryUrl);
        axios.get(queryUrl).then(this.callbackHanlder).catch(this.callbackErrorHandler);
    }

    this.callbackHanlder = function (response) {
        var r = response.data;
        var o = new OMDBModel(r.Title, r.Year, r.Rated, r.Ratings[1].Value, r.Country, r.Language, r.Plot, r.Actors);
        console.log(o.toString());

        new Helper().saveTextToFile("movie-this " + this.movieName, o.toString());

    }

    this.callbackErrorHandler = function (error) {
        console.log(error);
    }
}
/*
    * Title of the movie.
   * Year the movie came out.
   * IMDB Rating of the movie.
   * Rotten Tomatoes Rating of the movie.
   * Country where the movie was produced.
   * Language of the movie.
   * Plot of the movie.
   * Actors in the movie.
*/
function OMDBModel(title, yearCameOut, rating, rotterTomatoesRating, productioncountry, movieLangugage, plot, actors) {

    this.title = title;
    this.yearCameOut = yearCameOut;
    this.rating = rating;
    this.rotterTomatoesRating = rotterTomatoesRating;
    this.productioncountry = productioncountry;
    this.movieLangugage = movieLangugage;
    this.plot = plot;
    this.actors = actors;

    this.toString = function () {
        var r = " ==> Movie: " + this.Title + "\n";
        r += " ==> OMDB rated " + this.rating + " | Rotten Tomatoes Rating: " + rotterTomatoesRating + "\n";
        r += " ==> Produced in " + this.productioncountry + " made in the " + this.movieLangugage + " language" + "\n";
        r += " ==> Plot: " + this.plot + "\n";
        r += " ==> Actors: " + this.actors + "\n";
        r += "******************************************";

        return r;

    }
}

module.exports = OMDBController;
