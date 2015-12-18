(function(){
  'use strict';

  angular.module('app.login', ['ngCordova'])

     .controller('loginCtrl'  , function($scope, auth, $state, store, Auth){
        //auth.signin({
        //  closable: false,
        //  // This asks for the refresh token
        //  // So that the user never has to log in again
        //  authParams: {
        //    scope: 'openid offline_access'
        //  }
        //}, function(profile, idToken, accessToken, state, refreshToken) {
        //  store.set('profile', profile);
        //  store.set('token', idToken);
        //  store.set('refreshToken', refreshToken);
        //  auth.getToken({
        //    api: 'firebase'
        //  }).then(function(delegation) {
        //    store.set('firebaseToken', delegation.id_token);
        //    $state.go('tab.dash');
        //  }, function(error) {
        //    console.log("There was an error logging in", error);
        //  })
        //}, function(error) {
        //  console.log("There was an error logging in", error);
        //});
     // }
     //   $scope.$on('$ionic.reconnectScope', function() {
     //     this.login();
     //   });
     //
     //   this.login();

     //
        this.facebook = function() {
          Auth.$authWithOAuthPopup("facebook").then(function(authData){
            console.log(authData);
            $state.go('tab.dash');
          }).catch(function(error){
            console.error(error);
          },{
            remember: "sessionOnly",
            scope: "email,user_likes"
          })

        //$cordovaOauth.facebook("519087128259422", ["email"]).then(function(result) {
        // // Auth.$authWithOAuthToken("facebook", result.access_token).then(function (authData) {
        // //   console.log(JSON.stringify(authData));
        //    $window.localStorage.accessToken = result.access_token;
        //    $location.path("/profile");
        //  //}, function (error) {
        //  //  console.error("ERROR: " + error);
        //  //});
        //}, function(error) {
        //  alert("There was a problem signing in!  See the console for logs");
        //  console.log(error);
        //});
     };

       this.logout = function (){
         Auth.$unauth();
       }
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
        Auth.$onAuth(function(authData) {

          if (authData === null) {
            console.log('Not logged in yet');
          } else {
            console.log('Logged in as', authData.uid);
          //  $location.path("/profile");
          }
          // This will display the user's name in our view
          $scope.authData = authData;
         console.log('authData', $scope.authData);
        });


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
