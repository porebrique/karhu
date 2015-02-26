/*global angular, console */
(function (ng) {
    'use strict';
    var mdl = ng.module('CommonModule');

        
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