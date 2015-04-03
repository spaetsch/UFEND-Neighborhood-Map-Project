// --------- MODEL ---------------

var model = {
  markers : {
    /*houseMarker : new google.maps.Marker({
      position: new google.maps.LatLng(0,0),
      title: 'New House',
      category: "house",
      address: "1826 12th Ave. W., Seattle, WA" //add address to marker
    }),*/

    WFMarker : new google.maps.Marker({
      position: new google.maps.LatLng(0,0),
      title: 'Whole Foods',
      category: "grocery",
      icon: "img/pins/supermarket.png",
      address: "2001 15th Ave. W., Seattle, WA" //add address to marker
    }),

    TJMarker : new google.maps.Marker({
      position: new google.maps.LatLng(0,0),
      title: "Trader Joe's",
      category: "grocery",
      icon: "img/pins/supermarket.png",
      address: "1916 Queen Anne Ave., Seattle, WA" //add address to marker
    }) ,
    safewayMarker : new google.maps.Marker({
      position: new google.maps.LatLng(0,0),
      title: "Safeway",
      category: "grocery",
      icon: "img/pins/supermarket.png",
      address: "2100 Queen Anne Ave., Seattle, WA" //add address to marker
    }) ,
    /*farmerMarker :  new google.maps.Marker({
      position: new google.maps.LatLng(0,0),
      title: "Queen Anne Farmer's Market",
      category: "grocery",
      address: "7 Crockett St., Seattle, WA" //add address to marker
    }) ,*/
    grindMarker : new google.maps.Marker({
      position: new google.maps.LatLng(0,0),
      title: "The Seattle Grind",
      category: "coffee",
      icon: "img/pins/coffee.png",
      address: "1907 10th Ave. W., Seattle, WA" //add address to marker
    }) ,
    bustleMarker : new google.maps.Marker({
      position: new google.maps.LatLng(0,0),
      title: "Bustle on Queen Anne",
      category: "coffee",
      icon: "img/pins/coffee.png",
      address: "535 W. McGraw St., Seattle, WA" //add address to marker
    }) ,
   fiveMarker : new google.maps.Marker({
      position: new google.maps.LatLng(0,0),
      title: "5 Spot",
      category: "restaurant",
      icon: "img/pins/restaurant.png",
      address: "1502 Queen Anne Ave N., Seattle, WA" //add address to marker
    }) ,
    homegrownMarker : new google.maps.Marker({
      position: new google.maps.LatLng(0,0),
      title: "Homegrown",
      category: "restaurant",
      icon: "img/pins/restaurant.png",
      address: "2201 Queen Anne Ave N., Seattle, WA" //add address to marker
    }) ,
    /*iceboxMarker : new google.maps.Marker({
      position: new google.maps.LatLng(0,0),
      title: "Icebox Grocery",
      category: "restaurant",
      icon: "img/pins/restaurant.png",
      address: "1903 10th Ave. W., Seattle, WA" //add address to marker
    }) */

    howeMarker : new google.maps.Marker({
      position: new google.maps.LatLng(0,0),
      title: "West Howe Park",
      category: "park",
      icon: "img/pins/park.png",
      address: "1901 11th Ave. W., Seattle, WA" //add address to marker
    }) ,
    kinnearMarker : new google.maps.Marker({
      position: new google.maps.LatLng(0,0),
      title: "Kinnear Park",
      category: "park",
      icon: "img/pins/park.png",
      address: "749-827 W. Olympic Pl., Seattle, WA" //add address to marker
    }) ,
  } 
}

// ------- VIEWMODEL --------------


function initialize() {
  var mapOptions = {
    center: { lat: 47.6374701, lng: -122.3578885}, //Queen Anne Seattle
    zoom: 14
  };
  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  // fixing bug in google code
  map.setOptions({draggableCursor:'url(http://maps.gstatic.com/mapfiles/openhand_8_8.cur),default'}); 
  map.setOptions({draggingCursor:'url(http://maps.gstatic.com/mapfiles/closedhand_8_8.cur),default'}); 

  //current iteration - use geocode with for loop
  var geocoderCallback = function(marker){
    return function(results, status) {    
      model.markers[marker].position = results[0].geometry.location;
      console.log("model marker category: ", model.markers[marker].category);
      model.markers[marker].setMap(map);
    }
  }

  //drop markers on map
  for (marker in model.markers){
    geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': model.markers[marker].address }, geocoderCallback(marker));
  }
}

google.maps.event.addDomListener(window, 'load', initialize);



