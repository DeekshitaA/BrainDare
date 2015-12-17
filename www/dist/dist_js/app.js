angular.module('app',
  [
    'ionic',
    'auth0',
    'firebase',
    'angular-storage',
    'angular-jwt',
    'ionic.service.core',
    'templates',
    'app.welcome',
    'app.register',
    'app.login',
    'app.profile',
    'app.landing',
    'app.tabs'
  ])
  .run(['$ionicPlatform', '$rootScope', 'auth', 'store', 'jwtHelper', '$location', function($ionicPlatform, $rootScope, auth, store, jwtHelper, $location) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });

    auth.hookEvents();
    //This event gets triggered on URL change
    var refreshingToken = null;
    $rootScope.$on('$locationChangeStart', function() {
      var token = store.get('token');
      var refreshToken = store.get('refreshToken');
      if (token) {
        if (!jwtHelper.isTokenExpired(token)) {
          if (!auth.isAuthenticated) {
            auth.authenticate(store.get('profile'), token);
          }
        } else {
          if (refreshToken) {
            if (refreshingToken === null) {
              refreshingToken = auth.refreshIdToken(refreshToken).then(function(idToken) {
                store.set('token', idToken);
                auth.authenticate(store.get('profile'), idToken);
              }).finally(function() {
                refreshingToken = null;
              });
            }
            return refreshingToken;
          } else {
            $location.path('/login');// Notice: this url must be the one defined
          }                          // in your login state. Refer to step 5.
        }
      }
      if (!auth.isAuthenticated) {
        var token = store.get('token');
        if (token) {
          auth.authenticate(store.get('profile'), token);
        }
      }
    });
  }])

  //.factory('Auth', function($firebaseAuth) {
  //  var endPoint = 'https://boiling-heat-1945.firebaseio.com';
  //  var usersRef = new Firebase(endPoint);
  //  return $firebaseAuth(usersRef);
  //})

.constant('FIREBASE_URI', 'https://boiling-heat-1945.firebaseio.com');

//.run(function($ionicPlatform ,$rootScope, auth, store, jwtHelper, $location) {
//    $ionicPlatform.ready(function() {
//      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
//      // for form inputs)
//      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
//        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
//        cordova.plugins.Keyboard.disableScroll(true);
//
//      }
//      if (window.StatusBar) {
//        // org.apache.cordova.statusbar required
//        StatusBar.styleLightContent();
//      }
//
//     // auth.hookEvents();
//
//
//
//      //This event gets triggered on URL change
//      //var refreshingToken = null;
//      //$rootScope.$on('$locationChangeStart', function() {
//      //  var token = store.get('token');
//      //  var refreshToken = store.get('refreshToken');
//      //  if (token) {
//      //    if (!jwtHelper.isTokenExpired(token)) {
//      //      if (!auth.isAuthenticated) {
//      //        auth.authenticate(store.get('profile'), token);
//      //      }
//      //    } else {
//      //      if (refreshToken) {
//      //        if (refreshingToken === null) {
//      //          refreshingToken = auth.refreshIdToken(refreshToken).then(function(idToken) {
//      //            store.set('token', idToken);
//      //            auth.authenticate(store.get('profile'), idToken);
//      //          }).finally(function() {
//      //            refreshingToken = null;
//      //          });
//      //        }
//      //        return refreshingToken;
//      //      } else {
//      //        $location.path('/login');// Notice: this url must be the one defined
//      //      }                          // in your login state. Refer to step 5.
//      //    }
//      //  }
//      //});
//      //
//
//
//
//
//
//
//
//
//
//// kick off the platform web client
//      Ionic.io();
//
//// this will give you a fresh user or the previously saved 'current user'
//      var user = Ionic.User.current();
//
//// if the user doesn't have an id, you'll need to give it one.
//      if (!user.id) {
//        user.id = Ionic.User.anonymousId();
//        // user.id = 'your-custom-user-id';
//      }
//
////persist the user
//      user.save();
//      var push = new Ionic.Push({
//        "debug": true
//      });
//
//      push.register(function(token) {
//        console.log("Device token:",token.token);
//      });
//    });
//  })
