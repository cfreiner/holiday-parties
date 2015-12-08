angular.module('PartyCtrl', ['PartyServices'])
.controller('HomeCtrl', ['$scope', 'Party', 'Giphy', function($scope, Party, Giphy) {
  $scope.parties = [];
  $scope.search = '';

  Party.query(function success(data) {
    $scope.parties = data;
  }, function error(data) {
    console.log(data)
  });

  $scope.deleteParty = function(id, partiesIdx) {
    Party.delete({id: id}, function success(data) {
      $scope.parties.splice(partiesIdx, 1);
    }, function error(data) {
      console.log(data);
    });
  }
}])
.controller('ShowCtrl', ['$scope', '$routeParams', 'Party', function($scope, $routeParams, Party) {
  $scope.parties = {};

  Party.get({id: $routeParams.id}, function success(data) {
    $scope.party = data;
  }, function error(data) {
    console.log(data);
  });
}])
.controller('NewCtrl', ['$scope', '$location', 'Party', 'User', 'ui.bootstrap', function($scope, $location, Party, User) {
  $scope.party = {
    date: new Date(),
    users: [],
    holiday: '',
    needs: [],
    name: '',
    creator: '',
    image: ''
  };

  $scope.users = [];

  User.query(function success(data) {
    $scope.users = data;
  }, function error(data) {
    console.log(data);
  });

  $scope.createParty = function() {
    Party.save($scope.party, function success(data) {
      Giphy.get({query: $scope.party.holiday},function (data){
          console.log("Good", data.images.original.url);
          $scope.party.image = data.images.original.url;
        }, function error(data) {
          console.log(data);
        });
      $location.path('/');
    }, function error(data) {
      console.log(data);
    });
  }
}])
.controller('NavCtrl', ['$scope', 'Auth', '$location', function($scope, Auth, $location) {
  $scope.logout = function() {
    Auth.removeToken();
  };

}])
.controller("LoginCtrl", ['$scope', '$http', '$location', 'Auth', function($scope, $http, $location, Auth) {
  $scope.user = {
    email: "",
    password: ""
  };

  $scope.actionName = "Login";

  $scope.userAction = function() {
    $http.post("/api/auth", $scope.user).then(function(res) {
      Auth.saveToken(res.data.token);
      $location.path("/");
    }, function(res) {
      console.log(res.data);
    });
  }

}])
.controller("SignupCtrl", ['$scope', '$http', '$location', 'Auth', function($scope, $http, $location, Auth) {
   $scope.user = {
    email: "",
    password: ""
  };

  $scope.actionName = "Signup";

  $scope.userAction = function() {
    $http.post("/api/users", $scope.user).then(function(res) {
      $http.post("/api/auth", $scope.user).then(function(res){
        Auth.saveToken(res.data.token);
        $location.path("/");
      }, function(res) {
        console.log(res.data);
      });
     }, function(res) {
        console.log(res.data);
    });
   }
}]);
