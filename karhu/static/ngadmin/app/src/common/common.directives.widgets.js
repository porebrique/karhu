/*global angular, console, jQuery */
(function (ng, $) {
    'use strict';
    var mdl = ng.module('CommonModule');



    /*
     * Usage: <span spinner-when="isSaving">original content</span>
     * isSaving: boolean
     * original content may be either plain text or html
     */
    mdl.directive('spinnerWhen', ['APP_ROOT_FOLDER',
        function (ROOT) {

            return {
                restrict: 'A',
                transclude: true,
                scope: {
                    condition: '=spinnerWhen'
                },
                template: '<span class="spinner"></span><span class="original-content" ng-transclude></span>',
                //scope: true,
                //scope: true,
                link: function ($scope, elt, args) {

                    var spinner = ng.element('.spinner', elt),
                        originalContent = ng.element('.original-content', elt);
                    $scope.$watch(function () {
                        return $scope.condition;
                    }, function (newValue) {
                        if (newValue === true) {
                            spinner.css('opacity', 1);
                            originalContent.css('opacity', 0);
                        } else if (newValue === false) {
                            spinner.css('opacity', 0);
                            originalContent.css('opacity', 1);
                        }

                    });
                }

            };
        }]);


    

    /*
     * Usage: <image-placeholder  width="$scope.width" height="$scope.height" [fontsize="scope.fontsize"] />
     * fontsize is optional and controls glyphicon size
     */
    mdl.directive('imagePlaceholder', ['APP_ROOT_FOLDER',
        function (ROOT) {

            return {
                restrict: 'E',
                template: '<span class="placeholder" style="{{::styles.placeholder}}"><span class="glyphicon glyphicon-{{icon}}" style="{{::styles.icon}}"></span></span>',
                scope: {},
                link: function ($scope, element, args) {
                    
                    var fontSize = 8;
                    
                    if (args.fontsize) {
                        fontSize = args.fontsize;
                    }
                    
//                    $scope.icon = args.icon ? args.icon : 'picture';
                    $scope.icon = args.icon || 'picture';
                    $scope.styles = {
                        placeholder: 'width: ' + args.width + 'px; height: ' + args.height + 'px;',
                        icon: 'font-size: ' + fontSize + 'em; line-height: ' + args.height + 'px'
                    };
                    
      
                }

            };
        }]);

    
/*
 *  Usage:  <karhu-paginator total="{{total.objects.count}}" pagesize="5" state="blog.list">
 *  'state' is required and expects name of state, used as blog.list({page: pagenumber})
 *  'pagesize' is optional if not provided, value 10 used instead
 *  
 *  Also expects "page" in $stateParams, otherwise thinks it is first page
 *
*/
    mdl.directive('karhuPaginator', ['$modal', 'APP_ROOT_FOLDER', '$stateParams',
        function ($modal, ROOT, $stateParams) {
            return {
                restrict: 'E',
                scope: {
                    total: '@',
                    pagesize: '@',
                    state: '@'
                },
                templateUrl: ROOT + 'common/templates/paginator.html',
                link: function ($scope) {
                    var currentPage = parseInt($stateParams.page, 10),
                        pagesize = ng.isDefined($scope.pagesize) ? $scope.pagesize : 10;
                    
                    if (ng.isUndefined($scope.state)) {
                        $scope.error = 'Paginator error: no "state" attribute provided!';
                        throw new Error('Paginator error: no "state" attribute provided!');
                    }
                    
                    $scope.pages_count = [];
                    $scope.pages_count.length = (Math.ceil($scope.total / pagesize));

                    $scope.isActive = function (index) {
                        return index + 1 === currentPage || (index === 0 && !$stateParams.page);
                    };

                }
            };
        }]);


    /*
     * Developing purpose only
     * <bindings-counter></bindings-counter>
     * Number doesnt update automatically and should not be considered actual
     *
     */
    mdl.directive('bindingsCounter', ['$timeout',
        function ($timeout) {

            function count() {
                var root = $(document.getElementsByTagName('body')),
                    watchers = [],
                    f = function (element) {
                        if (element.data().hasOwnProperty('$scope')) {
                            angular.forEach(element.data().$scope.$$watchers, function (watcher) {
                                watchers.push(watcher);
                            });
                        }

                        ng.forEach(element.children(), function (childElement) {
                            f($(childElement));
                        });
                    };

                f(root);
                //console.log(watchers.length);

                return watchers.length;
            }

            return {
                restrict: 'E',
                scope: false,
                template:   '<div style="position: absolute; top: 2px; left: 60px;">' +
                            '<button type="button" ng-click="update()" class="btn btn-default glyph-only">' +
                            '<span class="fa fa-refresh"></span>' +
                            '<span>Watchers: {{count}}</span></button></div>',
                //templateUrl: ROOT +  'common/templates/modal-sorting.html',
                link: function ($scope, element) {

                    $scope.count = 'dunno';

                    $scope.update = function () {
                        $scope.count = count();
                    };

                    $timeout(function () {
                        $scope.update();
                    }, 2000);
                }
            };
        }]);



}(angular, jQuery));