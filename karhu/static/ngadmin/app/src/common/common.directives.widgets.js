/*global angular, console */

(function (ng) {
    'use strict';
    var mdl = ng.module('CommonModule');


/*
 *  Usage: <karhu-paginator paginator="paginator"/>
 *  where paginator is {count: 142, pagesize: 10}
 *  
 *  Also expects "page" ing $stateParams, otherwise thinks it is first page
 *
*/
    mdl.directive('karhuPaginator', ['$modal', 'APP_ROOT_FOLDER', '$stateParams',
        function ($modal, ROOT, $stateParams) {
            return {
                restrict: 'E',
                scope: {
                    paginator: '='
                },
                templateUrl: ROOT + 'common/templates/paginator.html',
                link: function ($scope) {
                    var currentPage = parseInt($stateParams.page, 10);
                    
                    $scope.paginator.pages_count = [];
                    $scope.paginator.pages_count.length = (Math.ceil($scope.paginator.count / $scope.paginator.pagesize));

                    $scope.isActive = function (index) {
                        return index + 1 === currentPage || (index === 0 && !$stateParams.page);
                    };

                }
            };
        }]);

    mdl.directive('modalCrop', ['$modal', 'APP_ROOT_FOLDER', '$http',
        function ($modal, ROOT, $http) {
            var modalOptions = {
                templateUrl: ROOT + 'common/templates/modal-sorting.html'
            },
                modalTemplateUrl = ROOT + 'common/templates/modal-crop.html';

            return {
                restrict: 'E',
                scope: {
                    buttontext: '@',
                    source: '@'
                },
                template: '<button type="button" class="btn btn-default"><span class="glyphicon glyphicon-image"></span>{{buttontext}}</button>',
                //templateUrl: ROOT +  'common/templates/modal-sorting.html',
                link: function ($scope, element) {


                    $scope.image = $scope.source;

                    $scope.crop = function () {
                        var url = '/api/admin/lineup/crop_for/' + 1;
                        var data = {
                            x1: $scope.obj.coords[0],
                            y1: $scope.obj.coords[1],
                            x2: $scope.obj.coords[2],
                            y2: $scope.obj.coords[3],
                            width: $scope.obj.coords[4],
                            height: $scope.obj.coords[5]
                        };
                        
                        $http.post(url, data)
                            .success(function (response) {
                                console.log(response);
                            });
                    };

                    element.click(function () {
                        var modal = $modal.open({
                            size: 'auto',
                            templateUrl: modalTemplateUrl,
                            controller: function () {},
                            scope: $scope

                        });

                        modal.result.then(function (result) {
                            console.log('closed!');
                        });
                    });
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



}(angular));