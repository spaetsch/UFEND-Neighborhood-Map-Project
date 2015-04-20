// --------- MODEL ---------------

var markersModel = [
    {
      title: 'Whole Foods',
      category: "grocery",                        
      address: "2001 15th Ave. W., Seattle, WA",  // street address for use by geocoder
      marker : new google.maps.Marker({           // google maps marker object
        position: new google.maps.LatLng(0,0),    // set initial position to (0,0)
        icon: "img/pins/supermarket.png"          // map icon by category
      })
    },
    {
      title: "Trader Joe's",
      category: "grocery",
      address: "1916 Queen Anne Ave., Seattle, WA", 
      marker : new google.maps.Marker({
        position: new google.maps.LatLng(0,0), 
        icon: "img/pins/supermarket.png"
      })
    },
    {
      title: "Safeway",
      category: "grocery",
      address: "2100 Queen Anne Ave., Seattle, WA", 
      marker : new google.maps.Marker({
        position: new google.maps.LatLng(0,0),
        icon: "img/pins/supermarket.png"
      }) 
    },
    {
      title: "The Seattle Grind",
      category: "coffee",
      address: "1907 10th Ave. W., Seattle, WA", 
      marker : new google.maps.Marker({
        position: new google.maps.LatLng(0,0),      
        icon: "img/pins/coffee.png",
      })
    },
    {
      title: "Bustle on Queen Anne",
      category: "coffee",
      address: "535 W. McGraw St., Seattle, WA", 
      marker : new google.maps.Marker({
        position: new google.maps.LatLng(0,0),
        icon: "img/pins/coffee.png",
      }) 
    },
    {
      title: "5 Spot",
      category: "restaurant",
      address: "1502 Queen Anne Ave N., Seattle, WA", 
      marker : new google.maps.Marker({
        position: new google.maps.LatLng(0,0),
        icon: "img/pins/restaurant.png",
      }) 
    },
    {
      title: "Homegrown",
      category: "restaurant",
      address: "2201 Queen Anne Ave N., Seattle, WA", 
      marker : new google.maps.Marker({
        position: new google.maps.LatLng(0,0),
        icon: "img/pins/restaurant.png",
      })
    },
    {
      title: "West Howe Park",
      category: "park",
      address: "1901 11th Ave. W., Seattle, WA", 
      marker : new google.maps.Marker({
        position: new google.maps.LatLng(0,0),
        icon: "img/pins/park.png",
      })
    },
    {
      title: "Kinnear Park",
      category: "park",
      address: "749-827 W. Olympic Pl., Seattle, WA", 
      marker : new google.maps.Marker({
        position: new google.maps.LatLng(0,0), 
        icon: "img/pins/park.png",
    }) 
    }
  ]


// -------------- VIEWMODEL ----------------

var resultMarkers = function(members){
  var self = this;

  var mapOptions = {
      center: new google.maps.LatLng(47.635930, -122.364991), //set map center in Queen Anne
      zoom: 15
    };

  var map = new google.maps.Map(document.getElementById('map-container'), mapOptions);

  self.markers = ko.observableArray(members); 
  self.searchReq = ko.observable("");

  /*self.clearMap = function (map) {
      for (current in markersModel) {
        markersModel[current].marker.setMap(null);
      }
    }*/

  self.filteredMarkers = ko.computed(function() {
    //self.clearMap();

    for (current in markersModel) {
        markersModel[current].marker.setMap(null);
      }

    return $.grep(members, function( a ) {
      if(a.title.toLowerCase().indexOf(self.searchReq().toLowerCase()) > -1 ||
          a.category.toLowerCase().indexOf(self.searchReq().toLowerCase()) > -1){
        a.marker.setMap(map);
      } 
      return a.title.toLowerCase().indexOf(self.searchReq().toLowerCase()) > -1 ||
          a.category.toLowerCase().indexOf(self.searchReq().toLowerCase()) > -1;
      });
  });
  
  self.addAllMarkers = function(){  
    //iterate through all markers in the model
    for (current in markersModel){
        //add event listener to each map marker to trigger the corresponding infowindow on click
        google.maps.event.addListener(markersModel[current].marker, 'click', function(innerCurrent) {
          return function(){
            var infowindow = new google.maps.InfoWindow({
              content: markersModel[innerCurrent].title
            });
            infowindow.open(map, markersModel[innerCurrent].marker);
          }
        }(current));

        geocoder = new google.maps.Geocoder();
        //place marker on map using address to find LatLng with geocoder
        geocoder.geocode({ 'address': markersModel[current].address }, function(current){
          return function(results, status) {  
            markersModel[current].marker.position = results[0].geometry.location;
            markersModel[current].marker.setMap(map);
          }
        }(current));
    }
  }
}

var toggleBounce = function(currentMarker) {
  if (currentMarker.marker.getAnimation() != null) {
    currentMarker.marker.setAnimation(null);
  } else {
    currentMarker.marker.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(function (){currentMarker.marker.setAnimation(null)}, 2800);
  }
}

//----

var myMarkers = new resultMarkers(markersModel);
ko.applyBindings(myMarkers);
google.maps.event.addDomListener(window, 'load', myMarkers.addAllMarkers);
