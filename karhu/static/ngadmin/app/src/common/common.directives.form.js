/*global angular, console */
(function (ng) {
    'use strict';
    var mdl = ng.module('CommonModule');

//USAGE: <input focus-when="someBooleanVariable"/>
    mdl.directive('focusWhen', ['$parse', '$timeout', function ($parse, $timeout) {
        return {
            restrict: 'A',
            scope: {
                condition: '=focusWhen'
            },
            link: function ($scope, element, attrs) {
                $scope.$watch(function () { return $scope.condition; }, function (value) {
                    if (value === true) {
                        $timeout(function () {
                            element.focus();
                        });
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