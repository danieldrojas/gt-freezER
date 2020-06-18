// $(document).ready(function () {
 
  
//   $.ajax(settings).done(function (response) {
//     console.log(response);
//   });
// });

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