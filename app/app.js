(function () {
  'use strict';
  angular.module('StarterApp',['ngMaterial','ui.router'])

  .config(['$stateProvider','$mdThemingProvider','$mdGestureProvider',function($stateProvider,$mdThemingProvider,$mdGestureProvider){
    $mdThemingProvider.theme('default')
    .primaryPalette('blue')
    .accentPalette('red');
  }])

  .controller('LeftCtrl', function ($scope, $timeout, $mdSidenav, $log) {
   $scope.close = function () {
     $mdSidenav('left').close()
       .then(function () {
         $log.debug("close LEFT is done");
       });
   };
 })

 .controller('NavCtrl',function ($scope,$timeout,$mdSidenav,$log) {
   $scope.toggleLeft = buildDelayedToggler('left');

   function debounce(func, wait, context) {
    var timer;
    return function debounced() {
      var context = $scope,
          args = Array.prototype.slice.call(arguments);
      $timeout.cancel(timer);
      timer = $timeout(function() {
        timer = undefined;
        func.apply(context, args);
      }, wait || 10);
    };
  }
  /**
   * Build handler to open/close a SideNav; when animation finishes
   * report completion in console
   */
  function buildDelayedToggler(navID) {
    return debounce(function() {
      $mdSidenav(navID)
        .toggle()
        .then(function () {
          $log.debug("toggle " + navID + " is done");
        });
    }, 200);
  }
 })


  // body...
}());
