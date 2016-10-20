/* global angular */
'use strict';

var app = angular.module("VotingApp", ["ngRoute"]);

app.config(function($routeProvider) {
  
  $routeProvider
    .when('/home', {
      templateUrl: 'views/home.html'
    })
    .when('/login', {
      templateUrl: 'views/login.html',
      controller: 'LoginCtrl'
    })
    .when('/signup', {
      templateUrl: 'views/signup.html',
      controller: 'SignUpCtrl'
    })
    .when('/profile', {
      templateUrl: 'views/profile.html',
      resolve: {
        logincheck: checkLoggedin
      }
    })
    .otherwise({
      redirectTo: '/home'
    });
});

var checkLoggedin = function($q, $timeout, $http, $location, $rootScope) {
  var deferred = $q.defer();

  $http.get('/loggedin').success(function(user) {
    $rootScope.errorMessage = null;
    if (user !== '0') {
      $rootScope.currentUser = user;
      deferred.resolve();
    } else {
      $rootScope.errorMessage = 'You need to log in.';
      deferred.reject();
      $location.url('/login');
    }
  });
  return deferred.promise;
};