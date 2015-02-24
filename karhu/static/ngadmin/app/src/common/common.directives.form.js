/*global angular, console */
(function (ng) {
    'use strict';
    var mdl = ng.module('CommonModule');



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