'use strict';

angular.module('foodiesApp')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/',
      'show': function() { return true; }
    }, {
      'title': 'Signup',
      'link': '/signup',
      'show': function() { return !$scope.currentUser; }
    }, {
      'title': 'Login',
      'link': '/login',
      'show': function() { return !$scope.currentUser; } 
    },  {
      'title': 'Logout',
      'link': '/logout',
      'show': function() {
        var path = $location.path();
        return $scope.currentUser && (path !== '/login' && path !== '/signup');
      }
    }];
    
    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
