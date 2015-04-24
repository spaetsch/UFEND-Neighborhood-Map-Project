
var yelpRequest = function(phoneNumber, callback){

  var auth = { 
    consumerKey: "tnPXnHuDdh144CTpe-iHKA", 
    consumerSecret: "AQidIB9YBo7kjk5K2ulOBlqdE0A",
    accessToken: "HcamZ5izqoZG6JYmaHY2KwyQBPH2BtiU",
    // You wouldn't actually want to expose your access token secret like this in a real application.
    accessTokenSecret: "mrsNPAzeX_Lg8nMrvf9dxLdNPYE",
    serviceProvider: { 
      signatureMethod: "HMAC-SHA1"
    }
  };

  var accessor = {
    consumerSecret: auth.consumerSecret,
    tokenSecret: auth.accessTokenSecret
  };

  myParameters = [];

  myParameters.push(['phone', phoneNumber]);
  myParameters.push(['callback', 'cb']);
  myParameters.push(['oauth_consumer_key', auth.consumerKey]);
  myParameters.push(['oauth_consumer_secret', auth.consumerSecret]);
  myParameters.push(['oauth_token', auth.accessToken]);
  myParameters.push(['oauth_signature_method', 'HMAC-SHA1']);

  var myMessage = {
    'action': 'http://api.yelp.com/v2/phone_search',
    'method': 'GET',
    'parameters': myParameters 
  }

  OAuth.setTimestampAndNonce(myMessage);
  OAuth.SignatureMethod.sign(myMessage, accessor);

  var parameterMap = OAuth.getParameterMap(myMessage.parameters);
  parameterMap.oauth_signature = OAuth.percentEncode(parameterMap.oauth_signature)
  //console.log(parameterMap);

  $.ajax({
    'url': myMessage.action,
    'data': parameterMap,
    'cache': true,
    'dataType': 'jsonp',
   // 'jsonpCallback': 'cb',
    'success': function(data, textStats, XMLHttpRequest) {
      //set local variables to info from ajax request
    //  var resultTitle = data.businesses[0].name;
    //  var resultStars = data.businesses[0].rating_img_url_large;
    //  var resultSnippet = data.businesses[0].snippet_text;
    //  var resultDisPhone = data.businesses[0].display_phone;
    //  var resultLocation = data.businesses[0].location;
    //  var resultDisAddress = data.businesses[0].location.address[0];
    //  var resultCategory  = data.businesses[0].categories;
    //  var stars = "<img src='"+resultStars+"'>";

      //debugging 
    //  console.log(data);
      //console.log("resultTitle= ", resultTitle);
      //console.log("snippet= ", resultSnippet);
      //console.log("phone= ", resultDisPhone);
      //console.log("rating URL= ", resultStars);
      //console.log("location ", resultLocation);
      //console.log("address ", resultDisAddress);
      //console.log("categories ", resultCategory);

      //add to display
    //  $("#yelp-title").append(resultTitle);
      //$("#yelp-phone").append(resultDisPhone);
      //$("#yelp-snippet").append(resultSnippet);
      //$("#yelp-address").append(resultDisAddress);
      //$("#yelp-rating").append(stars);

      console.log("in yelpAPI.js: data.businesses[0]=", data.businesses[0]);
    
      callback(data.businesses[0]);

    }
  });
  

}

/*
<body>
<p>Yelp Test</p>
<div class="yelp-container">
<h2 id="yelp-title"></h3>
<p id="yelp-category"></p>
<div id="yelp-rating"></div>
<p id="yelp-phone"></p>
<p id="yelp-address"><p>
<p id="yelp-snippet"></p>

  </div>
*/

