
var keys = require("./keys.js");
var Helper = require("./helper.js");
var Spotify = require('node-spotify-api');


function SpotifyController(songName) {
    this.songName = songName;

    this.getResults = function () {
        var spotify = new Spotify({
            id: keys.spotify.id,
            secret: keys.spotify.secret
        });

        console.log(spotify);

        spotify.search({ type: 'track', query: this.songName }) //'All the Small Things'
            .then(function (response) {
                var items = response.tracks.items;
                var songList = new Array();

                var recordToSave = "";

                for (var i = 0; i < items.length; i++) {

                    var spotSong = new SpotifyModel(
                        items[i].album.id,
                        items[i].album.artists[0].name,
                        items[i].name,
                        items[i].album.external_urls.spotify,
                        items[i].album.name,
                    );

                    console.log(spotSong.toString());
                    recordToSave += spotSong.toString() + "\n";
                    songList.push(spotSong);

                }

                if (songList.length > 0) {
                    new Helper().saveTextToFile("spotify-this-song " + songName, recordToSave);
                } else {
                    console.log("No record found.");
                }

            })
            .catch(function (err) {
                console.log(err);
            });

    }

}


// Artist(s)
// The song's name
// A preview link of the song from Spotify
// The album that the song is from
function SpotifyModel(id, artist, songName, url, album) {
    this.id = id;
    this.artist = artist;
    this.songName = songName;
    this.url = url;
    this.album = album;


    this.toString = function () {
        return " ==> Song: \"" + this.songName +
            "\" by " + this.artist +
            " - Album: \"" + this.album + "\" -- " +
            "URL: " + this.url;
    }
}

module.exports = SpotifyController;
