require("dotenv").config();
var keys = require("./keys.js");
var Concert = require("./Concert.js");
var Spotify = require("./SpotifyLiri.js");
var Omdb = require("./OmdbLiri.js");
var fs = require('fs');


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

    callService(command, input);
}

function callService(command, input) {
    console.log(command + " " + input);

    switch (command) {
        case "concert-this":
            var c = new Concert(input);
            c.getResults();
            break;

        case "spotify-this-song":
            if (input == null) {
                input = "The Sign";

            } else if (input.trim().length == 0) {
                input = "The Sign";
            }

            var s = new Spotify(input);
            s.getResults();
            break;

        case "movie-this":
            if (input == null) {
                input = "Mr. Nobody";
            } else if (input.trim().length == 0) {
                input = "Mr. Nobody";
            }

            var o = new Omdb(input);
            o.getResults();
            break;

        case "do-what-it-says":
            fs.readFile('./random.txt', "utf8", function read(err, data) {
                if (err) {
                    throw err;
                }
                splitData = data.split(",");
                callService(splitData[0], splitData[1]);
            });


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