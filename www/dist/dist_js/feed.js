(function(){
  'use strict';

  angular.module('app.profile', ['ngCordova'])

.controller("feedCtrl",'$http', '$localStorage', '$location', function( $http, $localStorage, $location) {

  this.init = function() {
    if($localStorage.hasOwnProperty("accessToken") === true) {
      $http.get("https://graph.facebook.com/v2.2/me/feed", { params: { access_token: $localStorage.accessToken, format: "json" }}).then(function(result) {
        this.feedData = result.data.data;
        $http.get("https://graph.facebook.com/v2.2/me", { params: { access_token: $localStorage.accessToken, fields: "picture", format: "json" }}).then(function(result) {
          this.feedData.myPicture = result.data.picture.data.url;
        });
      }, function(error) {
        alert("There was a problem getting your profile.  Check the logs for details.");
        console.log(error);
      });
    } else {
      alert("Not signed in");
      $location.path("/login");
    }
  };

});

}());
