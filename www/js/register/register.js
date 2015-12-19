(function(){
  'use strict';

  angular.module('app.register', [])

    .controller('registerCtrl', function($scope, Auth, firebaseData, $state){

      $scope.usersData = firebaseData.getUsers();

     this.addUser = function(email, pwd, name) {
       //console.log(this.user);
       //registerUserService.createUser(this.user).then(function(response) {
       //    console.log("You got to the place ", response);
       //})
       Auth.$createUser({
         email: email,
         password: pwd
       }).then(function (userData) {
         console.log("User " + userData.uid + " created successfully!");
         $scope.isNewUser = true;
         $scope.name = name;
         return Auth.$authWithPassword({
           email: email,
           password: pwd
         });
       }).then(function (authData) {
         console.log("Logged in as:", authData.uid);
         $scope.usersData.child(authData.uid).set({
           userId: authData.uid,
           provider: authData.provider,
           name: name
           //some more user data
         });
         $state.go('tab.dash');
       }).catch(function (error) {
         console.error("Error: ", error);
       });
     };

       Auth.$onAuth(function(authData) {

         //if (authData &&  $scope.isNewUser) {
         //  var name = $scope.name;
         //  // save the user's profile into Firebase so we can list users,
         //  // use them in Security and Firebase Rules, and show profiles
         //  $scope.usersData.child(authData.uid).set({
         //    userId: authData.uid,
         //    provider: authData.provider,
         //    name: name
         //    //some more user data
         //  });
         //  $scope.isNewUser = false;
         //}

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

    .service('registerUserService', ['$http', '$location', function($http, $location){
      this.createUser = function(user) {
        var data = user;
        $http({
          url: 'http://localhost:3000/user/signup',
          method: 'POST',
          data: data,
        })
          .then(function(data, status, headers, config){
            console.log('Success!');
            return data;
            // called when the data is available
          },
          function(data, status, headers, config) {
            console.log('Failure :(');
            // called when an error occurs or
            // the server returns data with an error status
          });
      };
     }])

}());
