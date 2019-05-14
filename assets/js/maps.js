function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 3,
        center: {
            lat: 46.619261,
            lng: -33.134766
        }
    });
    
    var labels = "dsfsdfsdfsdf";
    
    var locations = [
        { lat: 40.785, lng: -73.968 },
        { lat: 41.785, lng: -73.968 },
        { lat: 39.785, lng: -73.968 }
    ];
    
    var markers = locations.map(function(location, i) {
        return new google.maps.Marker({
            position: location,
            label: labels[i % labels.length]
        });
    });
    
    var markerCluster = new MarkerClusterer(map, markers, {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
}