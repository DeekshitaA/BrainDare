angular.module('app',
  [
    'ionic',
    'ngCordova',
    'base64',
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

  .config(function($ionicAppProvider) {
    $ionicAppProvider.identify({
      app_id: 'b90389e8',
      api_key: 'ad1b4c020a434289985ae0e41ce7034178893c4b93bd9ea4',
      dev_push: true
    });
  })

  .run(function($ionicPlatform, $http, $base64) {
    $http.defaults.headers.post['Authorization'] = 'Basic ' + $base64.encode('15fc98fdd99c51bdfb62cc3310d26dc145a5195f04c76fac' + ':' + '');

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

      if(device && device.platform === "iOS") {
        window.plugin.notification.local.promptForPermission();
      }

      window.plugin.notification.local.onadd = function (id, state, json) {
        var notification = {
          id: id,
          state: state,
          json: json
        };
        $timeout(function() {
          $rootScope.$broadcast("$cordovaLocalNotification:added", notification);
        });
      };

    });
  })




  .factory('Auth', function($firebaseAuth) {
    var endPoint = 'https://boiling-heat-1945.firebaseio.com';
    var usersRef = new Firebase(endPoint);
    return $firebaseAuth(usersRef);
  })

  .factory('firebaseData', function($firebase, FIREBASE_URI) {
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

  })


.constant('FIREBASE_URI', 'https://boiling-heat-1945.firebaseio.com');

