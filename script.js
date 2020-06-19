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
      console.log(result);
    },
    error: function (error) {
      console.log(error);
    },
  }).then(function (response) {
    console.log(response);
    $("#iceCreamStores").empty();
    for (var i = 0; i < 10; i++) {
      var iceCreamStores = response.businesses[i].name;
      var storeAddress = response.businesses[i].location.address1;
      console.log(storeAddress);
      console.log(iceCreamStores);
      var storeList = $("<button>").text(iceCreamStores);
      $(storeList).attr("class", "btn-block newIceCreamStoreButton");
      var listItem = $("<li>").append(storeList);
      $("#iceCreamStores").append(listItem);
    }
  });
  var mapQuestKey = "bDYO5JVsT0lGPolecMUk1lCGVNostBHT";
  var pointA = "";
  var pointB = "";

  var myURL =
    "http://www.mapquestapi.com/directions/v2/route?key=bDYO5JVsT0lGPolecMUk1lCGVNostBHT&from=" +
    pointA +
    "&to=" +
    pointB;

  $.ajax({
    url: myURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    var distance = response.route.distance;
    var time = response.route.time;
    console.log(time);
  });
}

$(document).ready(function () {
  navigator.geolocation.getCurrentPosition(
    locationHandler,
    locationErrorHandler,
    options
  );
  $("#zipcode-submit").on("click", function () {
    var zipcode = $("#zipcode-input").val();
    getIceCreamStores(zipcode);
  });
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
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  console.log(`More or less ${crd.accuracy} meters.`);
}

function locationErrorHandler(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}
