/*global angular, console */
(function (ng) {
    'use strict';
    var mdl = ng.module('LineupModule');
    
    mdl.directive('modalTopicsEdit',
        ['$state', '$modal',  'APP_ROOT_FOLDER', 'Lineup',
            function ($state, $modal, ROOT, Lineup) {

                return {
                    restrict: 'A',
//                    scope: {},
                    link: function ($scope, elt, args) {
//                        $scope.settings = $scope.modalItemAdd;
                        elt.click(function () {
                            var modal = $modal.open({
                                templateUrl: ROOT + 'lineup/templates/modal-topics-edit.html'
//                                controller: 'modalAddCtrl',
//                                scope: $scope,
//                                resolve: {
//                                    Service: function () {return $scope.settings.service; }
//                                }
                            });
                        });
                    }
                };
            }]);

}(angular));