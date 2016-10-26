/* global app */
'use strict';

app.controller("NavCtrl", function($rootScope, $scope, $http, $location) {
  $scope.logout = function() {
    $http.post("/logout")
      .success(function() {
        $rootScope.currentUser = null;
        $location.url("/home");
      });
  };
});

app.controller("SignUpCtrl", function($rootScope, $scope, $http, $location, $timeout, VoteSvc) {
  $scope.signupParams = VoteSvc.createUser();
  $scope.user = {};
  $scope.signup = function() {
    if ($scope.user.password === $scope.user.password2) {
      $http.post('/signup', $scope.user)
        .success(function(user) {
          $rootScope.currentUser = user;
          $location.url("/mypolls");
        })
        .error(function (error, status){
          $scope.errorMessage = error;
          $timeout(function(){
             $scope.errorMessage = undefined;
         }, 2500);
        }); 
    } else {
      $scope.errorMessage = "Your passwords must be the same.";
          $timeout(function(){
             $scope.errorMessage = undefined;
         }, 2500);
    }
  };
});

app.controller("LoginCtrl", function($rootScope, $scope, $http, $location, $timeout, VoteSvc) {
  $scope.loginParams = VoteSvc.getUser();
  $scope.user = {};
  $scope.login = function() {
    console.log($scope.user)
    $http.post('/login', $scope.user)
      .success(function(response) {
        $rootScope.currentUser = response;
        $location.url("/mypolls");
      })
      .error(function (error, status){
        console.log({'error': error, 'status': status})
        $scope.errorMessage = error;
        $timeout(function(){
          $scope.errorMessage = undefined;
        }, 2500);
      });
  };
});

app.controller("HomeCtrl", function($rootScope, $scope, $http, $location) {
  $scope.getPolls = function() {
    $http.get('/api/polls')
      .success(function(response) {
        $scope.polls = response;
      });
  };
  
  $scope.customNavigate=function(id){
       $location.path("/polls/"+id)
    }
});

app.controller("ProfileCtrl", function($rootScope, $scope, $http, $location) {
  $scope.getMyPolls = function() {
    $http.get('/api/'+ $rootScope.currentUser._id +'/polls')
      .success(function(response) {
        $scope.polls = response;
      });
  };
  
  $scope.customNavigate=function(id){
       $location.path("/polls/"+id)
    }
});

app.controller("NewPollCtrl", function($rootScope, $scope, $http, $location, VoteSvc) {
  $scope.createPoll = function(poll) {
    poll.options = VoteSvc.createOptions(poll);
    poll.creatorId = $rootScope.currentUser._id;
    
    $http.post('/api/' + $rootScope.currentUser._id + '/polls', poll)
      .success(function(id) {
        $location.url("/polls/"+id);
      });
  };
});


app.controller("PollCtrl", function( $scope, $http, $location, $routeParams, VoteSvc) {
  $scope.user = {"voted": false};
  $scope.getPoll = function() {
    $http.get('/api/poll/' + $routeParams.id)
      .success(function(response) {
        $scope.poll = response;
      });
  };
  $scope.vote = function() {
    $scope.poll = VoteSvc.vote($scope.poll, $scope.choice, $scope.user.option);
    $http.post('/api/poll/' + $routeParams.id,  $scope.poll)
      .success(function(response) {
        $scope.poll = response;
        $scope.user.voted = true;
      });
  };
});