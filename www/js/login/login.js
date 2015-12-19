(function(){
  'use strict';

  angular.module('app.login', ['ngCordova'])

     .controller('loginCtrl'  , function($scope, $state, Auth, firebaseData){

       $scope.user = Auth.$getAuth();
       $scope.usersData = firebaseData.getUsers();
       $scope.isNewFBUser = false;
       if ($scope.user) {
        console.log($scope.user);
       }

      this.facebook = function() {
          Auth.$authWithOAuthPopup("facebook").then(function(authData){
            $scope.isNewFBUser = true;
            console.log(authData);
            $state.go('tab.dash');
          }).catch(function(error){
            console.error(error);
          },{
            remember: "sessionOnly",
            scope: "email,user_likes"
          });

        };

          this.emailLogin = function(email, pwd) {

            Auth.$authWithPassword({
              email    : email,
              password : pwd
            }).then(function(authData) {
              console.log(authData);
              $state.go('tab.dash');
            }).catch(function(error) {
              console.log(error);
            });
          };


       this.logout = function (){

         Auth.$unauth();

       };

        Auth.$onAuth(function(authData) {

          if (authData && $scope.isNewFBUser) {
            // save the user's profile into Firebase so we can list users,
            // use them in Security and Firebase Rules, and show profiles
            $scope.usersData.child(authData.uid).set({
              userId: authData.uid,
              provider: authData.provider,
              name: authData.facebook.displayName
            });
            $scope.isNewFBUser = false;
          }

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
