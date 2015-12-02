angular.module('app',
  [
    'ionic','ionic.service.core',
    'templates',
    'app.welcome',
    'app.register',
    'app.login',
    'app.profile',
    'app.landing'
  ])


.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleLightContent();
      }
// kick off the platform web client
      Ionic.io();

// this will give you a fresh user or the previously saved 'current user'
      var user = Ionic.User.current();

// if the user doesn't have an id, you'll need to give it one.
      if (!user.id) {
        user.id = Ionic.User.anonymousId();
        // user.id = 'your-custom-user-id';
      }

//persist the user
      user.save();
      var push = new Ionic.Push({
        "debug": true
      });

      push.register(function(token) {
        console.log("Device token:",token.token);
      });
    });
  })
