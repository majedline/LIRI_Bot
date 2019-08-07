
var keys = require("./keys.js");
var axios = require("axios");


function Concert(artistOrBandName) {
    this.artistOrBandName = artistOrBandName;
    this.concertList = {};

    this.getAPIURL = function () {
        return "https://rest.bandsintown.com/artists/" + this.artistOrBandName + "/events?app_id=" + keys.bandsintown.id;
    }

    this.getResults = function () {
        var url = this.getAPIURL();
        console.log("Making a call: " + url);

        axios.get(url).then(function (response) {
            // console.log(response.data);
            this.concertList = new Array(response.data.length);

            for (var i = 0; i < response.data.length; i++) {
                // console.log(response.data[i].venue.name);
                var v = response.data[i];

                var cv = new ConcertView(v.id, v.venue.name, v.venue.city, v.venue.region, v.venue.country, v.datetime);
                console.log(cv.toString());
                this.concertList.push(cv);
            }

            //saveToFile(this.showDetails.getDetails());

        }).catch(function (error) {
            console.log(error);
        });
    }

}


function ConcertView(id, venue, locationCity, locationRegion, locationCountry, date) {
    this.id = id;
    this.venue = venue;
    this.locationCity = locationCity;
    this.locationRegion = locationRegion;
    this.locationCountry = locationCountry;
    this.date = date;

    this.toString = function () {
        return "Event at Venue " + this.venue +
            " at " + this.locationCity + ", " + this.locationRegion + ", " + this.locationCountry +
            " on " + this.date;
    }
}

module.exports = Concert;
