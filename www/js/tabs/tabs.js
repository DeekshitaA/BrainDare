(function(){
  'use strict';


  angular.module('app.tabs', ['firebase'])

  //  The Dashboard controller
  .controller('DashCtrl', function($scope,brainDareService, $state, Auth, firebaseData) {

    $scope.user = brainDareService.getUser();
    this.showSelfDares = false;

    Auth.$onAuth(function(authData) {

      if (authData === null) {
        console.log('Not logged in yet');
      } else {
        console.log('Logged in as', authData.uid);
        console.log('User info : ', $scope.user);
      }
      // This will display the user's name in our view
      $scope.authData = authData;
    });

    this.selfDares = function(){
      if($scope.count && $scope.count > 0 && !this.showSelfDares){
        this.showSelfDares = true;
      } else if(this.showSelfDares === true){
        this.showSelfDares = false;
      }
    }

    this.addDare = function(){
      $state.go('tab.dare');
    }

    this.items = brainDareService.getItems();

    this.items.$loaded().then(function(dares) {
      console.log(dares.length); // data is loaded here
      $scope.count = dares.length;
    });

    this.removeItem = function (id) {
      brainDareService.removeItem(id);
    };

  })

  //  The Dare Form Controller

  .controller('DareCtrl', function($scope, brainDareService){

    this.completeDate = "Complete by";
    this.remindDate = "Remind me on";

    this.showDatePicker = function(kind, $event) {
      var kind = kind;
      var options = {
        date: new Date(),
        mode: 'datetime', // 'date' or 'time'
        minDate: new Date(),
        allowOldDates: false,
        allowFutureDates: true,
        doneButtonLabel: 'DONE',
       // doneButtonColor: '#F2F3F4',
        cancelButtonLabel: 'CANCEL',
      //  cancelButtonColor: '#000000'
      };
      datePicker.show(options, function(date){
        if(date != 'Invalid Date') {

          if(kind === 'complete'){
            this.completeDate = date;
          } else if(kind === 'remind'){
            this.remindDate = date;
          }
        } else {
          console.log(date);
        }
      });
      $event.stopPropagation();
    };

    this.user = brainDareService.getUser();

    this.currentItem = null;

    this.items = brainDareService.getItems();

    this.addDare = function () {

      this.newItem = {
        by: this.user.uid,
        taskName: this.taskName,
        taskDescr: this.taskDescr,
        completeDate: this.completeDate,
        remindDate: this.remindDate,
        type:'self'

      };
      brainDareService.addItem(angular.copy(this.newItem));

    };

    this.updateItem = function (id) {
      brainDareService.updateItem(id);
    };

    this.removeItem = function (id) {
      brainDareService.removeItem(id);
    };
  })


  .controller('ChatsCtrl', function($scope) {

  })


  //  The Account Settings controller

  .controller('AccountCtrl', function($scope, $state, Auth, $rootScope, $ionicUser, $ionicPush) {

      this.logout = function (){
        Auth.$unauth();
        $state.go('login');
      };

      this.identifyUser = function(){
        var user = $ionicUser.get();
        if(!user.user_id) {
          // Set your user_id here, or generate a random one.
          user.user_id = $ionicUser.generateGUID();
        };

        // Metadata
        angular.extend(user, {
          name: 'DK',
          bio: 'Author of BrainDare'
        });

        // Identify your user with the Ionic User Service
        $ionicUser.identify(user).then(function(){
          $scope.identified = true;
          console.log('Identified user ' + user.name + '\n ID ' + user.user_id);
        });
      };

      this.pushRegister = function() {
        console.log('Ionic Push: Registering user');

        // Register with the Ionic Push service.  All parameters are optional.
        $ionicPush.register({
          canShowAlert: true, //Can pushes show an alert on your screen?
          canSetBadge: true, //Can pushes update app icon badges?
          canPlaySound: true, //Can notifications play a sound?
          canRunActionsOnWake: true, //Can run actions outside the app,
          onNotification: function(notification) {
            // Handle new push notifications here
            console.log('Push Notification result: ', notification);
            return true;
          }
        });
      };

      $rootScope.$on('$cordovaPush:tokenReceived', function(event, data) {
        alert("Successfully registered token " + data.token);
        console.log('Ionic Push: Got token ', data.token, data.platform);
        $scope.token = data.token;
      });

  })

  //  Common service with the CRUD for user dares

  .factory('brainDareService', function($firebaseArray, FIREBASE_URI) {

    var ref = new Firebase(FIREBASE_URI);
    var dares = ref.child('dares');
    var items = $firebaseArray(dares);
    var user = ref.getAuth();

    var getUser = function(){
      return user;
    };

     var getItems = function() {
      return items;
    };

    var numChildren = function(){
      return dares.numChildren();
    };

    var addItem = function(item) {
      return items.$add(item);
    };

    var updateItem = function(id) {
      return items.$save(id);
    };

    var removeItem = function(id) {
      return items.$remove(id);
    };

    return {
      getItems : getItems,
      getUser : getUser,
      numChildren: numChildren,
      addItem : addItem,
      updateItem : updateItem,
      removeItem : removeItem
    }

  })

}());
