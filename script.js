function getIceCreamStores(loc) {
  var data = { term: "ice cream" };
  if (loc && loc.latitude) {
    data.latitude = loc.latitude;
    data.longitude = loc.longitude;
  } else if (loc){
    if (loc.length === 5){
      data.location = loc
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
  });
}

$(document).ready(function () {
  navigator.geolocation.getCurrentPosition(
    locationHandler,
    locationErrorHandler,
    options
  );
  $("#zipcode-submit").on("click", function(){
    var zipcode = $("#zipcode-input").val();
    console.log(zipcode);
    getIceCreamStores(zipcode);
  })
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
