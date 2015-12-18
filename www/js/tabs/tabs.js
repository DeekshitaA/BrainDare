(function(){
  'use strict';


  angular.module('app.tabs', ['firebase'])

  .controller('DashCtrl', function($scope,brainDareService, $state, Auth) {
    this.showSelfDares = false;

    this.goToState = function(state) {
      $state.go(state);
    }
    Auth.$onAuth(function(authData) {

      if (authData === null) {
        console.log('Not logged in yet');
      } else {
        console.log('Logged in as', authData.uid);
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

    this.items = brainDareService.getItems();

    this.items.$loaded().then(function(dares) {
      console.log(dares.length); // data is loaded here
      $scope.count = dares.length;
    });

    this.removeItem = function (id) {
      brainDareService.removeItem(id);
    };

  })
  .controller('SelfCtrl', function(brainDareService){
    this.currentItem = null;

    this.items = brainDareService.getItems();

    this.addItem = function () {
      brainDareService.addItem(angular.copy(this.newItem));
      this.newItem = { id: '', name: '', type:'self'};
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


  .controller('AccountCtrl', function($scope, auth, store, $state, Auth) {
    //this.logout = function () {
    //  auth.signout();
    //  store.remove('token');
    //  store.remove('profile');
    //  store.remove('refreshToken');
    //  //$state.go('login', {}, {reload: true});
    //  $state.go('login');
    //};
  this.logout = function (){
    Auth.$unauth();
    $state.go('login');
  }
  })

  .factory('brainDareService', function($firebaseArray, FIREBASE_URI) {

    var ref = new Firebase(FIREBASE_URI);
    var dares = ref.child('dares');
    var items = $firebaseArray(dares);

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
      numChildren: numChildren,
      addItem : addItem,
      updateItem : updateItem,
      removeItem : removeItem
    }

  })

}());
