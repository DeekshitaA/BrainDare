(function(){
  'use strict';


  angular.module('app.tabs', ['firebase'])

  //  The Dashboard controller
  .controller('DashCtrl', function($scope,brainDareService, $state, Auth, firebaseData, ionicMaterialInk, ionicMaterialMotion, quotes) {
    this.downArrow = true;

    ionicMaterialInk.displayEffect();

    ionicMaterialMotion.fadeSlideIn();
    quotes.getQuote().then(function(res) {
      console.log('res', res);
      $scope.quote = res;//res.data.contents.quotes[0].quote;
    });

    $scope.user = brainDareService.getUser();
    this.showSelfDares = false;

    this.getQuoteCat = function() {
      quotes.getQuote().then(function(res) {
        console.log('res', res);
        $scope.quote = res;//res.data.contents.quotes[0].quote;
      });
      console.log('this.quote', $scope.quote);
    };


    Auth.$onAuth(function(authData) {

      if (authData === null) {
        console.log('Not logged in yet');
      } else {
        $scope.uid = authData.uid;
        console.log('Logged in as', authData.uid);
        console.log('User info : ', $scope.user);
      }
      // This will display the user's name in our view
      $scope.authData = authData;
    });

    this.selfDares = function(){
      if($scope.count && $scope.count > 0 && !this.showSelfDares){
        this.showSelfDares = true;
        this.downArrow = false;
      } else if(this.showSelfDares === true){
        this.showSelfDares = false;
        this.downArrow = true;
      }
    }

    this.addDare = function(){
      $state.go('tab.dare');
    }

    this.items = brainDareService.getItems();

    this.items.$loaded().then(function(dares) {
      console.log('dares: ' , dares); // data is loaded here
      $scope.count = 0;
      for(var i = 0; i < dares.length; i++){
        if($scope.uid == dares[i].by)
          $scope.count ++;
      }
    });

    this.removeItem = function (id) {
      brainDareService.removeItem(id);
    };

  })

  //  The Dare Form Controller

  .controller('DareCtrl', function($scope, brainDareService){

    this.remindMeOptions = [
      {id:'1', name: '15 minutes'},
      {id:'2', name:'1 hour'},
      {id:'3', name:'day'},
      {id:'4', name:'15 days'},
    ];

    this.remindSelected = this.remindMeOptions[0];


    this.showDatePicker = function(kind, $event) {
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
           $scope.complete = date;
          console.log('this.completeDate',  $scope.complete);
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
      this.completeDate = $scope.complete;
      console.log('complete Date before Add', this.completeDate);
      this.newItem = {
        by: this.user.uid,
        taskName: this.taskName,
        taskDescr: this.taskDescr,
        completeDate: this.completeDate.getTime(),
        remindDate: this.remindSelected.name,
        type:'self'
     };
      console.log('complete Date on Add', this.completeDate);
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

  .controller('AccountCtrl', function($scope, $state, Auth, $rootScope, $ionicUser, $ionicPush, quotes, $cordovaLocalNotification) {

    this.add = function() {
      var alarmTime = new Date();
      alarmTime.setMinutes(alarmTime.getMinutes() + 1);
      $cordovaLocalNotification.add({
        id: "1234",
        date: alarmTime,
        message: "This is a message",
        title: "This is a title",
        autoCancel: true,
        sound: null
      }).then(function () {
        console.log("The notification has been set");
      });
    };

    this.isScheduled = function() {
      $cordovaLocalNotification.isScheduled("1234").then(function(isScheduled) {
        alert("Notification 1234 Scheduled: " + isScheduled);
      });
    };

    this.logout = function (){
        Auth.$unauth();
        $state.go('login');
    };

      this.identifyUser = function(){
        $scope.user = $ionicUser.get();
        if(!$scope.user.user_id) {
          // Set your user_id here, or generate a random one.
          $scope.user.user_id = $ionicUser.generateGUID();
        };

        // Metadata
        angular.extend($scope.user, {
          name: 'DK',
          bio: 'Author of BrainDare'
        });

        // Identify your user with the Ionic User Service
        $ionicUser.identify($scope.user).then(function(){
          $scope.identified = true;
          console.log('Identified user ' + $scope.user.name + '\n ID ' + $scope.user.user_id);
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
        quotes.getPushNotification($scope.token);
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

  .service('quotes', function($http){
    var quote = {};
    this.getQuote = function(){
      return  $http.get('http://quotes.rest/qod.json?category=inspire').then(function(result){
        console.log('quote categories result: ' ,result);
        quote = result.data.contents.quotes[0].quote;
       return quote;
      });
    }

    this.getPushNotification = function(token) {

      var token = token;
      var quote = this.getQuote();
      return $http({
          method: 'POST',
          url: 'https://push.ionic.io/api/v1/push ',
          headers: {
            'Content-Type': 'application/json',
            'X-Ionic-Application-Id': 'b90389e8'
          },
          data: {
            "tokens":[
              token
            ],
            "notification":{
              "alert":quote,
              "ios":{
                "badge":1,
                "sound":"ping.aiff",
                "expiry": 1423238641,
                "priority": 10,
                "contentAvailable": 1,
                "payload":{
                  "key1":"value",
                  "key2":"value"
                }
              },
              "android":{
                "collapseKey":"foo",
                "delayWhileIdle":true,
                "timeToLive":300,
                "payload":{
                  "key1":"value",
                  "key2":"value"
                }
              }
            }
          }
      }).then(function successCallback(response) {
        console.log(response.data);
      }, function errorCallback(response) {
        console.log("Oopies there seems to be an error");
      });

    }

  })

}());
