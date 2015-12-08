angular.module('PartyServices', ['ngResource'])
.factory('Party', ['$resource', function($resource){
   return $resource('/api/parties/:id');
}])
.factory('Auth', ['$window', function($window) {
   return {
     saveToken: function(token) {
       $window.localStorage['party-token'] = token.token;
       $window.localStorage['user-name'] = token.user.name;
       $window.localStorage['user-id'] = token.user.id;
     },
     getToken: function() {
       return $window.localStorage['party-token'];
     },
     getName: function() {
       return $window.localStorage['user-name'];
     },
     getId: function() {
       return $window.localStorage['user-id'];
     },
     removeToken: function() {
       $window.localStorage.removeItem('party-token');
       console.log($window.localStorage['party-token'])
       $window.localStorage.removeItem('user-name');
       $window.localStorage.removeItem('user-id');

     },
     isLoggedIn: function() {
       var token = this.getToken();
       return token ? true : false;
     }
   };
 }])
 .factory('AuthInterceptor', ['Auth', function(Auth) {
   return {
     request: function(config) {
       var token = Auth.getToken();
       if(token) {
         config.headers.Authorization = 'Bearer ' + token;
       }
       return config;
     }
   };
 }])
 .factory('Giphy', ['$resource', function($resource){
     return $resource('/giphy/:query');
 }])
 .factory('User', ['$resource', function($resource) {
    return $resource('/api/users');
 }]);
