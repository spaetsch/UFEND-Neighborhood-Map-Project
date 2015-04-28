
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

  $.ajax({
    'url': myMessage.action,
    'data': parameterMap,
    'cache': true,
    'dataType': 'jsonp',
    'success': function(data, textStats, XMLHttpRequest) {    
      callback(data.businesses[0]);
    }
  }).error(function(e){
    $('#yelpWindow').text("Error: Yelp data could not be loaded");
  });
  

}



