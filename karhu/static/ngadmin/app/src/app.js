'use strict';

(function(){
	
var app = angular.module('App', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    
    'ui.router',
    'ui',
    
    'ui.bootstrap',
    'anim-in-out',
    
    'jackrabbitsgroup.angular-area-select',
    //'ngJcrop',
    
    'AuthModule',
    'CommonModule',
    'LineupModule',
    'BlogModule',
    'PageletsModule',
    'MusicModule'
    
    
    
]);

/*
app.controller('HomeCtrl', function($scope,  $rootScope, CONFIG){
	$scope.CONFIG = CONFIG;
})
*/

var app_path = '/static/ngadmin/app/';
app.constant('PROJECT_ROOT_FOLDER', app_path);
app.constant('APP_ROOT_FOLDER', app_path + 'src/');
app.constant('API_URL', '/api/admin/');


/* - DJANGO CSRF STUFF --- */
app.config(['$httpProvider', function($httpProvider){
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
}]);

app.run(['$http', '$cookies', function( $http, $cookies) {
    var token = $cookies.csrftoken;
    //console.log('token is', token)
    $http.defaults.headers.post['X-CSRFToken'] = token;
}]);
/*   ---- */






app.constant('_START_REQUEST_', '_START_REQUEST_');
app.constant('_END_REQUEST_', '_END_REQUEST_');

app.config(['$httpProvider', '$injector', function($httpProvider, $injector) {
	
	var interceptor = ['$q', '$injector', '$rootScope', '_START_REQUEST_', '_END_REQUEST_',
	                   function($q, $injector, $rootScope, _START_REQUEST_, _END_REQUEST_) {
		var $http;
		//console.log($injector.get('$http'))
	    return {
			   'request': function(config) {
		    	  	$http = $http || $injector.get('$http');
	                $rootScope.$broadcast(_START_REQUEST_);
			        return config;
			      },
			      // optional method
			      'requestError': function(rejection) {
			         // do something on error
			    	  /*
			         if (canRecover(rejection)) {
			           return responseOrNewPromise
			         }
			         */
			         return $q.reject(rejection);
			       },			      
			      'response': function(response) {
			    	  	$http = $http || $injector.get('$http');
			            if ($http.pendingRequests.length < 1) {
			                $rootScope.$broadcast(_END_REQUEST_);
			            } 
			            return response
			      },
			      'responseError': function(rejection) {
			    	  /*
			          if (canRecover(rejection)) {
			            return responseOrNewPromise
			          }*/
			    	  	$http = $http || $injector.get('$http');
			            if ($http.pendingRequests.length < 1) {
			                $rootScope.$broadcast(_END_REQUEST_);
			            } 			    	  
			          return $q.reject(rejection);
			        }      
			     
			    };
 	}]
	
    $httpProvider.interceptors.push(interceptor); 
}]);

/* ---------- */


})()