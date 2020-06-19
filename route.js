
$(document).ready(function () {
    console.log("Inside route")




    var APIkey = "bDYO5JVsT0lGPolecMUk1lCGVNostBHT";
    var pointA = "2377 Main street, Duluth, GA"
    var pointB = "5590 roswel rd, sandy spring, ga"

    var myURL = "http://www.mapquestapi.com/directions/v2/route?key=bDYO5JVsT0lGPolecMUk1lCGVNostBHT&from=" + pointA + "&to=" + pointB


    $.ajax({
        url: myURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        var distance = response.route.distance;
        var time = response.route.time;
        console.log(time)
    });








})