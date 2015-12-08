var app = angular.module('HolidayApp', ['ngRoute', 'PartyCtrl', 'PartyServices']); // holidayServices


// var app = angular.module('AirplaneApp', ['ngRoute', "AirplaneCtrl", "AirplaneServices"]);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
	$routeProvider
	.when('/',{
		templateUrl: 'app/views/parties.html',
		controller: 'HomeCtrl'
	})
	// .when('/about',{
	// 	templateUrl: 'app/views/about.html'
	// })
	.when('/parties/new',{
		templateUrl: 'app/views/new.html',
		controller: 'NewCtrl'
	})
	.when('/parties/:id', {
		templateUrl: 'app/views/show.html',
		controller: 'ShowCtrl'
	})
	.when('/login', {
    templateUrl: 'app/views/login.html',
    controller: 'LoginCtrl'
 	})
 	.when('/signup', {
    templateUrl: 'app/views/login.html',
    controller: 'SignupCtrl'
  })    
	.otherwise({
		templateUrl: 'app/views/404.html'
	})

	$locationProvider.html5Mode(true);
}])
.config(['$httpProvider', function($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
}])
.run(['$rootScope', 'Auth', function($rootScope, Auth){
  $rootScope.isLoggedIn = function() {
    return Auth.isLoggedIn.apply(Auth);
  }
}]);