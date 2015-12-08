angular.module('PartyServices', ['ngResource'])
.factory('Party', ['$resource', function($resource){
   return $resource('/api/parties/:id');
}])
.factory('Auth', ['$window', function($window) {
   return {
     saveToken: function(token) {
       $window.localStorage['party-token'] = token;
     },
     getToken: function() {
       return $window.localStorage['party-token'];
     },
     removeToken: function() {
       $window.localStorage.removeItem('party-token');
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
 }]);
 // .factory('GiphyService', ['ngResource', function($ngResource){
 // 	return $resource('http://api.giphy.com/v1/gifs/search?q=funny+cat', {api_key: 'dc6zaTOxFJmzC'})
 // }]);