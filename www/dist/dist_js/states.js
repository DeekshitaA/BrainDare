(function () {
  //'use strict';

  angular.module('app')
    .config(['$stateProvider', '$urlRouterProvider', Config]);

  function Config($stateProvider, $urlRouterProvider) {

    $stateProvider

      // setup an abstract state for the tabs directive
      .state('welcome', {
        url: '/',
        controller : 'welcomeCtrl',
        templateUrl: 'welcome.html',
        controllerAs: 'welcome'
      })

      .state('register', {
        url: '/register',
        controller: 'registerCtrl as register',
        templateUrl: 'register.html',
       // controllerAs: 'register'
      })


    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/');
  }
}());
