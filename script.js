// var userLocation;
// var imgArray = [];
// var image;


// var iceCreamStore = "name";
// var storeAddress = "address";

// var iceCreamDistance = 0;
// var timeToDistance = 'string';

// $(document).ready(function () {

for (var i = 0; i < 10; i++) {

  $("#iceCreamStores").append($("<div class='row'>" +  "<button>" + 'text goes here' + "</button>" + "</div>"))

}
    
  

console.log("we are here")


var userLocation;
var imgArray = [];
var image;
$(document).ready(function () {
  //grabs user location
  userLocation = navigator.geolocation.getCurrentPosition(
    locationHandler, // creates variable crd by calling getIceCreamStores function
    locationErrorHandler,
    options
  );
  $("#zipcode-submit").on("click", function () {
    var zipcode = $("#zipcode-input").val();
    getIceCreamStores(zipcode);
  });
  return userLocation;
});
// console.log(userLocation);
// pulled following location data from
// https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition

var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

function locationHandler(pos) {
  var crd = pos.coords;
  // console.log(crd);
  // console.log(crd.latitude);
  // console.log(crd.longitude);
  getIceCreamStores(crd);

  console.log("Your current position is:");
  console.log("Latitude: " + crd.latitude);
  console.log("Longitude: " + crd.longitude);
}
function locationErrorHandler(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}
// this function retrieves the stores by searching for the term ice cream
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
  // setting up variables for the yelp api AJAX call
  var latPointA = loc.latitude;
  var lonPointA = loc.longitude;
  var URL =
    "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?";
  var APIkey =
    "pZoeLz1SZU0FpO7ZzMtXIQ9dSW1UZ3Wp762C53LAb3zgJeMNvtwIQUCJL2-8hAAquHFK2XIiamEuOUXbuw5Rre3ie_pe1vknYXD9bCDCmd53ztY7KsdjUuIxlVvqXnYx";
  // yelp ajax call
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
      // console.log(error);
    },
  }).then(function (response) {
    console.log(response);
    // after receiving the data from yelp
    $("#iceCreamStores").empty(); // empties the iceCreamStores div
    //this add the image to the main col. In the event of click on the button
    function addImage() {
      var image = response.businesses[i].image_url;
      console.log(image);

      var imgDiv = $("<img>");
      imgDiv.attr("src", image);
      $("#icecream-img").append(imgDiv);
    }
    // runs 10 times and each time assigns the response to a variable
    for (var i = 0; i < 10; i++) {
      var iceCreamStores = response.businesses[i].name;
      var storeAddress = response.businesses[i].location.address1;
      // console.log(storeAddress);
      // console.log(iceCreamStores);
      var iceCreamDistance = "distance";
      var timeToDistance = "time";
      var storeList = $("<button>").text(iceCreamStores);
      $(storeList).attr("class", "btn-block newIceCreamStoreButton");

      // adding new id to each button
      storeList.attr("id", iceCreamStores);

      storeList.append($("<div>" + storeAddress + "</div>"));
      storeList.append($("<div>" + iceCreamDistance + "</div>"));
      storeList.append($("<div>" + timeToDistance + "</div>"));
      var listItem = $("<li>").append(storeList);
      $("#iceCreamStores").append(listItem);
      var latPointB = response.businesses[i].coordinates.latitude;
      var lonPointB = response.businesses[i].coordinates.longitude;
      var startingPos = latPointA + "," + lonPointA;
      var destinationPos = latPointB + "," + lonPointB;
      console.log("Starting: ", startingPos);
      console.log("Destination: ", destinationPos);
      var mapQuestKey = "bDYO5JVsT0lGPolecMUk1lCGVNostBHT";
      var pointA = startingPos;
      var pointB = destinationPos;
      addImage(); //line 80

      //change
      //this add the image to the main col. In the event of click on the button
      var image = response.businesses[i].image_url;
      console.log(image);
      imgArray.push(image);
      console.log(imgArray);

      // var imgDiv = $("<img>");
      // imgDiv.attr("src", image);
      // $("#icecream-img").append(imgDiv);

      var myURL =
        "https://www.mapquestapi.com/directions/v2/route?key=bDYO5JVsT0lGPolecMUk1lCGVNostBHT&from=" +
        pointA +
        "&to=" +
        pointB;

      $.ajax({
        url: myURL,
        method: "GET",
      }).then(function (response) {
        console.log(response);
        // console.log(response);
      });
    }
  });
  $("#iceCreamStores").on("click", function (event) {
    event.preventDefault();
    console.log("You clicked the button!", iceCreamStores);
  });
}
console.log(imgArray);
