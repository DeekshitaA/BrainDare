(function () {
  'use strict';

  angular.module('starter')
    .config(['$stateProvider', '$urlRouterProvider', Config]);

  function Config($stateProvider, $urlRouterProvider) {
    $stateProvider

      // setup an abstract state for the tabs directive
      .state('welcome', {
        url: '/',
        controller : 'welcomeCtrl',
        templateUrl: 'welcome.html'
      })


    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/');
  }
}());
