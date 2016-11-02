/* global $ angular */
'use strict';

var app = angular.module("VotingApp", ["ngRoute", "chart.js", "ngAnimate"]);

app.config(function($routeProvider, ChartJsProvider ) {
  
  $routeProvider
    .when('/', {
      templateUrl: 'views/home.html',
      controller: 'HomeCtrl'
    })
    .when('/profile', {
      templateUrl: 'views/profile.html',
      controller: 'ProfileCtrl',
      resolve: {
        logincheck: checkLoggedin
      }
    })
    .when('/login', {
      templateUrl: 'views/login.html',
      controller: 'LoginCtrl'
    })
    .when('/signup', {
      templateUrl: 'views/signup.html',
      controller: 'SignUpCtrl'
    })
    .when('/newpoll', {
      templateUrl: 'views/newPoll.html',
      controller: 'NewPollCtrl',
      resolve: {
        logincheck: checkLoggedin
      }
    })
    .when('/polls/:id', {
      templateUrl: 'views/poll.html',
      controller: 'PollCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
    
  ChartJsProvider.setOptions({ colors : [ '#803690', '#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'] });
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

