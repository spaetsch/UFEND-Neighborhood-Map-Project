// --------- MODEL ---------------

var model = {
  markers : {
    houseMarker : new google.maps.Marker({
      position: new google.maps.LatLng(47.635559, -122.372503),
      title: 'New House',
      category: "house"
    }),

    WFMarker : new google.maps.Marker({
      position: new google.maps.LatLng(47.637004, -122.376816),
      title: 'Whole Foods',
      category: "grocery"
    }),

    TJMarker : new google.maps.Marker({
      position: new google.maps.LatLng(47.636412, -122.356463),
      title: "Trader Joe's",
      category: "grocery"
    })
  }
}

// --------BINDER ---------------


// ------- VIEW --------------


function initialize() {

  var mapOptions = {
    center: { lat: 47.6374701, lng: -122.3578885}, //Queen Anne Seattle
    zoom: 14
  };
  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  map.setOptions({draggableCursor:'url(http://maps.gstatic.com/mapfiles/openhand_8_8.cur),default'}); // trying to fix bug
  map.setOptions({draggingCursor:'url(http://maps.gstatic.com/mapfiles/closedhand_8_8.cur),default'}); // trying to fix bug

  //model.markers.houseMarker.setMap(map);
  //model.markers.WFMarker.setMap(map);
  //model.markers.TJMarker.setMap(map);

  for (marker in model.markers){
    model.markers[marker].setMap(map);
  }

}

google.maps.event.addDomListener(window, 'load', initialize);



