/*globals angular, console */
(function (ng) {
    'use strict';

    var app = angular.module('App', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngFx',
        
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
        //'AuthModule',
        'CommonModule',
        'LineupModule',
        'BlogModule',
        'PageletsModule',
        'MusicModule',
        'GalleryModule',
        'EventsModule'

    ]);

    /*
app.controller('HomeCtrl', function($scope,  $rootScope, CONFIG){
	$scope.CONFIG = CONFIG;
})
*/
    var app_path = '/static/ngadmin/app/';
    app.constant('PROJECT_ROOT_FOLDER', app_path);
    app.constant('APP_ROOT_FOLDER', app_path + 'src/');
    //app.constant('API_URL', '/api/admin/');
    app.constant('API_URL', '/api/');

    app.config(['LightboxProvider', function (LightboxProvider) {
        
        LightboxProvider.getImageUrl = function (image) {
            var url = image.urls.web;
            return url;
        };

        LightboxProvider.getImageCaption = function (image) {
            return '';
        };
        
        //LightboxProvider.templateUrl = 'path/to/your-template.html';
    }]);

    /*
     * RESTANGULAR CONFIG
     */

    // Looks like django-rest-framework allows to get rid of xsrf cookie
    app.run(['Restangular', '$cookies',
        function (Restangular, $cookies) {
            var token = $cookies.csrftoken;
            Restangular.setDefaultHeaders({
                'X-CSRFToken': token
            });
        }]);

    app.config(['RestangularProvider', 'API_URL',
        function (RestangularProvider, API_URL) {

            //RestangularProvider.setBaseUrl("/api/v1");
            RestangularProvider.setRequestSuffix('/');
            RestangularProvider.setBaseUrl(API_URL);
            //RestangularProvider.setRequestSuffix('/?format=json')

            //RestangularProvider.setDefaultHeaders({token: "x-restangular"});

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

            function extractCollection(response, operation, what, url) {
                var newResponse;

                if (operation === "getList") {
                    newResponse = response.objects;
                    newResponse.meta = response.meta;
                } else {
                    newResponse = response.data;
                    newResponse = response;
                }
                return newResponse;
            }

            function removeLocals(elt, operation, model, url) {
                if (operation === 'post' || operation === 'put') {
                    delete elt.local;
                }
                return elt;
            }

            // RestangularProvider.setResponseExtractor(extractCollection);
            RestangularProvider.setResponseExtractor(addLocals);
            RestangularProvider.addRequestInterceptor(removeLocals);
        }]);
    /* --------------------- */

    // Disabled, not used yet
    /*
    app.constant('_START_REQUEST_', '_START_REQUEST_');
    app.constant('_END_REQUEST_', '_END_REQUEST_');

    app.config(['$httpProvider', '$injector',
        function ($httpProvider, $injector) {

            var interceptor = ['$q', '$injector', '$rootScope', '_START_REQUEST_', '_END_REQUEST_',
                    function ($q, $injector, $rootScope, _START_REQUEST_, _END_REQUEST_) {
                        var $http;
                        //console.log($injector.get('$http'))
                        return {
                            'request': function (config) {
                                $http = $http || $injector.get('$http');
                                $rootScope.$broadcast(_START_REQUEST_);
                                return config;
                            },
                            // optional method
                            'requestError': function (rejection) {
                                // do something on error
//                         if (canRecover(rejection)) {
//                           return responseOrNewPromise
//                         }
                                return $q.reject(rejection);
                            },
                            'response': function (response) {
                                $http = $http || $injector.get('$http');
                                if ($http.pendingRequests.length < 1) {
                                    $rootScope.$broadcast(_END_REQUEST_);
                                }
                                return response;
                            },
                            'responseError': function (rejection) {
//                          if (canRecover(rejection)) {
//                            return responseOrNewPromise
//                          }
                                $http = $http || $injector.get('$http');
                                if ($http.pendingRequests.length < 1) {
                                    $rootScope.$broadcast(_END_REQUEST_);
                                }
                                return $q.reject(rejection);
                            }

                        };
                    }];

            $httpProvider.interceptors.push(interceptor);
        }]);

        */
    /* ---------- */


    /* - DJANGO CSRF STUFF --- */
    // MOVED TO RESTANGULAR CONFIG BUT USED SOMEWHERE

    app.config(['$httpProvider', function ($httpProvider) {
        $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
        $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    }]);

    app.run(['$http', '$cookies', function ($http, $cookies) {
        var token = $cookies.csrftoken;
        //console.log('token is', token)
        $http.defaults.headers.post['X-CSRFToken'] = token;
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