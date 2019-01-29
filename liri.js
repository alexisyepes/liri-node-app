require("dotenv").config();

var keys = require("./keys.js");
var fs = require('fs');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var request = require("request");
var movieName = process.argv[3];
var liriReturn = process.argv[2];
var moment = require('moment');

switch (liriReturn) {
    case "concert-this":
        concertThis();
        break;

    case "spotify-this-song":
        spotifyThisSong();
        break;

    case "movie-this":
        movieThis();
        break;

    case "do-what-it-says":
        doWhatItSays();
        break;

    default: console.log("\n" + "please type any command after: node liri.js: " + "\n" +
        "concert-this  any artist/band name " + "\n" +
        "spotify-this-song  any song title " + "\n" +
        "movie-this  any movie title " + "\n" +
        "do-what-it-says  " + "\n"
    );

};

function concertThis() {  

    var artist = process.argv[3];

    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

        request(queryUrl, function (error, response, data) {

            if (!error && response.statusCode === 200) {
                var bandReturn = JSON.parse(data)

                for (let i = 0; i < bandReturn.length; i++) {
                    var event = bandReturn[i]
                    console.log("**********************LIRI FOUND THESE RESULTS FOR YOU**********************" + 
                    "\n" + artist + "\nVenue: " + event.venue.name + "\nCity: " + event.venue.city + "\nDate: " + moment(event.datetime).format("MM/DD/YYYY"));

                    var textResults = "**********************LIRI FOUND THESE RESULTS FOR YOU**********************" + 
                    "\n" + artist + "\nVenue: " + event.venue.name + "\nCity: " + event.venue.city + "\nDate: " + moment(event.datetime).format("MM/DD/YYYY") + "\n";

                    fs.appendFile("log.txt", textResults, function(err) {

                        if (err) {
                          console.log("Error: "+ err);
                        }
            
                        else {
                          console.log("Content added to log.txt");
                        }
                      
                      });
                }
            }
        });

       
};

function spotifyThisSong(songName) {
    var songName = process.argv[3];
    if (!songName) {
        songName = "The Sign";
    };
    songRequest = songName;
    spotify.search({
        type: "track",
        query: songRequest
    },
        function (err, data) {
            if (!err) {
                var trackInfo = data.tracks.items;
                for (var i = 0; i < 5; i++) {
                    if (trackInfo[i] != undefined) {
                        var spotifyResults =
                            "Artist: " + trackInfo[i].artists[0].name + "\n" +
                            "Song: " + trackInfo[i].name + "\n" +
                            "Preview URL: " + trackInfo[i].preview_url + "\n" +
                            "Album: " + trackInfo[i].album.name + "\n"

                        console.log("**********************LIRI FOUND THESE RESULTS FOR YOU**********************" + "\n" +
                        + "\n" + spotifyResults);
                        console.log(' ');
                        fs.appendFile("log.txt", "\n" + "**********************LIRI FOUND THESE RESULTS FOR YOU**********************" + "\n" + spotifyResults + "\n", function(err) {

                            if (err) {
                              console.log("Error: "+ err);
                            }
                
                            else {
                              console.log("Content added to log.txt");
                            }
                          
                          });
                    };
                };
            } else {
                console.log("error: " + err);
                return;
            };
        });
};

function movieThis() {

    if (!movieName) {
        movieName = "Mr Nobody"
    };
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=e2bed0cc";


    request(queryUrl, function (error, response, body) {



        if (!error && response.statusCode === 200) {

            var myMovieData = JSON.parse(body);
            var queryUrlResults =
                "Title: " + myMovieData.Title + "\n" +
                "Year: " + myMovieData.Year + "\n" +
                "IMDB Rating: " + myMovieData.Ratings[0].Value + "\n" +
                "Rotten Tomatoes Rating: " + myMovieData.Ratings[1].Value + "\n" +
                "Origin Country: " + myMovieData.Country + "\n" +
                "Language: " + myMovieData.Language + "\n" +
                "Plot: " + myMovieData.Plot + "\n" +
                "Actors: " + myMovieData.Actors + "\n"

            console.log("**********************LIRI FOUND THESE RESULTS FOR YOU**********************" + "\n" +
            queryUrlResults);
            fs.appendFile("log.txt","\n" + "**********************LIRI FOUND THESE RESULTS FOR YOU**********************" + "\n" + queryUrlResults + "\n", function(err) {

                if (err) {
                  console.log("Error: "+ err);
                }
    
                else {
                  console.log("Content added to log.txt");
                }
              
              });
        } else {
            console.log("error: " + err);
            return;
        };
    });
};

function doWhatItSays() {

    fs.writeFile("random.txt", 'spotify-this-song, "I want it this way"', function (err) {
        var song = "spotify-this-song 'I want it this way'"

        if (err) {
            return console.log(err);
        };

        console.log(song);
        fs.appendFile("log.txt", "\n" + song + "\n", function(err) {

            if (err) {
              console.log("Error: "+ err);
            }

            else {
              console.log("Content added to log.txt");
            }
          
          });
    });
};










