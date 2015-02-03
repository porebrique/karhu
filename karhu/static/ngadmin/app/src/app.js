/*globals angular, console */
(function (ng) {
    'use strict';

    var app = ng.module('App', [
        'ngAnimate',
        'ngCookies',
        'ngFx',  //not sure if used
        'ngStorage',
        'ngSanitize',
//        
//        'ui',
        'ui.router',
        'ui.bootstrap',
        'ui.sortable',
//        
        'restangular',
        'angular.filter',
//        'jackrabbitsgroup.angular-area-select',
        'angularFileUpload',
//        
        'bootstrapLightbox',
        'textAngular',

        
        
        'AuthModule',
        'CommonModule',
        'BlogModule',
        
        'EventsModule',
        'GalleryModule',
        'LineupModule',
        'MusicModule',
        'PageletsModule',
        'ResolvesModule'
    ]);

    var appPath = '/static/ngadmin/app/';
    app.constant('PROJECT_ROOT_FOLDER', appPath);
    app.constant('APP_ROOT_FOLDER', appPath + 'src/');
    
    app.constant('API_URL', '/api/');

    app.config(['$provide', '$httpProvider', 'RestangularProvider', 'LightboxProvider', 'API_URL',  function ($provide, $httpProvider, RestangularProvider, LightboxProvider, API_URL) {
//    app.config(['$httpProvider', 'RestangularProvider',  'API_URL',  function ($httpProvider, RestangularProvider,  API_URL) {
        
        
        $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
        $httpProvider.defaults.xsrfCookieName = 'csrftoken';
        
        $provide.decorator('taOptions', ['$delegate', function (taOptions) {
            
            // $delegate is the taOptions we are decorating
            // here we override the default toolbars and classes specified in taOptions.
            taOptions.toolbar = [
                ['h1', 'h2', 'h3', 'p'],
                ['bold', 'italics', 'underline'],
                ['ul', 'ol'],
                ['justifyLeft', 'justifyCenter', 'justifyRight'],
                ['insertImage', 'insertLink'],
                ['html']
            ];
//            taOptions.classes = {
//                focussed: 'focussed',
//                toolbar: 'btn-toolbar',
//                toolbarGroup: 'btn-group',
//                toolbarButton: 'btn btn-default',
//                toolbarButtonActive: 'active',
//                disabled: 'disabled',
//                textEditor: 'form-control',
//                htmlEditor: 'form-control'
//            };
            return taOptions; // whatever you return will be the taOptions
        }]);
        
        // --- Restangular config

        function addLocals(response) {
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

        function removeLocals(elt, operation) {
            if (operation === 'post' || operation === 'put') {
                delete elt.local;
            }
            return elt;
        }
        
        function getPaginatedList(data, operation) {
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
//            return image.urls.web;
            return image.urls.web.url;
        };
        LightboxProvider.getImageCaption = function () {
            return '';
        };
        // ---  /lightbox
        
    }]);

//    app.run(['$templateCache', '$http', 'APP_ROOT_FOLDER', function ($templateCache, $http, APP_ROOT_FOLDER) {
//        var ROOT = APP_ROOT_FOLDER;
//        function tmpl(mdl, filename) {
//            return APP_ROOT_FOLDER + mdl + '/templates/' + filename + '.html';
//        }
//        
//        $templateCache.put('root', ROOT + 'templates/root.html');
////        $templateCache.put('blog.list', tmpl('blog', 'list'));
//        
//        var templates = [
//            tmpl('blog', 'list'),
//            tmpl('blog', 'post'),
//            ROOT + 'templates/root.html',
//            ROOT + 'templates/admin.html',
//            ROOT + 'templates/nav.html',
//            ROOT + 'templates/home.html'
//        ];
//        
//        ng.forEach(templates, function (tmpl) {
//            $http.get(tmpl, {cache: $templateCache});
//        });
//        
//    }]);
    
    
    app.run(['$rootScope', '$state', '$stateParams', '$http', '$cookies', 'Restangular', function ($rootScope, $state, $stateParams, $http, $cookies, Restangular) {
        
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