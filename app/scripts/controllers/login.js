'use strict';

angular.module('foodiesApp')
  .controller('LoginCtrl', ['$scope', 'Auth', function ($scope, Auth) {
    $scope.login = function() {
      Auth.login({
        username: $scope.username
      });
    }
  }]);
