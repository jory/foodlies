'use strict';

angular.module('foodiesApp')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    }, {
      'title': 'Signup',
      'link': '/signup'
    }, {
      'title': 'Login',
      'link': '/login'
    }];
    
    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
