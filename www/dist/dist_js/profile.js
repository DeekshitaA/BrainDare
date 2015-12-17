(function(){
  'use strict';

 angular.module('app.profile', ['ngCordova'])

.controller('profileCtrl', '$http', '$localStorage', '$locationfunction', 'auth', function( $http, $localStorage, $location, auth) {
 // this.auth = auth;
  this.init = function() {
    if($localStorage.hasOwnProperty("accessToken") === true) {
      $http.get("https://graph.facebook.com/v2.5/me", { params: { access_token: $localStorage.accessToken, fields: "id,name,gender,location,website,picture,relationship_status", format: "json" }}).then(function(result) {
        this.profileData = result.data;
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
