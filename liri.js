require("dotenv").config();
var keys = require("./keys.js");
var Concert = require("./Concert.js"); 
var Spotify = require("./SpotifyLiri.js");

var rawInput = process.argv;

function getCommand() {
    if (rawInput[2])
        return rawInput[2].toLowerCase();
    else
        return null
}

function getInput() {
    var list = rawInput.slice(3, rawInput.length);
    return list.join(" ");
}

function run() {

    var command = getCommand();
    var input = getInput();

    switch (command) {
        case "concert-this":
            console.log(command + " " + input);
            var c = new Concert(input);
            c.getResults();
            break;

        case "spotify-this-song":
            console.log(command + " " + input);
            var s = new Spotify(input);
            s.getResults();
            break;
            
        case "movie-this":
            console.log(command + " " + input);
            break;
        case "do-what-it-says":
            console.log(command + " " + input);
            break;
        default:
            console.log(command + " is not a valid command. The following are allowed:");
            console.log(
                "concert-this \n" +
                "spotify-this-song \n" +
                "movie-this \n" +
                "do-what-it-says \n");
    }

}


run();