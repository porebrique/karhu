/*global angular, console, jQuery */
(function (ng, $) {
    'use strict';
    var mdl = ng.module('CommonModule');

    mdl.directive('bootstrapFileInput', [function () {
    
        return {
            restrict: 'A',
//            scope: {
//            }
            link: function ($scope, elt, args) {
                var text = args.bfiText || 'Загрузить файл';
                elt.attr('title', text);
                elt.bootstrapFileInput();
            }
        };
    }]);
    
//    mdl.directive('drag-sorting', ['APP_ROOT_FOLDER', '$stateParams',
//        function ($modal, ROOT, $stateParams) {
//            return {
//                restrict: 'A',
//                scope: {
//                },
////                templateUrl: ROOT + 'common/templates/paginator.html',
//                link: function ($scope) {
//                }
//            };
//        }]);
//    
/* Usage:  <button modal-sort items="lineup" display="name" then="sortingDone">Sort them!</button>
 *
 * items: that array will be copied and copy will be sortable
 * display: property of items' element that will be displayed in sortable list
 * then: function that should be executed when sorting modal is closed. It should expect sorted copy of 'items' as single argument and return promise, $q.all() is ok.
*/
    mdl.directive('modalSort', ['$q', '$modal', 'APP_ROOT_FOLDER',
        function ($a, $modal, ROOT) {
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

//    private stuff, used by modalCrop directive
    mdl.directive('croppableImage', ['$timeout', function ($timeout) {
        return {
            restrict: 'A',
            link: function ($scope, elt, attrs) {
                var thumbnail = {
                        width: $scope.mcWidth,
                        height: $scope.mcHeight
                    };
                
                function onSelect(selection) {
//                    console.log('onSelect validation');
                    $scope.validate();
                }
                
                function onRelease() {
                    $scope.is.valid = false;
                    $scope.$apply();
                }
                
                function start() {
                    $(elt).Jcrop({
                        minSize: [thumbnail.width, thumbnail.height],
                        boxWidth: 500,
                        onSelect: onSelect,
                        onRelease: onRelease,
                        aspectRatio: thumbnail.width / thumbnail.height
                    }, function () {
                        this.setSelect([0, 0, thumbnail.width, thumbnail.height]);
                        $scope.is.valid = true;
                        ng.extend($scope.api, this);
                    });
                    
                }
                $timeout(start, 100);
            }
        };
    }]);
    
/* Usage: <button type="button" 
            modal-crop 
            mc-source="image.urls.source.url" (string)
            mc-width="image.urls.thumbnail.width" (int)
            mc-height="image.urls.thumbnail.height" (int)
            mc-on-submit="cropImage" (method that takes [x1, y1, x2, y2] as first argument
            mc-extra-context="image" (optional second argument for mc-on-submit)

*/
    mdl.directive('modalCrop', ['$filter', '$modal', 'APP_ROOT_FOLDER', '$http',
        function ($filter, $modal, ROOT, $http) {
            var modalTemplateUrl = ROOT + 'common/templates/modal-crop.html';

            return {
                restrict: 'A',
                scope: {
                    
                    onSubmit: '=',
                    mcSource: '=',
                    mcWidth: '=',
                    mcHeight: '=',
                    mcOnSubmit: '=',
                    mcExtraContext: '=?'
                },
                link: function ($scope, element) {
                    var modal;
                    $scope.api = {};
                    $scope.is = {saving: false,
                                valid: false};
                    
                    $scope.validate = function () {
                        $scope.is.valid = ng.isFunction($scope.api.tellSelect) && $scope.api.tellSelect().w > 0;
                        $scope.$apply();
                    };

                    $scope.crop = function () {
                        var api = $scope.api,
                            coords = $scope.api.tellSelect(),
                            selection = {
                                x1: Math.floor(coords.x),
                                y1: Math.floor(coords.y),
                                x2: Math.floor(coords.x2),
                                y2: Math.floor(coords.y2),
                                width: Math.floor(coords.w),
                                height: Math.floor(coords.h)
                            };
                        $scope.is.saving = true;
                        $scope
                            .mcOnSubmit(selection, $scope.mcExtraContext)
                            .then(function (response) {
                                $scope.is.saving = false;
                                modal.close();
                            });
                    };
                    
                    $scope.cleanupAndClose = function () {
                        $scope.api.destroy();
                        modal.dismiss();
                    };
                    
                    element.click(function () {
                        modal = $modal.open({
                            size: 'auto',
                            backdrop: 'static',
                            templateUrl: modalTemplateUrl,
                            controller: function () {},
                            scope: $scope
                        });
                        modal.result.then(function (result) {
                            $scope.api.destroy();
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

    /*
     * <form-dropdown options="options" model="value" textfield="title|name|text|whatever"></form-dropdown>
     * options должно быть списком словарей, имеющих ключ, указанный в textfield -- оттуда будет браться читабельный текст
     * Указанной в аргументе model переменной будет присваиваться значение, равное одному из элементов этого списка.
     *
     */

    mdl.directive('formDropdown', ['APP_ROOT_FOLDER',
        function (ROOT) {
            return {
                restrict: 'E',
                templateUrl: ROOT + 'common/templates/dropdown.html',
                scope: {
                    textfield: '@', //used in template
                    model: '=',
                    options: '='
                },
                link: function ($scope, element) {
                    var mapping = $scope.mapping;

                    $scope.reset = function () {
                        $scope.selected = null;
//                        $scope.model = $scope.selected();
                        $scope.model = $scope.selected;
                    };

                    $scope.setSelected = function (item) {
                        $scope.selected = item;

                        if (!ng.isObject($scope.model)) {
                            $scope.model = {};
                        }
                        //ng.extend($scope.model, $scope.selected);
                        $scope.model = $scope.selected;
                        //console.log('updated model:', $scope.model);
                    };


                    // one-time self-cancelling init for remote list of options
                    var oneTimeOptionsWatch = $scope.$watch(function () {
                        return $scope.options;
                    }, function (value) {
                        if (!ng.isUndefined(value)) {
                            $scope.available_options = value;

                            oneTimeOptionsWatch();
                        }
                    });


                    var oneTimeModelWatch = $scope.$watch(function () {
                        return $scope.model;
                    }, function (value) {
                        if (!ng.isUndefined(value)) {
                            $scope.selected = $scope.model;
                            //initialSelection();
                            oneTimeModelWatch();
                        }
                    });

                }
            };
        }]);


}(angular, jQuery));