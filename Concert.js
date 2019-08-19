
var keys = require("./keys.js");
var axios = require("axios");
var Helper = require("./helper.js");


function ConcertController(artistOrBandName) {
    this.artistOrBandName = artistOrBandName;
    this.concertList = [];

    this.getAPIURL = function () {
        return "https://rest.bandsintown.com/artists/" + this.artistOrBandName + "/events?app_id=" + keys.bandsintown.id;
    }

    this.getResults = function () {
        var url = this.getAPIURL();
        console.log("Making a call: " + url + "\n");

        axios.get(url).then(function (response) {

            if (!(response.data.indexOf("warn") > 0)) {
                this.concertList = new Array(response.data.length);
                var recordToSave = "";

                for (var i = 0; i < response.data.length; i++) {
                    var v = response.data[i];

                    var cv = new ConcertModel(v.id, v.venue.name, v.venue.city, v.venue.region, v.venue.country, v.datetime);
                    console.log(cv.toString());
                    recordToSave += cv.toString() + "\n";
                    this.concertList.push(cv);
                }

                if (this.concertList.length > 0) {
                    new Helper().saveTextToFile("concert-this " + artistOrBandName, recordToSave);
                } else{
                    console.log("No record found.");
                }

            } else {
                console.log("Result Not found: " + response.data);
            }

        }).catch(function (error) {
            console.log(error);
        });
    }

}


function ConcertModel(id, venue, locationCity, locationRegion, locationCountry, date) {
    this.id = id;
    this.venue = venue;
    this.locationCity = locationCity;
    this.locationRegion = locationRegion;
    this.locationCountry = locationCountry;
    this.date = date;

    this.toString = function () {
        return " ==> Event at Venue \"" + this.venue +
            "\" at " + this.locationCity + ", " + this.locationRegion + ", " + this.locationCountry +
            " on (" + this.date + ")";
    }
}

module.exports = ConcertController;
