let map = L.map('map', {
  center: [30.73006, 31.80182],
  zoom: 8,
});

let osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

osm.addTo(map);

// let theMarker = L.marker([30.72531514066168, 31.801235056379547]);
// theMarker.bindPopup('<div class="theMarker">This is Faqous</div>')
// .openPopup();
// theMarker.addTo(map);

if (!navigator.geolocation) {
  console.log("The Navigator doesn't work in this browser.");
} else {
  setInterval(() => {
    navigator.geolocation.getCurrentPosition(getPosition);
  }, 1000);
}

// Global Variables
let myLocation;
let circle;

function getPosition(position) {
  
    let lat =  position.coords.latitude;
    let lng =  position.coords.longitude;
    let accuracy =  position.coords.accuracy;
    

    if (myLocation)
      map.removeLayer(myLocation);

    if (circle)
      map.removeLayer(circle);

    myLocation = L.marker([lat, lng]);
    myLocation.bindPopup("The Current Location").openPopup();
    circle = L.circle([lat, lng], {
      radius: accuracy,
    });
    let featureGroup = L.featureGroup([myLocation, circle]).addTo(map);
    map.fitBounds(featureGroup.getBounds())
}

// map.on('zoom', (e) => {
//   navigator.geolocation.getCurrentPosition(getPosition);
// })

// lat => 30.72531514066168
// lng => 31.801235056379547