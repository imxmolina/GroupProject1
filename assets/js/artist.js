$(document).ready(function () {
    var imgArray = [];
    var artistArray = [];
    $("#submitButton").click(function () {

        $("#idName").empty();
        $("#artist-list").empty();
        $("#song-list").empty();
        $("#imgCol0").empty();
        $("#imgCol1").empty();


        var userName = $("#username").val();
        $("#idName").html('<i class="fas fa-user"></i>' + userName)

        var artistURL = "http://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=" + userName + "&limit=6&period=12month&api_key=322352869f97292d72744a0a62a42120&format=json"
        var songURL = "http://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=" + userName + "&limit=6&period=12month&api_key=322352869f97292d72744a0a62a42120&format=json";

        $.ajax({
            url: artistURL,
            method: "GET"
        }).then(function (response) {
            for (i = 0; i < 6; i++) {
                $("#artist-list").append("<li class='artistName'>" + response.topartists.artist[i].name + "</li>")
                imgArray[i] = response.topartists.artist[i].image[4]["#text"]
                artistArray[i] = response.topartists.artist[i].name 
            }
        })

        $.ajax({
            url: songURL,
            method: "GET"
        }).then(function (response) {
            for (i = 0; i < 6; i++) {
                $("#song-list").append("<li class='songName'>" + response.toptracks.track[i].name + " by- " + response.toptracks.track[i].artist.name + "</li>")
            }

        }).then(function (response) {
            var queryURL = "https://rest.bandsintown.com/artists/" + response.toptracks.track[1].artist.name + "/events?app_id=codingbootcamp";
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
                console.log(response);
                getBandsintown();
            });
        })


    })

    $("#artist-list").on("click", ".artistName", function () {

        $("#imgCol0").empty();
        $("#imgCol1").empty();

        for (i = 0; i < 3; i++) {
            $("#imgCol0").append("<div class='imgHolder'><img class='images' src='" + imgArray[i] + "'></img><span>"+ artistArray[i] +"</span></div>")
        }
        for (i = 3; i < 6; i++) {
            $("#imgCol1").append("<div class='imgHolder'><img class='images' src='" + imgArray[i] + "'></img><span>"+ artistArray[i] +"</span></div>")
        }
    })

    $("#artist-list").on("hover", ".artistName", function(){
        console.log("Bi")
    })

    $("#song-list").on("click", ".songName", function () {

    })
})
