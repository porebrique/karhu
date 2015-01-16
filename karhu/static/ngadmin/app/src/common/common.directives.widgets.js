/*global angular, console */
(function (ng) {
    'use strict';
    var mdl = ng.module('CommonModule');

/* Usage:  <button modal-sort items="lineup" display="name" then="sortingDone">Sort them!</button>
 *
 * items: that array will be copied and copy will be sortable
 * display: property of items' element that will be displayed in sortable list
 * then: function that should be executed when sorting modal is closed. It should expect sorted copy of 'items' as single argument
*/
    mdl.directive('modalSort', ['$modal', 'APP_ROOT_FOLDER',
        function ($modal, ROOT) {
            var modalOptions = {
                templateUrl: ROOT + 'common/templates/modal-sorting.html'
            };


            return {
                restrict: 'A',
                
                scope: {
                    //button: '@',
                    sourceItems: '=items',
                    display: '@',
                    then: '='
                },
                //template: '<button type="button" class="btn btn-default"><span class="fa fa-list"></span>{{button}}</button>',
                template: '',
                link: function ($scope, element, attrs) {
                    var modal;
                    $scope.is = {
                        saving: false
                    };
                    
                    $scope.sortableOptions = {
                        //when commented, as-drag disappears (maybe under the modal);
                        //when set to interface's parent, gets wrong position
                        containment: '#sorts',
                        containerPositioning: 'relative'
                    };
                    
                    $scope.handleResult = function () {
                        $scope.is.saving = true;
                        $scope
                            .then($scope.items)
                            .then(function () {
                                $scope.is.saving = false;
                                modal.close();
                            });
                    };

                    element.click(function () {
                        $scope.items = ng.copy($scope.sourceItems);
                        modal = $modal.open({
                            templateUrl: ROOT + 'common/templates/modal-sorting.html',
                            controller: function () {},
                            scope: $scope

                        });
                    });
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