(function () {
  //'use strict';

  angular.module('app')
    .config(['$stateProvider', '$urlRouterProvider','$locationProvider', Config]);

  function Config($stateProvider, $urlRouterProvider, $locationProvider) {

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

      .state('login', {
        url: '/login',
        controller: 'loginCtrl as login',
        templateUrl: 'login.html',
      })

      .state('landing', {
        url:'/landing',
        controller: 'landingCtrl as landing',
        templateUrl: 'landing.html'
      })

      .state('profile', {
        url:'/profile',
        controller: 'profileCtrl as profile',
        templateUrl: 'profile.html'
      })

      .state('feed', {
        url:'/feed',
        controller: 'feedCtrl as feed',
        templateUrl: 'feed.html'
      });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/');
   // $locationProvider.html5Mode(true);
  }
}());
