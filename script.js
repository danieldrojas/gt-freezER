$(document).ready(function () {

  var APIkey = "pZoeLz1SZU0FpO7ZzMtXIQ9dSW1UZ3Wp762C53LAb3zgJeMNvtwIQUCJL2-8hAAquHFK2XIiamEuOUXbuw5Rre3ie_pe1vknYXD9bCDCmd53ztY7KsdjUuIxlVvqXnYx"

  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.yelp.com/v3//businesses/search",
    "method": "POST",
    "headers": {
      headers: {
        Authorization: `Bearer ${APIkey}`
      }


    },
    "data": "icecream"
  }

  $.ajax(settings).done(function (response) {
    console.log(response);
  });

})

