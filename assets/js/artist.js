$(document).ready(function () {
    $("#submitButton").click(function () {
        var userName = $("#username").val();
        var artistURL = "http://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=" + userName + "&limit=6&period=12month&api_key=322352869f97292d72744a0a62a42120&format=json"
        var songURL = "http://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=" + userName + "&limit=6&period=12month&api_key=322352869f97292d72744a0a62a42120&format=json";

        $.ajax({
            url: artistURL,
            method: "GET"
        }).then(function(response){
            for(i = 0; i < 6; i++)
            {
                $("#artist-list").append("<li>" + response.topartists.artist[i].name + "</li>")
            }
        })

        $.ajax({
            url: songURL,
            method: "GET"
        }).then(function(response){
            for(i = 0; i < 6; i++)
            {
                $("#song-list").append("<li>" + response.toptracks.track[i].name + " by- "+response.toptracks.track[i].artist.name+ "</li>")
            }
            
        })


    })
})
