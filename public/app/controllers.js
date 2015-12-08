angular.module('PartyCtrl', ['PartyServices'])
.controller('HomeCtrl', ['$scope', 'Party', 'Auth', function($scope, Party, Auth) {
 $scope.parties = [];
 $scope.search = '';
 $scope.userName = Auth.getName();
 $scope.userId= Auth.getId();

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
 };
}])
.controller('ShowCtrl', ['$scope', '$location','$routeParams', 'Party', function($scope, $location,$routeParams, Party) {
 $scope.parties = {};

 $scope.removeParty = function() {
  Party.remove({id: $routeParams.id}, function success(data) {
    $location.path('/');
  }, function error(data) {
    console.log(data);
  });
 }



 Party.get({id: $routeParams.id}, function success(data) {
   $scope.party = data;
 }, function error(data) {
   console.log(data);
 });
}])
.controller('NewCtrl', ['$scope', '$location', 'Party', 'User', 'Auth', 'Giphy', function($scope, $location, Party, User, Auth, Giphy) {
 $scope.party = {
   date: new Date(),
   users: [],
   holiday: '',
   needs: [],
   name: '',
   creator: Auth.getId(),
   image: ''
 };

 $scope.users = [];

 User.query(function success(data) {
   $scope.users = data;
 }, function error(data) {
   console.log(data);
 });

  $scope.addGuest = function() {
    if($scope.party.users.indexOf($scope.selected) === -1) {
      $scope.party.users.push($scope.selected);
    }
  };

  $scope.removeGuest = function(id) {
    $scope.party.users.splice(id, 1);
  };

  $scope.addNeed = function() {
    if($scope.party.needs.indexOf($scope.need) === -1) {
      $scope.party.needs.push($scope.need);
    }
  };

  $scope.removeNeed = function(id) {
    $scope.party.needs.splice(id, 1);
  };

 $scope.createParty = function() {
    Giphy.get({query: $scope.party.holiday},function (data){
        console.log("Good", data.images.original.url);
        $scope.party.image = data.images.original.url;
        Party.save($scope.party, function success(data) {
          $location.path('/');
        }, function error(data) {
            console.log(data);
        });
    });
  };
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
     Auth.saveToken(res.data);
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
       Auth.saveToken(res.data);
       $location.path("/");
     }, function(res) {
       console.log(res.data);
     });
    }, function(res) {
       console.log(res.data);
   });
  }
}]);
