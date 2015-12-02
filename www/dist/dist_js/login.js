(function(){
  'use strict';

  angular.module('app.login', ['ngCordova'])

    .controller('loginCtrl' ,['loginUserService', '$location','$cordovaOauth','$window', function(loginUserService, $location, $cordovaOauth, $window){

      this.facebook = function() {
        $cordovaOauth.facebook("519087128259422", ["email"]).then(function(result) {
          $window.localStorage.accessToken = result.access_token;
          $location.path("/profile");
        }, function(error) {
          alert("There was a problem signing in!  See the console for logs");
          console.log(error);
        });
     };

    }])

    .service('loginUserService', ['$http', '$location', function($http, $location){
      this.userInfo = function() {
       $http({
          url: 'http://localhost:3000/auth/facebook',
          method: 'GET'
         })
          .then(function(data, status, headers, config){
            console.log('Success!');
            return data;
            // called when the data is available
          },
          function(data, status, headers, config) {
            console.log('Failure :(');
            return data;
            // called when an error occurs or
            // the server returns data with an error status
          });
      };
    }]);

}());
