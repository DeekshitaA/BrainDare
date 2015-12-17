(function(){
  'use strict';


  angular.module('app.tabs', ['firebase'])

  .controller('DashCtrl', ['brainDareService', '$state', function(brainDareService, $state) {

    this.goToState = function(state) {
      $state.go(state);
    }
    //this.currentItem = null;
    //
    //this.items = brainDareService.getItems();
    //
    //this.addItem = function () {
    //  brainDareService.addItem(angular.copy(this.newItem));
    //  this.newItem = { id: '', name: '' };
    //};
    //
    //this.updateItem = function (id) {
    //  brainDareService.updateItem(id);
    //};
    //
    //this.removeItem = function (id) {
    //  brainDareService.removeItem(id);
    //};

}])
  .controller('SelfCtrl', ['brainDareService', function(brainDareService){
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
  }])
  .controller('ChatsCtrl', ['$scope', function($scope) {
    //this.chats = Chats.all();
    //this.remove = function(chat) {
    //  Chats.remove(chat);
    //}
  }])



  .controller('AccountCtrl', ['$scope', 'auth', 'store', '$state', function($scope, auth, store, $state) {
    this.logout = function () {
      auth.signout();
      store.remove('token');
      store.remove('profile');
      store.remove('refreshToken');
      $state.go('login', {}, {reload: true});
    };

  }])

  .factory('brainDareService', ['$firebaseArray', 'FIREBASE_URI', function($firebaseArray, FIREBASE_URI) {

    var ref = new Firebase(FIREBASE_URI);
    var dares = ref.child('dares');
    var items = $firebaseArray(dares);

     var getItems = function() {
      return items;
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
      addItem : addItem,
      updateItem : updateItem,
      removeItem : removeItem
    }

  }])

}());
