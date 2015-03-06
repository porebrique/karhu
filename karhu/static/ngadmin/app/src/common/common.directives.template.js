/*global angular, console */
(function (ng) {
    'use strict';
    
    var mdl = ng.module('CommonModule');


    
    
    // Used in admin.html
    mdl.directive('globalHttpErrors', ['GlobalHttpErrorsStorage', function (GlobalHttpErrorsStorage) {
        return {
            restrict: 'A',
            scope: {},
            template: '<alert ng-show="alerts.length > 0" type="danger" close="closeAlert($index)">{{summary}}<div ng-repeat="alert in alerts" ng-bind-html="alert|trust"/></alert>',
            link: function ($scope, elt, args) {
                $scope.summary = null;
                $scope.alerts = [];
                $scope.$watch(function () {return GlobalHttpErrorsStorage.getErrors(); }, function (response) {
                    var key, alert;
                    if (response) {
                        $scope.alerts.length = 0;
                        $scope.summary = response.status + " " + response.statusText;
                        for (key in response.data) {
                            if (response.data.hasOwnProperty(key)) {
                                alert = '<strong>' + key + '</strong>' + ": " + response.data[key];
                                console.log(response.data[key]);
                                switch (response.data[key]) {
                                case 'Authentication credentials were not provided.':
                                    alert = alert + '<br/>' + 'Попробуйте выйти из админки и перелогиниться';
                                    break;
                                default:
                                    break;
                                }
                                $scope.alerts.push(alert);
                            }
                        }
                    }
                });
                $scope.closeAlert = function (index) {
                    $scope.alerts.splice(index, 1);
                };
            }
        };
    }]);

    
    mdl.directive('stateSpinner', ['$rootScope', '$state', function ($rootScope, $state) {
        
        return {
            restrict: 'A',
            //template: '<strong ng-show="is.loading">Loading...</strong>',
            transclude: true,
            template:   '<div class="state-spinner" ng-show="rootViewLoading">' +
                        '<span class="fa fa-spinner fa-spin"></span>' +
                        '</div>' +
                        '<ng-transclude></ng-transclude>',
            //scope: {},
            link: function ($scope, elt) {
                $scope.rootViewLoading = false;
                $rootScope
                    .$on('$stateChangeStart',
                        function (event, toState, toParams, fromState, fromParams) {
                            //console.log('state change start', toState);
                            $scope.rootViewLoading = true;
                        });
                $rootScope
                    .$on('$stateChangeSuccess',
                        function (event, toState, toParams, fromState, fromParams) {
                            //console.log('state change success');
                            $scope.rootViewLoading = false;
                        });
            
            }
        };
    
    
    }]);
    
    

    /*
     * $scope.resolvedConfig comes from parent RootCtrl's scope
     */
    mdl.directive('navigationMenu', ['APP_ROOT_FOLDER',
        function (APP_ROOT_FOLDER) {

            return {
                restrict: "E",
                //template: '<div>config: {{config}} <br/></div>',
                templateUrl: APP_ROOT_FOLDER + 'templates/nav.html',
                link: function ($scope) {
                    $scope.config = $scope.resolvedConfig;
//                    console.log($scope.config.apps);
                    var buttons = [
                            {
                                enabled: true,
                                icon: 'fa-home',
                                include: 'home',
                                sref: 'home'
                            },
                            {
                                enabled: $scope.config.apps.lineup.enabled,
                                icon: 'fa-users',
                                include: 'lineup',
                                sref: 'lineup.list'
                            },
                            {
                                enabled: $scope.config.apps.music.enabled,
                                icon: 'fa-music',
                                include: 'music',
                                sref: 'music.list'
                            },
                            {
                                enabled: $scope.config.apps.gallery.enabled,
                                icon: 'fa-camera',
                                include: 'gallery',
                                sref: 'gallery.list'
                            },
                            {
                                enabled: $scope.config.apps.events.enabled,
                                icon: 'fa-calendar',
                                include: 'events',
                                sref: 'events.list'
                            },
                            {
                                enabled: $scope.config.apps.blog.enabled,
                                icon: 'fa-book',
                                include: 'blog',
                                sref: 'blog.list'
                            },
                            {
                                enabled: true,
                                icon: 'fa-th-large',
                                include: 'pagelets',
                                sref: 'pagelets.list'
                            }
                        ];
                        /*
			var buttons = [
			               {icon: 'home', sref: 'home'},
			               {icon: 'usergroup', sref: 'lineup.list'},
			               {icon: 'musicnote', sref: 'music.list'},
			               {icon: 'photos', sref: 'gallery.list'},
			               {icon: 'calender', sref: 'events'},
			               {icon: 'write', sref: 'blog.list'},
			               {icon: 'copydocument', sref: 'pagelets.list'}
			               ]
			 */
                    $scope.buttons = buttons;
                }
            };
        }]);
// DO NOT DELETE it may be useful 
/*
    mdl.directive('globalThrobber', ['_START_REQUEST_', '_END_REQUEST_',
        function (_START_REQUEST_, _END_REQUEST_) {
            return {
                restrict: "E",
                template: '<div class="page-throbber"></div>',
                link: function (scope, element) {
                    element.hide();
                    scope.$on(_START_REQUEST_, function () {
                        element.show();
                    });

                    scope.$on(_END_REQUEST_, function () {
                        element.hide();
                    });
                }
            };
        }]);
*/

}(angular));