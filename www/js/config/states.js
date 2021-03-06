(function () {
  //'use strict';

  angular.module('app')
    .config(['$stateProvider', '$urlRouterProvider','$locationProvider', '$httpProvider', Config])

    //.run(function($rootScope, auth, store) {
    //  $rootScope.$on('$locationChangeStart', function() {
    //    if (!auth.isAuthenticated) {
    //      var token = store.get('token');
    //      if (token) {
    //        auth.authenticate(store.get('profile'), token);
    //      }
    //    }
    //
    //  });
    //})

      function Config($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

        $stateProvider

          .state('register', {
            url: '/register',
            controller: 'registerCtrl as register',
            templateUrl: 'register.html',
          })

          .state('login', {
            url: '/login',
            controller: 'loginCtrl as login',
            templateUrl: 'login.html',
         })

          //.state('landing', {
          //  url: '/landing',
          //  controller: 'landingCtrl as landing',
          //  templateUrl: 'landing.html'
          //})
          //
          //.state('profile', {
          //  url: '/profile',
          //  controller: 'profileCtrl as profile',
          //  templateUrl: 'profile.html'
          //})

          // setup an abstract state for the tabs directive
          .state('tab', {
            url: "/tab",
            abstract: true,
            templateUrl: "tabs.html",
            // The tab requires user login
            //data: {
            //  requiresLogin: true
            //}
          })

          // Each tab has its own nav history stack:

          .state('tab.dash', {
            url: '/dash',
            views: {
              'tab-dash': {
                templateUrl: 'tab-dash.html',
                controller: 'DashCtrl as dash'
              }
            }
          })

          .state('tab.dare', {
            url:'/dash/dare',
            views: {
              'tab-dash': {
                templateUrl : 'tab-dare.html',
                controller: 'DareCtrl as dare'
              }
            }
          })

          //.state('tab.group', {
          //  url:'/dash/group',
          //  views: {
          //    'tab-self': {
          //      templateUrl : 'tab-group.html',
          //      controller: 'GroupCtrl as group'
          //    }
          //  }
          //})

          .state('tab.chats', {
            url: '/chats',
            views: {
              'tab-chats': {
                templateUrl: 'tab-chats.html',
                controller: 'ChatsCtrl as chats'
              }
            }
          })
          //.state('tab.chat-detail', {
          //  url: '/chats/:chatId',
          //  views: {
          //    'tab-chats': {
          //      templateUrl: 'chat-detail.html',
          //      controller: 'ChatDetailCtrl as chatDet'
          //    }
          //  }
          //})

          .state('tab.account', {
            url: '/account',
            views: {
              'tab-account': {
                templateUrl: 'tab-account.html',
                controller: 'AccountCtrl as account'
              }
            }
          });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/login');

      }
}());
