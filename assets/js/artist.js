
var topTracks1 = "";
var topArtists = "";
var oppArray = [];
var counter = 0;
var player;
// Initialize Firebase
var config = {
    apiKey: "AIzaSyC_WtTL8GZ0Pm60iGl-Lik8v-bzhm2-ktc",
    authDomain: "lastfmapp-8b30e.firebaseapp.com",
    databaseURL: "https://lastfmapp-8b30e.firebaseio.com",
    projectId: "lastfmapp-8b30e",
    storageBucket: "lastfmapp-8b30e.appspot.com",
    messagingSenderId: "862526842935"
};
firebase.initializeApp(config);

var database = firebase.database();


$(document).ready(function () {
    var imgArray = [];
    var artistArray = [];
    var trackArray = [];
    var userName = "";


    $("#submitButton").click(function () {
        $("#newsletter").removeAttr("hidden");
        $("#slides").attr("hidden");
        $("#idName").empty();
        $("#artist-list").empty();
        $("#song-list").empty();
        $("#imgCol0").empty();
        $("#imgCol1").empty();


        userName = $("#username").val();
        $("#idName").html('<img id=profPic>' + ' ' + userName)

        if (userName == "imxmolina"){
            $("#youtubeDump").html("<iframe width='560' height='315' src='https://www.youtube.com/embed/kbMqWXnpXcA' frameborder='0' allow='autoplay; encrypted-media' allowfullscreen></iframe>")
            $("#youtubeDump2").html("<h1 id='youtube1'> @themisa_s reccomends</h1><iframe width='560' height='315' src='https://www.youtube.com/embed/rRgTMs_bGuI' frameborder='0' allow='autoplay; encrypted-media' allowfullscreen></iframe>")
        }
        else if (userName == "amberface"){
            $("#youtubeDump").html("<iframe width='560' height='315' src='https://www.youtube.com/embed/vZA_7FtttRY' frameborder='0' allow='autoplay; encrypted-media' allowfullscreen></iframe>")
            $("#youtubeDump2").html("<h1 id='youtube1'> @chetchet reccomends</h1><iframe width='560' height='315' src='https://www.youtube.com/embed/HPHbeSGVKJo' frameborder='0' allow='autoplay; encrypted-media' allowfullscreen></iframe>")
        }
        else {
            $("#youtubeDump").html("<iframe width='560' height='315' src='https://www.youtube.com/embed/eOz2U4ukAus' frameborder='0' allow='autoplay; encrypted-media' allowfullscreen></iframe>")
            $("#youtubeDump2").html("<h1 id='youtube1'> @Rudrunk reccomends</h1><iframe width='560' height='315' src='https://www.youtube.com/embed/2MiQonPvlVM' frameborder='0' allow='autoplay; encrypted-media' allowfullscreen></iframe>")
        }


        var artistURL = "https://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=" + userName + "&limit=6&period=7day&api_key=322352869f97292d72744a0a62a42120&format=json";
        var songURL = "https://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=" + userName + "&limit=6&period=7day&api_key=322352869f97292d72744a0a62a42120&format=json";
        var picURL = "https://ws.audioscrobbler.com/2.0/?method=user.getinfo&user=" + userName + "&api_key=322352869f97292d72744a0a62a42120&format=json";

        $.ajax({
            url: picURL,
            method: "GET"
        }).then(function (response) {
            $("#profPic").attr("src", response.user.image[1]["#text"])
            console.log(response.user.image[1]["#text"])
        })

        $.ajax({
            url: artistURL,
            method: "GET"
        }).then(function (response) {
            for (i = 0; i < 6; i++) {
                imgArray[i] = response.topartists.artist[i].image[4]["#text"]
                artistArray[i] = response.topartists.artist[i].name;

            }
            $("#imgCol0").empty();
            $("#imgCol1").empty();

            for (i = 0; i < 3; i++) {
                $("#imgCol0").append("<div class='imgHolder'><img class='images' src='" + imgArray[i] + "'></img><span id='imageTags'>" + artistArray[i] + "</span></div>")
            }
            for (i = 3; i < 6; i++) {
                $("#imgCol1").append("<div class='imgHolder'><img class='images' src='" + imgArray[i] + "'></img><span id='imageTags'>" + artistArray[i] + "</span></div>")
            }
            var artistResponse = artistArray;

            var firstArtist = artistArray[1];
            var artistString = firstArtist.replace(/\s/g, "%20");
            console.log(artistString);
            var queryURL = "https://rest.bandsintown.com/artists/" + artistString + "/events?app_id=codingbootcamp";
            console.log(queryURL);
            
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
                console.log(queryURL);
                console.log(response);
                $("#concert-loc").append("<li class= 'concertName'>" + response[0].lineup[0] + " at " + response[0].venue.city + ", " + response[0].venue.country + ", On: " + response[0].datetime + "</li><li class= 'concertName'>" + response[1].lineup[1] + " at " + response[1].venue.city + ", " + response[1].venue.country + ", On: " + response[1].datetime + "</li");
            });

            //PUSHES DATA TO FIREBASE 
            database.ref().child(userName).child("topArtists").set({
                artistResponse
            });
        });

        $.ajax({
            url: songURL,
            method: "GET"
        }).then(function (response) {
            for (i = 0; i < 6; i++) {
                $("#song-list").append("<li class='songName'>" + response.toptracks.track[i].name + " - " + response.toptracks.track[i].artist.name + "</li>")

                trackArray[i] = response.toptracks.track[i].name + " - " + response.toptracks.track[i].artist.name;
            }
            //PUSHES DATA TO FIREBASE
            var tracksResponse = trackArray;
            database.ref().child(userName).child("topSongs").set({
                tracksResponse
            })
        })
        database.ref().on("child_added", function (childSnapshot, prevChildKey) {

            // for (i = 0; i < )
            //store variable
            topTracks1 = childSnapshot.val().topTrackObject;
            console.log("hello");
            topArtists = childSnapshot.val().topArtistObject;
            console.log(topTracks1)
            // console.log('firebasetoptrackArray: ', Object.values(snap.val()).map((v) => v.topTrackObject));

            // function snapshotToArray(snapshot) {
            //     var returnArr = [];

            //     snapshot.forEach(function (childSnapshot) {
            //         var item = childSnapshot.val().topTrackObject;
            //         item.key = childSnapshot.key;

            //         returnArr.push(item);
            //         console.log("hiya");
            //     });

            //     return returnArr;


            // };
            // snapshotToArray()
            // console.log(returnArr);
        })
    });
});
