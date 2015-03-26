      	function initialize() {
        	var mapOptions = {
  			//center: { lat: -34.397, lng: 150.644},
         	//zoom: 8
  			center: { lat: 47.6374701, lng: -122.3578885}, //Queen Anne Seattle
       		zoom: 14
        	};
        	var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
      	}
      	google.maps.event.addDomListener(window, 'load', initialize);