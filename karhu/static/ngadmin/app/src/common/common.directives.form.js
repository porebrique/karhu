/*global angular, console */
(function (ng) {
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

    mdl.directive('onEnter', [function () {
        return {
            restrict: 'A',
            link: function ($scope, elt, attrs) {
                elt.on('keypress', function (e) {
                    if (e.keyCode === 13) {
                        $scope.$apply(function () {
                            $scope.$eval(attrs.onEnter);
                            elt.blur();
                        });
                    }
                });
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
                    disabled: '=',
                    required: '=?',
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
    
    
//USAGE: <input focus-when="someBooleanVariable"/>
    mdl.directive('focusWhen', ['$parse', '$compile', '$interpolate', '$timeout', function ($parse, $compile, $interpolate, $timeout) {
        return {
            restrict: 'A',
            link: function ($scope, element, attrs) {
                var condition = $parse(attrs.focusWhen);
                $scope.$watch(function () { return condition($scope); }, function (value) {
                    if (value === true) {
                        $timeout(function () {
                            element.focus();
                        }, 10);
                    }
                });
                // to address @blesh's comment, set attribute value to 'false'
                // on blur event:
//                element.bind('blur', function () {
//                    console.log('blur');
//                    $scope.$apply(condition.assign($scope, false));
//                });
            }
        };
    }]);

    mdl.directive('formDatepicker', ['APP_ROOT_FOLDER',
        function (ROOT) {
            return {
                restrict: 'E',
                templateUrl: ROOT + 'common/templates/datepicker.html',
                scope: {
                    datemodel: '='
                },
                link: function ($scope, elt) {
                    $scope.dp = {
                        opened: false
                    };
                    $scope.open = function (event) {
                        // event.preventDefault();
                        event.stopPropagation();
                        $scope.dp.opened = true;
                    };
                    $scope.date = $scope.datemodel;
                }
            };

        }]);

}(angular));