(function(){
  'use strict';

  angular.module('app.login', ['ngCordova'])

   // .controller('loginCtrl' ,['loginUserService', '$location','$cordovaOauth','$window','auth','$scope', function(loginUserService, $location, $cordovaOauth, $window, auth, $scope){
      .controller('loginCtrl'  , function($scope, auth, $state, store){
      this.login = function() {
        auth.signin({
          authParams: {
            scope: 'openid offline_access',
            device: 'Mobile device'
          }
        }, function(profile, token, accessToken, state, refreshToken) {
          // Success callback
          store.set('profile', profile);
          store.set('token', token);
          store.set('refreshToken', refreshToken);
          $state.go('profile');
        }, function() {
          // Error callback
        });
      }
        $scope.$on('$ionic.reconnectScope', function() {
          this.login();
        });

        this.login();

     //
     //   this.facebook = function() {
     //   $cordovaOauth.facebook("519087128259422", ["email"]).then(function(result) {
     //    // Auth.$authWithOAuthToken("facebook", result.access_token).then(function (authData) {
     //    //   console.log(JSON.stringify(authData));
     //       $window.localStorage.accessToken = result.access_token;
     //       $location.path("/profile");
     //     //}, function (error) {
     //     //  console.error("ERROR: " + error);
     //     //});
     //   }, function(error) {
     //     alert("There was a problem signing in!  See the console for logs");
     //     console.log(error);
     //   });
     //};

    //  this.login = function(authMethod) {
    //    console.log("Login Got it ");
    //    Auth.$authWithOAuthRedirect(authMethod).then(function(authData) {
    //      console.log("Got here ha !!!!!", authData);
    //    }).catch(function(error) {
    //      if (error.code === 'TRANSPORT_UNAVAILABLE') {
    //        Auth.$authWithOAuthPopup(authMethod).then(function(authData) {
    //        });
    //      } else {
    //        console.log(error);
    //      }
    //    });
    //
    //    Auth.$onAuth(function(authData) {
    //
    //      if (authData === null) {
    //        console.log('Not logged in yet');
    //      } else {
    //        console.log('Logged in as', authData.uid);
    //      //  $location.path("/profile");
    //      }
    //      // This will display the user's name in our view
    //      $scope.authData = authData;
    //     // console.log('authData', this.authData);
    //    });
    //  };

    })



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
