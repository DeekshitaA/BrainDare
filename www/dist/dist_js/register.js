(function(){
  'use strict';

  angular.module('app.register', [])

    .controller('registerCtrl' ,['registerUserService', function(registerUserService){

      this.user ={};

      this.test = "Hello";

      this.addUser = function() {
        console.log(this.user);
        registerUserService.createUser(this.user);
      };
    }])

    .service('registerUserService', ['$http', function($http){
      this.createUser = function(user) {
        var data = user;
        $http({
          url: 'http://localhost:3000/user/signup',
          method: 'POST',
          data: data,
        })
          .then(function(data, status, headers, config){
            console.log('Success!');
            // called when the data is available
          },
          function(data, status, headers, config) {
            console.log('Failure :(');
            // called when an error occurs or
            // the server returns data with an error status
          });
      };
     }])

})
