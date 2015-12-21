angular.module('app',
  [
    'ionic',
    'ionic-material',
    'ionic.service.core',
    'ionic.service.push',
    'firebase',
    'templates',
    'app.welcome',
    'app.register',
    'app.login',
    'app.profile',
    'app.landing',
    'app.tabs'
  ])

  .config(['$ionicAppProvider', function($ionicAppProvider) {
    $ionicAppProvider.identify({
      app_id: 'b90389e8',
      api_key: 'ad1b4c020a434289985ae0e41ce7034178893c4b93bd9ea4',
      dev_push: false
    });
  }])

  .run(['$ionicPlatform', function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }

      if(window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }

      var push = new Ionic.Push({
        "debug": true
      });

      push.register(function(token) {
        console.log("Device token:",token.token);
      });
    });
  }])

  //.run(function($ionicPlatform, $rootScope, auth, store, jwtHelper, $location) {
  //  $ionicPlatform.ready(function() {
  //    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
  //    // for form inputs)
  //    if (window.cordova && window.cordova.plugins.Keyboard) {
  //      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
  //    }
  //    if (window.StatusBar) {
  //      // org.apache.cordova.statusbar required
  //      StatusBar.styleDefault();
  //    }
  //  });
  //
  //  auth.hookEvents();
  //  //This event gets triggered on URL change
  //  var refreshingToken = null;
  //  $rootScope.$on('$locationChangeStart', function() {
  //    var token = store.get('token');
  //    var refreshToken = store.get('refreshToken');
  //    if (token) {
  //      if (!jwtHelper.isTokenExpired(token)) {
  //        if (!auth.isAuthenticated) {
  //          auth.authenticate(store.get('profile'), token);
  //        }
  //      } else {
  //        if (refreshToken) {
  //          if (refreshingToken === null) {
  //            refreshingToken = auth.refreshIdToken(refreshToken).then(function(idToken) {
  //              store.set('token', idToken);
  //              auth.authenticate(store.get('profile'), idToken);
  //            }).finally(function() {
  //              refreshingToken = null;
  //            });
  //          }
  //          return refreshingToken;
  //        } else {
  //          $location.path('/login');// Notice: this url must be the one defined
  //        }                          // in your login state. Refer to step 5.
  //      }
  //    }
  //    if (!auth.isAuthenticated) {
  //      var token = store.get('token');
  //      if (token) {
  //        auth.authenticate(store.get('profile'), token);
  //      }
  //    }
  //  });
  //})

  .factory('Auth', ['$firebaseAuth', function($firebaseAuth) {
    var endPoint = 'https://boiling-heat-1945.firebaseio.com';
    var usersRef = new Firebase(endPoint);
    return $firebaseAuth(usersRef);
  }])

  .factory('firebaseData', ['$firebase', 'FIREBASE_URI', function($firebase, FIREBASE_URI) {
    var ref = new Firebase(FIREBASE_URI);

    var users = function() {
      return ref.child('users');
    }

   var getDares = function(){
     return ref.child('dares');
   }

    return {
      getUsers : users,
      getDares : getDares
    }

  }])


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
