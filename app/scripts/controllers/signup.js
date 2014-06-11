'use strict';

angular.module('foodiesApp')
  .controller('SignupCtrl', ['$scope', 'Auth', function ($scope, Auth) {
    $scope.signup = function() {
      Auth.signup({
        name: $scope.name
      });
    }
  }]);
