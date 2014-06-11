'use strict';

angular.module('foodiesApp')
  .factory('Auth', 
           ['$http', '$location', '$rootScope', '$cookieStore',
            function($http, $location, $rootScope, $cookieStore) {
              $rootScope.currentUser = $cookieStore.get('user');
              $cookieStore.remove('user');

              return {
                login: function(user) {
                  return $http.post('/api/login', user)
                    .success(function(data) {
                      $rootScope.currentUser = data;
                      $location.path('/');
                    })
                    .error(function() {
                    });
                },
                signup: function(user) {
                  return $http.post('/api/signup', user)
                    .success(function() {
                      $location.path('/login');
                    })
                    .error(function(response) {
                    });
                },
                logout: function() {
                  return $http.get('/api/logout').success(function() {
                    $rootScope.currentUser = null;
                    $cookieStore.remove('user');
                  });
                }
              }
            }])
