/*globals angular, console */
(function (ng) {
    'use strict';

    var app = angular.module('App', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngFx',
        'ngStorage',
        
        'ui',
        'ui.router',
        'ui.bootstrap',

        'restangular',
        'angular.filter',
        'jackrabbitsgroup.angular-area-select',
        'angularFileUpload',
        
        'bootstrapLightbox',
        'textAngular',

        //'anim-in-out',
        
        'ResolvesModule',
        'AuthModule',
        'CommonModule',
        'BlogModule',
        'EventsModule',
        'GalleryModule',
        'LineupModule',
        'MusicModule',
        'PageletsModule'
    ]);

    /*
app.controller('HomeCtrl', function($scope,  $rootScope, CONFIG){
	$scope.CONFIG = CONFIG;
})
*/
    var app_path = '/static/ngadmin/app/';
    app.constant('PROJECT_ROOT_FOLDER', app_path);
    app.constant('APP_ROOT_FOLDER', app_path + 'src/');
    
    app.constant('API_URL', '/api/');
    //app.constant('API_URL', '/api/admin/');

    app.config(['$httpProvider', 'RestangularProvider', 'LightboxProvider', 'API_URL',  function ($httpProvider, RestangularProvider, LightboxProvider, API_URL) {
        
        
        $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
        $httpProvider.defaults.xsrfCookieName = 'csrftoken';
        
        // --- Restangular config

        function addLocals(response, operation, what, url) {
            var newResponse = response;

            if (ng.isArray(newResponse)) {
                ng.forEach(newResponse, function (item) {
                    item.local = {};
                });
            } else if (ng.isObject(newResponse)) {
                newResponse.local = {};
            }
            return newResponse;
        }

        function removeLocals(elt, operation, model, url) {
            if (operation === 'post' || operation === 'put') {
                delete elt.local;
            }
            return elt;
        }
        
        function getPaginatedList(data, operation, what) {
            var result = data;
            
            if (operation === 'getList') {
                
//                console.log('got list, it is ', data);
                
                if (!ng.isArray(data)) {
//                    console.log('and it is not array!');
                    result = ng.copy(data.results);
                    delete data.results;
//                    console.log('now data is', data);
                    result.paginator = data;
                    
                    
                }
                
            }
            return result;
        }

        RestangularProvider.setResponseExtractor(addLocals);
        
        RestangularProvider.addResponseInterceptor(getPaginatedList);
        
        RestangularProvider.addRequestInterceptor(removeLocals);
        
        RestangularProvider.setRequestSuffix('/');
        RestangularProvider.setBaseUrl(API_URL);
        // --- /restangular
        
        
        // --- Lightbox config
        LightboxProvider.getImageUrl = function (image) {
            return image.urls.web;
        };
        LightboxProvider.getImageCaption = function (image) {
            return '';
        };
        // ---  /lightbox
        
    }]);

    app.run(['$rootScope', '$state', '$stateParams', '$http', '$cookies', 'Restangular', 'Auth', function ($rootScope, $state, $stateParams, $http, $cookies, Restangular, Auth) {
        
        // django csrf token, and it would be good to get rid of native $http and use only restangular
        $http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken;
        Restangular.setDefaultHeaders({
            'X-CSRFToken': $cookies.csrftoken
        });
        
        
        // Injecting $state and $stateParams to scope
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        //$rootScope.Auth = Auth;
        
        // just errors output
        $rootScope.$on('$stateChangeError',
            function (event, toState, toParams, fromState, fromParams, errors) {
                console.log('STATE CHANGE ERROR', errors);
                //event.preventDefault();
                //$state.go(toState);
            });
       

    }]);
    

    /*   ---- */
    /*
    app.run(['$rootScope', '$state', function ($rootScope, $state) {
        $rootScope.$on('$stateChangeStart',
            function (event, toState, toParams, fromState, fromParams) {
            
                console.log('state change start',toState);
            
                //event.preventDefault();
                //$state.go(toState);
                
            });
        $rootScope.$on('$stateChangeSuccess',
            function (event, toState, toParams, fromState, fromParams) {
                console.log('state change success');
            });
        

    }]);
*/

}(angular));