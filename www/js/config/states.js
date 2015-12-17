(function () {
  //'use strict';

  angular.module('app')
    .config(['$stateProvider', '$urlRouterProvider','authProvider','$locationProvider', '$httpProvider','jwtInterceptorProvider', Config])

      function Config($stateProvider, $urlRouterProvider, authProvider, $locationProvider, $httpProvider, jwtInterceptorProvider) {

        $stateProvider

        // setup an abstract state for the tabs directive
        //  .state('welcome', {
        //    url: '/',
        //    controller: 'welcomeCtrl',
        //    templateUrl: 'welcome.html',
        //    controllerAs: 'welcome'
        //  })

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
            url: '/landing',
            controller: 'landingCtrl as landing',
            templateUrl: 'landing.html'
          })

          .state('profile', {
            url: '/profile',
            controller: 'profileCtrl as profile',
            templateUrl: 'profile.html'
          })

          // setup an abstract state for the tabs directive
          .state('tab', {
            url: "/tab",
            abstract: true,
            templateUrl: "tabs.html",
            data: {
              //requiresLogin: true
            }
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

          .state('tab.dash_self', {
            url:'/dash/self',
            views: {
              'tab-dash': {
                templateUrl : 'tab-self.html',
                controller: 'SelfCtrl as self'
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
          .state('tab.chat-detail', {
            url: '/chats/:chatId',
            views: {
              'tab-chats': {
                templateUrl: 'chat-detail.html',
                controller: 'ChatDetailCtrl as chatDet'
              }
            }
          })

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
        $urlRouterProvider.otherwise('/tab/dash');


        authProvider.init({
          domain: 'dkapp.auth0.com',
          clientID: '0NF0PCmamT2ndVAq4lqdV1znp5Oaf91w',
          loginState: 'login' // This is the name of the state where you'll show the login, which is defined above...
        });

        // $locationProvider.html5Mode(true);

        jwtInterceptorProvider.tokenGetter = function (store, jwtHelper, auth) {
          var idToken = store.get('token');
          var refreshToken = store.get('refreshToken');
          // If no token return null
          if (!idToken || !refreshToken) {
            return null;
          }
          // If token is expired, get a new one
          if (jwtHelper.isTokenExpired(idToken)) {
            return auth.refreshIdToken(refreshToken).then(function (idToken) {
              store.set('token', idToken);
              return idToken;
            });
          } else {
            return idToken;
          }
        }
           $httpProvider.interceptors.push('jwtInterceptor');
      }
}());
