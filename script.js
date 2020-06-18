$(document).ready(function () {
  var URL = 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?';
  var APIkey = "pZoeLz1SZU0FpO7ZzMtXIQ9dSW1UZ3Wp762C53LAb3zgJeMNvtwIQUCJL2-8hAAquHFK2XIiamEuOUXbuw5Rre3ie_pe1vknYXD9bCDCmd53ztY7KsdjUuIxlVvqXnYx"
  $.ajax({
    url: URL,
    method: "GET",
    headers: {
      Authorization: `Bearer ${APIkey}`
    },
    data: {
      "term": "ice cream",
      "location": "Atlanta"
    },
    success: function (result) {
      console.log(result)
    },
    error: function (error) {
      console.log(error)
    },
  })
})

window.onload = function() {
  placeSearch({
    key: 'ZZRRtGp9bjs0OUWpRQ8pC3Tgt1zc8QAR',
    container: document.querySelector('#search-input'),
    useDeviceLocation: true,
    collection: [
      'poi',
      'airport',
      'address',
      'adminArea',
    ]
  });
}
