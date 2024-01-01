
// mapboxgl.accessToken = "pk.eyJ1IjoiZGVsdGEtc3R1ZHVlbnQiLCJhIjoiY2xvMDk0MTVhMTJ3ZDJrcGR5ZDFkaHl4ciJ9.Gj2VU1wvxc7rFVt5E4KLOQ"
mapboxgl.accessToken = mapToken;
console.log(coordinates);
console.log(listing);
// let point = JSON.stringify([coordinates])
const map = new mapboxgl.Map({
container: 'map', // container ID
style: 'mapbox://styles/mapbox/streets-v12',
// center: [77.5913, 12.97912], // starting position [lng, lat]
  center : coordinates,
zoom: 9 // starting zoom    
});

const marker1 = new mapboxgl.Marker({ color: 'red'})
.setLngLat(coordinates)
.setPopup(
    new mapboxgl.Popup({ offset:25 }).setHTML(
    `<h4>${listing.title}</h4><p>Exact Location will be provided after booking</p>`)
)
.addTo(map);
