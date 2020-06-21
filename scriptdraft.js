var userLocation;
var timeArray = [];
var routeArray = [];
var imgArray = [];
var urlArray = [];
var storeNameArray = [];

var routeTime = JSON.parse(localStorage.getItem("time"));

function timeConvert(routeTime) {
  var minutes = Math.floor(routeTime / 60);
  var seconds = routeTime % 60;
  console.log(minutes + ":" + seconds);
}

$(document).ready(function () {
  userLocation = navigator.geolocation.getCurrentPosition(
    locationHandler,
    locationErrorHandler,
    options
  );
  $("#zipcode-submit").on("click", function () {
    var zipcode = $("#zipcode-input").val();
    getIceCreamStores(zipcode);
  });
  return userLocation;
});

// pulled following location data from
// https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition

var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

function locationHandler(pos) {
  var crd = pos.coords;

  getIceCreamStores(crd);

  console.log("Your current position is:");
  console.log("Latitude: " + crd.latitude);
  console.log("Longitude: " + crd.longitude);
}
function locationErrorHandler(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

function getIceCreamStores(loc) {
  var data = { term: "ice cream" };
  if (loc && loc.latitude) {
    data.latitude = loc.latitude;
    data.longitude = loc.longitude;
  } else if (loc) {
    if (loc.length === 5 && Number(loc)) {
      data.location = loc;
    }
    if (!(data.lattitude && data.longitude) && !data.location) {
      alert("Please enter a valid Zip Code.");
      return;
    }
  }
  var latPointA = loc.latitude;
  var lonPointA = loc.longitude;
  var URL =
    "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?";
  var APIkey =
    "pZoeLz1SZU0FpO7ZzMtXIQ9dSW1UZ3Wp762C53LAb3zgJeMNvtwIQUCJL2-8hAAquHFK2XIiamEuOUXbuw5Rre3ie_pe1vknYXD9bCDCmd53ztY7KsdjUuIxlVvqXnYx";
  $.ajax({
    url: URL,
    method: "GET",
    headers: {
      Authorization: `Bearer ${APIkey}`,
    },
    data: data,
    success: function (result) {
      // console.log(result);
    },
    error: function (error) {
      //   console.log(error);
    },
  }).then(function (response) {
    console.log(response);
    $("#iceCreamStores").empty();

    for (var i = 0; i < 10; i++) {
      var iceCreamStores = response.businesses[i].name;
      storeNameArray.push(iceCreamStores);
      var storeAddress = response.businesses[i].location.address1;
      var storeList = $("<button>").text(iceCreamStores);
      $(storeList).attr("class", "btn-block newIceCreamStoreButton");
      storeList.attr("id", "button" + (1 + i));
      var listItem = $("<li>").append(storeList);
      $("#iceCreamStores").append(listItem);
      storeList.append($("<div>" + storeAddress + "</div>"));
    }

    for (var i = 0; i < 10; i++) {
      var storeURL = response.businesses[i].url;
      urlArray.push(storeURL);
    }

    for (var i = 0; i < 10; i++) {
      var imageURL = response.businesses[i].image_url;
      imgArray.push(imageURL);
    }

    // adding new id to each button
    var startingPos = latPointA + "," + lonPointA;
    var pointA = startingPos;

    for (var i = 0; i < 10; i++) {
      var latPointB = response.businesses[i].coordinates.latitude;
      var lonPointB = response.businesses[i].coordinates.longitude;
      var destinationPos = latPointB + "," + lonPointB;
      //   console.log("Destination: ", destinationPos);
      routeArray.push(destinationPos);
    }

    for (var i = 0; i < routeArray.length; i++) {
      //   console.log(routeArray[i]);
      var pointB = routeArray[i];

      // var pointB = destinationPos;
      var mapQuestKey = "ZZRRtGp9bjs0OUWpRQ8pC3Tgt1zc8QAR";

      var myURL =
        "https://www.mapquestapi.com/directions/v2/route?key=" +
        mapQuestKey +
        "&from=" +
        pointB +
        "&to=" +
        pointA;

      $.ajax({
        url: myURL,
        method: "GET",
      }).then(function (response) {
        var travelTime = response.route.realTime;
        // console.log(response.route.legs[0].maneuvers[0].narrative);
        // console.log(response.route.legs[0].maneuvers[1].narrative);
        var destDirOne = response.route.legs[0].maneuvers[0].narrative
        destinationArray.push(destDirOne);
        timeArray.push(travelTime);
        // renderSelectedDest();
      });
    }
    
        // Trying to dynamically create the button event listeners
/*     
    function buttonEventListeners() {
      for (i = 0; i < 10; i++) {
        $("button" + i).on("click", function (event) {
          event.preventDefault();
          clearDivs();
          // console.log("You clicked button 1!");
          imgDiv.attr("src", imgArray[i]);
          userDestination.text(response.businesses[i].name);
          $("#icecream-img").append(imgDiv);
          $("#selectedDestination").append(userDestination);
          renderSelectedDest();
        });
      }
    } */

    var imgDiv = $("<img>");
    var userDestination = $("<h2>");

    function clearDivs() {
      $("#icecream-img").empty();
      $("#selectedDestination").empty();
    }

    function appendDivs(){
      $("#icecream-img").append(imgDiv);
      $("#selectedDestination").append(userDestination);
    }
    $("#button1").on("click", function (event) {
      event.preventDefault();
      clearDivs();
      // console.log("You clicked button 1!"); 
      imgDiv.attr("src", imgArray[0]);
      $("#icecream-img").append(imgDiv);
      console.log(timeConvert(routeTime[0]));
      $("#storeHeader").text(storeNameArray[0]);
      var storeLink = $("<button>");
      $(storeLink).attr("class", "btn-block storeLinkButton");
      $("#storeURLButton").append(storeLink);
      storeLink.append(
        $(
          "<a href='" +
            urlArray[0] +
            "' target='_blank'> Click here for our store hours, menu & more!</a>"
        )
      );
    });

    $("#button2").on("click", function (event) {
      event.preventDefault();
      clearDivs();
      //console.log("You clicked button 2!");
      imgDiv.attr("src", imgArray[1]);
      $("#icecream-img").append(imgDiv);
      console.log(timeConvert(routeTime[1]));
      $("#storeHeader").text(storeNameArray[1]);
      var storeLink = $("<button>");
      $(storeLink).attr("class", "btn-block storeLinkButton");
      $("#storeURLButton").append(storeLink);
      storeLink.append(
        $(
          "<a href='" +
            urlArray[1] +
            "' target='_blank'> Click here for our store hours, menu & more!</a>"
        )
      );
    });

    $("#button3").on("click", function (event) {
      event.preventDefault();
      clearDivs();
      //console.log("You clicked button 3!");
      imgDiv.attr("src", imgArray[2]);
      $("#icecream-img").append(imgDiv);
      console.log(timeConvert(routeTime[2]));
      $("#storeHeader").text(storeNameArray[2]);
      var storeLink = $("<button>");
      $(storeLink).attr("class", "btn-block storeLinkButton");
      $("#storeURLButton").append(storeLink);
      storeLink.append(
        $(
          "<a href='" +
            urlArray[2] +
            "' target='_blank'> Click here for our store hours, menu & more!</a>"
        )
      );
    });

    $("#button4").on("click", function (event) {
      event.preventDefault();
      clearDivs();
      // console.log("You clicked button 4!");
      imgDiv.attr("src", imgArray[3]);
      $("#icecream-img").append(imgDiv);
      console.log(timeConvert(routeTime[3]));
      $("#storeHeader").text(storeNameArray[3]);
      var storeLink = $("<button>");
      $(storeLink).attr("class", "btn-block storeLinkButton");
      $("#storeURLButton").append(storeLink);
      storeLink.append(
        $(
          "<a href='" +
            urlArray[3] +
            "' target='_blank'> Click here for our store hours, menu & more!</a>"
        )
      );
    });

    $("#button5").on("click", function (event) {
      event.preventDefault();
      clearDivs();
      // console.log("You clicked button 5!");
      imgDiv.attr("src", imgArray[4]);
      $("#icecream-img").append(imgDiv);
      console.log(timeConvert(routeTime[4]));
      $("#storeHeader").text(storeNameArray[4]);
      var storeLink = $("<button>");
      $(storeLink).attr("class", "btn-block storeLinkButton");
      $("#storeURLButton").append(storeLink);
      storeLink.append(
        $(
          "<a href='" +
            urlArray[4] +
            "' target='_blank'> Click here for our store hours, menu & more!</a>"
        )
      );
    });

    $("#button6").on("click", function (event) {
      event.preventDefault();
      clearDivs();
      // console.log("You clicked button 6!");
      imgDiv.attr("src", imgArray[5]);
      $("#icecream-img").append(imgDiv);
      console.log(timeConvert(routeTime[5]));
      $("#storeHeader").text(storeNameArray[5]);
      var storeLink = $("<button>");
      $(storeLink).attr("class", "btn-block storeLinkButton");
      $("#storeURLButton").append(storeLink);
      storeLink.append(
        $(
          "<a href='" +
            urlArray[5] +
            "' target='_blank'> Click here for our store hours, menu & more!</a>"
        )
      );
    });

    $("#button7").on("click", function (event) {
      event.preventDefault();
      clearDivs();
      // console.log("You clicked button 7!");
      imgDiv.attr("src", imgArray[6]);
      $("#icecream-img").append(imgDiv);
      console.log(timeConvert(routeTime[6]));
      $("#storeHeader").text(storeNameArray[6]);
      var storeLink = $("<button>");
      $(storeLink).attr("class", "btn-block storeLinkButton");
      $("#storeURLButton").append(storeLink);
      storeLink.append(
        $(
          "<a href='" +
            urlArray[6] +
            "' target='_blank'> Click here for our store hours, menu & more!</a>"
        )
      );
    });

    $("#button8").on("click", function (event) {
      event.preventDefault();
      clearDivs();
      // console.log("You clicked button 8!");
      imgDiv.attr("src", imgArray[7]);
      $("#icecream-img").append(imgDiv);
      console.log(timeConvert(routeTime[7]));
      $("#storeHeader").text(storeNameArray[7]);
      var storeLink = $("<button>");
      $(storeLink).attr("class", "btn-block storeLinkButton");
      $("#storeURLButton").append(storeLink);
      storeLink.append(
        $(
          "<a href='" +
            urlArray[7] +
            "' target='_blank'> Click here for our store hours, menu & more!</a>"
        )
      );
    });

    $("#button9").on("click", function (event) {
      event.preventDefault();
      clearDivs();
      // console.log("You clicked button 9!");
      imgDiv.attr("src", imgArray[8]);
      $("#icecream-img").append(imgDiv);
      console.log(timeConvert(routeTime[8]));
      $("#storeHeader").text(storeNameArray[8]);
      var storeLink = $("<button>");
      $(storeLink).attr("class", "btn-block storeLinkButton");
      $("#storeURLButton").append(storeLink);
      storeLink.append(
        $(
          "<a href='" +
            urlArray[8] +
            "' target='_blank'> Click here for our store hours, menu & more!</a>"
        )
      );
    });

    $("#button10").on("click", function (event) {
      event.preventDefault();
      clearDivs();
      // console.log("You clicked button 10!");
      imgDiv.attr("src", imgArray[9]);
      $("#icecream-img").append(imgDiv);
      console.log(timeConvert(routeTime[9]));
      $("#storeHeader").text(storeNameArray[9]);
      var storeLink = $("<button>");
      $(storeLink).attr("class", "btn-block storeLinkButton");
      $("#storeURLButton").append(storeLink);
      storeLink.append(
        $(
          "<a href='" +
            urlArray[9] +
            "' target='_blank'> Click here for our store hours, menu & more!</a>"
        )
      );
    });
  });
}
// console.log(routeArray);
// console.log(timeArray);
// console.log(timeArray);
// console.log(imgArray);
