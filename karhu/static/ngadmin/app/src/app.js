'use strict';

(function(){
	
var app = angular.module('App', [
    'ui.router',
    'ngAnimate',
    'ngCookies',
    //'ui.date',
    'ui.bootstrap',
//  'ngResource',
    
    //'angular-client-side-auth',
    
    'AuthModule',
    
    'CommonModule',
    
    'EventModule',

    
]);


//console.log(routingConfig)

//console.log('app injections done')



app.constant('APP_ROOT_FOLDER', '/static/ngapp/app/src/');




app.config(['$stateProvider', '$urlRouterProvider', 'APP_ROOT_FOLDER',  function($stateProvider, $urlRouterProvider, APP_ROOT_FOLDER){
//app.config(['$stateProvider', '$urlRouterProvider', 'APP_ROOT_FOLDER', 'AuthModule', function($stateProvider, $urlRouterProvider, APP_ROOT_FOLDER, AuthModule){
	$.datepicker.setDefaults({dateFormat: 'dd.mm.yy'});
	$urlRouterProvider.otherwise('/events');

	function tmpl(mdl, filename) {
		return APP_ROOT_FOLDER +  mdl + '/templates/' + filename + '.html'
	}

	 
	var access = routingConfig.accessLevels;
	
	$stateProvider
		.state('system', {
			abstract: true,
			data: {access: access.public},
			templateUrl: APP_ROOT_FOLDER + 'templates/system-template.html'
		})
		.state('system.login', {
			url: '/loginpage',
			templateUrl: tmpl('auth', 'login'),
			controller: 'auth.LoginCtrl'
		})
		.state('system.signup', {
			url: '/signup',
			templateUrl: APP_ROOT_FOLDER + 'templates/signup.html',
		})
		.state('system.logout', {
			url: '/logout',
			template: '<span/>',
			controller: 'auth.LogoutCtrl'
		})			
		
		
		.state('app_root', {
			abstract: true,
			templateUrl: APP_ROOT_FOLDER + 'templates/app-template.html'
		})
		.state('1c', {
			//url: '/url_prefix',
			abstract: true,
			parent: 'app_root',
			templateUrl: APP_ROOT_FOLDER + 'templates/one-column-layout.html'
		})
		.state('2c', {
			abstract: true,
			parent: 'app_root',
			templateUrl: APP_ROOT_FOLDER + 'templates/two-columns-layout.html'
		})		
		.state('todo', {
			parent: '1c',
			templateUrl: APP_ROOT_FOLDER + 'templates/todo.html',
			url: '/todo'
			
		})
		.state('fake_2c', {
			parent: '2c',
			url: '/fake_2c',
			views: {
				'SidebarView' : {template: 'This is just a string'},
				'MainView': {template: 'This is main section'}
			}
		})
		.state('events', {
			abstract: true,
			parent: 'app_root',
			templateUrl: APP_ROOT_FOLDER + 'templates/two-columns-layout.html',
			controller: 'Events.ListCtrl'
		})
		.state('events.list', {
			url: '/events',
			data: {access: access.user},
			views: {
				'SidebarView': {
					templateUrl: tmpl('events', 'events-list-filter'),
					//controller: 'ListFilterCtrl'
				},
				'MainView': {
					templateUrl: tmpl('events', 'events-list'),
					//controller: 'ListCtrl'
					}
			}
		})
		
}]);


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