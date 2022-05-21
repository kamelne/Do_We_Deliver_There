var map;
//var geocoder; //only needed if not using auto complete
var marker;
var samsMarker;
var polygon;
var bounds;
window.onload = initMap;
function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: new google.maps.LatLng(38.475365, -77.429335),
		zoom: 12.5,
		disableDefaultUI: true
	});
  //geocoder = new google.maps.Geocoder(); 
	bounds = new google.maps.LatLngBounds();
	google.maps.event.addListenerOnce(map, 'tilesloaded', function(evt) { 
		bounds = map.getBounds();
	});
  samsMarker = new google.maps.Marker({
    position: new google.maps.LatLng(38.475365, -77.429335),
    icon: {
      url: "http://maps.google.com/mapfiles/ms/micons/restaurant.png"
    }
  });
  samsMarker.setMap(map)
polygon = new google.maps.Polygon({
  path: area,
  geodesic: true,
  strokeColor: 'black',
  strokeOpacity: 1.0,
  strokeWeight: .75,
  fillColor: '#FFd000',
  fillOpacity: 0.3
});

polygon.setMap(map);	
	  
var input = /** @type {!HTMLInputElement} */(
  document.getElementById('pac-input'));
  //var types = document.getElementById('type-selector');
  
var autocomplete = new google.maps.places.Autocomplete(input);
autocomplete.addListener('place_changed', function() {
    marker = new google.maps.Marker({
      icon: {
        url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
      }
    })
		var place = autocomplete.getPlace();
		var newBounds = new google.maps.LatLngBounds(bounds.getSouthWest(), bounds.getNorthEast()); 
          if (!place.geometry) {
						geocodeAddress(input.value);
            return;
          };
		  marker.setPosition(place.geometry.location);
		  marker.setMap(map);
		  newBounds.extend(place.geometry.location);
		  map.fitBounds(newBounds);
		  if (google.maps.geometry.poly.containsLocation(place.geometry.location, polygon)){
			alert('We deliver there');  
		  } else {
			alert('We DO NOT deliver there');  
		  };
	   });
}
