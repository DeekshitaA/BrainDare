(function(){
  'use strict';

  angular.module('app.register', [])

    .controller('registerCtrl' ,['registerUserService', function(registerUserService){

      this.user ={};

     this.addUser = function() {
        console.log(this.user);
        registerUserService.createUser(this.user).then(function(response) {
            console.log("You got to the place ", response);
        })
     };
    }])

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
