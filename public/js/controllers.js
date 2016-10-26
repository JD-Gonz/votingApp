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

app.controller("SignUpCtrl", function($rootScope, $scope, $http, $location) {
  $scope.signup = function(user) {

    // TODO: verify passwords are the same and notify user
    if (user.password == user.password2) {
      $http.post('/signup', user)
        .success(function(user) {
          $rootScope.currentUser = user;
          $location.url("/mypolls");
        });
    }
  };
});

app.controller("LoginCtrl", function($rootScope, $scope, $http, $location) {
  $scope.login = function(user) {
    $http.post('/login', user)
      .success(function(response) {
        $rootScope.currentUser = response;
        $location.url("/mypolls");
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

app.controller("NewPollCtrl", function($rootScope, $scope, $http, $location, VoteService) {
  $scope.createPoll = function(poll) {
    poll.options = VoteService.createOptions(poll);
    poll.creatorId = $rootScope.currentUser._id;
    console.log(poll)
    
    $http.post('/api/' + $rootScope.currentUser._id + '/polls', poll)
      .success(function(response) {
        console.log(response)
        $location.url("/");
      });
  };
});


app.controller("PollCtrl", function( $scope, $http, $location, $routeParams, VoteService) {
  $scope.user = {"voted": false};
  $scope.getPoll = function() {
    $http.get('/api/poll/' + $routeParams.id)
      .success(function(response) {
        $scope.poll = response;
      });
  };
  $scope.vote = function() {
    $scope.poll = VoteService.vote($scope.poll, $scope.choice, $scope.user.option);
    $http.post('/api/poll/' + $routeParams.id,  $scope.poll)
      .success(function(response) {
        $scope.poll = response;
        $scope.user.voted = true;
      });
  };
});