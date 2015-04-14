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


var resultMarkers = function(members){
  var self = this;
  self.markers = ko.observableArray(members); 
  self.searchReq = ko.observable("");
  }


  self.geocoderCallback = function(marker){
    return function(results, status) {  
      markersModel[marker].marker.position = results[0].geometry.location;
      markersModel[marker].marker.setMap(map);
    }
  };

  self.addAllMarkers = function(){  
    for (current in markersModel){
        geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'address': markersModel[current].address }, self.geocoderCallback(current));
      }
  };


  self.mapInit = function(){
    console.log("mapInit");
    var mapOptions = {
      center: new google.maps.LatLng(47.635930, -122.364991),//(47.6374701,-122.3578885),
      zoom: 15
    };

    map = new google.maps.Map(document.getElementById('map-container'), mapOptions);

    // fixing bug in google code
    map.setOptions({draggableCursor:'url(http://maps.gstatic.com/mapfiles/openhand_8_8.cur),default'}); 
    map.setOptions({draggingCursor:'url(http://maps.gstatic.com/mapfiles/closedhand_8_8.cur),default'}); 

    self.addAllMarkers();
  };



var toggleBounce = function(currentMarker) {
  if (currentMarker.marker.getAnimation() != null) {
    currentMarker.marker.setAnimation(null);
  } else {
    currentMarker.marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}

//----

var myMarkers = new resultMarkers(markersModel);
ko.applyBindings(myMarkers);
console.log("listening");   
google.maps.event.addDomListener(window, 'load', myMarkers.mapInit);
console.log("whats the deal");




