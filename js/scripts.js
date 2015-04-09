// --------- MODEL ---------------

var markersModel = [
    {
      title: 'Whole Foods',
      category: "grocery",
      address: "2001 15th Ave. W., Seattle, WA", //add address to marker
      marker : new google.maps.Marker({
        position: new google.maps.LatLng(0,0),
        icon: "img/pins/supermarket.png"
      })
    },
    {
      title: "Trader Joe's",
      category: "grocery",
      address: "1916 Queen Anne Ave., Seattle, WA", //add address to marker
      marker : new google.maps.Marker({
        position: new google.maps.LatLng(0,0), 
        icon: "img/pins/supermarket.png"
      })
    },
    {
      title: "Safeway",
      category: "grocery",
      address: "2100 Queen Anne Ave., Seattle, WA", //add address to marker
      marker : new google.maps.Marker({
        position: new google.maps.LatLng(0,0),
        icon: "img/pins/supermarket.png"
      }) 
    },
    {
      title: "The Seattle Grind",
      category: "coffee",
      address: "1907 10th Ave. W., Seattle, WA", //add address to marker
      marker : new google.maps.Marker({
        position: new google.maps.LatLng(0,0),      
        icon: "img/pins/coffee.png",
      })
    },
    {
      title: "Bustle on Queen Anne",
      category: "coffee",
      address: "535 W. McGraw St., Seattle, WA", //add address to marker
      marker : new google.maps.Marker({
        position: new google.maps.LatLng(0,0),
        icon: "img/pins/coffee.png",
      }) 
    },
    {
      title: "5 Spot",
      category: "restaurant",
      address: "1502 Queen Anne Ave N., Seattle, WA", //add address to marker
      marker : new google.maps.Marker({
        position: new google.maps.LatLng(0,0),
        icon: "img/pins/restaurant.png",
      }) 
    },
    {
      title: "Homegrown",
      category: "restaurant",
      address: "2201 Queen Anne Ave N., Seattle, WA", //add address to marker
      marker : new google.maps.Marker({
        position: new google.maps.LatLng(0,0),
        icon: "img/pins/restaurant.png",
      })
    },
    {
      title: "West Howe Park",
      category: "park",
      address: "1901 11th Ave. W., Seattle, WA", //add address to marker
      marker : new google.maps.Marker({
        position: new google.maps.LatLng(0,0),
        icon: "img/pins/park.png",
      })
    },
    {
      title: "Kinnear Park",
      category: "park",
      address: "749-827 W. Olympic Pl., Seattle, WA", //add address to marker
      marker : new google.maps.Marker({
        position: new google.maps.LatLng(0,0), 
        icon: "img/pins/park.png",
    }) 
    }
  ]


// ------- VIEWMODEL --------------


var currentMarkers = function(members){

  var self = this;
  self.markers = ko.observableArray(members);

}

var mapInit = function(){
    console.log("I'm in mapInit");
    var mapOptions = {
      //center: { lat: 47.6374701, lng: -122.3578885}, //Queen Anne Seattle
      center: new google.maps.LatLng(47.635930, -122.364991),//(47.6374701,-122.3578885),
      zoom: 15
    };

    map = new google.maps.Map(document.getElementById('map-container'), mapOptions);

    // fixing bug in google code
    map.setOptions({draggableCursor:'url(http://maps.gstatic.com/mapfiles/openhand_8_8.cur),default'}); 
    map.setOptions({draggingCursor:'url(http://maps.gstatic.com/mapfiles/closedhand_8_8.cur),default'}); 

   addAllMarkers();
  };

var geocoderCallback = function(marker){
    console.log("I'm in geocoderCallback");
    return function(results, status) {  
      console.log("inside");  
      console.log("markersModel[marker].position", markersModel[marker].position);

      console.log("results[0].geometry.location", results[0].geometry.location);
      markersModel[marker].marker.position = results[0].geometry.location;
      markersModel[marker].marker.setMap(map);
    }
  };

var addAllMarkers = function(){
    //drop markers on map
    console.log("I'm in addAllMarkers");
   for (marker in markersModel){
      console.log("marker is: ", markersModel[marker]);
      geocoder = new google.maps.Geocoder();
      geocoder.geocode({ 'address': markersModel[marker].address }, geocoderCallback(marker));
      console.log("address: ",  markersModel[marker].address);
    }
  };



//----

ko.applyBindings(new currentMarkers(markersModel));
console.log("between bindings and addDomListener");
google.maps.event.addDomListener(window, 'load', console.log("onload call"));
google.maps.event.addDomListener(window, 'load', mapInit);




