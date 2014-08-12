/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var Vector2 = require('vector2');
var Accel = require('ui/accel');
var ajax = require('ajax');
// options for the geolocation
var locationOptions = {
    "timeout": 15000,
    "maximumAge": 60000,
    "enableHighAccuracy": true
};


// define a "card", a basic UI element
var main = new UI.Card({
  title: 'QuackTap',
  icon: 'images/menu_icon.png',
  subtitle: 'Hello SideProject!',
  body: 'Tap me to hear the latest quack.'
});

// show the main card
main.show();


// handle accelerometer tap event...
Accel.on("tap", function(e) {
  // send location to our webservice
  window.navigator.geolocation.getCurrentPosition(function(pos) {
        ajax({
          url: 'http://quackreader-21513.onmodulus.net/getquacks?lat='+pos.coords.latitude+'&lon='+pos.coords.longitude,
            },
            function(data) {
                if ("status" in data && data.status === 'success') {
                    console.log("success");
                } else {
                    console.log("failed");
                }
            });
    }, function(err) {
      console.log("failed");
    }, locationOptions);
});
