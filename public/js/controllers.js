/* global angular app */
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

app.controller("NewPollCtrl", function($rootScope, $scope, $http, $location) {
  $scope.createPoll = function(poll) {
    var optionsObject = [];
    angular.forEach(poll.options.split(','), function(value) {
      this.push({"option":value.trim(), "votes": 0});
    }, optionsObject);
    
    poll.options = optionsObject;
    poll.creatorId = $rootScope.currentUser._id;
    console.log(JSON.stringify(poll))
    
    $http.post('/api/' + $rootScope.currentUser._id + '/polls', JSON.stringify(poll))
      .success(function(response) {
        console.log(response)
        $location.url("/");
      });
  };
});


app.controller("PollCtrl", function($rootScope, $scope, $http, $location, $routeParams) {
  $scope.id = $routeParams.id;
});

