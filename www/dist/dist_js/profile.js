(function(){
  'use strict';

 angular.module('app.profile', ['ngCordova'])

.controller('profileCtrl', '$http', '$localStorage', '$locationfunction', function( $http, $localStorage, $location) {

  this.init = function() {
    if($localStorage.hasOwnProperty("accessToken") === true) {
      $http.get("https://graph.facebook.com/v2.2/me", { params: { access_token: $localStorage.accessToken, fields: "id,name,gender,location,website,picture,relationship_status", format: "json" }}).then(function(result) {
        $scope.profileData = result.data;
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
