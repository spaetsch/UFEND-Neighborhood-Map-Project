// --------- MODEL ---------------

var model = {
  markers : {
    houseMarker : new google.maps.Marker({
      position: new google.maps.LatLng(0,0),
      title: 'New House',
      category: "house",
      address: "1826 12th Ave. W., Seattle, WA" //add address to marker
    }),

    WFMarker : new google.maps.Marker({
      position: new google.maps.LatLng(0,0),
      title: 'Whole Foods',
      category: "grocery",
      address: "2001 15th Ave. W., Seattle, WA" //add address to marker
    }),

    TJMarker : new google.maps.Marker({
      position: new google.maps.LatLng(0,0),
      title: "Trader Joe's",
      category: "grocery",
      address: "1916 Queen Anne Ave., Seattle, WA" //add address to marker
    }) ,
    farmerMarker :  new google.maps.Marker({
      position: new google.maps.LatLng(0,0),
      title: "Queen Anne Farmer's Market",
      category: "grocery",
      address: "7 Crockett St., Seattle, WA" //add address to marker
    }) ,
    grindMarker : new google.maps.Marker({
      position: new google.maps.LatLng(0,0),
      title: "The Seattle Grind",
      category: "coffee",
      address: "1907 10th Ave. W., Seattle, WA" //add address to marker
    }) ,
    bustleMarker : new google.maps.Marker({
      position: new google.maps.LatLng(0,0),
      title: "Bustle on Queen Anne",
      category: "coffee",
      address: "535 W. McGraw St., Seattle, WA" //add address to marker
    }) ,
   fiveMarker : new google.maps.Marker({
      position: new google.maps.LatLng(0,0),
      title: "5 Spot",
      category: "restaurant",
      address: "1502 Queen Anne Ave N., Seattle, WA" //add address to marker
    }) ,
    homegrownMarker : new google.maps.Marker({
      position: new google.maps.LatLng(0,0),
      title: "Homegrown",
      category: "restaurant",
      address: "2201 Queen Anne Ave N., Seattle, WA" //add address to marker
    }) ,
    iceboxMarker : new google.maps.Marker({
      position: new google.maps.LatLng(0,0),
      title: "Icebox Grocery",
      category: "restaurant",
      address: "1903 10th Ave. W., Seattle, WA" //add address to marker
    }) 
  } 
}

// --------BINDER ---------------


// ------- VIEW --------------
/*
function setPosition(){

    for (marker in model.markers){
console.log("inside geocode for loop");
  geocoder = new google.maps.Geocoder();
  geocoder.geocode({ 'address': model.markers[marker].address }, function(results, status) {    
      console.log("inside geocode call");
      console.log("marker is ", marker);
      console.log("position is: ", model.markers[marker].position);
      console.log("results location is ", results[0].geometry.location);
      model.markers[marker].position = results[0].geometry.location;//after this line


      console.log("after setting value");
      console.log("position is: ", model.markers[marker].position);

    });
}
}

*/

function initialize() {

 // setPosition();
  var mapOptions = {
    center: { lat: 47.6374701, lng: -122.3578885}, //Queen Anne Seattle
    zoom: 14
  };
  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  map.setOptions({draggableCursor:'url(http://maps.gstatic.com/mapfiles/openhand_8_8.cur),default'}); // trying to fix bug
  map.setOptions({draggingCursor:'url(http://maps.gstatic.com/mapfiles/closedhand_8_8.cur),default'}); // trying to fix bug

  //original hard-coding
  //model.markers.houseMarker.setMap(map);
  //model.markers.WFMarker.setMap(map);
  //model.markers.TJMarker.setMap(map);

  //next iteration, use for loop to set
  //for (marker in model.markers){
  //  model.markers[marker].setMap(map);
  //}

  //current iteration - trying to use geocode with for loop

  var geocoderCallback = function(marker){

    return function(results, status) {    
      console.log("inside geocode call");
      console.log("local marker is ", marker);
      console.log("position is: ", model.markers[marker].position);
      console.log("results location is ", results[0].geometry.location);
      model.markers[marker].position = results[0].geometry.location;
      console.log("after setting value");
      console.log("position is: ", model.markers[marker].position);
      model.markers[marker].setMap(map);

    }
  }


  for (marker in model.markers){
    console.log("in for loop");
    console.log("local marker is ", marker);
    console.log("address is ", model.markers[marker].address);
    geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': model.markers[marker].address }, geocoderCallback(marker));
    console.log("after geocode");
    console.log("local marker is ", marker);
    console.log("position is: ", model.markers[marker].position);
  }


/*
  for (marker in model.markers){
    console.log("in SET MAP for loop");
    console.log("marker is ", marker);
    console.log("address is ", model.markers[marker].address);    
    console.log("position is: ", model.markers[marker].position);
    model.markers[marker].setMap(map);
  }
*/


}






google.maps.event.addDomListener(window, 'load', initialize);



