
const map = new mapboxgl.Map({
    accessToken: mapToken,
    container: 'map', // container ID
    center: coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
    zoom: 9, // starting zoom
});

    // Create a default Marker and add it to the map.
const marker = new mapboxgl.Marker({color: "red"})
    .setLngLat(coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 }).setText(
        'Exact location provided after booking'
    ))


    .addTo(map);

